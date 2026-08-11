# FuturePilot

Plataforma de orientación vocacional para estudiantes. Un test de 50 preguntas alimenta un motor de
IA *rule-based* (sin dependencia de ningún LLM externo) que devuelve un perfil, carreras compatibles
y un roadmap personalizado. A partir de ahí el estudiante explora un globo 3D con países, ciudades y
universidades de América, acumulando sellos en su Pasaporte.

---

## Arranque rápido

Hacen falta **Python 3.12+** y **Node 22.5+**.

```bash
pip install -r requirements-dev.txt
```

```bash
npm --prefix futurepilot-globe install
```

Compila el globo (el backend lo sirve bajo `/globe`; sin este paso esa ruta no existe):

```bash
npm --prefix futurepilot-globe run build
```

Arranca el servidor — sirve la API **y** todo el sitio:

```bash
python -m uvicorn --app-dir futurepilot-IA app:app --reload --port 8000
```

El sitio queda en <http://127.0.0.1:8000>. La documentación interactiva de la API, en `/docs`.

> Con VS Code o Claude Code, `.claude/launch.json` ya trae las configuraciones
> `futurepilot-backend` y `futurepilot-globe`.

### Trabajar sobre el globo con hot reload

```bash
npm --prefix futurepilot-globe run dev
```

Corre en el puerto 5173 y reenvía `/api` al backend del 8000 vía el proxy de `vite.config.js`.
El backend debe estar levantado en paralelo.

### Tests

```bash
python -m pytest
```

49 tests de integración sobre la API real (auth, admin, assessment, mentor, pasaporte). Usan una
base SQLite temporal: **nunca tocan `backend/data/users.sqlite3`**.

---

## Configuración

Copia `.env.example` a `.env` y rellena lo que necesites. Ninguna variable es obligatoria para
desarrollo. Las que importan:

| Variable | Para qué |
|---|---|
| `ADMIN_EMAIL` | Email de la **única** cuenta con acceso a `/admin`. Regístrate primero como estudiante normal con ese email; la cuenta pasa a ser admin en el siguiente login. Vacío = nadie tiene acceso |
| `CORS_ORIGINS` | Orígenes extra permitidos, separados por coma. El sitio servido por este mismo backend no lo necesita (mismo origen) |
| `SMTP_*` | Envío real del correo de recuperación de contraseña. Sin configurar, el link se imprime en la consola del servidor |
| `USERS_DB_PATH` | Ruta de la base SQLite. Útil para apuntar a un disco persistente en producción |
| `FUTUREPILOT_MEMORY_DIR` | Dónde vive la memoria del AI Mentor por estudiante |

`.env` está en `.gitignore` y nunca debe commitearse.

---

## Estructura

```
futurepilot-IA/          Backend. app.py es el ÚNICO servidor (FastAPI, 45 endpoints):
  app.py                   expone la API y sirve Frontend/ y el build del globo
  ai_engine.py             motor cognitivo rule-based + AI Mentor + memoria por estudiante
  data/                    FUENTE ÚNICA DE VERDAD: questions.json (50), careers.json (73)

backend/                 Librería de datos, no arranca ningún servidor propio
  users_store.py           SQLite: usuarios, sesiones, resultados, pasaporte, auditoría
  rate_limiter.py          limitador en memoria para las rutas de auth
  mailer.py                SMTP opcional
  config_store.py          config JSON del Theme Lab y los feature flags
  data/users.sqlite3       la base real (ignorada por git)

Frontend/                Sitio del estudiante: HTML/CSS/JS vanilla
  admin/                   panel de administración

futurepilot-globe/       Globo 3D (React 19 + Vite + three.js), se sirve en /globe
  src/database/countries/  datos de países y ciudades curados a mano

scripts/                 Utilidades
  sync_frontend_data.py    regenera Frontend/questions-data.js desde el JSON canónico

tests/                   Suite de pytest
docs/                    Documentación y notas
```

---

## Notas de desarrollo

- **Los datos del test tienen una sola fuente.** `futurepilot-IA/data/questions.json` es canónico.
  `Frontend/questions-data.js` es un artefacto generado (fallback para abrir el sitio con `file://`)
  y **no se edita a mano**: se regenera con `python scripts/sync_frontend_data.py`.

- **El frontend nunca hardcodea el host de la API.** Siempre rutas relativas (`/api/v1/...`).
  El backend sirve el sitio y la API desde el mismo origen, y la CSP declara `connect-src 'self'`.

- **La identidad se resuelve siempre en el servidor**, desde el token bearer o desde un `anon_id`
  validado con regex estricta. Nunca desde el payload del cliente.

- **Reconstruye el globo** (`npm --prefix futurepilot-globe run build`) después de tocar
  `futurepilot-globe/src/`: el backend sirve `dist/`, no el código fuente.

---

## Documentación

| Documento | Contenido |
|---|---|
| [`DOCUMENTACION_Y_PLAN.md`](DOCUMENTACION_Y_PLAN.md) | Arquitectura, flujo completo, auditoría y plan de mejora por fases |
| [`docs/INFORME_REORGANIZACION.md`](docs/INFORME_REORGANIZACION.md) | Log histórico de la reorganización previa |
| [`docs/terminal_cheatsheet.md`](docs/terminal_cheatsheet.md) | Notas de terminal |
