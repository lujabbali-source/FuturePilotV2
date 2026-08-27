// Pantalla de cuenta de FuturePilot.
//
// Antes esto era una hoja de resultados: arquetipo, fortalezas y ocho
// carreras, y ahi se acababa. El estudiante llegaba, leia quien es, y se
// quedaba sin saber que hacer con eso. Una cuenta es mas que el resultado de
// un test.
//
// La regla que sigue todo lo que hay aqui: **cada cosa que se pinta sale de
// algo que el estudiante hizo de verdad**. Las barras del perfil son el
// vector real que calcula el motor y que hasta ahora no se enseñaba en
// ningun sitio; el numero de respuestas que sostiene cada dimension es el
// recuento real de preguntas; el recorrido cuenta eventos registrados. No
// hay porcentajes de adorno, ni novedades inventadas, ni progreso que suba
// solo por entrar. Si un dato no existe, la seccion no aparece.
//
// El orden responde a las preguntas en el orden en que uno se las hace:
//   quien soy -> que hago ahora -> que me encaja -> por donde voy -> mi cuenta

import { t, currentLanguage } from "../shared/i18next.js";
import { radarMarkup, fiabilidad } from "./radar.js";

// El panel lee un resultado guardado y no tiene el banco cargado, asi que
// no puede preguntar cuantas preguntas hay. 50 es el tamaño del banco; si
// cambia, esta cifra solo afecta al texto de fiabilidad, no a la puntuacion.
const TOTAL_PREGUNTAS = 50;

const td = (key, params) => t(`dash.${key}`, params);

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function formatDate(iso) {
  if (!iso) return "—";
  const date = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(currentLanguage(), { day: "2-digit", month: "long", year: "numeric" });
}

function shortDate(iso) {
  if (!iso) return "";
  const date = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
  return Number.isNaN(date.getTime())
    ? "" : date.toLocaleDateString(currentLanguage(), { day: "2-digit", month: "short", year: "2-digit" });
}

// ---------------------------------------------------------------------------
// Tu siguiente paso
// ---------------------------------------------------------------------------
/** El primer paso del recorrido que quede sin completar.
 *
 *  Uno solo, no una lista: la pantalla tenia mucha informacion y ninguna
 *  accion protagonista, y quien llega por primera vez se queda sin saber por
 *  donde seguir. Si estan todos hechos, se dice eso en vez de inventar una
 *  tarea. */
function renderNextStep(journey) {
  const pendiente = (journey || []).find((paso) => !paso.complete);
  const clave = pendiente ? pendiente.key : "done";
  const destino = pendiente ? pendiente.href : "/globe";

  return `
    <section class="dash-next">
      <p class="dash-label">${td("nextStep.label")}</p>
      <div class="dash-next__card">
        <div>
          <h2>${escapeHtml(td(`nextStep.${clave}.title`))}</h2>
          <p>${escapeHtml(td(`nextStep.${clave}.body`))}</p>
        </div>
        <a class="primary-action" href="${destino}">${escapeHtml(td(`nextStep.${clave}.cta`))} <span>→</span></a>
      </div>
    </section>`;
}

// ---------------------------------------------------------------------------
// El perfil, dimension a dimension
// ---------------------------------------------------------------------------
/** Las ocho dimensiones con su puntuacion real, de mayor a menor.
 *
 *  El vector ya se calculaba y se guardaba en cada test, pero no se enseñaba:
 *  el estudiante veia tres etiquetas sueltas ("Creatividad") sin saber cuanto
 *  ni por que. Aqui se ve la escala completa y, al desplegar, de cuantas
 *  respuestas suyas sale cada una. */
