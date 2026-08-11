# FuturePilot — Documentación técnica y plan de mejora

> Auditoría completa del repositorio a fecha **11 de agosto de 2026**, rama `Futurepilot-Globe`.
> Este documento describe **qué hay**, **cómo fluye**, **qué está roto** y **en qué orden arreglarlo**.

> ### Estado de ejecución
>
> - ✅ **Fase 0 — Desbloquear producción: COMPLETADA.** Los 4 bloqueantes (B1-B4 parcial) corregidos
>   y verificados en navegador real. Ver §7.
> - ✅ **Fase 1 — Limpieza: COMPLETADA.** ~1.300 líneas de código muerto eliminadas, docs creadas.
> - ✅ **Integridad del resultado: COMPLETADA.** El resultado del test ya no puede perderse en el
>   punto de conversión. Ver §7.1.
> - ✅ **Fase 2 — Coherencia de producto: COMPLETADA.** Un solo veredicto (B4), catálogo de 73
>   carreras, escala de compatibilidad corregida, I2, I3, `QUESTION_COUNT` y las páginas que
>   dependían del dispositivo.
> - ⬜ Fases 3 y 4, pendientes.
>
> **Suite de tests: 53 pasan** (38 originales + 15 de regresión añadidos).
> El análisis de las secciones §1-§6 describe el estado **previo** a estas correcciones y se
> conserva como registro de la auditoría.

---

## 1. Resumen ejecutivo

FuturePilot es una plataforma de orientación vocacional para estudiantes. Un test de 50 preguntas
alimenta un motor de IA *rule-based* (sin LLM externo) que devuelve un perfil, carreras compatibles
y un roadmap; a partir de ahí el estudiante explora un globo 3D con países, ciudades y universidades
de América, y va acumulando sellos en un "Pasaporte".

**El estado real del proyecto es mejor de lo que sugiere su estructura.** El backend está bien
construido: FastAPI unificado, 45 endpoints, PBKDF2 a 600k iteraciones, tokens hasheados en BD,
rate limiting, CSP, protección contra enumeración de cuentas y path traversal. Una reorganización
previa (ver `docs/INFORME_REORGANIZACION.md`) ya eliminó la basura grave: copias del repo, `.env`
commiteado con una API key, servidores duplicados y datos divergentes.

El problema hoy **no es el backend, es el frontend**: son dos aplicaciones distintas conviviendo
(un sitio vanilla con `document.write` y una SPA React/Vite), con dos sistemas de i18n, dos motores
de scoring que dan resultados diferentes, y dos URLs de API hardcodeadas a `127.0.0.1:8000` que
**hacen imposible desplegar la aplicación fuera de la máquina local**.

Hay **4 bugs bloqueantes** y **6 bugs importantes** confirmados leyendo el código, no hipotéticos.
Ninguno requiere reescribir el proyecto. La recomendación es **no migrar de framework** ahora, sino
consolidar el frontend sobre el Vite que ya existe, de forma incremental.

### Cifras del proyecto

| Área | Archivos | Líneas | Estado |
|---|---:|---:|---|
| Backend Python (`futurepilot-IA/`, `backend/`, `tests/`) | 12 | 3.547 | Sólido |
| Frontend vanilla (`Frontend/` JS+HTML+CSS) | 43 | 9.665 | Frágil |
| Globo React (`futurepilot-globe/src/`) | 139 | ~1.150 (código) + 303 KB (datos) | Funcional, aislado |
| Módulo Node huérfano (`database/`) | 29 | 1.236 | **Código muerto** |

---

## 2. Inventario: qué contiene el proyecto

### 2.1 Módulos vivos

| Ruta | Qué es | Tecnología |
|---|---|---|
| `futurepilot-IA/app.py` | **Único servidor.** 45 endpoints + sirve todo el sitio estático | FastAPI + Uvicorn |
| `futurepilot-IA/ai_engine.py` | Motor cognitivo rule-based: percepción → perfil → razonamiento → decisión → roadmap. Incluye `MentorEngine` (chat) y memoria persistente por estudiante en JSON con file-locking | Python stdlib |
| `futurepilot-IA/data/` | **Fuente única de verdad**: `questions.json` (50), `careers.json` (73) | JSON |
| `backend/users_store.py` | Capa de datos SQLite: usuarios, sesiones, resets, resultados, pasaporte, auditoría admin | sqlite3 stdlib |
| `backend/rate_limiter.py`, `mailer.py`, `config_store.py` | Rate limiting en memoria, SMTP opcional, config JSON para Theme Lab y feature flags | stdlib |
| `Frontend/` | Sitio del estudiante: landing, test, carreras, journey, flightplan, pasaporte, login, legales | HTML/CSS/JS vanilla |
| `Frontend/admin/` | Panel de administración: dashboard, login, Theme Lab, System Health | HTML/CSS/JS vanilla |
| `futurepilot-globe/` | Globo 3D interactivo montado en `/globe` | React 19 + Vite 8 + three.js |
| `tests/` | 38 tests de integración sobre la API (auth, admin, assessment, mentor, pasaporte) | pytest |
| `scripts/sync_frontend_data.py` | Regenera `Frontend/questions-data.js` desde el JSON canónico | Python |

### 2.2 Bases de datos

- `backend/data/users.sqlite3` — **la base real** (usuarios, sesiones, resultados, pasaporte). 8 tablas.
- `futurepilot-globe/src/database/countries/**/*.js` — 72 archivos JS, 303 KB. Colombia (22 ciudades
  con detalle completo) + 21 países de América (solo resumen). Datos curados a mano desde un
  documento Word. **Se importan como módulos JS, no es una base de datos.**
