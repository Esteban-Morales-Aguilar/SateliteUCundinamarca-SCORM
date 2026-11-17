import type { TelemetryPoint } from '../content';
import { fmt } from '../lib/format';

const GROUND = { lat: 4.34, lng: -74.37 };

const W = 640;
const H = 380;
const PAD = 46;

/**
 * Mapa esquemático de la ruta registrada. Se dibuja en SVG para que funcione sin
 * conexión (las teselas de OpenStreetMap no están disponibles dentro del LMS).
 */
export function TrajectoryMap({ points, index }: { points: TelemetryPoint[]; index: number }) {
  const visible = points.slice(0, Math.max(1, index + 1));
  const withPos = points.filter((p) => p.latitude != null && p.longitude != null);

  const lats = [...withPos.map((p) => p.latitude as number), GROUND.lat];
  const lngs = [...withPos.map((p) => p.longitude as number), GROUND.lng];
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const spanLat = Math.max(maxLat - minLat, 0.004);
  const spanLng = Math.max(maxLng - minLng, 0.004);
  const lat0 = (minLat + maxLat) / 2 - spanLat * 0.62;
  const lat1 = (minLat + maxLat) / 2 + spanLat * 0.62;
  const lng0 = (minLng + maxLng) / 2 - spanLng * 0.62;
  const lng1 = (minLng + maxLng) / 2 + spanLng * 0.62;

  const px = (lng: number) => PAD + ((lng - lng0) / (lng1 - lng0)) * (W - PAD * 2);
  const py = (lat: number) => PAD + (1 - (lat - lat0) / (lat1 - lat0)) * (H - PAD * 2);

  const toPath = (list: TelemetryPoint[]) =>
    list
      .filter((p) => p.latitude != null && p.longitude != null)
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.longitude as number).toFixed(1)} ${py(p.latitude as number).toFixed(1)}`)
      .join(' ');

  const fullPath = toPath(points);
  const trailPath = toPath(visible);
  const current = visible[visible.length - 1];
  const curLat = current?.latitude ?? GROUND.lat;
  const curLng = current?.longitude ?? GROUND.lng;

  const latTicks = Array.from({ length: 5 }, (_, i) => lat0 + ((lat1 - lat0) * i) / 4);
  const lngTicks = Array.from({ length: 5 }, (_, i) => lng0 + ((lng1 - lng0) * i) / 4);

  return (
    <div className="overflow-hidden rounded-xl bg-space-900 ring-1 ring-space-700">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Ruta registrada del globo ESTRATOSAT-TELCO sobre el mapa, con la estación terrena en Fusagasugá">
        <defs>
          <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a1220" />
            <stop offset="100%" stopColor="#101a2e" />
          </linearGradient>
          <radialGradient id="balloon-glow">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="url(#map-bg)" />

        {/* Rejilla geográfica */}
        {latTicks.map((lat, i) => (
          <g key={`lat-${i}`}>
            <line x1={PAD} x2={W - PAD} y1={py(lat)} y2={py(lat)} stroke="#1f2f4d" strokeWidth="1" />
            <text x={PAD - 6} y={py(lat) + 4} textAnchor="end" fontSize="10" fill="#7f92b8" fontFamily="IBM Plex Mono, monospace">
              {lat.toFixed(4)}°
            </text>
          </g>
        ))}
        {lngTicks.map((lng, i) => (
          <g key={`lng-${i}`}>
            <line x1={px(lng)} x2={px(lng)} y1={PAD} y2={H - PAD} stroke="#1f2f4d" strokeWidth="1" />
            <text x={px(lng)} y={H - PAD + 16} textAnchor="middle" fontSize="10" fill="#7f92b8" fontFamily="IBM Plex Mono, monospace">
              {lng.toFixed(3)}°
            </text>
          </g>
        ))}

        {/* Ruta completa tenue y ruta recorrida */}
        <path d={fullPath} fill="none" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="4 6" opacity="0.7" />
        <path d={trailPath} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

        {/* Enlace actual globo → estación */}
        <line
          x1={px(curLng)}
          y1={py(curLat)}
          x2={px(GROUND.lng)}
          y2={py(GROUND.lat)}
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          opacity="0.8"
        />

        {/* Estación terrena */}
        <circle cx={px(GROUND.lng)} cy={py(GROUND.lat)} r="7" fill="#003366" stroke="#93c5fd" strokeWidth="2" />
        <text x={px(GROUND.lng) + 12} y={py(GROUND.lat) + 4} fontSize="11" fill="#bfdbfe" fontWeight="600">
          Estación terrena · Fusagasugá
        </text>

        {/* Globo (posición actual) */}
        <circle cx={px(curLng)} cy={py(curLat)} r="26" fill="url(#balloon-glow)" />
        <circle cx={px(curLng)} cy={py(curLat)} r="8" fill="#ef4444" stroke="#fff" strokeWidth="2" />
        <g fontSize="11" fill="#fecaca" fontWeight="600">
          <text x={px(curLng) + 14} y={py(curLat) - 8}>
            {current?.altitude != null ? `${fmt(current.altitude, 0)} m` : 'Globo'}
          </text>
          <text x={px(curLng) + 14} y={py(curLat) + 7} fill="#fca5a5" fontWeight="400" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            {curLat.toFixed(5)}, {curLng.toFixed(5)}
          </text>
        </g>

        <text x={PAD} y={26} fontSize="11" fill="#93a7cc" fontFamily="IBM Plex Mono, monospace">
          RUTA REGISTRADA · {withPos.length} posiciones · esquema sin conexión
        </text>
      </svg>
    </div>
  );
}
