import { useEffect, useMemo, useState } from 'react';
import { HISTORY, LATEST, MISSION } from '../content';
import { fmt, longDate, shortTime } from '../lib/format';
import { Callout, Kpi, Screen } from '../ui/bits';
import { LineChart } from '../ui/LineChart';
import { TrajectoryMap } from '../ui/TrajectoryMap';

/** Pantalla 6 — Dashboard: misión en vivo. */
export function MisionScreen() {
  const total = HISTORY.length;
  const [index, setIndex] = useState(Math.max(0, total - 1));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((i) => {
        if (i >= total - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 450);
    return () => window.clearInterval(timer);
  }, [playing, total]);

  const point = HISTORY[index] ?? LATEST;
  const visible = useMemo(() => HISTORY.slice(0, Math.max(1, index + 1)), [index]);
  const labels = useMemo(() => visible.map((p) => shortTime(p.time)), [visible]);
  const values = (field: 'altitude' | 'temperature' | 'pressure' | 'humidity' | 'rssi' | 'snr') =>
    visible.map((p) => p[field]);

  const rssiPct = Math.max(0, Math.min(100, (((point.rssi ?? -100) + 100) / 50) * 100));

  const restart = () => {
    setIndex(0);
    setPlaying(true);
  };

  return (
    <Screen
      n={6}
      title="Dashboard: misión en vivo"
      lead="Visualiza en tiempo real los datos transmitidos por el satélite: ubicación GPS, altitud, temperatura, presión y humedad."
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue dark:text-white">{MISSION.name}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{MISSION.description}</p>
          <p className="mono mt-1 text-xs text-slate-500 dark:text-slate-400">
            Último registro: {longDate(LATEST.time)} · {total} muestras en el paquete
          </p>
        </div>
        <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
          Reproducción de la misión registrada
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={() => (index >= total - 1 ? restart() : setPlaying((p) => !p))}>
          {playing ? 'Pausar' : index >= total - 1 ? 'Reproducir la misión' : 'Continuar'}
        </button>
        <button type="button" className="btn-ghost" onClick={() => setIndex(Math.max(0, total - 1))}>
          Actualizar datos
        </button>
        <label className="flex min-w-[12rem] flex-1 items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <span className="mono whitespace-nowrap">
            {index + 1}/{total}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            value={index}
            onChange={(e) => {
              setPlaying(false);
              setIndex(e.target.valueAsNumber);
            }}
            className="w-full accent-brand-blue"
            aria-label="Posición en la misión registrada"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Altitud" value={point.altitude} unit="m" digits={0} />
        <Kpi label="Temperatura" value={point.temperature} unit="°C" />
        <Kpi label="Presión" value={point.pressure} unit="hPa" />
        <Kpi label="Humedad" value={point.humidity} unit="%" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <TrajectoryMap points={HISTORY} index={index} />

        <div className="card">
          <h3 className="text-lg font-bold">Calidad del enlace</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-600 dark:text-slate-400">RSSI</dt>
              <dd className="mono font-semibold">{fmt(point.rssi, 1)} dBm</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-600 dark:text-slate-400">SNR</dt>
              <dd className="mono font-semibold">{fmt(point.snr, 1)} dB</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-600 dark:text-slate-400">PDR</dt>
              <dd className="mono font-semibold">{fmt((point.pdr ?? 0) * 100, 0)} %</dd>
            </div>
          </dl>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Estado del RSSI</span>
              <span className="mono">{fmt(rssiPct, 0)} %</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-space-700">
              <div className={`h-full rounded-full ${rssiPct > 60 ? 'bg-emerald-500' : rssiPct > 30 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${rssiPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Señal buena por encima de −70 dBm.</p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Posición: <span className="mono">{fmt(point.latitude, 5)}, {fmt(point.longitude, 5)}</span>
            <br />
            Hora del registro: <span className="mono">{shortTime(point.time)}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ChartCard title="Altitud" unit="m"><LineChart series={[{ label: 'Altitud (m)', color: '#003366', values: values('altitude'), fill: true }]} labels={labels} ariaLabel="Evolución de la altitud durante la misión" /></ChartCard>
        <ChartCard title="Temperatura" unit="°C"><LineChart series={[{ label: 'Temperatura (°C)', color: '#B71C1C', values: values('temperature'), fill: true }]} labels={labels} ariaLabel="Evolución de la temperatura durante la misión" /></ChartCard>
        <ChartCard title="Presión" unit="hPa"><LineChart series={[{ label: 'Presión (hPa)', color: '#15803d', values: values('pressure'), fill: true }]} labels={labels} ariaLabel="Evolución de la presión durante la misión" /></ChartCard>
        <ChartCard title="Humedad" unit="%"><LineChart series={[{ label: 'Humedad (%)', color: '#b45309', values: values('humidity'), fill: true }]} labels={labels} ariaLabel="Evolución de la humedad durante la misión" /></ChartCard>
        <ChartCard title="RSSI" unit="dBm"><LineChart series={[{ label: 'RSSI (dBm)', color: '#003366', values: values('rssi') }]} labels={labels} ariaLabel="Evolución del RSSI durante la misión" /></ChartCard>
        <ChartCard title="SNR" unit="dB"><LineChart series={[{ label: 'SNR (dB)', color: '#15803d', values: values('snr') }]} labels={labels} ariaLabel="Evolución de la relación señal/ruido durante la misión" /></ChartCard>
      </div>

      <div className="mt-6">
        <Callout title="Sobre esta pantalla" tone="info">
          Los datos provienen de la misión real del proyecto ESTRATOSAT-TELCO y se congelaron al empaquetar el curso, porque el
          aula virtual no puede consultar la API del ODC. El modo en vivo con WebSocket está disponible en el sitio
          satelitecundinamarca.duckdns.org. Use <strong>Reproducir la misión</strong> para recorrer el vuelo completo.
        </Callout>
      </div>
    </Screen>
  );
}

function ChartCard({ title, unit, children }: { title: string; unit: string; children: React.ReactNode }) {
  return (
    <figure className="card">
      <figcaption className="mb-2 flex items-baseline justify-between text-sm font-semibold">
        <span>{title}</span>
        <span className="mono text-xs font-normal text-slate-500">{unit}</span>
      </figcaption>
      {children}
    </figure>
  );
}