function renderDna(vector, evidence) {
  if (!vector) return "";

  const filas = Object.entries(vector)
    .sort((a, b) => b[1] - a[1])
    .map(([cluster, valor]) => {
      const respuestas = evidence?.[cluster]?.answered ?? 0;
      const nota = respuestas
        ? td("dna.evidence", { count: respuestas })
        : td("dna.noEvidence");
      return `
        <button type="button" class="dna-row" data-dna="${escapeHtml(cluster)}" aria-expanded="false">
          <span class="dna-row__name">${escapeHtml(t(`cluster.${cluster}`))}</span>
          <span class="dna-row__track"><i data-fill="${valor * 10}"></i></span>
          <span class="dna-row__score">${valor.toFixed(1)}</span>
          <span class="dna-row__note">${escapeHtml(nota)}</span>
        </button>`;
    })
    .join("");

  return `
    <section class="dash-dna">
      <p class="dash-label">${td("dna.label")}</p>
      ${radarMarkup(vector, evidence, { encabezado: false })}
      <div class="dna-rows">${filas}</div>
      <p class="dash-hint">${td("dna.hint")}</p>
    </section>`;
}

// ---------------------------------------------------------------------------
// Fortalezas y areas por explorar
// ---------------------------------------------------------------------------
/** Las tres dimensiones mas altas y las tres mas bajas.
 *
 *  Antes las brechas salian de un umbral, asi que un perfil equilibrado
 *  recibia "Sin brechas notables" - que se lee como "eres bueno en todo" y
 *  no ayuda a nadie. Tomando las tres mas bajas del vector siempre hay algo
 *  concreto que mirar, y se enmarca como terreno por recorrer en vez de como
 *  carencia. */
function renderStrengths(vector) {
  if (!vector) return "";
  const ordenadas = Object.entries(vector).sort((a, b) => b[1] - a[1]);
  const chips = (lista, clase) => lista
    .map(([c]) => `<span class="chip ${clase}">${escapeHtml(t(`cluster.${c}`))}</span>`)
    .join("");

  return `
    <section class="strengths-section">
      <div class="section-label"><span>${t("full.strengths")}</span></div>
      <div class="chip-row">${chips(ordenadas.slice(0, 3), "chip--strength")}</div>
      <div class="section-label"><span>${td("explore.label")}</span></div>
      <div class="chip-row">${chips(ordenadas.slice(-3).reverse(), "chip--gap")}</div>
      <p class="dash-hint">${td("explore.note")}</p>
    </section>`;
}

// ---------------------------------------------------------------------------
// Carreras
// ---------------------------------------------------------------------------
/** Las carreras compatibles, desplegables.
 *
 *  El porcentaje solo no explica nada. Al desplegar se ve en que encaja el
 *  perfil, que conviene reforzar y en que consiste la carrera - todo dato que
 *  ya venia en la respuesta y que se estaba tirando. */
function renderCareers(careers, abierta) {
  if (!careers?.length) return "";

  return `
    <section class="career-reveal">
      <div class="section-label"><span>${t("full.careers")}</span><span>${t("full.score")}</span></div>
      ${careers.map((career, index) => {
        const abierto = abierta === career.career_id;
        const fortalezas = (career.strengths || []).join(", ");
        const brechas = (career.skill_gaps || []).join(", ");
        return `
        <div class="career-result career-result--full${abierto ? " is-open" : ""}">
          <span class="career-rank">${String(index + 1).padStart(2, "0")}</span>
          <div class="career-copy">
            <span class="career-name">${escapeHtml(career.title)}</span>
            <p class="career-justification">${escapeHtml(career.justification || "")}</p>
            <button type="button" class="text-action" data-career="${escapeHtml(career.career_id || "")}">
              ${abierto ? td("careers.collapse") : td("careers.expand")}
            </button>
            ${abierto ? `
              <div class="career-detail">
                ${fortalezas ? `<p><b>${td("careers.strongOn")}:</b> ${escapeHtml(fortalezas)}</p>` : ""}
                ${brechas ? `<p><b>${td("careers.workOn")}:</b> ${escapeHtml(brechas)}</p>` : ""}
                ${career.description ? `<p><b>${td("careers.whatYouDo")}:</b> ${escapeHtml(career.description)}</p>` : ""}
                <!-- Con la carrera dentro. El enlace decia "ver mi ruta hacia
                     ESTA carrera" y llevaba a /journey a secas, o sea siempre
                     a la que eligio el test: se abria Medicina y salia
                     Ingenieria de software. La promesa del texto y el destino
                     no coincidian. -->
                <a class="text-action"
                   href="/journey?career=${encodeURIComponent(career.career_id || "")}">
                  ${td("careers.seePath")} →
                </a>
              </div>` : ""}
          </div>
          <span class="career-score">
            <strong>${career.match_percentage}%</strong>
            <span class="mini-bar"><i data-fill="${career.match_percentage}"></i></span>
          </span>
        </div>`;
      }).join("")}
    </section>`;
}

