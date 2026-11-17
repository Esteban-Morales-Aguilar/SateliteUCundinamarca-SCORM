import { useCallback, useEffect, useMemo, useState } from 'react';
import { scorm, type ScormState } from './scorm';
import { SCREENS, TOTAL_SCREENS, screenByLocation, screenIndexById, scormLocation } from './screens';
import { Shell } from './ui/Shell';
import { PortadaScreen } from './screens/Portada';
import { MenuScreen } from './screens/Menu';
import { AtmosferaScreen } from './screens/Atmosfera';
import { LoRaScreen } from './screens/LoRa';
import { SeguridadScreen } from './screens/Seguridad';
import { MisionScreen } from './screens/Mision';
import { SimuladorScreen } from './screens/Simulador';
import { GuiasScreen } from './screens/Guias';
import { VideoScreen } from './screens/Video';
import { CreditosScreen } from './screens/Creditos';

export default function App() {
  /** Reanudación: el LMS guarda la última pantalla en `cmi.core.lesson_location`. */
  const initialIndex = useMemo(() => {
    const saved = screenByLocation(scorm.snapshot.location);
    return saved ? saved.n - 1 : 0;
  }, []);

  const [index, setIndex] = useState(initialIndex);
  const [lms, setLms] = useState<ScormState>(() => scorm.snapshot);
  const [justCompleted, setJustCompleted] = useState(false);

  // La API del LMS puede aparecer después del primer render: se reintenta un poco.
  useEffect(() => {
    const unsubscribe = scorm.subscribe(setLms);
    if (scorm.connect()) {
      setLms(scorm.snapshot);
      return unsubscribe;
    }
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (scorm.connect()) {
        setLms(scorm.snapshot);
        window.clearInterval(timer);
      } else if (attempts >= 8) {
        window.clearInterval(timer);
      }
    }, 500);
    return () => {
      window.clearInterval(timer);
      unsubscribe();
    };
  }, []);

  const go = useCallback((id: string) => {
    const i = screenIndexById(id);
    if (i < 0) return;
    setIndex(i);
    setLms(scorm.visit(scormLocation(SCREENS[i])));
    scorm.commit();
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {
      /* scroll bloqueado en algunos iframes */
    }
  }, []);

  // La primera pantalla también cuenta como visitada.
  useEffect(() => {
    const current = SCREENS[initialIndex];
    if (current) setLms(scorm.visit(scormLocation(current)));
    scorm.commit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recorrer las diez pantallas completa la actividad (el ODC no tiene evaluación).
  useEffect(() => {
    if (lms.visited.length >= TOTAL_SCREENS && scorm.snapshot.status !== 'completed') {
      scorm.setStatus('completed');
      scorm.commit();
      setLms(scorm.snapshot);
      setJustCompleted(true);
      const t = window.setTimeout(() => setJustCompleted(false), 8000);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [lms.visited.length]);

  const current = SCREENS[index] ?? SCREENS[0];

  return (
    <Shell current={current} visited={lms.visited} lms={lms} onNavigate={go}>
      {justCompleted && (
        <div className="no-print sticky top-16 z-20 border-b border-emerald-200 bg-emerald-50 px-4 py-2.5 text-center text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200" role="status">
          Actividad completada: recorrió las diez pantallas. El progreso quedó registrado en el aula virtual.
        </div>
      )}

      {current.id === 'portada' && <PortadaScreen onNavigate={go} />}
      {current.id === 'menu' && <MenuScreen onNavigate={go} visited={lms.visited} />}
      {current.id === 'atmosfera' && <AtmosferaScreen />}
      {current.id === 'lora' && <LoRaScreen onNavigate={go} />}
      {current.id === 'seguridad' && <SeguridadScreen />}
      {current.id === 'mision' && <MisionScreen />}
      {current.id === 'simulador' && <SimuladorScreen />}
      {current.id === 'guias' && <GuiasScreen />}
      {current.id === 'video' && <VideoScreen />}
      {current.id === 'creditos' && <CreditosScreen />}
    </Shell>
  );
}
