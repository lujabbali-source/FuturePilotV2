# -*- coding: utf-8 -*-
"""Copias de seguridad de la base de usuarios.

Sin esto, un disco que falla se lleva todas las cuentas, todos los tests y
todos los pasaportes, y no hay forma de recuperarlos.

Por que no `cp users.sqlite3 copia.sqlite3`: la base corre en modo WAL (ver
users_store.connect). Los cambios recientes viven en el archivo `-wal` hasta
que se consolidan, asi que copiar solo el `.sqlite3` puede dar una copia vieja
o directamente corrupta - y no se nota hasta el dia que hay que restaurarla.
Aqui se usa `sqlite3.Connection.backup()`, que es la API oficial: bloquea lo
justo, funciona con la aplicacion encendida y produce un archivo consistente.

Y una copia que nunca se ha abierto no es una copia. Cada respaldo se verifica
al terminar: se abre, se comprueba su integridad y se cuentan las filas. Si no
pasa, se borra y el proceso falla con ruido en vez de dejar un archivo que
parece un respaldo.

    python -m backend.backup                      # copia + verifica + rota
    python -m backend.backup --list               # que copias hay
    python -m backend.backup --verify ARCHIVO     # comprobar una en concreto

En un cron diario:
    0 3 * * *  cd /ruta/al/proyecto && python -m backend.backup >> /var/log/fp-backup.log 2>&1
"""
from __future__ import annotations

import argparse
import os
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path

# Cuantas copias se conservan. Con una diaria son dos semanas: suficiente para
# notar un borrado accidental que nadie vio el mismo dia.
COPIAS_A_CONSERVAR = int(os.environ.get("BACKUP_KEEP") or 14)

# Las tablas sin las cuales la copia no sirve de nada. Si una falta, algo se
# rompio a mitad y es mejor saberlo ahora.
TABLAS_ESENCIALES = ("users", "test_results", "passport_profiles", "passport_stamps")


def ruta_base() -> Path:
    from_env = os.environ.get("USERS_DB_PATH")
    if from_env:
        return Path(from_env)
    return Path(__file__).resolve().parent / "data" / "users.sqlite3"


def carpeta_copias() -> Path:
    """Fuera del repo por defecto.

    Una copia junto al original no protege del fallo mas probable: el disco.
    Y dentro del repo acabaria en un commit.
    """
    from_env = os.environ.get("BACKUP_DIR")
    if from_env:
        return Path(from_env)
    return ruta_base().parent / "backups"


def crear(origen: Path | None = None, destino: Path | None = None) -> Path:
    origen = Path(origen) if origen else ruta_base()
    if not origen.exists():
        raise SystemExit(f"No existe la base en {origen}")

    destino = Path(destino) if destino else carpeta_copias()
    destino.mkdir(parents=True, exist_ok=True)
    marca = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    archivo = destino / f"users-{marca}.sqlite3"

    # `backup()` copia pagina a pagina con la base viva. No hace falta parar la
    # aplicacion ni echar a nadie.
    fuente = sqlite3.connect(f"file:{origen}?mode=ro", uri=True)
    try:
        copia = sqlite3.connect(archivo)
        try:
            fuente.backup(copia)
        finally:
            copia.close()
    finally:
        fuente.close()

    ok, detalle = verificar(archivo)
    if not ok:
        archivo.unlink(missing_ok=True)
        raise SystemExit(f"La copia no paso la verificacion y se descarto: {detalle}")
    return archivo


def verificar(archivo: Path) -> tuple[bool, str]:
    """Abre la copia y comprueba que sirve para restaurar."""
    archivo = Path(archivo)
    if not archivo.exists():
        return False, "el archivo no existe"
    conexion = None
    try:
        conexion = sqlite3.connect(f"file:{archivo}?mode=ro", uri=True)
        estado = conexion.execute("PRAGMA integrity_check").fetchone()[0]
        if estado != "ok":
            return False, f"integrity_check dijo: {estado}"
        presentes = {
            fila[0] for fila in conexion.execute(
                "SELECT name FROM sqlite_master WHERE type='table'")
        }
        faltan = [t for t in TABLAS_ESENCIALES if t not in presentes]
        if faltan:
            return False, f"faltan tablas: {', '.join(faltan)}"
        usuarios = conexion.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    except sqlite3.Error as error:
        return False, f"no se pudo abrir: {error}"
    finally:
        # Cerrar siempre: `with sqlite3.connect(...)` no lo hace, y una copia
        # con el descriptor abierto no se puede rotar ni borrar en Windows.
        if conexion is not None:
            conexion.close()
    return True, f"{usuarios} usuarios, integridad ok"


def rotar(destino: Path | None = None, conservar: int = COPIAS_A_CONSERVAR) -> list[Path]:
    destino = Path(destino) if destino else carpeta_copias()
    copias = sorted(destino.glob("users-*.sqlite3"))
    sobrantes = copias[:-conservar] if conservar > 0 else []
    for vieja in sobrantes:
        vieja.unlink(missing_ok=True)
    return sobrantes


def listar(destino: Path | None = None) -> list[tuple[Path, int]]:
    destino = Path(destino) if destino else carpeta_copias()
    if not destino.exists():
        return []
    return [(p, p.stat().st_size) for p in sorted(destino.glob("users-*.sqlite3"))]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--list", action="store_true", help="listar las copias existentes")
    parser.add_argument("--verify", metavar="ARCHIVO", help="verificar una copia concreta")
    parser.add_argument("--keep", type=int, default=COPIAS_A_CONSERVAR,
                        help=f"cuantas conservar (por defecto {COPIAS_A_CONSERVAR})")
    args = parser.parse_args(argv)

    if args.verify:
        ok, detalle = verificar(Path(args.verify))
        print(f"{'OK' if ok else 'FALLA'}  {args.verify}  {detalle}")
        return 0 if ok else 1

    if args.list:
        copias = listar()
        if not copias:
            print(f"No hay copias en {carpeta_copias()}")
            return 0
        print(f"{len(copias)} copia(s) en {carpeta_copias()}:")
        for archivo, tam in copias:
            ok, detalle = verificar(archivo)
            print(f"  {'OK ' if ok else 'MAL'} {archivo.name}  {tam/1024:.0f} KB  {detalle}")
        return 0

    archivo = crear()
    _, detalle = verificar(archivo)
    borradas = rotar(conservar=args.keep)
    print(f"[backup] {archivo}  ({detalle})")
    if borradas:
        print(f"[backup] rotadas {len(borradas)} copia(s) antigua(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