// ---------------------------------------------------------------------------
// Recorrido, actividad e historial
// ---------------------------------------------------------------------------
function renderJourney(journey) {
  if (!journey?.length) return "";
  const hechos = journey.filter((paso) => paso.complete).length;

  return `
    <section class="dash-journey">
      <div class="section-label">
        <span>${td("journey.label")}</span>
        <span>${td("journey.complete", { done: hechos, total: journey.length })}</span>
      </div>
      <ul class="journey-steps">
        ${journey.map((paso) => `
          <li class="journey-step${paso.complete ? " is-done" : ""}">
            <a href="${paso.href}">
              <span class="journey-step__tick" aria-hidden="true">${paso.complete ? "✓" : ""}</span>
              <span class="journey-step__name">${escapeHtml(td(`journey.steps.${paso.key}`))}</span>
              <span class="journey-step__count">${paso.done}/${paso.target}</span>
            </a>
          </li>`).join("")}
      </ul>
    </section>`;
}

function renderActivity(events, stamps) {
  return `
    <section class="dash-activity">
      <div class="section-label"><span>${td("activity.label")}</span></div>
      ${events?.length ? `
        <ul class="activity-list">
          ${events.map((e) => `
            <li>
              <span class="activity-date">${escapeHtml(shortDate(e.created_at))}</span>
              <span>${escapeHtml(td(`activity.events.${e.event_type}`))}${
                e.subject_label ? ` · ${escapeHtml(e.subject_label)}` : ""}</span>
            </li>`).join("")}
        </ul>` : `<p class="dash-hint">${td("activity.empty")}</p>`}
      ${stamps?.length ? `
        <div class="section-label"><span>${td("activity.stamps")}</span></div>
        <div class="chip-row">
          ${stamps.map((s) => `<span class="chip chip--stamp">${escapeHtml(s.subject_label || s.label)}</span>`).join("")}
        </div>` : ""}
    </section>`;
}

/** El historial solo aparece si hay mas de un test.
 *
 *  Con uno solo seria una lista de un elemento que no dice nada. */
function renderHistory(history, latest) {
  if (!history?.length) return "";

  const fila = (entrada, actual) => {
    const r = entrada.results || {};
    const top = (r.recommended_careers || [])[0];
    return `
      <li>
        <span class="history-when">${actual ? td("history.current") : escapeHtml(shortDate(entrada.created_at))}</span>
        <span class="history-what">${escapeHtml(r.personality || "")}</span>
        <span class="history-top">${top ? `${escapeHtml(top.title)} · ${top.match_percentage}%` : ""}</span>
      </li>`;
  };

  return `
    <section class="dash-history">
      <div class="section-label"><span>${td("history.label")}</span></div>
      <ul class="history-list">
        ${fila(latest, true)}
        ${history.map((e) => fila(e, false)).join("")}
      </ul>
      <p class="dash-hint">${td("history.note")}</p>
    </section>`;
}

// ---------------------------------------------------------------------------
// La cuenta
// ---------------------------------------------------------------------------
/** Datos de la cuenta y sus acciones.
 *
 *  Va la ultima a proposito. Es lo que menos se usa y lo que mas dano hace
 *  si se toca por accidente, asi que no compite con el contenido; y el
 *  borrado va detras de su propio interruptor, con la contrasena por delante. */
