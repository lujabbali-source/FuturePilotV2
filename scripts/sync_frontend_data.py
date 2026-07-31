"""
Regenera Frontend/questions-data.js a partir de la fuente unica de verdad
(futurepilot-IA/data/questions.json), para que el fallback de file://
(cuando el sitio se abre sin servidor) nunca quede desincronizado del
banco de preguntas real que sirve el backend en /api/v1/questions.

No editar Frontend/questions-data.js a mano: correr este script despues
de cualquier cambio en futurepilot-IA/data/questions.json.

Uso:
    python scripts/sync_frontend_data.py
"""

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE = REPO_ROOT / "futurepilot-IA" / "data" / "questions.json"
TARGET = REPO_ROOT / "Frontend" / "questions-data.js"

HEADER = (
    "// Archivo generado automaticamente por scripts/sync_frontend_data.py\n"
    "// a partir de futurepilot-IA/data/questions.json. No editar a mano.\n"
    "// Se usa unicamente como fallback cuando assessment.html se abre\n"
    "// directamente via file:// (sin servidor). Cuando el sitio se sirve\n"
    "// por HTTP, assessment.js pide /api/v1/questions en su lugar.\n"
)


def main() -> None:
    questions = json.loads(SOURCE.read_text(encoding="utf-8"))
    payload = json.dumps(questions, ensure_ascii=False, indent=2)
    TARGET.write_text(
        f"{HEADER}window.FUTUREPILOT_QUESTIONS = {payload};\n",
        encoding="utf-8",
    )
    print(f"Sincronizado: {len(questions)} preguntas -> {TARGET.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
