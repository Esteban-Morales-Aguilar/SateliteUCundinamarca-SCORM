#!/usr/bin/env node
/**
 * Genera el sitio "portable" del ODC (para abrir sin servidor y para GitHub Pages).
 *
 *   npm run build:preview
 *
 * Pasos:
 *  1. build estándar (genera dist/ y el imsmanifest.xml de referencia);
 *  2. build IIFE (script clásico) en dist-preview/;
 *  3. convierte el <script type="module"> en <script defer> para que funcione
 *     bajo file://;
 *  4. reutiliza la cabecera del manifiesto oficial y ajusta la lista de archivos;
 *  5. empaqueta release/satelitecundinamarca-odc-scorm12-portable.zip.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const PREVIEW = resolve(ROOT, 'dist-preview');
const OUT_DIR = resolve(ROOT, 'release');
const ZIP = join(OUT_DIR, 'satelitecundinamarca-odc-scorm12-portable.zip');
const VITE = resolve(ROOT, 'node_modules/vite/bin/vite.js');

const run = (args) => execFileSync(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });

const walk = (dir, base = dir, acc = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, base, acc);
    else acc.push(relative(base, full).split('\\').join('/'));
  }
  return acc;
};

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

console.log('› Build estándar (manifiesto de referencia)');
run([join(ROOT, 'scripts/build.mjs')]);

console.log('› Build portable (IIFE)');
run([VITE, 'build', '--config', 'vite.config.preview.ts']);

// 1) index.html portable: script clásico, sin crossorigin
const indexPath = join(PREVIEW, 'index.html');
let html = readFileSync(indexPath, 'utf8');
html = html.replace(
  /<script type="module" crossorigin src="\.\/assets\/app\.js"><\/script>/,
  '<script defer src="./assets/app.js"></script>',
);
html = html.replace(
  /<link rel="stylesheet" crossorigin href="\.\/assets\/style\.css">/,
  '<link rel="stylesheet" href="./assets/style.css">',
);
writeFileSync(indexPath, html, 'utf8');

// 2) manifiesto SCORM con la lista real de archivos del build portable
const official = readFileSync(join(DIST, 'imsmanifest.xml'), 'utf8');
const open = official.indexOf('<resource identifier="RES-ODC"');
const close = official.indexOf('</resource>');
if (open === -1 || close === -1) throw new Error('Manifiesto oficial sin bloque <resource>');
const head = official.slice(0, open);
const resourceOpen = '<resource identifier="RES-ODC" type="webcontent" adlcp:scormtype="sco" href="index.html">';
const tail = official.slice(close);
const files = walk(PREVIEW).filter((f) => f !== 'imsmanifest.xml').sort();
const entries = files.map((f) => `      <file href="${esc(f)}"/>`).join('\n');
writeFileSync(join(PREVIEW, 'imsmanifest.xml'), `${head}${resourceOpen}\n${entries}\n${tail}`, 'utf8');
console.log(`› imsmanifest.xml portable con ${files.length} archivos`);

// 3) ZIP portable
mkdirSync(OUT_DIR, { recursive: true });
rmSync(ZIP, { force: true });
execFileSync('zip', ['-q', '-r', '-X', ZIP, ...walk(PREVIEW)], { cwd: PREVIEW, stdio: 'inherit' });
console.log(`✅ ${ZIP} (${(statSync(ZIP).size / 1024 / 1024).toFixed(1)} MB)`);
