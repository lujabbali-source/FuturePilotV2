// Tu ruta: los pasos de la carrera que te salió, y cuáles llevas hechos.
//
// Lo que habia aqui era una maqueta con dos problemas de fondo. Las
// sub-tareas estaban escritas a mano en el HTML -las de Artificial
// Intelligence- y se servian a todo el mundo: el JavaScript solo reemplazaba
// los cuatro titulos, asi que Fisica mostraba exactamente las mismas casillas
// que Ingenieria de software. Y el "35%" de progreso tambien estaba escrito a
// mano, por lo que no se movia al marcar nada.
//
// Ahora los pasos vienen del roadmap real, distinto por carrera, y el
// progreso se calcula de lo que el estudiante ha marcado. Lo marcado vive en
// la CUENTA, no en el navegador: quien marca un paso en el movil lo tiene
// marcado al abrir el portatil.

import { t, currentLanguage } from "../shared/i18next.js";

const tj = (key, params) => t(`journeyPage.${key}`, { ns: "site", ...params });

const AI_STORAGE_KEY = "futurePilotAIResponse";
const AUTH_TOKEN_KEY = "futurePilotAuthToken";

const root = document.getElementById("journey");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

/** El estado: el roadmap y lo que ya está marcado. */
const state = { roadmap: null, career: "", done: new Set() };

