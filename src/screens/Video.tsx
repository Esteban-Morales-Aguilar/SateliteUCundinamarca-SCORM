import { useRef, useState } from 'react';
import { asset } from '../lib/format';
import { Callout, Screen } from '../ui/bits';

const PHASES = [
  { t: 'Lanzamiento', d: 'Inflado del globo, verificación final de la carga útil y suelta con la telemetría ya activa.' },
  { t: 'Ascenso', d: 'El globo atraviesa la troposfera y entra a la estratosfera mientras el enlace LoRa se mantiene.' },
  { t: 'Operación', d: 'Cerca de los 30 km se registran altitud, presión, temperatura y calidad del enlace.' },
  { t: 'Recuperación', d: 'Descenso con paracaídas y localización de la carga útil con la última posición recibida.' },
];

const mmss = (s: number) => {
  if (!Number.isFinite(s)) return '';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

/** Pantalla 9 — Video del despliegue. */
export function VideoScreen() {
  const [duration, setDuration] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Screen
      n={9}
      title="Video del despliegue"
      lead="Video del lanzamiento, ascenso, operación y recuperación del satélite educativo ESTRATOSAT-TELCO."
      wide={false}
    >
      <figure className="overflow-hidden rounded-2xl bg-space-950 ring-1 ring-space-700">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black"
          controls
          playsInline
          preload="metadata"
          poster={asset('media/estratosat-telco-miniatura.webp')}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        >
          <source src={asset('media/estratosat-telco-despliegue.mp4')} type="video/mp4" />
          Su navegador no puede reproducir el video. El archivo está incluido en el paquete como
          <code> media/estratosat-telco-despliegue.mp4</code>.
        </video>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm text-slate-300">
          <span className="font-semibold">ESTRATOSAT-TELCO · despliegue completo</span>
          <span className="mono text-xs text-slate-400">
            {duration ? `${mmss(duration)} min` : 'MP4 incluido en el paquete'} · audio original
          </span>
        </figcaption>
      </figure>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        El video muestra el despliegue real del satélite educativo y es la única pantalla del ODC con audio.
      </p>

      <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {PHASES.map((p) => (
          <div key={p.t} className="border-t border-slate-300 pt-3 dark:border-space-600">
            <dt className="font-semibold text-brand-blue dark:text-sky-300">{p.t}</dt>
            <dd className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.d}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <Callout title="Accesibilidad" tone="info">
          Si el aula virtual no permite reproducir el archivo, el video también está disponible en el sitio del ODC con
          subtítulos y descarga directa. Las cuatro fases del vuelo quedan descritas por escrito en esta misma pantalla.
        </Callout>
      </div>
    </Screen>
  );
}
