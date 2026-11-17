import { SCREENS, TOTAL_SCREENS } from '../screens';
import { CREDITOS } from '../content';
import { AtmosphereDiagram } from '../ui/AtmosphereDiagram';

/** Pantalla 1 — Portada. */
export function PortadaScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="screen-enter bg-gradient-to-br from-brand-blue via-[#052a52] to-space-900 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.1fr_.9fr] lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-sky-200">
            Objeto Digital de Conocimiento · Universidad de Cundinamarca
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl">
            <span className="block text-sky-300">SpaceNet Lab</span>
            <span className="mt-3 block text-2xl font-bold leading-snug sm:text-3xl">
              Diseño, simulación y seguridad de redes inalámbricas para CubeSats y CanSat educativos
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-200">
            Explore a su ritmo cómo se comunica un satélite educativo de bajo costo: desde la teoría de LoRa
            hasta una misión de globo estratosférico transmitiendo en vivo.
          </p>

          <dl className="mt-8 grid max-w-xl gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-sky-300">Autores</dt>
              <dd className="font-semibold">{CREDITOS.authors.map((a) => a.name).join(' · ')}</dd>
            </div>
            <div>
              <dt className="text-sky-300">Programa</dt>
              <dd className="font-semibold">{CREDITOS.program}</dd>
            </div>
            <div>
              <dt className="text-sky-300">Universidad</dt>
              <dd className="font-semibold">{CREDITOS.university}</dd>
            </div>
            <div>
              <dt className="text-sky-300">Grupo de CTI</dt>
              <dd className="mono font-semibold">{CREDITOS.researchGroup}</dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => onNavigate('menu')} className="btn-primary !bg-white !px-6 !py-3 !text-brand-blue hover:!bg-sky-100">
              Entrar
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('mision')}
              className="btn-ghost !border-white/40 !text-white hover:!bg-white/10"
            >
              Ver la misión registrada
            </button>
            <span className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-sky-100">
              {TOTAL_SCREENS} pantallas · sin evaluaciones
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <AtmosphereDiagram className="w-full" label="Perfil de la atmósfera con un globo de gran altitud y su enlace de radio a tierra" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-slate-300">
          <p>Licencia {CREDITOS.license} · {CREDITOS.year}</p>
          <p className="mono">
            Curso SCORM 1.2 · {SCREENS.length} pantallas · contenido del ODC
          </p>
        </div>
      </div>
    </div>
  );
}
