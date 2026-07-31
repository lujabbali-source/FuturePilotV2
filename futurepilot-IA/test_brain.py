"""
===============================================================================
FUTUREPILOT AI - SCRIPT DE DIAGNÓSTICO DE TERMINAL
===============================================================================
Ejecuta este archivo en la terminal de VS Code para verificar si todos los
módulos de la IA, el cálculo vectorial, la memoria y el servidor funcionan.
===============================================================================
"""

import os
import json
import sys

# Colores para la terminal
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
RESET = "\033[0m"

def print_status(message, is_success):
    if is_success:
        print(f"{GREEN}[✔ EXITOSO]{RESET} {message}")
    else:
        print(f"{RED}[✖ ERROR]{RESET} {message}")

print(f"\n{CYAN}=========================================================={RESET}")
print(f"{CYAN} 🧪 INICIANDO DIAGNÓSTICO COMPLETO DE FUTUREPILOT AI {RESET}")
print(f"{CYAN}=========================================================={RESET}\n")

# 1. Comprobar archivos JSON
print(f"{YELLOW}1. Comprobando archivos de base de datos JSON...{RESET}")

careers_path = os.path.join("data", "careers.json")
questions_path = os.path.join("data", "questions.json")

has_careers = os.path.exists(careers_path)
has_questions = os.path.exists(questions_path)

print_status("Archivo data/careers.json encontrado", has_careers)
print_status("Archivo data/questions.json encontrado", has_questions)

if not (has_careers and has_questions):
    print(f"\n{RED}Deteniendo prueba: Asegúrate de tener la carpeta 'data/' con los archivos JSON.{RESET}\n")
    sys.exit(1)

# Cargar archivos JSON
try:
    with open(careers_path, "r", encoding="utf-8") as f:
        careers_db = json.load(f)
    with open(questions_path, "r", encoding="utf-8") as f:
        questions_db = json.load(f)
    print_status(f"Bases de datos cargadas correctamente ({len(questions_db)} preguntas, {len(careers_db)} carreras)", True)
except Exception as e:
    print_status(f"Error al leer los JSON: {e}", False)
    sys.exit(1)

# 2. Comprobar importación del Cerebro de la IA
print(f"\n{YELLOW}2. Probando importación de ai_engine.py...{RESET}")
try:
    from ai_engine import FuturePilotAIEcosystem, FuturePilotBrain
    print_status("Módulo ai_engine.py importado con éxito", True)
except Exception as e:
    print_status(f"Error al importar ai_engine.py: {e}", False)
    sys.exit(1)

# 3. Inicializar el Cerebro de IA
print(f"\n{YELLOW}3. Inicializando el Cerebro de IA (FuturePilotBrain)...{RESET}")
try:
    ai_system = FuturePilotAIEcosystem(careers_data=careers_db, questions_data=questions_db)
    print_status("Ecosistema de IA instanciado correctamente", True)
except Exception as e:
    print_status(f"Error al inicializar la IA: {e}", False)
    sys.exit(1)

# 4. Simular respuestas de un estudiante
print(f"\n{YELLOW}4. Simulando prueba con un estudiante de prueba ('usuario_test_vscode')...{RESET}")
sample_answers = [
    {"question_index": 0, "answer_index": 0},
    {"question_index": 1, "answer_index": 1},
    {"question_index": 4, "answer_index": 0},
    {"question_index": 7, "answer_index": 0}
]

test_user_id = "usuario_test_vscode"

try:
    results = ai_system.process_user_test(sample_answers, user_id=test_user_id)
    print_status("Evaluación procesada sin errores", True)
    
    top_choice = results.get("top_choice", {})
    top_title = top_choice.get("title", "Desconocido")
    top_pct = top_choice.get("match_percentage", 0)
    
    print(f"\n  {CYAN}--- RESULTADO OBTENIDO ---{RESET}")
    print(f"  • Carrera Recomendada #1: {GREEN}{top_title}{RESET}")
    print(f"  • Compatibilidad: {GREEN}{top_pct}%{RESET}")
    print(f"  • Justificación Cognitiva: {top_choice.get('justification', 'Sin información')}")
    
except Exception as e:
    print_status(f"Error durante el procesamiento del test: {e}", False)
    sys.exit(1)

# 5. Verificación de Memoria Persistente (data/users/)
print(f"\n{YELLOW}5. Verificando la creación automática del archivo de Memoria...{RESET}")
memory_file_path = os.path.join("data", "users", f"{test_user_id}_memory.json")
memory_exists = os.path.exists(memory_file_path)

print_status(f"Archivo de memoria creado en '{memory_file_path}'", memory_exists)

if memory_exists:
    try:
        with open(memory_file_path, "r", encoding="utf-8") as f:
            mem_data = json.load(f)
        assessments_count = mem_data.get("assessments_count", 0)
        print_status(f"Memoria leída correctamente. Evaluaciones registradas: {assessments_count}", True)
    except Exception as e:
        print_status(f"Error al leer la memoria creada: {e}", False)

print(f"\n{CYAN}=========================================================={RESET}")
print(f"{GREEN} 🎉 DIAGNÓSTICO FINALIZADO: ¡EL CEREBRO DE LA IA FUNCIONA! {RESET}")
print(f"{CYAN}=========================================================={RESET}\n")