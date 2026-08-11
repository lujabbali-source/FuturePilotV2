(() => {
const assessmentEngine = window.FuturePilotAssessmentEngine;
const questionTypes = window.FuturePilotQuestionTypes;

const STORAGE_KEY = "futurePilotAssessment";
const RESULTS_KEY = "futurePilotResults";
const QUESTION_COUNT = 50;

const app = document.querySelector("#assessment-app");
let questions = [];
let currentQuestion = 0;
let answers = [];
let results = assessmentEngine.createInitialResults();
let screen = "welcome";

let aiResult = null;
let aiError = "";

const phaseNames = ["Tu punto de partida", "Tus intereses", "Tus fortalezas", "Tu perfil", "Tu siguiente destino"];

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function savedAssessment() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentQuestion, answers, results }));
}

function setAnswer(answerIndex, extra = {}) {
  answers[currentQuestion] = { answerIndex, ...extra };
  results = assessmentEngine.calculateResults(questions, answers, results);
  saveProgress();
}

function currentAnswer() {
  return answers[currentQuestion] || {};
}

function hasCurrentAnswer() {
  const answer = currentAnswer();
  return answer.answerIndex !== null && answer.answerIndex !== undefined;
}

function render() {
  if (screen === "welcome") return renderWelcome();
  if (screen === "question") return renderQuestion();
  if (screen === "analysis") return renderAnalysis();
  if (screen === "partial") return renderPartialResults();
  if (screen === "unlock") return renderUnlock();
  if (screen === "results") return renderFullResults();
  return renderUnlock();
}

function renderWelcome() {
  const saved = savedAssessment();
  const hasSavedProgress = saved && saved.currentQuestion > 0 && saved.currentQuestion < QUESTION_COUNT;
  app.innerHTML = `<main class="welcome-screen screen-enter">
    <div class="welcome-orbit"><span class="orbit-core">✦</span><span class="orbit-ring orbit-ring--one"></span><span class="orbit-ring orbit-ring--two"></span></div>
    <div class="eyebrow"><span class="eyebrow-dot"></span> FUTUREPILOT / PERSONAL DISCOVERY</div>
    <h1>Tu próximo capítulo<br><span>empieza contigo.</span></h1>
    <p class="welcome-copy">Un test breve y dinámico para conectar tus intereses, fortalezas y personalidad con caminos que realmente podrían encajar contigo.</p>
    <div class="welcome-stats"><span><strong>50</strong> preguntas</span><i></i><span><strong>10</strong> min aprox.</span><i></i><span><strong>1</strong> perfil único</span></div>
    <button type="button" class="primary-action primary-action--wide" data-action="start">${hasSavedProgress ? "Continuar mi exploración" : "Comenzar mi exploración"}<span>→</span></button>
    ${hasSavedProgress ? `<button type="button" class="text-action" data-action="restart">Empezar de nuevo</button><p class="resume-note">Guardamos tu progreso en la pregunta ${saved.currentQuestion + 1}. Puedes retomarlo cuando quieras.</p>` : `<p class="privacy-note"><span>◉</span> Tus respuestas se guardan automáticamente en este dispositivo.</p>`}
    <div class="welcome-footer"><span>Sin respuestas correctas o incorrectas</span><span>Diseñado para descubrir, no para examinarte</span></div>
  </main>`;
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const state = currentAnswer();
  const { format, html } = questionTypes.renderQuestionOptions(question, currentQuestion, state);
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const progressMessage = questionTypes.getProgressMessage(currentQuestion);
  const phaseIndex = Math.min(Math.floor(currentQuestion / 10), phaseNames.length - 1);
  const phase = phaseNames[phaseIndex];
  const phaseTrack = phaseNames.map((name, index) => `<span class="phase-dot ${index < phaseIndex ? "is-done" : ""} ${index === phaseIndex ? "is-current" : ""}" title="${escapeHtml(name)}"></span>`).join("");

  app.innerHTML = `<main class="test-shell screen-enter">
    <header class="test-header">
      <a class="brand" href="/"><img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span></a>
      <div class="save-indicator"><span></span> Guardado automáticamente</div>
      <button type="button" class="exit-action" data-action="exit">Salir</button>
    </header>
    <section class="progress-section" aria-label="Progreso del test">
      <p class="progress-eyebrow">Tu recorrido</p>
      <div class="progress-meta"><span class="progress-message">${progressMessage.label}</span><span><strong>${String(currentQuestion + 1).padStart(2, "0")}</strong> / ${QUESTION_COUNT}</span></div>
      <div class="progress-bar"><span style="width:${progress}%"></span></div>
      <div class="progress-submeta"><span>${progressMessage.detail}</span><span>${phase}</span></div>
      <div class="phase-track">${phaseTrack}</div>
    </section>
    <section class="question-stage" data-format="${format}">
      <div class="question-kicker"><span class="kicker-number">${String(currentQuestion + 1).padStart(2, "0")}</span><span>${question.type === "personality" ? "Personalidad" : "Intereses"} · ${formatLabel(format)}</span></div>
      <h2>${escapeHtml(question.question)}</h2>
      <div class="question-options">${html}</div>
    </section>
    <footer class="question-footer">
      <button type="button" class="secondary-action" data-action="back" ${currentQuestion === 0 ? "disabled" : ""}>← <span>Anterior</span></button>
      <div class="footer-center"><button type="button" class="skip-action" data-action="skip">Aún no lo sé</button></div>
      <button type="button" class="primary-action" data-action="next" ${hasCurrentAnswer() ? "" : "disabled"}>${currentQuestion === QUESTION_COUNT - 1 ? "Ver mi perfil" : "Siguiente"}<span>→</span></button>
    </footer>
  </main>`;
  bindQuestionEvents(format);
}

