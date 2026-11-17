import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { scorm } from './scorm';

/* Se intenta conectar antes del primer render; si la API del LMS aún no está,
   App reintenta durante unos segundos. */
scorm.connect();

/* Cierre ordenado de la sesión SCORM. */
const finish = () => scorm.finish();
window.addEventListener('pagehide', finish);
window.addEventListener('beforeunload', finish);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') scorm.commit();
});

/* Latido periódico para no perder el avance si el iframe se cierra de golpe. */
window.setInterval(() => scorm.commit(), 60_000);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
