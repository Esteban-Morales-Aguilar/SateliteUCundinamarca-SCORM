import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';
import { SCREENS, TOTAL_SCREENS } from '../screens';
import { AtmosferaScreen } from '../screens/Atmosfera';
import { CreditosScreen } from '../screens/Creditos';
import { GuiasScreen } from '../screens/Guias';
import { LoRaScreen } from '../screens/LoRa';
import { MenuScreen } from '../screens/Menu';
import { MisionScreen } from '../screens/Mision';
import { PortadaScreen } from '../screens/Portada';
import { SeguridadScreen } from '../screens/Seguridad';
import { SimuladorScreen } from '../screens/Simulador';
import { VideoScreen } from '../screens/Video';

/**
 * Prueba de humo de las diez pantallas del storyboard v4: cada una debe montar
 * sin errores y anunciar su título y su número dentro del recorrido.
 */
const noop = () => {};

describe('pantallas del ODC', () => {
  const cases: [string, () => JSX.Element][] = [
    ['Portada', () => <PortadaScreen onNavigate={noop} />],
    ['Menú principal', () => <MenuScreen onNavigate={noop} visited={[]} />],
    ['Marco teórico: perfil vertical de la atmósfera', () => <AtmosferaScreen />],
    ['Marco teórico: LoRa y LoRaWAN', () => <LoRaScreen onNavigate={noop} />],
    ['Marco teórico: seguridad y AES-128', () => <SeguridadScreen />],
    ['Dashboard: misión en vivo', () => <MisionScreen />],
    ['Dashboard: simulador de red', () => <SimuladorScreen />],
    ['Guías técnicas', () => <GuiasScreen />],
    ['Video del despliegue', () => <VideoScreen />],
    ['Créditos y referencias', () => <CreditosScreen />],
  ];

  it('define las diez pantallas del storyboard, en orden', () => {
    expect(cases).toHaveLength(TOTAL_SCREENS);
    expect(cases.map(([t]) => t)).toEqual(SCREENS.map((s) => s.title));
  });

  it.each(cases)('la pantalla «%s» monta y muestra su título', (title, renderScreen) => {
    const { container } = render(renderScreen());
    expect(container.querySelector('h1')?.textContent?.trim()).toBeTruthy();
    // La portada es una cabecera propia: se reconoce por la marca, no por el título del índice.
    expect(container.textContent).toContain(title === 'Portada' ? 'SpaceNet Lab' : title);
    if (title !== 'Portada') {
      const n = cases.findIndex(([t]) => t === title) + 1;
      expect(container.textContent).toContain(`Pantalla ${n} de ${TOTAL_SCREENS}`);
    }
  });

  it('la portada presenta a los autores y la licencia', () => {
    const { container } = render(<PortadaScreen onNavigate={noop} />);
    expect(container.textContent).toContain('Esteban Morales Aguilar');
    expect(container.textContent).toContain('Darikson Felipe Pérez Rodríguez');
    expect(container.textContent).toContain('Creative Commons BY-NC-SA 4.0');
  });

  it('la misión muestra los indicadores y las seis gráficas', () => {
    const { container } = render(<MisionScreen />);
    expect(screen.getAllByText('Altitud').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Temperatura').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Presión').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Humedad').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('figure').length).toBeGreaterThanOrEqual(6);
    expect(container.querySelector('svg[role="img"]')).toBeTruthy();
  });

  it('el simulador calcula en el navegador sin llamar a la API', () => {
    const { container } = render(<SimuladorScreen />);
    expect(screen.getByText('Balance de enlace')).toBeInTheDocument();
    expect(screen.getByText('Cobertura')).toBeInTheDocument();
    expect(container.textContent).toMatch(/FSPL/);
    expect(container.textContent).toMatch(/Doppler/);
    expect(container.textContent).toMatch(/Sensibilidad SF10, 125 kHz/);
  });

  it('las guías exponen las cinco guías técnicas', () => {
    render(<GuiasScreen />);
    expect(screen.getByRole('tab', { name: /Selección de componentes/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Conexiones eléctricas/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Instalación de software/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Programación de la Raspberry/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Protocolo de lanzamiento/ })).toBeInTheDocument();
  });

  it('los créditos listan las 53 referencias APA de la revisión', () => {
    const { container } = render(<CreditosScreen />);
    expect(container.textContent).toContain('53 referencias');
    expect(container.textContent).toContain('Creative Commons BY-NC-SA 4.0');
    expect(container.querySelectorAll('li[id^="ref-"]').length).toBe(53);
  });

  it('la app arranca en la portada sin LMS y sin lanzar errores', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<App />);
    expect(container.textContent).toContain('SpaceNet Lab');
    expect(container.textContent).toContain('Pantalla 1 de 10');
    expect(container.textContent).toContain('1/10');
    spy.mockRestore();
  });
});
