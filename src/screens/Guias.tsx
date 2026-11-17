import { useState } from 'react';
import { GUIAS, type Guia } from '../content';
import { fmtCOP } from '../lib/format';
import { Callout, DataTable, Screen, Tabs } from '../ui/bits';
import { CodeBlock } from '../ui/CodeBlock';

const LORA_PINS = [
  ['VIN', '3V3', '1'],
  ['GND', 'GND', '6'],
  ['SCK', 'GPIO11 (SCLK)', '23'],
  ['MISO', 'GPIO9 (MISO)', '21'],
  ['MOSI', 'GPIO10 (MOSI)', '19'],
  ['NSS / CS', 'GPIO8 (CE0)', '24'],
  ['RST', 'GPIO25', '22'],
  ['DIO0 (IRQ)', 'GPIO24', '18'],
];
const GPS_PINS = [
  ['VCC', '3V3', '1'],
  ['GND', 'GND', '9'],
  ['TXD', 'GPIO15 (RXD)', '10'],
  ['RXD', 'GPIO14 (TXD)', '8'],
];
const I2C_PINS = [
  ['VIN', '3V3', '17'],
  ['GND', 'GND', '14'],
  ['SDA', 'GPIO2 (SDA1)', '3'],
  ['SCL', 'GPIO3 (SCL1)', '5'],
];

const LAUNCH_PHASES: { title: string; items: string[] }[] = [
  {
    title: 'Antes del lanzamiento',
    items: [
      'Baterías cargadas y probadas en frío',
      'GPS con posición fija (fix)',
      'Prueba de enlace LoRa con la estación terrena',
      'Carga útil sellada, aislada y atada al paracaídas',
      'Permisos y aviso a la autoridad aeronáutica',
      'Pronóstico de viento y trayectoria estimada',
    ],
  },
  {
    title: 'Inflado',
    items: ['Zona despejada y con poco viento', 'Calcule la flotación neutra y el ascenso deseado', 'Infle con helio sin superar la carga de ruptura del globo'],
  },
  {
    title: 'Secuencia de lanzamiento',
    items: ['Telemetría activa antes de soltar', 'Registre hora, ubicación y condiciones', 'Suelte el globo y confirme el ascenso'],
  },
  {
    title: 'Monitoreo',
    items: ['Siga altitud y posición en el dashboard', 'Vigile RSSI, SNR y PDR del enlace', 'Anticipe la zona de descenso con la última posición'],
  },
  {
    title: 'Recuperación y análisis',
    items: ['Equipo de recuperación con gateway móvil', 'Documente el estado de la carga útil', 'Descargue los datos y compárelos con el simulador'],
  },
];

function PinTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-space-700">
      <table className="w-full text-left text-sm">
        <caption className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left font-semibold dark:border-space-700 dark:bg-space-800">{title}</caption>
        <thead className="bg-slate-100 dark:bg-space-700">
          <tr>
            <th scope="col" className="px-3 py-2">Módulo</th>
            <th scope="col" className="px-3 py-2">Raspberry Pi</th>
            <th scope="col" className="px-3 py-2">Pin físico</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-space-700">
          {rows.map((r) => (
            <tr key={r[0]}>
              <th scope="row" className="mono px-3 py-2 font-semibold">{r[0]}</th>
              <td className="mono px-3 py-2">{r[1]}</td>
              <td className="mono px-3 py-2">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Wiring() {
  const box = (x: number, y: number, w: number, h: number, label: string, sub?: string, red = false) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={red ? '#B71C1C' : '#0f3b6b'} stroke="#cfe0ff" strokeWidth="1.5" />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : 5)} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fill="#cfe0ff" fontSize="11" fontFamily="IBM Plex Mono, monospace">{sub}</text>}
    </g>
  );
  const line = (d: string, label: string, lx: number, ly: number) => (
    <g>
      <path d={d} stroke="#7cc4ff" strokeWidth="2" fill="none" />
      <text x={lx} y={ly} fill="#bfe3ff" fontSize="11" fontFamily="IBM Plex Mono, monospace">{label}</text>
    </g>
  );

  return (
    <div className="my-6 space-y-6">
      <figure className="overflow-hidden rounded-xl bg-space-900 p-4">
        <svg viewBox="0 0 640 300" role="img" aria-label="Diagrama de bloques: la Raspberry Pi se conecta por SPI al módulo LoRa, por UART al GPS, por I2C al sensor BME280 y recibe energía de la batería" className="mx-auto w-full max-w-3xl">
          {box(240, 100, 160, 100, 'Raspberry Pi', 'Zero 2 W / 4', true)}
          {box(30, 30, 150, 60, 'Módulo LoRa', 'RFM95W · SPI0')}
          {box(30, 210, 150, 60, 'GPS', 'UART')}
          {box(460, 30, 150, 60, 'BME280', 'I2C')}
          {box(460, 210, 150, 60, 'Batería', 'litio + regulador')}
          {line('M180 60 L240 130', 'SPI', 188, 90)}
          {line('M180 240 L240 175', 'UART', 190, 225)}
          {line('M460 60 L400 130', 'I2C', 425, 90)}
          {line('M460 240 L400 175', '3V3 / 5V', 410, 225)}
          <g stroke="#e8eefc" strokeWidth="2" fill="none">
            <path d="M60 30 V8 M60 8 l-8 10 M60 8 l8 10" />
          </g>
          <text x="76" y="16" fill="#c9d6ee" fontSize="11" fontFamily="Inter, sans-serif">antena 915 MHz</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-400">Diagrama de bloques del nodo. Todos los módulos comparten tierra (GND).</figcaption>
      </figure>
      <div className="grid gap-4 lg:grid-cols-3">
        <PinTable title="Módulo LoRa RFM95W (SPI0)" rows={LORA_PINS} />
        <PinTable title="GPS (UART)" rows={GPS_PINS} />
        <PinTable title="BME280 (I2C)" rows={I2C_PINS} />
      </div>
      <div role="note" className="rounded-xl border-l-4 border-brand-red bg-red-50 p-4 text-sm text-red-900 dark:bg-red-950/30 dark:text-red-200">
        <p className="font-semibold">Notas de seguridad</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Trabaje siempre con la alimentación desconectada.</li>
          <li>El RFM95W funciona a <strong>3,3 V</strong>: aplicarle 5 V lo destruye.</li>
          <li>Nunca transmita sin antena conectada: puede dañar la etapa de salida.</li>
          <li>Las baterías de litio no se perforan, cortocircuitan ni cargan sin supervisión.</li>
        </ul>
      </div>
    </div>
  );
}

