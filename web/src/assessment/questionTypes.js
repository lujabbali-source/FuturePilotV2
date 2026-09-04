import { t } from "../shared/i18next.js";
import { ordenDeOpciones } from "./shuffle.js";

const icons = ["◈", "✦", "◎", "⌁"];

// Los mensajes se resuelven en cada llamada, no una vez al cargar el
// modulo: si se resolvieran arriba quedarian congelados en el idioma
// inicial y no cambiarian al pulsar el selector.
const PROGRESS_STEPS = [0, 10, 20, 30, 40];

function progressMessageAt(index) {
  const step = PROGRESS_STEPS.reduce((current, at) => (index >= at ? at : current), PROGRESS_STEPS[0]);
  const key = `progress.m${PROGRESS_STEPS.indexOf(step) + 1}`;
  return { at: step, label: t(`${key}.label`), detail: t(`${key}.detail`) };
}

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

// `real` es el indice en questions.json y viaja en data-answer-index, asi que
// el motor sigue recibiendo lo mismo de siempre. `posicion` es solo donde cae
// en pantalla, y de ella depende unicamente el icono.
//
// El subtitulo se quito. Era t(`option.match${posicion}`), o sea "Se parece
// mucho a ti" bajo la primera opcion y "Casi nunca te representa" bajo la
// ultima. Como la primera era siempre la de 4 puntos, el test le enseñaba al
// estudiante cual era la respuesta que mas puntuaba antes de que eligiera.
// Y una vez barajadas, esas frases describirian una posicion al azar.
function optionCard(answer, real, posicion, selected, extra = "") {
  return `<button type="button" class="option-card ${selected ? "is-selected" : ""} ${extra}" data-answer-index="${real}">
    <span class="option-icon">${icons[posicion % icons.length]}</span>
    <span class="option-copy"><strong>${escapeHtml(answer.text)}</strong></span>
    <span class="option-check" aria-hidden="true">${selected ? "✓" : ""}</span>
  </button>`;
}

function renderSingle(question, state, orden) {
  return `<div class="answer-grid">${orden.map((real, posicion) => optionCard(question.answers[real], real, posicion, state?.answerIndex === real)).join("")}</div>`;
}

function renderMulti(question, state, orden) {
  const selected = state?.selectedIndices || [];
  return `<div class="format-hint"><span>${t("multi.badge")}</span> ${t("multi.hint")}</div>
    <div class="answer-grid answer-grid--multi">${orden.map((real, posicion) => optionCard(question.answers[real], real, posicion, selected.includes(real))).join("")}</div>`;
}

function renderScenario(question, state, orden) {
  return `<div class="scenario-box"><span class="scenario-kicker">${t("scenario.badge")}</span><p>${t("scenario.hint")}</p></div>
    <div class="answer-grid">${orden.map((real, posicion) => optionCard(question.answers[real], real, posicion, state?.answerIndex === real, "option-card--scenario")).join("")}</div>`;
}

function renderSlider(question, state, orden) {
  // `orden` trae los indices ordenados de menos a mas puntos, asi que la
  // posicion en la barra y la intensidad de la respuesta ya coinciden. El
  // valor guardado es un indice canonico: se traduce a posicion para pintar.
  const guardado = state?.answerIndex;
  const value = guardado === undefined ? 1 : Math.max(0, orden.indexOf(guardado));
  const labels = [0, 1, 2, 3].map((level) => t(`slider.level${level}`));
  return `<div class="slider-question">
    <div class="slider-value"><span>${t("slider.prompt")}</span><strong id="slider-value">${labels[value]}</strong></div>
    <input class="intensity-slider" type="range" min="0" max="${orden.length - 1}" step="1" value="${value}" data-slider="true" data-slider-map="${orden.join(",")}" aria-label="${t("slider.aria")}">
    <div class="slider-track-dots">${labels.map((label, posicion) => `<button type="button" class="slider-dot ${value === posicion ? "is-active" : ""}" data-slider-value="${orden[posicion]}" data-slider-pos="${posicion}" aria-label="${label}"></button>`).join("")}</div>
    <div class="slider-labels">${labels.map((label) => `<span>${label}</span>`).join("")}</div>
  </div>`;
}