function formatLabel(format) {
  return { single: "Elección rápida", multi: "Varias señales", ranking: "Ordena tus preferencias", slider: "Nivel de intensidad", scenario: "Situación real", icons: "Tu forma de pensar", image: "Elige lo que te atrae", versus: "A o B" }[format];
}

function bindQuestionEvents(format) {
  app.querySelectorAll("[data-answer-index]").forEach((button) => button.addEventListener("click", () => {
    const index = Number(button.dataset.answerIndex);
    if (format === "multi") {
      const selected = new Set(currentAnswer().selectedIndices || []);
      if (selected.has(index)) selected.delete(index);
      else if (selected.size < 2) selected.add(index);
      const selectedIndices = [...selected].sort((a, b) => a - b);
      setAnswer(selectedIndices.length ? selectedIndices[0] : null, { selectedIndices });
    } else {
      setAnswer(index);
    }
    renderQuestion();
  }));

  app.querySelectorAll("[data-slider-value]").forEach((button) => button.addEventListener("click", () => {
    setAnswer(Number(button.dataset.sliderValue));
    renderQuestion();
  }));
  const slider = app.querySelector("[data-slider]");
  if (slider) slider.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    setAnswer(value);
    const label = ["Nada", "Un poco", "Bastante", "Muchísimo"][value];
    app.querySelector("#slider-value").textContent = label;
    app.querySelectorAll(".slider-dot").forEach((dot, index) => dot.classList.toggle("is-active", index === value));
    app.querySelector('[data-action="next"]').disabled = false;
  });
  app.querySelectorAll("[data-rank-move]").forEach((button) => button.addEventListener("click", () => {
    const order = [...(currentAnswer().rankOrder || questions[currentQuestion].answers.map((_, index) => index))];
    const from = order.indexOf(Number(button.dataset.rankIndex));
    const to = button.dataset.rankMove === "up" ? from - 1 : from + 1;
    if (to < 0 || to >= order.length) return;
    [order[from], order[to]] = [order[to], order[from]];
    setAnswer(order[0], { rankOrder: order });
    renderQuestion();
  }));
}
function renderAnalysis() {
  app.innerHTML = `<main class="analysis-screen screen-enter"><div class="analysis-card"><div class="analysis-mark"><span></span><span></span><span></span></div><p class="eyebrow">FUTUREPILOT ANALYSIS</p><h1>Estamos conectando<br><span>las piezas.</span></h1><div class="analysis-lines"><p class="is-active">Analizando tus respuestas <span>✓</span></p><p>Comparando perfiles compatibles <span>✓</span></p><p>Buscando universidades y oportunidades <span>✓</span></p><p>Generando tu roadmap personalizado <span>✓</span></p></div><div class="analysis-loader"><span></span></div><small>Tu resultado estará listo en un momento.</small></div></main>`;
  const lines = [...app.querySelectorAll(".analysis-lines p")];
  lines.forEach((line, index) => setTimeout(() => line.classList.add("is-active"), index * 650));

  // Antes esto era "fire and forget": se llamaba al conector sin esperar
  // la respuesta y se avanzaba a "partial" con un setTimeout fijo,
  // confiando en que 3.4s alcanzaran. La pantalla de resultados completos
  // (renderFullResults) depende de tener aiResult de verdad, asi que ahora
  // se espera la promesa real y se guarda el resultado (o el error) antes
  // de avanzar. minDelay conserva la animacion aunque la respuesta llegue
  // rapido.
  const minDelay = new Promise((resolve) => setTimeout(resolve, 3400));
  const aiCall = window.FuturePilotAIConnector
    ? window.FuturePilotAIConnector.sendAssessmentToPythonAI(answers)
    : Promise.resolve(null);

  Promise.all([minDelay, aiCall]).then(([, data]) => {
    aiResult = data;
    aiError = data ? "" : "No pudimos conectar con la IA para tu analisis completo. Tus resultados parciales igual quedaron guardados.";
    screen = "partial";
    render();
  });
}
function renderPartialResults() {
  const assessmentResult = assessmentEngine.buildAssessmentResult(results);
  const careers = assessmentResult.topThree.map(([cluster], index) => ({ name: assessmentEngine.careerMap[cluster]?.[0] || assessmentResult.recommendedCareers[index] || "Career path", percentage: assessmentResult.clusterPercentages[cluster] || 0, cluster }));
  localStorage.setItem(RESULTS_KEY, JSON.stringify(assessmentResult));
  localStorage.setItem("selectedCareer", assessmentResult.topCareer);
  localStorage.setItem("academicLevel", `${assessmentResult.mathLevel} / ${assessmentResult.englishLevel}`);
  app.innerHTML = `<main class="results-screen screen-enter"><div class="results-topline"><span class="brand"><img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span></span><span class="result-chip">ANÁLISIS COMPLETADO <b>✓</b></span></div><section class="results-intro"><p class="eyebrow"><span class="eyebrow-dot"></span> TU PRIMERA SEÑAL</p><h1>Hay algo especial<br><span>en tu combinación.</span></h1><p>Estas son las primeras rutas que aparecen al mirar tu perfil. Lo mejor todavía está por desbloquearse.</p></section><section class="career-reveal"><div class="section-label"><span>TUS 3 CARRERAS PRINCIPALES</span><span>COINCIDENCIA</span></div>${careers.map((career, index) => `<div class="career-result"><span class="career-rank">0${index + 1}</span><span class="career-name">${escapeHtml(career.name)}</span><span class="career-score"><strong>${career.percentage}%</strong><span class="mini-bar"><i style="width:${career.percentage}%"></i></span></span></div>`).join("")}<div class="curiosity-line"><span>✦</span> Tu perfil tiene más matices de los que caben aquí.</div></section><section class="found-section"><h2>Tu perfil ya está trabajando por ti.</h2><div class="found-grid"><div>✓ <span>Encontramos universidades compatibles</span></div><div>✓ <span>Encontramos posibles becas</span></div><div>✓ <span>Generamos un roadmap personalizado</span></div><div>✓ <span>Creamos un plan académico</span></div></div></section><button type="button" class="primary-action primary-action--wide" data-action="unlock">Descubrir mi plan completo <span>→</span></button><p class="results-footnote">Tus resultados parciales quedan guardados. El acceso completo es gratuito.</p></main>`;
}

