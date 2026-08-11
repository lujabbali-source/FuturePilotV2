"""Envio de correo minimo via smtplib (stdlib, sin dependencia nueva).

Sin SMTP_HOST configurado en .env, send_email() no falla ni finge que
envio algo: imprime el mensaje en la consola del servidor. Eso es
suficiente para desarrollo (el link de reset queda visible en la terminal
donde corre uvicorn) pero antes de produccion hace falta un proveedor SMTP
real (Gmail con contraseña de aplicacion, SendGrid, Postmark, SES, etc.) -
ver .env.example para las variables que hay que llenar.
"""

from __future__ import annotations

import os
import smtplib
from email.message import EmailMessage


def is_configured() -> bool:
    return bool(os.environ.get("SMTP_HOST"))


def send_email(to_email: str, subject: str, body: str) -> bool:
    """Devuelve True si se envio de verdad, False si se imprimio en
    consola (modo desarrollo sin SMTP configurado)."""
    if not is_configured():
        print(
            "\n[DEV MODE - sin SMTP configurado] Correo no enviado, contenido:\n"
            f"  Para: {to_email}\n  Asunto: {subject}\n  ---\n{body}\n  ---\n"
        )
        return False

    host = os.environ["SMTP_HOST"]
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER", "")
    password = os.environ.get("SMTP_PASSWORD", "")
    sender = os.environ.get("SMTP_FROM") or user

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = sender
    message["To"] = to_email
    message.set_content(body)

    with smtplib.SMTP(host, port, timeout=10) as smtp:
        smtp.starttls()
        if user:
            smtp.login(user, password)
        smtp.send_message(message)
    return True
