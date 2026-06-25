"""
FuturePilot - Parser

Se encarga de validar y limpiar las respuestas de la IA.
"""

import json
from typing import Any, Dict


class AIResponseParser:
    """
    Valida y limpia la respuesta de la IA.
    """

    REQUIRED_KEYS = [
        "profile",
        "careers",
        "roadmap",
        "skills",
        "resources"
    ]

    @staticmethod
    def parse(response: str) -> Dict[str, Any]:
        """
        Convierte el texto JSON en un diccionario de Python.
        """

        try:
            data = json.loads(response)

        except json.JSONDecodeError as error:
            raise ValueError(
                f"La IA devolvió un JSON inválido.\n{error}"
            )

        AIResponseParser.validate(data)

        return data

    @staticmethod
    def validate(data: Dict[str, Any]):
        """
        Comprueba que existen todos los campos necesarios.
        """

        if not isinstance(data, dict):
            raise ValueError("La respuesta de la IA debe ser un objeto JSON.")

        missing = []

        for key in AIResponseParser.REQUIRED_KEYS:
            if key not in data:
                missing.append(key)

        if missing:
            raise ValueError(
                "Faltan campos obligatorios: "
                + ", ".join(missing)
            )

    @staticmethod
    def safe(response: str):
        """
        Devuelve None si ocurre cualquier error.
        Muy útil para producción.
        """

        try:
            return AIResponseParser.parse(response)

        except Exception:
            return None