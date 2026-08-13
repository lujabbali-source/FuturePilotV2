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
npm --prefix web install
```

Compila el frontend (el backend sirve el resultado; sin este paso `/assessment` y `/globe` no existen):

```bash
npm --prefix web run build
```

Arranca el servidor — sirve la API **y** todo el sitio:

```bash
python -m uvicorn --app-dir futurepilot-IA app:app --reload --port 8000
```

El sitio queda en <http://127.0.0.1:8000>. La documentación interactiva de la API, en `/docs`.

> Con VS Code o Claude Code, `.claude/launch.json` ya trae las configuraciones
> `futurepilot-backend` y `futurepilot-web`.

### Trabajar sobre el frontend con hot reload

```bash
npm --prefix web run dev
```

Corre en el puerto 5173 y reenvía `/api` al backend del 8000 vía el proxy de `vite.config.js`.
El backend debe estar levantado en paralelo.

### Tests

```bash
python -m pytest
```

90 tests de integración sobre la API real (auth, admin, assessment, mentor, pasaporte). Usan una
base SQLite temporal: **nunca tocan `backend/data/users.sqlite3`**.

---

## Configuración

Copia `.env.example` a `.env` y rellena lo que necesites. Ninguna variable es obligatoria para
desarrollo. Las que importan:

| Variable | Para qué |
|---|---|
| `FUTUREPILOT_ENV` | `development` (por defecto) o `production`. Ver la sección de despliegue |
| `ADMIN_EMAIL` | Email de la **única** cuenta con acceso a `/admin`. Reclamarla requiere el token de primer arranque (ver despliegue). Vacío = nadie tiene acceso |
| `ADMIN_SETUP_TOKEN` | Fija el token de reclamación en vez de dejar que el servidor lo genere. Solo para despliegues automatizados |
| `CORS_ORIGINS` | Orígenes extra permitidos, separados por coma. El sitio servido por este mismo backend no lo necesita (mismo origen) |
| `SMTP_*` | Envío real del correo de recuperación de contraseña. Sin configurar, el link se imprime en la consola del servidor |
| `USERS_DB_PATH` | Ruta de la base SQLite. Útil para apuntar a un disco persistente en producción |
| `FUTUREPILOT_MEMORY_DIR` | Dónde vive la memoria del AI Mentor por estudiante |

`.env` está en `.gitignore` y nunca debe commitearse.

---

## Estructura

```
futurepilot-IA/          Backend. app.py es el ÚNICO servidor (FastAPI, 45 endpoints):
  app.py                   expone la API y sirve el build de web/ + los CSS de Frontend/
  ai_engine.py             motor cognitivo rule-based + AI Mentor + memoria por estudiante
  data/                    FUENTE ÚNICA DE VERDAD: questions.json (50), careers.json (73)

backend/                 Librería de datos, no arranca ningún servidor propio
  users_store.py           SQLite: usuarios, sesiones, resultados, pasaporte, auditoría
  rate_limiter.py          limitador en memoria para las rutas de auth
  mailer.py                SMTP opcional
  config_store.py          config JSON del Theme Lab y los feature flags
  data/users.sqlite3       la base real (ignorada por git)

web/                     TODO el frontend (Vite). Un .html por página = una entrada:
  index · assessment · login · reset-password · passport · journey
  flightplan · careers · terms · privacy · globe
  admin-dashboard · admin-login · system-health
  src/<página>/            módulos ES de cada página
  src/shared/              módulos compartidos (i18n, tema, conector API, claim…)
  src/database/countries/  datos de países y ciudades curados a mano

Frontend/                Solo CSS e imágenes. Ya no queda JS ni HTML aquí
  admin/                   hojas de estilo del panel