function ComponentsTable({ rows }: { rows: NonNullable<Guia['components']> }) {
  const totals = rows.reduce((acc, r) => ({ economico: acc.economico + r.economico, premium: acc.premium + r.premium }), { economico: 0, premium: 0 });
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-space-700">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-left font-semibold dark:border-space-700 dark:bg-space-800">
          Presupuesto de referencia · perfil económico vs premium
        </caption>
        <thead className="bg-slate-100 dark:bg-space-700">
          <tr>
            <th scope="col" className="px-4 py-2.5">Componente</th>
            <th scope="col" className="px-4 py-2.5 text-right">Económico</th>
            <th scope="col" className="px-4 py-2.5 text-right">Premium</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-space-700">
          {rows.map((r) => (
            <tr key={r.item}>
              <th scope="row" className="px-4 py-2.5 font-medium">
                <span className="block text-xs font-normal text-slate-500">{r.category}</span>
                {r.item}
              </th>
              <td className="mono px-4 py-2.5 text-right">{fmtCOP(r.economico)}</td>
              <td className="mono px-4 py-2.5 text-right">{fmtCOP(r.premium)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-100 font-bold dark:bg-space-700">
          <tr>
            <th scope="row" className="px-4 py-3">Total</th>
            <td className="mono px-4 py-3 text-right">{fmtCOP(totals.economico)}</td>
            <td className="mono px-4 py-3 text-right">{fmtCOP(totals.premium)}</td>
          </tr>
        </tfoot>
      </table>
      <p className="border-t border-slate-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-900 dark:border-space-700 dark:bg-amber-950/30 dark:text-amber-200">
        Los precios varían según proveedor. Confírmelos con cotizaciones vigentes antes de comprar.
      </p>
    </div>
  );
}

function LaunchChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <div className="my-6 grid gap-4 md:grid-cols-2">
      {LAUNCH_PHASES.map((p) => (
        <fieldset key={p.title} className="card">
          <legend className="px-1 font-bold text-brand-blue dark:text-sky-300">{p.title}</legend>
          <ul className="mt-2 space-y-2">
            {p.items.map((item) => (
              <li key={item}>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-brand-blue" checked={!!done[item]} onChange={(e) => setDone((d) => ({ ...d, [item]: e.target.checked }))} />
                  <span className={done[item] ? 'text-slate-400 line-through' : ''}>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}

/** Pantalla 8 — Guías técnicas. */
export function GuiasScreen() {
  const [active, setActive] = useState(GUIAS[0]?.slug ?? '');
  const guide = GUIAS.find((g) => g.slug === active) ?? GUIAS[0];

  return (
    <Screen
      n={8}
      title="Guías técnicas"
      lead="Instrucciones paso a paso para replicar el proyecto: selección de componentes, conexiones, software, configuración LoRa, programación de la Raspberry Pi y protocolo de lanzamiento y recuperación."
    >
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Tabs items={GUIAS.map((g) => ({ id: g.slug, label: g.title }))} active={active} onChange={setActive} label="Guías técnicas" vertical />
          <button type="button" className="btn-ghost no-print mt-4 w-full text-sm" onClick={() => window.print()}>
            Descargar como PDF (imprimir)
          </button>
        </div>

        <article className="min-w-0" role="tabpanel">
          {guide && (
            <>
              <h2 className="text-2xl font-bold text-brand-blue dark:text-white">{guide.title}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{guide.description}</p>

              {guide.slug === 'seleccion-componentes' && guide.components && <ComponentsTable rows={guide.components} />}
              {guide.slug === 'conexiones-electricas' && <Wiring />}

              {guide.steps.length > 0 && (
                <ol className="mt-6 space-y-4">
                  {guide.steps.map((step) => (
                    <li key={step.step} className="card flex gap-4">
                      <span className="mono grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-blue text-sm font-bold text-white dark:bg-sky-600" aria-hidden>
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="mt-1 text-slate-700 dark:text-slate-300">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {guide.code.map((code, i) => (
                <CodeBlock key={`${guide.slug}-${i}`} code={code} />
              ))}

              {guide.slug === 'protocolo-lanzamiento' && <LaunchChecklist />}

              <div className="mt-8">
                <Callout title="Documentos descargables" tone="info">
                  Las versiones en PDF de las guías se entregan desde el sitio del ODC, que requiere conexión. Dentro del aula
                  virtual todo el contenido está en esta pantalla y puede imprimirse o guardarse como PDF con el botón superior.
                </Callout>
              </div>
            </>
          )}
        </article>
      </div>

      <div className="mt-10">
        <DataTable
          caption="Ruta completa de replicación"
          head={['Paso', 'Guía', 'Qué se obtiene']}
          rows={GUIAS.map((g) => [String(g.order), g.title, g.description])}
        />
      </div>
    </Screen>
  );
}
