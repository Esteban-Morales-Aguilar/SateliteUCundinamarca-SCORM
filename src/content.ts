/* eslint-disable */
/**
 * ARCHIVO GENERADO — no editar a mano.
 * Instantánea del contenido publicado del ODC SpaceNet Lab.
 * Generado: 2026-11-17T07:04:54.834Z
 * Origen: https://satelitecundinamarca.duckdns.org/api/v1
 * Regenerar con: npm run scorm:snapshot
 */

export interface MarcoSection { slug: string; title: string; order: number; content: string; references: string[] }
export interface GuiaStep { step: number; title: string; body: string }
export interface GuiaComponent { category: string; item: string; economico: number; premium: number }
export interface Guia {
  slug: string; title: string; description: string; order: number;
  steps: GuiaStep[]; code: string[]; pdfUrl: string | null; components: GuiaComponent[] | null;
}
export interface Referencia { _id: string; citeKey: string; topic: string; apa: string }
export interface Creditos {
  authors: { name: string }[]; program: string; university: string; researchGroup: string;
  teacher: string; year: number; license: string; references: Referencia[];
}
export interface TelemetryPoint {
  time: string; altitude: number | null; temperature: number | null; pressure: number | null;
  humidity: number | null; latitude: number | null; longitude: number | null;
  rssi: number | null; snr: number | null; pdr: number | null;
}
export interface Mission { id: string; name: string; description?: string; status: string; start_at: string; end_at?: string | null }

export const GENERATED_AT = "2026-11-17T07:04:54.834Z";
export const SOURCE_API = "https://satelitecundinamarca.duckdns.org/api/v1";

export const MISSION: Mission = {
  "id": "ESTRATOSAT-TELCO-01",
  "name": "ESTRATOSAT-TELCO",
  "description": "Misión educativa HAB - Universidad de Cundinamarca",
  "status": "active",
  "start_at": "2026-11-05T20:09:20.104029Z",
  "end_at": null
};

export const LATEST: TelemetryPoint = {
  "time": "2026-11-08T23:53:34.609514Z",
  "altitude": 2223.8,
  "temperature": 0.38,
  "pressure": 773.03,
  "humidity": 53.7,
  "latitude": 4.35693,
  "longitude": -74.29664,
  "rssi": -89.2,
  "snr": 10,
  "pdr": 1
};

