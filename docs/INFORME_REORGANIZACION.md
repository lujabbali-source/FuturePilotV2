# Informe de reorganización — FuturePilot

Este documento resume el trabajo hecho en dos etapas sobre este repositorio:

1. **Reorganización arquitectónica** (seguridad, backend unificado, fuente única de datos).
2. **Interfaz premium del Globo + login/registro real + resultados completos** (integración de `futurepilot-globe/` al flujo principal).

Todos los commits quedaron separados y son revisables individualmente (`git log --oneline`). Nada de esto se pusheó a ningún remoto.

---

## Parte 1 — Reorganización arquitectónica

### Qué se eliminó

| Elemento | Por qué |
|---|---|
| `futurepilot-globe/FuturePilot/` | Copia accidental completa del repo (su propio `.git`, `.venv`, `node_modules`, `.env` duplicado), registrada como gitlink roto sin `.gitmodules`. Confirmado con el usuario antes de borrar. |
| `core/` (context.py, engine.py, parser.py, prompts.py) | Único motor que llamaba de verdad a OpenAI GPT-4.1. Reemplazado por decisión del usuario: `futurepilot-IA/` (rule-based) es ahora la base del desarrollo de IA. |
| `test_openai.py`, `OPENAI_API_KEY` en `.env` | Ya no hay ningún consumidor de OpenAI en el proyecto. |
| `Frontend/index.html`'s viejo `futurepilot-IA/index.html` | Harness de pruebas del autor original (su propio dashboard + globo vía CDN de Three.js), no enlazado desde ningún lado. |
| `venv/` (raíz) | Duplicado exacto de `.venv/` (mismas versiones de fastapi/uvicorn/pydantic). Se conservó `.venv/`. |
| `Frontend/ion` | Volcado accidental de `git config --list` con datos personales del usuario. |
| `gitignore` (sin punto), `terminal_cheatsheet.md - Acceso directo.lnk`, `Frontend/setup-futurepilot.ps1` (sembraba MongoDB, tecnología ya no usada), `countries-110m.json` duplicado de la raíz | Basura confirmada sin referencias. |
| `Frontend/questions.json`, `careers.json`, `roadmap.json` | Copias divergentes de los datos canónicos en `futurepilot-IA/data/`. |
| `.pyc` commiteados, `backend/main.py` | Ver abajo. |

### Qué se movió / unificó

- **Backend único**: `backend/main.py` (servía `Frontend/` + catálogo WHED) se retiró. Su funcionalidad quedó absorbida en `futurepilot-IA/app.py`, que ahora es el único proceso FastAPI (puerto 8000). `backend/` pasó a ser una librería de datos (`whed_catalog.py`, `import_whed.py`, `data/`) importada por `futurepilot-IA/app.py` — antes eran dos servidores compitiendo por el mismo puerto.
- **Fuente única de datos**: `futurepilot-IA/data/questions.json` y `careers.json` son ahora la única fuente. Se agregó `GET /api/v1/careers` (no existía). `Frontend/careers.html`, `assessment.js`, `flightplan.html` y `journey.html` se migraron a consumir la API en vez de copias locales/hardcodeadas.
- **`scripts/sync_frontend_data.py`** (nuevo): regenera `Frontend/questions-data.js` (el fallback para abrir el sitio con `file://`) desde el JSON canónico — ya no se edita a mano.

### Seguridad

- `.env` (con una `OPENAI_API_KEY` real) estaba **commiteado** en el único commit del repo. Se quitó del tracking y del `.gitignore` faltaba cubrirlo — corregido. **El archivo físico sigue en disco con la key real; recomiendo rotarla en el dashboard de OpenAI si todavía la usas para algo, y borrar el archivo si no.** Nunca se pusheó a ningún remoto (confirmado con `git ls-remote`), así que no está expuesta públicamente, pero sí estuvo sincronizada vía OneDrive.
- `.gitignore` extendido: `.env`, `__pycache__/`, `*.pyc`, `.venv/`, `venv/`, `node_modules/`, `dist/`, `backend/data/*.sqlite3`, memoria de usuario (`futurepilot-IA/data/users/*.json`).
- `backend/requirements.txt` reescrito en UTF-8 (estaba en UTF-16LE) sin `pymongo` (no usado, la app real usa `sqlite3`).