function renderAccount(account, estado) {
  const dato = (label, valor) => `
    <div class="account-field">
      <span>${escapeHtml(label)}</span><strong>${escapeHtml(valor || "—")}</strong>
    </div>`;

  return `
    <section class="dash-account">
      <div class="section-label"><span>${td("account.label")}</span></div>
      <div class="account-grid">
        ${dato(td("account.email"), account.email)}
        ${dato(td("account.memberSince"), formatDate(account.member_since))}
        ${dato(td("account.passportId"), account.passport_id)}
      </div>

      ${estado.passwordForm ? `
        <form class="account-form" data-form="password">
          <input type="password" name="current_password" autocomplete="current-password"
                 placeholder="${escapeHtml(td("account.currentPassword"))}" required>
          <input type="password" name="new_password" autocomplete="new-password" minlength="8"
                 placeholder="${escapeHtml(td("account.newPassword"))}" required>
          <div class="account-form__actions">
            <button type="submit" class="secondary-action">${td("account.savePassword")}</button>
            <button type="button" class="text-action" data-action="cancel-password">${td("account.cancel")}</button>
          </div>
        </form>`
      : `<button type="button" class="text-action" data-action="change-password">${td("account.changePassword")}</button>`}

      <div class="account-actions">
        <button type="button" class="text-action" data-action="export-data">${td("account.export")}</button>
        <button type="button" class="text-action" data-action="logout">${td("account.logout")}</button>
      </div>
      <p class="dash-hint">${td("account.exportNote")}</p>

      <div class="account-danger">
        <div class="section-label"><span>${td("account.danger")}</span></div>
        ${estado.deleteForm ? `
          <form class="account-form" data-form="delete">
            <p class="dash-hint">${td("account.deleteNote")}</p>
            <input type="password" name="password" autocomplete="current-password"
                   placeholder="${escapeHtml(td("account.deleteConfirm"))}" required>
            <div class="account-form__actions">
              <button type="submit" class="danger-action">${td("account.deleteAction")}</button>
              <button type="button" class="text-action" data-action="cancel-delete">${td("account.cancel")}</button>
            </div>
          </form>`
        : `<button type="button" class="text-action text-action--danger" data-action="delete-account">${td("account.delete")}</button>`}
      </div>

      ${estado.message ? `<p class="account-message">${escapeHtml(estado.message)}</p>` : ""}
    </section>`;
}

// ---------------------------------------------------------------------------
export function renderDashboard({ data, user, estado }) {
  const latest = data.latest;
  const results = latest?.results || {};
  const nombre = user?.name || data.account?.name;

  // Se calcula UNA vez y con los datos de este resultado. Estaba escrito como
  // fiabilidad(vector, evidence, ...) dentro de la plantilla, pero esos dos
  // nombres solo existen dentro de renderDna: aqui lanzaban ReferenceError, y
  // como render() se llama dentro de un try en init(), el fallo se tragaba y
  // el usuario acababa en "No pudimos cargar tu exploracion". Le pasaba a
  // cualquier cuenta con un resultado guardado.
  const fiab = fiabilidad(results.user_vector, results.cluster_evidence, TOTAL_PREGUNTAS);

  return `<main class="results-screen dash screen-enter">
    <div class="results-topline">
      <span class="brand">
        <img class="brand-mark" src="/Frontend/futurepilot-logo-transparent.png" alt="FuturePilot"> Future<span>Pilot</span>
      </span>
      <span class="result-chip">${t("full.chip")} <b>✓</b></span>
    </div>

    <section class="results-intro">
      <p class="eyebrow"><span class="eyebrow-dot"></span> ${t("full.eyebrow")}</p>
      <h1>${nombre ? `${escapeHtml(nombre)},` : ""} ${t("full.title")}<br><span>${t("full.titleAccent")}</span></h1>
      ${results.personality ? `
        <p>${t("full.archetype")}: <strong>${escapeHtml(results.personality)}</strong>
           · ${t("full.learningStyle")}: <strong>${escapeHtml(results.learning_style || "")}</strong>
           </p>
        <p class="reliability reliability--${fiab.nivel}">${t("reliability.label")}: ${fiab.texto}</p>` : ""}
    </section>

    ${renderNextStep(data.journey)}
    ${renderDna(results.user_vector, results.cluster_evidence)}
    ${renderStrengths(results.user_vector)}
    ${renderCareers(results.recommended_careers, estado.openCareer)}
    ${renderJourney(data.journey)}
    ${renderActivity(data.recent_activity, data.stamps)}
    ${renderHistory(data.history, latest)}
    ${renderAccount(data.account, estado)}

    <button type="button" class="text-action" data-action="retake-test">${t("full.retake")}</button>
  </main>`;
}
