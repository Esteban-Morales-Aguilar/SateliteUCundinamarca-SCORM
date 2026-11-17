#!/usr/bin/env node
/**
 * Empaqueta el ODC como SCORM 1.2 listo para importar en Moodle.
 *
 *   npm run build
 *
 * Pasos: build de Vite → imsmanifest.xml con la lista real de archivos → .zip
 * con `imsmanifest.xml` en la raíz del paquete (requisito de Moodle).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const DIST = resolve(ROOT, 'dist');
const OUT_DIR = resolve(ROOT, 'release');
const ZIP_NAME = 'satelitecundinamarca-odc-scorm12.zip';
const ZIP_PATH = join(OUT_DIR, ZIP_NAME);

const IDENTIFIER = 'SPACENET-LAB-ODC-SCORM12';
const TITLE = 'SpaceNet Lab: Diseño, Simulación y Seguridad de Redes Inalámbricas para CubeSats y CanSat Educativos';
const AUTHORS = ['Esteban Morales Aguilar', 'Darikson Felipe Pérez Rodríguez'];
const DESCRIPTION =
  'Objeto Digital de Conocimiento de la Universidad de Cundinamarca: 10 pantallas sobre comunicaciones inalámbricas de largo alcance (LoRa y LoRaWAN), efecto Doppler, redundancia y seguridad en satélites educativos.';
const TODAY = new Date().toISOString().slice(0, 10);

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** Lista recursiva de archivos relativos al directorio del paquete. */
const walk = (dir, base = dir, acc = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else acc.push(relative(base, full).split('\\').join('/'));
  }
  return acc;
};

const buildManifest = (files) => {
  const fileEntries = files
    .filter((f) => f !== 'imsmanifest.xml')
    .sort()
    .map((f) => `      <file href="${escapeXml(f)}"/>`)
    .join('\n');

  const entities = AUTHORS.map(
    (a) => `          <entity><vcard>FN:${escapeXml(a)}</vcard></entity>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  SpaceNet Lab — Objeto Digital de Conocimiento (ODC)
  Universidad de Cundinamarca · Especialización en Infraestructura y Seguridad de Redes
  Empaquetado SCORM 1.2 · una SCO (index.html) · 10 pantallas
  Licencia CC BY-NC-SA 4.0
-->
<manifest identifier="${IDENTIFIER}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:lom="http://ltsc.ieee.org/xsd/LOM"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd
                      http://ltsc.ieee.org/xsd/LOM lomv1.0.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
    <lom:lom>
      <lom:general>
        <lom:title>
          <lom:string language="es">${escapeXml(TITLE)}</lom:string>
        </lom:title>
        <lom:language>es</lom:language>
        <lom:description>
          <lom:string language="es">${escapeXml(DESCRIPTION)}</lom:string>
        </lom:description>
        <lom:keyword><lom:string language="es">LoRa</lom:string></lom:keyword>
        <lom:keyword><lom:string language="es">LoRaWAN</lom:string></lom:keyword>
        <lom:keyword><lom:string language="es">CubeSat</lom:string></lom:keyword>
        <lom:keyword><lom:string language="es">CanSat</lom:string></lom:keyword>
        <lom:keyword><lom:string language="es">seguridad inalámbrica</lom:string></lom:keyword>
      </lom:general>
      <lom:lifeCycle>
        <lom:version><lom:string language="es">1.0</lom:string></lom:version>
        <lom:contribute>
          <lom:role><lom:value>author</lom:value></lom:role>
${entities}
          <lom:date><lom:dateTime>${TODAY}</lom:dateTime></lom:date>
        </lom:contribute>
      </lom:lifeCycle>
      <lom:rights>
        <lom:copyrightAndOtherRestrictions><lom:value>yes</lom:value></lom:copyrightAndOtherRestrictions>
        <lom:description>
          <lom:string language="es">Creative Commons BY-NC-SA 4.0 (Atribución, NoComercial, CompartirIgual)</lom:string>
        </lom:description>
      </lom:rights>
    </lom:lom>
  </metadata>

  <organizations default="ORG-SPACENET">
    <organization identifier="ORG-SPACENET" structure="hierarchical">
      <title>${escapeXml('SpaceNet Lab — ODC')}</title>
      <item identifier="ITEM-ODC" identifierref="RES-ODC" isvisible="true">
        <title>${escapeXml(TITLE)}</title>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="RES-ODC" type="webcontent" adlcp:scormtype="sco" href="index.html">
${fileEntries}
    </resource>
  </resources>
</manifest>
`;
};

const main = () => {
  console.log('› Build de Vite');
  execFileSync(process.execPath, [resolve(ROOT, 'node_modules/vite/bin/vite.js'), 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
  });

  if (!statSync(DIST).isDirectory()) throw new Error('No se generó dist/');

  const files = walk(DIST);
  writeFileSync(join(DIST, 'imsmanifest.xml'), buildManifest(files), 'utf8');
  console.log(`› imsmanifest.xml con ${files.length} archivos`);

  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const zipFiles = walk(DIST);
  execFileSync('zip', ['-q', '-r', '-X', ZIP_PATH, ...zipFiles], { cwd: DIST, stdio: 'inherit' });

  const size = statSync(ZIP_PATH).size;
  const video = statSync(join(DIST, 'media/estratosat-telco-despliegue.mp4')).size;
  console.log('');
  console.log('✅ Paquete SCORM 1.2 listo');
  console.log(`   ${ZIP_PATH}`);
  console.log(`   ${(size / 1024 / 1024).toFixed(1)} MB (video: ${(video / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`   Entradas: ${zipFiles.length + 1} (incluye imsmanifest.xml)`);
};

try {
  main();
} catch (err) {
  console.error('✖ No se pudo empaquetar:', err.message);
  process.exit(1);
}
