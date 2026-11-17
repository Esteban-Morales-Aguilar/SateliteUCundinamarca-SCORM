import { useState } from 'react';
import { MARCO } from '../content';
import { Callout, DataTable, ReferenceChips, Screen, Tabs } from '../ui/bits';
import { RichText } from '../ui/RichText';

/** Pantalla 4 — Marco teórico: LoRa y LoRaWAN (con el efecto Doppler y la redundancia). */
export function LoRaScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  const lora = MARCO.find((s) => s.slug === 'lora-lorawan');
  const doppler = MARCO.find((s) => s.slug === 'doppler-redundancia');
  const tabs = [
    ...(lora ? [{ id: lora.slug, label: 'LoRa y LoRaWAN' }] : []),
    ...(doppler ? [{ id: doppler.slug, label: 'Efecto Doppler y redundancia' }] : []),
  ];
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const section = MARCO.find((s) => s.slug === active) ?? lora;

  return (
    <Screen
      n={4}
      title="Marco teórico: LoRa y LoRaWAN"
      lead="LoRa es una modulación de espectro ensanchado para comunicaciones de largo alcance con bajo consumo. LoRaWAN es el protocolo de red construido sobre LoRa."
    >
      <Tabs items={tabs} active={active} onChange={setActive} label="Subsecciones del marco teórico" />

      <div className="mt-8" role="tabpanel">
        <h2 className="text-xl font-bold text-brand-blue dark:text-white">{section?.title}</h2>

        {active === 'lora-lorawan' && (
          <DataTable
            caption="LoRa frente a WiFi y LTE (valores típicos orientativos)"
            head={['Característica', 'LoRa / LoRaWAN', 'WiFi', 'LTE']}
            rows={[
              ['Alcance', 'Kilómetros (en línea de vista, mucho más)', 'Decenas de metros', 'Kilómetros (celdas)'],
              ['Tasa de datos', 'Muy baja (≈ 0,3–50 kbps)', 'Muy alta (Mbps–Gbps)', 'Alta (Mbps)'],
              ['Consumo', 'Muy bajo', 'Alto', 'Alto'],
              ['Espectro', 'Bandas ISM sin licencia (433/868/915 MHz)', 'ISM 2,4 / 5 GHz', 'Licenciado (operador)'],
              ['Uso ideal', 'Telemetría y sensores remotos', 'Redes locales de datos', 'Banda ancha móvil'],
            ]}
          />
        )}

        {section && <RichText html={section.content} />}

        {active === 'doppler-redundancia' && (
          <Callout title="Pruébelo usted mismo" tone="info">
            En el simulador puede cambiar la altitud orbital y la frecuencia y ver el corrimiento Doppler frente a la tolerancia
            del receptor LoRa.{' '}
            <button type="button" onClick={() => onNavigate('simulador')} className="font-semibold text-brand-blue underline dark:text-sky-400">
              Abrir el simulador
            </button>
            .
          </Callout>
        )}

        {section && <ReferenceChips refs={section.references} />}
      </div>
    </Screen>
  );
}