export const HISTORY: TelemetryPoint[] = [
  {
    "time": "2026-11-08T23:44:49.597327Z",
    "altitude": 4200,
    "temperature": -11.89,
    "pressure": 600.69,
    "humidity": 53.2,
    "latitude": 4.34825,
    "longitude": -74.32565,
    "rssi": -90.6,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:44:52.667397Z",
    "altitude": 4500,
    "temperature": -14.33,
    "pressure": 577.34,
    "humidity": 52,
    "latitude": 4.34906,
    "longitude": -74.32294,
    "rssi": -88.4,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:44:55.926818Z",
    "altitude": 4800,
    "temperature": -16.56,
    "pressure": 554.74,
    "humidity": 50.6,
    "latitude": 4.34987,
    "longitude": -74.32023,
    "rssi": -89.8,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:44:58.020836Z",
    "altitude": 5000,
    "temperature": -17.41,
    "pressure": 540.43,
    "humidity": 51.7,
    "latitude": 4.35041,
    "longitude": -74.31843,
    "rssi": -88.5,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:01.267567Z",
    "altitude": 5300,
    "temperature": -19.27,
    "pressure": 518.88,
    "humidity": 49.7,
    "latitude": 4.35122,
    "longitude": -74.31572,
    "rssi": -91.2,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:04.376142Z",
    "altitude": 5600,
    "temperature": -21.18,
    "pressure": 498.18,
    "humidity": 49,
    "latitude": 4.35204,
    "longitude": -74.313,
    "rssi": -91.5,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:07.565934Z",
    "altitude": 5900,
    "temperature": -23.25,
    "pressure": 478.58,
    "humidity": 50.8,
    "latitude": 4.35285,
    "longitude": -74.31029,
    "rssi": -91.2,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:10.745268Z",
    "altitude": 6200,
    "temperature": -25.96,
    "pressure": 459.21,
    "humidity": 48.2,
    "latitude": 4.35366,
    "longitude": -74.30758,
    "rssi": -91.5,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:12.792437Z",
    "altitude": 6400,
    "temperature": -26.4,
    "pressure": 446.35,
    "humidity": 51.6,
    "latitude": 4.3542,
    "longitude": -74.30578,
    "rssi": -91.7,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:15.928973Z",
    "altitude": 6700,
    "temperature": -28.73,
    "pressure": 428.22,
    "humidity": 47.1,
    "latitude": 4.35501,
    "longitude": -74.30307,
    "rssi": -92.7,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:19.157495Z",
    "altitude": 7000,
    "temperature": -30.08,
    "pressure": 410.52,
    "humidity": 48.6,
    "latitude": 4.35582,
    "longitude": -74.30036,
    "rssi": -92.8,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:22.310139Z",
    "altitude": 7300,
    "temperature": -32.56,
    "pressure": 393.66,
    "humidity": 45.6,
    "latitude": 4.35663,
    "longitude": -74.29765,
    "rssi": -94.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:24.444442Z",
    "altitude": 7500,
    "temperature": -33.43,
    "pressure": 382.62,
    "humidity": 48.1,
    "latitude": 4.35717,
    "longitude": -74.29584,
    "rssi": -92.8,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:27.947911Z",
    "altitude": 7800,
    "temperature": -35.17,
    "pressure": 366.34,
    "humidity": 47,
    "latitude": 4.35798,
    "longitude": -74.29313,
    "rssi": -93.4,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:31.015922Z",
    "altitude": 8100,
    "temperature": -37.8,
    "pressure": 350.92,
    "humidity": 43.3,
    "latitude": 4.35879,
    "longitude": -74.29042,
    "rssi": -92.8,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:45:34.164070Z",
    "altitude": 8400,
    "temperature": -39.85,
    "pressure": 336.19,
    "humidity": 46.7,
    "latitude": 4.3596,
    "longitude": -74.28771,
    "rssi": -95.3,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:37.297479Z",
    "altitude": 8700,
    "temperature": -41.08,
    "pressure": 321.19,
    "humidity": 45,
    "latitude": 4.36041,
    "longitude": -74.285,
    "rssi": -95,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:39.399864Z",
    "altitude": 8900,
    "temperature": -42.62,
    "pressure": 312.38,
    "humidity": 46.2,
    "latitude": 4.36095,
    "longitude": -74.28319,
    "rssi": -95.9,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:42.488176Z",
    "altitude": 9200,
    "temperature": -45.28,
    "pressure": 298.49,
    "humidity": 44.3,
    "latitude": 4.36176,
    "longitude": -74.28048,
    "rssi": -96.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:45.651955Z",
    "altitude": 9500,
    "temperature": -46.77,
    "pressure": 285.45,
    "humidity": 49.1,
    "latitude": 4.36258,
    "longitude": -74.27777,
    "rssi": -94.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:48.783960Z",
    "altitude": 9800,
    "temperature": -48.81,
    "pressure": 272.45,
    "humidity": 46.3,
    "latitude": 4.36339,
    "longitude": -74.27506,
    "rssi": -94.4,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:51.931090Z",
    "altitude": 10100,
    "temperature": -50.73,
    "pressure": 260.38,
    "humidity": 43.5,
    "latitude": 4.3642,
    "longitude": -74.27235,
    "rssi": -94.8,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:54.031393Z",
    "altitude": 10300,
    "temperature": -52.42,
    "pressure": 252.72,
    "humidity": 44.1,
    "latitude": 4.36474,
    "longitude": -74.27054,
    "rssi": -96.2,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:45:57.210959Z",
    "altitude": 10600,
    "temperature": -53.69,
    "pressure": 240.85,
    "humidity": 41.6,
    "latitude": 4.36555,
    "longitude": -74.26783,
    "rssi": -96.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:00.347920Z",
    "altitude": 10900,
    "temperature": -55.78,
    "pressure": 229.76,
    "humidity": 39.7,
    "latitude": 4.36636,
    "longitude": -74.26512,
    "rssi": -97.8,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:03.449207Z",
    "altitude": 11200,
    "temperature": -56.93,
    "pressure": 219.47,
    "humidity": 43.4,
    "latitude": 4.36717,
    "longitude": -74.26241,
    "rssi": -97.5,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:05.533797Z",
    "altitude": 11400,
    "temperature": -56.61,
    "pressure": 212.27,
    "humidity": 42.7,
    "latitude": 4.36771,
    "longitude": -74.2606,
    "rssi": -100.6,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:46:08.686836Z",
    "altitude": 11700,
    "temperature": -56.29,
    "pressure": 202.68,
    "humidity": 41.3,
    "latitude": 4.36852,
    "longitude": -74.25789,
    "rssi": -95.8,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:11.854463Z",
    "altitude": 12000,
    "temperature": -56.38,
    "pressure": 193.31,
    "humidity": 38.7,
    "latitude": 4.36933,
    "longitude": -74.25518,
    "rssi": -97.3,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:15.057450Z",
    "altitude": 12300,
    "temperature": -56.89,
    "pressure": 184.2,
    "humidity": 41.7,
    "latitude": 4.37014,
    "longitude": -74.25247,
    "rssi": -98.9,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:18.492107Z",
    "altitude": 12600,
    "temperature": -55.96,
    "pressure": 175.55,
    "humidity": 40.8,
    "latitude": 4.37095,
    "longitude": -74.24976,
    "rssi": -96.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:20.585453Z",
    "altitude": 12800,
    "temperature": -56.89,
    "pressure": 170.65,
    "humidity": 38.2,
    "latitude": 4.37149,
    "longitude": -74.24795,
    "rssi": -97.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:23.706366Z",
    "altitude": 13100,
    "temperature": -56.64,
    "pressure": 162.52,
    "humidity": 37.4,
    "latitude": 4.37231,
    "longitude": -74.24524,
    "rssi": -99.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:26.843769Z",
    "altitude": 13400,
    "temperature": -56.13,
    "pressure": 154.88,
    "humidity": 37,
    "latitude": 4.37312,
    "longitude": -74.24253,
    "rssi": -98.9,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:29.911845Z",
    "altitude": 13700,
    "temperature": -57.26,
    "pressure": 148.18,
    "humidity": 37.8,
    "latitude": 4.37393,
    "longitude": -74.23982,
    "rssi": -96.5,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:33.014495Z",
    "altitude": 14000,
    "temperature": -56.58,
    "pressure": 140.96,
    "humidity": 39.6,
    "latitude": 4.37474,
    "longitude": -74.23711,
    "rssi": -99,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:35.081321Z",
    "altitude": 14200,
    "temperature": -56.28,
    "pressure": 136.66,
    "humidity": 37,
    "latitude": 4.37528,
    "longitude": -74.2353,
    "rssi": -98.2,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:38.195264Z",
    "altitude": 14500,
    "temperature": -56.52,
    "pressure": 130.09,
    "humidity": 38.7,
    "latitude": 4.37609,
    "longitude": -74.23259,
    "rssi": -99.8,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:46:41.380379Z",
    "altitude": 14800,
    "temperature": -56.6,
    "pressure": 124.64,
    "humidity": 35.6,
    "latitude": 4.3769,
    "longitude": -74.22988,
    "rssi": -98.9,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:44.499000Z",
    "altitude": 15100,
    "temperature": -56.55,
    "pressure": 118.49,
    "humidity": 33.6,
    "latitude": 4.37771,
    "longitude": -74.22717,
    "rssi": -100.6,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:46:47.634483Z",
    "altitude": 15400,
    "temperature": -56.32,
    "pressure": 112.89,
    "humidity": 37.5,
    "latitude": 4.37852,
    "longitude": -74.22446,
    "rssi": -101.5,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:46:49.747206Z",
    "altitude": 15600,
    "temperature": -56.86,
    "pressure": 109.69,
    "humidity": 36.6,
    "latitude": 4.37906,
    "longitude": -74.22266,
    "rssi": -98.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:46:52.850766Z",
    "altitude": 15900,
    "temperature": -57.08,
    "pressure": 104.66,
    "humidity": 34,
    "latitude": 4.37987,
    "longitude": -74.21995,
    "rssi": -99.9,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:46:55.951662Z",
    "altitude": 16200,
    "temperature": -56.73,
    "pressure": 99.62,
    "humidity": 33.2,
    "latitude": 4.38068,
    "longitude": -74.21723,
    "rssi": -101.5,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:46:59.090444Z",
    "altitude": 16500,
    "temperature": -56.82,
    "pressure": 95.01,
    "humidity": 36,
    "latitude": 4.38149,
    "longitude": -74.21452,
    "rssi": -101.8,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:01.254900Z",
    "altitude": 16700,
    "temperature": -56.46,
    "pressure": 92.25,
    "humidity": 32.9,
    "latitude": 4.38204,
    "longitude": -74.21272,
    "rssi": -99.8,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:04.390009Z",
    "altitude": 17000,
    "temperature": -56.88,
    "pressure": 87.81,
    "humidity": 30.9,
    "latitude": 4.38285,
    "longitude": -74.21001,
    "rssi": -100,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:07.535784Z",
    "altitude": 17300,
    "temperature": -56.52,
    "pressure": 83.75,
    "humidity": 30.7,
    "latitude": 4.38366,
    "longitude": -74.2073,
    "rssi": -100.6,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:10.661973Z",
    "altitude": 17600,
    "temperature": -56.36,
    "pressure": 80.01,
    "humidity": 29.6,
    "latitude": 4.38447,
    "longitude": -74.20459,
    "rssi": -99,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:47:13.727275Z",
    "altitude": 17900,
    "temperature": -56.2,
    "pressure": 76.29,
    "humidity": 30.6,
    "latitude": 4.38528,
    "longitude": -74.20188,
    "rssi": -102.1,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:47:15.831894Z",
    "altitude": 18100,
    "temperature": -56.57,
    "pressure": 73.93,
    "humidity": 29.9,
    "latitude": 4.38582,
    "longitude": -74.20007,
    "rssi": -101.3,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:18.989201Z",
    "altitude": 18400,
    "temperature": -56.81,
    "pressure": 70.42,
    "humidity": 29.8,
    "latitude": 4.38663,
    "longitude": -74.19736,
    "rssi": -100.9,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:22.156884Z",
    "altitude": 18700,
    "temperature": -56.26,
    "pressure": 66.84,
    "humidity": 29.8,
    "latitude": 4.38744,
    "longitude": -74.19465,
    "rssi": -101.3,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:25.304919Z",
    "altitude": 19000,
    "temperature": -56.15,
    "pressure": 63.91,
    "humidity": 29.2,
    "latitude": 4.38825,
    "longitude": -74.19194,
    "rssi": -100.4,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:28.549113Z",
    "altitude": 19300,
    "temperature": -56.7,
    "pressure": 61.24,
    "humidity": 28.9,
    "latitude": 4.38906,
    "longitude": -74.18923,
    "rssi": -101.8,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:30.731287Z",
    "altitude": 19500,
    "temperature": -56.71,
    "pressure": 58.99,
    "humidity": 27.2,
    "latitude": 4.3896,
    "longitude": -74.18742,
    "rssi": -100.7,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:34.223123Z",
    "altitude": 19800,
    "temperature": -56.05,
    "pressure": 56.27,
    "humidity": 27.3,
    "latitude": 4.39041,
    "longitude": -74.18471,
    "rssi": -101.7,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:37.357324Z",
    "altitude": 20100,
    "temperature": -56.34,
    "pressure": 54.12,
    "humidity": 25.8,
    "latitude": 4.39122,
    "longitude": -74.182,
    "rssi": -101.5,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:40.492765Z",
    "altitude": 20400,
    "temperature": -55.57,
    "pressure": 51.53,
    "humidity": 26.2,
    "latitude": 4.39204,
    "longitude": -74.17929,
    "rssi": -101.2,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:42.571930Z",
    "altitude": 20600,
    "temperature": -55.84,
    "pressure": 50.16,
    "humidity": 27.4,
    "latitude": 4.39258,
    "longitude": -74.17748,
    "rssi": -100.9,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:45.722559Z",
    "altitude": 20900,
    "temperature": -55.79,
    "pressure": 48.01,
    "humidity": 26.8,
    "latitude": 4.39339,
    "longitude": -74.17477,
    "rssi": -100.8,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:48.864894Z",
    "altitude": 21200,
    "temperature": -55.53,
    "pressure": 46.15,
    "humidity": 25.7,
    "latitude": 4.3942,
    "longitude": -74.17206,
    "rssi": -102.2,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:47:52.089056Z",
    "altitude": 21500,
    "temperature": -54.64,
    "pressure": 44.21,
    "humidity": 26.9,
    "latitude": 4.39501,
    "longitude": -74.16935,
    "rssi": -101.5,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:55.202933Z",
    "altitude": 21800,
    "temperature": -54.97,
    "pressure": 42.28,
    "humidity": 25.5,
    "latitude": 4.39582,
    "longitude": -74.16664,
    "rssi": -101.2,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:47:57.281952Z",
    "altitude": 22000,
    "temperature": -54.38,
    "pressure": 40.98,
    "humidity": 25,
    "latitude": 4.39636,
    "longitude": -74.16483,
    "rssi": -98.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:48:00.409930Z",
    "altitude": 22300,
    "temperature": -54.35,
    "pressure": 38.99,
    "humidity": 22.1,
    "latitude": 4.39717,
    "longitude": -74.16212,
    "rssi": -103.4,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:03.528390Z",
    "altitude": 22600,
    "temperature": -53.59,
    "pressure": 37.6,
    "humidity": 20.9,
    "latitude": 4.39798,
    "longitude": -74.15941,
    "rssi": -103.5,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:06.845860Z",
    "altitude": 22900,
    "temperature": -54.1,
    "pressure": 35.7,
    "humidity": 22.4,
    "latitude": 4.39879,
    "longitude": -74.1567,
    "rssi": -103.9,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:10.011522Z",
    "altitude": 23200,
    "temperature": -53.62,
    "pressure": 34.16,
    "humidity": 22.8,
    "latitude": 4.3996,
    "longitude": -74.15399,
    "rssi": -104.9,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:12.103638Z",
    "altitude": 23400,
    "temperature": -53.3,
    "pressure": 33.24,
    "humidity": 19.5,
    "latitude": 4.40014,
    "longitude": -74.15218,
    "rssi": -101.5,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:48:15.237786Z",
    "altitude": 23700,
    "temperature": -53.18,
    "pressure": 32.32,
    "humidity": 18.8,
    "latitude": 4.40095,
    "longitude": -74.14947,
    "rssi": -101.9,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:48:18.384622Z",
    "altitude": 24000,
    "temperature": -52.59,
    "pressure": 30.92,
    "humidity": 20.7,
    "latitude": 4.40176,
    "longitude": -74.14676,
    "rssi": -102.5,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:21.564432Z",
    "altitude": 24300,
    "temperature": -52.09,
    "pressure": 29.24,
    "humidity": 18.8,
    "latitude": 4.40258,
    "longitude": -74.14405,
    "rssi": -103.1,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:24.811303Z",
    "altitude": 24600,
    "temperature": -51.88,
    "pressure": 28.17,
    "humidity": 17.9,
    "latitude": 4.40339,
    "longitude": -74.14134,
    "rssi": -104.7,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:26.912918Z",
    "altitude": 24800,
    "temperature": -52.02,
    "pressure": 27.15,
    "humidity": 18.9,
    "latitude": 4.40393,
    "longitude": -74.13953,
    "rssi": -102.6,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:30.118413Z",
    "altitude": 25100,
    "temperature": -51.26,
    "pressure": 25.87,
    "humidity": 16.1,
    "latitude": 4.40474,
    "longitude": -74.13682,
    "rssi": -104.9,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:33.227100Z",
    "altitude": 25400,
    "temperature": -50.98,
    "pressure": 25.13,
    "humidity": 17.9,
    "latitude": 4.40555,
    "longitude": -74.13411,
    "rssi": -102.3,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:36.383906Z",
    "altitude": 25700,
    "temperature": -50.85,
    "pressure": 24.27,
    "humidity": 17.7,
    "latitude": 4.40636,
    "longitude": -74.1314,
    "rssi": -102.5,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:38.464486Z",
    "altitude": 25900,
    "temperature": -50.62,
    "pressure": 23.34,
    "humidity": 19.1,
    "latitude": 4.4069,
    "longitude": -74.1296,
    "rssi": -104.8,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:41.555061Z",
    "altitude": 26200,
    "temperature": -50.32,
    "pressure": 22.41,
    "humidity": 15.9,
    "latitude": 4.40771,
    "longitude": -74.12689,
    "rssi": -104.4,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:44.691932Z",
    "altitude": 26500,
    "temperature": -49.99,
    "pressure": 21.28,
    "humidity": 13.9,
    "latitude": 4.40852,
    "longitude": -74.12418,
    "rssi": -104.2,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:47.813428Z",
    "altitude": 26800,
    "temperature": -50.28,
    "pressure": 20.17,
    "humidity": 14.5,
    "latitude": 4.40933,
    "longitude": -74.12147,
    "rssi": -104.2,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:48:50.995632Z",
    "altitude": 27100,
    "temperature": -49.6,
    "pressure": 19.52,
    "humidity": 15.1,
    "latitude": 4.41014,
    "longitude": -74.11875,
    "rssi": -105.5,
    "snr": 10,
    "pdr": 0.995
  },
  {
    "time": "2026-11-08T23:48:53.114356Z",
    "altitude": 27300,
    "temperature": -49.69,
    "pressure": 19.04,
    "humidity": 16.9,
    "latitude": 4.41068,
    "longitude": -74.11695,
    "rssi": -103.2,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:48:56.254494Z",
    "altitude": 27600,
    "temperature": -49.01,
    "pressure": 18.35,
    "humidity": 14.2,
    "latitude": 4.41149,
    "longitude": -74.11424,
    "rssi": -107.3,
    "snr": 9.6,
    "pdr": 0.993
  },
  {
    "time": "2026-11-08T23:48:59.434830Z",
    "altitude": 27900,
    "temperature": -48.57,
    "pressure": 17.39,
    "humidity": 15.3,
    "latitude": 4.41231,
    "longitude": -74.11153,
    "rssi": -105,
    "snr": 10,
    "pdr": 0.995
  },
  {
    "time": "2026-11-08T23:49:02.524317Z",
    "altitude": 28200,
    "temperature": -48.56,
    "pressure": 16.84,
    "humidity": 13.8,
    "latitude": 4.41312,
    "longitude": -74.10882,
    "rssi": -106.1,
    "snr": 10,
    "pdr": 0.994
  },
  {
    "time": "2026-11-08T23:49:05.659562Z",
    "altitude": 28500,
    "temperature": -47.78,
    "pressure": 16,
    "humidity": 12,
    "latitude": 4.41393,
    "longitude": -74.10611,
    "rssi": -106.4,
    "snr": 10,
    "pdr": 0.994
  },
  {
    "time": "2026-11-08T23:49:07.868996Z",
    "altitude": 28700,
    "temperature": -47.62,
    "pressure": 15.62,
    "humidity": 11.4,
    "latitude": 4.41447,
    "longitude": -74.1043,
    "rssi": -104.5,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:49:10.953158Z",
    "altitude": 29000,
    "temperature": -47.31,
    "pressure": 14.96,
    "humidity": 13.2,
    "latitude": 4.41528,
    "longitude": -74.10159,
    "rssi": -103.5,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:49:14.086507Z",
    "altitude": 29300,
    "temperature": -47.11,
    "pressure": 14.26,
    "humidity": 9.2,
    "latitude": 4.41609,
    "longitude": -74.09888,
    "rssi": -105,
    "snr": 10,
    "pdr": 0.995
  },
  {
    "time": "2026-11-08T23:49:17.291541Z",
    "altitude": 29600,
    "temperature": -47.23,
    "pressure": 13.72,
    "humidity": 10.9,
    "latitude": 4.4169,
    "longitude": -74.09617,
    "rssi": -106.4,
    "snr": 9.4,
    "pdr": 0.994
  },
  {
    "time": "2026-11-08T23:49:19.358167Z",
    "altitude": 29800,
    "temperature": -47.26,
    "pressure": 13.4,
    "humidity": 9.4,
    "latitude": 4.41744,
    "longitude": -74.09436,
    "rssi": -106.1,
    "snr": 10,
    "pdr": 0.994
  },
  {
    "time": "2026-11-08T23:49:22.515071Z",
    "altitude": 29840.2,
    "temperature": -46.52,
    "pressure": 13.2,
    "humidity": 11,
    "latitude": 4.41762,
    "longitude": -74.09376,
    "rssi": -105.5,
    "snr": 10,
    "pdr": 0.995
  },
  {
    "time": "2026-11-08T23:49:25.672340Z",
    "altitude": 29362.6,
    "temperature": -46.8,
    "pressure": 14.25,
    "humidity": 11,
    "latitude": 4.41654,
    "longitude": -74.09738,
    "rssi": -104,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:49:28.910307Z",
    "altitude": 28887.9,
    "temperature": -47.73,
    "pressure": 14.78,
    "humidity": 12.4,
    "latitude": 4.41547,
    "longitude": -74.10096,
    "rssi": -103.7,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:49:32.034614Z",
    "altitude": 28416.1,
    "temperature": -47.99,
    "pressure": 15.73,
    "humidity": 11.7,
    "latitude": 4.4144,
    "longitude": -74.10453,
    "rssi": -103.6,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:49:34.091797Z",
    "altitude": 28103.2,
    "temperature": -48.76,
    "pressure": 16.93,
    "humidity": 14.4,
    "latitude": 4.41369,
    "longitude": -74.10689,
    "rssi": -105.5,
    "snr": 10,
    "pdr": 0.995
  },
  {
    "time": "2026-11-08T23:49:37.237169Z",
    "altitude": 27636.2,
    "temperature": -48.96,
    "pressure": 18.03,
    "humidity": 13.9,
    "latitude": 4.41264,
    "longitude": -74.11042,
    "rssi": -106.2,
    "snr": 10,
    "pdr": 0.994
  },
  {
    "time": "2026-11-08T23:49:40.730432Z",
    "altitude": 27172.3,
    "temperature": -49.42,
    "pressure": 19.66,
    "humidity": 15.1,
    "latitude": 4.41159,
    "longitude": -74.11392,
    "rssi": -103,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:49:43.831926Z",
    "altitude": 26711.2,
    "temperature": -49.84,
    "pressure": 20.85,
    "humidity": 13.5,
    "latitude": 4.41055,
    "longitude": -74.1174,
    "rssi": -104,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:49:46.919973Z",
    "altitude": 26253.2,
    "temperature": -50.16,
    "pressure": 22.34,
    "humidity": 15.6,
    "latitude": 4.40952,
    "longitude": -74.12085,
    "rssi": -105.2,
    "snr": 10,
    "pdr": 0.995
  },
  {
    "time": "2026-11-08T23:49:49.024975Z",
    "altitude": 25949.4,
    "temperature": -51.2,
    "pressure": 22.8,
    "humidity": 16.7,
    "latitude": 4.40883,
    "longitude": -74.12314,
    "rssi": -102.4,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:49:52.136762Z",
    "altitude": 25496.4,
    "temperature": -50.87,
    "pressure": 24.64,
    "humidity": 16.4,
    "latitude": 4.40781,
    "longitude": -74.12655,
    "rssi": -103.9,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:49:55.249835Z",
    "altitude": 25046.3,
    "temperature": -51.41,
    "pressure": 26.4,
    "humidity": 19.9,
    "latitude": 4.4068,
    "longitude": -74.12994,
    "rssi": -103.3,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:49:58.384019Z",
    "altitude": 24599.2,
    "temperature": -51.53,
    "pressure": 28.4,
    "humidity": 18.5,
    "latitude": 4.40579,
    "longitude": -74.13331,
    "rssi": -104.7,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:50:00.464514Z",
    "altitude": 24302.8,
    "temperature": -51.88,
    "pressure": 29.28,
    "humidity": 22.3,
    "latitude": 4.40512,
    "longitude": -74.13554,
    "rssi": -103.4,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:03.577432Z",
    "altitude": 23860.8,
    "temperature": -52.49,
    "pressure": 31.26,
    "humidity": 22.1,
    "latitude": 4.40413,
    "longitude": -74.13886,
    "rssi": -102.7,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:06.846885Z",
    "altitude": 23421.8,
    "temperature": -53.26,
    "pressure": 33.43,
    "humidity": 22.6,
    "latitude": 4.40314,
    "longitude": -74.14216,
    "rssi": -103.1,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:09.959026Z",
    "altitude": 22985.9,
    "temperature": -54.18,
    "pressure": 35.66,
    "humidity": 22.2,
    "latitude": 4.40216,
    "longitude": -74.14543,
    "rssi": -100.5,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:13.070009Z",
    "altitude": 22553,
    "temperature": -53.85,
    "pressure": 37.84,
    "humidity": 22.3,
    "latitude": 4.40119,
    "longitude": -74.14868,
    "rssi": -102.3,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:15.138874Z",
    "altitude": 22266.2,
    "temperature": -54.2,
    "pressure": 39.54,
    "humidity": 21.3,
    "latitude": 4.40055,
    "longitude": -74.15083,
    "rssi": -103.7,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:18.298385Z",
    "altitude": 21838.5,
    "temperature": -55.22,
    "pressure": 41.88,
    "humidity": 23.2,
    "latitude": 4.39959,
    "longitude": -74.15404,
    "rssi": -103.3,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:21.445172Z",
    "altitude": 21414,
    "temperature": -54.96,
    "pressure": 44.65,
    "humidity": 23.9,
    "latitude": 4.39864,
    "longitude": -74.15722,
    "rssi": -103.8,
    "snr": 10,
    "pdr": 0.996
  },
  {
    "time": "2026-11-08T23:50:24.558973Z",
    "altitude": 20992.6,
    "temperature": -55.29,
    "pressure": 47.63,
    "humidity": 23.9,
    "latitude": 4.39769,
    "longitude": -74.16038,
    "rssi": -101.6,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:27.716418Z",
    "altitude": 20574.3,
    "temperature": -55.89,
    "pressure": 50.59,
    "humidity": 24.7,
    "latitude": 4.39676,
    "longitude": -74.16351,
    "rssi": -101.7,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:29.784199Z",
    "altitude": 20297.2,
    "temperature": -56.29,
    "pressure": 52.14,
    "humidity": 26.1,
    "latitude": 4.39614,
    "longitude": -74.16558,
    "rssi": -102.5,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:32.865013Z",
    "altitude": 19884.2,
    "temperature": -55.99,
    "pressure": 55.86,
    "humidity": 24.1,
    "latitude": 4.39521,
    "longitude": -74.16867,
    "rssi": -98.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:50:35.956068Z",
    "altitude": 19474.4,
    "temperature": -56.28,
    "pressure": 59.29,
    "humidity": 26,
    "latitude": 4.3943,
    "longitude": -74.17173,
    "rssi": -101.7,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:39.090888Z",
    "altitude": 19067.8,
    "temperature": -56.68,
    "pressure": 63.56,
    "humidity": 26.9,
    "latitude": 4.39339,
    "longitude": -74.17476,
    "rssi": -102.6,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:42.235467Z",
    "altitude": 18664.4,
    "temperature": -56.58,
    "pressure": 67.77,
    "humidity": 28.4,
    "latitude": 4.39249,
    "longitude": -74.17777,
    "rssi": -102.4,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:44.282275Z",
    "altitude": 18397.3,
    "temperature": -56.69,
    "pressure": 70.59,
    "humidity": 30,
    "latitude": 4.39189,
    "longitude": -74.17976,
    "rssi": -101.4,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:47.373874Z",
    "altitude": 17999.4,
    "temperature": -56.5,
    "pressure": 74.42,
    "humidity": 28.8,
    "latitude": 4.39101,
    "longitude": -74.18273,
    "rssi": -101.7,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:50.487798Z",
    "altitude": 17604.7,
    "temperature": -56.57,
    "pressure": 80.24,
    "humidity": 28.1,
    "latitude": 4.39013,
    "longitude": -74.18566,
    "rssi": -102.1,
    "snr": 10,
    "pdr": 0.997
  },
  {
    "time": "2026-11-08T23:50:53.592724Z",
    "altitude": 17213.3,
    "temperature": -56.57,
    "pressure": 84.96,
    "humidity": 33.1,
    "latitude": 4.38926,
    "longitude": -74.18858,
    "rssi": -100.9,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:55.677399Z",
    "altitude": 16954.2,
    "temperature": -56.16,
    "pressure": 88.52,
    "humidity": 31.1,
    "latitude": 4.38868,
    "longitude": -74.1905,
    "rssi": -99.6,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:50:58.870285Z",
    "altitude": 16568.4,
    "temperature": -56.6,
    "pressure": 93.9,
    "humidity": 33.7,
    "latitude": 4.38782,
    "longitude": -74.19337,
    "rssi": -101.7,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:01.994294Z",
    "altitude": 16185.9,
    "temperature": -56.55,
    "pressure": 100.26,
    "humidity": 31.9,
    "latitude": 4.38697,
    "longitude": -74.19621,
    "rssi": -100.4,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:05.130791Z",
    "altitude": 15806.7,
    "temperature": -56.28,
    "pressure": 106.31,
    "humidity": 38.4,
    "latitude": 4.38613,
    "longitude": -74.19902,
    "rssi": -101,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:08.320603Z",
    "altitude": 15430.9,
    "temperature": -56.84,
    "pressure": 112.26,
    "humidity": 33.9,
    "latitude": 4.3853,
    "longitude": -74.20181,
    "rssi": -100,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:10.411249Z",
    "altitude": 15182.3,
    "temperature": -56.07,
    "pressure": 116.92,
    "humidity": 33.7,
    "latitude": 4.38475,
    "longitude": -74.20365,
    "rssi": -100,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:13.543966Z",
    "altitude": 14812.2,
    "temperature": -56.41,
    "pressure": 124.09,
    "humidity": 33.5,
    "latitude": 4.38393,
    "longitude": -74.20638,
    "rssi": -100.1,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:16.727374Z",
    "altitude": 14445.5,
    "temperature": -56.6,
    "pressure": 131.19,
    "humidity": 36.1,
    "latitude": 4.38312,
    "longitude": -74.20909,
    "rssi": -99,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:19.995141Z",
    "altitude": 14082.3,
    "temperature": -56.11,
    "pressure": 139.33,
    "humidity": 38.2,
    "latitude": 4.38232,
    "longitude": -74.21178,
    "rssi": -100.6,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:23.142218Z",
    "altitude": 13722.6,
    "temperature": -56.36,
    "pressure": 147.62,
    "humidity": 35.6,
    "latitude": 4.38152,
    "longitude": -74.21443,
    "rssi": -100.7,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:25.233336Z",
    "altitude": 13484.7,
    "temperature": -56.03,
    "pressure": 152.85,
    "humidity": 38.5,
    "latitude": 4.381,
    "longitude": -74.21618,
    "rssi": -98.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:28.424797Z",
    "altitude": 13130.8,
    "temperature": -56.57,
    "pressure": 161.57,
    "humidity": 39.4,
    "latitude": 4.38022,
    "longitude": -74.21879,
    "rssi": -98.6,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:31.583802Z",
    "altitude": 12780.5,
    "temperature": -56.33,
    "pressure": 170.78,
    "humidity": 40,
    "latitude": 4.37945,
    "longitude": -74.22137,
    "rssi": -99.9,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:34.765371Z",
    "altitude": 12433.7,
    "temperature": -56.19,
    "pressure": 180.72,
    "humidity": 38.3,
    "latitude": 4.37868,
    "longitude": -74.22392,
    "rssi": -98.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:36.805823Z",
    "altitude": 12204.5,
    "temperature": -56.66,
    "pressure": 187.22,
    "humidity": 38.5,
    "latitude": 4.37818,
    "longitude": -74.2256,
    "rssi": -99.8,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:39.931383Z",
    "altitude": 11863.8,
    "temperature": -56.85,
    "pressure": 197.43,
    "humidity": 38.8,
    "latitude": 4.37743,
    "longitude": -74.2281,
    "rssi": -100.5,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:51:43.044914Z",
    "altitude": 11526.6,
    "temperature": -56.6,
    "pressure": 208.14,
    "humidity": 39.8,
    "latitude": 4.37669,
    "longitude": -74.23057,
    "rssi": -97.9,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:46.478311Z",
    "altitude": 11193.1,
    "temperature": -56.32,
    "pressure": 219.8,
    "humidity": 43.1,
    "latitude": 4.37596,
    "longitude": -74.23301,
    "rssi": -98.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:49.581831Z",
    "altitude": 10863.3,
    "temperature": -55.46,
    "pressure": 231.53,
    "humidity": 42.1,
    "latitude": 4.37524,
    "longitude": -74.23542,
    "rssi": -96,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:51.693946Z",
    "altitude": 10645.5,
    "temperature": -54.55,
    "pressure": 239.41,
    "humidity": 40.7,
    "latitude": 4.37477,
    "longitude": -74.23701,
    "rssi": -97.4,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:54.775293Z",
    "altitude": 10321.9,
    "temperature": -52.1,
    "pressure": 251.68,
    "humidity": 41.5,
    "latitude": 4.37406,
    "longitude": -74.23937,
    "rssi": -97.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:51:57.865725Z",
    "altitude": 10002.1,
    "temperature": -49.78,
    "pressure": 264.59,
    "humidity": 44.2,
    "latitude": 4.37336,
    "longitude": -74.2417,
    "rssi": -96.5,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:01.001582Z",
    "altitude": 9686,
    "temperature": -48.2,
    "pressure": 277.05,
    "humidity": 42.6,
    "latitude": 4.37268,
    "longitude": -74.244,
    "rssi": -98.1,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:04.147810Z",
    "altitude": 9373.8,
    "temperature": -46.28,
    "pressure": 290.7,
    "humidity": 43.4,
    "latitude": 4.372,
    "longitude": -74.24627,
    "rssi": -96.3,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:06.268771Z",
    "altitude": 9167.8,
    "temperature": -44.72,
    "pressure": 299.96,
    "humidity": 46.2,
    "latitude": 4.37155,
    "longitude": -74.24776,
    "rssi": -100.1,
    "snr": 10,
    "pdr": 0.998
  },
  {
    "time": "2026-11-08T23:52:09.362525Z",
    "altitude": 8862,
    "temperature": -42.89,
    "pressure": 313.86,
    "humidity": 47.5,
    "latitude": 4.37089,
    "longitude": -74.24998,
    "rssi": -97.8,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:12.454759Z",
    "altitude": 8560.1,
    "temperature": -40.59,
    "pressure": 327.94,
    "humidity": 47.2,
    "latitude": 4.37024,
    "longitude": -74.25216,
    "rssi": -96.2,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:15.566333Z",
    "altitude": 8262.2,
    "temperature": -38.19,
    "pressure": 342.59,
    "humidity": 46.6,
    "latitude": 4.36959,
    "longitude": -74.25431,
    "rssi": -95.8,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:18.924759Z",
    "altitude": 7968.2,
    "temperature": -36.44,
    "pressure": 357.65,
    "humidity": 45.9,
    "latitude": 4.36896,
    "longitude": -74.25643,
    "rssi": -95.9,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:20.990926Z",
    "altitude": 7774.5,
    "temperature": -35.14,
    "pressure": 367.42,
    "humidity": 46.6,
    "latitude": 4.36854,
    "longitude": -74.25783,
    "rssi": -96,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:24.117062Z",
    "altitude": 7487.2,
    "temperature": -33.66,
    "pressure": 383.5,
    "humidity": 46.1,
    "latitude": 4.36792,
    "longitude": -74.25989,
    "rssi": -95.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:27.205788Z",
    "altitude": 7204,
    "temperature": -31.99,
    "pressure": 399.03,
    "humidity": 47.4,
    "latitude": 4.36732,
    "longitude": -74.26192,
    "rssi": -95.6,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:30.443218Z",
    "altitude": 6925,
    "temperature": -29.8,
    "pressure": 415.23,
    "humidity": 49.7,
    "latitude": 4.36672,
    "longitude": -74.26392,
    "rssi": -94,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:32.581783Z",
    "altitude": 6741.2,
    "temperature": -28.52,
    "pressure": 425.76,
    "humidity": 48.4,
    "latitude": 4.36632,
    "longitude": -74.26524,
    "rssi": -95.7,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:35.747569Z",
    "altitude": 6469.1,
    "temperature": -27.01,
    "pressure": 442.1,
    "humidity": 48.2,
    "latitude": 4.36574,
    "longitude": -74.26718,
    "rssi": -93.5,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:38.871764Z",
    "altitude": 6201.2,
    "temperature": -24.66,
    "pressure": 459.19,
    "humidity": 50,
    "latitude": 4.36517,
    "longitude": -74.26909,
    "rssi": -93.3,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:41.983948Z",
    "altitude": 5937.6,
    "temperature": -23.75,
    "pressure": 475.93,
    "humidity": 51.1,
    "latitude": 4.36461,
    "longitude": -74.27096,
    "rssi": -91.8,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:45.075634Z",
    "altitude": 5678.3,
    "temperature": -22.04,
    "pressure": 492.96,
    "humidity": 51.1,
    "latitude": 4.36406,
    "longitude": -74.2728,
    "rssi": -92.7,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:47.188118Z",
    "altitude": 5507.8,
    "temperature": -20.53,
    "pressure": 504.17,
    "humidity": 49.6,
    "latitude": 4.3637,
    "longitude": -74.274,
    "rssi": -95,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:52:50.324676Z",
    "altitude": 5255.8,
    "temperature": -19.46,
    "pressure": 522.07,
    "humidity": 53.7,
    "latitude": 4.36317,
    "longitude": -74.27578,
    "rssi": -92.9,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:53.446826Z",
    "altitude": 5008.3,
    "temperature": -17.53,
    "pressure": 539.87,
    "humidity": 51.6,
    "latitude": 4.36265,
    "longitude": -74.27752,
    "rssi": -93.6,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:56.545447Z",
    "altitude": 4765.2,
    "temperature": -16.26,
    "pressure": 557.33,
    "humidity": 51.1,
    "latitude": 4.36214,
    "longitude": -74.27923,
    "rssi": -92.2,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:52:59.728972Z",
    "altitude": 4526.8,
    "temperature": -14.58,
    "pressure": 575.3,
    "humidity": 53.1,
    "latitude": 4.36164,
    "longitude": -74.28089,
    "rssi": -92,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:01.965849Z",
    "altitude": 4370.3,
    "temperature": -13.14,
    "pressure": 587.1,
    "humidity": 54.6,
    "latitude": 4.36131,
    "longitude": -74.28199,
    "rssi": -91.4,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:05.077109Z",
    "altitude": 4139.6,
    "temperature": -12.62,
    "pressure": 605.08,
    "humidity": 54.2,
    "latitude": 4.36083,
    "longitude": -74.28359,
    "rssi": -90.2,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:08.167202Z",
    "altitude": 3913.6,
    "temperature": -9.99,
    "pressure": 623.33,
    "humidity": 53.7,
    "latitude": 4.36037,
    "longitude": -74.28516,
    "rssi": -94.2,
    "snr": 10,
    "pdr": 0.999
  },
  {
    "time": "2026-11-08T23:53:11.227724Z",
    "altitude": 3692.4,
    "temperature": -8.82,
    "pressure": 641.22,
    "humidity": 54.5,
    "latitude": 4.35991,
    "longitude": -74.28669,
    "rssi": -93.7,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:13.324160Z",
    "altitude": 3547.6,
    "temperature": -7.79,
    "pressure": 653.83,
    "humidity": 56.2,
    "latitude": 4.35961,
    "longitude": -74.28768,
    "rssi": -93.4,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:16.439561Z",
    "altitude": 3334.5,
    "temperature": -6.71,
    "pressure": 671.81,
    "humidity": 53.8,
    "latitude": 4.35917,
    "longitude": -74.28914,
    "rssi": -92.9,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:19.688934Z",
    "altitude": 3126.4,
    "temperature": -4.88,
    "pressure": 689.84,
    "humidity": 56,
    "latitude": 4.35875,
    "longitude": -74.29056,
    "rssi": -91.8,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:22.777356Z",
    "altitude": 2923.4,
    "temperature": -4.01,
    "pressure": 708.29,
    "humidity": 56.2,
    "latitude": 4.35834,
    "longitude": -74.29194,
    "rssi": -90.9,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:26.262709Z",
    "altitude": 2725.5,
    "temperature": -2.57,
    "pressure": 726.03,
    "humidity": 55.7,
    "latitude": 4.35794,
    "longitude": -74.29328,
    "rssi": -91.4,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:28.346000Z",
    "altitude": 2596.5,
    "temperature": -1.56,
    "pressure": 738.17,
    "humidity": 57.1,
    "latitude": 4.35768,
    "longitude": -74.29415,
    "rssi": -92.1,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:31.452606Z",
    "altitude": 2407.4,
    "temperature": -1.16,
    "pressure": 755.62,
    "humidity": 54.8,
    "latitude": 4.3573,
    "longitude": -74.29542,
    "rssi": -90.9,
    "snr": 10,
    "pdr": 1
  },
  {
    "time": "2026-11-08T23:53:34.609514Z",
    "altitude": 2223.8,
    "temperature": 0.38,
    "pressure": 773.03,
    "humidity": 53.7,
    "latitude": 4.35693,
    "longitude": -74.29664,
    "rssi": -89.2,
    "snr": 10,
    "pdr": 1
  }
];

