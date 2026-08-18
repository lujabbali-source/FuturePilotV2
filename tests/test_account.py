"""Pantalla de cuenta: los datos que la alimentan y las acciones que ofrece.

Antes /assessment solo sabia del ultimo resultado del test, asi que era una
hoja de resultados. Estos tests cubren lo que la convierte en una cuenta:
progreso real, actividad, historial y los ajustes.
"""

# La contrasena por defecto de la fixture register_and_login.
PASSWORD = "password123"


def _make_progress(client, headers):
    """Deja rastro de actividad real, del mismo modo que la aplicacion."""
    for evento in (
        {"event_type": "country_explored", "subject_id": "co", "subject_label": "Colombia"},
        {"event_type": "city_explored", "subject_id": "bog", "subject_label": "Bogota"},
        {"event_type": "university_viewed", "subject_id": "u1", "subject_label": "UNAL"},
    ):
        client.post("/api/v1/passport/events", headers=headers, json=evento)


def test_dashboard_gathers_the_whole_account(client, register_and_login, sample_answers):
    """La pantalla es una sola, asi que los datos llegan en una sola peticion:
    cuatro llamadas en paralelo la pintarian a trozos."""
    _, headers = register_and_login(name="Lu")
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})
    _make_progress(client, headers)

    d = client.get("/api/v1/me/dashboard", headers=headers).json()

    assert d["account"]["email"] and d["account"]["passport_id"].startswith("FP-")
    assert d["latest"]["results"]["personality"]
    assert d["journey"], "el recorrido no puede venir vacio"
    assert d["progress"]["countries_explored"] == 1
    assert any(e["event_type"] == "country_explored" for e in d["recent_activity"])
    assert d["stamps"], "explorar un pais deja sello"


def test_dashboard_requires_a_session(client):
    """Son datos personales: sin token no se sirven."""
    assert client.get("/api/v1/me/dashboard").status_code == 401


def test_journey_counts_real_actions_only(client, register_and_login, sample_answers):
    """Cada paso del recorrido sale de algo que el estudiante hizo. Un
    porcentaje que suba solo por entrar no le dice nada a nadie."""
    _, headers = register_and_login()
    vacio = {p["key"]: p for p in client.get("/api/v1/me/dashboard", headers=headers).json()["journey"]}
    assert not any(p["complete"] for p in vacio.values()), "nada esta hecho todavia"

    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})
    client.put("/api/v1/passport/profile", headers=headers,
               json={"country": "Colombia", "city": "Bogota"})
    client.put("/api/v1/passport/goals", headers=headers,
               json={"goals": {"dream_university": "MIT"}})

    lleno = {p["key"]: p for p in client.get("/api/v1/me/dashboard", headers=headers).json()["journey"]}
    assert lleno["test"]["complete"]
    assert lleno["profile"]["complete"], "pais + ciudad completan la identificacion"
    assert lleno["goal"]["complete"], "la universidad objetivo completa la meta"
    assert not lleno["explore"]["complete"], "no se ha explorado ningun pais"


def test_history_keeps_every_attempt(client, register_and_login, sample_answers):
    """Repetir el test nunca borro el anterior, pero ese historial no se veia
    por ningun lado."""
    _, headers = register_and_login()
    for _ in range(2):
        a = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
        client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": a["result_id"]})

    d = client.get("/api/v1/me/dashboard", headers=headers).json()
    assert d["latest"] is not None
    assert len(d["history"]) == 1, "el mas reciente va aparte; el resto es historial"
    # Y el historial tambien viene redactado, no en bruto.
    assert d["history"][0]["results"]["personality"]


def test_dashboard_reads_in_both_languages(client, register_and_login, sample_answers):
    _, headers = register_and_login()
    a = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": a["result_id"]})

    es = client.get("/api/v1/me/dashboard?lang=es", headers=headers).json()
    en = client.get("/api/v1/me/dashboard?lang=en", headers=headers).json()
    assert es["latest"]["results"]["personality"] != en["latest"]["results"]["personality"]


def test_cluster_evidence_backs_every_dimension(client, sample_answers):
    """La pantalla dice "medido en N respuestas tuyas". Ese N es el recuento
    real de preguntas que alimentaron el cluster, no un adorno."""
    data = client.post("/api/v1/assess", json={"answers": sample_answers}).json()["data"]
    evidence = data["cluster_evidence"]

    assert set(evidence) == set(data["user_vector"])
    total = sum(c["answered"] for c in evidence.values())
    assert total == len(sample_answers), "cada respuesta alimenta exactamente un cluster"


def test_change_password_demands_the_current_one(client, register_and_login):
    """Tener la sesion abierta no puede bastar para quedarse con la cuenta:
    un token robado, o un portatil que alguien dejo abierto, tampoco."""
    user, headers = register_and_login()

    malo = client.post("/api/v1/me/password", headers=headers,
                       json={"current_password": "no-es-esta", "new_password": "Nueva-2026-larga"})
    assert malo.status_code == 401

    bueno = client.post("/api/v1/me/password", headers=headers,
                        json={"current_password": PASSWORD, "new_password": "Nueva-2026-larga"})
    assert bueno.status_code == 200

    # Cambiar la contrasena cierra TODAS las sesiones, incluida la que la
    # cambio: si el motivo fue que alguien mas entro, ese alguien sale.
    assert client.get("/api/v1/me/dashboard", headers=headers).status_code == 401
    nueva = client.post("/api/v1/auth/login",
                        json={"email": user["email"], "password": "Nueva-2026-larga"})
    assert nueva.status_code == 200


def test_export_returns_everything_we_hold(client, register_and_login, sample_answers):
    """El estudiante puede llevarse lo suyo sin pedirselo a nadie."""
    _, headers = register_and_login()
    a = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": a["result_id"]})

    export = client.get("/api/v1/me/export", headers=headers).json()
    assert {"account", "passport_profile", "passport_stamps", "test_results"} <= set(export)
    assert export["test_results"], "el resultado del test tiene que estar"
    # Sin traducir ni resumir: es una copia de los datos, no una pantalla.
    assert "archetype_key" in export["test_results"][0]["results"]


def test_delete_account_removes_the_person_not_the_statistics(
    client, register_and_login, sample_answers, app_module
):
    """Borrar la cuenta quita los datos personales. Los resultados del test
    sobreviven desligados: dejan de apuntar a nadie, pero no falsean el
    historico agregado de la plataforma."""
    user, headers = register_and_login()
    a = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": a["result_id"]})
    antes = app_module.users_store.count_test_results()

    assert client.request("DELETE", "/api/v1/me", headers=headers,
                          json={"password": "no-es-esta"}).status_code == 401

    assert client.request("DELETE", "/api/v1/me", headers=headers,
                          json={"password": PASSWORD}).status_code == 200

    # La sesion muere y no se puede volver a entrar.
    assert client.get("/api/v1/me/dashboard", headers=headers).status_code == 401
    assert client.post("/api/v1/auth/login",
                       json={"email": user["email"], "password": PASSWORD}).status_code == 401
    assert app_module.users_store.count_test_results() == antes
