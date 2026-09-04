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
import { rebarajar, ordenDeOpciones } from "./shuffle.js";
import { senalQueCuenta } from "./multiSignal.js";
import { renderDashboard } from "./dashboard.js";
import "./dashboard.css";
import { radarMarkup, wireRadar, fiabilidad } from "./radar.js";
import "./radar.css";

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
// Que fallo exactamente en el ultimo intento de analisis. No es lo mismo
// "el servidor no contesto" (reintentar es lo correcto) que "no quedo
// ninguna respuesta que analizar" (reintentar no puede funcionar nunca).
let aiErrorCode = null;

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

/** Guarda el progreso del test.
 *
 *  `completed` marca que ya no falta ninguna pregunta y lo unico pendiente
 *  es el analisis. Al terminar el test se BORRABA esta entrada antes de
 *  llamar al servidor: si el analisis fallaba, la pantalla decia "tus
 *  respuestas siguen guardadas" y era mentira - recargar dejaba al
 *  estudiante en la bienvenida, con las 50 preguntas por delante otra vez.
 *  Ahora se borra cuando el analisis SALE BIEN, que es cuando el resultado
 *  ya vive en el servidor. */
function saveProgress(completed = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentQuestion, answers, results, completed }));
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
    <div class="welcome-orbit"><img class="orbit-core" src="/Frontend/futurepilot-logo-transparent.png" alt=""><span class="orbit-ring orbit-ring--one"></span><span class="orbit-ring orbit-ring--two"></span></div>
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
      // De las señales marcadas cuenta la que MAS puntua, elegida por
      // puntos y no por su posicion en el array: son niveles de evidencia,
      // y el mas alto que marques es el tuyo de verdad (ver multiSignal.js).
      const selectedIndices = [...selected].sort((a, b) => a - b);
      setAnswer(senalQueCuenta(questions[currentQuestion], selectedIndices), { selectedIndices });
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
    // La posicion de la barra ya no es el indice de la respuesta. data-slider-map
    // trae los indices canonicos ordenados de menos a mas puntos, asi que
    // "Nada" a la izquierda es de verdad la respuesta que menos puntua.
    const posicion = Number(event.target.value);
    const mapa = (event.target.dataset.sliderMap || "").split(",").map(Number);
    setAnswer(mapa[posicion]);
    app.querySelector("#slider-value").textContent = t(`slider.level${posicion}`);
    app.querySelectorAll(".slider-dot").forEach((dot) =>
      dot.classList.toggle("is-active", Number(dot.dataset.sliderPos) === posicion));
    app.querySelector('[data-action="next"]').disabled = false;
  });
  // Pulsar una fila la manda al primer puesto, que es la respuesta.
  //
  // Es el unico gesto de este formato que significa "esta es la que mas me
  // representa" sin obligar a reordenar nada. Sin el, quien estuviera de
  // acuerdo con el orden barajado que veia no tenia forma de responder y el
  // test se quedaba clavado en esa pregunta (ver renderRanking).
  app.querySelectorAll("[data-rank-pick]").forEach((button) => button.addEventListener("click", () => {
    const elegida = Number(button.dataset.rankPick);
    const order = [...(currentAnswer().rankOrder
      || ordenDeOpciones(questions[currentQuestion], currentQuestion, "ranking"))];
    // Sale de donde este y entra la primera; las demas conservan su orden
    // relativo, asi que la lista no se baraja bajo los dedos del estudiante.
    const resto = order.filter((indice) => indice !== elegida);
    setAnswer(elegida, { rankOrder: [elegida, ...resto] });
    renderQuestion();
  }));

  app.querySelectorAll("[data-rank-move]").forEach((button) => button.addEventListener("click", () => {
    // El orden de partida tiene que ser EL MISMO que se pinto. renderRanking
    // cae en `ordenDeOpciones` (el barajado) cuando aun no hay respuesta, y
    // aqui se caia en el orden canonico [0,1,2,3]. Con los dos desalineados,
    // "subir" y "bajar" reordenaban una lista que el estudiante no estaba
    // viendo: la flecha de la fila de arriba no hacia nada, la de otra fila
    // tampoco, y el indice que se guardaba (order[0]) no era el que habia
    // quedado primero en pantalla. ordenDeOpciones es determinista para la
    // misma semilla y pregunta, asi que llamarla aqui devuelve exactamente
    // la permutacion que se pinto.
    const order = [...(currentAnswer().rankOrder
      || ordenDeOpciones(questions[currentQuestion], currentQuestion, "ranking"))];
    const from = order.indexOf(Number(button.dataset.rankIndex));
    const to = button.dataset.rankMove === "up" ? from - 1 : from + 1;
    if (to < 0 || to >= order.length) return;
    [order[from], order[to]] = [order[to], order[from]];
    setAnswer(order[0], { rankOrder: order });
    renderQuestion();
  }));
}
/** El repaso: solo aparece si quedaron preguntas sin responder.
 *
 *  Dice el numero exacto y con cuantas se va a calcular el perfil, porque
 *  "saltaste algunas" no significa nada y "39 de 50" si. La accion que
 *  destaca es volver a ellas; calcular igualmente sigue estando ahi, en
 *  segundo plano, porque saltar tiene que seguir siendo una salida legitima
 *  para quien de verdad no sabe que responder - lo que no puede es pasar
 *  inadvertido.
 *
 *  No bloquea: nadie se queda encerrado en esta pantalla. */
