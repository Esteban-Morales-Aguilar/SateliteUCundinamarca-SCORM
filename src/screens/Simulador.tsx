import { useMemo, useState } from 'react';
import {
  CLIMATES,
  DEFAULT_SIM,
  computeCoverage,
  computeDoppler,
  computeLink,
  optimize,
  type Bandwidth,
  type Climate,
  type Frequency,
  type SimState,
} from '../lib/link';
import { fmt } from '../lib/format';
import { Callout, Screen } from '../ui/bits';
import { LineChart } from '../ui/LineChart';

const WEATHER: Record<Climate, string> = {
  despejado: 'Despejado',
  nublado: 'Nublado',
  lluvia: 'Lluvia',
  tormenta: 'Tormenta',
};

function Slider({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="flex items-baseline justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
        <span>{label}</span>
        <span className="mono text-xs font-semibold text-brand-blue dark:text-sky-300">
          {fmt(value, 0)} {unit}
        </span>
      </label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(e.target.valueAsNumber)} className="w-full accent-brand-blue" />
      {hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
  format,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {options.map((opt) => (
          <button
            key={String(opt)}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={`rounded-lg px-2 py-1.5 text-sm font-semibold transition ${value === opt ? 'bg-brand-blue text-white dark:bg-sky-600' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-space-900 dark:text-slate-300 dark:ring-space-700'}`}
          >
            {format ? format(opt) : String(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Pantalla 7 — Dashboard: simulador de red. */
export function SimuladorScreen() {
  const [s, setS] = useState<SimState>(DEFAULT_SIM);
  const [dopplerAlt, setDopplerAlt] = useState(400);
  const [elevation, setElevation] = useState(0);

  const set = <K extends keyof SimState>(key: K, value: SimState[K]) => setS((prev) => ({ ...prev, [key]: value }));

  const link = useMemo(() => computeLink(s), [s]);
  const coverage = useMemo(() => computeCoverage(s), [s]);
  const doppler = useMemo(() => computeDoppler(dopplerAlt, elevation, s.freq_mhz, s.bw_khz), [dopplerAlt, elevation, s.freq_mhz, s.bw_khz]);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof optimize> | null>(null);

  const maxScale = Math.max(coverage.radio_range_km, coverage.horizon_km, 1);
  const marginTone = !link.viable
    ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
    : link.link_margin_db < 6
      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
  const verdict = !link.viable ? 'Enlace no viable' : link.link_margin_db < 6 ? 'Viable, con poco margen' : 'Enlace viable';

  return (
    <Screen
      n={7}
      title="Dashboard: simulador de red"
      lead="Modifica parámetros clave del enlace y observa su efecto sobre la pérdida de señal, el alcance máximo y la relación señal/ruido."
    >
      <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
        <form className="card space-y-5 lg:sticky lg:top-24 lg:self-start" onSubmit={(e) => e.preventDefault()} aria-label="Parámetros del enlace">
          <h2 className="text-lg font-bold">Parámetros del enlace</h2>
          <Slider label="Altitud" value={s.altitude_km} unit="km" min={0} max={40} onChange={(v) => set('altitude_km', v)} hint="La estratosfera comienza a ~12 km." />
          <Slider
            label="Distancia horizontal"
            value={s.horizontal_km}
            unit="km"
            min={0}
            max={300}
            onChange={(v) => set('horizontal_km', v)}
            hint={`Distancia en línea recta: ${fmt(link.distance_km, 1)} km`}
          />
          <Slider label="Potencia de transmisión" value={s.p_tx_dbm} unit="dBm" min={2} max={20} onChange={(v) => set('p_tx_dbm', v)} />
          <Segmented<Frequency> label="Frecuencia (MHz)" value={s.freq_mhz} options={[433, 868, 915]} onChange={(v) => set('freq_mhz', v)} />
          <Slider label="Spreading Factor (SF)" value={s.sf} unit="" min={7} max={12} onChange={(v) => set('sf', v)} hint="SF alto: más alcance, menos velocidad." />
          <Segmented<Bandwidth> label="Ancho de banda (kHz)" value={s.bw_khz} options={[125, 250, 500]} onChange={(v) => set('bw_khz', v)} />
          <Segmented<Climate> label="Clima" value={s.climate} options={CLIMATES} onChange={(v) => set('climate', v)} format={(v) => WEATHER[v]} />
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-ghost flex-1" onClick={() => setS(DEFAULT_SIM)}>
              Restablecer valores
            </button>
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={() => setRecommendation(optimize(s, 10))}
              title="Busca la mayor tasa de datos que conserve 10 dB de margen"
            >
              Recomendar
            </button>
          </div>
        </form>

        <div className="min-w-0 space-y-6">
          <figure className="card">
            <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-2 text-sm font-semibold">
              <span>Pérdida en el enlace</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${marginTone}`}>{verdict}</span>
            </figcaption>
            <LineChart
              series={[
                { label: 'Potencia recibida (dBm)', color: '#003366', values: link.loss_curve.map((p) => p.p_rx_dbm) },
                { label: 'Sensibilidad del receptor', color: '#B71C1C', values: link.loss_curve.map(() => link.sensitivity_dbm), dashed: true },
              ]}
              markers={[
                {
                  index: link.loss_curve.reduce((best, p, i) => (Math.abs(p.distance_km - link.distance_km) < Math.abs(link.loss_curve[best].distance_km - link.distance_km) ? i : best), 0),
                  color: '#b45309',
                  label: 'Punto de operación',
                },
              ]}
              labels={link.loss_curve.map((p) => fmt(p.distance_km, 0))}
              xUnit="Distancia (km)"
              yUnit="dBm"
              height={240}
              ariaLabel="Potencia recibida frente a la distancia, con la sensibilidad del receptor y el punto de operación"
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Cada punto es una distancia del enlace. La línea roja indica la sensibilidad del receptor para SF{s.sf} y {s.bw_khz} kHz.
            </p>
          </figure>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="card" aria-labelledby="lb-title">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 id="lb-title" className="text-lg font-bold">Balance de enlace</h2>
              </div>
              <p className="mono mt-4 rounded-lg bg-slate-100 p-3 text-xs leading-relaxed dark:bg-space-900 sm:text-sm">
                P<sub>rx</sub> = P<sub>tx</sub> + G<sub>tx</sub> + G<sub>rx</sub> − FSPL − L
                <br />= {s.p_tx_dbm} + {s.g_tx_dbi} + {s.g_rx_dbi} − {fmt(link.fspl_db, 1)} − {fmt(link.misc_loss_db, 1)} ={' '}
                <strong>{fmt(link.p_rx_dbm, 1)} dBm</strong>
              </p>
              <dl className="mt-3 text-sm">
                {[
                  ['Distancia en línea recta', `${fmt(link.distance_km, 1)} km`],
                  ['Pérdida en espacio libre (FSPL)', `${fmt(link.fspl_db, 1)} dB`],
                  ['Otras pérdidas (cables, clima)', `${fmt(link.misc_loss_db, 1)} dB`],
                  ['Potencia recibida', `${fmt(link.p_rx_dbm, 1)} dBm`],
                  [`Sensibilidad SF${s.sf}, ${s.bw_khz} kHz`, `${fmt(link.sensitivity_dbm, 1)} dBm`],
                  ['Margen de enlace', `${fmt(link.link_margin_db, 1)} dB`],
                  ['PDR estimado', `${fmt(link.pdr_estimated * 100, 0)} %`],
                  ['Alcance máximo estimado', `${fmt(link.max_range_km, 0)} km`],
                  ['Tasa de datos', `${fmt(link.bitrate_bps, 0)} bps`],
                ].map(([k, v], i) => (
                  <div key={k} className={`flex items-baseline justify-between gap-4 border-b border-slate-200 py-2 last:border-0 dark:border-space-700 ${i === 5 ? 'font-semibold' : ''}`}>
                    <dt>{k}</dt>
                    <dd className="mono">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 rounded-lg border-l-4 border-brand-blue bg-sky-50 p-3 text-sm text-slate-700 dark:border-sky-500 dark:bg-space-900 dark:text-slate-300">
                {link.message}
                {link.viable && link.link_margin_db < 6 && ' Un margen menor de ~6 dB es frágil: el clima o un cambio de orientación de la antena podrían cortar el enlace.'}
                {!link.viable && s.sf < 12 && ' Pruebe subir el SF (a mayor SF, mayor sensibilidad pero menor tasa de datos).'}
              </p>
            </section>

            <div className="space-y-6">
              <section className="card" aria-labelledby="cov-title">
                <h2 id="cov-title" className="text-lg font-bold">Cobertura</h2>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <div className="flex justify-between">
                      <span>Alcance del radio</span>
                      <span className="mono">{fmt(coverage.radio_range_km, 0)} km</span>
                    </div>
                    <div className="mt-1 h-2.5 rounded-full bg-slate-200 dark:bg-space-700">
                      <div className="h-full rounded-full bg-brand-blue dark:bg-sky-500" style={{ width: `${(coverage.radio_range_km / maxScale) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Horizonte geométrico a esa altitud</span>
                      <span className="mono">{fmt(coverage.horizon_km, 0)} km</span>
                    </div>
                    <div className="mt-1 h-2.5 rounded-full bg-slate-200 dark:bg-space-700">
                      <div className="h-full rounded-full bg-brand-red" style={{ width: `${(coverage.horizon_km / maxScale) * 100}%` }} />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  <strong>Radio efectivo: {fmt(coverage.coverage_radius_km, 0)} km</strong> · área ≈ {fmt(coverage.coverage_area_km2, 0)} km². La
                  cobertura está limitada por <strong>{coverage.limited_by}</strong>.
                </p>
              </section>

              {recommendation && (
                <section className="card" aria-labelledby="opt-title">
                  <h2 id="opt-title" className="text-lg font-bold">Recomendación automática de SF y BW</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Busca la mayor tasa de datos que conserve al menos 10 dB de margen con la potencia, ganancias y distancia actuales.
                  </p>
                  <p className="mt-3 text-sm">{recommendation.message}</p>
                  {recommendation.recommended && (
                    <>
                      <p className="mono mt-2 text-sm">
                        SF {recommendation.recommended.sf} · BW {recommendation.recommended.bw_khz} kHz · margen {fmt(recommendation.recommended.link_margin_db, 1)} dB ·
                        tasa {fmt(recommendation.recommended.bitrate_bps, 0)} bps · PDR {fmt(recommendation.recommended.pdr_estimated * 100, 0)} %
                      </p>
                      <button
                        type="button"
                        className="btn-ghost mt-3"
                        onClick={() =>
                          setS((prev) => ({
                            ...prev,
                            sf: recommendation.recommended!.sf,
                            bw_khz: recommendation.recommended!.bw_khz as Bandwidth,
                          }))
                        }
                      >
                        Aplicar al simulador
                      </button>
                    </>
                  )}
                </section>
              )}
            </div>
          </div>

          <section className="card" aria-labelledby="dop-title">
            <h2 id="dop-title" className="text-lg font-bold">Efecto Doppler en órbita LEO</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Un CubeSat que pasa sobre la estación desplaza la frecuencia recibida: f<sub>d</sub> = (v<sub>r</sub> / c) · f<sub>c</sub>. Usa la
              frecuencia y el ancho de banda elegidos arriba.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Slider label="Altitud orbital" value={dopplerAlt} unit="km" min={200} max={1200} step={10} onChange={setDopplerAlt} />
              <Slider label="Elevación sobre el horizonte" value={elevation} unit="°" min={0} max={90} onChange={setElevation} hint="0° = recién aparece; 90° = justo encima" />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-slate-500">Velocidad orbital</dt>
                <dd className="mono font-semibold">{fmt(doppler.orbital_velocity_kms, 2)} km/s</dd>
              </div>
              <div>
                <dt className="text-slate-500">Periodo</dt>
                <dd className="mono font-semibold">{fmt(doppler.orbital_period_min, 0)} min</dd>
              </div>
              <div>
                <dt className="text-slate-500">Corrimiento Doppler</dt>
                <dd className="mono font-semibold">{fmt(doppler.doppler_shift_khz, 1)} kHz</dd>
              </div>
              <div>
                <dt className="text-slate-500">Tolerancia del receptor</dt>
                <dd className="mono font-semibold">± {fmt(doppler.lora_tolerance_khz, 1)} kHz</dd>
              </div>
            </dl>
            <p className={`mt-3 rounded-lg p-3 text-sm ${doppler.within_tolerance ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200' : 'bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200'}`}>
              {doppler.message}
            </p>
            <div className="mt-4">
              <LineChart
                series={[
                  { label: 'Doppler (kHz)', color: '#003366', values: doppler.pass_profile.map((p) => p.doppler_hz / 1000) },
                  { label: '+ tolerancia', color: '#B71C1C', values: doppler.pass_profile.map(() => doppler.lora_tolerance_khz), dashed: true },
                  { label: '− tolerancia', color: '#B71C1C', values: doppler.pass_profile.map(() => -doppler.lora_tolerance_khz), dashed: true },
                ]}
                labels={doppler.pass_profile.map((p) => `${p.elevation_deg}°`)}
                zeroLine
                height={200}
                ariaLabel="Corrimiento Doppler durante un paso del satélite frente a la tolerancia del receptor"
              />
            </div>
          </section>

          <Callout title="Cómo se calcula" tone="info">
            El paquete reproduce en el navegador el mismo modelo del servicio de simulación: ecuación de Friis para el balance de
            enlace, sensibilidad del SX127x, horizonte geométrico y corrimiento Doppler. Así la simulación funciona dentro de
            Moodle aunque la API del ODC no esté accesible.
          </Callout>
        </div>
      </div>
    </Screen>
  );
}
