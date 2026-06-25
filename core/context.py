"""
FuturePilot - Context Builder

Se encarga de preparar toda la información recibida desde el frontend
antes de enviarla al motor de IA.
"""

from typing import Dict, Any

from .prompts import USER_TEMPLATE


class ContextBuilder:
    """
    Construye el contexto que recibirá la IA.
    """

    @staticmethod
    def build(student_data: Dict[str, Any]) -> str:
        """
        Convierte los datos del estudiante en un prompt legible.
        """

        return USER_TEMPLATE.format(
            nombre=student_data.get("nombre", "No especificado"),
            edad=student_data.get("edad", "No especificada"),
            curso=student_data.get("curso", "No especificado"),
            pais=student_data.get("pais", "No especificado"),

            intereses=ContextBuilder._list_to_text(
                student_data.get("intereses", [])
            ),

            fortalezas=ContextBuilder._list_to_text(
                student_data.get("fortalezas", [])
            ),

            debilidades=ContextBuilder._list_to_text(
                student_data.get("debilidades", [])
            ),

            test=ContextBuilder._dict_to_text(
                student_data.get("test", {})
            ),
        )

    @staticmethod
    def _list_to_text(items) -> str:
        """
        Convierte una lista en texto.
        """

        if not items:
            return "No especificado"

        return "\n".join(f"- {item}" for item in items)

    @staticmethod
    def _dict_to_text(data: Dict[str, Any]) -> str:
        """
        Convierte un diccionario en texto.
        """

        if not data:
            return "No disponible"

        lines = []

        for key, value in data.items():
            lines.append(f"{key}: {value}")

        return "\n".join(lines)