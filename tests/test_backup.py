# -*- coding: utf-8 -*-
"""Copias de seguridad de la base de usuarios.

El test que importa es el de restaurar. Una copia que nadie ha abierto nunca
no es una copia: es un archivo que se parece a una, y la diferencia solo se
descubre el dia que hace falta.
"""
import gc
import sqlite3
from pathlib import Path

import pytest

from backend import backup
from backend.users_store import UsersStore


@pytest.fixture()
def base(tmp_path, monkeypatch):
    """Una base real con una cuenta dentro."""
    monkeypatch.setenv("PBKDF2_ITERATIONS_TEST_ONLY", "1000")
    ruta = tmp_path / "users.sqlite3"
    store = UsersStore(ruta)
    store.register("ana@example.com", "password123", "Ana")
    return ruta, store


def test_a_backup_can_actually_be_restored(base, tmp_path):
    """La prueba de fuego: se hace la copia, se destruye el original y se
    recupera la cuenta desde la copia."""
    ruta, store = base
    copia = backup.crear(ruta, tmp_path / "copias")

    # `with self.connect()` en users_store gestiona la transaccion, no la
    # conexion: en CPython el recolector la cierra al soltar la referencia,
    # pero aqui hay que forzarlo o Windows no deja borrar el archivo.
    del store
    gc.collect()

    # Se borra la base entera, como si el disco se hubiera perdido.
    for sufijo in ("", "-wal", "-shm"):
        Path(str(ruta) + sufijo).unlink(missing_ok=True)
    assert not ruta.exists()

    # Restaurar es copiar el archivo de vuelta.
    ruta.write_bytes(copia.read_bytes())
    recuperado = UsersStore(ruta).find_user_id_by_email("ana@example.com")
    assert recuperado, "la cuenta no sobrevivio a la restauracion"
    assert UsersStore(ruta).get_user_by_id(recuperado)["email"] == "ana@example.com"


def test_the_copy_is_made_with_the_database_running(base, tmp_path):
    """Con WAL, copiar el .sqlite3 a secas puede dar un archivo viejo o roto:
    los cambios recientes viven en el -wal hasta que se consolidan. La API de
    respaldo de sqlite existe justo para esto, y hay que poder hacerla sin
    parar la aplicacion."""
    ruta, store = base
    # Una escritura despues de abrir la base, que es lo que se queda en el WAL.
    store.register("beto@example.com", "password123", "Beto")

    copia = backup.crear(ruta, tmp_path / "copias")
    conexion = sqlite3.connect(f"file:{copia}?mode=ro", uri=True)
    try:
        correos = {f[0] for f in conexion.execute("SELECT email FROM users")}
    finally:
        conexion.close()
    assert "beto@example.com" in correos, \
        "la copia perdio una escritura reciente: se hizo sin la API de respaldo"


def test_a_corrupt_copy_is_thrown_away_not_kept(base, tmp_path, monkeypatch):
    """Un archivo que parece una copia y no lo es es peor que no tener nada:
    da por resuelto el problema hasta el dia que hay que usarlo."""
    ruta, _ = base

    def romper(archivo):
        return False, "prueba: verificacion forzada a fallar"

    monkeypatch.setattr(backup, "verificar", romper)
    destino = tmp_path / "copias"
    with pytest.raises(SystemExit):
        backup.crear(ruta, destino)
    assert not list(destino.glob("*.sqlite3")), "quedo un archivo que no paso la verificacion"


def test_verification_notices_a_missing_table(base, tmp_path):
    """No basta con que el archivo abra: tiene que traer las tablas sin las
    cuales no se puede restaurar nada."""
    ruta, _ = base
    copia = backup.crear(ruta, tmp_path / "copias")
    assert backup.verificar(copia)[0]

    conexion = sqlite3.connect(copia)
    try:
        conexion.execute("DROP TABLE passport_stamps")
        conexion.commit()
    finally:
        conexion.close()
    ok, detalle = backup.verificar(copia)
    assert not ok and "passport_stamps" in detalle


def test_old_copies_are_rotated_away(base, tmp_path):
    """Sin rotacion, el disco se llena y las copias dejan de escribirse - y
    eso se descubre cuando ya no hay ninguna reciente."""
    ruta, _ = base
    destino = tmp_path / "copias"
    for _ in range(5):
        backup.crear(ruta, destino)
        # El nombre lleva la hora al segundo; se separan para que no colisionen.
        for i, archivo in enumerate(sorted(destino.glob("users-*.sqlite3"))):
            archivo.rename(destino / f"users-2026010{i}-000000.sqlite3")

    backup.rotar(destino, conservar=3)
    quedan = list(destino.glob("users-*.sqlite3"))
    assert len(quedan) == 3, f"quedaron {len(quedan)} copias en vez de 3"


def test_backups_never_reach_the_repository():
    """Una copia es la base entera: correos, hashes y las fotos del pasaporte.
    La primera que se creo NO estaba ignorada y se habria subido a GitHub con
    los usuarios dentro."""
    raiz = Path(__file__).resolve().parent.parent
    ignore = (raiz / ".gitignore").read_text(encoding="utf-8")
    assert "backups/" in ignore, ".gitignore no excluye las copias de seguridad"


def test_the_admin_panel_notices_when_backups_stop(app_module, tmp_path, monkeypatch):
    """Un cron que falla no avisa: el respaldo deja de correr y nadie se entera
    hasta el dia que hace falta. Lo unico que convierte una copia en una
    garantia es que alguien mire si sigue viva."""
    import time as _time

    vacia = tmp_path / "sin-copias"
    monkeypatch.setattr(backup, "listar", lambda destino=None: [])
    monkeypatch.setattr(backup, "carpeta_copias", lambda: vacia)
    assert app_module._check_backups()["status"] == "error", \
        "el panel no avisa cuando no hay ninguna copia"

    # Una copia de hace una semana: existe, pero el respaldo esta parado.
    vieja = tmp_path / "users-vieja.sqlite3"
    vieja.write_bytes(b"x")
    hace_una_semana = _time.time() - 7 * 24 * 3600
    import os as _os
    _os.utime(vieja, (hace_una_semana, hace_una_semana))
    monkeypatch.setattr(backup, "listar", lambda destino=None: [(vieja, 1)])
    monkeypatch.setattr(backup, "verificar", lambda archivo: (True, "de mentira"))
    estado = app_module._check_backups()
    assert estado["status"] == "warning", "el panel da por buena una copia de hace una semana"
    assert "dias" in estado["detail"]
