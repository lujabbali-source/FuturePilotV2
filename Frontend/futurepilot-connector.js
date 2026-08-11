/**
 * ===============================================================================
 * FUTUREPILOT AI - CONECTOR UNIVERSAL DE FRONTEND A BACKEND
 * ===============================================================================
 * Este archivo conecta tus paginas HTML originales (assessment, flightplan,
 * journey, etc.) con el servidor FastAPI en Python (app.py) que ejecuta
 * el cerebro de la IA (futurepilot_ai_engine.py / ai_engine.py).
 * ===============================================================================
 */

(() => {
  // Rutas relativas, nunca un host absoluto: el backend unificado
  // (futurepilot-IA/app.py) sirve estas paginas y la API desde el mismo
  // origen, asi que "/api/v1/..." funciona en local y en cualquier dominio
  // real. Un "http://127.0.0.1:8000" hardcodeado aqui hacia que el sitio
  // desplegado le hablara a la maquina del propio visitante - y la CSP
  // (connect-src 'self', ver app.py) bloqueaba la peticion de todas formas.
  const AI_STORAGE_KEY = "futurePilotAIResponse";
  const USER_ANSWERS_KEY = "futurePilotAssessment";
  const RESULT_ID_KEY = "futurePilotResultId";
  const ANON_ID_KEY = "futurePilotAnonId";
  const AUTH_TOKEN_KEY = "futurePilotAuthToken";

  // Antes de iniciar sesion, cada navegador tenia su test/chat guardado
  // bajo un balde compartido ("default_student") en la memoria de la IA -
  // cualquier visitante anonimo podia ver rastros de otro. Este id, unico
  // por navegador y persistido en localStorage, le da a cada sesion
  // anonima su propio espacio (ver resolve_anon_memory_id en app.py).
  function getAnonId() {
    let id = localStorage.getItem(ANON_ID_KEY);
    if (!id) {
      id = window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(ANON_ID_KEY, id);
    }
    return id;
  }

  // =============================================================================
  // 1. ENVIAR RESPUESTAS DEL TEST A LA API EN PYTHON
  // =============================================================================
  async function sendAssessmentToPythonAI(rawAnswers) {
    if (!rawAnswers || !Array.isArray(rawAnswers)) {
      console.warn("[FuturePilot AI] No hay respuestas formateadas para enviar.");
      return null;
    }

    // Formatear payload para app.py (question_index y answer_index).
    //
    // Las preguntas saltadas ("Aun no lo se", ver skipQuestion en
    // assessment.js) quedan con answerIndex null y se OMITEN del payload.
    // Antes se mandaban como answer_index: 0, que en questions.json es
    // "Strongly Agree" (4 puntos, el maximo): saltar una pregunta sumaba
    // en silencio la respuesta mas fuerte posible y corrompia el perfil.
    // question_index se toma del indice real en el array, no de la
    // posicion tras filtrar, para que siga apuntando a la pregunta
    // correcta en questions_db.
    const formattedAnswers = rawAnswers
      .map((ans, idx) => ({ question_index: idx, answer_index: ans?.answerIndex }))
      .filter((item) => item.answer_index !== undefined && item.answer_index !== null);

    if (!formattedAnswers.length) {
      console.warn("[FuturePilot AI] Todas las preguntas quedaron sin responder.");
      return null;
    }

    // Si ya hay sesion, el token viaja con el test: el backend
    // (get_current_user_optional en /api/v1/assess) graba el resultado ya
    // asociado a la cuenta en vez de como fila anonima. Eso hace que el
    // resultado NUNCA quede huerfano para un usuario logueado - el claim
    // posterior pasa a ser solo el registro en el Pasaporte, y es
    // idempotente. Sin token la peticion sigue siendo anonima, que es el
    // caso normal: el test se hace antes de registrarse.
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      console.log("[FuturePilot AI] Enviando " + formattedAnswers.length + " respuestas a /api/v1/assess ...");
      const response = await fetch("/api/v1/assess", {
        method: "POST",
        headers,
        body: JSON.stringify({ answers: formattedAnswers, anon_id: getAnonId() })
      });

      if (!response.ok) {
        throw new Error("Respuesta de error recibida del servidor FastAPI.");
      }

      const result = await response.json();
      if (result.success && result.data) {
        console.log("[FuturePilot AI] Diagnostico recibido con exito desde Python:", result.data);
        localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(result.data));
        // Guardado aparte (no dentro del blob de resultados) para que
        // assessment.js pueda reclamarlo tras el login sin tener que
        // parsear/tocar AI_STORAGE_KEY.
        if (result.result_id) localStorage.setItem(RESULT_ID_KEY, String(result.result_id));
        return result.data;
      }
    } catch (error) {
      console.error("[FuturePilot AI Error] No se pudo comunicar con la API de Python:", error);
    }
    return null;
  }

  // =============================================================================
  // 1b. TRAER EL RESULTADO GUARDADO EN LA CUENTA
  // =============================================================================
  /**
   * /journey y /flightplan se pintaban SOLO desde localStorage, asi que un
   * estudiante que hiciera el test en el movil y entrara despues desde el
   * portatil con su cuenta veia las dos paginas vacias, pese a tener el
   * resultado guardado en el servidor. El resultado vive en la cuenta, no
   * en el dispositivo.
   *
   * Se refresca AI_STORAGE_KEY desde /api/v1/me/results antes de hidratar.
   * Sin sesion, o si la peticion falla, se conserva lo que hubiera en
   * localStorage: el flujo anonimo (test -> resultados sin registrarse)
   * sigue funcionando igual.
   */
  async function refreshResultsFromServer() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return false;

    try {
      const response = await fetch("/api/v1/me/results", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) return false;

      const data = await response.json();
      if (!data.results) return false;

      localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data.results));
      return true;
    } catch (error) {
      console.warn("[FuturePilot] No se pudo traer el resultado de la cuenta:", error);
      return false;
    }
  }

  // =============================================================================
  // 2. ACTUALIZAR DINÁMICAMENTE LA PANTALLA FLIGHTPLAN.HTML
  // =============================================================================
  function updateFlightPlanUI() {
    const aiDataRaw = localStorage.getItem(AI_STORAGE_KEY);
    if (!aiDataRaw) return;

    try {
      const aiData = JSON.parse(aiDataRaw);
      const topChoice = aiData.top_choice || (aiData.recommended_careers ? aiData.recommended_careers[0] : null);

      if (!topChoice) return;

      // 1. Actualizar Titulo de Carrera Recomendada
      const careerElement = document.getElementById("careerName");
      if (careerElement) {
        careerElement.innerText = topChoice.title || localStorage.getItem("selectedCareer") || "Software Engineering";
      }

      // 2. Actualizar Justificacion y Razonamiento Cognitivo de la IA
      const aiBoxes = document.querySelectorAll("#aiRecommendation");
      aiBoxes.forEach(box => {
        if (topChoice.justification) {
          box.innerText = topChoice.justification;
        }
      });

      // 3. Actualizar Paises y Hubs Recomendados.
      // recommended_hubs cuelga de la RAIZ de la respuesta, no de la
      // carrera: se leia topChoice.recommended_hubs, siempre undefined, y
      // el bloque se quedaba en "Loading..." para siempre.
      const countriesElement = document.getElementById("countries");
      const hubs = aiData.recommended_hubs || [];
      if (countriesElement) {
        countriesElement.innerHTML = hubs.length
          ? hubs.map(hub => `🌐 ${hub.name} — ${hub.desc}`).join("<br>")
          : "Explora el globo para descubrir destinos.";
      }

      // 4. Guardar carrera seleccionada en la memoria local
      if (topChoice.title) {
        localStorage.setItem("selectedCareer", topChoice.title);
      }

      // 5. Nivel academico. mathLevel/englishLevel los calcula el motor
      // local y nunca llegan al servidor, asi que en otro dispositivo no
      // existen: se rellena con lo que si sabe la cuenta (el estilo de
      // aprendizaje) en vez de dejar el "Loading..." del HTML colgado.
      const academicElement = document.getElementById("academicLevel");
      const localLevels = (() => {
        try { return JSON.parse(localStorage.getItem("futurePilotResults")); } catch { return null; }
      })();
      if (academicElement && !localLevels) {
        academicElement.innerHTML = aiData.learning_style
          ? `Estilo de aprendizaje: ${aiData.learning_style}`
          : "Repite el test en este dispositivo para ver tu nivel académico.";
      }
    } catch (err) {
      console.error("[FuturePilot AI Error] Error actualizando FlightPlan UI:", err);
    }
  }

  // =============================================================================
  // 3. ACTUALIZAR DINÁMICAMENTE LA PANTALLA JOURNEY.HTML (ROADMAP STACK)
  // =============================================================================
  function updateJourneyUI() {
    const aiDataRaw = localStorage.getItem(AI_STORAGE_KEY);
    if (!aiDataRaw) return;

    try {
      const aiData = JSON.parse(aiDataRaw);
      const roadmap = aiData.roadmap;

      if (!roadmap || !roadmap.checkpoints) return;

      // Actualizar titulo de carrera en la barra lateral
      const titleElement = document.getElementById("careerTitle");
      if (titleElement && roadmap.career_title) {
        titleElement.innerText = roadmap.career_title;
      }

      // Actualizar los textos de las tarjetas del roadmap (Paso 1, 2, 3, 4)
      const cards = document.querySelectorAll(".card");
      roadmap.checkpoints.forEach((cp, idx) => {
        if (cards[idx]) {
          const h3 = cards[idx].querySelector("h3");
          if (h3) {
            h3.innerText = `${cp.step}. ${cp.title}`;
          }
        }
      });
    } catch (err) {
      console.error("[FuturePilot AI Error] Error actualizando Journey UI:", err);
    }
  }

  // =============================================================================
  // DETECCIÓN DE PÁGINA E INICIALIZACIÓN
  // =============================================================================
  window.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname;
    const isFlightPlan = path.includes("flightplan");
    const isJourney = path.includes("journey");
    if (!isFlightPlan && !isJourney) return;

    // Primero lo que ya haya en local (pintado inmediato, sin esperar a la
    // red), y despues se repinta con lo que diga la cuenta - que es la
    // fuente de verdad y puede traer un resultado mas reciente hecho en
    // otro dispositivo.
    if (isFlightPlan) updateFlightPlanUI();
    else updateJourneyUI();

    if (await refreshResultsFromServer()) {
      if (isFlightPlan) updateFlightPlanUI();
      else updateJourneyUI();
    }
  });

  // Exponer conector globalmente para ser invocado desde assessment.js
  window.FuturePilotAIConnector = {
    sendAssessmentToPythonAI,
    refreshResultsFromServer,
    updateFlightPlanUI,
    updateJourneyUI,
    getAnonId
  };
})();