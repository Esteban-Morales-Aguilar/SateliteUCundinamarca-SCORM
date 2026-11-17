/**
 * Modelo de enlace LoRa calculado en el navegador.
 *
 * Es un port fiel de `services/simulation-service/app/core/{link_budget,coverage,doppler}.py`
 * y de `app/core/service.py`, para que el simulador funcione dentro del paquete SCORM
 * sin llamar al servicio de simulación.
 */

export type Climate = 'despejado' | 'nublado' | 'lluvia' | 'tormenta';
export type Frequency = 433 | 868 | 915;
export type Bandwidth = 125 | 250 | 500;

/** SNR mínimo por spreading factor (Semtech SX127x). */
export const SNR_MIN_DB: Record<number, number> = {
  7: -7.5,
  8: -10.0,
  9: -12.5,
  10: -15.0,
  11: -17.5,
  12: -20.0,
};

/** Pérdida adicional orientativa según el clima. */
export const CLIMATE_LOSS_DB: Record<Climate, number> = {
  despejado: 0,
  nublado: 0.5,
  lluvia: 2,
  tormenta: 4,
};

export const CLIMATES: Climate[] = ['despejado', 'nublado', 'lluvia', 'tormenta'];

const R_EARTH_KM = 6371;
const R_EARTH_M = 6_371_000;
const MU_EARTH = 3.986004418e14;
const C = 299_792_458;

/** FSPL(dB) = 20·log10(d_km) + 20·log10(f_MHz) + 32.44 */
export const fsplDb = (distanceKm: number, freqMhz: number): number =>
  20 * Math.log10(Math.max(distanceKm, 0.001)) + 20 * Math.log10(freqMhz) + 32.44;

/** P_rx = P_tx + G_tx + G_rx − FSPL − L_misc */
export const receivedPowerDbm = (pTx: number, gTx: number, gRx: number, fspl: number, lMisc: number): number =>
  pTx + gTx + gRx - fspl - lMisc;

/** S = −174 + 10·log10(BW_Hz) + NF + SNR_min */
export const sensitivityDbm = (sf: number, bwKhz: number, nfDb = 6): number =>
  -174 + 10 * Math.log10(bwKhz * 1000) + nfDb + (SNR_MIN_DB[sf] ?? SNR_MIN_DB[10]);

/** PDR estimado: sigmoide centrada en margen 0 dB (≈50 %); ≈98 % con +20 dB. */
export const pdrEstimate = (linkMarginDb: number): number => 1 / (1 + Math.exp(-linkMarginDb / 5));

/** Alcance máximo para un presupuesto de potencia dado. */
export const maxRangeKm = (
  pTx: number,
  gTx: number,
  gRx: number,
  freqMhz: number,
  sensitivity: number,
  lMisc: number,
  marginDb = 0,
): number => {
  const budget = pTx + gTx + gRx - lMisc - sensitivity - marginDb;
  return 10 ** ((budget - 20 * Math.log10(freqMhz) - 32.44) / 20);
};

/** Rb = SF · (BW / 2^SF) · 4/(4+CR)   (CR=1 ⇒ 4/5) */
export const bitrateBps = (sf: number, bwKhz: number, cr = 1): number =>
  sf * ((bwKhz * 1000) / 2 ** sf) * (4 / (4 + cr));

export interface LossPoint {
  distance_km: number;
  fspl_db: number;
  p_rx_dbm: number;
}

export const lossCurve = (
  pTx: number,
  gTx: number,
  gRx: number,
  freqMhz: number,
  lMisc: number,
  maxKm: number,
  points = 40,
): LossPoint[] => {
  const out: LossPoint[] = [];
  for (let i = 1; i <= points; i += 1) {
    const d = (maxKm * i) / points;
    const f = fsplDb(d, freqMhz);
    out.push({
      distance_km: Number(d.toFixed(2)),
      fspl_db: Number(f.toFixed(2)),
      p_rx_dbm: Number(receivedPowerDbm(pTx, gTx, gRx, f, lMisc).toFixed(2)),
    });
  }
  return out;
};

/* ---- Cobertura geométrica ------------------------------------------------ */

/** d = sqrt(2·R·h + h²) */
export const horizonDistanceKm = (altitudeKm: number): number =>
  Math.sqrt(2 * R_EARTH_KM * altitudeKm + altitudeKm ** 2);

export const coverageRadiusKm = (radioRangeKm: number, altitudeKm: number): number =>
  Math.min(radioRangeKm, horizonDistanceKm(altitudeKm));

export const coverageAreaKm2 = (radiusKm: number): number => Math.PI * radiusKm ** 2;

/* ---- Efecto Doppler ------------------------------------------------------ */