async function handleUnlock() {
  // Si ya hay sesion (tipico al repetir el test estando logueado), pedir
  // registrarse/iniciar sesion de nuevo seria un callejon sin salida
  // identico al reportado con "Sign In". Reclamamos el resultado nuevo con
  // el token que ya existe y vamos directo a resultados completos - el
  // Pasaporte se actualiza solo, sin que el usuario tenga que re-loguearse.
  const existingToken = localStorage.getItem("futurePilotAuthToken");

  if (existingToken && window.FuturePilotResultClaim.pendingResultId()) {
    // Una sola implementacion del claim, compartida con login.js (ver
    // result-claim.js). Si falla, el result_id se CONSERVA y se reintenta
    // solo la proxima vez que cargue esta pagina - antes se borraba pase
    // lo que pase, y el resultado quedaba huerfano en la base de datos.
    await window.FuturePilotResultClaim.claimPendingAndCelebrate(existingToken);
    screen = "results";
    render();
    return;
  }

  screen = "unlock";
  render();
}

function renderUnlock() {
  // Antes de aca habia un formulario de login/registro propio (renderAuth/
  // handleAuthSubmit), un segundo diseño de auth distinto al de /login.
  // Ahora estos dos botones son navegacion real a la unica pagina de login
  // de FuturePilot - el resultado anonimo (futurePilotResultId, ya en
  // localStorage) se reclama del lado de login.js apenas termina el
  // registro/login, antes de volver aca.
  app.innerHTML = `<main class="unlock-screen screen-enter"><div class="unlock-glow"></div><span class="unlock-icon">✦</span><p class="eyebrow"><span class="eyebrow-dot"></span> TU PERFIL YA ESTÁ LISTO</p><h1>Ahora sí, vamos a<br><span>despegar.</span></h1><p class="unlock-copy">Crea una cuenta gratuita para guardar tu perfil y descubrir todo lo que FuturePilot preparó para ti.</p><section class="unlock-list"><div><b>✓</b> Universidades compatibles</div><div><b>✓</b> Becas y oportunidades</div><div><b>✓</b> Costos de vida</div><div><b>✓</b> Comparador de ciudades</div><div><b>✓</b> Roadmap personalizado</div><div><b>✓</b> Seguimiento de progreso</div></section><div class="auth-actions"><button type="button" class="primary-action" data-action="go-to-login" data-mode="register">Crear cuenta gratis <span>→</span></button><button type="button" class="secondary-action secondary-action--large" data-action="go-to-login" data-mode="login">Ya tengo una cuenta</button></div><p class="auth-note">Sin tarjeta de crédito · Tus resultados siempre son tuyos</p></main>`;
}