### Bugs reales encontrados y arreglados (no hipotéticos — confirmados con el navegador)

1. **`Frontend/careers.html` crasheaba siempre** (`ReferenceError: careers is not defined`) — nunca funcionó realmente contra datos reales.
2. **Assessment.html no cargaba sus scripts al servirse por HTTP** — todas las rutas relativas (`./assessment.js`, `./futurepilot-connector.js`, etc.) resolvían mal contra rutas como `/assessment`, dando 404 silenciosos. El test vocacional estaba efectivamente roto en producción (solo funcionaba abriendo el HTML directo con `file://`). Se corrigió con detección de `location.protocol` para elegir ruta relativa vs. `/Frontend/...` absoluta.
3. **`POST /api/v1/mentor/chat` crasheaba siempre** (500) — llamaba a `ai_system.mentor`, que no existía. Se implementó un `MentorEngine` real (rule-based, sin LLM externo).
4. Enlaces rotos a `/roadmaps` (plural) cuando la ruta real es `/roadmap` — corregidos en `index.html` y `roadmap.html`.
5. `flightplan.html`/`journey.html` tenían diccionarios hardcodeados de universidades/países/roadmap por carrera, con nombres que casi nunca coincidían con el catálogo real (ej. "Artificial Intelligence" vs. el real "Artificial Intelligence Specialist") — mostraban datos incorrectos o vacíos para la mayoría de resultados reales. Se quitaron; ahora esas secciones se llenan con la respuesta real de la IA (`futurepilot-connector.js`, que ya estaba diseñado para esto).

---

## Parte 2 — Globo premium + login real + resultados completos

### Flujo nuevo

```
Landing (/) → Test vocacional (/assessment) → Resultados parciales (teaser)
  → Registro/Login real → Resultados completos desbloqueados
  → Globo (/globe) → "Crear mi mapa personalizado" → /journey
```

### Backend — autenticación real (nuevo)

- **`backend/users_store.py`**: SQLite plano (mismo patrón que `whed_catalog.py`, sin ORM). Contraseñas con PBKDF2-SHA256 (stdlib `hashlib`, 600k iteraciones, salt aleatorio por usuario). Sesiones por token bearer — **se guarda solo el hash SHA-256 del token**, nunca el token en texto plano.
- Rutas nuevas: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`, `POST /api/v1/auth/logout`.
- **Corrección de seguridad real**: `POST /api/v1/mentor/chat` confiaba en un `user_id` enviado libremente por el cliente en el body para recuperar la memoria de un estudiante. Ahora el `user_id` se resuelve *siempre* del token de sesión validado en el servidor — un `user_id` en el body ya no tiene efecto.
- Token en `localStorage` (no cookies) — decisión deliberada: el frontend ya depende intensivamente de `localStorage` para todo lo demás, y evita tener que tocar `credentials`/CORS.

### Backend — `ai_engine.py`

`FuturePilotAIEcosystem.process_user_test` (la fachada que usa `app.py`) descartaba casi todo lo que `FuturePilotBrain` ya calculaba: `personality`, `learning_style`, `strengths`/`weaknesses`, `confidence`, `recommended_hubs`, `future_predictions`. Sin esto, no había datos para una vista de "resultados completos". Se completó el ensamblado de la respuesta (sin tocar el algoritmo de matching/scoring) y se generó una justificación propia por carrera en vez de repetir el mismo texto genérico en las 10.

### Frontend — `assessment.js`

Nuevos estados en la máquina de pantallas: `auth` (formulario real de registro/login) y `results` (vista completa: arquetipo, fortalezas, debilidades, las 10 carreras rankeadas con su propia justificación, CTA a `/globe`). Se corrigió además una condición de carrera real: `renderAnalysis()` llamaba a la IA sin esperar la respuesta (`setTimeout` fijo de 3.4s) — ahora espera la promesa real antes de avanzar.

### FuturePilot Globe — integrado, sin tocar su lógica interna

- **`futurepilot-globe/` sigue siendo su propio módulo** (su propio `package.json`, su propio build) — no se fusionó con `Frontend/`. Solo se monta su build de producción bajo `/globe` en el backend unificado.
- **Cero cambios** en render/cámara/selección de país-ciudad: `Earth.jsx`, `Atmosphere.jsx`, `GlobeBorders.jsx`, `CountryMeshes.jsx`, `CityMarkers.jsx`, `CameraController.jsx`, `useCity.js`, `*Service.js` — ningún archivo tocado.
- **Bug real encontrado antes de que llegara a producción**: `vite.config.js` no tenía `base`, así que el build (`dist/`) pedía sus assets en `/assets/...` (raíz absoluta). Montado bajo `/globe`, eso habría cargado una página en blanco sin JS/CSS. Se agregó `base: "/globe/"` y se regeneró el build — verificado que `/globe/assets/...` responde 200 en el servidor real, no solo en `npm run dev`.
- Chrome nuevo (100% fuera del `<Canvas>`): `TopNav.jsx` (marca + link "Volver a resultados" → `/assessment` + selector de idioma reubicado), hero con título/subtítulo, panel de sugerencia contextual, botón CTA "Crear mi mapa personalizado" → `/journey`. Paleta oficial (`globePalette.js`: fondo `#071827`, cian `#1DE9FF`, verde neón `#00F0B5`) reutilizada; `CityPanel.css` tenía su propia paleta casi-duplicada, sincronizada a mano contra la fuente real.

