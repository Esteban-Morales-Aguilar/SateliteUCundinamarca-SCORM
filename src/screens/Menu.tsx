import { asset } from '../lib/format';
import { SCREENS } from '../screens';
import { Screen } from '../ui/bits';

const MODULES = [
  {
    id: 'atmosfera',
    title: 'Marco teórico aplicado',
    desc: 'Satélites educativos, LoRa y LoRaWAN, efecto Doppler, redundancia y seguridad, con las referencias de la revisión sistemática.',
    icon: 'M12 3v18M5 10l7-7 7 7M5 14l7 7 7-7',
    screens: 'Pantallas 3, 4 y 5',
  },
  {
    id: 'mision',
    title: 'Dashboard interactivo',
    desc: 'Una misión en vivo con mapa y telemetría, y un simulador para ver qué le pasa al enlace cuando cambia la potencia, el SF o la distancia.',
    icon: 'M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    screens: 'Pantallas 6 y 7',
  },
  {
    id: 'guias',
    title: 'Guías técnicas',
    desc: 'Componentes con precios en COP, conexiones, instalación, código para la Raspberry Pi y el protocolo de lanzamiento.',
    icon: 'M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5zM8 7h8M8 11h8M8 15h5',
    screens: 'Pantalla 8',
  },
  {
    id: 'video',
    title: 'Video del despliegue',
    desc: 'Lanzamiento, ascenso, operación y recuperación del satélite educativo ESTRATOSAT-TELCO.',
    icon: 'M3 6h12v12H3zM15 10l6-3v10l-6-3',
    screens: 'Pantalla 9',
  },
];

const PRINCIPLES = [
  { t: 'Quien aprende decide', d: 'Navegación libre, sin secuencias obligatorias.' },
  { t: 'Varias dimensiones', d: 'Teoría, visualización, simulación y guías conviven en un mismo lugar.' },
  { t: 'Aprender haciendo', d: 'El ODC es el resultado tangible de la misión ESTRATOSAT-TELCO.' },
  { t: 'Más allá del aula', d: 'Todo está disponible a cualquier hora, dentro del aula virtual.' },
  { t: 'Conexión con el territorio', d: 'Las guías permiten que otras comunidades educativas lo repliquen.' },
  { t: 'Educación para la vida', d: 'Competencias técnicas y ciudadanas: redes, seguridad y trabajo abierto.' },
];

/** Pantalla 2 — Menú principal. */
export function MenuScreen({ onNavigate, visited }: { onNavigate: (id: string) => void; visited: string[] }) {
  const pending = SCREENS.filter((s) => !visited.includes(s.id)).length;

  return (
    <Screen
      n={2}
      title="Menú principal"
      lead="Explora los tres módulos del proyecto (marco teórico, dashboard interactivo y guías técnicas) y el video del despliegue."
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {MODULES.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => onNavigate(m.id)}
              className="card group flex h-full w-full flex-col items-start border-l-4 border-l-brand-red text-left transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue dark:bg-sky-900/40 dark:text-sky-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                  <path d={m.icon} />
                </svg>
              </span>
              <h2 className="mt-4 text-xl font-bold text-brand-blue group-hover:underline dark:text-white">{m.title}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{m.desc}</p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{m.screens}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">
        <img src={asset('assets/imagen-presentacion.png')} alt="Presentación del proyecto SpaceNet Lab: globo estratosférico, CubeSat y enlace de radio LoRa" className="w-full object-cover" />
      </div>

      <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="section-title">Aprender explorando</h2>
          <p className="lead mt-3">
            Este ODC sigue el Modelo Educativo Digital Transmoderno (MEDIT): quien aprende gestiona su propio camino. No hay
            evaluaciones ni puntajes, solo contenido, simulación y práctica para construir y replicar.
          </p>
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-space-700 dark:bg-space-800 dark:text-slate-300">
            <p>
              La actividad se marca como <strong>completada</strong> cuando se recorren las diez pantallas. El avance queda guardado
              en el aula virtual, así que puede continuar después donde lo dejó.
            </p>
            <p className="mt-2">
              {pending === 0 ? 'Ya recorrió todas las pantallas.' : `Le faltan ${pending} pantallas por visitar.`}
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-300">Cómo se refleja el MEDIT aquí</h3>
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="border-t border-slate-300 pt-3 dark:border-space-600">
                <dt className="font-semibold text-brand-blue dark:text-sky-300">{p.t}</dt>
                <dd className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.d}</dd>
              </div>
            ))}
          </dl>
          <button type="button" onClick={() => onNavigate('creditos')} className="btn-ghost mt-8">
            Créditos y referencias (APA 7)
          </button>
        </div>
      </section>
    </Screen>
  );
}
