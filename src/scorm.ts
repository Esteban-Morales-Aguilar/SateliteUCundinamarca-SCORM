/**
 * Integración con la API SCORM 1.2 del LMS (Moodle, Canvas, Blackboard…).
 *
 * Reglas de diseño:
 *  - Fuera de un LMS no se hace nada: el módulo queda inerte y el ODC se ve igual.
 *  - Nunca se lanza una excepción hacia la interfaz: si el LMS falla, se registra y se sigue.
 *  - El objeto de conocimiento no tiene evaluación ni puntaje, así que solo se reportan
 *    `cmi.core.lesson_status`, `cmi.core.lesson_location`, `cmi.suspend_data`,
 *    `cmi.core.session_time` y `cmi.core.exit`.
 */

export type LessonStatus = 'not attempted' | 'incomplete' | 'completed' | 'passed' | 'failed' | 'browsed';

/** Interfaz mínima de la API SCORM 1.2 que expone el LMS en una ventana ancestro. */
export interface LmsApi {
  LMSInitialize(parameter: string): string;
  LMSFinish(parameter: string): string;
  LMSGetValue(element: string): string;
  LMSSetValue(element: string, value: string): string;
  LMSCommit(parameter: string): string;
  LMSGetLastError(): string;
  LMSGetErrorString(errorCode: string): string;
  LMSGetDiagnostic(errorCode: string): string;
}

const MAX_PARENT_DEPTH = 12;
const SUSPEND_PREFIX = 'spacenet1';

/** Busca `API` en la ventana actual, sus ancestros y la ventana que la abrió. */
export function findApiInWindowChain(start: Window): LmsApi | null {
  const visited = new Set<Window>();
  let current: Window | null = start;

  while (current && visited.size < MAX_PARENT_DEPTH) {
    if (visited.has(current)) break;
    visited.add(current);

    try {
      const candidate = (current as unknown as { API?: LmsApi }).API;
      if (candidate && typeof candidate.LMSInitialize === 'function') return candidate;
    } catch {
      // Ventana de otro origen: no se puede inspeccionar ni seguir subiendo.
      break;
    }

    if (current.parent === current) break;
    current = current.parent;
  }

  // Algunos LMS antiguos exponen la API solo en `window.opener`.
  try {
    const opener = start.opener as Window | null;
    if (opener && !visited.has(opener)) {
      const candidate = (opener as unknown as { API?: LmsApi }).API;
      if (candidate && typeof candidate.LMSInitialize === 'function') return candidate;
    }
  } catch {
    /* sin acceso a la ventana de apertura */
  }

  return null;
}

