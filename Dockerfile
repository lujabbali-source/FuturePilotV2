# FuturePilot en un contenedor. Dos etapas porque el proyecto necesita dos
# cadenas de herramientas que no tienen por que viajar juntas: Node solo hace
# falta para construir el frontend, y meterlo en la imagen final serian ~200MB
# de cosas que el servidor nunca ejecuta.
#
# La imagen reproduce la estructura del repositorio tal cual, porque app.py
# resuelve sus rutas relativas a REPO_ROOT (ver app.py:57): Frontend/, web/dist
# y backend/ tienen que colgar del mismo directorio que futurepilot-IA/.

# --------------------------------------------------------------------------
# Etapa 1 - construir el frontend con Vite
# --------------------------------------------------------------------------
FROM node:24-alpine AS frontend
WORKDIR /src

# El manifiesto va antes que el codigo para que Docker pueda cachear la
# instalacion de dependencias: cambiar una linea de un componente no deberia
# obligar a reinstalar node_modules entero.
COPY web/package.json web/package-lock.json ./web/
RUN npm --prefix web ci

COPY web/ ./web/
RUN npm --prefix web run build

# --------------------------------------------------------------------------
# Etapa 2 - el servidor
# --------------------------------------------------------------------------
FROM python:3.12-slim
WORKDIR /app

# Sin buffer, o los print() del arranque - que son el unico canal para el token
# de admin y para la lista de problemas de configuracion - no aparecen en los
# logs de la plataforma hasta mucho despues.
ENV PYTHONUNBUFFERED=1

COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY backend/ ./backend/
COPY futurepilot-IA/ ./futurepilot-IA/
COPY Frontend/ ./Frontend/
COPY --from=frontend /src/web/dist ./web/dist

# $PORT lo inyecta la plataforma; el 8000 es solo para correr la imagen a mano.
CMD ["sh", "-c", "uvicorn app:app --app-dir futurepilot-IA --host 0.0.0.0 --port ${PORT:-8000}"]
