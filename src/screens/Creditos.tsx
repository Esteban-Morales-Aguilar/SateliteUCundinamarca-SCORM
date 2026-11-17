import { useMemo } from 'react';
import { CREDITOS, REFERENCIAS, type Referencia } from '../content';
import { DataTable, Screen } from '../ui/bits';

const TOPICS: Record<string, string> = {
  satelites: 'Satélites educativos',
  lora: 'LoRa y LoRaWAN',
  doppler: 'Efecto Doppler y redundancia',
  seguridad: 'Seguridad en LoRaWAN',
};
const PENDING = /\[Completar[^\]]*\]/;

const groupByTopic = (refs: Referencia[]): [string, Referencia[]][] => {
  const map = new Map<string, Referencia[]>();
  for (const r of refs) {
    const key = TOPICS[r.topic] ?? 'Otras referencias';
    map.set(key, [...(map.get(key) ?? []), r]);
  }
  return [...map.entries()];
};

/** Pantalla 10 — Créditos y referencias. */
export function CreditosScreen() {
  const groups = useMemo(() => groupByTopic(CREDITOS.references?.length ? CREDITOS.references : REFERENCIAS), []);

  return (
    <Screen
      n={10}
      title="Créditos y referencias"
      lead="SpaceNet Lab fue desarrollado por Esteban Morales Aguilar y Darikson Felipe Pérez Rodríguez, estudiantes de la Especialización en Infraestructura y Seguridad de Redes de la Universidad de Cundinamarca."
      wide={false}
    >
      <dl className="mt-2 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-slate-500">Autores</dt>
          <dd className="mt-1 font-semibold">{CREDITOS.authors.map((a) => a.name).join(' · ')}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Docente</dt>
          <dd className="mt-1 font-semibold">{CREDITOS.teacher}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Programa</dt>
          <dd className="mt-1 font-semibold">{CREDITOS.program}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Universidad</dt>
          <dd className="mt-1 font-semibold">{CREDITOS.university} – Oficina de Educación Virtual y a Distancia</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Grupo de CTI</dt>
          <dd className="mono mt-1 font-semibold">{CREDITOS.researchGroup}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Año</dt>
          <dd className="mt-1 font-semibold">{CREDITOS.year}</dd>
        </div>
      </dl>

      <section className="card mt-10" aria-labelledby="lic">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="lic" className="text-lg font-bold">Licencia</h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300">
              Este objeto digital de conocimiento se distribuye bajo <strong>{CREDITOS.license}</strong>: puede copiarlo, adaptarlo y
              compartirlo citando a los autores, sin fines comerciales y bajo la misma licencia.
            </p>
          </div>
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es"
            target="_blank"
            rel="noopener noreferrer license"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-space-600 dark:text-slate-200 dark:hover:bg-space-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.2 9.5a3.2 3.2 0 1 0 0 5M16.2 9.5a3.2 3.2 0 1 0 0 5" />
            </svg>
            CC BY-NC-SA 4.0
          </a>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="metadatos">
        <h2 id="metadatos" className="text-2xl font-bold text-brand-blue dark:text-white">Ficha de metadatos</h2>
        <DataTable
          caption="Metadatos del ODC (storyboard v4)"
          head={['Campo', 'Valor']}
          rows={[
            ['Área de conocimiento', 'Ingeniería de Sistemas y Computación / Telecomunicaciones / Redes'],
            ['Nombre del material', 'SpaceNet Lab: Diseño, Simulación y Seguridad de Redes Inalámbricas para CubeSats y CanSat Educativos'],
            ['Autor', 'Esteban Morales Aguilar, Darikson Felipe Pérez Rodríguez'],
            ['Diseño y desarrollo', 'Esteban Morales Aguilar, Darikson Felipe Pérez Rodríguez'],
            ['Imágenes', 'Imágenes de dominio público, diagramas propios, capturas del dashboard'],
            ['Sonidos y voces', 'Audio original del video del despliegue (las demás pantallas no incluyen audio)'],
            ['Fecha de creación', String(CREDITOS.year)],
            ['Nivel educativo', 'Intermedio / Alto (estudiantes universitarios de ingeniería)'],
            ['Idioma', 'Español'],
            ['Licencia', CREDITOS.license],
            ['Institución', 'Universidad de Cundinamarca – Oficina de Educación Virtual y a Distancia'],
            ['Empaquetado', 'SCORM 1.2 · una SCO · 10 pantallas'],
          ]}
        />
      </section>

      <section id="referencias" className="mt-12" aria-labelledby="refs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="refs" className="text-2xl font-bold text-brand-blue dark:text-white">Referencias (APA 7)</h2>
          <button type="button" className="btn-primary no-print" onClick={() => window.print()}>
            Descargar referencias como PDF
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {REFERENCIAS.length} referencias de la revisión sistemática (PRISMA 2020) que sustenta el ODC.
        </p>

        {groups.map(([topic, refs]) => (
          <div key={topic} className="mt-6">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">{topic}</h3>
            <ul className="mt-2 space-y-3">
              {refs.map((r) => (
                <li
                  key={r._id}
                  id={`ref-${r.citeKey}`}
                  className="border-l-2 border-slate-300 pl-4 text-sm leading-relaxed dark:border-space-600"
                  style={{ textIndent: '-1.5rem', paddingLeft: '2.25rem' }}
                >
                  {PENDING.test(r.apa) ? (
                    <>
                      {r.apa.replace(/\s*\[Completar[^\]]*\]/, '')} <em className="text-slate-500">(referencia completa pendiente de publicar)</em>
                    </>
                  ) : (
                    r.apa
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <footer className="mt-14 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-space-700 dark:text-slate-400">
        <p>
          {CREDITOS.university} · {CREDITOS.program} · Grupo CTI {CREDITOS.researchGroup} · {CREDITOS.year}
        </p>
        <p className="mt-1">Contenido bajo licencia {CREDITOS.license}. Trabajo de grado.</p>
      </footer>
    </Screen>
  );
}
