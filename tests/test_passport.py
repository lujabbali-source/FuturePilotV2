"""Pasaporte FuturePilot: sellos con datos reales, no solo etiquetas."""


def _stamps(client, headers):
    return {s["key"]: s for s in client.get("/api/v1/passport", headers=headers).json()["stamps"]}


def _event(client, headers, tipo, subject_id=None, label=None):
    return client.post("/api/v1/passport/events", headers=headers, json={
        "event_type": tipo, "subject_id": subject_id, "subject_label": label,
    })


def test_a_stamp_carries_its_type_subject_and_rarity(client, register_and_login):
    """Un sello no es solo una etiqueta: el pasaporte dibuja una geometria
    distinta por tipo y necesita saber a que ciudad o universidad se
    refiere. Sin estos campos todos los sellos saldrian iguales."""
    _, headers = register_and_login()
    _event(client, headers, "city_explored", "bogota", "Bogotá")

    sello = _stamps(client, headers)["city_bogota"]
    assert sello["type"] == "city"
    assert sello["subject_id"] == "bogota"
    assert sello["subject_label"] == "Bogotá"
    assert sello["rarity"] == "common"
    assert sello["earned_at"]


def test_each_university_gets_its_own_stamp(client, register_and_login):
    """Antes habia un unico "visito una universidad": daba igual descubrir
    una que treinta. El pasaporte tiene que poder mostrarlas todas."""
    _, headers = register_and_login()
    _event(client, headers, "university_viewed", "uniandes", "Universidad de los Andes")
    _event(client, headers, "university_viewed", "unal", "Universidad Nacional")

    sellos = _stamps(client, headers)
    assert {"univ_uniandes", "univ_unal"} <= set(sellos)
    assert sellos["univ_unal"]["subject_label"] == "Universidad Nacional"


def test_exploring_a_city_used_to_leave_no_trace(client, register_and_login):
    """city_explored ya se registraba como evento pero no daba ningun sello:
    recorrer ciudades no dejaba huella en el pasaporte."""
    _, headers = register_and_login()
    _event(client, headers, "city_explored", "medellin", "Medellín")
    assert "city_medellin" in _stamps(client, headers)


def test_the_continent_stamp_needs_real_mileage(client, register_and_login, app_module):
    """No tiene evento propio: se gana al cruzar un umbral de paises. Es el
    unico sello 'rare' y debe costar de verdad."""
    _, headers = register_and_login()
    umbral = app_module.CONTINENT_STAMP_THRESHOLD

    paises = ["colombia", "brasil", "peru", "chile", "mexico", "argentina", "ecuador", "uruguay",
              "bolivia", "panama"][:umbral]
    for i, pais in enumerate(paises, start=1):
        _event(client, headers, "country_explored", pais, pais.title())
        if i < umbral:
            assert "continent_americas" not in _stamps(client, headers), f"llego con solo {i} paises"

    continente = _stamps(client, headers)["continent_americas"]
    assert continente["type"] == "continent"
    assert continente["rarity"] == "rare"
    assert continente["metadata"]["countries"] >= umbral


def test_setting_a_target_university_stamps_the_passport(client, register_and_login):
    """El sello sale de guardar la meta de verdad, y lo emite el servidor:
    el cliente no puede pedir 'academic_goal_set' por su cuenta."""
    _, headers = register_and_login()
    respuesta = client.put("/api/v1/passport/goals", headers=headers,
                           json={"goals": {"dream_university": "MIT"}})
    assert respuesta.status_code == 200
    assert [s["key"] for s in respuesta.json()["new_stamps"]] == ["academic_goal"]

    sello = _stamps(client, headers)["academic_goal"]
    assert sello["type"] == "academic_goal"
    assert sello["subject_label"] == "MIT"
    assert sello["rarity"] == "milestone"


def test_the_client_cannot_invent_high_value_events(client, register_and_login):
    """Los sellos que exigen accion real (test, roadmap, meta) los emite solo
    el servidor. Si el cliente pudiera reportarlos, el pasaporte dejaria de
    ser un registro de lo que el estudiante hizo."""
    _, headers = register_and_login()
    for tipo in ("test_completed", "roadmap_created", "academic_goal_set", "ai_conversation"):
        assert _event(client, headers, tipo, "x", "X").status_code == 422, tipo


def test_stamps_are_not_awarded_twice(client, register_and_login):
    """Volver a la misma ciudad no da un sello nuevo, y new_stamps queda
    vacio para que la UI no repita la animacion de estampado."""
    _, headers = register_and_login()
    primera = _event(client, headers, "city_explored", "cali", "Cali").json()
    segunda = _event(client, headers, "city_explored", "cali", "Cali").json()

    assert len(primera["new_stamps"]) == 1
    assert segunda["new_stamps"] == []
    assert len([k for k in _stamps(client, headers) if k == "city_cali"]) == 1