export const MARCO: MarcoSection[] = [
  {
    "slug": "satelites-educativos",
    "title": "2.1 Satélites educativos y capas de la atmósfera",
    "order": 1,
    "content": "<h2>Satélites educativos</h2>\n<p>Un <strong>satélite educativo</strong> es una plataforma espacial de bajo costo diseñada para aprender haciendo: integra sensores, cómputo, energía y comunicaciones en un sistema que el estudiante puede construir, operar y analizar.</p>\n<h3>CubeSat, CanSat y HAB</h3>\n<ul>\n<li><strong>CubeSat:</strong> nanosatélite estandarizado en unidades cúbicas de 10 cm (1U), pensado para órbita baja terrestre (LEO).</li>\n<li><strong>CanSat:</strong> modelo del tamaño de una lata de bebida (~330 ml) que reproduce las funciones esenciales de un satélite.</li>\n<li><strong>HAB (High Altitude Balloon):</strong> globo de gran altitud que alcanza la estratosfera y permite probar cargas útiles y enlaces de radio en condiciones cercanas al espacio con un costo muy inferior.</li>\n</ul>\n<h3>Capas de la atmósfera</h3>\n<p>La <strong>troposfera</strong> (0–12 km aprox.) concentra el clima; la <strong>estratosfera</strong> (≈12–50 km) es la región que alcanzan los globos HAB, con baja presión y temperaturas muy frías; la <strong>mesosfera</strong> (≈50–85 km), la <strong>termosfera</strong> (≈85–600 km, donde orbitan los satélites LEO) y la <strong>exosfera</strong> completan el perfil. Cada capa afecta la propagación de la señal, la temperatura de operación y la presión que soporta la electrónica.</p>",
    "references": [
      "Contente et al. (2022)",
      "Moreira et al. (2020)",
      "Díaz-Martínez et al. (2024)"
    ]
  },
  {
    "slug": "lora-lorawan",
    "title": "2.2 LoRa y LoRaWAN",
    "order": 2,
    "content": "<h2>LoRa: capa física</h2>\n<p>LoRa modula la señal mediante <em>chirps</em> de espectro ensanchado. Sus parámetros clave son el <strong>Spreading Factor (SF 7–12)</strong>, el <strong>ancho de banda (125/250/500 kHz)</strong> y la <strong>tasa de codificación (CR 4/5–4/8)</strong>. Un SF mayor mejora la sensibilidad y el alcance, pero reduce la tasa de datos y aumenta el tiempo en aire.</p>\n<h2>LoRaWAN: capa MAC y red</h2>\n<p>Arquitectura en estrella de estrellas: <strong>nodos</strong> → <strong>gateways</strong> → <strong>servidor de red</strong> → servidores de aplicación.</p>\n<h3>Clases de dispositivos</h3>\n<ul>\n<li><strong>Clase A:</strong> transmite cuando quiere y abre dos ventanas de recepción; mínimo consumo.</li>\n<li><strong>Clase B:</strong> añade ventanas de recepción programadas por balizas.</li>\n<li><strong>Clase C:</strong> escucha de forma casi continua; mayor consumo.</li>\n</ul>\n<h3>Comparación</h3>\n<p>Frente a WiFi, LoRa ofrece mucho mayor alcance y menor consumo a cambio de tasas de datos muy bajas. Frente a LTE, opera en bandas ISM sin licencia de espectro ni suscripción de operador.</p>",
    "references": [
      "Doroshkin et al. (2019)",
      "Ullah et al. (2024)",
      "Haxhibeqiri et al. (2018)"
    ]
  },
  {
    "slug": "doppler-redundancia",
    "title": "2.3 Efecto Doppler y redundancia",
    "order": 3,
    "content": "<h2>Efecto Doppler en LEO</h2>\n<p>Un satélite LEO a ~400 km viaja a cerca de <strong>7,7 km/s</strong>. La velocidad radial respecto a la estación produce un corrimiento <code>f_d = (v_r / c) · f_c</code>, del orden de ±20 kHz en 915 MHz, que puede desalinear el receptor LoRa.</p>\n<h3>Mitigaciones</h3>\n<ul>\n<li><strong>Pre-compensación</strong> de frecuencia en el transmisor según la efeméride.</li>\n<li><strong>SF ≤ 11 con BW &gt; 31,25 kHz</strong>, más tolerantes al desplazamiento.</li>\n<li><strong>ADR</strong> (Adaptive Data Rate) para ajustar SF y potencia.</li>\n<li><strong>LR-FHSS</strong>, modulación con saltos de frecuencia para enlaces satelitales.</li>\n</ul>\n<h2>Redundancia</h2>\n<p>Estrategias para continuidad del servicio: <strong>nodos virtuales</strong>, <strong>gateway móvil</strong> de respaldo y arquitectura <strong>store-and-forward</strong> que almacena paquetes hasta que haya enlace.</p>",
    "references": [
      "Zadorozhny et al. (2022)",
      "Ullah et al. (2025)",
      "Carvalho et al. (2021)",
      "Wang et al. (2024)"
    ]
  },
  {
    "slug": "seguridad-lorawan",
    "title": "2.4 Seguridad en LoRaWAN",
    "order": 4,
    "content": "<h2>Vulnerabilidades</h2>\n<p>Las amenazas se distribuyen entre capa física (PHY), MAC y aplicación. Según la revisión sistemática que sustenta este ODC, cerca del <strong>62 %</strong> de los ataques documentados se concentra en la <strong>capa MAC</strong>: replay, jamming, agotamiento de recursos y manipulación de contadores de trama.</p>\n<h2>Defensas</h2>\n<ul>\n<li><strong>AES-128</strong> para cifrado y autenticación en capas de red y aplicación.</li>\n<li><strong>ECDH + ECDSA</strong> para intercambio de claves y firma.</li>\n<li><strong>Kyber-1024</strong>, criptografía post-cuántica.</li>\n<li><strong>RF fingerprinting</strong> para autenticar físicamente al transmisor.</li>\n</ul>\n<h2>Política «listen first»</h2>\n<p>Escuchar el canal antes de transmitir (<em>listen-before-talk</em>) reduce colisiones y ayuda a detectar interferencia o jamming.</p>",
    "references": [
      "Toé et al. (2026)",
      "Qadir et al. (2023)",
      "Osuorah et al. (2025)",
      "Rolland et al. (2025)"
    ]
  }
];