export const orbitalVelocityMs = (altitudeKm: number): number =>
  Math.sqrt(MU_EARTH / (R_EARTH_M + altitudeKm * 1000));

export const orbitalPeriodMin = (altitudeKm: number): number => {
  const a = R_EARTH_M + altitudeKm * 1000;
  return (2 * Math.PI * Math.sqrt(a ** 3 / MU_EARTH)) / 60;
};

/** v_r = v · R/(R+h) · cos(elevación): máxima en el horizonte, cero en el cenit. */
export const radialVelocityMs = (altitudeKm: number, elevationDeg: number): number =>
  orbitalVelocityMs(altitudeKm) *
  (R_EARTH_M / (R_EARTH_M + altitudeKm * 1000)) *
  Math.cos((elevationDeg * Math.PI) / 180);

/** f_d = (v_r / c) · f_c */
export const dopplerShiftHz = (vRadialMs: number, freqHz: number): number => (vRadialMs / C) * freqHz;

/** Tolerancia aproximada al desajuste de frecuencia: ±25 % del ancho de banda. */
export const loraToleranceHz = (bwKhz: number): number => 0.25 * bwKhz * 1000;

export const passProfile = (altitudeKm: number, freqMhz: number, stepDeg = 5) => {
  const freq = freqMhz * 1e6;
  const elevations: number[] = [];
  for (let e = 0; e <= 90; e += stepDeg) elevations.push(e);
  for (let e = 90 - stepDeg; e >= 0; e -= stepDeg) elevations.push(e);
  const half = Math.floor(90 / stepDeg);
  return elevations.map((e, i) => ({
    elevation_deg: e,
    doppler_hz: Number(
      dopplerShiftHz(radialVelocityMs(altitudeKm, e) * (i <= half ? 1 : -1), freq).toFixed(1),
    ),
  }));
};

/* ---- Estado del simulador ----------------------------------------------- */

export interface SimState {
  altitude_km: number;
  horizontal_km: number;
  p_tx_dbm: number;
  g_tx_dbi: number;
  g_rx_dbi: number;
  l_misc_db: number;
  nf_db: number;
  freq_mhz: Frequency;
  sf: number;
  bw_khz: Bandwidth;
  climate: Climate;
}

export const DEFAULT_SIM: SimState = {
  altitude_km: 30,
  horizontal_km: 50,
  p_tx_dbm: 14,
  g_tx_dbi: 2,
  g_rx_dbi: 5,
  l_misc_db: 2,
  nf_db: 6,
  freq_mhz: 915,
  sf: 10,
  bw_khz: 125,
  climate: 'despejado',
};

/** Distancia en línea recta (slant range) entre la estación y el vehículo. */
export const slantRange = (altitudeKm: number, horizontalKm: number): number =>
  Math.max(Math.hypot(altitudeKm, horizontalKm), 0.1);

export interface LinkResult {
  fspl_db: number;
  p_rx_dbm: number;
  sensitivity_dbm: number;
  link_margin_db: number;
  pdr_estimated: number;
  viable: boolean;
  max_range_km: number;
  bitrate_bps: number;
  message: string;
  loss_curve: LossPoint[];
  misc_loss_db: number;
  distance_km: number;
}

export const computeLink = (s: SimState): LinkResult => {
  const distance = Math.round(slantRange(s.altitude_km, s.horizontal_km) * 100) / 100;
  const misc = s.l_misc_db + CLIMATE_LOSS_DB[s.climate];
  const fspl = fsplDb(distance, s.freq_mhz);
  const pRx = receivedPowerDbm(s.p_tx_dbm, s.g_tx_dbi, s.g_rx_dbi, fspl, misc);
  const sens = sensitivityDbm(s.sf, s.bw_khz, s.nf_db);
  const margin = pRx - sens;
  const range = maxRangeKm(s.p_tx_dbm, s.g_tx_dbi, s.g_rx_dbi, s.freq_mhz, sens, misc);
  const viable = margin > 0;
  const curveMax = Math.min(Math.max(distance * 2, range * 1.1), 5000);

  return {
    fspl_db: Number(fspl.toFixed(2)),
    p_rx_dbm: Number(pRx.toFixed(2)),
    sensitivity_dbm: Number(sens.toFixed(2)),
    link_margin_db: Number(margin.toFixed(2)),
    pdr_estimated: Number(pdrEstimate(margin).toFixed(3)),
    viable,
    max_range_km: Number(range.toFixed(1)),
    bitrate_bps: Number(bitrateBps(s.sf, s.bw_khz).toFixed(1)),
    message: viable
      ? 'Enlace viable: la potencia recibida supera la sensibilidad.'
      : 'Enlace no viable: aumente SF, potencia o ganancia, o reduzca la distancia.',
    loss_curve: lossCurve(s.p_tx_dbm, s.g_tx_dbi, s.g_rx_dbi, s.freq_mhz, misc, curveMax),
    misc_loss_db: Number(misc.toFixed(2)),
    distance_km: distance,
  };
};

