"""Test vocacional: assess, reclamo de resultado, resultados guardados,
aislamiento entre sesiones anonimas."""


CLUSTERS = [
    "ANALYTICAL", "CREATIVE", "SOCIAL", "LEADERSHIP",
    "TECHNICAL", "SCIENTIFIC", "PRACTICAL", "ENTREPRENEURIAL",
]


def test_career_catalog_is_well_formed(client):
    """El catalogo es la unica autoridad sobre que carreras existen (antes
    el frontend tenia su propia lista de 39 nombres, de los que solo 4
    coincidian). Si una carrera llega con el vector incompleto, el coseno
    la puntua con un 5.0 por defecto y queda comparandose contra algo que
    nadie escribio."""
    careers = client.get("/api/v1/careers").json()["careers"]
    assert len(careers) >= 40, f"catalogo demasiado pequeño para discriminar: {len(careers)}"

    ids = [career["id"] for career in careers]
    titles = [career["title"] for career in careers]
    assert len(ids) == len(set(ids)), "hay ids duplicados"
    assert len(titles) == len(set(titles)), "hay titulos duplicados"

    for career in careers:
        assert career["title"] and career["category"] and career["description"]
        requirements = career["requirements"]
        assert set(requirements) == set(CLUSTERS), f"{career['title']}: clusters {set(requirements)}"
        assert all(1.0 <= value <= 10.0 for value in requirements.values()), career["title"]


def test_original_career_ids_are_preserved(client):
    """test_results.top_career_id guarda estos ids. Renumerar el catalogo
    dejaria los resultados historicos apuntando a carreras que ya no son
    las mismas."""
    careers = {career["id"]: career["title"] for career in client.get("/api/v1/careers").json()["careers"]}
    assert careers.get("c1") == "Software Engineering"
    assert careers.get("c7") == "Medicine & Healthcare"
    assert careers.get("c10") == "Robotics & Automation"


def _answers_favouring(questions: list, clusters: set) -> list:
    """Construye un set de respuestas que marca fuerte los clusters dados y
    flojo el resto.

    Cada pregunta de questions.json es un item Likert de UN solo cluster:
    el indice 0 es "Strongly Agree" (4 puntos) y el ultimo "Strongly
    Disagree" (0). Responder el mismo indice a todo NO produce un perfil
    inclinado - produce uno plano, porque cada pregunta apunta a un cluster
    distinto. Hay que elegir el indice segun el cluster de cada pregunta.
    """
    answers = []
    for index, question in enumerate(questions):
        options = question.get("answers") or []
        if not options:
            continue
        cluster = (options[0].get("cluster") or "").upper()
        answers.append({
            "question_index": index,
            "answer_index": 0 if cluster in clusters else len(options) - 1,
        })
    return answers


def test_different_profiles_get_different_top_careers(client):
    """Con 10 carreras el ranking devolvia practicamente la misma lista
    para cualquier perfil. El catalogo ampliado tiene que discriminar: un
    perfil tecnico y uno social no pueden terminar en la misma carrera."""
    questions = client.get("/api/v1/questions").json()["questions"]

    tecnico = _answers_favouring(questions, {"TECHNICAL", "ANALYTICAL"})
    social = _answers_favouring(questions, {"SOCIAL", "CREATIVE"})

    result_a = client.post("/api/v1/assess", json={"answers": tecnico, "anon_id": "prof-a"}).json()
    result_b = client.post("/api/v1/assess", json={"answers": social, "anon_id": "prof-b"}).json()

    top_a = result_a["data"]["recommended_careers"][0]["title"]
    top_b = result_b["data"]["recommended_careers"][0]["title"]
    assert top_a != top_b, f"perfiles opuestos reciben la misma carrera: {top_a}"

    # Y no solo la primera: las recomendaciones apenas deben solaparse.
    careers_a = {c["title"] for c in result_a["data"]["recommended_careers"]}
    careers_b = {c["title"] for c in result_b["data"]["recommended_careers"]}
    solapamiento = careers_a & careers_b
    assert len(solapamiento) <= 1, f"perfiles opuestos comparten {len(solapamiento)} carreras: {solapamiento}"


def test_match_percentage_rewards_a_defined_profile(client):
    """El coseno sin centrar estaba invertido: un perfil PLANO (sin ninguna
    inclinacion) sacaba 98.7% con una carrera arbitraria, y uno muy
    definido no pasaba del 70.6%. Cuanto mas claro era el estudiante, peor
    puntuaba. Con el coseno centrado la relacion es la correcta."""
    questions = client.get("/api/v1/questions").json()["questions"]

    plano = [{"question_index": i, "answer_index": 1} for i in range(len(questions))]
    definido = _answers_favouring(questions, {"TECHNICAL", "ANALYTICAL"})

    r_plano = client.post("/api/v1/assess", json={"answers": plano, "anon_id": "esc-plano"}).json()["data"]
    r_definido = client.post("/api/v1/assess", json={"answers": definido, "anon_id": "esc-def"}).json()["data"]

    mejor_plano = r_plano["recommended_careers"][0]["match_percentage"]
    mejor_definido = r_definido["recommended_careers"][0]["match_percentage"]

    assert mejor_definido > mejor_plano, (
        f"un perfil definido ({mejor_definido}%) deberia puntuar por encima "
        f"de uno sin señal ({mejor_plano}%)"
    )
    # Un perfil sin inclinacion no puede presentarse como una gran
    # compatibilidad: 50 es "no hay relacion" en esta escala.
    assert mejor_plano == 50.0

    # Y la confianza tiene que reflejarlo, no solo cuantas preguntas se
    # respondieron - en ambos casos se respondieron todas.
    assert r_definido["confidence"] > r_plano["confidence"]


