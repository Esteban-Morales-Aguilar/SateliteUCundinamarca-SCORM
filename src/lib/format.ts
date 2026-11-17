/** Utilidades de formato y rutas de recursos del paquete SCORM. */

export const fmt = (v: number | null | undefined, digits = 1): string =>
  v === null || v === undefined || Number.isNaN(v)
    ? '—'
    : v.toLocaleString('es-CO', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const fmtCOP = (n: number): string =>
  n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export const fmtBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  const units = ['KB', 'MB', 'GB'];
  let i = -1;
  let v = n;
  do {
    v /= 1024;
    i += 1;
  } while (v >= 1024 && i < units.length - 1);
  return `${v.toFixed(v >= 100 ? 0 : 1)} ${units[i]}`;
};

/**
 * Ruta relativa a un recurso de `public/`. El paquete usa `base: './'`, así que
 * `BASE_URL` es `./` y las rutas funcionan dentro del iframe de Moodle.
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

/** Hora local corta a partir de una marca ISO (usada en las gráficas). */
export const shortTime = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const longDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/** Estimación sencilla del lenguaje de un bloque de código de las guías. */
export const guessLang = (code: string): 'python' | 'bash' =>
  /\bimport\s+\w+|\bdef\s+\w+\(|while True:/.test(code) ? 'python' : 'bash';
