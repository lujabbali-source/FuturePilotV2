// Pantalla del test vocacional.
//
// Los dos modulos que solo usa esta pagina (el motor de clusters y el
// renderizado de cada tipo de pregunta) se importan de verdad, en vez de
// leerse de window esperando que otro <script> los haya definido antes.
//
// Todo lo que esta pagina necesita se importa: los dos modulos propios y,
// desde src/shared/, el claim del resultado y el conector de la API - los
// dos eran globales de window mientras los compartia con paginas sin
// migrar, y dejaron de serlo al migrarlas.
import * as assessmentEngine from "./engine.js";
import * as questionTypes from "./questionTypes.js";
import { claimPendingAndCelebrate, pendingResultId } from "../shared/resultClaim.js";
import { sendAssessmentToPythonAI } from "../shared/apiConnector.js";
import { t, currentLanguage, onLanguageChange } from "../shared/i18next.js";
import { renderDashboard } from "./dashboard.js";
import "./dashboard.css";

// Estado que solo vive en la pantalla de cuenta: que carrera esta desplegada,
// si hay un formulario abierto y el ultimo mensaje. Se guarda aparte del
// resultado porque no viene del servidor ni sobrevive a una recarga.
let dashData = null;
const dashState = { openCareer: null, passwordForm: false, deleteForm: false, message: "" };

const STORAGE_KEY = "futurePilotAssessment";
const RESULTS_KEY = "futurePilotResults";

const app = document.querySelector("#assessment-app");
let questions = [];

// Cuantas preguntas tiene el test. Era la constante QUESTION_COUNT = 50,
// pero las preguntas llegan de /api/v1/questions: no solo pintaba mal la
// barra de progreso si el JSON cambiaba de tamaño, es que decide cuando
// TERMINA el test (ver goNext y skipQuestion). Con 45 preguntas el test no
// habria terminado nunca; con 60, se habria cortado en la 50.
function questionCount() {
  return questions.length;
}
let currentQuestion = 0;
let answers = [];
let results = assessmentEngine.createInitialResults();
let screen = "welcome";

let aiResult = null;
let aiError = "";

// Se resuelven en cada render, no una vez al cargar: si no, quedarian
// congeladas en el idioma inicial al cambiar de idioma a mitad del test.
const LOCKED_PERKS = ["partial.locked1", "partial.locked2", "partial.locked3", "partial.locked4"];
const UNLOCK_PERKS = ["unlock.perk1", "unlock.perk2", "unlock.perk3", "unlock.perk4", "unlock.perk5", "unlock.perk6"];
const PHASE_COUNT = 5;
const phaseName = (index) => t(`progress.phase${index + 1}`);

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

/** Aplica los anchos marcados con data-fill.
 *
 *  Las barras de progreso y de compatibilidad se pintaban con
 *  style="width:N%" en el HTML. Un atributo style inline es justo lo que
 *  'unsafe-inline' en style-src permite, y era lo unico que impedia cerrar
 *  esa directiva. Asignar element.style desde JavaScript es CSSOM y la CSP
 *  no lo bloquea, asi que el resultado visual es identico sin la concesion.
 */
