/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Build del paquete SCORM 1.2.
 *
 * - `index.html` queda en la raíz del paquete (lo que espera el LMS).
 * - `base: './'` genera rutas relativas: funciona dentro del iframe de Moodle,
 *   que sirve el contenido desde `/pluginfile.php/.../index.html`.
 * - Sin PWA ni service worker: el paquete no debe interceptar peticiones del LMS.
 * - `target: es2019` para equipos de sala de cómputo con navegadores antiguos.
 */
export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [react()],
  server: { port: 5174, host: true },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2019',
    cssCodeSplit: false,
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  test: { environment: 'jsdom', globals: true, setupFiles: ['./src/test/setup.ts'], css: false },
});
