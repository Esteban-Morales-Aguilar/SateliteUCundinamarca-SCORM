import { MARCO } from '../content';
import { asset } from '../lib/format';
import { AtmosphereDiagram } from '../ui/AtmosphereDiagram';
import { DataTable, ReferenceChips, Screen } from '../ui/bits';
import { RichText } from '../ui/RichText';

/** Pantalla 3 — Marco teórico: perfil vertical de la atmósfera. */
export function AtmosferaScreen() {
  const section = MARCO.find((s) => s.slug === 'satelites-educativos') ?? MARCO[0];

  return (
    <Screen
      n={3}
      title="Marco teórico: perfil vertical de la atmósfera"
      lead="La atmósfera se organiza en cinco capas, de la superficie hacia arriba: troposfera, estratosfera, mesosfera, termosfera y exosfera. Los globos de gran altitud (HAB) operan en la estratosfera y los CubeSat, en órbita baja."
    >
      <figure className="grid gap-6 overflow-hidden rounded-xl bg-space-900 p-6 text-slate-200 md:grid-cols-[minmax(0,17rem)_1fr] md:items-center">
        <AtmosphereDiagram className="mx-auto w-full max-w-xs" label="Infografía de las capas de la atmósfera con un globo HAB a 30 km" />
        <figcaption className="space-y-3 text-sm">
          <p className="text-base font-semibold text-white">Dónde opera cada plataforma</p>
          <p>
            Un globo HAB sube hasta la estratosfera (~30 km): allí la presión es una pequeña fracción de la del nivel del mar y
            la temperatura ronda los −50 °C, condiciones que se parecen al espacio a una fracción del costo.
          </p>
          <p>
            Un CubeSat, en cambio, orbita en LEO a unos 400 km, dentro de la termosfera, y se mueve a ≈ 7,7 km/s: de ahí viene
            el efecto Doppler que se estudia en la pantalla 4.
          </p>
        </figcaption>
      </figure>

      <figure className="mt-8 overflow-hidden rounded-xl">
        <img src={asset('media/globosatelite.webp')} alt="Globo satélite ESTRATOSAT-TELCO en vuelo" className="w-full rounded-xl object-cover" loading="lazy" />
        <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          Globo satélite ESTRATOSAT-TELCO en vuelo · misión del proyecto
        </figcaption>
      </figure>

      <DataTable
        caption="Tres plataformas educativas, de un vistazo (valores típicos)"
        head={['Plataforma', 'Qué es', 'Dónde opera']}
        rows={[
          ['CubeSat', 'Nanosatélite estandarizado en unidades de 10 cm (1U)', 'Órbita baja terrestre (LEO), ≈ 400 km'],
          ['CanSat', 'Modelo del tamaño de una lata de bebida (~330 ml)', 'Cohete o globo pequeño, hasta pocos km'],
          ['HAB', 'Globo de gran altitud con carga útil', 'Estratosfera, ≈ 30 km'],
        ]}
      />

      <article className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-brand-blue dark:text-white">{section?.title}</h2>
        {section && <RichText html={section.content} />}
        {section && <ReferenceChips refs={section.references} />}
      </article>
    </Screen>
  );
}