function renderFullResults() {
  if (!aiResult) {
    app.innerHTML = `<main class="results-screen screen-enter">
      <section class="results-intro">
        <p class="eyebrow"><span class="eyebrow-dot"></span> ALGO SALIÓ MAL</p>
        <h1>No pudimos cargar<br><span>tu análisis completo.</span></h1>
        <p>${escapeHtml(aiError || "Intenta de nuevo en unos segundos.")}</p>
        <button type="button" class="primary-action primary-action--wide" data-action="retry-analysis">Reintentar <span>→</span></button>
      </section>
    </main>`;
    return;
  }

  const user = JSON.parse(localStorage.getItem("futurePilotUser") || "null");
  const careers = aiResult.recommended_careers || [];
  const strengths = aiResult.strengths || [];
  const weaknesses = aiResult.weaknesses || [];

  app.innerHTML = `<main class="results-screen screen-enter">
    <div class="results-topline"><span class="brand"><img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span></span><span class="result-chip">CUENTA ACTIVA <b>✓</b></span></div>
    <section class="results-intro">
      <p class="eyebrow"><span class="eyebrow-dot"></span> TU PERFIL COMPLETO</p>
      <h1>${user && user.name ? escapeHtml(user.name) + "," : ""} esto es<br><span>lo que encontramos.</span></h1>
      <p>Arquetipo: <strong>${escapeHtml(aiResult.personality || "")}</strong> · Estilo de aprendizaje: <strong>${escapeHtml(aiResult.learning_style || "")}</strong> · Confianza del análisis: <strong>${Math.round((aiResult.confidence || 0) * 100)}%</strong></p>
    </section>
    <section class="strengths-section">
      <div class="section-label"><span>FORTALEZAS</span></div>
      <div class="chip-row">${strengths.length ? strengths.map((s) => `<span class="chip chip--strength">${escapeHtml(s)}</span>`).join("") : `<span class="chip chip--strength">Perfil equilibrado</span>`}</div>
      <div class="section-label"><span>ÁREAS DE OPORTUNIDAD</span></div>
      <div class="chip-row">${weaknesses.length ? weaknesses.map((s) => `<span class="chip chip--gap">${escapeHtml(s)}</span>`).join("") : `<span class="chip chip--gap">Sin brechas notables</span>`}</div>
    </section>
    <section class="career-reveal">
      <div class="section-label"><span>CARRERAS RECOMENDADAS</span><span>COINCIDENCIA</span></div>
      ${careers.map((career, index) => `<div class="career-result career-result--full"><span class="career-rank">${String(index + 1).padStart(2, "0")}</span><div class="career-copy"><span class="career-name">${escapeHtml(career.title)}</span><p class="career-justification">${escapeHtml(career.justification)}</p></div><span class="career-score"><strong>${career.match_percentage}%</strong><span class="mini-bar"><i style="width:${career.match_percentage}%"></i></span></span></div>`).join("")}
    </section>
    <button type="button" class="primary-action primary-action--wide" data-action="explore-globe">Explorar el Globo <span>→</span></button>
    <button type="button" class="secondary-action secondary-action--large" data-action="view-passport">Ver mi Pasaporte <span>→</span></button>
    <p class="results-footnote">Tu perfil queda guardado en tu cuenta. Explora el globo para conectar tu carrera con países, universidades y oportunidades reales.</p>
    <button type="button" class="text-action" data-action="retake-test">¿Cambió algo? Repetir el test</button>
  </main>`;
}