function applyFills() {
  app.querySelectorAll("[data-fill]").forEach((element) => {
    element.style.width = `${element.dataset.fill}%`;
  });
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
  const hasSavedProgress = saved && saved.currentQuestion > 0 && saved.currentQuestion < questionCount();
  app.innerHTML = `<main class="welcome-screen screen-enter">
    <div class="welcome-orbit"><span class="orbit-core">✦</span><span class="orbit-ring orbit-ring--one"></span><span class="orbit-ring orbit-ring--two"></span></div>
    <div class="eyebrow"><span class="eyebrow-dot"></span> ${t("welcome.eyebrow")}</div>
    <h1>${t("welcome.title")}<br><span>${t("welcome.titleAccent")}</span></h1>
    <p class="welcome-copy">${t("welcome.copy")}</p>
    <div class="welcome-stats"><span><strong>${questionCount() || 50}</strong> ${t("welcome.statQuestions")}</span><i></i><span><strong>${Math.max(5, Math.round(questionCount() / 5)) || 10}</strong> ${t("welcome.statMinutes")}</span><i></i><span><strong>1</strong> ${t("welcome.statProfile")}</span></div>
    <button type="button" class="primary-action primary-action--wide" data-action="start">${hasSavedProgress ? t("welcome.resume") : t("welcome.start")}<span>→</span></button>
    ${hasSavedProgress ? `<button type="button" class="text-action" data-action="restart">${t("welcome.restart")}</button><p class="resume-note">${t("welcome.resumeNote", { question: saved.currentQuestion + 1 })}</p>` : `<p class="privacy-note"><span>◉</span> ${t("welcome.privacyNote")}</p>`}
    <div class="welcome-footer"><span>${t("welcome.footerLeft")}</span><span>${t("welcome.footerRight")}</span></div>
  </main>`;
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const state = currentAnswer();
  const { format, html } = questionTypes.renderQuestionOptions(question, currentQuestion, state);
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const progressMessage = questionTypes.getProgressMessage(currentQuestion);
  // Las 5 fases se reparten el test proporcionalmente. Estaba fijo en
  // bloques de 10, que solo cuadra si el test tiene exactamente 50.
  const perPhase = Math.max(1, Math.ceil(questionCount() / PHASE_COUNT));
  const phaseIndex = Math.min(Math.floor(currentQuestion / perPhase), PHASE_COUNT - 1);
  const phase = phaseName(phaseIndex);
  const phaseTrack = Array.from({ length: PHASE_COUNT }, (_, i) => phaseName(i)).map((name, index) => `<span class="phase-dot ${index < phaseIndex ? "is-done" : ""} ${index === phaseIndex ? "is-current" : ""}" title="${escapeHtml(name)}"></span>`).join("");

  app.innerHTML = `<main class="test-shell screen-enter">
    <!-- Sin marca: la cabecera compartida ya la pone justo encima, y dos
         logos seguidos en la pantalla mas larga del recorrido solo roban
         espacio. Aqui queda lo que es propio del test. -->
    <header class="test-header test-header--bare">
      <div class="save-indicator"><span></span> ${t("nav.autosaved")}</div>
      <button type="button" class="exit-action" data-action="exit">${t("nav.exit")}</button>
    </header>
    <section class="progress-section" aria-label="${t("progress.eyebrow")}">
      <p class="progress-eyebrow">${t("progress.eyebrow")}</p>
      <div class="progress-meta"><span class="progress-message">${progressMessage.label}</span><span><strong>${String(currentQuestion + 1).padStart(2, "0")}</strong> / ${questionCount()}</span></div>
      <div class="progress-bar"><span data-fill="${progress}"></span></div>
      <div class="progress-submeta"><span>${progressMessage.detail}</span><span>${phase}</span></div>
      <div class="phase-track">${phaseTrack}</div>
    </section>
    <section class="question-stage" data-format="${format}">
      <div class="question-kicker"><span class="kicker-number">${String(currentQuestion + 1).padStart(2, "0")}</span><span>${question.type === "personality" ? t("kind.personality") : t("kind.interest")} · ${formatLabel(format)}</span></div>
      <h2>${escapeHtml(question.question)}</h2>
      <div class="question-options">${html}</div>
    </section>
    <footer class="question-footer">
      <button type="button" class="secondary-action" data-action="back" ${currentQuestion === 0 ? "disabled" : ""}>← <span>${t("nav.back")}</span></button>
      <div class="footer-center"><button type="button" class="skip-action" data-action="skip">${t("nav.skip")}</button></div>
      <button type="button" class="primary-action" data-action="next" ${hasCurrentAnswer() ? "" : "disabled"}>${currentQuestion === questionCount() - 1 ? t("nav.finish") : t("nav.next")}<span>→</span></button>
    </footer>
  </main>`;
  applyFills();
  bindQuestionEvents(format);
}

