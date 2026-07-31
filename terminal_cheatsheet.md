# ==========================
# NAVEGACIÓN ENTRE CARPETAS
# ==========================

cd FuturePilot                     # Entrar a la carpeta del proyecto
cd ..                              # Volver una carpeta atrás
cd nombre_carpeta                  # Entrar a una carpeta específica
dir                                # Ver archivos y carpetas (Windows)
tree                               # Ver la estructura de carpetas
cls                                # Limpiar la terminal


# ==========================
# ENTORNO VIRTUAL (Opcional)
# ==========================

python -m venv .venv               # Crear un entorno virtual
.venv\Scripts\activate             # Activar el entorno virtual (Windows)
deactivate                         # Salir del entorno virtual


# ==========================
# PYTHON
# ==========================

python --version                   # Ver la versión de Python instalada
python archivo.py                  # Ejecutar un archivo Python
python -m pip install paquete      # Instalar un paquete utilizando Python
python -m pip list                 # Ver paquetes instalados
python -m pip freeze               # Mostrar todas las librerías instaladas
python -m pip freeze > requirements.txt   # Guardar dependencias del proyecto


# ==========================
# PIP
# ==========================

pip install streamlit              # Instalar Streamlit
pip install groq                   # Instalar la librería de Groq
pip install openai                 # Instalar OpenAI
pip install requests               # Instalar Requests
pip install python-dotenv          # Instalar dotenv para variables de entorno
pip install -r requirements.txt    # Instalar todas las dependencias del proyecto
pip uninstall paquete              # Eliminar una librería
pip list                           # Ver librerías instaladas
pip show paquete                   # Información de una librería
pip install --upgrade pip          # Actualizar pip


# ==========================
# STREAMLIT
# ==========================

streamlit run app.py               # Ejecutar la aplicación Streamlit
streamlit run main.py              # Ejecutar otra aplicación Streamlit
streamlit hello                    # Abrir el proyecto de ejemplo de Streamlit
streamlit cache clear              # Limpiar la caché de Streamlit


# ==========================
# GIT
# ==========================

git init                           # Inicializar un repositorio Git
git status                         # Ver el estado del proyecto
git add .                          # Agregar todos los cambios
git add archivo.py                 # Agregar un archivo específico
git commit -m "mensaje"            # Crear un commit
git log                            # Ver historial de commits
git branch                         # Ver ramas
git checkout nombre-rama           # Cambiar de rama
git checkout -b nueva-rama         # Crear una rama nueva
git merge nombre-rama              # Fusionar ramas
git pull                           # Descargar cambios del repositorio remoto
git push                           # Subir cambios a GitHub
git clone URL                      # Clonar un repositorio
git remote -v                      # Ver el repositorio remoto conectado


# ==========================
# GITHUB
# ==========================

gh auth login                      # Iniciar sesión en GitHub CLI
gh repo clone usuario/repositorio  # Clonar un repositorio usando GitHub CLI
gh repo view                       # Ver información del repositorio


# ==========================
# INSTALAR DEPENDENCIAS
# ==========================

npm install                        # Instalar dependencias de Node.js
npm run dev                        # Ejecutar servidor de desarrollo
npm start                          # Iniciar el proyecto
npm run build                      # Compilar el proyecto


# ==========================
# VISUAL STUDIO CODE
# ==========================

code .                             # Abrir la carpeta actual en VS Code


# ==========================
# ARCHIVOS
# ==========================

mkdir nombre                       # Crear una carpeta
rmdir nombre                       # Eliminar una carpeta vacía
del archivo.txt                    # Eliminar un archivo
copy origen destino                # Copiar archivos
move origen destino                # Mover archivos


# ==========================
# IA FUTUREPILOT
# ==========================

python engine.py                   # Ejecutar el motor de la IA
python parser.py                   # Ejecutar el parser
python context.py                  # Probar el sistema de contexto
python prompts.py                  # Probar los prompts
python main.py                     # Ejecutar el programa principal


# ==========================
# DEPURACIÓN
# ==========================

python -m traceback                # Mostrar información de errores
where python                       # Ver dónde está instalado Python
where pip                          # Ver dónde está instalado pip
echo %PATH%                        # Ver la variable PATH


# ==========================
# JSON
# ==========================

python -m json.tool questions.json # Validar el archivo JSON de preguntas


# ==========================
# UTILIDADES
# ==========================

echo Hola Mundo                    # Imprimir un mensaje
exit                               # Cerrar la terminal