def test_match_percentage_spreads_across_the_shortlist(client):
    """Mostrar 99%, 99%, 98% no le dice nada al estudiante. Las
    recomendaciones de un perfil definido tienen que separarse."""
    questions = client.get("/api/v1/questions").json()["questions"]
    answers = _answers_favouring(questions, {"SOCIAL", "CREATIVE"})
    careers = client.post(
        "/api/v1/assess", json={"answers": answers, "anon_id": "esc-spread"}
    ).json()["data"]["recommended_careers"]

    scores = [career["match_percentage"] for career in careers]
    assert max(scores) - min(scores) >= 5.0, f"las 8 recomendaciones casi no se distinguen: {scores}"
    assert all(0.0 <= score <= 100.0 for score in scores)


def test_assess_returns_a_shortlist_not_the_whole_catalog(client, sample_answers):
    """rank_careers puntua las 73 carreras del catalogo, pero la respuesta
    solo debe traer las mejores. Devolverlas todas metia 73 fichas con su
    justificacion en cada respuesta, en results_json y en la pantalla de
    resultados - invisible con 10 carreras, no con 73."""
    from ai_engine import TOP_MATCHES_RETURNED

    catalog_size = len(client.get("/api/v1/careers").json()["careers"])
    careers = client.post(
        "/api/v1/assess", json={"answers": sample_answers, "anon_id": "shortlist"}
    ).json()["data"]["recommended_careers"]

    assert len(careers) == TOP_MATCHES_RETURNED
    assert len(careers) < catalog_size

    # Y vienen ordenadas de mejor a peor.
    scores = [career["match_percentage"] for career in careers]
    assert scores == sorted(scores, reverse=True)


def test_recommended_careers_come_from_the_catalog(client, sample_answers):
    """Nada de lo que se le enseña al estudiante puede salir de fuera del
    catalogo - es lo que garantiza que la pantalla parcial y la completa
    hablen de las mismas carreras."""
    catalog = {career["title"] for career in client.get("/api/v1/careers").json()["careers"]}
    result = client.post("/api/v1/assess", json={"answers": sample_answers, "anon_id": "cat"}).json()

    for career in result["data"]["recommended_careers"]:
        assert career["title"] in catalog, f"'{career['title']}' no existe en careers.json"


def test_every_category_has_a_matching_hub(client):
    """get_recommended_hubs empareja por categoria. Cubria 3 de las 14 del
    catalogo y para el resto caia a los tres primeros hubs de la lista, que
    es como recomendar Silicon Valley a quien le salio Creative Writing.
    Ahora no hay fallback, asi que una categoria sin hub se queda sin
    destinos: este test lo detecta al añadir carreras nuevas."""
    from ai_engine import CareerEngine

    engine = CareerEngine()
    categories = {career["category"] for career in client.get("/api/v1/careers").json()["careers"]}
    sin_hub = sorted(c for c in categories if not engine.get_recommended_hubs(c))
    assert not sin_hub, f"categorias sin ningun hub asignado: {sin_hub}"


def test_skill_gaps_stay_actionable(client):
    """Se devolvian TODAS las brechas por encima del umbral: para un perfil
    marcado son 6 de 8 clusters, y la justificacion acababa con media lista
    de carencias que no le sirve de nada al estudiante."""
    questions = client.get("/api/v1/questions").json()["questions"]
    answers = _answers_favouring(questions, {"CREATIVE", "SOCIAL"})
    careers = client.post(
        "/api/v1/assess", json={"answers": answers, "anon_id": "gaps"}
    ).json()["data"]["recommended_careers"]

    for career in careers:
        assert len(career["skill_gaps"]) <= 3, f"{career['title']}: {career['skill_gaps']}"


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

    # La actividad reciente la sirve /api/v1/me/dashboard: el pasaporte dejo
    # de pintarla cuando su pagina de registro de viaje paso a la cuenta.
    activity = client.get("/api/v1/me/dashboard", headers=headers).json()["recent_activity"]
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


