// Plan de vuelo: donde estas, a donde vas y que sigue.
//
// Lo que habia aqui era una maqueta. Cuatro tarjetas que decian "Loading..."
// y no llegaban a cargar nunca - por un fallo real: el modulo llamaba a t()
// sin importarlo y moria en la primera linea, dejando el markup de partida en
// pantalla para siempre. Ademas un "Progress 18%" escrito a mano en el HTML,
// tres misiones marcadas como bloqueadas que anunciaban funciones
// inexistentes, y todo en ingles con la aplicacion en castellano.
//
// Ahora la pagina es la ruta: los seis hitos reales del recorrido, cual esta
// hecho, cual toca y por que importa. Ninguno esta "bloqueado": todos se
// pueden hacer hoy y en cualquier orden, asi que se marcan hecho / actual /
// pendiente, que es la verdad. Un candado que no abre nunca es peor que no
// poner candado.
//
// Lo que esta pagina NO hace: repetir el perfil ni el arquetipo (eso es la
// pantalla de cuenta, con el vector completo) ni el roadmap de la carrera
// (eso es /journey). Solo enlaza a ellos.

import { t, currentLanguage } from "../shared/i18next.js";

const tf = (key, params) => t(`flight.${key}`, { ns: "site", ...params });

const AI_STORAGE_KEY = "futurePilotAIResponse";
const AUTH_TOKEN_KEY = "futurePilotAuthToken";

const root = document.getElementById("flightplan");

// La carrera de la que va esta pagina. Sin parametro es tu mejor
// coincidencia; con el, la que se pulso en /careers - que antes se ignoraba,
// asi que pulsaras la que pulsaras acababas leyendo sobre otra.
const CAREER_PARAM = new URLSearchParams(window.location.search).get("career");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

/** Los datos de la cuenta: la ruta, el porcentaje y el ultimo resultado.
 *
 *  Una sola peticion para las dos cosas que necesita la pagina, en vez de
 *  pedir el resultado por un lado y el recorrido por otro. */
