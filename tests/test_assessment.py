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


def test_claim_result_is_idempotent_for_the_same_account(client, register_and_login, sample_answers):
    """Regresion: claim_test_result hacia UPDATE ... WHERE user_id IS NULL y
    devolvia False en cuanto la fila ya tenia dueño - incluido el caso de
    que el dueño fuera quien reintenta. Si el UPDATE se confirmaba pero la
    respuesta HTTP se perdia, el cliente reintentaba y recibia 404 para
    siempre sobre un resultado que SI era suyo. Reintentar tiene que dar
    exito, porque el trabajo ya esta hecho."""
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()

    first = client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})
    assert first.status_code == 200

    retry = client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})
    assert retry.status_code == 200, "reintentar un claim propio debe ser exito, no 404"
    # No hay sellos nuevos la segunda vez: ya se otorgaron en la primera.
    assert retry.json()["new_stamps"] == []


def test_claim_retry_does_not_duplicate_passport_activity(client, register_and_login, sample_answers):
    """Los sellos son idempotentes por el UNIQUE de la tabla, pero los
    eventos no: sin el guard de has_passport_event, cada reintento añadia
    otra linea de "Terminó el test" a la actividad reciente."""
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()

    for _ in range(3):
        client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})

    activity = client.get("/api/v1/passport", headers=headers).json()["recent_activity"]
    for event_type in ("test_completed", "roadmap_created"):
        occurrences = [event for event in activity if event["event_type"] == event_type]
        assert len(occurrences) == 1, f"'{event_type}' aparece {len(occurrences)} veces tras 3 claims"


def test_assess_with_token_owns_the_result_immediately(client, register_and_login, sample_answers):
    """Con sesion activa el test ya no nace anonimo: /api/v1/assess acepta
    el bearer (get_current_user_optional) y graba el resultado asociado a
    la cuenta. Asi el resultado no puede quedar huerfano aunque el claim
    posterior falle - el frontend no mandaba la cabecera y desaprovechaba
    esto por completo."""
    _, headers = register_and_login()

    assess = client.post("/api/v1/assess", headers=headers, json={"answers": sample_answers})
    assert assess.status_code == 200

    # Sin haber llamado a claim-result en ningun momento.
    stored = client.get("/api/v1/me/results", headers=headers).json()
    assert stored["results"] is not None
    assert stored["results"]["recommended_careers"]


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