def test_strengths_stay_actionable(client):
    """Se devolvia todo cluster que llegara al requisito de la carrera. Para
    una carrera poco exigente eso son los 8, y la pantalla de resultados
    listaba los ocho bajo "FORTALEZAS". Decir que destacas en todo es no
    decir nada - mismo caso que las brechas."""
    questions = client.get("/api/v1/questions").json()["questions"]
    answers = _answers_favouring(questions, {"CREATIVE", "SOCIAL"})
    careers = client.post(
        "/api/v1/assess", json={"answers": answers, "anon_id": "fortalezas"}
    ).json()["data"]["recommended_careers"]

    for career in careers:
        assert len(career["strengths"]) <= 3, f"{career['title']}: {career['strengths']}"


def test_question_bank_only_declares_metadata_the_engine_uses(client):
    """El motor local leia `math`, `english` y `learningStyle` de cada
    respuesta. Ninguna de las 200 los trae, asi que los contadores se
    quedaban a cero y de ahi salia un "Math: Beginner / English: Beginner /
    Learning Style: null" identico para todos los estudiantes. Se eliminaron
    del cliente; este test evita que reaparezcan a medias - si alguien los
    añade al banco, hay que volver a construir la parte que los consume."""
    fantasma = {"math", "english", "learningStyle", "universityGoal"}
    for question in client.get("/api/v1/questions").json()["questions"]:
        for answer in question["answers"]:
            presentes = fantasma & set(answer)
            assert not presentes, (
                f"'{question['question'][:40]}' declara {sorted(presentes)}, "
                "que ya no consume nadie: hay que reconstruir esa parte del perfil"
            )


def test_hubs_prefer_the_ones_known_for_that_specific_career(client):
    """La categoria sola es demasiado gruesa: "Skilled Trades" agrupa
    Toulouse (aeronautica) y Lyon (gastronomia), asi que a quien le salia
    Culinary Arts se le proponia Toulouse primero. Cada hub declara por que
    carreras es conocido de verdad y esas van delante."""
    from ai_engine import CareerEngine

    engine = CareerEngine()
    catalogo = {c["id"]: c for c in client.get("/api/v1/careers").json()["careers"]}

    esperado = {
        "c68": "Lyon",        # Culinary Arts
        "c65": "Toulouse",    # Aviation Maintenance
        "c40": "Los Ángeles", # Film & Audiovisual Direction
        "c43": "París",       # Creative Writing
        "c22": "Basilea",     # Pharmacy
        "c13": "Ginebra",     # Physics
        "c67": "Wageningen",  # Agricultural Engineering
    }
    for career_id, primero in esperado.items():
        career = catalogo[career_id]
        hubs = engine.get_recommended_hubs(career["category"], career_id)
        assert hubs, f"{career['title']} se quedo sin destinos"
        assert hubs[0]["name"].startswith(primero), (
            f"{career['title']}: se esperaba {primero} primero, salio {hubs[0]['name']}"
        )


def test_hub_career_tags_point_at_real_careers(client):
    """Un id mal escrito en la lista `careers` de un hub no rompe nada: el
    hub simplemente nunca se prioriza. Este test lo detecta."""
    from ai_engine import CareerEngine

    ids = {c["id"] for c in client.get("/api/v1/careers").json()["careers"]}
    for hub in CareerEngine.GLOBAL_HUBS:
        desconocidos = set(hub.get("careers") or []) - ids
        assert not desconocidos, f"{hub['name']} apunta a carreras inexistentes: {desconocidos}"


def test_the_options_are_shuffled_before_they_are_shown(app_module):
    """En las 50 preguntas la respuesta que mas puntua esta en la posicion 0.
    Eso no es un fallo del JSON - el motor necesita un orden canonico para
    que answer_index signifique algo - pero convierte la posicion en la
    respuesta: pulsando siempre la primera opcion se sacaba 10 sobre 10 en
    los ocho ejes. Se comprobo recorriendo el test entero.

    Lo unico que lo evita es que el front baraje antes de pintar. Este test
    vigila las dos mitades del trato: que el dato siga teniendo el orden que
    el motor espera, y que la pantalla no lo enseñe tal cual.
    """
    from pathlib import Path

    primeras = [
        p["answers"].index(max(p["answers"], key=lambda a: a.get("points", 0)))
        for p in app_module.questions_db
    ]
    assert set(primeras) == {0}, (
        "el orden canonico cambio. Si la mejor respuesta ya no es siempre la "
        "primera, revisa que el barajado del front siga haciendo falta."
    )

    tipos = (Path(__file__).resolve().parent.parent / "web" / "src" / "assessment"
             / "questionTypes.js").read_text(encoding="utf-8")
    assert "ordenDeOpciones" in tipos, (
        "questionTypes.js dejo de barajar: la primera opcion vuelve a ser "
        "siempre la que mas puntua."
    )

    # Los subtitulos por posicion cantaban la respuesta: "Se parece mucho a
    # ti" bajo la primera opcion, que era la de 4 puntos. Barajadas, ademas,
    # describirian una posicion al azar.
    renderizado = "\n".join(l for l in tipos.splitlines() if not l.strip().startswith("//"))
    for filtrada in ("option.match", "option.icon"):
        assert filtrada not in renderizado, (
            f"{filtrada}* volvio a pintarse: es una etiqueta pegada a la "
            "posicion, no a la opcion."
        )
