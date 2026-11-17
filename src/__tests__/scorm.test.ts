import { describe, expect, it } from 'vitest';
import {
  ScormSession,
  buildSuspendData,
  findApiInWindowChain,
  formatSessionTime,
  parseSuspendData,
  type LmsApi,
} from '../scorm';
import { SCREENS, TOTAL_SCREENS, screenByLocation, scormLocation } from '../screens';

/** API SCORM 1.2 falsa que imita el comportamiento de Moodle. */
function fakeApi(initial: Record<string, string> = {}) {
  const data: Record<string, string> = {
    'cmi.core.lesson_status': 'not attempted',
    'cmi.core.lesson_location': '',
    'cmi.suspend_data': '',
    'cmi.core.student_name': 'Pérez Rodríguez, Darikson Felipe',
    'cmi.core.student_id': '20261001',
    ...initial,
  };
  const calls: string[] = [];
  let initialized = false;

  const api: LmsApi = {
    LMSInitialize() {
      calls.push('LMSInitialize');
      if (initialized) return 'false';
      initialized = true;
      return 'true';
    },
    LMSFinish() {
      calls.push('LMSFinish');
      initialized = false;
      return 'true';
    },
    LMSGetValue(element) {
      if (!initialized) return '';
      return data[element] ?? '';
    },
    LMSSetValue(element, value) {
      if (!initialized) return 'false';
      calls.push(`set:${element}`);
      data[element] = value;
      return 'true';
    },
    LMSCommit() {
      calls.push('LMSCommit');
      return 'true';
    },
    LMSGetLastError: () => '0',
    LMSGetErrorString: () => 'No error',
    LMSGetDiagnostic: () => '',
  };

  return { api, data, calls };
}

describe('formato SCORM', () => {
  it('formatSessionTime devuelve CMITimespan HH:MM:SS', () => {
    expect(formatSessionTime(0)).toBe('00:00:00');
    expect(formatSessionTime(65_000)).toBe('00:01:05');
    expect(formatSessionTime(3_723_000)).toBe('01:02:03');
    expect(formatSessionTime(-5)).toBe('00:00:00');
  });

  it('el suspend_data va y vuelve sin pérdidas', () => {
    const raw = buildSuspendData('incomplete', ['portada', 'menu', 'mision']);
    expect(raw.startsWith('spacenet1|')).toBe(true);
    expect(parseSuspendData(raw)).toEqual({
      status: 'incomplete',
      visited: ['portada', 'menu', 'mision'],
    });
  });

  it('ignora un suspend_data ajeno o vacío', () => {
    expect(parseSuspendData('')).toEqual({ visited: [], status: '' });
    expect(parseSuspendData('otro-lms|completed|x')).toEqual({ visited: [], status: '' });
  });
});

describe('ScormSession con un LMS disponible', () => {
  it('inicializa, arranca en incomplete y no pisa un estado final', () => {
    const { api } = fakeApi();
    const s = new ScormSession(() => api);
    expect(s.connect()).toBe(true);
    expect(s.snapshot.available).toBe(true);
    expect(s.snapshot.status).toBe('incomplete');
    expect(s.snapshot.learnerName).toBe('Darikson Felipe');
  });

  it('no reabre un curso ya completado', () => {
    const { api } = fakeApi({ 'cmi.core.lesson_status': 'completed' });
    const s = new ScormSession(() => api);
    s.connect();
    expect(s.snapshot.status).toBe('completed');
  });

  it('registra la pantalla visitada y la posición en lesson_location', () => {
    const { api, data } = fakeApi();
    const s = new ScormSession(() => api);
    s.connect();
    s.visit('s01-portada');
    s.visit('s02-menu');
    s.commit();

    expect(s.snapshot.visited).toEqual(['s01-portada', 's02-menu']);
    expect(data['cmi.core.lesson_location']).toBe('s02-menu');
    expect(parseSuspendData(data['cmi.suspend_data']).visited).toEqual(['s01-portada', 's02-menu']);
  });

  it('no duplica pantallas repetidas', () => {
    const { api } = fakeApi();
    const s = new ScormSession(() => api);
    s.connect();
    s.visit('s01-portada');
    s.visit('s01-portada');
    expect(s.snapshot.visited).toEqual(['s01-portada']);
  });

  it('marca completed y cierra con exit vacío + LMSFinish una sola vez', () => {
    const { api, data, calls } = fakeApi();
    const s = new ScormSession(() => api);
    s.connect();
    s.setStatus('completed');
    s.finish();
    s.finish(); // idempotente

    expect(data['cmi.core.lesson_status']).toBe('completed');
    expect(data['cmi.core.exit']).toBe('');
    expect(data['cmi.core.session_time']).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    expect(calls.filter((c) => c === 'LMSFinish')).toHaveLength(1);
  });

  it('si se abandona sin completar, guarda exit=suspend para reanudar', () => {
    const { api, data } = fakeApi();
    const s = new ScormSession(() => api);
    s.connect();
    s.visit('s03-atmosfera');
    s.finish();
    expect(data['cmi.core.exit']).toBe('suspend');
    expect(parseSuspendData(data['cmi.suspend_data']).visited).toEqual(['s03-atmosfera']);
  });
});