async function load() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    try {
      const response = await fetch(`/api/v1/me/results?lang=${currentLanguage()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.results) {
          localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data.results));
          state.done = new Set(data.completed_checkpoints || []);
          return data.results;
        }
      }
    } catch {
      // Sin red se sigue con lo que haya guardado en el dispositivo. Lo
      // marcado no estara disponible, pero los pasos si.
    }
  }
  try {
    return JSON.parse(localStorage.getItem(AI_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

/** Un identificador estable por sub-tarea, para poder marcarla.
 *
 *  Lleva la carrera dentro: al repetir el test y cambiar de carrera, lo
 *  marcado de la anterior no debe aparecer marcado en la nueva. */
function itemId(step, index) {
  return `${state.roadmap.career_id || "x"}:${step}:${index}`;
}

/** Cuántas sub-tareas hay y cuántas están hechas. */
function tally() {
  let total = 0, hechas = 0;
  (state.roadmap?.checkpoints || []).forEach((cp) => {
    (cp.content?.items || []).forEach((_, i) => {
      total += 1;
      if (state.done.has(itemId(cp.step, i))) hechas += 1;
    });
  });
  return { total, hechas, percent: total ? Math.round((hechas / total) * 100) : 0 };
}

// ---------------------------------------------------------------------------
function renderEmpty() {
  return `
    <header class="journey-head">
      <h1>${tj("title")}</h1>
      <p>${tj("emptyBody")}</p>
    </header>
    <a class="flight-cta" href="/assessment">${tj("takeTest")} <span>→</span></a>`;
}

function renderStep(cp) {
  const contenido = cp.content;
  const titulo = contenido?.title || cp.title;
  const items = contenido?.items || [];

  return `
    <section class="step">
      <header class="step__head">
        <span class="step__num">${cp.step}</span>
        <h2>${escapeHtml(titulo)}</h2>
      </header>
      ${cp.description ? `<p class="step__desc">${escapeHtml(cp.description)}</p>` : ""}
      ${items.length ? `
        <ul class="step__items">
          ${items.map((texto, i) => {
            const id = itemId(cp.step, i);
            const hecho = state.done.has(id);
            return `
              <li class="step__item${hecho ? " is-done" : ""}">
                <label>
                  <input type="checkbox" data-item="${escapeHtml(id)}"${hecho ? " checked" : ""}>
                  <span>${escapeHtml(texto)}</span>
                </label>
                <!-- Hueco de recursos. Se marca como pendiente en vez de
                     mostrar enlaces a "#": un enlace que no lleva a ninguna
                     parte se siente roto, y esto se siente por hacer. -->
                <span class="step__resources" title="${escapeHtml(tj("resourcesPending"))}">
                  ${tj("resourcesPending")}
                </span>
              </li>`;
          }).join("")}
        </ul>`
      // Una carrera sin ruta escrita todavia. Se dice, en vez de rellenar con
      // las sub-tareas de otra.
      : `<p class="step__pending">${tj("stepPending")}</p>`}
    </section>`;
}

function render() {
  const { total, hechas, percent } = tally();

  root.innerHTML = `
    <header class="journey-head">
      <p class="flight-label">${tj("label")}</p>
      <h1>${escapeHtml(state.career)}</h1>
      <div class="journey-progress">
        <div class="journey-progress__head">
          <span>${tj("progress")}</span>
          <strong>${percent}%</strong>
        </div>
        <div class="path-track"><i data-fill="${percent}"></i></div>
        <p class="journey-progress__count">${tj("counted", { done: hechas, total })}</p>
      </div>
    </header>
    ${(state.roadmap.checkpoints || []).map(renderStep).join("")}
    <section class="flight-next">
      <p class="flight-label">${tj("keepGoing")}</p>
      <div class="flight-links">
        <a class="flight-cta flight-cta--ghost" href="/flightplan">${tj("flightPlan")} <span>→</span></a>
        <a class="flight-cta flight-cta--ghost" href="#mentor">${tj("askMentor")} <span>→</span></a>
      </div>
    </section>`;

  syncProgress();
}

/** Repinta SOLO el progreso: el porcentaje, la barra y el recuento.
 *
 *  Marcar una casilla no puede repintar la lista entera. Al hacerlo, el
 *  navegador destruye y recrea cada casilla: se pierde el foco, el scroll
 *  puede saltar, y marcar rapido pierde clics porque los nodos siguientes ya
 *  no son los que estaban en pantalla. */
function syncProgress() {
  const { total, hechas, percent } = tally();

  const numero = root.querySelector(".journey-progress__head strong");
  if (numero) numero.textContent = `${percent}%`;

  const recuento = root.querySelector(".journey-progress__count");
  if (recuento) recuento.textContent = tj("counted", { done: hechas, total });

  // El ancho por CSSOM: un atributo style= lo bloquea la CSP del sitio.
  const barra = root.querySelector(".path-track i");
  if (barra) barra.style.setProperty("width", `${Math.max(0, Math.min(100, percent))}%`);
}

// ---------------------------------------------------------------------------
// Marcar una sub-tarea. Por delegacion: la lista se repinta entera al
// recalcular el progreso, y un escuchador sobre una casilla concreta no
// sobreviviria a ese repintado.
// ---------------------------------------------------------------------------
root.addEventListener("change", async (event) => {
  const casilla = event.target.closest("[data-item]");
  if (!casilla) return;

  const id = casilla.dataset.item;
  const marcada = casilla.checked;

  // Se pinta de inmediato y se guarda despues: esperar a la red para mover
  // una casilla se siente roto. Si la peticion falla se deshace.
  const aplicar = (hecho) => {
    if (hecho) state.done.add(id); else state.done.delete(id);
    casilla.checked = hecho;
    casilla.closest(".step__item")?.classList.toggle("is-done", hecho);
    syncProgress();
  };
  aplicar(marcada);

  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return;
  try {
    const response = await fetch("/api/v1/me/roadmap/checkpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ item_id: id, done: marcada }),
    });
    if (!response.ok) throw new Error("no guardado");
    state.done = new Set((await response.json()).completed || []);
    syncProgress();
  } catch {
    // No se pudo guardar: se revierte para no mostrar como hecho algo que
    // no quedo registrado en la cuenta.
    aplicar(!marcada);
  }
});

async function main() {
  const resultado = await load();
  if (!resultado?.roadmap) {
    root.innerHTML = renderEmpty();
    return;
  }
  state.roadmap = resultado.roadmap;
  state.career = resultado.roadmap.career_title
    || resultado.recommended_careers?.[0]?.title
    || "";
  render();
}

main();
