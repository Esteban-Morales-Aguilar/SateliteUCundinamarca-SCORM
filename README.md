# SpaceNet Lab — ODC en SCORM 1.2

Objeto Digital de Conocimiento (ODC) de la **Universidad de Cundinamarca** empaquetado
como **SCORM 1.2** para importarlo en Moodle sin backend: el contenido, la telemetría
y el simulador viajan dentro del paquete y funcionan sin conexión.

- **Autores:** Esteban Morales Aguilar · Darikson Felipe Pérez Rodríguez
- **Programa:** Especialización en Infraestructura y Seguridad de Redes
- **Grupo de CTI:** CAI2272024210 / CTI-IIPA2026-G8
- **Licencia:** CC BY-NC-SA 4.0
- **Estructura:** un SCO (`index.html`) con 10 pantallas, sin evaluaciones
- **Tamaño:** ≈ 14 MB (incluye el video del despliegue, 11,3 MB)

## Contenido del recorrido

| # | Pantalla | Qué incluye |
| --- | --- | --- |
| 1 | Portada | Presentación, autores, licencia |
| 2 | Menú principal | Módulos, principios del MEDIT, estado del recorrido |
| 3 | Atmósfera | Perfil vertical, CubeSat/CanSat/HAB, globo real |
| 4 | LoRa y LoRaWAN | Capa física, clases, comparativa, Doppler y redundancia |
| 5 | Seguridad | AES-128, gestión de claves, ataques por capa |
| 6 | Misión | Reproducción de la telemetría real: KPIs, mapa y 6 gráficas |
| 7 | Simulador | Balance de enlace, cobertura, Doppler y recomendación SF/BW |
| 8 | Guías técnicas | 5 guías, presupuesto en COP, cableado, código, checklist |
| 9 | Video | Despliegue completo del ESTRATOSAT-TELCO |
| 10 | Créditos | Ficha de metadatos y 53 referencias APA 7 |

## Uso

```bash
npm ci
npm run dev        # desarrollo en http://localhost:5174
npm test           # 37 pruebas (wrapper SCORM + render de las 10 pantallas)
npm run build      # tsc + Vite + imsmanifest.xml + ZIP
```

| Salida | Qué es |
| --- | --- |
| `dist/` | Paquete descomprimido (para revisar o servir) |
| `release/satelitecundinamarca-odc-scorm12.zip` | Archivo listo para subir a Moodle |

`npm run snapshot` vuelve a congelar el contenido y la telemetría desde
`https://satelitecundinamarca.duckdns.org/api/v1` y reescribe `src/content.ts`.
El paquete ya incluye la instantánea, así que **no hace falta ejecutarlo** para compilar.

## Importar en Moodle

1. En el curso, active **Edición** y elija **Añadir una actividad o recurso → Paquete SCORM**.
2. En *Paquete* → **Subir un paquete**, suba
   `release/satelitecundinamarca-odc-scorm12.zip` y guarde.
3. En *Calificación* deje **Ninguna** (el ODC no tiene evaluación).
4. En *Apariencia* use **Mostrar incrustado** o **Ventana emergente**; el paquete
   ya está preparado para iframe.
5. Guarde y muestre el curso. El estado pasa de *Incompleto* a *Completado* al
   recorrer las diez pantallas.

### Seguimiento que reporta el SCO

| Elemento CMI | Uso |
| --- | --- |
| `cmi.core.lesson_status` | `incomplete` al entrar, `completed` al visitar las 10 pantallas |
| `cmi.core.lesson_location` | Última pantalla (`s01-portada` … `s10-creditos`) |
| `cmi.suspend_data` | Pantallas visitadas, con el prefijo `spacenet1\|` |
| `cmi.core.session_time` | Tiempo de la sesión (CMITimespan) |
| `cmi.core.exit` | `suspend` si no se completó, vacío al completar |

No se envían `cmi.core.score.*` porque la actividad no evalúa. Fuera de un LMS el
paquete funciona igual, pero no reporta nada (el módulo queda inerte).

## Estructura

```
index.html              entrada del SCO
src/
  main.tsx              arranque + cierre ordenado (pagehide/beforeunload)
  App.tsx               navegación, reanudación y completado
  scorm.ts              integración SCORM 1.2 (API, estado, suspend_data)
  screens.ts            las 10 pantallas y su lesson_location
  content.ts            instantánea generada del contenido y la telemetría
  screens/              una vista por pantalla
  ui/                   shell, gráficas SVG, mapa, diagramas, piezas comunes
  lib/link.ts           port del modelo de simulación (Friis, cobertura, Doppler)
  fonts/                Inter e IBM Plex Mono (subconjuntos latin y latin-ext)
public/                 video, imágenes y favicon
scripts/
  snapshot.mjs          genera src/content.ts desde el API del ODC
  build.mjs             build + imsmanifest.xml + ZIP
```

## Decisiones de diseño

- **Sin backend.** Contenido y telemetría son una instantánea del API real. El SCO
  nunca hace peticiones de red: funciona aunque el servidor del ODC no esté accesible.
- **Rutas relativas.** Moodle sirve el paquete desde `/pluginfile.php/.../index.html`,
  por eso `base: './'` y ninguna directiva `frame-ancestors`.
- **Gráficas y mapas en SVG propio.** Leaflet y las teselas de OpenStreetMap
  fallarían sin conexión.
- **Simulador portado a TypeScript.** `src/lib/link.ts` reproduce `link_budget.py`,
  `coverage.py`, `doppler.py` y `service.py`, así que los resultados coinciden con
  el sitio público.
- **Fuentes locales.** Inter e IBM Plex Mono empaquetadas; no se piden a Google Fonts.
- **Sin service worker.** El paquete no intercepta peticiones del LMS.
- **`imsmanifest.xml` generado en el build** con la lista real de archivos: nunca
  queda una entrada apuntando a un nombre con hash desactualizado.

## Verificación

```bash
npx tsc --noEmit
npm test
xmllint --noout dist/imsmanifest.xml
unzip -l release/satelitecundinamarca-odc-scorm12.zip
```

Las pruebas cubren el descubrimiento de la API en la cadena de ventanas, el arranque
en `incomplete`, la reanudación desde `lesson_location`, `suspend_data` idempotente,
`completed` al visitar las diez pantallas, el cierre con `LMSFinish` una sola vez y
el comportamiento inerte (sin excepciones) cuando no hay LMS.

## Créditos y licencia

Contenido bajo **Creative Commons Atribución-NoComercial-CompartirIgual 4.0
Internacional (CC BY-NC-SA 4.0)**. Puede copiarlo, adaptarlo y compartirlo citando
a los autores, sin fines comerciales y bajo la misma licencia.
<https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es>

Inter e IBM Plex Mono se distribuyen bajo la SIL Open Font License 1.1.