describe('ScormSession sin LMS', () => {
  it('queda inerte y nunca lanza excepciones', () => {
    const s = new ScormSession(() => null);
    expect(s.connect()).toBe(false);
    expect(s.snapshot.available).toBe(false);
    expect(() => {
      s.visit('s01-portada');
      s.setStatus('completed');
      s.commit();
      s.finish();
    }).not.toThrow();
    // Sin LMS el avance local igual se acumula para la interfaz.
    expect(s.snapshot.visited).toEqual(['s01-portada']);
  });

  it('no se cae si el LMS lanza errores', () => {
    const hostile: LmsApi = {
      LMSInitialize() { throw new Error('boom'); },
      LMSFinish() { throw new Error('boom'); },
      LMSGetValue() { throw new Error('boom'); },
      LMSSetValue() { throw new Error('boom'); },
      LMSCommit() { throw new Error('boom'); },
      LMSGetLastError: () => '0',
      LMSGetErrorString: () => '',
      LMSGetDiagnostic: () => '',
    };
    const s = new ScormSession(() => hostile);
    expect(s.connect()).toBe(false);
    expect(() => s.finish()).not.toThrow();
  });
});

describe('findApiInWindowChain', () => {
  interface FakeWindow {
    API?: LmsApi;
    parent: FakeWindow;
    opener?: FakeWindow | null;
  }

  /** Ventana falsa: `parent` apunta a sí misma salvo que se indique otra. */
  const makeWindow = (api?: LmsApi, parent?: FakeWindow): FakeWindow => {
    const win = { API: api, opener: null } as FakeWindow;
    win.parent = parent ?? win;
    return win;
  };

  const asWindow = (w: FakeWindow) => w as unknown as Window;

  it('encuentra la API en la ventana actual', () => {
    const { api } = fakeApi();
    const win = makeWindow(api);
    expect(findApiInWindowChain(asWindow(win))).toBe(api);
  });

  it('sube por la cadena de ancestros (iframe de Moodle)', () => {
    const { api } = fakeApi();
    const top = makeWindow(api);
    const mid = makeWindow(undefined, top);
    const child = makeWindow(undefined, mid);
    expect(findApiInWindowChain(asWindow(child))).toBe(api);
  });

  it('respeta el tope de profundidad y no entra en bucles', () => {
    const { api } = fakeApi();
    const top = makeWindow(api);
    let deep: FakeWindow = top;
    for (let i = 0; i < 20; i += 1) deep = makeWindow(undefined, deep);
    // Más allá del tope la API no se descubre, pero la función termina.
    expect(findApiInWindowChain(asWindow(deep))).toBeNull();
  });

  it('devuelve null cuando no hay API', () => {
    const win = makeWindow();
    expect(findApiInWindowChain(asWindow(win))).toBeNull();
  });
});