- `database/data/futurepilot.sqlite` — base SQLite de un módulo Node que **nadie usa** (ver §5.3).
- `backend/data/whed.sqlite3` — resto de un catálogo externo (WHED) ya abandonado.

---

## 3. Flujo de la aplicación

### 3.1 Recorrido del estudiante

```
  /  (index.html)
  │   landing en inglés, i18n propio, nav dinámico según sesión
  ▼
  /assessment  ──── GET /api/v1/questions ────► questions.json (50 preguntas)
  │
  │   [50 preguntas, progreso guardado en localStorage]
  │   scoring LOCAL (assessment-engine.js) ──► "resultados parciales"
  │
  ├── POST /api/v1/assess (anónimo, con anon_id)
  │        └─► ai_engine: PerceptionEngine → ProfileEngine → ReasoningEngine
  │                       → DecisionEngine (coseno vs careers.json)
  │                       → RoadmapPlanner → ResponseBuilder
  │        └─► fila anónima en test_results, devuelve result_id
  ▼
  pantalla "unlock" ──► /login?mode=register
  │
  ├── POST /api/v1/auth/register|login ──► token bearer (30 días)
  ├── POST /api/v1/me/claim-result {result_id} ──► asocia el resultado a la cuenta
  │        └─► sella "test_completed" + "roadmap_created" en el Pasaporte
  ▼
  resultados completos (arquetipo, fortalezas, brechas, carreras con justificación)
  │
  ├──► /globe   (SPA React) ──► POST /api/v1/passport/events (country/city_explored)
  ├──► /passport ──── GET /api/v1/passport ──► perfil + sellos + actividad
  ├──► /journey y /flightplan ──► leen localStorage (no la API)
  └──► widget de chat ──── POST /api/v1/mentor/chat ──► MentorEngine + memoria
```

### 3.2 Recorrido del administrador

```
  /admin/login ──► POST /api/v1/auth/login
  │   (no hay cuentas admin separadas: es la cuenta de estudiante cuyo
  │    email coincide con ADMIN_EMAIL del .env; is_admin se re-sincroniza
  │    en cada login)
  ▼
  /admin ──── GET /api/v1/admin/me (403 si no es admin) ──► desbloquea el shell
  │      ──── GET /api/v1/admin/dashboard ──► métricas, top carreras/países
  ├──► /admin/theme-lab    ──► PUT/DELETE /api/v1/admin/theme (8 categorías de color)
  ├──► /admin/system-health ──► GET /api/v1/admin/health (9 chequeos reales)
  │                          ──► POST /api/v1/admin/repair/{reload-data|resync-admin}
  └──► feature flags        ──► PUT /api/v1/admin/flags/{key}
```

### 3.3 Modelo de identidad

Tres identidades conviven y esto es correcto por diseño:

1. **Anónimo con `anon_id`** — UUID en localStorage. Da a cada navegador su propio espacio de
   memoria de IA. Validado con regex estricta porque acaba siendo parte de un nombre de archivo.
2. **Sesión real** — token bearer de 32 bytes, hasheado con SHA-256 antes de guardarse, 30 días.
3. **Admin** — la misma sesión, con `is_admin` derivado de `ADMIN_EMAIL`.

El `user_id` **siempre** se resuelve del token en el servidor, nunca del payload del cliente.
Los sellos de alto valor (`test_completed`, `roadmap_created`, `ai_conversation`) solo se otorgan
desde el backend, en el momento en que realmente ocurren. Esto está bien hecho.

---

## 4. Funcionalidad por módulo

### 4.1 Motor de IA (`ai_engine.py`, 861 líneas)

Pipeline cognitivo en 7 etapas, sin dependencias externas:

| Etapa | Clase | Qué hace |
|---|---|---|
| Percepción | `PerceptionEngine` | Mapea `(question_index, answer_index)` → cluster + puntos |
| Perfilamiento | `ProfileEngine` | Vector de 8 clusters (ANALYTICAL, CREATIVE, SOCIAL, LEADERSHIP, TECHNICAL, SCIENTIFIC, PRACTICAL, ENTREPRENEURIAL) |
| Razonamiento | `ReasoningEngine` | Infiere arquetipo y estilo de aprendizaje; genera hipótesis |
| Decisión | `DecisionEngine` | Similitud coseno vector-estudiante ↔ requisitos de cada carrera |
| Carrera | `CareerEngine` | Hubs geográficos recomendados por categoría |
| Roadmap | `RoadmapPlanner` | Checkpoints a partir de las brechas detectadas |
| Aprendizaje | `LearningEngine` | Predicciones de crecimiento |

`MentorEngine` es un chat con detección de intención por palabras clave, memoria persistente por
estudiante (JSON + file lock) y personalización con nombre y metas del Pasaporte.

**Limitación honesta:** con solo **10 carreras** en `careers.json`, el ranking por coseno siempre
devuelve las mismas 3-5. La landing promete "100+ Career Paths".

### 4.2 Globo 3D (`futurepilot-globe/`)

React 19 + `@react-three/fiber` + three.js. Renderiza la Tierra con topología GeoJSON, mallas por
país, marcadores de ciudad, cámara animada al seleccionar y panel lateral con costos de vida,
universidades, becas y empleo. i18n con i18next (EN/ES). Reporta exploración al Pasaporte.

