import type { ReactNode } from 'react';
import { fmt } from '../lib/format';
import { REF_BY_KEY } from '../content';

/** Envoltorio común de las diez pantallas: número, título y texto del storyboard. */
export function Screen({
  n,
  title,
  lead,
  children,
  wide = true,
}: {
  n: number;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`screen-enter mx-auto w-full ${wide ? 'max-w-7xl' : 'max-w-5xl'} px-4 py-8 md:py-10`}>
      <p className="kicker">Pantalla {n} de 10</p>
      <h1 className="mt-2 text-2xl font-extrabold text-brand-blue sm:text-3xl md:text-4xl dark:text-white">{title}</h1>
      {lead && <p className="lead mt-3">{lead}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

/** Indicador numérico del dashboard. */
export function Kpi({ label, value, unit, digits = 1 }: { label: string; value: number | null | undefined; unit: string; digits?: number }) {
  return (
    <div className="card !p-4">
      <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
      <p className="mono mt-1 text-2xl font-semibold text-brand-blue sm:text-3xl dark:text-white">
        {fmt(value, digits)}
        <span className="ml-1.5 text-sm font-normal text-slate-500">{unit}</span>
      </p>
    </div>
  );
}

export function Callout({ title, children, tone = 'info' }: { title?: string; children: ReactNode; tone?: 'info' | 'warn' | 'ok' }) {
  const tones = {
    info: 'border-brand-blue bg-sky-50 text-slate-700 dark:border-sky-500 dark:bg-space-900 dark:text-slate-300',
    warn: 'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200',
    ok: 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200',
  } as const;
  return (
    <div className={`rounded-lg border-l-4 p-4 text-sm ${tones[tone]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? 'mt-1' : ''}>{children}</div>
    </div>
  );
}

/** Tabla con el mismo estilo del sitio (caption + cabecera + filas). */
export function DataTable({
  caption,
  head,
  rows,
  footnote,
}: {
  caption: string;
  head: string[];
  rows: ReactNode[][];
  footnote?: string;
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-space-700">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <caption className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-left font-semibold dark:border-space-700 dark:bg-space-800">{caption}</caption>
        <thead className="bg-slate-100 dark:bg-space-700">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-space-700">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-4 py-2.5 font-semibold">
                    {c}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-2.5 text-slate-700 dark:text-slate-300">
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && (
        <p className="border-t border-slate-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-900 dark:border-space-700 dark:bg-amber-950/30 dark:text-amber-200">
          {footnote}
        </p>
      )}
    </div>
  );
}

/** Fichas de las referencias citadas en una sección del marco teórico. */
export function ReferenceChips({ refs }: { refs: string[] }) {
  if (!refs.length) return null;
  return (
    <aside aria-label="Referencias de esta sección" className="mt-10 border-t border-slate-200 pt-5 dark:border-space-700">
      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Referencias de esta sección:</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {refs.map((key) => (
          <li key={key} className="inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-sm font-medium text-brand-blue dark:bg-sky-900/30 dark:text-sky-300" title={REF_BY_KEY[key]?.apa}>
            {key}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">La cita completa en formato APA 7 está en la pantalla 10 (Créditos y referencias).</p>
    </aside>
  );
}

/** Pestañas accesibles para las subsecciones de una pantalla. */
export function Tabs({
  items,
  active,
  onChange,
  label,
  vertical = false,
}: {
  items: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  vertical?: boolean;
}) {
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const n = items.length;
    const nextIndex =
      e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (i + (['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : -1) + n) % n;
    onChange(items[nextIndex].id);
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      className={vertical ? 'flex gap-2 overflow-x-auto lg:flex-col lg:self-start' : 'flex flex-wrap gap-2'}
    >
      {items.map((it, i) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(it.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`tab shrink-0 text-left ${vertical ? 'lg:w-full lg:py-3' : ''} ${on ? 'tab-on' : 'tab-off'}`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