tests/                   Suite de pytest
docs/                    Documentación y notas
```

> **Una sola página HTML por ruta, compilada.** Ninguna página usa `document.write` ni globales
> `window.*` para comunicarse, y por eso `script-src` no necesita `'unsafe-inline'` en ningún sitio.
> Después de tocar `web/`, reconstruye — el backend sirve `dist/`, no el código fuente.

---

## Notas de desarrollo

- **Los datos del test tienen una sola fuente.** `futurepilot-IA/data/questions.json` es canónico y
  llega al navegador por `/api/v1/questions`. Ya no existe ninguna copia generada en el frontend.

- **El frontend nunca hardcodea el host de la API.** Siempre rutas relativas (`/api/v1/...`).
  El backend sirve el sitio y la API desde el mismo origen, y la CSP declara `connect-src 'self'`.

- **La identidad se resuelve siempre en el servidor**, desde el token bearer o desde un `anon_id`
  validado con regex estricta. Nunca desde el payload del cliente.

- **Reconstruye** (`npm --prefix web run build`) después de tocar `web/`: el backend sirve
  `dist/`, no el código fuente.

---

## Despliegue

```bash
FUTUREPILOT_ENV=production python -m uvicorn --app-dir futurepilot-IA app:app --host 0.0.0.0 --port 8000
```

Compila el frontend antes (`npm --prefix web run build`): sin `web/dist` el sitio entero devuelve
503. **El servidor imprime al arrancar todo lo que encuentre mal configurado** — no aborta, avisa.

Declarar `FUTUREPILOT_ENV=production` cambia cuatro cosas:

| | Desarrollo | Producción |
|---|---|---|
| `/docs`, `/redoc`, `/openapi.json` | publicados | **no existen** |
| Correo sin SMTP | se imprime en consola | **no se imprime**: el cuerpo lleva un token de recuperación y acabaría en los logs |
| `CORS_ORIGINS` por defecto | puertos de Vite | vacío |
| Chequeo de arranque | solo avisa si falta el build | revisa admin, SMTP, disco y CORS |

**Lo que hay que configurar sí o sí:** `ADMIN_EMAIL`, `SMTP_*` y un `USERS_DB_PATH` **fuera del
repositorio**. En muchos PaaS el disco del contenedor es efímero y cada despliegue se llevaría por
delante todas las cuentas.

### Reclamar la cuenta de administrador

El acceso a `/admin` se concede a la cuenta cuyo email coincide con `ADMIN_EMAIL`, y el registro no
verifica el correo. Para que eso no signifique que **quien registre ese email primero se lleva el
panel**, ese registro concreto exige un token de un solo uso que el servidor imprime al arrancar:

```
====================================================================
  RECLAMA LA CUENTA DE ADMINISTRADOR
  Registra jefe@futurepilot.app en /login usando este token:

      tGvGBr3HEMAiTQby5ruBMWfUuGCjVbzn

  Hasta entonces, ese email no se puede registrar sin el.
====================================================================
```

Entra en `/login`, regístrate con ese email, y cuando el formulario diga que hace falta el token
aparecerá el campo donde pegarlo. Hecho eso, el token se descarta y no vuelve a pedirse.

El token **solo sale por la consola del servidor**, nunca por HTTP: ese es el canal que un atacante
remoto no tiene. Se guarda en `backend/data/admin_setup.json` (ignorado por git) para que sobreviva
a un reinicio, y se regenera si cambias `ADMIN_EMAIL`. Para despliegues automatizados donde nadie
lee la consola, fíjalo con `ADMIN_SETUP_TOKEN`.

**Sobre `--workers`:** el limitador de peticiones guarda su estado en memoria del proceso, así que
con varios workers cada uno lleva su propia cuenta y el límite efectivo se multiplica. Con más de
un worker hay que mover el limitador a Redis (la interfaz de `backend/rate_limiter.py` no cambia).

**Sonda de vida:** `GET /healthz`, pública y sin detalle. El diagnóstico completo está en
`/api/v1/admin/health`, que exige sesión de administrador.

**Caché:** los assets de `/app/assets/` llevan hash de contenido y se sirven `immutable` a un año;
el HTML va `no-store` para que un despliegue nuevo llegue de inmediato; la API, `no-store`.

---

## Documentación

| Documento | Contenido |
|---|---|
| [`DOCUMENTACION_Y_PLAN.md`](DOCUMENTACION_Y_PLAN.md) | Arquitectura, flujo completo, auditoría y plan de mejora por fases |
| [`docs/INFORME_REORGANIZACION.md`](docs/INFORME_REORGANIZACION.md) | Log histórico de la reorganización previa |
| [`docs/terminal_cheatsheet.md`](docs/terminal_cheatsheet.md) | Notas de terminal |
