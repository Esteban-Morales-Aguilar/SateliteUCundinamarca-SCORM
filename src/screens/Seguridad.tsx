import { MARCO } from '../content';
import { ReferenceChips, Screen } from '../ui/bits';
import { RichText } from '../ui/RichText';

/** Pantalla 5 — Marco teórico: seguridad y AES-128. */
export function SeguridadScreen() {
  const section = MARCO.find((s) => s.slug === 'seguridad-lorawan');

  return (
    <Screen
      n={5}
      title="Marco teórico: seguridad y AES-128"
      lead="La seguridad en LoRaWAN se implementa con cifrado AES-128 y gestión de claves. Las vulnerabilidades se concentran en las capas PHY, MAC y aplicación."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <article>
          <h2 className="mb-4 text-xl font-bold text-brand-blue dark:text-white">{section?.title}</h2>
          {section && <RichText html={section.content} />}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <figure className="card">
            <figcaption className="mb-3 font-semibold">Dónde se concentran los ataques documentados</figcaption>
            <div className="flex h-9 overflow-hidden rounded-lg text-sm font-semibold text-white" role="img" aria-label="62 por ciento de los ataques en la capa MAC y 38 por ciento en otras capas">
              <div className="grid place-items-center bg-brand-red" style={{ width: '62%' }}>
                MAC · 62 %
              </div>
              <div className="grid place-items-center bg-brand-blue dark:bg-sky-700" style={{ width: '38%' }}>
                PHY y aplicación · 38 %
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Fuente: revisión sistemática de literatura (PRISMA 2020) que sustenta este ODC.
            </p>
          </figure>

          <div className="card">
            <h3 className="font-bold text-brand-blue dark:text-sky-300">Tres ideas para llevarse</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>AES-128 protege el tráfico, pero la gestión de claves es el punto débil.</li>
              <li>La capa MAC concentra la mayoría de los ataques documentados.</li>
              <li>La redundancia y el monitoreo del enlace también son medidas de seguridad.</li>
            </ul>
          </div>
        </aside>
      </div>

      {section && <ReferenceChips refs={section.references} />}
    </Screen>
  );
}