**Asimetría de datos:** solo Colombia tiene ciudades con detalle completo (22 ciudades). Los otros
21 países tienen resumen. `cityService.js` tiene esto hardcodeado con un `import.meta.glob` que
lista las 22 ciudades colombianas una por una.

### 4.3 Panel de administración

Cuatro páginas. Lo destacable: **System Health corre chequeos reales** (consulta a BD, autotest de
hashing PBKDF2, existencia de archivos, conteo de rutas), no estados inventados, y expone acciones
de reparación acotadas. El Theme Lab escribe overrides de color validados contra una lista blanca.
Todas las acciones quedan en `admin_audit_log`.

---

## 5. Hallazgos

### 5.1 Bloqueantes — impiden desplegar a producción

---

#### 🔴 B1 — Dos URLs de API hardcodeadas a `127.0.0.1:8000`

**Archivos:** [`Frontend/futurepilot-connector.js:12`](Frontend/futurepilot-connector.js:12),
[`futurepilot-globe/src/services/passportService.js:7`](futurepilot-globe/src/services/passportService.js:7)

```js
const API_URL = "http://127.0.0.1:8000";                                  // conector
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"; // globo
```

En cuanto el sitio se sirva desde cualquier dominio real, el navegador intentará hablar con la
máquina del propio usuario. Peor: la CSP declarada en `app.py:128` es `connect-src 'self'`, así que
el navegador **bloquea la petición** aunque el servidor existiera.

El resto del código ya usa rutas relativas (`assessment.js:196`, `assessment.js:342`). Es el mismo
origen. La corrección es borrar la constante y usar `/api/v1/...`.

**Impacto:** el envío del test y el registro de exploración del globo fallan en silencio fuera de
localhost. **Corrección: 10 minutos.**

---

#### 🔴 B2 — Saltar una pregunta se cuenta como "Totalmente de acuerdo"

**Archivo:** [`Frontend/futurepilot-connector.js:44-47`](Frontend/futurepilot-connector.js:44)

```js
const formattedAnswers = rawAnswers.map((ans, idx) => ({
  question_index: idx,
  answer_index: ans && ans.answerIndex !== undefined && ans.answerIndex !== null
    ? ans.answerIndex : 0      // ← null se convierte en 0
}));
```

El botón "Aún no lo sé" (`assessment.js:283`) guarda `answerIndex: null`. Aquí ese `null` se
convierte en `0`, y el índice 0 de cada pregunta es **"Strongly Agree", 4 puntos** — el máximo.

Un estudiante que salta 20 preguntas recibe 80 puntos que nunca dio. El scoring local
(`assessment-engine.js:54`) sí filtra los nulos correctamente, con lo cual los resultados parciales
y los completos divergen todavía más.

**Impacto:** corrompe el resultado del producto principal. **Corrección: 5 minutos** (filtrar en
lugar de sustituir; el backend ya ignora índices fuera de rango).

---

#### 🔴 B3 — El System Health del admin siempre reporta "error"

**Archivo:** [`futurepilot-IA/app.py:902`](futurepilot-IA/app.py:902)

```python
required = ["index.html", "assessment.html", "careers.html", "roadmap.html"]
```

`Frontend/roadmap.html` **fue eliminado** en la reorganización previa: `/roadmap` ahora es un
redirect 307 a `/journey` (`app.py:337`). El chequeo sigue exigiendo el archivo, devuelve `error`,
y como el estado global es el mínimo de todos (`app.py:933`), el panel muestra el sistema entero en
rojo permanentemente.

**Impacto:** la herramienta de diagnóstico miente; un fallo real quedaría enterrado en el ruido.
**Corrección: 1 línea.**

---

#### 🔴 B4 — Dos motores de scoring que dan carreras distintas

**Archivos:** [`Frontend/assessment-engine.js:4-13`](Frontend/assessment-engine.js:4) vs `futurepilot-IA/data/careers.json`

El frontend tiene un `careerMap` con **40 nombres de carrera hardcodeados** (Data Science,
Economics, Mathematics, Physics, Actuarial Science...). El backend tiene **10 carreras** con
vectores de requisitos reales. Son conjuntos casi disjuntos.

El estudiante ve primero los "resultados parciales" (motor local) que le prometen *Data Science*, y
después los "resultados completos" (motor real) que le dicen *Software Engineering*. Dos veredictos
distintos sobre su futuro en la misma sesión.

**Impacto:** rompe la credibilidad del producto en su momento clave. **Corrección: media jornada**
(derivar los parciales del vector de clusters y del catálogo real, o pedir el `/api/v1/assess`
antes de la pantalla parcial).

---

### 5.2 Importantes — no bloquean, pero deterioran el producto

---

#### 🟠 I1 — Idioma inconsistente: la app habla en dos idiomas a la vez

La landing (`index.html`) está en inglés con `data-i18n`. El test (`assessment.js`) está en
**español hardcodeado, sin una sola clave de i18n**: "Tu próximo capítulo", "Guardado
automáticamente", "Aún no lo sé". El globo usa i18next con EN/ES completos. Cambiar el idioma a
español traduce la landing pero no el globo... y el test nunca cambia porque nunca fue traducible.

Además hay **dos sistemas de i18n distintos**: `Frontend/i18n.js` (198 líneas, hecho a mano) e
i18next en el globo. Comparten la clave de localStorage `futurepilotLanguage`, que es lo único que
los mantiene sincronizados.

---

#### 🟠 I2 — El componente de debug del globo se ejecuta en producción

**Archivo:** [`futurepilot-globe/src/debug/Doctor.jsx:5`](futurepilot-globe/src/debug/Doctor.jsx:5)