/** El ranking: ordenar las opciones, con la de arriba como respuesta.
 *
 *  CADA FILA ES PULSABLE, y pulsarla la manda al primer puesto. Sin eso, este
 *  formato no tenia forma de responderse: el orden inicial es el barajado y no
 *  cuenta como respuesta (a proposito - regalarla seria puntuar por el
 *  estudiante), asi que el unico gesto disponible era mover una fila con las
 *  flechas. Quien mirara la lista y estuviera de acuerdo con el orden que ya
 *  veia se quedaba con el boton "Siguiente" apagado y sin nada que pulsar que
 *  significara "asi esta bien". El test se cortaba ahi - en la pregunta 11 - y
 *  el perfil se calculaba con las diez primeras en vez de con las cincuenta.
 *
 *  Poner arriba es ademas EXACTAMENTE lo que el motor usa: de todo el orden
 *  solo se puntua la primera (ver el manejador en app.js). Antes se le pedia
 *  al estudiante ordenar cuatro cosas para usar una; ahora lo que se le pide
 *  es lo que se usa, y reordenar el resto sigue disponible para quien quiera.
 *
 *  La fila marcada sale SOLO si ya hay respuesta: si se marcara la primera de
 *  entrada, la lista barajada aparentaria venir ya contestada. */
function renderRanking(question, state, orden) {
  // El orden inicial es el barajado. Antes salia el canonico, que empieza por
  // la respuesta de mas puntos: quien no tocara nada la dejaba primera.
  const order = state?.rankOrder || orden;
  const elegida = state?.answerIndex;
  return `<div class="format-hint"><span>${t("ranking.badge")}</span> ${t("ranking.hint")}</div>
    <div class="ranking-list">${order.map((answerIndex, position) => `<div class="ranking-row ${elegida === answerIndex ? "is-picked" : ""}">
      <button type="button" class="rank-pick" data-rank-pick="${answerIndex}" aria-pressed="${elegida === answerIndex}">
        <span class="rank-number">0${position + 1}</span><span class="rank-label">${escapeHtml(question.answers[answerIndex].text)}</span>
      </button>
      <span class="rank-actions"><button type="button" data-rank-move="up" data-rank-index="${answerIndex}" ${position === 0 ? "disabled" : ""} aria-label="${t("ranking.moveUp")}">↑</button><button type="button" data-rank-move="down" data-rank-index="${answerIndex}" ${position === order.length - 1 ? "disabled" : ""} aria-label="${t("ranking.moveDown")}">↓</button></span>
    </div>`).join("")}</div>`;
}

function renderVersus(question, state, orden) {
  return `<div class="versus-grid">${orden.map((real, posicion) => `<button type="button" class="versus-card ${state?.answerIndex === real ? "is-selected" : ""}" data-answer-index="${real}"><span class="versus-letter">${posicion === 0 ? "A" : "B"}</span><strong>${escapeHtml(question.answers[real].text)}</strong><span>${t("option.choose")}</span></button>`).join(`<div class="versus-divider">${t("versus.divider")}</div>`)}</div>`;
}

function renderIconCards(question, state, orden) {
  // Sin el <small>: era t(`option.icon${posicion}`) - "Explorar", "Construir",
  // "Acompañar", "Liderar" - una etiqueta pegada a la posicion, no a la
  // opcion. Barajadas, describirian cualquier cosa.
  return `<div class="icon-grid">${orden.map((real, posicion) => `<button type="button" class="icon-card ${state?.answerIndex === real ? "is-selected" : ""}" data-answer-index="${real}"><span class="big-icon">${icons[posicion % icons.length]}</span><strong>${escapeHtml(question.answers[real].text)}</strong></button>`).join("")}</div>`;
}

function renderImageChoice(question, state, orden) {
  return `<div class="image-grid">${orden.map((real, posicion) => `<button type="button" class="image-card image-card--${posicion + 1} ${state?.answerIndex === real ? "is-selected" : ""}" data-answer-index="${real}"><span class="image-symbol">${["⌬", "✺", "◌", "△"][posicion]}</span><strong>${escapeHtml(question.answers[real].text)}</strong></button>`).join("")}</div>`;
}

const renderers = { single: renderSingle, multi: renderMulti, scenario: renderScenario, slider: renderSlider, ranking: renderRanking, versus: renderVersus, icons: renderIconCards, image: renderImageChoice };

function getQuestionFormat(question, index) {
  const personalityFormats = ["slider", "scenario", "icons", "versus", "slider", "image", "scenario", "icons"];
  const interestFormats = ["single", "multi", "ranking", "versus", "single", "image", "multi", "scenario"];
  const formats = question.type === "interest" ? interestFormats : personalityFormats;
  return formats[index % formats.length];
}

function renderQuestionOptions(question, index, state) {
  const format = getQuestionFormat(question, index);
  const orden = ordenDeOpciones(question, index, format);
  return { format, html: renderers[format](question, state, orden) };
}

function getProgressMessage(index) {
  return progressMessageAt(index);
}

export {
  getProgressMessage,
  getQuestionFormat,
  renderQuestionOptions,
};