export const GUIAS: Guia[] = [
  {
    "slug": "seleccion-componentes",
    "title": "4.1 Selección de componentes",
    "description": "Dos configuraciones de referencia: económica (≈ $1.289.149 COP) y premium (≈ $4.507.479 COP).",
    "order": 1,
    "steps": [
      {
        "step": 1,
        "title": "Defina el perfil",
        "body": "Económico (Raspberry Pi 3 Model B+ + módulo RFM95W) o premium (Raspberry Pi 4 + radio de mayor potencia, GPS y sensores de mejor grado)."
      }
    ],
    "code": [],
    "pdfUrl": "guia-1-componentes.pdf",
    "components": [
      {
        "category": "Computación",
        "item": "Raspberry Pi 3 Model B+ (computador de a bordo)",
        "economico": 85000,
        "premium": 380000
      },
      {
        "category": "Control y Adquisición",
        "item": "Arduino Uno (lectura de sensores, I2C/GPIO)",
        "economico": 25000,
        "premium": 90000
      },
      {
        "category": "Comunicaciones",
        "item": "Módulo LoRa 915 MHz (RFM95W / módulo SX1262 de mayor potencia)",
        "economico": 65000,
        "premium": 450000
      },
      {
        "category": "Navegación",
        "item": "GPS (NEO-6M / u-blox M8N)",
        "economico": 45000,
        "premium": 160000
      },
      {
        "category": "Sensores",
        "item": "Presión, temperatura y humedad (BME280 / BME680 + IMU)",
        "economico": 38000,
        "premium": 190000
      },
      {
        "category": "Energía",
        "item": "Baterías y portabaterías (Li-ion 18650 / litio para bajas temperaturas)",
        "economico": 60000,
        "premium": 150000
      },
      {
        "category": "Comunicaciones",
        "item": "Antena 915 MHz (monopolo / helicoidal)",
        "economico": 25000,
        "premium": 120000
      },
      {
        "category": "Vuelo",
        "item": "Globo meteorológico y helio",
        "economico": 420000,
        "premium": 780000
      },
      {
        "category": "Vuelo",
        "item": "Paracaídas",
        "economico": 90000,
        "premium": 180000
      },
      {
        "category": "Estructura",
        "item": "Caja térmica de poliestireno / con aislamiento reforzado",
        "economico": 25000,
        "premium": 90000
      },
      {
        "category": "Carga útil",
        "item": "Cámara (módulo estándar / cámara de 12 MP)",
        "economico": 120000,
        "premium": 330000
      },
      {
        "category": "Integración",
        "item": "Cables, conectores y protoboard / PCB",
        "economico": 35000,
        "premium": 80000
      },
      {
        "category": "Estación terrena",
        "item": "Receptor LoRa y antena de recepción",
        "economico": 281149,
        "premium": 1597479
      }
    ]
  },
  {
    "slug": "conexiones-electricas",
    "title": "4.2 Conexiones eléctricas",
    "description": "Diagrama de bloques y conexión SPI/GPIO entre la Raspberry Pi y el módulo LoRa.",
    "order": 2,
    "steps": [
      {
        "step": 1,
        "title": "Seguridad primero",
        "body": "Trabaje sin alimentación conectada. El módulo RFM95W es de 3,3 V: nunca lo alimente a 5 V."
      },
      {
        "step": 2,
        "title": "Conexión SPI",
        "body": "Conecte SCK, MISO, MOSI y CS según el bloque de código; comparta GND entre todos los módulos."
      },
      {
        "step": 3,
        "title": "Antena",
        "body": "Nunca transmita sin antena conectada: puede dañar el amplificador de salida."
      }
    ],
    "code": [
      "# Raspberry Pi 3 Model B+  <->  RFM95W (SPI0)\n# 3V3         -> VIN\n# GND          -> GND\n# GPIO11 SCLK  -> SCK\n# GPIO10 MOSI  -> MOSI\n# GPIO9  MISO  -> MISO\n# GPIO8  CE0   -> NSS (CS)\n# GPIO25       -> RST\n# GPIO24       -> DIO0 (IRQ)\n\n# Arduino Uno  <->  BME280 (I2C)\n# 5V           -> VIN\n# GND          -> GND\n# A4 (SDA)     -> SDA\n# A5 (SCL)     -> SCL\n\n# Arduino Uno  <->  DS18B20 (1-Wire)\n# 5V           -> VDD\n# GND          -> GND\n# D10          -> DATA (con resistencia pull-up 4.7k a 5V)\n\n# Arduino Uno  <->  GPS NEO-6M (UART)\n# 5V           -> VCC\n# GND          -> GND\n# A1 (RX)      -> TXD\n# A2 (TX)      -> RXD\n\n# Raspberry Pi 3 Model B+  <->  Arduino Uno (USB)\n# USB          -> USB (Serial 115200 baud)"
    ],
    "pdfUrl": "guia-2-conexiones.pdf",
    "components": []
  },
  {
    "slug": "instalacion-software",
    "title": "4.3 Instalación de software",
    "description": "Instalación completa: sistema operativo, dependencias, Python, Adafruit Blinka, PySerial, Mosquitto y Node-RED.",
    "order": 3,
    "steps": [
      {
        "step": 1,
        "title": "Sistema operativo",
        "body": "Grabe Raspberry Pi OS Lite (64-bit) con Raspberry Pi Imager y habilite SSH. Conecte la Raspberry Pi a la red y verifique el acceso remoto."
      },
      {
        "step": 2,
        "title": "Actualizar e instalar dependencias",
        "body": "Ejecute sudo apt update && sudo apt full-upgrade -y. Habilite SPI con sudo raspi-config nonint do_spi 0. Instale python3-pip, python3-venv, python3-dev, mosquitto, mosquitto-clients, git e i2c-tools."
      },
      {
        "step": 3,
        "title": "Crear entorno virtual",
        "body": "Cree el directorio ~/estratosat y el entorno virtual con python3 -m venv --system-site-packages ~/estratosat/venv. Active el entorno con source ~/estratosat/venv/bin/activate."
      },
      {
        "step": 4,
        "title": "Instalar librerías de Python",
        "body": "Instale Adafruit Blinka (pip install adafruit-blinka), Adafruit CircuitPython RFM9x (pip install adafruit-circuitpython-rfm9x) y PySerial (pip install pyserial)."
      },
      {
        "step": 5,
        "title": "Configurar Mosquitto",
        "body": "Habilite el servicio con sudo systemctl enable mosquitto && sudo systemctl start mosquitto. Verifique con sudo systemctl status mosquitto. Configure usuarios y tópicos según necesidad."
      },
      {
        "step": 6,
        "title": "Instalar Node-RED",
        "body": "Instale Node-RED con el script oficial: bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered). Habilite el servicio con sudo systemctl enable nodered && sudo systemctl start nodered."
      }
    ],
    "code": [
      "sudo apt update && sudo apt full-upgrade -y\n\n# Habilitar SPI\nsudo raspi-config nonint do_spi 0\n\n# Instalar herramientas y servicios\nsudo apt install -y \\\n  python3-pip \\\n  python3-venv \\\n  python3-dev \\\n  mosquitto \\\n  mosquitto-clients \\\n  git \\\n  i2c-tools\n\n# Crear entorno virtual\nmkdir -p ~/estratosat\npython3 -m venv --system-site-packages ~/estratosat/venv\n\n# Activar entorno\nsource ~/estratosat/venv/bin/activate\n\n# Instalar librerías de Python\npip install adafruit-blinka\npip install adafruit-circuitpython-rfm9x\npip install pyserial\n\n# Configurar Mosquitto\nsudo systemctl enable mosquitto\nsudo systemctl start mosquitto\n\n# Instalar Node-RED\nbash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)\nsudo systemctl enable nodered\nsudo systemctl start nodered"
    ],
    "pdfUrl": "guia-3-software.pdf",
    "components": []
  },
  {
    "slug": "programacion-raspberry",
    "title": "4.4 Programación de la Raspberry Pi y Arduino Uno",
    "description": "Código completo: transmisión LoRa (Raspberry Pi), lectura de sensores (Arduino Uno) y receptor de telemetría (Raspberry Pi 3 B+).",
    "order": 4,
    "steps": [
      {
        "step": 1,
        "title": "Arduino: lectura de sensores",
        "body": "El Arduino Uno lee los sensores BME280 (I2C), DS18B20 (1-Wire) y GPS NEO-6M (UART). Genera un JSON con todos los datos y lo envía por USB a la Raspberry Pi a 115200 baudios."
      },
      {
        "step": 2,
        "title": "Raspberry Pi: transmisión LoRa",
        "body": "La Raspberry Pi 3 B+ recibe el JSON del Arduino por USB (/dev/ttyACM0), procesa los datos y los transmite por LoRa a 915 MHz usando el módulo RFM95W conectado por SPI."
      },
      {
        "step": 3,
        "title": "Estación terrestre: recepción",
        "body": "Una segunda Raspberry Pi o PC con módulo RFM95W recibe los paquetes LoRa y los entrega al sistema de visualización (Node-RED, MQTT o página web)."
      },
      {
        "step": 4,
        "title": "Dependencias necesarias",
        "body": "Instale en la Raspberry Pi: python3-serial (para leer el Arduino), adafruit-blinka y adafruit-circuitpython-rfm9x (para controlar el LoRa). En el Arduino instale las librerías: Adafruit BME280, TinyGPSPlus, OneWire, DallasTemperature y LiquidCrystal."
      }
    ],
    "code": [
      "import time, board, busio, digitalio\nimport adafruit_rfm9x\n\n# --- Configuracion del radio (SPI0) ---\nspi = busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO)\ncs = digitalio.DigitalInOut(board.CE0)\nreset = digitalio.DigitalInOut(board.D25)\nrfm9x = adafruit_rfm9x.RFM9x(spi, cs, reset, 915.0)\nrfm9x.tx_power = 14        # dBm\nrfm9x.spreading_factor = 10\nrfm9x.signal_bandwidth = 125000\n\nwhile True:\n    # Trama: tiempo,altitud,temperatura\n    payload = f\"{int(time.time())},0.0,0.0\"\n    rfm9x.send(bytes(payload, \"utf-8\"))\n    time.sleep(10)",
      "#include <Wire.h>\n#include <LiquidCrystal.h>\n#include <SoftwareSerial.h>\n#include <Adafruit_Sensor.h>\n#include <Adafruit_BME280.h>\n#include <TinyGPSPlus.h>\n#include <OneWire.h>\n#include <DallasTemperature.h>\n\n// ======================================\n// ESTRATOSAT-TELCO\n// Arduino Uno R3 - Sistema de telemetria\n// ======================================\n\n// LCD Keypad Shield\nLiquidCrystal lcd(8, 9, 4, 5, 6, 7);\n\n// BME280 - I2C\nAdafruit_BME280 bme;\n\n// GPS NEO-6M\n// Arduino RX = A1, Arduino TX = A2\nSoftwareSerial gpsSerial(A1, A2);\nTinyGPSPlus gps;\n\n// DS18B20\n#define ONE_WIRE_BUS 10\nOneWire oneWire(ONE_WIRE_BUS);\nDallasTemperature ds18b20(&oneWire);\n\n// Estado de sensores\nbool bmeOK = false;\nbool dsOK = false;\n\n// Variables\nfloat temperatura = NAN;\nfloat presion = NAN;\nfloat humedad = NAN;\nfloat temperaturaDS = NAN;\n\nfloat latitud = 0;\nfloat longitud = 0;\nfloat altitudGPS = 0;\n\nunsigned long ultimaLectura = 0;\nunsigned long ultimoLCD = 0;\n\nconst unsigned long INTERVALO_LECTURA = 2000;\nconst unsigned long INTERVALO_LCD = 3000;\n\nint pantalla = 0;\n\n// ======================================\n// CONFIGURACION INICIAL\n// ======================================\n\nvoid setup() {\n  Serial.begin(115200);\n  gpsSerial.begin(9600);\n\n  lcd.begin(16, 2);\n  lcd.clear();\n\n  lcd.setCursor(0, 0);\n  lcd.print(\"ESTRATOSAT-TELCO\");\n  lcd.setCursor(0, 1);\n  lcd.print(\"Iniciando...\");\n\n  Wire.begin();\n\n  bmeOK = bme.begin(0x76);\n\n  ds18b20.begin();\n  dsOK = (ds18b20.getDeviceCount() > 0);\n\n  delay(2000);\n  lcd.clear();\n\n  Serial.println(\"ESTRATOSAT-TELCO INICIADO\");\n}\n\n// ======================================\n// LECTURA DEL GPS\n// ======================================\n\nvoid leerGPS() {\n  while (gpsSerial.available()) {\n    gps.encode(gpsSerial.read());\n  }\n\n  if (gps.location.isValid()) {\n    latitud = gps.location.lat();\n    longitud = gps.location.lng();\n  }\n\n  if (gps.altitude.isValid()) {\n    altitudGPS = gps.altitude.meters();\n  }\n}\n\n// ======================================\n// LECTURA DE SENSORES\n// ======================================\n\nvoid leerSensores() {\n\n  if (bmeOK) {\n    temperatura = bme.readTemperature();\n    presion = bme.readPressure() / 100.0F;\n    humedad = bme.readHumidity();\n  }\n\n  if (dsOK) {\n    ds18b20.requestTemperatures();\n    float lectura = ds18b20.getTempCByIndex(0);\n\n    if (lectura != DEVICE_DISCONNECTED_C) {\n      temperaturaDS = lectura;\n    } else {\n      temperaturaDS = NAN;\n    }\n  }\n}\n\n// ======================================\n// ENVIO DE TELEMETRIA JSON\n// ======================================\n\nvoid enviarTelemetria() {\n\n  Serial.print(\"{\");\n\n  Serial.print(\"\"bme_ok\":\");\n  Serial.print(bmeOK ? \"true\" : \"false\");\n\n  Serial.print(\",\"temperature\":\");\n  if (bmeOK) Serial.print(temperatura, 2);\n  else Serial.print(\"null\");\n\n  Serial.print(\",\"pressure\":\");\n  if (bmeOK) Serial.print(presion, 2);\n  else Serial.print(\"null\");\n\n  Serial.print(\",\"humidity\":\");\n  if (bmeOK) Serial.print(humedad, 2);\n  else Serial.print(\"null\");\n\n  Serial.print(\",\"ds18b20_ok\":\");\n  Serial.print(dsOK ? \"true\" : \"false\");\n\n  Serial.print(\",\"ds18b20_temperature\":\");\n  if (!isnan(temperaturaDS)) Serial.print(temperaturaDS, 2);\n  else Serial.print(\"null\");\n\n  Serial.print(\",\"gps_fix\":\");\n  Serial.print(gps.location.isValid() ? \"true\" : \"false\");\n\n  Serial.print(\",\"satellites\":\");\n  if (gps.satellites.isValid())\n    Serial.print(gps.satellites.value());\n  else\n    Serial.print(\"null\");\n\n  Serial.print(\",\"latitude\":\");\n  if (gps.location.isValid()) Serial.print(latitud, 6);\n  else Serial.print(\"null\");\n\n  Serial.print(\",\"longitude\":\");\n  if (gps.location.isValid()) Serial.print(longitud, 6);\n  else Serial.print(\"null\");\n\n  Serial.print(\",\"altitude\":\");\n  if (gps.altitude.isValid()) Serial.print(altitudGPS, 2);\n  else Serial.print(\"null\");\n\n  Serial.println(\"}\");\n}\n\n// ======================================\n// PANTALLAS LCD\n// ======================================\n\nvoid actualizarLCD() {\n\n  lcd.clear();\n\n  switch (pantalla) {\n\n    case 0:\n      lcd.setCursor(0, 0);\n      lcd.print(\"ESTRATOSAT-TELCO\");\n      lcd.setCursor(0, 1);\n      lcd.print(\"Sistema activo\");\n      break;\n\n    case 1:\n      lcd.setCursor(0, 0);\n      lcd.print(\"Temp:\");\n      if (bmeOK) {\n        lcd.print(temperatura, 1);\n        lcd.print((char)223);\n        lcd.print(\"C\");\n      } else {\n        lcd.print(\"Sin BME280\");\n      }\n\n      lcd.setCursor(0, 1);\n      lcd.print(\"Hum:\");\n      if (bmeOK) {\n        lcd.print(humedad, 1);\n        lcd.print(\"%\");\n      } else {\n        lcd.print(\"No disponible\");\n      }\n      break;\n\n    case 2:\n      lcd.setCursor(0, 0);\n      lcd.print(\"Presion:\");\n      if (bmeOK) {\n        lcd.print(presion, 1);\n      } else {\n        lcd.print(\"Sin sensor\");\n      }\n\n      lcd.setCursor(0, 1);\n      lcd.print(\"Alt GPS:\");\n      if (gps.altitude.isValid()) {\n        lcd.print(altitudGPS, 0);\n        lcd.print(\"m\");\n      } else {\n        lcd.print(\"Sin GPS\");\n      }\n      break;\n\n    case 3:\n      lcd.setCursor(0, 0);\n      lcd.print(\"Latitud:\");\n      if (gps.location.isValid()) {\n        lcd.print(latitud, 4);\n      } else {\n        lcd.print(\"Buscando...\");\n      }\n\n      lcd.setCursor(0, 1);\n      lcd.print(\"Longitud:\");\n      if (gps.location.isValid()) {\n        lcd.print(longitud, 4);\n      } else {\n        lcd.print(\"Sin posicion\");\n      }\n      break;\n\n    case 4:\n      lcd.setCursor(0, 0);\n      lcd.print(\"DS18B20:\");\n      if (!isnan(temperaturaDS)) {\n        lcd.print(temperaturaDS, 1);\n        lcd.print((char)223);\n        lcd.print(\"C\");\n      } else {\n        lcd.print(\"Sin sensor\");\n      }\n\n      lcd.setCursor(0, 1);\n      lcd.print(\"Satelites:\");\n      if (gps.satellites.isValid()) {\n        lcd.print(gps.satellites.value());\n      } else {\n        lcd.print(\"--\");\n      }\n      break;\n  }\n\n  pantalla++;\n  if (pantalla > 4) pantalla = 0;\n}\n\n// ======================================\n// BUCLE PRINCIPAL\n// ======================================\n\nvoid loop() {\n\n  leerGPS();\n\n  unsigned long ahora = millis();\n\n  if (ahora - ultimaLectura >= INTERVALO_LECTURA) {\n    ultimaLectura = ahora;\n\n    leerSensores();\n    enviarTelemetria();\n  }\n\n  if (ahora - ultimoLCD >= INTERVALO_LCD) {\n    ultimoLCD = ahora;\n\n    actualizarLCD();\n  }\n}",
      "#!/usr/bin/env python3\nimport serial\nimport json\nimport time\nfrom datetime import datetime\n\n# =====================================\n# ESTRATOSAT-TELCO\n# Receptor de telemetria Arduino\n# Raspberry Pi 3 B+ - Kali Linux\n# =====================================\n\nPUERTO = \"/dev/ttyACM0\"\nBAUDIOS = 115200\nARCHIVO_LOG = \"/home/malware/estratosat/telemetria.jsonl\"\n\ndef guardar_datos(datos):\n    with open(ARCHIVO_LOG, \"a\", encoding=\"utf-8\") as archivo:\n        archivo.write(json.dumps(datos, ensure_ascii=False) + \"\\n\")\n\ndef mostrar_datos(datos):\n    print(\"\\n========== ESTRATOSAT-TELCO ==========\")\n    print(\"Fecha:\", datos[\"timestamp\"])\n    print(\"BME280:\")\n    print(\"  Temperatura:\", datos.get(\"temperature\"), \"C\")\n    print(\"  Presion:\", datos.get(\"pressure\"), \"hPa\")\n    print(\"  Humedad:\", datos.get(\"humidity\"), \"%\")\n    print(\"DS18B20:\")\n    print(\"  Temperatura:\", datos.get(\"ds18b20_temperature\"), \"C\")\n    print(\"GPS:\")\n    print(\"  Fix:\", datos.get(\"gps_fix\"))\n\n# Instalar dependencias:\n# sudo apt update\n# sudo apt install -y python3-serial\n# Comprobar Arduino conectado:\n# ls -l /dev/ttyACM*\n# El puerto suele ser /dev/ttyACM0\n\nser = serial.Serial(PUERTO, BAUDIOS, timeout=1)\ntime.sleep(2)\n\nprint(\"Esperando telemetria del Arduino...\")\n\nwhile True:\n    try:\n        linea = ser.readline().decode(\"utf-8\", errors=\"ignore\").strip()\n\n        if not linea:\n            continue\n\n        datos = json.loads(linea)\n        datos[\"timestamp\"] = datetime.now().isoformat()\n\n        mostrar_datos(datos)\n        guardar_datos(datos)\n\n    except json.JSONDecodeError:\n        print(\"Linea no valida:\", linea)\n    except Exception as e:\n        print(\"Error:\", e)\n\n    time.sleep(0.1)"
    ],
    "pdfUrl": "guia-4-programacion.pdf",
    "components": []
  },
  {
    "slug": "protocolo-lanzamiento",
    "title": "4.5 Protocolo de lanzamiento y recuperación",
    "description": "Checklist pre-lanzamiento, inflado, secuencia, monitoreo, recuperación y análisis.",
    "order": 5,
    "steps": [
      {
        "step": 1,
        "title": "Checklist pre-lanzamiento",
        "body": "Baterías cargadas, sellado, paracaídas, GPS con fix, prueba de enlace y permisos aeronáuticos."
      },
      {
        "step": 2,
        "title": "Inflado",
        "body": "Calcule la flotación neutra y el ascenso deseado; infle con helio en zona sin viento fuerte."
      },
      {
        "step": 3,
        "title": "Secuencia de lanzamiento",
        "body": "Confirme telemetría activa antes de soltar; registre hora y condiciones."
      },
      {
        "step": 4,
        "title": "Monitoreo",
        "body": "Siga altitud, posición y calidad de enlace (RSSI/SNR) en el dashboard."
      },
      {
        "step": 5,
        "title": "Recuperación",
        "body": "Use la última posición conocida; lleve gateway móvil y coordine al equipo."
      },
      {
        "step": 6,
        "title": "Análisis",
        "body": "Descargue los datos, compare con el simulador y documente lecciones aprendidas."
      }
    ],
    "code": [],
    "pdfUrl": "guia-5-lanzamiento.pdf",
    "components": []
  }
];