function renderReview() {
  const huecos = saltadas();
  const total = questionCount();
  const respondidas = total - huecos.length;
  // Con menos de la mitad, el perfil deja de ser un boceto y pasa a ser otra
  // cosa. Se dice con el mismo criterio que usa `fiabilidad` para el nivel
  // "low", para que la pantalla y el resultado no se contradigan.
  const critico = respondidas / total < 0.5;

  app.innerHTML = `<main class="review-screen screen-enter">
    <p class="eyebrow"><span class="eyebrow-dot"></span> ${t("review.eyebrow")}</p>
    <h1>${t("review.title")}<br><span>${t("review.titleAccent")}</span></h1>

    <div class="review-count review-count--${critico ? "low" : "ok"}">
      <p class="review-count__big">${huecos.length}</p>
      <p class="review-count__label">${t("review.skipped", { count: huecos.length, total })}</p>
    </div>

    <p class="review-copy">${t("review.body", { answered: respondidas, total })}</p>
    ${critico ? `<p class="review-warning">${t("review.warning")}</p>` : ""}

    <div class="review-actions">
      <button type="button" class="primary-action" data-action="review-answer">
        ${t("review.answer")}<span>→</span>
      </button>
      <button type="button" class="text-action" data-action="review-continue">
        ${t("review.continue")}
      </button>
    </div>
  </main>`;
  applyFills();
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
  // Sin este catch, cualquier excepcion inesperada dentro del analisis
  // dejaba la pantalla de carga girando para siempre, sin error y sin
  // salida: exactamente lo que se ve como "se queda cargando".
  runAnalysis().catch((error) => {
    console.error("[FuturePilot] El analisis fallo de forma inesperada:", error);
    aiResult = null;
    aiError = mensajeDeError({ code: "network" });
    aiErrorCode = "network";
    screen = "partial";
    render();
  });
}

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cuanto se espera antes de cada reintento automatico. Un corte de red de un
// segundo o un backend que acaba de arrancar (el servicio se reinicia solo al
// desplegar, y el primer arranque tarda) devolvian al estudiante a una
// pantalla de error que le pedia pulsar un boton para repetir exactamente la
// misma peticion. Eso lo hace la maquina, no la persona: dos reintentos
// cubren de sobra un arranque en frio.
const REINTENTOS_MS = [1200, 4000];

/** Traduce el motivo real del fallo a algo que el estudiante pueda leer. */
function mensajeDeError(error) {
  if (!error) return t("unavailable.fallbackError");
  if (error.code === "empty") return t("unavailable.errorEmpty");
  if (error.code === "network") return t("unavailable.errorNetwork");
  if (error.code === "malformed") return t("unavailable.errorMalformed");
  return t(error.code === "server" ? "unavailable.errorServer" : "unavailable.errorRejected",
    { status: error.status || "" });
}

/** Manda las respuestas al servidor y decide a que pantalla se va.
 *
 *  Reintenta solo lo que tiene sentido reintentar (red caida, 5xx) y deja
 *  el motivo en aiError/aiErrorCode para que la pantalla de fallo diga que
 *  paso de verdad en vez del mismo mensaje generico para todo. */
