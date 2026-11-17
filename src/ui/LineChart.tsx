import { useEffect, useId, useRef, useState } from 'react';

export interface ChartSeries {
  label: string;
  color: string;
  values: (number | null)[];
  dashed?: boolean;
  fill?: boolean;
}

interface Props {
  series: ChartSeries[];
  labels: string[];
  height?: number;
  yUnit?: string;
  xUnit?: string;
  yDigits?: number;
  ariaLabel: string;
  showLegend?: boolean;
  zeroLine?: boolean;
  /** Puntos destacados (por índice sobre el eje X). */
  markers?: { index: number; color: string; label: string }[];
}

const PAD_L = 58;
const PAD_R = 14;

/**
 * Gráfica de líneas en SVG puro: sin dependencias externas ni peticiones de red.
 * Mide su contenedor para que el trazo y las etiquetas conserven su escala real.
 */
export function LineChart({
  series,
  labels,
  height = 200,
  yUnit = '',
  xUnit = '',
  yDigits = 1,
  ariaLabel,
  showLegend = true,
  zeroLine = false,
  markers = [],
}: Props) {
  const uid = useId().replace(/[:]/g, '');
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 640;
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const W = Math.max(width, 300);
  const PAD_T = 12;
  const PAD_B = xUnit ? 42 : 30;
  const innerW = W - PAD_L - PAD_R;
  const innerH = height - PAD_T - PAD_B;

  const all = series.flatMap((s) => s.values).filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  const hasData = all.length > 0;

  let min = hasData ? Math.min(...all) : 0;
  let max = hasData ? Math.max(...all) : 1;
  if (min === max) {
    min -= Math.abs(min) * 0.1 + 1;
    max += Math.abs(max) * 0.1 + 1;
  }
  const pad = (max - min) * 0.08;
  min -= pad;
  max += pad;

  const n = Math.max(labels.length, ...series.map((s) => s.values.length), 1);
  const x = (i: number) => PAD_L + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => PAD_T + innerH - ((v - min) / (max - min)) * innerH;

  const ticks = 4;
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => min + ((max - min) * i) / ticks);
  const labelIdx = Array.from(
    new Set([0, Math.round((n - 1) * 0.25), Math.round((n - 1) * 0.5), Math.round((n - 1) * 0.75), n - 1]),
  ).filter((i) => i >= 0 && i < labels.length);

  const pathFor = (values: (number | null)[]) => {
    let d = '';
    let started = false;
    values.forEach((v, i) => {
      if (typeof v !== 'number' || !Number.isFinite(v)) {
        started = false;
        return;
      }
      d += `${started ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)} `;
      started = true;
    });
    return d.trim();
  };

  return (
    <figure className="w-full">
      {showLegend && (
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-600 dark:text-slate-400">
          {series.map((s) => (
            <span key={s.label} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-4 rounded" style={{ background: s.color }} aria-hidden />
              {s.label}
            </span>
          ))}
        </div>
      )}
      <div ref={boxRef} role="img" aria-label={ariaLabel}>
        <svg viewBox={`0 0 ${W} ${height}`} width={W} height={height} style={{ display: 'block', maxWidth: '100%' }}>
          <defs>
            {series.map((s, i) => (
              <linearGradient key={i} id={`${uid}-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {tickValues.map((t, i) => (
            <g key={i}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={y(t)}
                y2={y(t)}
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-200 dark:text-space-600"
              />
              <text x={PAD_L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="currentColor" className="text-slate-500 dark:text-slate-400">
                {t.toLocaleString('es-CO', { minimumFractionDigits: yDigits, maximumFractionDigits: yDigits })}
              </text>
            </g>
          ))}

          {zeroLine && min < 0 && max > 0 && (
            <line x1={PAD_L} x2={W - PAD_R} y1={y(0)} y2={y(0)} stroke="currentColor" strokeWidth="1.5" className="text-slate-400" />
          )}

          {series.map((s, i) => {
            const d = pathFor(s.values);
            if (!d) return null;
            return (
              <g key={s.label}>
                {s.fill && (
                  <path
                    d={`${d} L${x(s.values.length - 1).toFixed(1)} ${PAD_T + innerH} L${x(0).toFixed(1)} ${PAD_T + innerH} Z`}
                    fill={`url(#${uid}-grad-${i})`}
                  />
                )}
                <path
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2.5"
                  strokeDasharray={s.dashed ? '6 5' : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {markers.map((m, i) => {
            const v = series[0]?.values[m.index];
            if (typeof v !== 'number' || !Number.isFinite(v)) return null;
            return (
              <g key={`marker-${i}`}>
                <circle cx={x(m.index)} cy={y(v)} r="6" fill={m.color} stroke="#fff" strokeWidth="2">
                  <title>{m.label}</title>
                </circle>
              </g>
            );
          })}

          {labelIdx.map((i) => (
            <text key={i} x={x(i)} y={height - PAD_B + 16} textAnchor="middle" fontSize="11" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              {labels[i] ?? ''}
            </text>
          ))}

          {xUnit && (
            <text x={W - PAD_R} y={height - 4} textAnchor="end" fontSize="11" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              {xUnit}
            </text>
          )}
          {yUnit && (
            <text x={PAD_L - 8} y={PAD_T - 1} textAnchor="end" fontSize="11" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              {yUnit}
            </text>
          )}
        </svg>
      </div>
      {!hasData && <p className="mt-1 text-center text-sm text-slate-500">Sin datos para graficar.</p>}
    </figure>
  );
}