export const CREDITOS: Creditos = {
  "authors": [
    {
      "name": "Esteban Morales Aguilar"
    },
    {
      "name": "Darikson Felipe Pérez Rodríguez"
    }
  ],
  "program": "Especialización en Infraestructura y Seguridad de Redes",
  "university": "Universidad de Cundinamarca",
  "researchGroup": "CAI2272024210 / CTI-IIPA2026-G8",
  "teacher": "Jonathan Alejandro Nino Jaramillo",
  "year": 2026,
  "license": "Creative Commons BY-NC-SA 4.0",
  "references": [
    {
      "_id": "6aee769906d3582e107e687e",
      "citeKey": "abdelfettah2024",
      "topic": "lora",
      "apa": "Abdelfettah, R. (2024). Design and building of Lora based communication board for educational nanosatellite. IEEE Xplore."
    },
    {
      "_id": "6aee769906d3582e107e687f",
      "citeKey": "acercamos2022",
      "topic": "satelites",
      "apa": "Acercamos proyectos new space y STEAM a centros educativos de Barcelona. (2022). NTT Data Volunteering."
    },
    {
      "_id": "6aee769906d3582e107e6880",
      "citeKey": "anantachaisilp2020",
      "topic": "lora",
      "apa": "Anantachaisilp, P., et al. (2020). Store and forward CubeSat using LoRa technology and private LoRaWAN-server. Bench Exp."
    },
    {
      "_id": "6aee769a06d3582e107e68b2",
      "citeKey": "bringingspace2026",
      "topic": "satelites",
      "apa": "Bringing Space Engineering Down to Earth with a Fleet of Open-Source Educational CubeSats. (2026). RS-Online."
    },
    {
      "_id": "6aee769906d3582e107e6881",
      "citeKey": "carvalho2021",
      "topic": "doppler",
      "apa": "Carvalho, D., et al. (2021). Improving redundancy in LoRaWAN for mixed-criticality scenarios. IEEE Systems Journal, 15(4), 1-10."
    },
    {
      "_id": "6aee769906d3582e107e6882",
      "citeKey": "conde2024",
      "topic": "satelites",
      "apa": "Conde, S., et al. (2024). Minisatellite applied in the teaching of experimental sciences in different educational contexts. 2024 Multimedia University Engineering Conference (MECON)."
    },
    {
      "_id": "6aee769906d3582e107e6883",
      "citeKey": "contente2022",
      "topic": "satelites",
      "apa": "Contente, J., et al. (2022). STEM education and problem-solving in space science: A case study with CanSat. Education Sciences, 12(4), 1-15."
    },
    {
      "_id": "6aee769906d3582e107e6885",
      "citeKey": "doroshkin2019",
      "topic": "lora",
      "apa": "Doroshkin, A., et al. (2019). Experimental study of LoRa modulation immunity to Doppler effect in CubeSat radio communications. IEEE Access, 7, 100839-100850."
    },
    {
      "_id": "6aee769906d3582e107e6884",
      "citeKey": "diazmartinez2024",
      "topic": "satelites",
      "apa": "Díaz-Martínez, J. G., et al. (2024). CanSats-based learning: Nanosatellite competition and STEAM learning in Tamaulipas, Mexico. 2024 IEEE Global Engineering Education Conference (EDUCON)."
    },
    {
      "_id": "6aee769906d3582e107e6886",
      "citeKey": "fernandez2020",
      "topic": "lora",
      "apa": "Fernández, L., et al. (2020). Assessing LoRa for satellite-to-earth communications considering the impact of ionospheric scintillation. IEEE Access, 8, 1-12."
    },
    {
      "_id": "6aee769906d3582e107e6887",
      "citeKey": "gadre2024",
      "topic": "lora",
      "apa": "Gadre, A., et al. (2024). Adapting LoRa ground stations for low-latency imaging and inference from LoRa-enabled CubeSats. ACM Transactions on Sensor Networks, 20(3), 1-20."
    },
    {
      "_id": "6aee769906d3582e107e6888",
      "citeKey": "haxhibeqiri2018",
      "topic": "lora",
      "apa": "Haxhibeqiri, J., et al. (2018). A survey of LoRaWAN for IoT: From technology to application. Sensors, 18(11), 1-25."
    },
    {
      "_id": "6aee769906d3582e107e6889",
      "citeKey": "jung2024",
      "topic": "lora",
      "apa": "Jung, S., et al. (2024). LR-FHSS transceiver for direct-to-satellite IoT communications: Design, implementation, and verification. IEEE Open Journal of Vehicular Technology, 5, 1-12."
    },
    {
      "_id": "6aee769906d3582e107e688a",
      "citeKey": "krueger2024",
      "topic": "lora",
      "apa": "Krueger, J., et al. (2024). Testing next-generation telemetry using LoRaWAN on high-altitude balloons. 2024 Academic High Altitude Conference."
    },
    {
      "_id": "6aee769906d3582e107e688b",
      "citeKey": "liberati2009",
      "topic": "satelites",
      "apa": "Liberati, A., Altman, D. G., Tetzlaff, J., Mulrow, C., Gotzsche, P. C., Ioannidis, J. P., ... & Moher, D. (2009). The PRISMA statement for reporting systematic reviews and meta-analyses of studies that evaluate health care interventions: explanation and elaboration. PLoS Medicine, 6(7), e1000100."
    },
    {
      "_id": "6aee769906d3582e107e688c",
      "citeKey": "loraalliance2022",
      "topic": "lora",
      "apa": "LoRa Alliance. (2022). LoRaWAN specification (v1.0.4). LoRa Alliance."
    },
    {
      "_id": "6aee769906d3582e107e688d",
      "citeKey": "lorawanworkshop2024",
      "topic": "lora",
      "apa": "LoRaWAN-Workshop mit der Hochschule Rhein-Waal. (2024). SSG Xanten."
    },
    {
      "_id": "6aee769906d3582e107e688e",
      "citeKey": "mehdi2023",
      "topic": "lora",
      "apa": "Mehdi, S. Z. A., et al. (2023). LoRaWAN CubeSat with an adaptive data rate: An experimental analysis of path loss link margin. Aerospace, 10(11), 1-15."
    },
    {
      "_id": "6aee769906d3582e107e688f",
      "citeKey": "missiondesign2023",
      "topic": "satelites",
      "apa": "Mission Design of On-Orbit Educational Nanosatellite Platform using Radiation Hardened Raspberry Pi-based Digital Video Transmitter. (2023). IAF."
    },
    {
      "_id": "6aee769a06d3582e107e6890",
      "citeKey": "modelopropagacion2022",
      "topic": "lora",
      "apa": "Modelo para la estimacion de las perdidas de propagacion en redes WLAN operando en 2,4 ghz y 5,8 ghz. (2022). SciELO."
    },
    {
      "_id": "6aee769a06d3582e107e6891",
      "citeKey": "moher2009",
      "topic": "satelites",
      "apa": "Moher, D., Liberati, A., Tetzlaff, J., Altman, D. G., & PRISMA Group. (2009). Preferred reporting items for systematic reviews and meta-analyses: the PRISMA statement. PLoS Medicine, 6(7), e1000097."
    },
    {
      "_id": "6aee769a06d3582e107e6892",
      "citeKey": "moreira2020",
      "topic": "satelites",
      "apa": "Moreira, J., et al. (2020). CanSat pico-satellite building workshop as an effective tool for STEAM education, a case study. Field Study."
    },
    {
      "_id": "6aee769a06d3582e107e6893",
      "citeKey": "munozbarrera2025",
      "topic": "satelites",
      "apa": "Muñoz Barrera, A. (2025). El Modelo Educativo Digital Transmoderno MEDIT: una respuesta a la educacion del siglo 21. Universidad de Cundinamarca."
    },
    {
      "_id": "6aee769a06d3582e107e6894",
      "citeKey": "munozbarrera2026",
      "topic": "satelites",
      "apa": "Muñoz Barrera, A. (2026). Campo Multidimensional de Aprendizaje de Alta Calidad Translocal, Más Allá de la Universidad Tradicional. Plan Rectoral 2023-2027, Universidad de Cundinamarca."
    },
    {
      "_id": "6aee769a06d3582e107e6895",
      "citeKey": "newsoftware2018",
      "topic": "satelites",
      "apa": "New software to get you started with high-altitude ballooning. (2018). Raspberry Pi Foundation."
    },
    {
      "_id": "6aee769a06d3582e107e6896",
      "citeKey": "osipova2024",
      "topic": "lora",
      "apa": "Osipova, K., et al. (2024). Architecting CubeSat constellations for messaging service, Part I. Acta Astronautica, 215, 1-15."
    },
    {
      "_id": "6aee769a06d3582e107e6897",
      "citeKey": "osuorah2025",
      "topic": "seguridad",
      "apa": "Osuorah, J. C., et al. (2025). Vulnerabilities and layered security threats in LoRaWAN systems: A comprehensive survey. IEEE Access, 13, 1-20."
    },
    {
      "_id": "6aee769a06d3582e107e6898",
      "citeKey": "page2021",
      "topic": "satelites",
      "apa": "Page, M. J., McKenzie, J. E., Bossuyt, P. M., Boutron, I., Hoffmann, T. C., Mulrow, C. D., ... & Moher, D. (2021). The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, 372, n71."
    },
    {
      "_id": "6aee769a06d3582e107e6899",
      "citeKey": "parada2023",
      "topic": "lora",
      "apa": "Parada, R., et al. (2023). LoRa-based low-cost nanosatellite for emerging communication networks in complex scenarios. Aerospace, 10(9), 1-18."
    },
    {
      "_id": "6aee769a06d3582e107e689a",
      "citeKey": "paredes2023",
      "topic": "lora",
      "apa": "Paredes, W. D., et al. (2023). LoRa technology in flying ad hoc networks: A survey of challenges and open issues. Sensors, 23(5), 1-25."
    },
    {
      "_id": "6aee769a06d3582e107e689b",
      "citeKey": "pmi2021",
      "topic": "satelites",
      "apa": "Project Management Institute. (2021). Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK) (7.ª ed.). PMI."
    },
    {
      "_id": "6aee769a06d3582e107e689c",
      "citeKey": "prototipocansat2024",
      "topic": "satelites",
      "apa": "Prototipo de satélite CanSat: Un Enfoque Interdisciplinario en Educación STEM. (2024). Dialnet."
    },
    {
      "_id": "6aee769a06d3582e107e689d",
      "citeKey": "purnama2025",
      "topic": "lora",
      "apa": "Purnama, I., et al. (2025). Quality of services LoRaWAN satellite communication. Indonesian Journal of Electrical Engineering and Computer Science, 37(1), 1-10."
    },
    {
      "_id": "6aee769a06d3582e107e689e",
      "citeKey": "qadir2023",
      "topic": "seguridad",
      "apa": "Qadir, J., et al. (2023). Mitigating cyber attacks in LoRaWAN via lightweight secure key management scheme. IEEE Access, 11, 1-15."
    },
    {
      "_id": "6aee769a06d3582e107e689f",
      "citeKey": "raspberrypi2025",
      "topic": "satelites",
      "apa": "Raspberry Pi in the stratosphere. (2025). Raspberry Pi."
    },
    {
      "_id": "6aee769a06d3582e107e68a0",
      "citeKey": "roddy2021",
      "topic": "satelites",
      "apa": "Roddy, D. (2021). Satellite communications (5.ª ed.). McGraw-Hill."
    },
    {
      "_id": "6aee769a06d3582e107e68a1",
      "citeKey": "rolland2025",
      "topic": "seguridad",
      "apa": "Rolland, F., et al. (2025). Achieving reduced latency and energy efficiency in direct-to-satellite LoRaWAN communications. 2025 IEEE 21st International Conference on Factory Communication Systems (WFCS)."
    },
    {
      "_id": "6aee769a06d3582e107e68a2",
      "citeKey": "saeed2019",
      "topic": "lora",
      "apa": "Saeed, N., et al. (2019). CubeSat communications: Recent advances and future challenges. IEEE Communications Surveys & Tutorials, 21(3), 1-25."
    },
    {
      "_id": "6aee769a06d3582e107e68a3",
      "citeKey": "sanchez2019",
      "topic": "satelites",
      "apa": "Sánchez, C. (2019, 8 de febrero). Normas APA – 7ma (séptima) edición. Normas APA. https://normas-apa.org/"
    },
    {
      "_id": "6aee769a06d3582e107e68a4",
      "citeKey": "tanenbaum2021",
      "topic": "satelites",
      "apa": "Tanenbaum, A. S., & Wetherall, D. J. (2021). Computer networks (6.ª ed.). Pearson."
    },
    {
      "_id": "6aee769a06d3582e107e68a5",
      "citeKey": "temirbayev2025",
      "topic": "lora",
      "apa": "Temirbayev, A., et al. (2025). A comparative study of APRS and LoRaWAN for low-earth-orbit and IoT telemetry applications. Beethink AY3C."
    },
    {
      "_id": "6aee769a06d3582e107e68a6",
      "citeKey": "thiswork2024",
      "topic": "lora",
      "apa": "This work facilitates the introduction of LoRa technology and the LoRaWAN protocol. Reunir, UNIR."
    },
    {
      "_id": "6aee769a06d3582e107e68a7",
      "citeKey": "toe2026",
      "topic": "seguridad",
      "apa": "Toé, E., et al. (2026). Securing LoRaWAN in the AIoT era: A systematic mapping study and an MITRE-based threat matrix. IEEE Internet of Things Journal, 13(1), 1-15."
    },
    {
      "_id": "6aee769a06d3582e107e68a8",
      "citeKey": "ullah2022",
      "topic": "lora",
      "apa": "Ullah, M. A., et al. (2022). Analysis and simulation of LoRaWAN LR-FHSS for direct-to-satellite scenario. IEEE Wireless Communications Letters, 11(3), 1-5."
    },
    {
      "_id": "6aee769a06d3582e107e68a9",
      "citeKey": "ullah2024",
      "topic": "lora",
      "apa": "Ullah, M. A., et al. (2024). Understanding the limits of LoRa direct-to-satellite: The Doppler perspectives. IEEE Open Journal of the Communications Society, 5, 1-15."
    },
    {
      "_id": "6aee769a06d3582e107e68aa",
      "citeKey": "ullah2025",
      "topic": "doppler",
      "apa": "Ullah, M. A., et al. (2025). Extending the LoRa direct-to-satellite limits: Doppler shift pre-compensation. IEEE Open Journal of the Communications Society, 6, 1-12."
    },
    {
      "_id": "6aee769a06d3582e107e68ab",
      "citeKey": "aerocivil2022",
      "topic": "satelites",
      "apa": "Unidad Administrativa Especial de Aeronáutica Civil. (2022). Regulación del espacio aéreo colombiano para operaciones especiales. Aerocivil."
    },
    {
      "_id": "6aee769a06d3582e107e68ac",
      "citeKey": "ucundinamarca2026",
      "topic": "satelites",
      "apa": "Universidad de Cundinamarca. (2026). Hablando de Transmodernidad en Filbo 2026. Noticias UCundinamarca."
    },
    {
      "_id": "6aee769a06d3582e107e68ad",
      "citeKey": "ucundinamarca_lines",
      "topic": "satelites",
      "apa": "Universidad de Cundinamarca. (s.f.). Líneas translocales de investigación. https://www.ucundinamarca.edu.co/investigacion/index.php/la-universidad/lineas-translocales-de-investigacion"
    },
    {
      "_id": "6aee769a06d3582e107e68ae",
      "citeKey": "ucundinamarca_mision",
      "topic": "satelites",
      "apa": "Universidad de Cundinamarca. (s.f.). Misión y Visión. https://www.ucundinamarca.edu.co"
    },
    {
      "_id": "6aee769a06d3582e107e68af",
      "citeKey": "wang2024",
      "topic": "doppler",
      "apa": "Wang, C., et al. (2024). On cyber-physical fault resilience in data communication: A case from a LoRaWAN network systems design. ACM Transactions on Cyber-Physical Systems, 8(2), 1-20."
    },
    {
      "_id": "6aee769a06d3582e107e68b0",
      "citeKey": "yu2021",
      "topic": "lora",
      "apa": "Yu, X., et al. (2021). Automating reliable and fault-tolerant design of LoRa-based IoT networks. 2021 17th International Conference on Network and Service Management (CNSM)."
    },
    {
      "_id": "6aee769a06d3582e107e68b1",
      "citeKey": "zadorozhny2022",
      "topic": "doppler",
      "apa": "Zadorozhny, A., et al. (2022). First flight-testing of LoRa modulation in satellite radio communications in low-earth orbit. IEEE Access, 10, 1-10."
    }
  ]
};

