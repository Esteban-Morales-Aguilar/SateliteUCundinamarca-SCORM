import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ScormState } from '../scorm';
import { SCREENS, TOTAL_SCREENS, type ScreenDef } from '../screens';

const THEME_KEY = 'spacenet-scorm-theme';

function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {
      /* almacenamiento bloqueado dentro del iframe */
    }
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

const Icon = ({ path, className = 'h-5 w-5' }: { path: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d={path} />
  </svg>
);

interface ShellProps {
  current: ScreenDef;
  visited: string[];
  lms: ScormState;
  onNavigate: (id: string) => void;
  children: ReactNode;
}

export function Shell({ current, visited, lms, onNavigate, children }: ShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const progress = Math.round((visited.length / TOTAL_SCREENS) * 100);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const prev = SCREENS[current.n - 2];
  const next = SCREENS[current.n];

  const go = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <div className="scorm-app">
      <header className="no-print sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-space-700 dark:bg-space-900/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <button type="button" onClick={() => go('menu')} className="flex items-center gap-2.5 font-extrabold text-brand-blue dark:text-white" aria-label="Ir al menú principal">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width="28" height="28" />
            <span className="hidden sm:inline">SpaceNet&nbsp;Lab</span>
            <span className="ml-1 hidden rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:inline dark:border-space-600 dark:text-slate-400">
              ODC
            </span>
          </button>

          <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
            <span className="truncate text-sm font-semibold text-slate-600 dark:text-slate-300">
              {current.n}. {current.short}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex" aria-hidden>
              <div className="progress-track w-28">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                {visited.length}/{TOTAL_SCREENS}
              </span>
            </div>

            <button
              type="button"
              onClick={toggle}
              className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-space-700"
              aria-label={dark ? 'Activar tema claro' : 'Activar tema oscuro'}
              title={dark ? 'Tema claro' : 'Tema oscuro'}
            >
              {dark ? (
                <Icon path="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
              ) : (
                <Icon path="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-space-600 dark:text-slate-200 dark:hover:bg-space-700"
              aria-expanded={menuOpen}
              aria-controls="indice-pantallas"
            >
              <Icon path="M4 6h16M4 12h16M4 18h16" className="h-4 w-4" />
              <span className="hidden sm:inline">Índice</span>
            </button>
          </div>
        </div>
        <div className="progress-track h-0.5 rounded-none lg:hidden" aria-hidden>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {menuOpen && (
        <div className="no-print fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="indice-titulo">
          <button type="button" className="absolute inset-0 bg-space-950/60" aria-label="Cerrar índice" onClick={() => setMenuOpen(false)} />
          <div id="indice-pantallas" className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-2xl dark:bg-space-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="kicker">Recorrido del ODC</p>
                <h2 id="indice-titulo" className="text-xl font-extrabold text-brand-blue dark:text-white">
                  Índice de pantallas
                </h2>
              </div>
              <button type="button" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-space-700" aria-label="Cerrar índice">
                <Icon path="M6 6l12 12M18 6L6 18" />
              </button>
            </div>

            <ol className="mt-4 space-y-1">
              {SCREENS.map((s) => {
                const seen = visited.includes(s.id);
                const active = s.id === current.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => go(s.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                        active
                          ? 'bg-brand-blue text-white dark:bg-sky-600'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-space-700'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className={`mono grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? 'bg-white/20' : seen ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-space-700 dark:text-slate-400'}`}>
                        {seen && !active ? '✓' : s.n}
                      </span>
                      <span className="flex-1">{s.short}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-auto space-y-3 pt-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="progress-track" aria-hidden>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p>
                <strong className="text-slate-700 dark:text-slate-200">{visited.length} de {TOTAL_SCREENS}</strong> pantallas visitadas.
                {' '}La actividad se completa al recorrer las diez.
              </p>
              <p className={`rounded-lg px-3 py-2 ${lms.available ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-space-900 dark:text-slate-400'}`}>
                {lms.available ? 'Progreso sincronizado con el LMS (SCORM 1.2).' : 'Sin LMS detectado: el progreso no se envía.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="scorm-main">{children}</main>

      <nav className="no-print sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-space-700 dark:bg-space-900/95" aria-label="Navegación entre pantallas">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
          <button
            type="button"
            onClick={() => prev && go(prev.id)}
            disabled={!prev}
            className="btn-ghost !px-3 !py-2 text-sm disabled:invisible"
          >
            <Icon path="M15 18l-6-6 6-6" className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className="flex min-w-0 flex-col items-center">
            <span className="mono text-xs font-semibold text-slate-500 dark:text-slate-400">
              Pantalla {current.n} de {TOTAL_SCREENS}
            </span>
            <button type="button" onClick={() => go('menu')} className="text-xs font-semibold text-brand-blue hover:underline dark:text-sky-400">
              Ir al inicio
            </button>
          </div>

          <button
            type="button"
            onClick={() => next && go(next.id)}
            disabled={!next}
            className="btn-primary !px-3 !py-2 text-sm disabled:invisible"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <Icon path="M9 6l6 6-6 6" className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </div>
  );
}