function goNext() {
  if (!hasCurrentAnswer()) return;
  if (currentQuestion === QUESTION_COUNT - 1) {
    results = assessmentEngine.calculateResults(questions, answers, results);
    localStorage.removeItem(STORAGE_KEY);
    screen = "analysis";
    render();
    return;
  }
  currentQuestion += 1;
  saveProgress();
  render();
}

function skipQuestion() {
  setAnswer(null);
  if (currentQuestion === QUESTION_COUNT - 1) {
    localStorage.removeItem(STORAGE_KEY);
    screen = "analysis";
  } else currentQuestion += 1;
  render();
}

function startAssessment(restart = false) {
  if (restart) {
    currentQuestion = 0;
    answers = [];
    results = assessmentEngine.createInitialResults();
    localStorage.removeItem(STORAGE_KEY);
  }
  screen = "question";
  render();
}

app.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "start") startAssessment();
  if (action === "restart") startAssessment(true);
  if (action === "next") goNext();
  if (action === "skip") skipQuestion();
  if (action === "back" && currentQuestion > 0) { currentQuestion -= 1; render(); }
  if (action === "exit") { screen = "welcome"; render(); }
  if (action === "unlock") { handleUnlock(); }
  if (action === "go-to-login") {
    const mode = event.target.closest("[data-action]")?.dataset.mode || "register";
    window.location.href = "/login?mode=" + mode;
  }
  if (action === "retry-analysis") { screen = "analysis"; render(); }
  if (action === "explore-globe") { window.location.href = "/globe"; }
  if (action === "view-passport") { window.location.href = "/passport"; }
  if (action === "retake-test") {
    // Voluntario y explicito: solo se dispara desde el boton en la
    // pantalla de resultados, nunca automatico. questions ya esta cargado
    // desde init(), asi que no hace falta volver a pedirlo.
    currentQuestion = 0;
    answers = [];
    results = assessmentEngine.createInitialResults();
    aiResult = null;
    aiError = "";
    localStorage.removeItem(STORAGE_KEY);
    screen = "question";
    render();
  }
});

