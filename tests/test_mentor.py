"""AI Mentor: razona sobre el perfil del estudiante, no empareja palabras.

Cruza el vector de ocho dimensiones con lo que pide cada carrera, responde a
la presion familiar con numeros, compara dos carreras, y recuerda de cual se
estaba hablando. Su memoria queda asociada a la cuenta real tras reclamar el
resultado."""

import re


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


def _perfil_creativo(client, headers, questions):
    """Un perfil MUY marcado en creatividad y trato con personas.

    Hace falta un perfil desequilibrado: con uno plano todas las carreras
    puntuan parecido y no hay nada que explicar."""
    answers = [
        {"question_index": i,
         "answer_index": 0 if ({a.get("cluster") for a in q.get("answers", [])} & {"CREATIVE", "SOCIAL"}) else 4}
        for i, q in enumerate(questions)
    ]
    resultado = client.post("/api/v1/assess?lang=es", json={"answers": answers}, headers=headers).json()
    client.post("/api/v1/me/claim-result", headers=headers,
                json={"result_id": resultado["result_id"]})
    return resultado["data"]


def test_mentor_explains_the_fit_dimension_by_dimension(client, register_and_login, app_module):
    """Cada carrera declara que nivel pide en cada dimension y el test calcula
    esas mismas ocho. La resta entre ambas es el dato mas concreto que tiene
    el motor, y el mentor no la usaba: hablaba de fortalezas en abstracto,
    sin decir contra que."""
    _, headers = register_and_login()
    _perfil_creativo(client, headers, app_module.questions_db)

    r = client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                    json={"message": "que tal ingeniería de software para mi?"}).json()["response"]

    # Nombra la dimension, lo que el estudiante tiene y lo que la carrera pide.
    assert "Habilidad técnica" in r
    assert "pide" in r
    # Y los numeros son comprobables, no adjetivos.
    assert re.search(r"\d+\.\d+ y pide \d+\.\d+", r), r


def test_mentor_answers_family_pressure_with_the_numbers(client, register_and_login, app_module):
    """"Mi papa quiere que estudie derecho" es de las preguntas mas comunes al
    elegir carrera, y caia entera en la respuesta generica. La respuesta no
    decide por el estudiante: le da sus datos y con que compararlos."""
    _, headers = register_and_login()
    _perfil_creativo(client, headers, app_module.questions_db)

    r = client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                    json={"message": "mi papá quiere que estudie derecho"}).json()["response"]

    assert "Derecho" in r
    # Las dos compatibilidades, para que la comparacion sea suya.
    assert len(re.findall(r"\d+\.\d+%", r)) >= 2, r
    # Y no le dice lo que tiene que hacer.
    assert "la decisión la tomas tú" in r


def test_mentor_compares_two_careers_without_a_keyword(client, register_and_login, app_module):
    """"Escritura creativa o ingenieria de software?" no lleva ninguna palabra
    de comparacion: nombrar dos carreras ES pedir la comparacion, y es como
    se pregunta de verdad."""
    _, headers = register_and_login()
    _perfil_creativo(client, headers, app_module.questions_db)

    r = client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                    json={"message": "escritura creativa o ingeniería de software?"}).json()["response"]

    assert "Escritura creativa" in r and "Ingeniería de software" in r
    assert len(re.findall(r"\d+\.\d+% de compatibilidad", r)) == 2, r


def test_mentor_scores_careers_outside_the_saved_shortlist(client, register_and_login, app_module):
    """Solo se guardan las ocho mejores, pero el estudiante pregunta
    justamente por las que NO le salieron. Sin puntuarlas al vuelo, la
    respuesta imprimia un guion donde deberia ir el numero."""
    _, headers = register_and_login()
    datos = _perfil_creativo(client, headers, app_module.questions_db)
    guardadas = {m["career_id"] for m in datos["recommended_careers"]}

    # Una carrera que seguro quedo fuera de la lista de este perfil.
    fuera = next(c for c in app_module.careers_db
                 if c["id"] not in guardadas and c["title_es"] == "Ingeniería de software")
    r = client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                    json={"message": f"que tal {fuera['title_es']}?"}).json()["response"]
    assert "—" not in r, r


def test_mentor_remembers_which_career_was_discussed(client, register_and_login, app_module):
    """Un "por que?" suelto se refiere a lo ultimo que se dijo, no a la
    carrera principal. chat_history ya se guardaba y no se usaba."""
    _, headers = register_and_login()
    _perfil_creativo(client, headers, app_module.questions_db)

    client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                json={"message": "hablame de veterinaria"})
    seguimiento = client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                              json={"message": "por que?"}).json()["response"]

    assert "Veterinaria" in seguimiento, seguimiento


def test_every_mentor_answer_resolves_to_real_text(client, register_and_login, app_module):
    """El catalogo tiene dos mitades (MENTOR_TEXTS y TEMPLATES) y _say solo
    miraba una. Una clave en la mitad equivocada no da error: sale la clave
    en crudo a la pantalla del estudiante."""
    _, headers = register_and_login()
    _perfil_creativo(client, headers, app_module.questions_db)

    preguntas = [
        "hola", "cual es mi roadmap", "que carreras me salieron",
        "donde puedo estudiar", "cuales son mis habilidades", "estoy nervioso",
        "mi papá quiere que estudie derecho", "derecho o psicología?",
        "como voy?", "por que?", "gracias", "que puedes hacer",
    ]
    for pregunta in preguntas:
        r = client.post("/api/v1/mentor/chat?lang=es", headers=headers,
                        json={"message": pregunta}).json()["response"]
        # Una clave sin resolver se reconoce por el punto sin espacios.
        assert not re.fullmatch(r"[a-zA-Z]+\.[a-zA-Z.]+", r.strip()), f"{pregunta!r} -> {r!r}"
        assert " " in r.strip(), f"{pregunta!r} -> {r!r}"
