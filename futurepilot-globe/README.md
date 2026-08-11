# FuturePilot Globe

Globo terráqueo 3D interactivo de FuturePilot. Es un módulo del repositorio principal, no una
aplicación independiente: el backend unificado (`futurepilot-IA/app.py`) sirve el resultado de
`npm run build` bajo la ruta `/globe`.

React 19 · Vite 8 · three.js vía `@react-three/fiber` · i18next (EN/ES)

## Qué hace

Renderiza la Tierra con topología GeoJSON y mallas por país. Al seleccionar un país la cámara vuela
a su centro y aparecen sus ciudades; al seleccionar una ciudad se abre un panel lateral con costos
de vida, universidades, becas y datos de empleo. Cada exploración se reporta al Pasaporte del
estudiante si hay sesión iniciada.

## Comandos

```bash
npm install
```

Desarrollo con hot reload en el puerto 5173. Requiere el backend levantado en el 8000: el proxy de
`vite.config.js` reenvía `/api` hacia allí, de modo que el código nunca necesita un host absoluto.

```bash
npm run dev
```

Build de producción a `dist/`. **Necesario después de cualquier cambio en `src/`**, porque el
backend sirve `dist/`, no el código fuente.

```bash
npm run build
```

```bash
npm run lint
```

## Estructura

```
src/
  App.jsx                  composición de la escena y estado de selección
  components/              Earth, Atmosphere, CityMarkers, GlobeBorders, TopNav, panels/
  geo/                     proyección esférica, triangulación, geometría de países
  services/                acceso a los datos de países/ciudades y reporte al Pasaporte
  database/countries/      datos curados a mano: Colombia (22 ciudades con detalle)
                           + 21 países de América (resumen)
  locales/{en,es}/         traducciones i18next
scripts/                   utilidades Python de importación de datos (uso puntual)
```

## Notas

- **`base: "/globe/"`** en `vite.config.js` es obligatorio. Sin eso, el `index.html` del build pide
  sus assets a la raíz del dominio y la página carga en blanco.
- **Los datos de países son módulos JS, no una base de datos.** Provienen de un documento Word
  curado a mano, importado con los scripts de `scripts/`. Si una ciudad no tiene universidades
  cargadas, se devuelve una lista vacía — nunca se inventan datos ni se consulta otra fuente.
- **Nada de hosts absolutos en `fetch`.** Rutas relativas siempre: en producción el globo comparte
  origen con la API, y en desarrollo el proxy se encarga.
