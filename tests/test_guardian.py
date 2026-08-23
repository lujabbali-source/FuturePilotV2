# -*- coding: utf-8 -*-
"""Menores de edad y el correo de su acudiente.

La aplicacion no sabia la edad de nadie: la tabla users tenia email, nombre,
contrasena y poco mas. Sin eso no se puede pedir permiso a un adulto, porque
no se sabe a quien hay que pedirselo.

Se guarda un booleano y no una fecha de nacimiento a proposito: basta para
decidir y es un dato menos sobre un menor.

Es autodeclarado, y eso no tiene arreglo tecnico - un adolescente puede
desmarcar la casilla. Lo que cambia es que ahora se pregunta y queda
constancia de la respuesta.
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent


def _registrar(client, **extra):
    cuerpo = {"email": extra.pop("email", "menor@example.com"),
              "password": "password123", "name": "Ana"}
    cuerpo.update(extra)
    return client.post("/api/v1/auth/register", json=cuerpo)


def test_a_minor_must_give_a_guardian_email(client):
    """Marcar la casilla sin dejar correo dejaria una cuenta de menor sin
    nadie a quien avisar: lo peor de los dos mundos, porque consta que es
    menor y no hay forma de pedir el permiso."""
    r = _registrar(client, is_minor=True)
    assert r.status_code == 422, f"acepto un menor sin acudiente: {r.status_code}"


def test_the_guardian_email_has_to_be_someone_else(client):
    """El atajo obvio. No detecta a un menor decidido a mentir - puede poner
    cualquier otra direccion - pero si el que se toma sin pensarlo, y de paso
    el error de teclear dos veces el mismo correo."""
    r = _registrar(client, email="ana@example.com", is_minor=True,
                   guardian_email="ana@example.com")
    assert r.status_code == 422, "acepto que el menor fuera su propio acudiente"

    # Y con mayusculas distintas, que es la forma facil de saltarselo.
    r = _registrar(client, email="ana@example.com", is_minor=True,
                   guardian_email="ANA@Example.com")
    assert r.status_code == 422, "la comparacion distingue mayusculas"


def test_a_minor_registers_and_the_guardian_is_recorded(client):
    r = _registrar(client, email="hijo@example.com", is_minor=True,
                   guardian_email="madre@example.com")
    assert r.status_code == 201, r.text
    usuario = r.json()["user"]
    assert usuario["is_minor"] is True
    assert usuario["guardian_email"] == "madre@example.com"


def test_an_adult_leaves_nobody_elses_email_behind(client):
    """Pedir lo minimo va en las dos direcciones. Si dice ser mayor de edad,
    el correo de un tercero no se guarda aunque el cliente lo mande."""
    r = _registrar(client, email="mayor@example.com", is_minor=False,
                   guardian_email="alguien@example.com")
    assert r.status_code == 201, r.text
    usuario = r.json()["user"]
    assert usuario["is_minor"] is False
    assert usuario["guardian_email"] is None, \
        "se guardo el correo de un tercero para alguien que no lo necesita"


def test_registering_without_saying_anything_still_works(client):
    """Las cuentas viejas y cualquier cliente que no mande los campos nuevos
    siguen funcionando: por defecto, mayor de edad y sin acudiente."""
    r = _registrar(client, email="silencio@example.com")
    assert r.status_code == 201, r.text
    assert r.json()["user"]["is_minor"] is False


def test_the_guardian_email_is_lowercased_like_the_others(client):
    """Si no, escribir el mismo correo con otra caja crearia dos acudientes
    distintos para la misma persona."""
    r = _registrar(client, email="hija@example.com", is_minor=True,
                   guardian_email="  Padre@Example.COM  ")
    assert r.status_code == 201, r.text
    assert r.json()["user"]["guardian_email"] == "padre@example.com"


# --- La pantalla ----------------------------------------------------------

def test_the_question_is_actually_on_the_form():
    """El backend puede estar perfecto y la pregunta no aparecer nunca."""
    html = (RAIZ / "web" / "login.html").read_text(encoding="utf-8")
    assert 'id="isMinorCheck"' in html, "no hay casilla de menor de edad en el formulario"
    assert 'name="guardianEmail"' in html, "no hay campo para el correo del acudiente"


def test_both_languages_have_the_new_texts():
    """Un texto que falta sale como su clave cruda en pantalla."""
    claves_campos = ("isMinor", "guardianEmail", "guardianHint")
    claves_errores = ("guardianEmail", "guardianSame")
    for idioma in ("es", "en"):
        d = json.loads((RAIZ / "web" / "src" / "locales" / idioma / "login.json")
                       .read_text(encoding="utf-8"))
        for k in claves_campos:
            assert d["fields"].get(k), f"falta fields.{k} en {idioma}"
        for k in claves_errores:
            assert d["errors"].get(k), f"falta errors.{k} en {idioma}"


def test_the_store_itself_refuses_to_keep_it(tmp_path, monkeypatch):
    """Directo contra el almacen, sin pasar por la API.

    Hay dos capas que anulan el acudiente de quien dice ser mayor: el
    validador de la peticion y el propio register(). Quitar la del almacen no
    hacia fallar ningun test, porque la de arriba seguia tapando el hueco -
    y ese es justo el guard que hace falta el dia que algo llame a register()
    sin pasar por la API.
    """
    monkeypatch.setenv("PBKDF2_ITERATIONS_TEST_ONLY", "1000")
    from backend.users_store import UsersStore
    store = UsersStore(tmp_path / "users.sqlite3")

    usuario = store.register("adulto@example.com", "password123", "Adulto",
                             is_minor=False, guardian_email="tercero@example.com")
    assert usuario["guardian_email"] is None, \
        "el almacen guardo el correo de un tercero para alguien que no lo necesita"

    menor = store.register("menor@example.com", "password123", "Menor",
                           is_minor=True, guardian_email="  Madre@Example.COM ")
    assert menor["is_minor"] is True
    assert menor["guardian_email"] == "madre@example.com"
