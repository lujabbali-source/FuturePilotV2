const icons = ["◈", "✦", "◎", "⌁"];

const progressMessages = [
  { at: 0, label: "Conociendo tus intereses...", detail: "Empezamos por lo que naturalmente te llama la atención." },
  { at: 10, label: "Descubriendo tus fortalezas...", detail: "Cada respuesta ayuda a dibujar tu perfil." },
  { at: 20, label: "Analizando tu personalidad...", detail: "Estamos encontrando tus patrones de motivación." },
  { at: 30, label: "Buscando carreras compatibles...", detail: "Conectando lo que te gusta con posibilidades reales." },
  { at: 40, label: "Preparando tus resultados...", detail: "Tu mapa personal está tomando forma." },
];

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function optionCard(answer, index, selected, extra = "") {
  return `<button type="button" class="option-card ${selected ? "is-selected" : ""} ${extra}" data-answer-index="${index}">
    <span class="option-icon">${icons[index % icons.length]}</span>
    <span class="option-copy"><strong>${escapeHtml(answer.text)}</strong><small>${index === 0 ? "Se parece mucho a ti" : index === 1 ? "Tiene bastante que ver contigo" : index === 2 ? "No es lo habitual en ti" : "Casi nunca te representa"}</small></span>
    <span class="option-check" aria-hidden="true">${selected ? "✓" : ""}</span>
  </button>`;
}

function renderSingle(question, state) {
  return `<div class="answer-grid">${question.answers.map((answer, index) => optionCard(answer, index, state?.answerIndex === index)).join("")}</div>`;
}

function renderMulti(question, state) {
  const selected = state?.selectedIndices || [];
  return `<div class="format-hint"><span>Selección múltiple</span> Elige hasta 2 señales que más se parezcan a ti.</div>
    <div class="answer-grid answer-grid--multi">${question.answers.map((answer, index) => optionCard(answer, index, selected.includes(index))).join("")}</div>`;
}

function renderScenario(question, state) {
  return `<div class="scenario-box"><span class="scenario-kicker">ESCENARIO</span><p>Imagina que esta situación aparece en tu próximo proyecto.</p></div>
    <div class="answer-grid">${question.answers.map((answer, index) => optionCard(answer, index, state?.answerIndex === index, "option-card--scenario")).join("")}</div>`;
}

function renderSlider(question, state) {
  const value = state?.answerIndex ?? 1;
  const labels = ["Nada", "Un poco", "Bastante", "Muchísimo"];
  return `<div class="slider-question">
    <div class="slider-value"><span>¿Qué tanto te representa?</span><strong id="slider-value">${labels[value]}</strong></div>
    <input class="intensity-slider" type="range" min="0" max="3" step="1" value="${value}" data-slider="true" aria-label="Intensidad de la respuesta">
    <div class="slider-labels"><span>Nada</span><span>Un poco</span><span>Bastante</span><span>Muchísimo</span></div>
    <div class="slider-track-dots">${labels.map((label, index) => `<button type="button" class="slider-dot ${value === index ? "is-active" : ""}" data-slider-value="${index}" aria-label="${label}"></button>`).join("")}</div>
  </div>`;
}

function renderRanking(question, state) {
  const order = state?.rankOrder || question.answers.map((_, index) => index);
  return `<div class="format-hint"><span>Ranking</span> Ordena de más a menos parecido a ti.</div>
    <div class="ranking-list">${order.map((answerIndex, position) => `<div class="ranking-row" data-rank-index="${answerIndex}">
      <span class="rank-number">0${position + 1}</span><span class="rank-label">${escapeHtml(question.answers[answerIndex].text)}</span>
      <span class="rank-actions"><button type="button" data-rank-move="up" data-rank-index="${answerIndex}" ${position === 0 ? "disabled" : ""}>↑</button><button type="button" data-rank-move="down" data-rank-index="${answerIndex}" ${position === order.length - 1 ? "disabled" : ""}>↓</button></span>
    </div>`).join("")}</div>`;
}

function renderVersus(question, state) {
  return `<div class="versus-grid">${question.answers.slice(0, 2).map((answer, index) => `<button type="button" class="versus-card ${state?.answerIndex === index ? "is-selected" : ""}" data-answer-index="${index}"><span class="versus-letter">${index === 0 ? "A" : "B"}</span><strong>${escapeHtml(answer.text)}</strong><span>Elegir esta opción</span></button>`).join('<div class="versus-divider">VS</div>')}</div>`;
}

function renderIconCards(question, state) {
  return `<div class="icon-grid">${question.answers.map((answer, index) => `<button type="button" class="icon-card ${state?.answerIndex === index ? "is-selected" : ""}" data-answer-index="${index}"><span class="big-icon">${icons[index % icons.length]}</span><strong>${escapeHtml(answer.text)}</strong><small>${["Explorar", "Construir", "Acompañar", "Liderar"][index]}</small></button>`).join("")}</div>`;
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
  return progressMessages.reduce((current, message) => index >= message.at ? message : current, progressMessages[0]);
}

export {
  getProgressMessage,
  getQuestionFormat,
  progressMessages,
  renderQuestionOptions,
};
