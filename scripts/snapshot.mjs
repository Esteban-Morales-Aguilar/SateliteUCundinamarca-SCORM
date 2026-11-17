#!/usr/bin/env node
/**
 * Genera `src/content.ts` con una instantánea del contenido publicado del ODC.
 *
 * El paquete SCORM debe funcionar dentro de Moodle sin acceso a las API del sitio,
 * así que el contenido y la telemetría se congelan en el momento de empaquetar.
 *
 * Uso:
 *   node scripts/scorm-snapshot.mjs                       # API pública por defecto
 *   SPACENET_API=http://localhost/api/v1 node scripts/scorm-snapshot.mjs
 *
 * La telemetría se reduce por muestreo para que el paquete no crezca de más.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const API = (process.env.SPACENET_API ?? 'https://satelitecundinamarca.duckdns.org/api/v1').replace(/\/$/, '');
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../src/content.ts');
const HISTORY_POINTS = 180;

const get = async (path) => {
  const res = await fetch(`${API}${path}`, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.json();
};

/** Reduce una serie temporal a `max` puntos conservando primero y último. */
const sample = (points, max) => {
  if (!Array.isArray(points) || points.length <= max) return points ?? [];
  const step = (points.length - 1) / (max - 1);
  const out = [];
  for (let i = 0; i < max; i += 1) out.push(points[Math.round(i * step)]);
  return out;
};

const round = (v, d = 2) => (typeof v === 'number' ? Number(v.toFixed(d)) : v ?? null);

const main = async () => {
  console.log(`Instantánea de ${API}`);

  const [marco, guias, creditos, referencias, latest, history, mission] = await Promise.all([
    get('/content/marco-teorico?limit=50'),
    get('/content/guias'),
    get('/content/creditos'),
    get('/content/referencias'),
    get('/telemetry/latest'),
    get('/telemetry/history'),
    get('/telemetry/mission'),
  ]);

  const sections = (marco.items ?? [])
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      order: s.order,
      content: s.content,
      references: s.references ?? [],
    }))
    .sort((a, b) => a.order - b.order);

  const guides = (guias ?? [])
    .map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      order: g.order,
      // El `_id` de Mongo no aporta nada al paquete: se descarta para no ensuciar
      // el snapshot ni chocar con las interfaces de TypeScript.
      steps: (g.steps ?? []).map((s) => ({ step: s.step, title: s.title, body: s.body })),
      code: g.code ?? [],
      pdfUrl: g.pdfUrl ?? null,
      components: (g.components ?? []).map((c) => ({
        category: c.category,
        item: c.item,
        economico: c.economico,
        premium: c.premium,
      })),
    }))
    .sort((a, b) => a.order - b.order);

  const creditosClean = {
    authors: (creditos.authors ?? []).map((a) => ({ name: a.name })),
    program: creditos.program,
    university: creditos.university,
    researchGroup: creditos.researchGroup,
    teacher: creditos.teacher,
    year: creditos.year,
    license: creditos.license,
    references: (creditos.references ?? []).map((r) => ({
      _id: r._id,
      citeKey: r.citeKey,
      topic: r.topic ?? '',
      apa: r.apa,
    })),
  };

  const historyPoints = sample(history, HISTORY_POINTS).map((p) => ({
    time: p.time,
    altitude: round(p.altitude, 1),
    temperature: round(p.temperature, 2),
    pressure: round(p.pressure, 2),
    humidity: round(p.humidity, 2),
    latitude: round(p.latitude, 5),
    longitude: round(p.longitude, 5),
    rssi: round(p.rssi, 1),
    snr: round(p.snr, 1),
    pdr: round(p.pdr, 3),
  }));

  const payload = {
    generatedAt: new Date().toISOString(),
    source: API,
    mission,
    latest,
    history: historyPoints,
    marco: sections,
    guias: guides,
    creditos: creditosClean,
    referencias,
  };

  const header = `/* eslint-disable */
/**
 * ARCHIVO GENERADO — no editar a mano.
 * Instantánea del contenido publicado del ODC SpaceNet Lab.
 * Generado: ${payload.generatedAt}
 * Origen: ${API}
 * Regenerar con: npm run snapshot
 */

export interface MarcoSection { slug: string; title: string; order: number; content: string; references: string[] }
export interface GuiaStep { step: number; title: string; body: string }
export interface GuiaComponent { category: string; item: string; economico: number; premium: number }
export interface Guia {
  slug: string; title: string; description: string; order: number;
  steps: GuiaStep[]; code: string[]; pdfUrl: string | null; components: GuiaComponent[] | null;
}
export interface Referencia { _id: string; citeKey: string; topic: string; apa: string }
export interface Creditos {
  authors: { name: string }[]; program: string; university: string; researchGroup: string;
  teacher: string; year: number; license: string; references: Referencia[];
}
export interface TelemetryPoint {
  time: string; altitude: number | null; temperature: number | null; pressure: number | null;
  humidity: number | null; latitude: number | null; longitude: number | null;
  rssi: number | null; snr: number | null; pdr: number | null;
}
export interface Mission { id: string; name: string; description?: string; status: string; start_at: string; end_at?: string | null }

export const GENERATED_AT = ${JSON.stringify(payload.generatedAt)};
export const SOURCE_API = ${JSON.stringify(API)};

export const MISSION: Mission = ${JSON.stringify(mission, null, 2)};

export const LATEST: TelemetryPoint = ${JSON.stringify(
    {
      time: latest.time,
      altitude: round(latest.altitude, 1),
      temperature: round(latest.temperature, 2),
      pressure: round(latest.pressure, 2),
      humidity: round(latest.humidity, 2),
      latitude: round(latest.latitude, 5),
      longitude: round(latest.longitude, 5),
      rssi: round(latest.rssi, 1),
      snr: round(latest.snr, 1),
      pdr: round(latest.pdr, 3),
    },
    null,
    2,
  )};

export const HISTORY: TelemetryPoint[] = ${JSON.stringify(historyPoints, null, 2)};

export const MARCO: MarcoSection[] = ${JSON.stringify(sections, null, 2)};

export const GUIAS: Guia[] = ${JSON.stringify(guides, null, 2)};

export const CREDITOS: Creditos = ${JSON.stringify(creditosClean, null, 2)};

export const REFERENCIAS: Referencia[] = ${JSON.stringify(referencias, null, 2)};

/** Índice citeKey → referencia APA 7, para las fichas de cada sección. */
export const REF_BY_KEY: Record<string, Referencia> = Object.fromEntries(
  REFERENCIAS.map((r) => [r.citeKey, r]),
);
`;

  await writeFile(OUT, header, 'utf8');
  console.log(`OK → ${OUT}`);
  console.log(`   ${sections.length} secciones · ${guides.length} guías · ${referencias.length} referencias · ${historyPoints.length}/${(history ?? []).length} puntos de telemetría`);
};

main().catch((err) => {
  console.error('No se pudo generar la instantánea:', err.message);
  process.exit(1);
});