async function loadAccount() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  try {
    const response = await fetch(`/api/v1/me/dashboard?lang=${currentLanguage()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

/** El encaje de una carrera concreta contra tu perfil: en que dimensiones
 *  llegas y en cuales te quedas corto, con que es cada una y como se sube. */
async function loadFit(careerId) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token || !careerId) return null;
  try {
    const response = await fetch(
      `/api/v1/careers/${encodeURIComponent(careerId)}/fit?lang=${currentLanguage()}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

/** Sin sesion el resultado vive en el dispositivo: el test se puede hacer sin
 *  registrarse, y esa persona tambien merece ver sus destinos. */
function localResult() {
  try {
    return JSON.parse(localStorage.getItem(AI_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// La ruta
// ---------------------------------------------------------------------------
/** Los hitos en fila, con el que toca marcado.
 *
 *  El porcentaje lo calcula el servidor a partir de estos mismos hitos, asi
 *  que no puede discrepar de lo que se ve. Y sube solo cuando el estudiante
 *  hace algo: no hay ningun numero que avance por entrar a la pagina. */
function renderPath(journey, percent) {
  if (!journey?.length) return "";
  const actual = journey.findIndex((paso) => !paso.complete);

  return `
    <section class="flight-path">
      <div class="flight-path__head">
        <p class="flight-label">${tf("yourPath")}</p>
        <p class="flight-percent">${percent}% ${tf("complete")}</p>
      </div>
      <div class="path-track"><i data-fill="${percent}"></i></div>
      <ol class="path-steps">
        ${journey.map((paso, i) => {
          const estado = paso.complete ? "is-done" : (i === actual ? "is-current" : "");
          return `
          <li class="path-step ${estado}">
            <a href="${paso.href}">
              <span class="path-step__dot" aria-hidden="true">${paso.complete ? "✓" : i + 1}</span>
              <span class="path-step__name">${escapeHtml(tf(`steps.${paso.key}.name`))}</span>
              <span class="path-step__why">${escapeHtml(tf(`steps.${paso.key}.why`))}</span>
              <span class="path-step__count">${paso.done}/${paso.target}</span>
            </a>
          </li>`;
        }).join("")}
      </ol>
    </section>`;
}

/** El hito que toca, con su porque. Es la accion protagonista de la pagina. */
function renderCurrent(journey) {
  const pendiente = (journey || []).find((paso) => !paso.complete);
  if (!pendiente) {
    return `
      <section class="flight-current flight-current--done">
        <p class="flight-label">${tf("currentLabel")}</p>
        <h2>${tf("allDone.title")}</h2>
        <p class="flight-why">${tf("allDone.body")}</p>
        <a class="flight-cta" href="/globe">${tf("exploreGlobe")} <span>→</span></a>
      </section>`;
  }

  return `
    <section class="flight-current">
      <p class="flight-label">${tf("currentLabel")}</p>
      <h2>${escapeHtml(tf(`steps.${pendiente.key}.name`))}</h2>
      <p class="flight-why">${escapeHtml(tf(`steps.${pendiente.key}.body`))}</p>
      <p class="flight-matters">
        <b>${tf("whyMatters")}</b> ${escapeHtml(tf(`steps.${pendiente.key}.why`))}
      </p>
      <a class="flight-cta" href="${pendiente.href}">
        ${escapeHtml(tf(`steps.${pendiente.key}.cta`))} <span>→</span>
      </a>
    </section>`;
}

// ---------------------------------------------------------------------------
// Por que encaja contigo, y que mejorarias
// ---------------------------------------------------------------------------
/** Una habilidad, como boton.
 *
 *  Deliberadamente sobrio: el color solo distingue las que cubres de las que
 *  no, y el numero va al lado del nombre. Al pulsarlo se abre el detalle -
 *  toda la explicacion visible a la vez seria un muro que nadie lee. */
function skillChip(entry, kind) {
  return `
    <button type="button" class="skill-chip skill-chip--${kind}"
            data-skill="${escapeHtml(entry.cluster)}" aria-expanded="false">
      <span class="skill-chip__name">${escapeHtml(entry.label)}</span>
      <span class="skill-chip__score">${entry.score}<i>/${entry.needed}</i></span>
    </button>`;
}

function renderFit(fit) {
  if (!fit?.has_profile) return "";
  const { matched = [], gaps = [] } = fit;
  if (!matched.length && !gaps.length) return "";

  return `
    ${matched.length ? `
      <section class="flight-skills">
        <p class="flight-label">${tf("whyYou")}</p>
        <p class="flight-note">${tf("whyYouNote")}</p>
        <div class="skill-chips">${matched.map((e) => skillChip(e, "match")).join("")}</div>
      </section>` : ""}

    ${gaps.length ? `
      <section class="flight-skills">
        <p class="flight-label">${tf("whatToImprove")}</p>
        <p class="flight-note">${tf("whatToImproveNote")}</p>
        <div class="skill-chips">${gaps.map((e) => skillChip(e, "gap")).join("")}</div>
      </section>` : ""}

    <!-- Un solo panel para todas: se rellena con la que se pulse. Uno por
         habilidad serian trece paneles ocultos en el DOM desde el principio. -->
    <div class="skill-panel" id="skillPanel" hidden></div>`;
}

/** El detalle de una habilidad. Las estrategias y las herramientas solo
 *  aparecen donde hacen falta: en una dimension que ya cubres, decirte como
 *  mejorarla es ruido. */
function renderSkillPanel(entry) {
  const lista = (titulo, items) => !items?.length ? "" : `
    <div class="skill-panel__block">
      <p class="skill-panel__subhead">${titulo}</p>
      <ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    </div>`;

  return `
    <div class="skill-panel__head">
      <div>
        <h3>${escapeHtml(entry.label)}</h3>
        <p class="skill-panel__score">${tf("youHave", { score: entry.score, needed: entry.needed })}</p>
      </div>
      <button type="button" class="skill-panel__close" data-close-skill
              aria-label="${escapeHtml(tf("closePanel"))}">×</button>
    </div>
    <p class="skill-panel__what">${escapeHtml(entry.what)}</p>
    <p class="skill-panel__why">${escapeHtml(entry.why)}</p>
    ${lista(tf("strategies"), entry.strategies)}
    ${lista(tf("tools"), entry.tools)}`;
}

// ---------------------------------------------------------------------------
// Destinos
// ---------------------------------------------------------------------------
function renderHubs(result) {
  const hubs = result?.recommended_hubs || [];
  return `
    <section class="flight-hubs">
      <p class="flight-label">${tf("destinations")}</p>
      ${hubs.length ? `
        <p class="flight-note">${tf("destinationsNote")}</p>
        <ul class="hub-list">
          ${hubs.map((hub) => `
            <li>
              <strong>${escapeHtml(hub.name)}</strong>
              <span>${escapeHtml(hub.desc || "")}</span>
            </li>`).join("")}
        </ul>`
      // Sin hubs para esa categoria se dice, en vez de rellenar con los tres
      // primeros de la lista: proponerle Silicon Valley a un perfil
      // artistico es peor que no proponer nada.
      : `<p class="flight-note">${tf("noDestinations")}</p>`}
    </section>`;
}

// ---------------------------------------------------------------------------
function renderHead(nombre, percent) {
  return `
    <header class="flight-head">
      <h1>${nombre ? tf("titleNamed", { name: escapeHtml(nombre) }) : tf("title")}</h1>
      <p>${percent === null ? tf("emptySubtitle") : tf("subtitle", { percent })}</p>
    </header>`;
}

function renderEmpty() {
  return `
    ${renderHead(null, null)}
    <a class="flight-cta" href="/assessment">${tf("takeTest")} <span>→</span></a>`;
}

/** Aplica los anchos de barra por CSSOM.
 *
 *  Un atributo style= lo bloquea la CSP del sitio (style-src-attr), asi que
 *  el porcentaje viaja en data-fill y se aplica aqui. */
function applyFills() {
  root.querySelectorAll("[data-fill]").forEach((bar) => {
    bar.style.setProperty("width", `${Math.max(0, Math.min(100, Number(bar.dataset.fill) || 0))}%`);
  });
}

// ---------------------------------------------------------------------------
// Interaccion del panel. Por delegacion: las secciones se pintan de una vez
// y un escuchador por boton no sobreviviria a un repintado.
// ---------------------------------------------------------------------------
let fitActual = null;

root.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-skill]")) {
    cerrarPanel();
    return;
  }

  const chip = event.target.closest("[data-skill]");
  if (!chip) return;

  const panel = document.getElementById("skillPanel");
  const abierto = chip.getAttribute("aria-expanded") === "true";

  // Pulsar la que ya esta abierta la cierra. Sin esto no habria forma de
  // quitar el panel sin ir al aspa.
  if (abierto) {
    cerrarPanel();
    return;
  }

  const entrada = [...(fitActual?.matched || []), ...(fitActual?.gaps || [])]
    .find((e) => e.cluster === chip.dataset.skill);
  if (!entrada || !panel) return;

  root.querySelectorAll("[data-skill]").forEach((otro) => otro.setAttribute("aria-expanded", "false"));
  chip.setAttribute("aria-expanded", "true");
  panel.innerHTML = renderSkillPanel(entrada);
  panel.hidden = false;
  panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
});

function cerrarPanel() {
  const panel = document.getElementById("skillPanel");
  if (panel) panel.hidden = true;
  root.querySelectorAll("[data-skill]").forEach((chip) => chip.setAttribute("aria-expanded", "false"));
}

// Escape cierra el panel, como cualquier cosa que se superpone.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") cerrarPanel();
});