```js
const ENABLE_DOCTOR = false;   // ← declarado y NUNCA leído en las 176 líneas restantes
```

`<Doctor />` está montado en el árbol de render (`App.jsx:142`) y vuelca el diagnóstico completo de
geometría por consola en cada carga, para cualquier visitante.

---

#### 🟠 I3 — Texto duplicado en la cabecera del globo

**Archivo:** [`futurepilot-globe/src/App.jsx:81-83`](futurepilot-globe/src/App.jsx:81)

```jsx
<p  className="globe-hero__eyebrow">{t("explore")}</p>
<h1 className="globe-hero__title">{t("explore")}</h1>   // ← misma clave
```

El eyebrow y el título muestran exactamente la misma frase.

---

#### 🟠 I4 — Tres convenciones distintas para la misma hoja de estilos

| Página | `href` |
|---|---|
| `index.html`, `privacy.html`, `terms.html` | `/Frontend/style.css` |
| `careers.html` | `/style.css` |
| `flightplan.html` | `style.css` (relativa) |

Las dos últimas solo funcionan porque `app.py:301` y `app.py:306` tienen rutas one-off
(`@app.get("/style.css")`, `@app.get("/futurepilot-logo.png")`) que existen únicamente para tapar
la inconsistencia. Cualquier despliegue bajo un subpath rompe `flightplan.html`.

---

#### 🟠 I5 — `document.write` para cargar todos los scripts

Las 14 páginas HTML cargan su JS con un bootstrap inline:

```js
var base = location.protocol === "file:" ? "./" : "/Frontend/";
["theme-loader.js", "i18n.js", ...].forEach(function (file) {
  document.write('<script src="' + base + file + '"><\/script>');
});
```

Consecuencias reales, no estéticas:
- **Bloquea el parser** en cada script; el navegador no puede precargar nada.
- **Obliga a `script-src 'unsafe-inline'`** en la CSP (`app.py:124`), que es exactamente lo que
  hace que un XSS sea explotable — y el token de sesión vive en `localStorage`.
- Hace el orden de carga frágil: `assessment.js` depende de `futurepilot-connector.js`, que se
  carga **después** en la lista (`assessment.html:37-38`).
- Es la razón por la que la app no puede tener bundling, tree-shaking ni cache-busting.

Todo esto existe para soportar abrir el sitio con `file://`, un caso de uso de desarrollo temprano
que ya no aplica: hay un servidor unificado y un `.claude/launch.json` que lo arranca.

---

#### 🟠 I6 — Dos logos, uno de ellos obsoleto y el otro sin versionar

- `Frontend/futurepilot-logo.png` (165 KB) — **versionado en git**, ya no lo usa ninguna página,
  pero `app.py:306` lo sigue sirviendo.
- `Frontend/futurepilot-logo-transparent.png` (159 KB) — **el que usan todas las páginas**, y está
  **sin trackear en git** (`??` en `git status`). Un clon limpio del repo se despliega sin logo.

---

### 5.3 Código muerto, duplicados y basura

| Elemento | Peso | Diagnóstico | Acción |
|---|---:|---|---|
| **`database/`** (raíz) | 29 archivos, 1.236 líneas | Capa Node+SQLite completa (connection, 8 repositorios, 8 queries, servicio, seed, schema, tests). **Verificado: ningún archivo fuera de `database/` la importa.** Los `package.json` scripts `db:init`/`db:seed`/`db:test` son sus únicos consumidores. El globo lee módulos JS directamente; el backend usa `backend/data/users.sqlite3`. | **Borrar** el directorio y los 3 scripts de `package.json` (queda vacío → borrar también `package.json` raíz) |
| `futurepilot-globe/temp_topology.json` | 37 KB | Archivo temporal, **versionado en git** | Borrar |
| `futurepilot-globe/validate_topology.py` | 392 B | Script de un solo uso que valida el temp anterior | Borrar |
| `futurepilot-globe/dev-escalated.log` | 647 B | Volcado de una sesión de `vite dev` | Borrar |
| `futurepilot-globe/src/services/database/` | 12 líneas + dirs vacíos | `databaseService.js` solo re-exporta `cityService`; contiene `Countries/Colombia/` **vacíos** | Borrar; usar `cityService`/`countryService` directamente |
| `futurepilot-globe/src/locales/{en,es}/{test,results,roadmap,login}.json` | 4 archivos ×2 | Namespaces registrados en `i18n.js:36` pero **ningún componente del globo los usa** (`useTranslation` solo pide `globe`, `common`, `cities`). Son traducciones de páginas que viven en `Frontend/` | Mover a la unificación de i18n (§7 Fase 2), no borrar el contenido |
| `desktop.ini` × 2 | — | Ruido de OneDrive, **versionado** pese a estar en `.gitignore` | `git rm --cached` |
| `futurepilot-globe/README.md` | — | Boilerplate literal de `create-vite`, no dice nada del proyecto | Reescribir |
| `backend/data/whed.sqlite3` | 32 KB | Resto del catálogo WHED abandonado (ver `docs/INFORME_REORGANIZACION.md`) | Borrar |
| `terminal_cheatsheet.md` | 5,6 KB | Notas personales de terminal, versionadas en la raíz del proyecto | Mover a `docs/` o fuera del repo |
| `.pytest_cache/`, `__pycache__/` | — | No versionados pero presentes en disco | Limpiar |
| **Sin `README.md` en la raíz** | — | No hay documento de arranque. `INFORME_REORGANIZACION.md` es un log histórico, no un README | Crear |
| `pytest` no está en `requirements.txt` | — | Los 38 tests no corren en una instalación limpia (el propio `.venv/` del repo no lo tiene) | Añadir `requirements-dev.txt` |

