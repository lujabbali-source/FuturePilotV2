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
  const API_URL = "http://127.0.0.1:8000";
  const AI_STORAGE_KEY = "futurePilotAIResponse";
  const USER_ANSWERS_KEY = "futurePilotAssessment";
  const RESULT_ID_KEY = "futurePilotResultId";
  const ANON_ID_KEY = "futurePilotAnonId";

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

    // Formatear payload para app.py (question_index y answer_index)
    const formattedAnswers = rawAnswers.map((ans, idx) => ({
      question_index: idx,
      answer_index: ans && ans.answerIndex !== undefined && ans.answerIndex !== null ? ans.answerIndex : 0
    }));

    try {
      console.log("[FuturePilot AI] Enviando respuestas al servidor FastAPI en " + API_URL + "/api/v1/assess ...");
      const response = await fetch(`${API_URL}/api/v1/assess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      // 3. Actualizar Paises y Hubs Recomendados
      const countriesElement = document.getElementById("countries");
      if (countriesElement && topChoice.recommended_hubs) {
        const hubList = topChoice.recommended_hubs.map(h => `🌐 ${h.name} — ${h.desc}`);
        countriesElement.innerHTML = hubList.join("<br>");
      }

      // 4. Guardar carrera seleccionada en la memoria local
      if (topChoice.title) {
        localStorage.setItem("selectedCareer", topChoice.title);
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
  window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("flightplan")) {
      updateFlightPlanUI();
    } else if (path.includes("journey")) {
      updateJourneyUI();
    }
  });

  // Exponer conector globalmente para ser invocado desde assessment.js
  window.FuturePilotAIConnector = {
    sendAssessmentToPythonAI,
    updateFlightPlanUI,
    updateJourneyUI,
    getAnonId
  };
})();