export const REFERENCIAS: Referencia[] = [
  {
    "_id": "6aee769906d3582e107e687e",
    "citeKey": "abdelfettah2024",
    "topic": "lora",
    "apa": "Abdelfettah, R. (2024). Design and building of Lora based communication board for educational nanosatellite. IEEE Xplore."
  },
  {
    "_id": "6aee769906d3582e107e687f",
    "citeKey": "acercamos2022",
    "topic": "satelites",
    "apa": "Acercamos proyectos new space y STEAM a centros educativos de Barcelona. (2022). NTT Data Volunteering."
  },
  {
    "_id": "6aee769906d3582e107e6880",
    "citeKey": "anantachaisilp2020",
    "topic": "lora",
    "apa": "Anantachaisilp, P., et al. (2020). Store and forward CubeSat using LoRa technology and private LoRaWAN-server. Bench Exp."
  },
  {
    "_id": "6aee769a06d3582e107e68b2",
    "citeKey": "bringingspace2026",
    "topic": "satelites",
    "apa": "Bringing Space Engineering Down to Earth with a Fleet of Open-Source Educational CubeSats. (2026). RS-Online."
  },
  {
    "_id": "6aee769906d3582e107e6881",
    "citeKey": "carvalho2021",
    "topic": "doppler",
    "apa": "Carvalho, D., et al. (2021). Improving redundancy in LoRaWAN for mixed-criticality scenarios. IEEE Systems Journal, 15(4), 1-10."
  },
  {
    "_id": "6aee769906d3582e107e6882",
    "citeKey": "conde2024",
    "topic": "satelites",
    "apa": "Conde, S., et al. (2024). Minisatellite applied in the teaching of experimental sciences in different educational contexts. 2024 Multimedia University Engineering Conference (MECON)."
  },
  {
    "_id": "6aee769906d3582e107e6883",
    "citeKey": "contente2022",
    "topic": "satelites",
    "apa": "Contente, J., et al. (2022). STEM education and problem-solving in space science: A case study with CanSat. Education Sciences, 12(4), 1-15."
  },
  {
    "_id": "6aee769906d3582e107e6885",
    "citeKey": "doroshkin2019",
    "topic": "lora",
    "apa": "Doroshkin, A., et al. (2019). Experimental study of LoRa modulation immunity to Doppler effect in CubeSat radio communications. IEEE Access, 7, 100839-100850."
  },
  {
    "_id": "6aee769906d3582e107e6884",
    "citeKey": "diazmartinez2024",
    "topic": "satelites",
    "apa": "Díaz-Martínez, J. G., et al. (2024). CanSats-based learning: Nanosatellite competition and STEAM learning in Tamaulipas, Mexico. 2024 IEEE Global Engineering Education Conference (EDUCON)."
  },
  {
    "_id": "6aee769906d3582e107e6886",
    "citeKey": "fernandez2020",
    "topic": "lora",
    "apa": "Fernández, L., et al. (2020). Assessing LoRa for satellite-to-earth communications considering the impact of ionospheric scintillation. IEEE Access, 8, 1-12."
  },
  {
    "_id": "6aee769906d3582e107e6887",
    "citeKey": "gadre2024",
    "topic": "lora",
    "apa": "Gadre, A., et al. (2024). Adapting LoRa ground stations for low-latency imaging and inference from LoRa-enabled CubeSats. ACM Transactions on Sensor Networks, 20(3), 1-20."
  },
  {
    "_id": "6aee769906d3582e107e6888",
    "citeKey": "haxhibeqiri2018",
    "topic": "lora",
    "apa": "Haxhibeqiri, J., et al. (2018). A survey of LoRaWAN for IoT: From technology to application. Sensors, 18(11), 1-25."
  },
  {
    "_id": "6aee769906d3582e107e6889",
    "citeKey": "jung2024",
    "topic": "lora",
    "apa": "Jung, S., et al. (2024). LR-FHSS transceiver for direct-to-satellite IoT communications: Design, implementation, and verification. IEEE Open Journal of Vehicular Technology, 5, 1-12."
  },
  {
    "_id": "6aee769906d3582e107e688a",
    "citeKey": "krueger2024",
    "topic": "lora",
    "apa": "Krueger, J., et al. (2024). Testing next-generation telemetry using LoRaWAN on high-altitude balloons. 2024 Academic High Altitude Conference."
  },
  {
    "_id": "6aee769906d3582e107e688b",
    "citeKey": "liberati2009",
    "topic": "satelites",
    "apa": "Liberati, A., Altman, D. G., Tetzlaff, J., Mulrow, C., Gotzsche, P. C., Ioannidis, J. P., ... & Moher, D. (2009). The PRISMA statement for reporting systematic reviews and meta-analyses of studies that evaluate health care interventions: explanation and elaboration. PLoS Medicine, 6(7), e1000100."
  },
  {
    "_id": "6aee769906d3582e107e688c",
    "citeKey": "loraalliance2022",
    "topic": "lora",
    "apa": "LoRa Alliance. (2022). LoRaWAN specification (v1.0.4). LoRa Alliance."
  },
  {
    "_id": "6aee769906d3582e107e688d",
    "citeKey": "lorawanworkshop2024",
    "topic": "lora",
    "apa": "LoRaWAN-Workshop mit der Hochschule Rhein-Waal. (2024). SSG Xanten."
  },
  {
    "_id": "6aee769906d3582e107e688e",
    "citeKey": "mehdi2023",
    "topic": "lora",
    "apa": "Mehdi, S. Z. A., et al. (2023). LoRaWAN CubeSat with an adaptive data rate: An experimental analysis of path loss link margin. Aerospace, 10(11), 1-15."
  },
  {
    "_id": "6aee769906d3582e107e688f",
    "citeKey": "missiondesign2023",
    "topic": "satelites",
    "apa": "Mission Design of On-Orbit Educational Nanosatellite Platform using Radiation Hardened Raspberry Pi-based Digital Video Transmitter. (2023). IAF."
  },
  {
    "_id": "6aee769a06d3582e107e6890",
    "citeKey": "modelopropagacion2022",
    "topic": "lora",
    "apa": "Modelo para la estimacion de las perdidas de propagacion en redes WLAN operando en 2,4 ghz y 5,8 ghz. (2022). SciELO."
  },
  {
    "_id": "6aee769a06d3582e107e6891",
    "citeKey": "moher2009",
    "topic": "satelites",
    "apa": "Moher, D., Liberati, A., Tetzlaff, J., Altman, D. G., & PRISMA Group. (2009). Preferred reporting items for systematic reviews and meta-analyses: the PRISMA statement. PLoS Medicine, 6(7), e1000097."
  },
  {
    "_id": "6aee769a06d3582e107e6892",
    "citeKey": "moreira2020",
    "topic": "satelites",
    "apa": "Moreira, J., et al. (2020). CanSat pico-satellite building workshop as an effective tool for STEAM education, a case study. Field Study."
  },
  {
    "_id": "6aee769a06d3582e107e6893",
    "citeKey": "munozbarrera2025",
    "topic": "satelites",
    "apa": "Muñoz Barrera, A. (2025). El Modelo Educativo Digital Transmoderno MEDIT: una respuesta a la educacion del siglo 21. Universidad de Cundinamarca."
  },
  {
    "_id": "6aee769a06d3582e107e6894",
    "citeKey": "munozbarrera2026",
    "topic": "satelites",
    "apa": "Muñoz Barrera, A. (2026). Campo Multidimensional de Aprendizaje de Alta Calidad Translocal, Más Allá de la Universidad Tradicional. Plan Rectoral 2023-2027, Universidad de Cundinamarca."
  },
  {
    "_id": "6aee769a06d3582e107e6895",
    "citeKey": "newsoftware2018",
    "topic": "satelites",
    "apa": "New software to get you started with high-altitude ballooning. (2018). Raspberry Pi Foundation."
  },
  {
    "_id": "6aee769a06d3582e107e6896",
    "citeKey": "osipova2024",
    "topic": "lora",
    "apa": "Osipova, K., et al. (2024). Architecting CubeSat constellations for messaging service, Part I. Acta Astronautica, 215, 1-15."
  },
  {
    "_id": "6aee769a06d3582e107e6897",
    "citeKey": "osuorah2025",
    "topic": "seguridad",
    "apa": "Osuorah, J. C., et al. (2025). Vulnerabilities and layered security threats in LoRaWAN systems: A comprehensive survey. IEEE Access, 13, 1-20."
  },
  {
    "_id": "6aee769a06d3582e107e6898",
    "citeKey": "page2021",
    "topic": "satelites",
    "apa": "Page, M. J., McKenzie, J. E., Bossuyt, P. M., Boutron, I., Hoffmann, T. C., Mulrow, C. D., ... & Moher, D. (2021). The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, 372, n71."
  },
  {
    "_id": "6aee769a06d3582e107e6899",
    "citeKey": "parada2023",
    "topic": "lora",
    "apa": "Parada, R., et al. (2023). LoRa-based low-cost nanosatellite for emerging communication networks in complex scenarios. Aerospace, 10(9), 1-18."
  },
  {
    "_id": "6aee769a06d3582e107e689a",
    "citeKey": "paredes2023",
    "topic": "lora",
    "apa": "Paredes, W. D., et al. (2023). LoRa technology in flying ad hoc networks: A survey of challenges and open issues. Sensors, 23(5), 1-25."
  },
  {
    "_id": "6aee769a06d3582e107e689b",
    "citeKey": "pmi2021",
    "topic": "satelites",
    "apa": "Project Management Institute. (2021). Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK) (7.ª ed.). PMI."
  },
  {
    "_id": "6aee769a06d3582e107e689c",
    "citeKey": "prototipocansat2024",
    "topic": "satelites",
    "apa": "Prototipo de satélite CanSat: Un Enfoque Interdisciplinario en Educación STEM. (2024). Dialnet."
  },
  {
    "_id": "6aee769a06d3582e107e689d",
    "citeKey": "purnama2025",
    "topic": "lora",
    "apa": "Purnama, I., et al. (2025). Quality of services LoRaWAN satellite communication. Indonesian Journal of Electrical Engineering and Computer Science, 37(1), 1-10."
  },
  {
    "_id": "6aee769a06d3582e107e689e",
    "citeKey": "qadir2023",
    "topic": "seguridad",
    "apa": "Qadir, J., et al. (2023). Mitigating cyber attacks in LoRaWAN via lightweight secure key management scheme. IEEE Access, 11, 1-15."
  },
  {
    "_id": "6aee769a06d3582e107e689f",
    "citeKey": "raspberrypi2025",
    "topic": "satelites",
    "apa": "Raspberry Pi in the stratosphere. (2025). Raspberry Pi."
  },
  {
    "_id": "6aee769a06d3582e107e68a0",
    "citeKey": "roddy2021",
    "topic": "satelites",
    "apa": "Roddy, D. (2021). Satellite communications (5.ª ed.). McGraw-Hill."
  },
  {
    "_id": "6aee769a06d3582e107e68a1",
    "citeKey": "rolland2025",
    "topic": "seguridad",
    "apa": "Rolland, F., et al. (2025). Achieving reduced latency and energy efficiency in direct-to-satellite LoRaWAN communications. 2025 IEEE 21st International Conference on Factory Communication Systems (WFCS)."
  },
  {
    "_id": "6aee769a06d3582e107e68a2",
    "citeKey": "saeed2019",
    "topic": "lora",
    "apa": "Saeed, N., et al. (2019). CubeSat communications: Recent advances and future challenges. IEEE Communications Surveys & Tutorials, 21(3), 1-25."
  },
  {
    "_id": "6aee769a06d3582e107e68a3",
    "citeKey": "sanchez2019",
    "topic": "satelites",
    "apa": "Sánchez, C. (2019, 8 de febrero). Normas APA – 7ma (séptima) edición. Normas APA. https://normas-apa.org/"
  },
  {
    "_id": "6aee769a06d3582e107e68a4",
    "citeKey": "tanenbaum2021",
    "topic": "satelites",
    "apa": "Tanenbaum, A. S., & Wetherall, D. J. (2021). Computer networks (6.ª ed.). Pearson."
  },
  {
    "_id": "6aee769a06d3582e107e68a5",
    "citeKey": "temirbayev2025",
    "topic": "lora",
    "apa": "Temirbayev, A., et al. (2025). A comparative study of APRS and LoRaWAN for low-earth-orbit and IoT telemetry applications. Beethink AY3C."
  },
  {
    "_id": "6aee769a06d3582e107e68a6",
    "citeKey": "thiswork2024",
    "topic": "lora",
    "apa": "This work facilitates the introduction of LoRa technology and the LoRaWAN protocol. Reunir, UNIR."
  },
  {
    "_id": "6aee769a06d3582e107e68a7",
    "citeKey": "toe2026",
    "topic": "seguridad",
    "apa": "Toé, E., et al. (2026). Securing LoRaWAN in the AIoT era: A systematic mapping study and an MITRE-based threat matrix. IEEE Internet of Things Journal, 13(1), 1-15."
  },
  {
    "_id": "6aee769a06d3582e107e68a8",
    "citeKey": "ullah2022",
    "topic": "lora",
    "apa": "Ullah, M. A., et al. (2022). Analysis and simulation of LoRaWAN LR-FHSS for direct-to-satellite scenario. IEEE Wireless Communications Letters, 11(3), 1-5."
  },
  {
    "_id": "6aee769a06d3582e107e68a9",
    "citeKey": "ullah2024",
    "topic": "lora",
    "apa": "Ullah, M. A., et al. (2024). Understanding the limits of LoRa direct-to-satellite: The Doppler perspectives. IEEE Open Journal of the Communications Society, 5, 1-15."
  },
  {
    "_id": "6aee769a06d3582e107e68aa",
    "citeKey": "ullah2025",
    "topic": "doppler",
    "apa": "Ullah, M. A., et al. (2025). Extending the LoRa direct-to-satellite limits: Doppler shift pre-compensation. IEEE Open Journal of the Communications Society, 6, 1-12."
  },
  {
    "_id": "6aee769a06d3582e107e68ab",
    "citeKey": "aerocivil2022",
    "topic": "satelites",
    "apa": "Unidad Administrativa Especial de Aeronáutica Civil. (2022). Regulación del espacio aéreo colombiano para operaciones especiales. Aerocivil."
  },
  {
    "_id": "6aee769a06d3582e107e68ac",
    "citeKey": "ucundinamarca2026",
    "topic": "satelites",
    "apa": "Universidad de Cundinamarca. (2026). Hablando de Transmodernidad en Filbo 2026. Noticias UCundinamarca."
  },
  {
    "_id": "6aee769a06d3582e107e68ad",
    "citeKey": "ucundinamarca_lines",
    "topic": "satelites",
    "apa": "Universidad de Cundinamarca. (s.f.). Líneas translocales de investigación. https://www.ucundinamarca.edu.co/investigacion/index.php/la-universidad/lineas-translocales-de-investigacion"
  },
  {
    "_id": "6aee769a06d3582e107e68ae",
    "citeKey": "ucundinamarca_mision",
    "topic": "satelites",
    "apa": "Universidad de Cundinamarca. (s.f.). Misión y Visión. https://www.ucundinamarca.edu.co"
  },
  {
    "_id": "6aee769a06d3582e107e68af",
    "citeKey": "wang2024",
    "topic": "doppler",
    "apa": "Wang, C., et al. (2024). On cyber-physical fault resilience in data communication: A case from a LoRaWAN network systems design. ACM Transactions on Cyber-Physical Systems, 8(2), 1-20."
  },
  {
    "_id": "6aee769a06d3582e107e68b0",
    "citeKey": "yu2021",
    "topic": "lora",
    "apa": "Yu, X., et al. (2021). Automating reliable and fault-tolerant design of LoRa-based IoT networks. 2021 17th International Conference on Network and Service Management (CNSM)."
  },
  {
    "_id": "6aee769a06d3582e107e68b1",
    "citeKey": "zadorozhny2022",
    "topic": "doppler",
    "apa": "Zadorozhny, A., et al. (2022). First flight-testing of LoRa modulation in satellite radio communications in low-earth orbit. IEEE Access, 10, 1-10."
  }
];

/** Índice citeKey → referencia APA 7, para las fichas de cada sección. */
export const REF_BY_KEY: Record<string, Referencia> = Object.fromEntries(
  REFERENCIAS.map((r) => [r.citeKey, r]),
);