/** HH:MM:SS, el formato CMITimespan que espera SCORM 1.2. */
export function formatSessionTime(milliseconds: number): string {
  const total = Math.max(0, Math.floor(milliseconds / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export function parseSuspendData(raw: string): { visited: string[]; status: LessonStatus | '' } {
  if (!raw || !raw.startsWith(`${SUSPEND_PREFIX}|`)) return { visited: [], status: '' };
  const [, status = '', list = ''] = raw.split('|');
  return {
    status: (status as LessonStatus) || '',
    visited: list.split(',').map((s) => s.trim()).filter(Boolean),
  };
}

export function buildSuspendData(status: LessonStatus | '', visited: Iterable<string>): string {
  return `${SUSPEND_PREFIX}|${status}|${[...visited].join(',')}`;
}

export interface ScormState {
  /** `true` solo si el LMS respondió a LMSInitialize. */
  available: boolean;
  initialized: boolean;
  finished: boolean;
  learnerName: string;
  status: LessonStatus | '';
  location: string;
  visited: string[];
}

/**
 * Sesión SCORM 1.2. El buscador de API se inyecta para poder probarla sin LMS.
 */
export class ScormSession {
  private api: LmsApi | null = null;
  private state: ScormState = {
    available: false,
    initialized: false,
    finished: false,
    learnerName: '',
    status: '',
    location: '',
    visited: [],
  };

  private startedAt = 0;
  private readonly listeners = new Set<(state: ScormState) => void>();

  constructor(private readonly finder: () => LmsApi | null = () => null) {}

  /** Conecta con el LMS una sola vez. Devuelve `true` si hay API disponible. */
  connect(): boolean {
    if (this.state.initialized) return this.state.available;
    if (this.state.finished) return this.state.available;

    this.api = this.finder();
    if (!this.api) return false;

    this.state.available = true;

    let ok = false;
    try {
      ok = this.api.LMSInitialize('') !== 'false';
    } catch (err) {
      this.warn('LMSInitialize lanzó una excepción', err);
      ok = false;
    }

    if (!ok) {
      this.state.available = false;
      this.warn('El LMS rechazó LMSInitialize', this.api.LMSGetLastError?.());
      return false;
    }

    this.state.initialized = true;
    this.startedAt = Date.now();

    const rawStatus = this.get('cmi.core.lesson_status') as LessonStatus | '';
    const suspend = parseSuspendData(this.get('cmi.suspend_data'));
    this.state.status = (rawStatus || suspend.status || '') as LessonStatus | '';
    this.state.location = this.get('cmi.core.lesson_location');
    this.state.visited = suspend.visited;
    this.state.learnerName = this.get('cmi.core.student_name').replace(/^.*,/, '').trim() || this.get('cmi.core.student_id');

    // Un SCO sin evaluación arranca como "incomplete"; nunca se pisa un estado final.
    if (!this.state.status || this.state.status === 'not attempted' || this.state.status === 'browsed') {
      this.state.status = 'incomplete';
      this.set('cmi.core.lesson_status', 'incomplete');
    }

    this.emit();
    return true;
  }

  get snapshot(): ScormState {
    return { ...this.state, visited: [...this.state.visited] };
  }

  subscribe(listener: (state: ScormState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    const snap = this.snapshot;
    for (const l of this.listeners) l(snap);
  }

  private warn(message: string, detail?: unknown) {
    if (import.meta.env.DEV) console.warn(`[SCORM] ${message}`, detail ?? '');
  }

  private get(element: string): string {
    if (!this.api) return '';
    try {
      const value = this.api.LMSGetValue(element);
      return typeof value === 'string' ? value : '';
    } catch (err) {
      this.warn(`LMSGetValue(${element}) falló`, err);
      return '';
    }
  }

  private set(element: string, value: string): boolean {
    if (!this.api) return false;
    try {
      const ok = this.api.LMSSetValue(element, value) !== 'false';
      if (!ok) this.warn(`LMSSetValue(${element}) rechazado`, this.api.LMSGetLastError?.());
      return ok;
    } catch (err) {
      this.warn(`LMSSetValue(${element}) lanzó una excepción`, err);
      return false;
    }
  }

  /** Persiste el avance en el LMS. Llamar tras cada cambio relevante. */
  commit(): void {
    if (!this.api || !this.state.initialized || this.state.finished) return;
    try {
      this.api.LMSCommit('');
    } catch (err) {
      this.warn('LMSCommit falló', err);
    }
  }

  /** Registra una pantalla como visitada y guarda la posición actual. */
  visit(screenId: string): ScormState {
    if (!screenId) return this.snapshot;
    if (!this.state.visited.includes(screenId)) this.state.visited.push(screenId);

    this.state.location = screenId;
    this.set('cmi.core.lesson_location', screenId);
    this.set('cmi.suspend_data', buildSuspendData(this.state.status, this.state.visited));
    this.emit();
    return this.snapshot;
  }

  setStatus(status: LessonStatus): void {
    if (this.state.status === status) return;
    this.state.status = status;
    this.set('cmi.core.lesson_status', status);
    this.set('cmi.suspend_data', buildSuspendData(status, this.state.visited));
    this.emit();
  }

  /** Cierra la sesión: guarda el tiempo, el estado de salida y llama a LMSFinish. */
  finish(): void {
    if (!this.api || !this.state.initialized || this.state.finished) return;

    const final = this.state.status === 'completed' || this.state.status === 'passed';
    this.set('cmi.core.session_time', formatSessionTime(Date.now() - this.startedAt));
    this.set('cmi.core.exit', final ? '' : 'suspend');
    this.set('cmi.suspend_data', buildSuspendData(this.state.status, this.state.visited));
    this.commit();

    try {
      this.api.LMSFinish('');
    } catch (err) {
      this.warn('LMSFinish falló', err);
    }

    this.state.finished = true;
    this.emit();
  }
}

/** Instancia usada por la aplicación. */
export const scorm = new ScormSession(() => (typeof window === 'undefined' ? null : findApiInWindowChain(window)));