---

### 5.4 Deuda menor y observaciones

- **`localStorage` para el token de sesión** — expuesto a XSS. Aceptable hoy, pero es la razón por
  la que I5 (`unsafe-inline`) importa. Alternativa: cookie `HttpOnly` + `SameSite=Strict`, que
  obliga a añadir protección CSRF.
- **Rate limiter en memoria** — documentado como limitación conocida en el propio archivo. Con más
  de un worker de uvicorn deja de ser efectivo. Redis es el reemplazo, sin cambiar la interfaz.
- **`X-Forwarded-For` sin proxy de confianza** (`rate_limiter.py:48`) — falsificable si no hay un
  proxy propio que lo fije. También documentado en el código.
- **`POST /api/v1/assess` no envía el token** aunque haya sesión — el resultado se graba anónimo y
  se reclama después. Funciona, pero es un viaje de ida y vuelta innecesario.
- **`QUESTION_COUNT = 50` hardcodeado** (`assessment.js:7`) mientras las preguntas vienen de la API.
  Si el JSON cambia de tamaño, la barra de progreso miente.
- **`careers.json` con 10 carreras** frente al "100+ Career Paths" de la landing.
- **`journey.html` y `flightplan.html`** leen resultados de `localStorage`, no de `/api/v1/me/results`.
  Si el usuario cambia de dispositivo, esas páginas aparecen vacías pese a tener sesión.
- **`.env` en disco** — correctamente ignorado por git y nunca commiteado en esta rama. Sin acción.

---

## 6. ¿Hay que migrar de lenguaje o framework?

**Respuesta corta: no. Consolidar, no migrar.**

### Backend — mantener FastAPI

No hay ningún argumento técnico para moverlo. Es async, tipado con Pydantic, con OpenAPI
automático, 45 endpoints coherentes y 38 tests verdes. El motor de IA es Python puro sin
dependencias, lo que lo hace trivialmente desplegable. Cambiarlo sería trabajo puro sin beneficio.

Lo único que merece atención a futuro es **SQLite**: aguanta perfectamente el tráfico actual, pero
si el proyecto llega a varios workers concurrentes con escrituras frecuentes, la migración natural
es PostgreSQL. No ahora.

### Frontend — el problema real, y por qué la respuesta no es "reescribir en React"

Hoy hay dos frontends que no se hablan: un sitio vanilla con `document.write` y una SPA React.
Duplican i18n, estilos, navegación y lógica de sesión.

Evalué tres caminos:

| Opción | Coste | Riesgo | Veredicto |
|---|---|---|---|
| **A. Reescribir todo en Next.js/React SPA** | 3-6 semanas | Alto: se tira UI pulida y funcional; el test y el pasaporte hay que rehacerlos enteros; SSR no aporta nada a una app detrás de login | ❌ **No** |
| **B. Dejarlo como está y solo parchear bugs** | 2-3 días | La CSP sigue con `unsafe-inline`, la duplicación crece, cada página nueva repite el bootstrap | ⚠️ Insuficiente |
| **C. Consolidar sobre el Vite que ya existe, en modo multi-página** | 1-2 semanas, incremental | Bajo: cada página se migra por separado y se puede parar en cualquier punto | ✅ **Recomendado** |

**Por qué la opción C.** Vite soporta *multi-page apps* de forma nativa: se declaran varias entradas
en `rollupOptions.input` y cada HTML mantiene su identidad. Eso significa que las páginas actuales
**se conservan** — no se reescriben — pero ganan:

- `<script type="module">` en lugar de `document.write` → **se puede quitar `unsafe-inline` de la CSP**
- imports ES reales → se acaba la dependencia del orden de carga y de los globales `window.*`
- un solo i18next para el sitio **y** el globo → los `test.json` / `results.json` que hoy están
  huérfanos en el globo pasan a usarse de verdad
- bundling, minificación y hashes de contenido → cache correcto
- un solo `npm run build` y un solo `npm run dev`

Y sobre todo: **el globo deja de ser una isla**. Pasa a ser una ruta más del mismo build, con la
misma navegación, el mismo idioma y el mismo estado de sesión.

La migración es página por página. Empezando por `assessment` (la más compleja, ya modularizada en
`assessment-engine.js` / `question-types.js` / `assessment.js`), el resto es mecánico.

> Si más adelante el proyecto necesita SEO real en las páginas públicas (landing, carreras), ese es
> el momento de considerar Astro o Next — no antes, y solo para esas páginas.

---

## 7. Plan de mejora

Cinco fases. Las tres primeras son independientes entre sí y se pueden hacer en cualquier orden;
la 4 y la 5 dependen de la 3.

---

### ✅ Fase 0 — Desbloquear producción — COMPLETADA

| # | Tarea | Estado | Verificación realizada |
|---|---|---|---|
| 0.1 | `API_URL` hardcodeada eliminada, rutas relativas | ✅ | En navegador: el test envía a `/api/v1/assess`, sin host absoluto |
| 0.2 | `API_BASE_URL` del globo eliminada + proxy de Vite para dev | ✅ | `grep` sobre `dist/`: cero ocurrencias de `127.0.0.1:8000` |
| 0.3 | Respuestas saltadas se omiten en vez de mandarse como `answer_index: 0` | ✅ | En navegador: 10 respondidas + 40 saltadas → payload de 10, índices originales preservados |
| 0.4 | `roadmap.html` fuera de `_check_frontend_pages` | ✅ | Test nuevo exige `frontend`/`login`/`static_assets` en `ok` |
| 0.5 | `futurepilot-logo-transparent.png` versionado | ✅ | `git add` |

