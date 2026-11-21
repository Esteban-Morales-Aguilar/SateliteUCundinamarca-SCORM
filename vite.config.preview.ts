import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Build "portable" para abrir el paquete sin servidor (doble clic en index.html).
 *
 * El build normal de Vite emite módulos ES, que los navegadores bloquean bajo
 * `file://`. Aquí se fuerza un único bundle IIFE (script clásico) para que el
 * contenido se renderice al abrir el archivo directamente.
 */
export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: 'dist-preview',
    emptyOutDir: true,
    target: 'es2019',
    cssCodeSplit: false,
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
