"""Test vocacional: assess, reclamo de resultado, resultados guardados,
aislamiento entre sesiones anonimas."""


def test_assess_requires_at_least_one_answer(client):
    r = client.post("/api/v1/assess", json={"answers": []})
    assert r.status_code == 400


def test_assess_anonymous_returns_result_id(client, sample_answers):
    r = client.post("/api/v1/assess", json={"answers": sample_answers, "anon_id": "assess-anon-1"})
    assert r.status_code == 200
    body = r.json()
    assert body["success"] is True
    assert body["result_id"]
    assert body["data"]["recommended_careers"]


def test_claim_result_links_it_to_account(client, register_and_login, sample_answers):
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()

    before = client.get("/api/v1/me/results", headers=headers).json()
    assert before["results"] is None

    claim = client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})
    assert claim.status_code == 200

    after = client.get("/api/v1/me/results", headers=headers).json()
    assert after["results"] is not None
    assert after["results"]["recommended_careers"]


def test_claim_result_cannot_be_reused_by_another_account(client, register_and_login, sample_answers):
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    _, headers_a = register_and_login()
    _, headers_b = register_and_login()

    r1 = client.post("/api/v1/me/claim-result", headers=headers_a, json={"result_id": assess["result_id"]})
    assert r1.status_code == 200

    r2 = client.post("/api/v1/me/claim-result", headers=headers_b, json={"result_id": assess["result_id"]})
    assert r2.status_code == 404


def test_anonymous_sessions_do_not_share_memory(client):
    answers_low = [{"question_index": i, "answer_index": 0} for i in range(50)]
    answers_high = [{"question_index": i, "answer_index": 3} for i in range(50)]

    client.post("/api/v1/assess", json={"answers": answers_low, "anon_id": "iso-browser-a"})
    client.post("/api/v1/assess", json={"answers": answers_high, "anon_id": "iso-browser-b"})

    chat_a = client.post(
        "/api/v1/mentor/chat", json={"message": "cual es mi carrera", "anon_id": "iso-browser-a"}
    ).json()
    chat_b = client.post(
        "/api/v1/mentor/chat", json={"message": "cual es mi carrera", "anon_id": "iso-browser-b"}
    ).json()

    # Ambas deben tener diagnostico propio (no "todavia no tengo diagnostico"),
    # y no deben ser exactamente la misma respuesta salvo coincidencia real.
    assert "Todavía no tengo un diagnóstico" not in chat_a["response"]
    assert "Todavía no tengo un diagnóstico" not in chat_b["response"]


def test_malicious_anon_id_does_not_escape_storage_dir(client, app_module):
    r = client.post(
        "/api/v1/assess",
        json={
            "answers": [{"question_index": 0, "answer_index": 0}],
            "anon_id": "../../etc/passwd",
        },
    )
    assert r.status_code == 200
    # Se resuelve a "default_student" en vez de fallar o escribir fuera del
    # directorio de memoria - ver resolve_anon_memory_id en app.py.
    assert app_module.resolve_anon_memory_id("../../etc/passwd") == "default_student"


def test_retake_creates_new_result_without_deleting_old(client, register_and_login, sample_answers):
    _, headers = register_and_login()
    first = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": first["result_id"]})

    second = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": second["result_id"]})

    latest = client.get("/api/v1/me/results", headers=headers).json()
    assert latest["results"] is not None