async function init() {
  // Fuente unica de verdad: futurepilot-IA/data/questions.json, servido via
  // /api/v1/questions por el backend unificado. window.FUTUREPILOT_QUESTIONS
  // (questions-data.js) queda solo como fallback para cuando el HTML se abre
  // directo con file:// (sin servidor), y se regenera con
  // scripts/sync_frontend_data.py - no se edita a mano.
  if (location.protocol !== "file:") {
    try {
      const response = await fetch("/api/v1/questions");
      const data = await response.json();
      questions = data.questions;
    } catch (error) {
      if (!Array.isArray(window.FUTUREPILOT_QUESTIONS)) throw error;
      questions = window.FUTUREPILOT_QUESTIONS;
    }
  } else if (Array.isArray(window.FUTUREPILOT_QUESTIONS)) {
    questions = window.FUTUREPILOT_QUESTIONS;
  } else {
    throw new Error("No hay fuente de preguntas disponible para la vista file://.");
  }

  // Resume automatico: si hay una sesion valida con un resultado ya
  // guardado para esa cuenta, se salta directo a la pantalla de resultados
  // completos - nadie debe repetir el test solo por volver a iniciar
  // sesion. questions ya quedo cargado arriba de todos modos, para que
  // "Repetir el test" (voluntario, boton en resultados) funcione sin
  // pedirlo de nuevo.
  const authToken = localStorage.getItem("futurePilotAuthToken");

  // Red de seguridad: si quedo un resultado sin vincular de un intento
  // anterior (el claim fallo por red, o el usuario eligio "continuar sin
  // vincular" en /login), se reintenta aca en silencio antes de preguntar
  // por los resultados. Es idempotente, asi que no hay riesgo en llamarlo
  // de mas, y evita que un fallo transitorio deje el resultado huerfano
  // para siempre.
  if (authToken && location.protocol !== "file:" && window.FuturePilotResultClaim?.pendingResultId()) {
    await window.FuturePilotResultClaim.claimPendingAndCelebrate(authToken);
  }

  if (authToken && location.protocol !== "file:") {
    try {
      const response = await fetch("/api/v1/me/results", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status === 401) {
        // Antes esto se limpiaba en silencio y el usuario caia de vuelta a
        // la pantalla de inicio del test - visto desde "Mi cuenta" (que
        // enlaza directo aca), eso se sentia como si la app te empujara a
        // repetir el test de la nada, sin ninguna pista de que la sesion
        // ya no era valida. Ahora se manda a /login para que pueda volver a
        // entrar y, si tiene un resultado guardado, login.js ya lo trae de
        // vuelta a /assessment con la sesion fresca.
        localStorage.removeItem("futurePilotAuthToken");
        localStorage.removeItem("futurePilotUser");
        window.location.href = "/login?mode=login";
        return;
      } else if (response.ok) {
        const data = await response.json();
        if (data.results) {
          aiResult = data.results;
          aiError = "";
          screen = "results";
          render();
          return;
        }
      }
    } catch (error) {
      // Sin conexion o backend caido: seguimos con el flujo normal abajo
      // en vez de dejar al usuario atascado.
    }
  }

  const saved = savedAssessment();
  if (saved) {
    currentQuestion = Math.min(saved.currentQuestion || 0, questions.length - 1);
    answers = saved.answers || [];
    results = saved.results || assessmentEngine.createInitialResults();
  }
  render();
}

init().catch(() => { app.innerHTML = `<main class="error-screen"><h1>No pudimos cargar tu exploración.</h1><p>Recarga la página para intentarlo de nuevo.</p></main>`; });
})();
