import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { blue: '#003366', red: '#B71C1C' },
        space: { 950: '#060d19', 900: '#0a1220', 800: '#101a2e', 700: '#1a2640', 600: '#27365a' },
        paper: '#f6f8fb',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'] },
    },
  },
  plugins: [typography],
};