**Efecto lateral necesario:** al quitar `API_URL` se hizo evidente que las rutas one-off
`@app.get("/style.css")` y `@app.get("/futurepilot-logo.png")` solo existían para tapar la
inconsistencia I4. Se eliminaron ambas y se unificaron `careers.html` y `flightplan.html` a
`/Frontend/style.css` — con lo que **I4 queda resuelto también**.

**Tests de regresión añadidos (3):**
- `test_skipped_questions_are_omitted_not_scored_as_max` — fija el contrato del que depende 0.3.
- `test_out_of_range_answer_index_is_ignored_not_fatal` — el servidor no rompe con índices inválidos.
- `test_system_health_checks_only_reference_existing_pages` — el test anterior aceptaba `error`
  como válido, que es exactamente por lo que B3 pasó desapercibido.

---

### ✅ Fase 1 — Limpieza — COMPLETADA

| Acción | Estado |
|---|---|
| `database/` borrado (29 archivos, 1.236 líneas) + `package.json` raíz (solo tenía sus scripts) | ✅ |
| `temp_topology.json`, `validate_topology.py`, `dev-escalated.log`, `src/services/database/`, `backend/data/whed.sqlite3` borrados | ✅ |
| Dos `desktop.ini` sacados del control de versiones (`git rm --cached`) | ✅ |
| `futurepilot-logo.png` borrado junto con su ruta en `app.py` | ✅ |
| `README.md` raíz creado (arranque, configuración, estructura, notas) | ✅ |
| `terminal_cheatsheet.md` e `INFORME_REORGANIZACION.md` movidos a `docs/` | ✅ |
| `futurepilot-globe/README.md` reescrito (era el boilerplate literal de Vite) | ✅ |
| `requirements-dev.txt` creado con `pytest` + `httpx` | ✅ |
| `.gitignore`: `+.pytest_cache/`, `+*.log`, `−database/data/*` (ya no existe) | ✅ |

*Criterio de aceptación cumplido: 41 tests verdes, sitio y globo cargan y funcionan igual.*

---

### ✅ 7.1 Integridad del resultado — COMPLETADA

El resultado del test se calcula **antes** de que exista una cuenta y `result_id`, en
`localStorage`, era el único puntero hacia él. Las dos llamadas que lo reclamaban borraban ese
puntero fuera del `try/catch` y sin comprobar `response.ok`: cualquier fallo de red dejaba el
resultado huérfano en la base de datos y devolvía al estudiante a la pantalla de bienvenida del
test que acababa de terminar.

| Cambio | Archivo |
|---|---|
| `claim_test_result` distingue cuatro casos (`claimed` / `already_owned` / `owned_by_other` / `not_found`) en lugar de un booleano, dentro de una sola transacción | [`users_store.py:384`](backend/users_store.py:384) |
| El endpoint trata `already_owned` como **éxito**: reintentar un claim que sí funcionó ya no devuelve 404 | [`app.py:575`](futurepilot-IA/app.py:575) |
| Los eventos del Pasaporte se guardan con `has_passport_event`, así el reintento no duplica la actividad reciente | [`app.py:604`](futurepilot-IA/app.py:604) |
| **Una sola** implementación del claim, compartida por `login.js` y `assessment.js`. El puntero solo se suelta con un 2xx confirmado | [`result-claim.js`](Frontend/result-claim.js) |
| UI de reintento en `/login` en lugar de fallo silencioso, con copy distinto según registro o inicio de sesión | [`login.js`](Frontend/login.js) |
| Red de seguridad: `/assessment` reintenta al cargar cualquier vinculación pendiente | [`assessment.js`](Frontend/assessment.js) |
| `/api/v1/assess` recibe el bearer si hay sesión, así el resultado **nace** con dueño y no hay nada que perder | [`futurepilot-connector.js`](Frontend/futurepilot-connector.js) |

**El error que evitó este diseño.** La corrección obvia —conservar `result_id` cuando el claim
falla y reintentar— habría creado un bucle infinito. `claim_test_result` filtraba por
`WHERE user_id IS NULL`, así que si el `UPDATE` se confirmaba pero la respuesta se perdía, el
reintento recibía 404 permanentemente sobre un resultado que **sí** estaba correctamente
vinculado. Hacer el claim idempotente era requisito previo de cualquier lógica de reintento.

**Verificado en navegador**, no solo con tests: fallo de red y 500 conservan el puntero; el
reintento lo vincula y solo entonces lo libera; la respuesta perdida devuelve éxito sin duplicar
la actividad; un resultado ajeno se descarta sin bucle; con sesión activa el resultado nace ya
asociado sin pasar por el claim.

**3 tests nuevos:** `test_claim_result_is_idempotent_for_the_same_account`,
`test_claim_retry_does_not_duplicate_passport_activity`,
`test_assess_with_token_owns_the_result_immediately`.

---

### 🎯 Fase 2 — Coherencia de producto

#### ✅ B4 — Un solo veredicto — COMPLETADO

El estudiante recibía dos respuestas incompatibles con minutos de diferencia: la pantalla parcial
salía de un `careerMap` hardcodeado en el navegador y la completa del motor real. De las 39
carreras del frontend y las 10 del backend, **solo 4 coincidían**.

