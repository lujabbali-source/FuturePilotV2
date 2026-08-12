"""Envio de correo minimo via smtplib (stdlib, sin dependencia nueva).

Sin SMTP_HOST configurado en .env, send_email() no falla ni finge que
envio algo: imprime el mensaje en la consola del servidor. Eso es
suficiente para desarrollo (el link de reset queda visible en la terminal
donde corre uvicorn) pero antes de produccion hace falta un proveedor SMTP
real (Gmail con contraseña de aplicacion, SendGrid, Postmark, SES, etc.) -
ver .env.example para las variables que hay que llenar.

Ese fallback esta limitado a desarrollo A PROPOSITO. El cuerpo del correo
de recuperacion contiene un link con un token valido: imprimirlo en un
servidor real lo mete en los logs, y cualquiera con acceso a los logs
(agregadores, backups, soporte) podria usarlo para entrar en la cuenta
ajena. Con FUTUREPILOT_ENV=production y sin SMTP, no se envia y no se
imprime nada del contenido.
"""

from __future__ import annotations

import os
import smtplib
from email.message import EmailMessage


def is_configured() -> bool:
    return bool(os.environ.get("SMTP_HOST"))


def _is_production() -> bool:
    # Se lee en cada llamada, no al importar, para que los tests puedan
    # alternar el entorno sin recargar el modulo.
    return (os.environ.get("FUTUREPILOT_ENV") or "development").strip().lower() == "production"


def send_email(to_email: str, subject: str, body: str) -> bool:
    """Devuelve True si se envio de verdad, False si no.

    Sin SMTP configurado imprime el correo en consola (desarrollo), salvo
    en produccion, donde solo deja constancia de que fallo - sin el
    contenido, que lleva el token de recuperacion."""
    if not is_configured():
        if _is_production():
            print(
                "[FuturePilot] ERROR: se pidio enviar un correo sin SMTP configurado. "
                f"Destinatario: {to_email}. El contenido NO se registra porque "
                "incluye un token de recuperacion. Configura SMTP_HOST."
            )
            return False
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