function formatLabel(format) {
  return t(`format.${format}`);
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
    const label = t(`slider.level${value}`);
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
  app.innerHTML = `<main class="analysis-screen screen-enter"><div class="analysis-card"><div class="analysis-mark"><span></span><span></span><span></span></div><p class="eyebrow">${t("analysis.eyebrow")}</p><h1>${t("analysis.title")}<br><span>${t("analysis.titleAccent")}</span></h1><div class="analysis-lines"><p class="is-active">${t("analysis.line1")} <span>✓</span></p><p>${t("analysis.line2")} <span>✓</span></p><p>${t("analysis.line3")} <span>✓</span></p><p>${t("analysis.line4")} <span>✓</span></p></div><div class="analysis-loader"><span></span></div><small>${t("analysis.wait")}</small></div></main>`;
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
  const aiCall = sendAssessmentToPythonAI(answers);

  Promise.all([minDelay, aiCall]).then(([, data]) => {
    aiResult = data;
    aiError = data ? "" : t("unavailable.fallbackError");
    screen = "partial";
    render();
  });
}
function renderPartialResults() {
  const assessmentResult = assessmentEngine.buildAssessmentResult(results);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(assessmentResult));

  // Las carreras salen del MISMO resultado que veran al desbloquear: esta
  // pantalla es una vista recortada de aiResult, no un segundo calculo.
  // Registrarse revela mas profundidad (justificaciones, roadmap, brechas,
  // universidades), nunca un veredicto distinto.
  if (!aiResult) return renderPartialUnavailable(assessmentResult);

  const careers = (aiResult.recommended_careers || []).slice(0, 3).map((career) => ({
    name: career.title,
    percentage: Math.round(career.match_percentage),
  }));
  if (!careers.length) return renderPartialUnavailable(assessmentResult);

  // Lo consumen /journey y /flightplan. Debe ser la carrera real, no la
  // que adivinaba el motor local.
  localStorage.setItem("selectedCareer", careers[0].name);
  // El copy no promete que el resultado vaya a cambiar al registrarse -
  // porque no cambia. Lo que se desbloquea es profundidad sobre ESTAS
  // mismas carreras, y eso es lo que enumera la lista de abajo.
  app.innerHTML = `<main class="results-screen screen-enter"><div class="results-topline"><span class="brand"><img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span></span><span class="result-chip">${t("partial.chip")} <b>✓</b></span></div><section class="results-intro"><p class="eyebrow"><span class="eyebrow-dot"></span> ${t("partial.eyebrow")}</p><h1>${t("partial.title")}<br><span>${t("partial.titleAccent")}</span></h1><p>${t("partial.copy")}</p></section><section class="career-reveal"><div class="section-label"><span>${t("partial.listLabel")}</span><span>${t("partial.listScore")}</span></div>${careers.map((career, index) => `<div class="career-result"><span class="career-rank">0${index + 1}</span><span class="career-name">${escapeHtml(career.name)}</span><span class="career-score"><strong>${career.percentage}%</strong><span class="mini-bar"><i data-fill="${career.percentage}"></i></span></span></div>`).join("")}<div class="curiosity-line"><span>✦</span> ${t("partial.curiosity")}</div></section><section class="found-section"><h2>${t("partial.lockedTitle")}</h2><div class="found-grid">${LOCKED_PERKS.map((key) => `<div>🔒 <span>${t(key)}</span></div>`).join("")}</div></section><button type="button" class="primary-action primary-action--wide" data-action="unlock">${t("partial.cta")} <span>→</span></button><p class="results-footnote">${t("partial.footnote")}</p></main>`;
  applyFills();
}

