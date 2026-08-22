# -*- coding: utf-8 -*-
"""La pregunta de disposicion a estudiar fuera.

Es la unica pregunta nueva del onboarding del globo. Las otras cuatro que se
propusieron no se hicieron: dos ya las responde el pasaporte (idiomas y pais
objetivo) y dos no se pueden usar todavia - hay costo de vida en 1 de 223
ciudades y tipo de universidad en el 7% de los registros.
"""
import pytest


def _preferencias(client, headers):
    return client.get("/api/v1/me/preferences", headers=headers).json()


def test_the_answer_is_remembered(client, register_and_login):
    _, headers = register_and_login()
    assert _preferencias(client, headers)["preferences"] == {}

    r = client.put("/api/v1/me/preferences",
                   json={"mobility": "yes_if_viable"}, headers=headers)
    assert r.status_code == 200
    assert r.json()["preferences"]["mobility"] == "yes_if_viable"
    assert r.json()["preferences"]["mobility_answered_at"]

    # Y sigue ahi al volver a entrar, que es lo que evita preguntarlo otra vez.
    assert _preferencias(client, headers)["preferences"]["mobility"] == "yes_if_viable"


def test_only_the_four_real_answers_are_accepted(client, register_and_login):
    """Se guarda la CLAVE, no la frase: el estudiante puede cambiar de idioma
    despues de responder, y una respuesta congelada en castellano se leeria en
    castellano para siempre. Si entrara texto libre, el motor tendria que
    adivinar que quiso decir."""
    _, headers = register_and_login()
    for malo in ("Sí, definitivamente", "yes", "TAL_VEZ", "", "si_claro"):
        r = client.put("/api/v1/me/preferences", json={"mobility": malo}, headers=headers)
        assert r.status_code == 422, f"acepto {malo!r}"
    assert _preferencias(client, headers)["preferences"] == {}


@pytest.mark.parametrize("valida", ["yes_definitely", "yes_if_viable", "maybe", "prefer_home"])
def test_every_option_the_screen_offers_is_accepted(client, register_and_login, valida):
    """Si la pantalla ofrece una opcion que el servidor rechaza, el estudiante
    hace clic y no pasa nada."""
    _, headers = register_and_login()
    r = client.put("/api/v1/me/preferences", json={"mobility": valida}, headers=headers)
    assert r.status_code == 200


def test_closing_without_answering_also_counts(client, register_and_login):
    """Cerrar la ventana es una respuesta: significa "ahora no". Sin
    guardarlo, la pregunta reaparece en cada visita y deja de ser una
    invitacion para volverse un peaje."""
    _, headers = register_and_login()
    r = client.put("/api/v1/me/preferences", json={"dismissed": True}, headers=headers)
    assert r.status_code == 200
    assert r.json()["preferences"]["mobility_dismissed_at"]
    assert "mobility" not in r.json()["preferences"], \
        "cerrar no puede inventar una respuesta que nadie dio"


def test_answering_later_does_not_erase_what_was_there(client, register_and_login):
    """Las preferencias se responden de a poco y cada pantalla manda solo lo
    suyo. Si esto reemplazara el objeto entero, la segunda pregunta borraria
    la respuesta de la primera."""
    _, headers = register_and_login()
    client.put("/api/v1/me/preferences", json={"dismissed": True}, headers=headers)
    r = client.put("/api/v1/me/preferences", json={"mobility": "maybe"}, headers=headers)
    guardado = r.json()["preferences"]
    assert guardado["mobility"] == "maybe"
    assert guardado["mobility_dismissed_at"], "se perdio lo anterior"


def test_the_globe_is_told_what_the_passport_already_knows(client, register_and_login):
    """La mitad importante del endpoint.

    Preguntarle al estudiante los idiomas que habla o el pais al que quiere ir
    seria hacerle repetir lo que ya escribio en el pasaporte. El globo recibe
    esos datos para no volver a pedirlos.
    """
    _, headers = register_and_login()
    client.put("/api/v1/passport/profile",
               json={"languages": ["Español", "Inglés"]}, headers=headers)
    client.put("/api/v1/passport/goals",
               json={"goals": {"target_country": "España",
                               "languages_to_learn": "Alemán"}}, headers=headers)

    conocido = _preferencias(client, headers)["known"]
    assert conocido["languages"] == ["Español", "Inglés"]
    assert conocido["target_country"] == "España"
    assert conocido["languages_to_learn"] == "Alemán"


def test_an_empty_request_is_refused(client, register_and_login):
    """Sin esto, una peticion vacia dejaria una fila tocada sin nada dentro y
    la pantalla creeria que ya respondio."""
    _, headers = register_and_login()
    assert client.put("/api/v1/me/preferences", json={}, headers=headers).status_code == 400


def test_preferences_need_a_session(client):
    assert client.get("/api/v1/me/preferences").status_code in (401, 403)
    assert client.put("/api/v1/me/preferences",
                      json={"mobility": "maybe"}).status_code in (401, 403)


def test_deleting_the_account_takes_the_preferences(client, register_and_login):
    """El perfil del pasaporte se borra en cascada; esto lo comprueba, porque
    es una preferencia de un menor guardada en una columna nueva y seria facil
    que se quedara fuera del borrado."""
    _, headers = register_and_login()
    client.put("/api/v1/me/preferences", json={"mobility": "yes_definitely"}, headers=headers)
    # El borrado pide la contraseña: tener la sesión abierta no basta para
    # destruir una cuenta.
    borrado = client.request("DELETE", "/api/v1/me",
                             json={"password": "password123"}, headers=headers)
    assert borrado.status_code == 200, borrado.text
    assert client.get("/api/v1/me/preferences", headers=headers).status_code in (401, 403)
