import { t } from "../shared/i18next.js";

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

function optionCard(answer, index, selected, extra = "") {
  return `<button type="button" class="option-card ${selected ? "is-selected" : ""} ${extra}" data-answer-index="${index}">
    <span class="option-icon">${icons[index % icons.length]}</span>
    <span class="option-copy"><strong>${escapeHtml(answer.text)}</strong><small>${t(`option.match${Math.min(index, 3)}`)}</small></span>
    <span class="option-check" aria-hidden="true">${selected ? "✓" : ""}</span>
  </button>`;
}

function renderSingle(question, state) {
  return `<div class="answer-grid">${question.answers.map((answer, index) => optionCard(answer, index, state?.answerIndex === index)).join("")}</div>`;
}

function renderMulti(question, state) {
  const selected = state?.selectedIndices || [];
  return `<div class="format-hint"><span>${t("multi.badge")}</span> ${t("multi.hint")}</div>
    <div class="answer-grid answer-grid--multi">${question.answers.map((answer, index) => optionCard(answer, index, selected.includes(index))).join("")}</div>`;
}

function renderScenario(question, state) {
  return `<div class="scenario-box"><span class="scenario-kicker">${t("scenario.badge")}</span><p>${t("scenario.hint")}</p></div>
    <div class="answer-grid">${question.answers.map((answer, index) => optionCard(answer, index, state?.answerIndex === index, "option-card--scenario")).join("")}</div>`;
}

function renderSlider(question, state) {
  const value = state?.answerIndex ?? 1;
  const labels = [0, 1, 2, 3].map((level) => t(`slider.level${level}`));
  return `<div class="slider-question">
    <div class="slider-value"><span>${t("slider.prompt")}</span><strong id="slider-value">${labels[value]}</strong></div>
    <input class="intensity-slider" type="range" min="0" max="3" step="1" value="${value}" data-slider="true" aria-label="${t("slider.aria")}">
    <div class="slider-labels">${labels.map((label) => `<span>${label}</span>`).join("")}</div>
    <div class="slider-track-dots">${labels.map((label, index) => `<button type="button" class="slider-dot ${value === index ? "is-active" : ""}" data-slider-value="${index}" aria-label="${label}"></button>`).join("")}</div>
  </div>`;
}

function renderRanking(question, state) {
  const order = state?.rankOrder || question.answers.map((_, index) => index);
  return `<div class="format-hint"><span>${t("ranking.badge")}</span> ${t("ranking.hint")}</div>
    <div class="ranking-list">${order.map((answerIndex, position) => `<div class="ranking-row" data-rank-index="${answerIndex}">
      <span class="rank-number">0${position + 1}</span><span class="rank-label">${escapeHtml(question.answers[answerIndex].text)}</span>
      <span class="rank-actions"><button type="button" data-rank-move="up" data-rank-index="${answerIndex}" ${position === 0 ? "disabled" : ""}>↑</button><button type="button" data-rank-move="down" data-rank-index="${answerIndex}" ${position === order.length - 1 ? "disabled" : ""}>↓</button></span>
    </div>`).join("")}</div>`;
}

function renderVersus(question, state) {
  return `<div class="versus-grid">${question.answers.slice(0, 2).map((answer, index) => `<button type="button" class="versus-card ${state?.answerIndex === index ? "is-selected" : ""}" data-answer-index="${index}"><span class="versus-letter">${index === 0 ? "A" : "B"}</span><strong>${escapeHtml(answer.text)}</strong><span>${t("option.choose")}</span></button>`).join(`<div class="versus-divider">${t("versus.divider")}</div>`)}</div>`;
}

function renderIconCards(question, state) {
  return `<div class="icon-grid">${question.answers.map((answer, index) => `<button type="button" class="icon-card ${state?.answerIndex === index ? "is-selected" : ""}" data-answer-index="${index}"><span class="big-icon">${icons[index % icons.length]}</span><strong>${escapeHtml(answer.text)}</strong><small>${t(`option.icon${Math.min(index, 3)}`)}</small></button>`).join("")}</div>`;
}

function renderImageChoice(question, state) {
  return `<div class="image-grid">${question.answers.map((answer, index) => `<button type="button" class="image-card image-card--${index + 1} ${state?.answerIndex === index ? "is-selected" : ""}" data-answer-index="${index}"><span class="image-symbol">${["⌬", "✺", "◌", "△"][index]}</span><strong>${escapeHtml(answer.text)}</strong></button>`).join("")}</div>`;
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
  return { format, html: renderers[format](question, state) };
}

function getProgressMessage(index) {
  return progressMessageAt(index);
}

export {
  getProgressMessage,
  getQuestionFormat,
  renderQuestionOptions,
};
