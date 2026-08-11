"""Pasaporte: perfil/objetivos editables, eventos rastreables y sellos
(idempotentes - el mismo evento no debe otorgar el sello dos veces)."""


def test_passport_starts_empty_for_new_account(client, register_and_login):
    _, headers = register_and_login()
    r = client.get("/api/v1/passport", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["vocational"] is None
    assert body["stamps"] == []
    assert body["progress"]["tests_completed"] == 0


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
    assert passport["progress"]["tests_completed"] == 1


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