| Cambio | Detalle |
|---|---|
| `careerMap` eliminado de `assessment-engine.js` | El motor local conserva lo que sí puede afirmar (clusters, nivel académico, estilo de aprendizaje) y deja de nombrar carreras |
| La pantalla parcial lee `aiResult` | Es una vista recortada del **mismo** resultado, no un segundo cálculo. `renderAnalysis` ya esperaba la respuesta real; simplemente se ignoraba |
| `selectedCareer` en `localStorage` | Guarda la carrera real (lo consumen `/journey` y `/flightplan`) |
| Copy reescrito | Ya no promete que el resultado cambiará: enumera lo que se **desbloquea** (justificaciones, brechas, roadmap, universidades) |
| Sin analisis del servidor, no se inventan carreras | Se muestran las dimensiones dominantes del perfil y un botón de reintento. Antes caía al catálogo paralelo |

#### ✅ Catálogo ampliado — COMPLETADO

**De 10 a 73 carreras**, en 14 categorías, con vectores de requisitos escritos con contraste real
(rango 2,5–9,5 en vez de 5,0–9,5). Los ids `c1`–`c10` se conservan intactos porque
`test_results.top_career_id` ya los referencia.

El catálogo absorbe las 39 carreras que solo existían en el frontend, así que ninguna de las que el
estudiante podía ver antes desapareció.

Antes el coseno devolvía casi la misma lista para cualquier perfil. Ahora discrimina:

| Perfil | Top-3 | Rango del ranking |
|---|---|---|
| Técnico / analítico | Computer Science · Cybersecurity · Statistics | 70,6 % → 31,0 % |
| Social / creativo | Creative Writing · UX/UI Design · Graphic Design | 73,8 % → 32,5 % |

**Hallazgo al ampliar:** `run_cognitive_cycle` devolvía `ranked_matches` **entero**. Con 10 carreras
pasaba desapercibido; con 73 significaba mandar las 73 fichas con su justificación generada en cada
`/api/v1/assess`, guardarlas en `results_json` y pintarlas todas en la pantalla de resultados. Se
recorta en el origen con `TOP_MATCHES_RETURNED = 8`.

**La cifra de la landing ya no se escribe a mano.** Decía «100+» con 10 carreras en el catálogo;
ahora sale de `/api/v1/careers`, así que no puede volver a desfasarse.

**5 tests nuevos:** integridad del catálogo, ids originales preservados, perfiles opuestos con
recomendaciones distintas, recomendaciones siempre dentro del catálogo, y respuesta recortada.

#### ✅ Escala de compatibilidad corregida — COMPLETADO

El coseno sin centrar no solo comprimía: estaba **invertido**.

| Perfil del estudiante | Antes (coseno) | Ahora (coseno centrado) |
|---|---|---|
| **Plano** — responde igual a todo, sin ninguna inclinación | 98,7 % con una carrera arbitraria | 50,0 % (= sin relación) |
| **Muy definido** — dos clusters al máximo | 70,6 % como mucho | 89,7 % |

Cuanto más claro era el estudiante, peor puntuaba; y a quien no había mostrado ninguna preferencia
se le presentaba una carrera cualquiera como un 98 % de compatibilidad. Restar la media de cada
vector antes del coseno (correlación de Pearson) mide si los picos y valles **coinciden**, que es
lo que se quería medir desde el principio. La escala mostrada mapea `[-1, 1] → [0, 100]`: 100 es
coincidencia de forma, 50 es sin relación, 0 es opuesto.

**La confianza también estaba mal:** solo medía cuántas preguntas se habían respondido, así que un
perfil plano con las 50 contestadas declaraba un 95 % de confianza. Ahora pesa también cuánta señal
trae el perfil (`ProfileEngine.profile_definition`): 70 % para un perfil plano, 96 % para uno
definido.

#### ✅ Resto de la fase — COMPLETADO

| Ítem | Qué se hizo |
|---|---|
| **I2 · `Doctor` del globo** | `ENABLE_DOCTOR` se declaraba y nunca se leía; el diagnóstico completo se volcaba por consola en cada carga de `/globe`. Ahora se honra la bandera **y** se exige `import.meta.env.DEV`, para que un build de producción no pueda ejecutarlo. Verificado: cero logs en consola |
| **I3 · Título duplicado** | El eyebrow usaba `t("explore")`, la misma clave que el título. Clave `eyebrow` propia en EN y ES |
| **`QUESTION_COUNT`** | Sustituido por `questionCount()` = `questions.length`. No era solo la barra de progreso: **decidía cuándo termina el test**. Con 45 preguntas no habría terminado nunca; con 60 se habría cortado en la 50. También se derivan las 5 fases y el «50 preguntas» de la bienvenida |
| **journey y flightplan** | El conector refresca desde `/api/v1/me/results` antes de hidratar. Pinta primero lo local (sin esperar red) y repinta con lo de la cuenta. Verificado con `localStorage` vacío y solo el token: ambas páginas se rellenan |

**Tres bugs encontrados al verificar, no previstos en la auditoría:**

1. **`#countries` en `/flightplan` se quedaba en «Loading...» para siempre.** El conector leía
   `topChoice.recommended_hubs`, pero `recommended_hubs` cuelga de la raíz de la respuesta.
2. **`skill_gaps` devolvía todas las brechas.** Para un perfil marcado son 6 de los 8 clusters, y la
   justificación acababa con media lista de carencias. Recortado a las 3 mayores.