async function handleUnlock() {
  // Si ya hay sesion (tipico al repetir el test estando logueado), pedir
  // registrarse/iniciar sesion de nuevo seria un callejon sin salida
  // identico al reportado con "Sign In". Reclamamos el resultado nuevo con
  // el token que ya existe y vamos directo a resultados completos - el
  // Pasaporte se actualiza solo, sin que el usuario tenga que re-loguearse.
  const existingToken = localStorage.getItem("futurePilotAuthToken");

  if (existingToken && pendingResultId()) {
    // Una sola implementacion del claim, compartida con login.js (ver
    // result-claim.js). Si falla, el result_id se CONSERVA y se reintenta
    // solo la proxima vez que cargue esta pagina - antes se borraba pase
    // lo que pase, y el resultado quedaba huerfano en la base de datos.
    await claimPendingAndCelebrate(existingToken);
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
  app.innerHTML = `<main class="unlock-screen screen-enter"><div class="unlock-glow"></div><span class="unlock-icon">✦</span><p class="eyebrow"><span class="eyebrow-dot"></span> ${t("unlock.eyebrow")}</p><h1>${t("unlock.title")}<br><span>${t("unlock.titleAccent")}</span></h1><p class="unlock-copy">${t("unlock.copy")}</p><section class="unlock-list">${UNLOCK_PERKS.map((key) => `<div><b>✓</b> ${t(key)}</div>`).join("")}</section><div class="auth-actions"><button type="button" class="primary-action" data-action="go-to-login" data-mode="register">${t("unlock.register")} <span>→</span></button><button type="button" class="secondary-action secondary-action--large" data-action="go-to-login" data-mode="login">${t("unlock.haveAccount")}</button></div><p class="auth-note">${t("unlock.note")}</p></main>`;
}

/** El analisis del servidor no llego. Antes esta pantalla caia en el motor
 *  local y enseñaba carreras inventadas por un catalogo paralelo - que es
 *  justo lo que se elimino. Ahora se muestra lo unico que si sabemos con
 *  certeza (que dimensiones dominan su perfil, calculadas con los mismos
 *  ocho clusters del backend) y se ofrece reintentar. Preferimos decir
 *  menos a decir algo que luego se contradice. */
function renderPartialUnavailable(assessmentResult) {
  const dims = assessmentResult.topThree
    .map(([cluster]) => ({ label: t(`cluster.${cluster}`, { defaultValue: cluster }), pct: assessmentResult.clusterPercentages[cluster] || 0 }));

  app.innerHTML = `<main class="results-screen screen-enter">
    <div class="results-topline"><span class="brand"><img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span></span></div>
    <section class="results-intro">
      <p class="eyebrow"><span class="eyebrow-dot"></span> ${t("unavailable.eyebrow")}</p>
      <h1>${t("unavailable.title")}<br><span>${t("unavailable.titleAccent")}</span></h1>
      <p>${t("unavailable.copy")}</p>
    </section>
    <section class="career-reveal">
      <div class="section-label"><span>${t("unavailable.listLabel")}</span><span>${t("unavailable.listScore")}</span></div>
      ${dims.map((dim, index) => `<div class="career-result"><span class="career-rank">0${index + 1}</span><span class="career-name">${escapeHtml(dim.label)}</span><span class="career-score"><strong>${dim.pct}%</strong><span class="mini-bar"><i data-fill="${dim.pct}"></i></span></span></div>`).join("")}
    </section>
    <p>${escapeHtml(aiError || t("unavailable.fallbackError"))}</p>
    <button type="button" class="primary-action primary-action--wide" data-action="retry-analysis">${t("unavailable.retry")} <span>→</span></button>
  </main>`;
  applyFills();
}

function renderFullResults() {
  if (!aiResult) {
    app.innerHTML = `<main class="results-screen screen-enter">
      <section class="results-intro">
        <p class="eyebrow"><span class="eyebrow-dot"></span> ${t("error.resultsEyebrow")}</p>
        <h1>${t("error.resultsTitle")}<br><span>${t("error.resultsTitleAccent")}</span></h1>
        <p>${escapeHtml(aiError || t("error.resultsFallback"))}</p>
        <button type="button" class="primary-action primary-action--wide" data-action="retry-analysis">${t("error.retry")} <span>→</span></button>
      </section>
    </main>`;
    return;
  }

  const user = JSON.parse(localStorage.getItem("futurePilotUser") || "null");

  // Con los datos de cuenta ya cargados se pinta el dashboard completo. Si
  // todavia no han llegado - o si el test se acaba de hacer sin sesion - se
  // pinta la hoja de resultados de siempre, que no necesita mas que
  // `aiResult`. Nadie se queda mirando una pantalla vacia esperando datos
  // que quiza no lleguen nunca.
  if (dashData) {
    app.innerHTML = renderDashboard({ data: dashData, user, estado: dashState });
    applyFills();
    return;
  }

  const careers = aiResult.recommended_careers || [];
  const strengths = aiResult.strengths || [];
  const weaknesses = aiResult.weaknesses || [];

  app.innerHTML = `<main class="results-screen screen-enter">
    <div class="results-topline"><span class="brand"><img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span></span><span class="result-chip">${t("full.chip")} <b>✓</b></span></div>
    <section class="results-intro">
      <p class="eyebrow"><span class="eyebrow-dot"></span> ${t("full.eyebrow")}</p>
      <h1>${user && user.name ? escapeHtml(user.name) + "," : ""} ${t("full.title")}<br><span>${t("full.titleAccent")}</span></h1>
      <p>${t("full.archetype")}: <strong>${escapeHtml(aiResult.personality || "")}</strong> · ${t("full.learningStyle")}: <strong>${escapeHtml(aiResult.learning_style || "")}</strong> · ${t("full.confidence")}: <strong>${Math.round((aiResult.confidence || 0) * 100)}%</strong></p>
    </section>
    <section class="strengths-section">
      <div class="section-label"><span>${t("full.strengths")}</span></div>
      <div class="chip-row">${strengths.length ? strengths.map((s) => `<span class="chip chip--strength">${escapeHtml(s)}</span>`).join("") : `<span class="chip chip--strength">${t("full.noStrengths")}</span>`}</div>
      <div class="section-label"><span>${t("full.gaps")}</span></div>
      <div class="chip-row">${weaknesses.length ? weaknesses.map((s) => `<span class="chip chip--gap">${escapeHtml(s)}</span>`).join("") : `<span class="chip chip--gap">${t("full.noGaps")}</span>`}</div>
    </section>
    <section class="career-reveal">
      <div class="section-label"><span>${t("full.careers")}</span><span>${t("full.score")}</span></div>
      ${careers.map((career, index) => `<div class="career-result career-result--full"><span class="career-rank">${String(index + 1).padStart(2, "0")}</span><div class="career-copy"><span class="career-name">${escapeHtml(career.title)}</span><p class="career-justification">${escapeHtml(career.justification)}</p></div><span class="career-score"><strong>${career.match_percentage}%</strong><span class="mini-bar"><i data-fill="${career.match_percentage}"></i></span></span></div>`).join("")}
    </section>
    <button type="button" class="primary-action primary-action--wide" data-action="explore-globe">${t("full.exploreGlobe")} <span>→</span></button>
    <button type="button" class="secondary-action secondary-action--large" data-action="view-passport">${t("full.viewPassport")} <span>→</span></button>
    <p class="results-footnote">${t("full.footnote")}</p>
    <button type="button" class="text-action" data-action="retake-test">${t("full.retake")}</button>
  </main>`;
  applyFills();
}

function goNext() {
  if (!hasCurrentAnswer()) return;
  if (currentQuestion === questionCount() - 1) {
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
  if (currentQuestion === questionCount() - 1) {
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

  // --- Pantalla de cuenta -------------------------------------------------
  const careerToggle = event.target.closest("[data-career]");
  if (careerToggle) {
    // Un segundo clic sobre la misma carrera la cierra.
    const id = careerToggle.dataset.career;
    dashState.openCareer = dashState.openCareer === id ? null : id;
    render();
    return;
  }

  const dnaRow = event.target.closest("[data-dna]");
  if (dnaRow) {
    // Se alterna en el DOM en vez de repintar: repintar la pantalla entera
    // para desplegar una linea reinicia la animacion de las ocho barras.
    const abierto = dnaRow.getAttribute("aria-expanded") === "true";
    dnaRow.setAttribute("aria-expanded", abierto ? "false" : "true");
    return;
  }

  if (action === "change-password") { dashState.passwordForm = true; dashState.message = ""; render(); }
  if (action === "cancel-password") { dashState.passwordForm = false; render(); }
  if (action === "delete-account") { dashState.deleteForm = true; dashState.message = ""; render(); }
  if (action === "cancel-delete") { dashState.deleteForm = false; render(); }
  if (action === "logout") { signOut(); }
  if (action === "export-data") { exportMyData(); }
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

app.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();
  if (form.dataset.form === "password") changePassword(form);
  else if (form.dataset.form === "delete") deleteAccount(form);
});

function authHeaders() {
  const token = localStorage.getItem("futurePilotAuthToken");
  return token ? { Authorization: `Bearer ${token}` } : null;
}

/** Cierra la sesion en el servidor antes de olvidar el token.
 *
 *  Si solo se borrara del navegador, el token seguiria siendo valido hasta
 *  que caducara: quien lo tuviera copiado seguiria dentro. */
async function signOut() {
  const headers = authHeaders();
  try {
    if (headers) await fetch("/api/v1/auth/logout", { method: "POST", headers });
  } catch {
    // Sin red no se puede invalidar en servidor, pero salir de la sesion
    // local no puede quedarse bloqueado por eso.
  }
  localStorage.removeItem("futurePilotAuthToken");
  localStorage.removeItem("futurePilotUser");
  window.location.href = "/";
}

/** Descarga un JSON con todo lo que la plataforma guarda de la cuenta. */
async function exportMyData() {
  const headers = authHeaders();
  if (!headers) return;
  try {
    const response = await fetch("/api/v1/me/export", { headers });
    if (!response.ok) throw new Error("export");
    const blob = new Blob([JSON.stringify(await response.json(), null, 2)],
                          { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "futurepilot-mis-datos.json";
    enlace.click();
    URL.revokeObjectURL(url);
  } catch {
    dashState.message = t("dash.account.error");
    render();
  }
}

async function changePassword(form) {
  const headers = authHeaders();
  if (!headers) return;
  const datos = new FormData(form);
  try {
    const response = await fetch("/api/v1/me/password", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        current_password: String(datos.get("current_password") || ""),
        new_password: String(datos.get("new_password") || ""),
      }),
    });
    if (!response.ok) {
      dashState.message = t("dash.account.error");
      render();
      return;
    }
    // El servidor invalida TODAS las sesiones al cambiar la contrasena,
    // incluida esta. Es lo que se quiere, asi que se sale limpiamente en vez
    // de dejar la pantalla con un token que ya no vale.
    localStorage.removeItem("futurePilotAuthToken");
    localStorage.removeItem("futurePilotUser");
    window.location.href = "/login?mode=login";
  } catch {
    dashState.message = t("dash.account.error");
    render();
  }
}

async function deleteAccount(form) {
  const headers = authHeaders();
  if (!headers) return;
  const datos = new FormData(form);
  try {
    const response = await fetch("/api/v1/me", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ password: String(datos.get("password") || "") }),
    });
    if (!response.ok) {
      dashState.message = t("dash.account.error");
      render();
      return;
    }
    localStorage.clear();
    window.location.href = "/";
  } catch {
    dashState.message = t("dash.account.error");
    render();
  }
}

