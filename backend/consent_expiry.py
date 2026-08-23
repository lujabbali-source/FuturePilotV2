# -*- coding: utf-8 -*-
"""Los 30 dias del permiso del acudiente.

La cuenta del estudiante NO se bloquea en ningun momento. Funciona entera
desde el primer minuto, tenga el expediente el estado que tenga. Lo que hace
este modulo es que la espera no sea infinita: si nadie autoriza, los datos
del menor no se quedan para siempre.

    python -m backend.consent_expiry              # que hay, sin tocar nada
    python -m backend.consent_expiry --expirar    # marcar los vencidos
    python -m backend.consent_expiry --borrar     # marcar Y BORRAR las cuentas

Por que no se borra solo con --expirar: son dos decisiones distintas. Marcar
es contabilidad; borrar es irreversible y se lleva la cuenta de una persona
real. Que haga falta escribir --borrar es a proposito.

En un cron diario, despues del respaldo:
    30 3 * * *  cd /ruta && python -m backend.consent_expiry --borrar >> /var/log/fp-consent.log 2>&1
"""
from __future__ import annotations

import argparse
import sys

from backend.users_store import UsersStore


def _store(ruta=None) -> UsersStore:
    if ruta:
        return UsersStore(ruta)
    from backend.backup import ruta_base
    return UsersStore(ruta_base())


def listar(store: UsersStore | None = None) -> list[dict]:
    """Expedientes pendientes cuyo plazo ya paso."""
    return (store or _store()).list_expired_consents()


def expirar(store: UsersStore | None = None) -> int:
    """Los marca EXPIRED. No borra nada."""
    store = store or _store()
    vencidos = store.list_expired_consents()
    return store.mark_consents_expired([v["id"] for v in vencidos])


def borrar(store: UsersStore | None = None) -> list[dict]:
    """Marca y borra las cuentas de los menores sin autorizacion.

    Se borra por la misma puerta que un estudiante que pide el borrado
    (delete_account), no con un DELETE a mano: asi los resultados del test
    quedan desligados en vez de desaparecer - siguen sosteniendo las
    estadisticas de la plataforma sin apuntar a nadie - y la memoria del
    mentor se va con ellos. Una segunda ruta de borrado seria una segunda
    oportunidad de olvidarse de algo.
    """
    store = store or _store()
    vencidos = store.list_expired_consents()
    if not vencidos:
        return []
    store.mark_consents_expired([v["id"] for v in vencidos])

    borradas = []
    for expediente in vencidos:
        store.delete_account(expediente["user_id"])
        _olvidar_mentor(expediente["user_id"])
        borradas.append(expediente)
    return borradas


def _olvidar_mentor(user_id: int) -> bool:
    """La memoria del mentor vive fuera de la base (ver ai_engine)."""
    try:
        import os
        import sys as _sys
        raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        ia = os.path.join(raiz, "futurepilot-IA")
        if ia not in _sys.path:
            _sys.path.insert(0, ia)
        from ai_engine import StudentMemorySystem
        return StudentMemorySystem().forget(str(user_id))
    except Exception as error:  # noqa: BLE001
        # Que no se pueda cargar el motor no puede dejar la cuenta a medio
        # borrar en silencio: se avisa fuerte y se sigue.
        print(f"[consent] AVISO: no se pudo borrar la memoria de {user_id}: {error}")
        return False


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--expirar", action="store_true",
                        help="marcar como EXPIRED los pendientes vencidos")
    parser.add_argument("--borrar", action="store_true",
                        help="ademas de marcar, BORRAR las cuentas (irreversible)")
    args = parser.parse_args(argv)

    store = _store()
    vencidos = listar(store)

    if not vencidos:
        print("[consent] No hay permisos vencidos.")
        return 0

    print(f"[consent] {len(vencidos)} permiso(s) vencido(s) sin respuesta:")
    for v in vencidos:
        print(f"    cuenta {v['user_id']}  {v['student_email']}  "
              f"acudiente {v['guardian_email']}  vencio {v['expires_at']}")

    if args.borrar:
        borradas = borrar(store)
        print(f"[consent] {len(borradas)} cuenta(s) borrada(s).")
        return 0

    if args.expirar:
        n = expirar(store)
        print(f"[consent] {n} marcado(s) como EXPIRED. Las cuentas NO se tocaron.")
        return 0

    print("[consent] No se toco nada. Usa --expirar para marcarlos "
          "o --borrar para borrar las cuentas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