export interface CoverageResult {
  radio_range_km: number;
  horizon_km: number;
  coverage_radius_km: number;
  coverage_area_km2: number;
  limited_by: 'radio' | 'horizonte';
}

export const computeCoverage = (s: SimState): CoverageResult => {
  const misc = s.l_misc_db + CLIMATE_LOSS_DB[s.climate];
  const sens = sensitivityDbm(s.sf, s.bw_khz, s.nf_db);
  const range = maxRangeKm(s.p_tx_dbm, s.g_tx_dbi, s.g_rx_dbi, s.freq_mhz, sens, misc);
  const horizon = horizonDistanceKm(s.altitude_km);
  const radius = coverageRadiusKm(range, s.altitude_km);
  return {
    radio_range_km: Number(range.toFixed(1)),
    horizon_km: Number(horizon.toFixed(1)),
    coverage_radius_km: Number(radius.toFixed(1)),
    coverage_area_km2: Number(coverageAreaKm2(radius).toFixed(0)),
    limited_by: range <= horizon ? 'radio' : 'horizonte',
  };
};

export interface DopplerResult {
  orbital_velocity_kms: number;
  orbital_period_min: number;
  radial_velocity_kms: number;
  doppler_shift_khz: number;
  lora_tolerance_khz: number;
  within_tolerance: boolean;
  message: string;
  pass_profile: { elevation_deg: number; doppler_hz: number }[];
}

export const computeDoppler = (altitudeKm: number, elevationDeg: number, freqMhz: number, bwKhz: number): DopplerResult => {
  const v = orbitalVelocityMs(altitudeKm);
  const vr = radialVelocityMs(altitudeKm, elevationDeg);
  const shift = dopplerShiftHz(vr, freqMhz * 1e6);
  const tol = loraToleranceHz(bwKhz);
  const ok = Math.abs(shift) <= tol;
  return {
    orbital_velocity_kms: Number((v / 1000).toFixed(3)),
    orbital_period_min: Number(orbitalPeriodMin(altitudeKm).toFixed(1)),
    radial_velocity_kms: Number((vr / 1000).toFixed(3)),
    doppler_shift_khz: Number((shift / 1000).toFixed(2)),
    lora_tolerance_khz: Number((tol / 1000).toFixed(2)),
    within_tolerance: ok,
    message: ok
      ? 'El corrimiento está dentro de la tolerancia del receptor.'
      : 'El corrimiento excede la tolerancia: pre-compense frecuencia o aumente BW.',
    pass_profile: passProfile(altitudeKm, freqMhz),
  };
};

export interface OptimizeCandidate {
  sf: number;
  bw_khz: Bandwidth;
  link_margin_db: number;
  bitrate_bps: number;
  pdr_estimated: number;
  meets_target: boolean;
}

/** Busca la mayor tasa de datos que conserve el margen objetivo. */
export const optimize = (s: SimState, targetMarginDb = 10) => {
  const distance = Math.round(slantRange(s.altitude_km, s.horizontal_km) * 100) / 100;
  const misc = s.l_misc_db + CLIMATE_LOSS_DB[s.climate];
  const fspl = fsplDb(distance, s.freq_mhz);
  const pRx = receivedPowerDbm(s.p_tx_dbm, s.g_tx_dbi, s.g_rx_dbi, fspl, misc);
  const candidates: OptimizeCandidate[] = [];
  for (let sf = 7; sf <= 12; sf += 1) {
    for (const bw of [125, 250, 500] as Bandwidth[]) {
      const margin = pRx - sensitivityDbm(sf, bw, s.nf_db);
      candidates.push({
        sf,
        bw_khz: bw,
        link_margin_db: Number(margin.toFixed(2)),
        bitrate_bps: Number(bitrateBps(sf, bw).toFixed(1)),
        pdr_estimated: Number(pdrEstimate(margin).toFixed(3)),
        meets_target: margin >= targetMarginDb,
      });
    }
  }
  const ok = candidates.filter((c) => c.meets_target);
  const recommended = ok.length ? ok.reduce((a, b) => (b.bitrate_bps > a.bitrate_bps ? b : a)) : null;
  return {
    recommended,
    candidates: [...candidates].sort((a, b) => b.link_margin_db - a.link_margin_db).slice(0, 10),
    message: recommended
      ? `Recomendado SF${recommended.sf}/BW${recommended.bw_khz} kHz: mayor tasa con margen ≥ ${targetMarginDb} dB.`
      : 'Ninguna combinación alcanza el margen objetivo: reduzca distancia o aumente potencia/ganancia.',
  };
};
