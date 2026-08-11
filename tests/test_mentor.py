"""AI Mentor: usa datos reales del diagnostico (no texto fijo), reconoce
carreras mencionadas por nombre, y su memoria queda correctamente asociada
a la cuenta real tras reclamar el resultado (bug corregido esta sesion:
antes quedaba en el balde compartido "default_student")."""


def test_chat_without_diagnosis_says_so(client, register_and_login):
    _, headers = register_and_login()
    r = client.post("/api/v1/mentor/chat", headers=headers, json={"message": "cual es mi roadmap"})
    assert r.status_code == 200
    assert "Todavía no tengo un diagnóstico" in r.json()["response"]


def test_chat_uses_real_roadmap_after_claiming_result(client, register_and_login, sample_answers):
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})

    roadmap = assess["data"]["roadmap"]
    r = client.post("/api/v1/mentor/chat", headers=headers, json={"message": "cual es mi roadmap"})
    response = r.json()["response"]

    # La respuesta debe citar el titulo real de al menos el primer
    # checkpoint del roadmap calculado, no un texto generico fijo.
    assert roadmap["checkpoints"][0]["title"] in response


def test_chat_recognizes_named_career_from_catalog(client, register_and_login, sample_answers):
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})

    top_title = assess["data"]["recommended_careers"][0]["title"]
    r = client.post("/api/v1/mentor/chat", headers=headers, json={"message": f"hablame de {top_title}"})
    response = r.json()["response"]
    assert top_title in response


def test_chat_greeting_uses_account_name(client, register_and_login, sample_answers):
    user, headers = register_and_login(name="Valentina")
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})

    r = client.post("/api/v1/mentor/chat", headers=headers, json={"message": "hola"})
    assert "Valentina" in r.json()["response"]
