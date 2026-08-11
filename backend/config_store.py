"""Almacenamiento generico en JSON para configuracion pequeña y de baja
frecuencia de escritura (tema visual, feature flags) - no justifica una
tabla SQLite propia. Se lee del disco en cada llamada (sin cache en
memoria) a proposito: son archivos minusculos y esto evita cualquier
logica de invalidacion/"reload" - un cambio guardado por el admin queda
visible de inmediato en la siguiente peticion, sin reiniciar el server."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def read_json(path: str | Path, default: Any) -> Any:
    file_path = Path(path)
    if not file_path.exists():
        return default
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        return default


def write_json(path: str | Path, data: Any) -> None:
    file_path = Path(path)
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def delete_json(path: str | Path) -> None:
    file_path = Path(path)
    if file_path.exists():
        file_path.unlink()
