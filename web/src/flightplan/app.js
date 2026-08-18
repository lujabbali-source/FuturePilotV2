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

async function main() {
  const account = await loadAccount();
  const result = account?.latest?.results || localResult();

  if (!result && !account) {
    root.innerHTML = renderEmpty();
    return;
  }

  const nombre = account?.account?.name;
  const percent = account ? account.journey_percent : null;

  root.innerHTML = `
    ${renderHead(nombre, percent)}
    ${account ? renderCurrent(account.journey) : ""}
    ${account ? renderPath(account.journey, account.journey_percent) : ""}
    ${renderHubs(result)}
    <section class="flight-next">
      <p class="flight-label">${tf("keepGoing")}</p>
      <div class="flight-links">
        <a class="flight-cta flight-cta--ghost" href="/journey">${tf("seeRoute")} <span>→</span></a>
        <a class="flight-cta flight-cta--ghost" href="/assessment">${tf("myAccount")} <span>→</span></a>
        <a class="flight-cta flight-cta--ghost" href="/passport">${tf("myPassport")} <span>→</span></a>
      </div>
    </section>`;
  applyFills();
}

main();
