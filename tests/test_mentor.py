"""AI Mentor: usa datos reales del diagnostico (no texto fijo), reconoce
carreras mencionadas por nombre, y su memoria queda correctamente asociada
a la cuenta real tras reclamar el resultado (bug corregido esta sesion:
antes quedaba en el balde compartido "default_student")."""


def test_chat_without_diagnosis_says_so(client, register_and_login):
    _, headers = register_and_login()
    r = client.post("/api/v1/mentor/chat", headers=headers, json={"message": "cual es mi roadmap"})
    assert r.status_code == 200
    assert "I don't have a diagnosis for you yet" in r.json()["response"]


def test_chat_answers_in_the_requested_language(client, register_and_login):
    """El mentor responde en el idioma que pide la peticion, no en el suyo."""
    _, headers = register_and_login()

    es = client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                     json={"message": "cual es mi roadmap"}).json()["response"]
    en = client.post("/api/v1/mentor/chat?lang=en", headers=headers,
                     json={"message": "cual es mi roadmap"}).json()["response"]

    assert "Todavía no tengo un diagnóstico" in es
    assert "I don't have a diagnosis for you yet" in en


def test_chat_understands_either_language_regardless_of_the_ui(client, register_and_login, sample_answers):
    """Las palabras clave se buscan en los dos idiomas a la vez. Alguien con
    la aplicacion en ingles escribe "cual es mi roadmap" sin pensarlo, y
    adivinar el idioma por el ajuste de pantalla dejaria de entenderle.

    Tambien cubre el plural: "skills" y "habilidades" tienen que reconocerse
    igual que "skill" y "habilidad"."""
    _, headers = register_and_login()
    assess = client.post("/api/v1/assess", json={"answers": sample_answers}).json()
    client.post("/api/v1/me/claim-result", headers=headers, json={"result_id": assess["result_id"]})

    def preguntar(lang, mensaje):
        return client.post(f"/api/v1/mentor/chat?lang={lang}", headers=headers,
                           json={"message": mensaje}).json()["response"]

    # La pregunta en el idioma contrario se entiende, y la respuesta llega en
    # el idioma pedido.
    assert "Journey" in preguntar("en", "cual es mi roadmap")
    assert "Journey" in preguntar("es", "what is my roadmap")

    # Plurales: si cayeran en la respuesta generica, hablarian del roadmap.
    for mensaje in ("what are my skills", "cuales son mis habilidades",
                    "cuales son mis fortalezas", "my strengths"):
        respuesta = preguntar("en", mensaje)
        assert "roadmap" not in respuesta.lower(), f"{mensaje!r} cayo en la respuesta generica"


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