### Limitaciones conocidas (documentadas, no resueltas en esta pasada)

- **Dos motores de scoring en paralelo**: `Frontend/assessment-engine.js` (preview instantáneo del lado cliente) y `ai_engine.py` (resultado real del servidor) comparten la misma taxonomía de 8 clusters pero pueden rankear ligeramente distinto. La preview "parcial" es explícitamente provisional, así que no es grave, pero valdría unificar a futuro.
- **Panel de ciudad con datos ricos solo para Colombia** (22 ciudades). El resto de países de `americas/*.js` solo tiene universidades, sin `coordinates`, por lo que hoy ni siquiera aparecen como marcadores clicables en el globo. El panel ya maneja bien el estado "sin datos" — falta poblar más países, no es un bug.
- **`/api/universities` (catálogo WHED) está vacío** — no se ha corrido ningún import (`backend/import_whed.py`) todavía. `flightplan.html` muestra "Próximamente" en vez de datos inventados.
- El test se puede completar sin iniciar sesión (por diseño, según el flujo pedido); el resultado de esa corrida queda bajo el usuario anónimo `default_student`, no se re-asocia retroactivamente a la cuenta creada después.
- No hay rate-limiting en `/api/v1/auth/*` (fuera de alcance de esta tarea, recomendado para producción).

### Cómo correr todo

```bash
# Backend unificado (desde la raíz del repo)
.venv/Scripts/python.exe -m uvicorn app:app --app-dir futurepilot-IA --host 127.0.0.1 --port 8000

# Antes de exponer /globe, generar el build de producción del globo:
cd futurepilot-globe && npm install && npm run build
```

Para desarrollo activo del globo con hot-reload: `npm run dev` en `futurepilot-globe/` (puerto 5173/5174, ya permitido en CORS).

---

## Commits de esta sesión (en orden)

```
bc7fc7c Security cleanup and repo hygiene
668a53d Fix ReferenceError in Frontend/careers.html
6793cdc Unify backend into a single FastAPI app (futurepilot-IA/app.py)
d140815 Single source of truth for questions/careers + fix broken asset loading
95cde90 Add real authentication (register/login/sessions)
7db31db Complete process_user_test response with fields the facade dropped
88fc4cc Real login/register + full unlocked results in assessment.js
d147d04 Premium chrome around the globe, without touching its internal logic
7d4040d Mount FuturePilot Globe at /globe in the unified backend
```

Cada uno tiene su mensaje de commit detallado explicando el "por qué", no solo el "qué".