async function main() {
  const account = await loadAccount();
  const result = account?.latest?.results || localResult();

  if (!result && !account) {
    root.innerHTML = renderEmpty();
    return;
  }

  // De que carrera va la pagina: la que se pidio por la URL o, sin
  // parametro, tu mejor coincidencia.
  const mejor = result?.recommended_careers?.[0];
  const careerId = CAREER_PARAM || mejor?.career_id;
  fitActual = await loadFit(careerId);

  const esLaTuya = !CAREER_PARAM || CAREER_PARAM === mejor?.career_id;
  const titulo = fitActual?.career?.title || mejor?.title || "";
  const nombre = account?.account?.name;
  const percent = account ? account.journey_percent : null;

  root.innerHTML = `
    ${renderHead(nombre, percent)}
    ${titulo ? `
      <section class="flight-career">
        <p class="flight-label">${esLaTuya ? tf("yourCareer") : tf("chosenCareer")}</p>
        <h2>${escapeHtml(titulo)}</h2>
        ${fitActual?.match_percentage != null
          ? `<p class="flight-match">${fitActual.match_percentage}% ${tf("match")}</p>` : ""}
        ${fitActual?.career?.description
          ? `<p class="flight-why">${escapeHtml(fitActual.career.description)}</p>` : ""}
      </section>` : ""}
    ${renderFit(fitActual)}
    ${esLaTuya && account ? renderCurrent(account.journey) : ""}
    ${esLaTuya && account ? renderPath(account.journey, account.journey_percent) : ""}
    ${esLaTuya ? renderHubs(result) : ""}
    <section class="flight-next">
      <p class="flight-label">${tf("keepGoing")}</p>
      <div class="flight-links">
        ${CAREER_PARAM
          // La ruta de ESTA carrera, no la que el test escogió. Mirar lo que
          // implica una opción antes de comprometerse con ella es la mitad de
          // para lo que se entra aquí, y hasta ahora el roadmap solo sabía
          // enseñar una sola carrera.
          ? `<a class="flight-cta" href="/journey?career=${encodeURIComponent(CAREER_PARAM)}">${tf("exploreRoute")} <span>→</span></a>`
          : ""}
        ${!esLaTuya ? `<a class="flight-cta flight-cta--ghost" href="/flightplan">${tf("myPlan")} <span>→</span></a>` : ""}
        ${!CAREER_PARAM ? `<a class="flight-cta flight-cta--ghost" href="/journey">${tf("seeRoute")} <span>→</span></a>` : ""}
        <a class="flight-cta flight-cta--ghost" href="/assessment">${tf("myAccount")} <span>→</span></a>
        <a class="flight-cta flight-cta--ghost" href="#mentor">${tf("askMentor")} <span>→</span></a>
      </div>
    </section>`;
  applyFills();
}

main();