3. **`get_recommended_hubs` recomendaba Silicon Valley para Creative Writing.** Cubría 3 categorías
   de las 14 del catálogo y para el resto caía a los tres primeros hubs de la lista. Ampliado a las
   14 categorías y eliminado el fallback engañoso; un test detecta cualquier categoría sin hub.

**Nota sobre `mathLevel` / `englishLevel`:** los calcula el motor local y nunca llegan al servidor,
así que en otro dispositivo no existen. `/flightplan` muestra el estilo de aprendizaje (que sí está
en la cuenta) en vez de dejar el «Loading...» colgado. Persistirlos requeriría añadirlos al payload
de `/api/v1/assess`.

---

### 🏗️ Fase 3 — Consolidación del frontend sobre Vite (1-2 semanas, incremental)

Esta es la fase que resuelve el problema estructural. **Se hace página por página y se puede
detener en cualquier punto sin dejar el proyecto roto.**

**3.1 — Preparar el terreno (1 día)**
- Mover el `vite.config.js` del globo a la raíz, configurado como multi-página.
- Declarar como entradas las páginas actuales de `Frontend/` más el globo.
- Ajustar `app.py` para servir un único `dist/`.
- Verificar que todo sigue funcionando **antes de migrar una sola página**.

**3.2 — Migrar página por página (orden sugerido)**

| Orden | Página | Por qué en este orden |
|---|---|---|
| 1 | `assessment` | La más compleja; ya está modularizada, así que valida el enfoque |
| 2 | `login` / `reset-password` | Comparten CSS y lógica de sesión |
| 3 | `passport` | Consume la API, poco HTML estático |
| 4 | `journey` / `flightplan` | Tienen JS inline pesado que hay que extraer igualmente |
| 5 | `index` / `careers` / legales | Casi estáticas, las más fáciles |
| 6 | `admin/*` | Aisladas, sin prisa |

Cada página migrada: `<script type="module" src="...">` en lugar de `document.write`, imports ES en
lugar de globales `window.*`.

**3.3 — Cerrar la CSP**
Cuando no quede ningún script inline: quitar `'unsafe-inline'` de `script-src` en `app.py:124`.
Este es el entregable de seguridad más valioso de todo el plan.

**3.4 — Un solo i18n**
i18next para todo. Los namespaces `test`, `results`, `roadmap`, `login` que hoy están huérfanos en
el globo pasan a usarse. **Traducir el test**, que hoy es español hardcodeado sin ninguna clave.
Borrar `Frontend/i18n.js` (198 líneas).

---

### 🚀 Fase 4 — Preparación para producción real (según despliegue)

- Configurar SMTP real (`mailer.py` ya está listo, solo faltan las variables).
- Reemplazar el rate limiter en memoria por Redis si hay más de un worker.
- Fijar `CORS_ORIGINS` al dominio real.
- Decidir sobre el token: mantener `localStorage` (aceptable una vez cerrada la CSP) o pasar a
  cookie `HttpOnly` + CSRF.
- Mover `users.sqlite3` a un disco persistente vía `USERS_DB_PATH` (la variable ya existe).
- Evaluar PostgreSQL solo si la concurrencia lo exige.
- Completar los datos de ciudades para los 21 países de América que hoy solo tienen resumen.

---

## 8. Orden de ataque recomendado

```
Fase 0 (1 día)      ████  ← empezar aquí, desbloquea el despliegue
Fase 1 (medio día)  ██    ← reduce el ruido antes de tocar nada estructural
Fase 2 (2-3 días)   ████████
Fase 3 (1-2 sem)    ████████████████████████  ← incremental, parable en cualquier punto
Fase 4 (variable)   ████████
```

**Mi recomendación para la primera sesión de desarrollo:** Fase 0 completa más Fase 1. Son ~1,5 días
de trabajo, eliminan 4 bugs que hoy impiden desplegar, quitan ~1.300 líneas de código muerto y
dejan el repositorio en un estado en el que la Fase 3 se puede planificar con confianza.

---

## 9. Lo que está bien y no hay que tocar

Merece decirse explícitamente, porque un plan de mejora que solo enumera problemas da una impresión
falsa del proyecto:

- **La autenticación es correcta.** PBKDF2-SHA256 a 600.000 iteraciones (recomendación OWASP), sal
  por usuario, tokens de 32 bytes hasheados con SHA-256 antes de tocar disco, expiración de 30 días
  con limpieza automática, respuesta genérica en "olvidé mi contraseña" para evitar enumeración de
  cuentas, y rate limiting en las tres rutas sensibles.
- **La resolución de identidad es correcta.** El `user_id` nunca viene del cliente. El `anon_id` se
  valida con regex estricta precisamente porque acaba en un nombre de archivo — hay un comentario en
  `app.py:997` explicando el path traversal que evita.
- **Los sellos del Pasaporte no se pueden falsificar.** `PASSPORT_CLIENT_EVENT_TYPES` limita
  deliberadamente lo que el frontend puede reportar; los sellos de valor se otorgan en el servidor.
- **System Health corre chequeos reales**, incluido un autotest de hashing, y las acciones de
  reparación están acotadas a lo seguro (hay un comentario explicando por qué no existe un
  "reiniciar servidor").
- **Los comentarios del código explican el *porqué*, no el *qué*.** Es el mejor activo del
  repositorio: cada decisión no obvia tiene su justificación escrita al lado.
- **38 tests de integración verdes** cubriendo auth, admin, assessment, mentor y pasaporte.