/** Trae los datos de cuenta: progreso, actividad, historial y ajustes.
 *
 *  Es lo que convierte la pantalla de resultados en una pantalla de cuenta.
 *  Si falla no se corta nada: `dashData` se queda en null y se pinta la hoja
 *  de resultados de siempre. */
async function loadDashboard() {
  const headers = authHeaders();
  if (!headers) return null;
  try {
    const response = await fetch(`/api/v1/me/dashboard?lang=${currentLanguage()}`, { headers });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

/** Trae el banco de preguntas ya traducido por el servidor.
 *
 *  El texto de las 50 preguntas vive en questions.json junto a sus
 *  metadatos de puntuacion, y /api/v1/questions lo resuelve al idioma
 *  pedido. Se pide por ?lang= en vez de traducirlo en el cliente porque
 *  duplicar 50 preguntas en el bundle solo para elegir una mitad seria
 *  cargar el doble y arriesgarse a que las dos copias diverjan. */
async function loadQuestions() {
  const response = await fetch(`/api/v1/questions?lang=${currentLanguage()}`);
  const data = await response.json();
  questions = data.questions;
}

async function init() {
  // Fuente unica de verdad: futurepilot-IA/data/questions.json, servido via
  // /api/v1/questions por el backend unificado.
  //
  // Antes habia un segundo camino: window.FUTUREPILOT_QUESTIONS, una copia
  // de las 50 preguntas generada en Frontend/questions-data.js por
  // scripts/sync_frontend_data.py, para poder abrir la pagina con file://
  // sin servidor. Esta pagina ahora se compila y solo se sirve por HTTP,
  // asi que ese camino desaparecio - y con el, la copia de los datos y el
  // script que habia que acordarse de correr para mantenerla al dia.
  await loadQuestions();

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
  if (authToken && pendingResultId()) {
    await claimPendingAndCelebrate(authToken);
  }

  if (authToken) {
    try {
      const response = await fetch(`/api/v1/me/results?lang=${currentLanguage()}`, {
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
          dashData = await loadDashboard();
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

// Cambiar de idioma tiene que rehacer las dos mitades de la pantalla: el
// texto de la interfaz (que sale de i18next, ya actualizado) y el de las
// preguntas (que hay que volver a pedirle al servidor en el idioma nuevo).
// Las respuestas ya dadas no se tocan: viven en `answers` por indice, y los
// indices no cambian con el idioma.
onLanguageChange(async () => {
  if (questions.length) {
    try {
      await loadQuestions();
    } catch {
      // Si la recarga falla nos quedamos con las preguntas que ya estaban:
      // media pantalla en otro idioma es mejor que una pantalla vacia.
    }
  }

  // El resultado tambien. Lo traduce el SERVIDOR (el arquetipo, la
  // justificacion de cada carrera, los nombres de las carreras y el
  // roadmap), asi que repintar con el que ya teniamos deja la pantalla
  // mitad en un idioma y mitad en el otro: los rotulos cambian y los datos
  // no. Hay que volver a pedirlo.
  const authToken = localStorage.getItem("futurePilotAuthToken");
  if (aiResult && authToken) {
    try {
      const response = await fetch(`/api/v1/me/results?lang=${currentLanguage()}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.results) aiResult = data.results;
      }
    } catch {
      // Igual que arriba: nos quedamos con lo que hay.
    }
    if (dashData) dashData = (await loadDashboard()) || dashData;
  }

  render();
});

init().catch(() => { app.innerHTML = `<main class="error-screen"><h1>${t("error.loadTitle")}</h1><p>${t("error.loadBody")}</p></main>`; });