async function runAnalysis() {
  const minDelay = esperar(3400);
  let outcome;

  for (let intento = 0; ; intento += 1) {
    try {
      outcome = await sendAssessmentToPythonAI(answers);
    } catch (error) {
      outcome = { data: null, error: { code: "network", detail: String(error) } };
    }
    const transitorio = outcome.error && (outcome.error.code === "network" || outcome.error.code === "server");
    if (!outcome.error || !transitorio || intento >= REINTENTOS_MS.length) break;
    await esperar(REINTENTOS_MS[intento]);
  }

  await minDelay;
  aiResult = outcome.data;
  aiError = outcome.data ? "" : mensajeDeError(outcome.error);
  aiErrorCode = outcome.data ? null : (outcome.error?.code || "network");
  // El progreso guardado deja de hacer falta cuando el resultado ya esta en
  // el servidor. Mientras el analisis no salga bien se conserva: es lo unico
  // que impide que una recarga borre un test entero de 50 preguntas.
  if (outcome.data) localStorage.removeItem(STORAGE_KEY);
  screen = "partial";
  render();
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
  // Sin ninguna respuesta que mandar no hay nada que reintentar, y las
  // dimensiones que se pintarian abajo no serian de este test: el motor
  // local conserva el perfil anterior cuando el intento actual llega vacio
  // (ver calculateResults), asi que se enseñaria el resultado de otro test
  // como si fuera el recien hecho. Aqui se dice lo que pasa y se ofrece lo
  // unico que puede arreglarlo: volver a hacerlo.
  if (aiErrorCode === "empty") {
    app.innerHTML = `<main class="results-screen screen-enter">
      <div class="results-topline"><span class="brand"><img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span></span></div>
      <section class="results-intro">
        <p class="eyebrow"><span class="eyebrow-dot"></span> ${t("error.resultsEyebrow")}</p>
        <h1>${t("unavailable.emptyTitle")}<br><span>${t("unavailable.emptyTitleAccent")}</span></h1>
        <p>${escapeHtml(aiError || t("unavailable.errorEmpty"))}</p>
        <button type="button" class="primary-action primary-action--wide" data-action="restart">${t("unavailable.restart")} <span>→</span></button>
      </section>
    </main>`;
    return;
  }

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
    const guardado = dashData.latest?.results || {};
    wireRadar(app, guardado.user_vector, guardado.cluster_evidence);
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
      <p>${t("full.archetype")}: <strong>${escapeHtml(aiResult.personality || "")}</strong> · ${t("full.learningStyle")}: <strong>${escapeHtml(aiResult.learning_style || "")}</strong></p>
      <p class="reliability reliability--${fiabilidad(aiResult.user_vector, aiResult.cluster_evidence, questionCount()).nivel}">${t("reliability.label")}: ${fiabilidad(aiResult.user_vector, aiResult.cluster_evidence, questionCount()).texto}</p>
    </section>
    ${radarMarkup(aiResult.user_vector, aiResult.cluster_evidence)}
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
  wireRadar(app, aiResult.user_vector, aiResult.cluster_evidence);
}

/** Las preguntas que quedaron sin responder, por su indice real.
 *
 *  Una pregunta saltada es un hueco de verdad en el perfil: no se envia al
 *  motor (ver sendAssessmentToPythonAI), asi que su cluster se queda con una
 *  respuesta menos en el denominador. Saltar diez de las cincuenta no baja el
 *  resultado un 20%: concentra el perfil en las que quedaron, y los ejes que
 *  perdieron mas preguntas empiezan a moverse entero con una sola respuesta. */
function saltadas() {
  const huecos = [];
  for (let i = 0; i < questionCount(); i += 1) {
    const respuesta = answers[i];
    if (!respuesta || respuesta.answerIndex === null || respuesta.answerIndex === undefined) {
      huecos.push(i);
    }
  }
  return huecos;
}

/** Termina el test: a repasar si quedaron huecos, o directo al analisis.
 *
 *  El repaso existe porque saltar era gratis y no se notaba hasta el final.
 *  Un estudiante podia pulsar "Aun no lo se" en treinta y nueve preguntas y
 *  recibir igualmente un radar con ocho ejes y unas carreras con su
 *  porcentaje - calculado con once respuestas. El aviso de fiabilidad salia
 *  DESPUES, cuando arreglarlo ya significaba repetir el test entero. */
function terminarTest() {
  results = assessmentEngine.calculateResults(questions, answers, results);
  saveProgress(true);
  screen = saltadas().length ? "review" : "analysis";
  render();
}

function goNext() {
  if (!hasCurrentAnswer()) return;
  if (currentQuestion === questionCount() - 1) {
    terminarTest();
    return;
  }
  currentQuestion += 1;
  saveProgress();
  render();
}

function skipQuestion() {
  setAnswer(null);
  if (currentQuestion === questionCount() - 1) terminarTest();
  else {
    currentQuestion += 1;
    saveProgress();
    render();
  }
}

/** Lleva a la primera pregunta sin responder. */
function irAPrimeraSaltada() {
  const huecos = saltadas();
  if (!huecos.length) {
    screen = "analysis";
  } else {
    currentQuestion = huecos[0];
    screen = "question";
  }
  render();
}

function startAssessment(restart = false) {
  if (restart) {
    currentQuestion = 0;
    answers = [];
    results = assessmentEngine.createInitialResults();
    aiResult = null;
    aiError = "";
    aiErrorCode = null;
    localStorage.removeItem(STORAGE_KEY);
    // Orden nuevo: repetir el test no deberia repetir la misma baraja. Solo
    // al reiniciar - dentro de un intento el orden tiene que quedarse quieto,
    // o volver atras enseñaria las opciones movidas de sitio.
    rebarajar();
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
    aiErrorCode = null;
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
    // El test estaba terminado y lo unico que quedo pendiente fue el
    // analisis (se cayo la red, el servidor se estaba reiniciando). Se
    // retoma ahi: recargar la pagina no puede costarle al estudiante
    // repetir las 50 preguntas.
    if (saved.completed) screen = "analysis";
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
