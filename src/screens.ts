/** Las 10 pantallas del storyboard v4, en orden. */

export interface ScreenDef {
  /** Identificador estable: se guarda en `cmi.core.lesson_location`. */
  id: string;
  n: number;
  title: string;
  /** Etiqueta corta para el menú y la barra de navegación. */
  short: string;
  /** Icono SVG (path) para el menú. */
  icon: string;
}

export const SCREENS: ScreenDef[] = [
  {
    id: 'portada',
    n: 1,
    title: 'Portada',
    short: 'Portada',
    icon: 'M12 3v18M5 10l7-7 7 7M5 14l7 7 7-7',
  },
  {
    id: 'menu',
    n: 2,
    title: 'Menú principal',
    short: 'Menú',
    icon: 'M4 6h16M4 12h16M4 18h16',
  },
  {
    id: 'atmosfera',
    n: 3,
    title: 'Marco teórico: perfil vertical de la atmósfera',
    short: 'Atmósfera',
    icon: 'M4 18c4 0 4-6 8-6s4 6 8 6M4 12c4 0 4-4 8-4s4 4 8 4',
  },
  {
    id: 'lora',
    n: 4,
    title: 'Marco teórico: LoRa y LoRaWAN',
    short: 'LoRa y LoRaWAN',
    icon: 'M12 20a8 8 0 0 0 0-16M8.5 17a5 5 0 0 0 0-10M5 14a2 2 0 0 0 0-4',
  },
  {
    id: 'seguridad',
    n: 5,
    title: 'Marco teórico: seguridad y AES-128',
    short: 'Seguridad',
    icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4',
  },
  {
    id: 'mision',
    n: 6,
    title: 'Dashboard: misión en vivo',
    short: 'Misión',
    icon: 'M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    id: 'simulador',
    n: 7,
    title: 'Dashboard: simulador de red',
    short: 'Simulador',
    icon: 'M4 20V10M10 20V4M16 20v-7M22 20v-4',
  },
  {
    id: 'guias',
    n: 8,
    title: 'Guías técnicas',
    short: 'Guías técnicas',
    icon: 'M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5zM8 7h8M8 11h8M8 15h5',
  },
  {
    id: 'video',
    n: 9,
    title: 'Video del despliegue',
    short: 'Video',
    icon: 'M3 6h12v12H3zM15 10l6-3v10l-6-3',
  },
  {
    id: 'creditos',
    n: 10,
    title: 'Créditos y referencias',
    short: 'Créditos',
    icon: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z',
  },
];

export const TOTAL_SCREENS = SCREENS.length;

export const screenIndexById = (id: string): number => SCREENS.findIndex((s) => s.id === id);

/** Identificador que se escribe en `cmi.core.lesson_location` (legible en los informes de Moodle). */
export const scormLocation = (screen: ScreenDef): string => `s${String(screen.n).padStart(2, '0')}-${screen.id}`;

export const screenByLocation = (location: string): ScreenDef | undefined => {
  const clean = location.trim();
  return SCREENS.find((s) => scormLocation(s) === clean) ?? SCREENS.find((s) => s.id === clean);
};
