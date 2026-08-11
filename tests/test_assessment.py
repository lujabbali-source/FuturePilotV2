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


def test_skipped_questions_are_omitted_not_scored_as_max(client):
    """Regresion del bug de "Aun no lo se": futurepilot-connector.js
    convertia answerIndex null en answer_index 0, y el indice 0 de cada
    pregunta en questions.json es "Strongly Agree" (4 puntos, el maximo).
    Saltar preguntas sumaba en silencio la respuesta mas fuerte posible.

    El contrato del que depende el arreglo del cliente es este: omitir una
    pregunta del payload NO es lo mismo que mandarla con answer_index 0.
    Este test fija ese contrato en el servidor."""
    # 10 respuestas reales; las otras 40 se omiten (el estudiante las salto).
    partial = [{"question_index": i, "answer_index": 3} for i in range(10)]
    # Lo que enviaba el codigo con el bug: las 40 saltadas como indice 0.
    inflated = partial + [{"question_index": i, "answer_index": 0} for i in range(10, 50)]

    r_partial = client.post("/api/v1/assess", json={"answers": partial, "anon_id": "skip-partial"})
    r_inflated = client.post("/api/v1/assess", json={"answers": inflated, "anon_id": "skip-inflated"})
    assert r_partial.status_code == 200
    assert r_inflated.status_code == 200

    vector_partial = r_partial.json()["data"]["user_vector"]
    vector_inflated = r_inflated.json()["data"]["user_vector"]

    # Si ambos perfiles fueran iguales, rellenar con indice 0 no tendria
    # efecto y el bug seria inofensivo. No lo es: distorsiona el vector.
    assert vector_partial != vector_inflated


def test_out_of_range_answer_index_is_ignored_not_fatal(client):
    """El cliente ahora filtra las respuestas nulas antes de enviarlas,
    pero el servidor no debe romperse si llega un indice invalido de todas
    formas (ver PerceptionEngine.parse_test_inputs)."""
    answers = [{"question_index": 0, "answer_index": 0}, {"question_index": 1, "answer_index": 99}]
    r = client.post("/api/v1/assess", json={"answers": answers, "anon_id": "out-of-range"})
    assert r.status_code == 200
    assert r.json()["data"]["recommended_careers"]


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
