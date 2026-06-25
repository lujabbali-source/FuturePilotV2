"""
FuturePilot - AI Engine

Motor principal encargado de comunicarse con OpenAI.
"""

import json
import os
from urllib import response

from dotenv import load_dotenv
from core.parser import AIResponseParser
from openai import OpenAI

from .context import ContextBuilder
from .prompts import SYSTEM_PROMPT


load_dotenv()


class FuturePilotAI:
    """
    Motor principal de IA de FuturePilot.
    """

    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")

        if not api_key:
            raise ValueError(
                "No se encontró la variable OPENAI_API_KEY en el archivo .env"
            )

        self.client = OpenAI(api_key=api_key)

    def generate_profile(self, student_data):
        """
        Genera el perfil completo del estudiante.
        """

        context = ContextBuilder.build(student_data)

        response = self.client.chat.completions.create(
            model="gpt-4.1",

            temperature=0.7,

            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": context
                }
            ]
        )

        content = response.choices[0].message.content

        return AIResponseParser.parse(content)

    def generate_raw(self, student_data):
        """
        Devuelve la respuesta sin procesar.
        Útil para depuración.
        """

        context = ContextBuilder.build(student_data)

        response = self.client.chat.completions.create(
            model="gpt-4.1",

            temperature=0.7,

            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": context
                }
            ]
        )

        return response.choices[0].message.content