def test_the_passport_exposes_a_stable_id(client, register_and_login):
    """La cubierta lleva un identificador. Se deriva en el servidor del id
    real de la cuenta para que sea el mismo en cualquier dispositivo."""
    _, headers = register_and_login()
    usuario = client.get("/api/v1/passport", headers=headers).json()["user"]
    assert usuario["passport_id"].startswith("FP-")
    assert usuario["passport_id"] == client.get("/api/v1/passport", headers=headers).json()["user"]["passport_id"]


def test_a_new_passport_starts_empty(client, register_and_login):
    """Al principio esta casi vacio: es lo que hace que llenarlo signifique
    algo. La pagina de sellos existe igual, con sus huecos."""
    _, headers = register_and_login()
    assert _stamps(client, headers) == {}
"""Pasaporte: perfil/objetivos editables, eventos rastreables y sellos
(idempotentes - el mismo evento no debe otorgar el sello dos veces)."""


def test_passport_starts_empty_for_new_account(client, register_and_login):
    _, headers = register_and_login()
    r = client.get("/api/v1/passport", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["stamps"] == []
    # El progreso se pide a /api/v1/me/dashboard: el pasaporte no lo pinta.
    assert client.get("/api/v1/me/dashboard", headers=headers).json()["progress"]["tests_completed"] == 0


def test_update_profile_and_goals(client, register_and_login):
    _, headers = register_and_login()

    r = client.put(
        "/api/v1/passport/profile",
        headers=headers,
        json={"country": "Colombia", "city": "Bogotá", "languages": ["es", "en"]},
    )
    assert r.status_code == 200
    assert r.json()["profile"]["country"] == "Colombia"

    r = client.put(
        "/api/v1/passport/goals",
        headers=headers,
        json={"goals": {"target_country": "Canada", "desired_career": "Data Scientist"}},
    )
    assert r.status_code == 200
    assert r.json()["profile"]["goals"]["target_country"] == "Canada"


def test_test_completion_awards_stamps(client, register_and_login, sample_answers):
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})

    passport = client.get("/api/v1/passport", headers=headers).json()
    stamp_keys = {s["key"] for s in passport["stamps"]}
    assert "test_completed" in stamp_keys
    assert "roadmap_created" in stamp_keys
    assert client.get("/api/v1/me/dashboard", headers=headers).json()["progress"]["tests_completed"] == 1


def test_country_explored_event_awards_stamp_once(client, register_and_login):
    _, headers = register_and_login()

    r1 = client.post(
        "/api/v1/passport/events",
        headers=headers,
        json={"event_type": "country_explored", "subject_id": "colombia", "subject_label": "Colombia"},
    )
    assert r1.status_code == 200
    first_stamps = r1.json().get("new_stamps", [])
    assert len(first_stamps) == 1

    # Repetir el mismo pais no debe volver a "otorgar" el sello.
    r2 = client.post(
        "/api/v1/passport/events",
        headers=headers,
        json={"event_type": "country_explored", "subject_id": "colombia", "subject_label": "Colombia"},
    )
    assert r2.json().get("new_stamps", []) == []

    passport = client.get("/api/v1/passport", headers=headers).json()
    colombia_stamps = [s for s in passport["stamps"] if s["key"] == "country_colombia"]
    assert len(colombia_stamps) == 1


def test_event_type_must_be_client_allowed(client, register_and_login):
    _, headers = register_and_login()
    r = client.post(
        "/api/v1/passport/events",
        headers=headers,
        json={"event_type": "ai_conversation"},  # solo otorgable server-side, no desde el cliente
    )
    assert r.status_code == 422


def test_ai_chat_awards_stamp_on_first_message(client, register_and_login):
    _, headers = register_and_login()
    r = client.post("/api/v1/mentor/chat", headers=headers, json={"message": "hola"})
    assert r.status_code == 200
    stamp_keys = {s["key"] for s in r.json().get("new_stamps", [])}
    assert "ai_chat" in stamp_keys

    # Un segundo mensaje no debe volver a otorgar el mismo sello.
    r2 = client.post("/api/v1/mentor/chat", headers=headers, json={"message": "hola de nuevo"})
    assert r2.json().get("new_stamps", []) == []


def test_passport_does_not_duplicate_the_account_screen(client, register_and_login, sample_answers):
    """El pasaporte tenia una pagina de perfil vocacional y otra de recuento
    de progreso. Las dos estan ahora en la pantalla de cuenta, con el vector
    completo y el recorrido enlazado - alli son mejores, y en dos sitios eran
    dos verdades que podian discrepar.

    El pasaporte se queda con lo que solo es suyo: identidad, objetivos y
    sellos. Y deja de leer y traducir el ultimo resultado del test en cada
    carga para pintar algo que ya no pinta."""
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})

    pasaporte = client.get("/api/v1/passport", headers=headers).json()
    assert "vocational" not in pasaporte
    assert "progress" not in pasaporte
    # Lo suyo sigue entero.
    assert pasaporte["user"]["passport_id"]
    assert "profile" in pasaporte and "stamps" in pasaporte

    # Y lo retirado sigue disponible donde ahora vive.
    cuenta = client.get("/api/v1/me/dashboard", headers=headers).json()
    assert cuenta["latest"]["results"]["personality"]
    assert cuenta["progress"]["tests_completed"] == 1
