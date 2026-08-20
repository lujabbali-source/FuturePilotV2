// Tu ruta: el camino hacia la carrera que te salió, hito a hito.
//
// La página es un CAMINO, no una lista. Los cuatro hitos van sobre una senda
// que serpentea de arriba abajo, con la parte ya recorrida encendida y el
// resto en trazo discontinuo. Esa forma no es decoración: un roadmap trata de
// orden y de distancia, y una pila de rectángulos no comunica ninguna de las
// dos cosas.
//
// Los datos son reales. Los pasos vienen del roadmap de ESA carrera (73
// escritas, ver data/roadmaps.json) y lo marcado vive en la cuenta, así que
// quien marca desde el móvil lo encuentra marcado en el portátil.
//
// La senda se dibuja midiendo dónde quedaron los pines DESPUÉS de pintar, no
// con coordenadas fijas: las tarjetas cambian de alto con el texto y con el
// ancho de la ventana, y una curva calculada de antemano se despega de ellas
// en cuanto una descripción ocupa una línea más.

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

/** El estado: el roadmap, la carrera y lo que ya está marcado. */
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
      // Sin red se sigue con lo que haya en el dispositivo: los pasos se ven,
      // lo marcado no.
    }
  }
  try {
    return JSON.parse(localStorage.getItem(AI_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

/** Identificador estable por sub-tarea.
 *
 *  Lleva la carrera dentro: al repetir el test y cambiar de carrera, lo
 *  marcado de la anterior no debe aparecer marcado en la nueva. */
function itemId(step, index) {
  return `${state.roadmap.career_id || "x"}:${step}:${index}`;
}

function stepItems(cp) {
  return cp.content?.items || [];
}

/** Cuánto lleva hecho: en total y por hito. */
function tally() {
  let total = 0, hechas = 0;
  (state.roadmap?.checkpoints || []).forEach((cp) => {
    stepItems(cp).forEach((_, i) => {
      total += 1;
      if (state.done.has(itemId(cp.step, i))) hechas += 1;
    });
  });
  return { total, hechas, percent: total ? Math.round((hechas / total) * 100) : 0 };
}

function stepState(cp) {
  const items = stepItems(cp);
  // El hito de nivelación sin sub-tareas está cumplido, no pendiente: significa
  // que el perfil ya llega a lo que pide la carrera. Dejarlo gris para siempre
  // haría que la senda nunca se encendiera entera aunque no quede nada por
  // hacer.
  if (!items.length) return cp.key === "roadmap.step2" ? "done" : "pending";
  const hechas = items.filter((_, i) => state.done.has(itemId(cp.step, i))).length;
  if (hechas === items.length) return "done";
  return hechas ? "current" : "pending";
}

/** El hito en el que estás: el primero sin terminar. */
function currentStepIndex() {
  const pasos = state.roadmap?.checkpoints || [];
  const empezado = pasos.findIndex((cp) => stepState(cp) === "current");
  if (empezado >= 0) return empezado;
  const siguiente = pasos.findIndex((cp) => stepState(cp) !== "done");
  return siguiente >= 0 ? siguiente : -1;
}

// ---------------------------------------------------------------------------
// Pintado
// ---------------------------------------------------------------------------
function renderEmpty() {
  return `
    <div class="rm-empty">
      <p class="rm-kicker">${tj("label")}</p>
      <h1>${tj("title")}</h1>
      <p class="rm-empty__body">${tj("emptyBody")}</p>
      <a class="rm-cta" href="/assessment">${tj("takeTest")} <span aria-hidden="true">→</span></a>
    </div>`;
}

function renderSidebar() {
  const { total, hechas, percent } = tally();
  return `
    <aside class="rm-side">
      <div class="rm-side__card">
        <p class="rm-kicker">${tj("label")}</p>
        <h1 class="rm-side__career">${escapeHtml(state.career)}</h1>
        <p class="rm-side__tagline">${tj("tagline")}</p>

        <p class="rm-kicker rm-side__sep">${tj("progress")}</p>
        <p class="rm-side__pct" data-progress-pct>${percent}%</p>
        <div class="rm-bar"><i data-fill="${percent}"></i></div>
        <p class="rm-side__count" data-progress-count>${tj("counted", { done: hechas, total })}</p>
      </div>

      <div class="rm-side__card rm-side__how">
        <p class="rm-side__howTitle">${tj("howTitle")}</p>
        <p>${tj("howBody")}</p>
      </div>

      <ul class="rm-legend">
        <li><i class="rm-legend__pin rm-legend__pin--current"></i>${tj("legendCurrent")}</li>
        <li><i class="rm-legend__pin rm-legend__pin--next"></i>${tj("legendUpcoming")}</li>
        <li><i class="rm-legend__pin rm-legend__pin--done"></i>${tj("legendDone")}</li>
        <li><i class="rm-legend__dash"></i>${tj("legendPath")}</li>
      </ul>

      <blockquote class="rm-quote">
        <p>${tj("quote")}</p>
        <cite>${tj("quoteBy")}</cite>
      </blockquote>
    </aside>`;
}

function renderNode(cp, index) {
  const contenido = cp.content;
  const titulo = contenido?.title || cp.title;
  const items = stepItems(cp);
  const estado = stepState(cp);
  const completo = estado === "done";

  return `
    <li class="rm-node rm-node--${index % 2 ? "left" : "right"} is-${estado}" data-step="${cp.step}">
      <span class="rm-pin" aria-hidden="true"><i></i></span>

      <article class="rm-card">
        <h2 class="rm-card__title">
          <span class="rm-card__num">${cp.step}</span>
          ${escapeHtml(titulo)}
        </h2>
        ${cp.description ? `<p class="rm-card__desc">${escapeHtml(cp.description)}</p>` : ""}

        ${items.length ? `
          <ul class="rm-tasks">
            ${items.map((texto, i) => {
              const id = itemId(cp.step, i);
              const hecho = state.done.has(id);
              return `
                <li class="rm-task${hecho ? " is-done" : ""}">
                  <label>
                    <input type="checkbox" data-item="${escapeHtml(id)}"${hecho ? " checked" : ""}>
                    <span>${escapeHtml(texto)}</span>
                  </label>
                </li>`;
            }).join("")}
          </ul>
          <button type="button" class="rm-mark" data-mark="${cp.step}">
            ${completo ? tj("markUndo") : tj("markDone")}
          </button>`
        // Sin sub-tareas hay dos motivos distintos y decir el equivocado es
        // mentirle al estudiante. En el hito de nivelación significa que no
        // tiene ninguna brecha contra esta carrera - que es una buena
        // noticia, no un hueco de contenido. En los demás sí es que la ruta
        // no está escrita todavía.
        : `<p class="rm-card__pending">${
             cp.key === "roadmap.step2" ? tj("noGaps") : tj("stepPending")
           }</p>`}
      </article>
    </li>`;
}

function render() {
  root.innerHTML = `
    ${renderSidebar()}

    <div class="rm-track">
      <svg class="rm-path" aria-hidden="true" preserveAspectRatio="none">
        <path class="rm-path__base" fill="none"></path>
        <path class="rm-path__done" fill="none"></path>
      </svg>

      <p class="rm-start">${tj("start")}</p>
      <ol class="rm-nodes">
        ${(state.roadmap.checkpoints || []).map(renderNode).join("")}
      </ol>
      <div class="rm-end">
        <span class="rm-end__flag" aria-hidden="true">⚑</span>
        <p class="rm-end__title">${tj("future")}</p>
        <p class="rm-end__body">${tj("futureBody")}</p>
        <div class="rm-end__links">
          <a class="rm-cta rm-cta--ghost" href="/flightplan">${tj("flightPlan")} <span aria-hidden="true">→</span></a>
          <a class="rm-cta rm-cta--ghost" href="#mentor">${tj("askMentor")} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>`;

  syncProgress();
  drawPath();
}

// ---------------------------------------------------------------------------
// La senda
// ---------------------------------------------------------------------------
/** Dibuja la curva que une el inicio, los pines y el final.
 *
 *  Se mide el DOM ya pintado en vez de calcular posiciones de antemano: el
 *  alto de cada tarjeta depende de cuánto texto tenga y del ancho de la
 *  ventana, así que una curva fija se despegaría de los pines en cuanto una
 *  descripción ocupara una línea más. */
function drawPath() {
  const svg = root.querySelector(".rm-path");
  const track = root.querySelector(".rm-track");
  if (!svg || !track) return;

  const anclas = [
    root.querySelector(".rm-start"),
    ...root.querySelectorAll(".rm-pin"),
    root.querySelector(".rm-end__flag"),
  ].filter(Boolean);
  if (anclas.length < 2) return;

  const marco = track.getBoundingClientRect();
  const centro = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left - marco.left + r.width / 2, y: r.top - marco.top + r.height / 2 };
  };
  const puntos = anclas.map(centro);

  // Curvas cúbicas con tiradores verticales: la senda entra y sale de cada
  // pin en vertical, que es lo que la hace leerse como un camino y no como
  // una línea quebrada.
  let d = `M ${puntos[0].x.toFixed(1)} ${puntos[0].y.toFixed(1)}`;
  for (let i = 1; i < puntos.length; i += 1) {
    const a = puntos[i - 1], b = puntos[i];
    const tirador = (b.y - a.y) * 0.5;
    d += ` C ${a.x.toFixed(1)} ${(a.y + tirador).toFixed(1)},`
       + ` ${b.x.toFixed(1)} ${(b.y - tirador).toFixed(1)},`
       + ` ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }

  svg.setAttribute("viewBox", `0 0 ${marco.width.toFixed(0)} ${marco.height.toFixed(0)}`);
  svg.querySelectorAll("path").forEach((p) => p.setAttribute("d", d));
  syncPathProgress();
}

/** La parte recorrida de la senda va encendida; el resto, apagado.
 *
 *  Se consigue recortando el trazo brillante con dashoffset sobre su propia
 *  longitud, así que sigue exactamente la curva sea cual sea su forma. */
function syncPathProgress() {
  const hecho = root.querySelector(".rm-path__done");
  if (!hecho || !hecho.getAttribute("d")) return;
  const largo = hecho.getTotalLength();
  if (!largo) return;
  const { percent } = tally();
  hecho.style.setProperty("stroke-dasharray", `${largo}`);
  hecho.style.setProperty("stroke-dashoffset", `${largo * (1 - percent / 100)}`);
}

/** Repinta SOLO lo que cambia al marcar: el porcentaje, la barra, la senda y
 *  el estado del hito. Repintar la lista entera destruiría y recrearía cada
 *  casilla, con lo que se pierde el foco y marcar rápido pierde clics. */
function syncProgress() {
  const { total, hechas, percent } = tally();

  const numero = root.querySelector("[data-progress-pct]");
  if (numero) numero.textContent = `${percent}%`;

  const recuento = root.querySelector("[data-progress-count]");
  if (recuento) recuento.textContent = tj("counted", { done: hechas, total });

  // El ancho por CSSOM: un atributo style= lo bloquea la CSP del sitio.
  const barra = root.querySelector(".rm-bar i");
  if (barra) barra.style.setProperty("width", `${Math.max(0, Math.min(100, percent))}%`);

  const actual = currentStepIndex();
  root.querySelectorAll(".rm-node").forEach((nodo, i) => {
    const cp = state.roadmap.checkpoints[i];
    const estado = stepState(cp);
    nodo.classList.toggle("is-done", estado === "done");
    nodo.classList.toggle("is-current", estado !== "done" && i === actual);
    nodo.classList.toggle("is-pending", estado !== "done" && i !== actual);

    const boton = nodo.querySelector("[data-mark]");
    if (boton) boton.textContent = estado === "done" ? tj("markUndo") : tj("markDone");
  });

  syncPathProgress();
}

// ---------------------------------------------------------------------------
// Marcar
// ---------------------------------------------------------------------------
/** Guarda una sub-tarea en la cuenta. Devuelve si se pudo. */
async function persist(id, done) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return true;   // sin sesión no hay dónde guardar; se pinta igual
  try {
    const response = await fetch("/api/v1/me/roadmap/checkpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ item_id: id, done }),
    });
    if (!response.ok) return false;
    state.done = new Set((await response.json()).completed || []);
    return true;
  } catch {
    return false;
  }
}

function paintTask(casilla, hecho) {
  casilla.checked = hecho;
  casilla.closest(".rm-task")?.classList.toggle("is-done", hecho);
}

root.addEventListener("change", async (event) => {
  const casilla = event.target.closest("[data-item]");
  if (!casilla) return;

  const id = casilla.dataset.item;
  const marcada = casilla.checked;

  // Se pinta de inmediato y se guarda después: esperar a la red para mover
  // una casilla se siente roto. Si la petición falla, se deshace.
  if (marcada) state.done.add(id); else state.done.delete(id);
  paintTask(casilla, marcada);
  syncProgress();

  if (!(await persist(id, marcada))) {
    if (marcada) state.done.delete(id); else state.done.add(id);
    paintTask(casilla, !marcada);
  }
  syncProgress();
});

// "Marcar como completo": todas las sub-tareas del hito de una vez.
root.addEventListener("click", async (event) => {
  const boton = event.target.closest("[data-mark]");
  if (!boton) return;

  const paso = Number(boton.dataset.mark);
  const cp = (state.roadmap.checkpoints || []).find((x) => x.step === paso);
  if (!cp) return;

  const objetivo = stepState(cp) !== "done";
  boton.disabled = true;

  const cambiadas = [];
  stepItems(cp).forEach((_, i) => {
    const id = itemId(paso, i);
    if (state.done.has(id) === objetivo) return;
    cambiadas.push(id);
    if (objetivo) state.done.add(id); else state.done.delete(id);
  });

  root.querySelectorAll(`.rm-node[data-step="${paso}"] [data-item]`)
      .forEach((c) => paintTask(c, objetivo));
  syncProgress();

  // Se guarda una a una: el endpoint es por sub-tarea y es idempotente, así
  // que un reintento no duplica nada.
  for (const id of cambiadas) {
    if (!(await persist(id, objetivo))) {
      if (objetivo) state.done.delete(id); else state.done.add(id);
    }
  }
  root.querySelectorAll(`.rm-node[data-step="${paso}"] [data-item]`)
      .forEach((c) => paintTask(c, state.done.has(c.dataset.item)));
  syncProgress();
  boton.disabled = false;
});

// La senda se redibuja cuando cambian las medidas: al cambiar el ancho, al
// cargar una tipografía, al reflujo de un texto más largo.
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(() => drawPath()).observe(root);
}
window.addEventListener("resize", drawPath);

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
  // Las tipografías llegan después del primer pintado y mueven el alto de las
  // tarjetas; sin esto la senda queda unos píxeles desplazada.
  document.fonts?.ready.then(drawPath);
}

main();
