import { useId } from 'react';

/**
 * Perfil de la atmósfera 0–50 km con un globo HAB y su enlace de radio a tierra.
 * Diseñado para fondo oscuro. Escala: y = 520 − altitud(km) × 9.
 */
export function AtmosphereDiagram({ label, className = '' }: { label?: string; className?: string }) {
  const uid = useId().replace(/[:]/g, '');
  const Y = (km: number) => 520 - km * 9;
  const ticks = [0, 10, 20, 30, 40, 50];

  return (
    <svg
      viewBox="0 0 480 580"
      role="img"
      aria-label={label ?? 'Capas de la atmósfera y globo de gran altitud'}
      className={className}
    >
      <defs>
        <linearGradient id={`${uid}-tropo`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2f7fc1" />
          <stop offset="1" stopColor="#1f5f9a" />
        </linearGradient>
        <linearGradient id={`${uid}-strato`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1f5f9a" />
          <stop offset="1" stopColor="#0a2447" />
        </linearGradient>
      </defs>

      {/* Capas */}
      <rect x="120" y={Y(12)} width="230" height={Y(0) - Y(12)} fill={`url(#${uid}-tropo)`} />
      <rect x="120" y={Y(50)} width="230" height={Y(12) - Y(50)} fill={`url(#${uid}-strato)`} />
      <rect x="350" y={Y(35)} width="10" height={Y(15) - Y(35)} fill="#B71C1C" opacity=".85" />

      {/* Eje de altitud */}
      <g fill="#c9d6ee" fontFamily="IBM Plex Mono, monospace" fontSize="12" textAnchor="end">
        {ticks.map((k) => (
          <g key={k}>
            <line x1="110" x2="120" y1={Y(k)} y2={Y(k)} stroke="#8aa0c6" />
            <text x="104" y={Y(k) + 4}>{k} km</text>
          </g>
        ))}
      </g>
      <line x1="120" x2="350" y1={Y(12)} y2={Y(12)} stroke="#d9e6ff" strokeDasharray="5 4" opacity=".7" />

      {/* Etiquetas de capas */}
      <g fill="#eaf1ff" fontFamily="Inter, sans-serif">
        <text x="235" y={Y(6) + 5} textAnchor="middle" fontSize="15" fontWeight="600">Troposfera</text>
        <text x="235" y={Y(6) + 23} textAnchor="middle" fontSize="11" opacity=".8">clima, 0–12 km</text>
        <text x="235" y={Y(44)} textAnchor="middle" fontSize="15" fontWeight="600">Estratosfera</text>
        <text x="235" y={Y(44) + 18} textAnchor="middle" fontSize="11" opacity=".8">12–50 km · baja presión y frío</text>
      </g>
      <g fill="#ffb4b4" fontFamily="Inter, sans-serif" fontSize="11">
        <text x="368" y={Y(25) - 4}>capa de ozono</text>
        <text x="368" y={Y(25) + 10}>≈ 15–35 km</text>
      </g>
      <text x="368" y={Y(12) + 4} fill="#d9e6ff" fontFamily="Inter, sans-serif" fontSize="11">tropopausa</text>

      {/* Salida hacia LEO */}
      <g fill="#c9d6ee" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">
        <path d="M235 58 V30" stroke="#c9d6ee" strokeWidth="1.5" />
        <path d="M229 38 L235 28 L241 38" fill="none" stroke="#c9d6ee" strokeWidth="1.5" />
        <text x="235" y="18">órbita LEO de un CubeSat ≈ 400 km</text>
      </g>

      {/* Estación terrena */}
      <g stroke="#e8eefc" strokeWidth="2" fill="none">
        <path d="M146 520 L156 492 L166 520" />
        <path d="M156 492 V478" />
        <path d="M148 484 a8 8 0 0 1 16 0" opacity=".8" />
      </g>
      <text x="156" y="546" textAnchor="middle" fill="#c9d6ee" fontFamily="Inter, sans-serif" fontSize="12">estación terrena</text>

      {/* Enlace LoRa */}
      <path d="M160 480 Q 200 380 252 292" fill="none" stroke="#7cc4ff" strokeWidth="2" strokeDasharray="6 6" className="atm-link" />
      <text x="170" y="400" fill="#bfe3ff" fontFamily="IBM Plex Mono, monospace" fontSize="12" transform="rotate(-52 170 400)">LoRa 915 MHz</text>

      {/* Globo HAB + carga útil */}
      <g>
        <ellipse cx="262" cy={Y(30) - 34} rx="22" ry="28" fill="#f4f7ff" stroke="#b71c1c" strokeWidth="3" />
        <line x1="262" y1={Y(30) - 6} x2="262" y2={Y(30) + 14} stroke="#e8eefc" />
        <rect x="252" y={Y(30) + 14} width="20" height="14" rx="2" fill="#B71C1C" stroke="#fff" strokeWidth="1.5" />
        <text x="292" y={Y(30) - 30} fill="#fff" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700">Globo HAB</text>
        <text x="292" y={Y(30) - 13} fill="#c9d6ee" fontFamily="IBM Plex Mono, monospace" fontSize="12">≈ 30 km</text>
      </g>
    </svg>
  );
}
