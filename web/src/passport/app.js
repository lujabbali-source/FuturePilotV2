// Pasaporte FuturePilot: un librito que se abre y se recorre.
//
// La pagina anterior era un dashboard - tarjetas apiladas con el perfil, los
// objetivos, el progreso y una rejilla de sellos. Toda esa funcionalidad
// sigue aqui, pero repartida en PAGINAS de un documento que se abre desde la
// portada y se pasa hoja a hoja.
//
// Dos reglas guian la implementacion:
//
//   - El estado de "que pagina estoy viendo" vive en un solo sitio
//     (`state.spread`). La navegacion, el teclado y el cambio de tamaño de
//     ventana leen y escriben ahi; no hay copias que puedan desalinearse.
//
//   - Las paginas se REPINTAN al navegar, asi que nada puede depender de
//     escuchadores puestos sobre un nodo concreto. Todos los eventos del
//     interior van por delegacion sobre el contenedor, que si es estable.

import { renderStamp, renderEmptySlot, applyStampQuirks } from "./stamps.js";

// El cuerpo va dentro de una funcion con nombre porque necesita cortar
// pronto (`return`) si no hay sesion.
function main() {
  const gate = document.getElementById("passportGate");
  const shell = document.getElementById("passportShell");

  const token = localStorage.getItem("futurePilotAuthToken");
  if (!token) {
    window.location.href = "/login?mode=login";
    return;
  }
  const authHeaders = { Authorization: `Bearer ${token}` };

  const book = document.getElementById("book");
  const cover = document.getElementById("cover");
  const spread = document.getElementById("spread");
  const pageLeft = document.getElementById("pageLeft");
  const pageRight = document.getElementById("pageRight");
  const controls = document.getElementById("controls");
  const indicator = document.getElementById("pageIndicator");

  // Una sola pagina a la vez por debajo de este ancho: el libro abierto no
  // cabe sin que la letra quede ilegible.
  const SINGLE_PAGE = window.matchMedia("(max-width: 900px)");

  const state = {
    data: null,
    pages: [],
    spread: 0,      // indice del pliego (o de la pagina en movil)
    open: false,
    editing: null,  // "profile" | "goals" | null
    // Con que modo se pinto por ultima vez. Sirve para detectar el paso de
    // una a dos paginas sin depender de que llegue un evento (ver syncLayout).
    single: SINGLE_PAGE.matches,
  };

  // ------------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------------
  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const date = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });
  }

  function shortDate(iso) {
    if (!iso) return "";
    const date = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
    return Number.isNaN(date.getTime())
      ? "" : date.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "2-digit" });
  }

  /** Campo de solo lectura de las paginas de documento. */
  function field(label, value, wide = false) {
    return `
      <div class="fp-field${wide ? " fp-field--wide" : ""}">
        <span class="fp-field__label">${escapeHtml(label)}</span>
        <strong class="fp-field__value">${escapeHtml(value || "Sin definir")}</strong>
      </div>`;
  }

  function input(name, label, value, placeholder) {
    return `
      <label class="fp-input">
        <span>${escapeHtml(label)}</span>
        <input type="text" name="${name}" value="${escapeHtml(value || "")}" placeholder="${escapeHtml(placeholder)}">
      </label>`;
  }

  // ------------------------------------------------------------------
  // Portada
  // ------------------------------------------------------------------
  function renderCover(data) {
    const nombre = data.user.name || data.user.email.split("@")[0];
    document.getElementById("coverName").textContent = nombre;
    document.getElementById("coverId").textContent = data.user.passport_id || "FP-------";
    document.getElementById("coverIssued").textContent = shortDate(data.user.member_since) || "—";
  }

  // ------------------------------------------------------------------
  // Paginas. Cada una devuelve solo su CONTENIDO; el marco de papel, la
  // numeracion y las lineas de seguridad las pone paintPage().
  // ------------------------------------------------------------------
  function pageIdentity() {
    const { user, profile } = state.data;
    const nombre = user.name || user.email.split("@")[0];
    const inicial = nombre.trim().charAt(0).toUpperCase() || "?";
    const foto = profile.photo_data_url;

    if (state.editing === "profile") {
      return {
        title: "Identificación",
        body: `
          <form class="fp-form" data-form="profile">
            ${input("country", "País de residencia", profile.country, "Colombia")}
            ${input("city", "Ciudad", profile.city, "Bogotá")}
            ${input("languages", "Idiomas (separados por coma)", (profile.languages || []).join(", "), "Español, Inglés")}
            <div class="fp-form__actions">
              <button type="submit" class="fp-btn fp-btn--ink">Guardar</button>
              <button type="button" class="fp-btn" data-cancel>Cancelar</button>
            </div>
          </form>`,
      };
    }

    return {
      title: "Identificación",
      body: `
        <div class="fp-identity">
          <div class="fp-identity__photo">
            ${foto
              ? `<img src="${escapeHtml(foto)}" alt="">`
              : `<span class="fp-identity__initial">${escapeHtml(inicial)}</span>`}
            <label class="fp-identity__upload">
              <input type="file" accept="image/*" data-photo hidden>
              <span>Cambiar</span>
            </label>
          </div>
          <div class="fp-identity__data">
            ${field("Nombre", nombre)}
            ${field("FuturePilot ID", user.passport_id)}
            ${field("Emitido", formatDate(user.member_since))}
          </div>
        </div>
        <div class="fp-fields">
          ${field("País", profile.country)}
          ${field("Ciudad", profile.city)}
          ${field("Idiomas", (profile.languages || []).join(", "))}
        </div>
        <button type="button" class="fp-btn fp-btn--edit" data-edit="profile">Editar datos</button>`,
    };
  }

  function pageGoals() {
    const goals = state.data.profile.goals || {};

    if (state.editing === "goals") {
      return {
        title: "Objetivo académico",
        body: `
          <form class="fp-form" data-form="goals">
            ${input("dream_university", "Universidad objetivo", goals.dream_university, "MIT")}
            ${input("desired_career", "Carrera de interés", goals.desired_career, "Ingeniería de Software")}
            ${input("target_country", "País donde estudiar", goals.target_country, "Canadá")}
            ${input("languages_to_learn", "Idiomas por aprender", goals.languages_to_learn, "Francés")}
            <label class="fp-input">
              <span>Metas personales</span>
              <textarea name="personal_goals" rows="3" placeholder="Lo que quieres lograr...">${escapeHtml(goals.personal_goals || "")}</textarea>
            </label>
            <div class="fp-form__actions">
              <button type="submit" class="fp-btn fp-btn--ink">Guardar</button>
              <button type="button" class="fp-btn" data-cancel>Cancelar</button>
            </div>
          </form>`,
      };
    }

    return {
      title: "Objetivo académico",
      body: `
        <div class="fp-fields">
          ${field("Universidad objetivo", goals.dream_university)}
          ${field("Carrera de interés", goals.desired_career)}
          ${field("País donde estudiar", goals.target_country)}
          ${field("Idiomas por aprender", goals.languages_to_learn)}
          ${field("Metas personales", goals.personal_goals, true)}
        </div>
        <p class="fp-note">Fijar una universidad objetivo deja un sello en este pasaporte.</p>
        <button type="button" class="fp-btn fp-btn--edit" data-edit="goals">Editar objetivos</button>`,
    };
  }

  function pageVocational() {
    const vocational = state.data.vocational;
    if (!vocational) {
      return {
        title: "Perfil vocacional",
        body: `
          <p class="fp-empty">Esta página se completa al terminar el test vocacional.</p>
          <a class="fp-btn fp-btn--ink" href="/assessment">Hacer el test →</a>`,
      };
    }

    const carreras = (vocational.recommended_careers || []).map((c, i) => `
      <li><span class="fp-rank">${String(i + 1).padStart(2, "0")}</span>
          <span class="fp-career">${escapeHtml(c.title)}</span>
          <span class="fp-match">${Math.round(c.match_percentage)}%</span></li>`).join("");

    return {
      title: "Perfil vocacional",
      body: `
        <div class="fp-fields">
          ${field("Arquetipo", vocational.personality)}
          ${field("Estilo de aprendizaje", vocational.learning_style, true)}
        </div>
        <p class="fp-subhead">Carreras compatibles</p>
        <ol class="fp-careers">${carreras}</ol>
        <p class="fp-note">Registrado el ${escapeHtml(formatDate(vocational.completed_at))}.</p>`,
    };
  }

  function pageJourney() {
    const p = state.data.progress;
    const filas = [
      ["Tests completados", p.tests_completed],
      ["Roadmaps creados", p.roadmaps_completed],
      ["Universidades descubiertas", p.universities_explored],
      ["Países explorados", p.countries_explored],
      ["Ciudades exploradas", p.cities_explored],
      ["Conversaciones con el mentor", p.ai_conversations],
    ].map(([label, valor]) => `
      <tr><th>${escapeHtml(label)}</th><td>${valor}</td></tr>`).join("");

    const actividad = (state.data.recent_activity || []).slice(0, 6).map((e) => `
      <li><span>${escapeHtml(shortDate(e.created_at))}</span> ${escapeHtml(e.subject_label || e.event_type)}</li>`).join("");

    return {
      title: "Registro de viaje",
      body: `
        <table class="fp-ledger">${filas}</table>
        ${actividad ? `<p class="fp-subhead">Últimos movimientos</p><ul class="fp-activity">${actividad}</ul>` : ""}`,
    };
  }

  /** Paginas de sellos. Se reparten de 6 en 6; siempre hay al menos una,
   *  aunque este vacia - un pasaporte nuevo tiene hojas en blanco, y verlas
   *  es parte de la experiencia de irlas llenando. */
  const STAMPS_PER_PAGE = 6;

  function stampPages() {
    const stamps = state.data.stamps || [];
    const total = Math.max(1, Math.ceil(stamps.length / STAMPS_PER_PAGE));

    return Array.from({ length: total }, (_, i) => {
      const trozo = stamps.slice(i * STAMPS_PER_PAGE, (i + 1) * STAMPS_PER_PAGE);
      const huecos = Array.from(
        { length: Math.max(0, STAMPS_PER_PAGE - trozo.length) },
        (_, j) => renderEmptySlot(trozo.length + j)
      ).join("");

      return {
        title: total > 1 ? `Sellos · ${i + 1} de ${total}` : "Sellos",
        body: `<div class="fp-stamps">${trozo.map(renderStamp).join("")}${huecos}</div>`,
      };
    });
  }

  function buildPages() {
    state.pages = [
      pageIdentity(),
      pageGoals(),
      pageVocational(),
      pageJourney(),
      ...stampPages(),
    ];
    // Un pliego necesita par de paginas: si sobra una, se añade una hoja de
    // cortesia en vez de dejar medio libro vacio.
    if (state.pages.length % 2 === 1) {
      state.pages.push({
        title: "",
        body: `<p class="fp-endnote">Este pasaporte sigue escribiéndose.<br>Cada país, universidad y decisión deja su marca.</p>`,
      });
    }
  }

  // ------------------------------------------------------------------
  // Pintado
  // ------------------------------------------------------------------
  function paintPage(element, page, numero) {
    if (!page) {
      element.innerHTML = "";
      element.hidden = true;
      return;
    }
    element.hidden = false;
    element.innerHTML = `
      <div class="fp-page__guilloche" aria-hidden="true"></div>
      <header class="fp-page__head">
        <span class="fp-page__title">${escapeHtml(page.title)}</span>
        <span class="fp-page__seal" aria-hidden="true">FP</span>
      </header>
      <div class="fp-page__body">${page.body}</div>
      <footer class="fp-page__foot">
        <span class="fp-page__code" aria-hidden="true">FUTUREPILOT · PASSPORT</span>
        <span class="fp-page__number">${String(numero).padStart(2, "0")}</span>
      </footer>`;
    applyStampQuirks(element);
  }

  function render() {
    const single = SINGLE_PAGE.matches;
    state.single = single;
    book.dataset.layout = single ? "single" : "spread";

    const izquierda = single ? state.spread : state.spread * 2;
    paintPage(pageLeft, state.pages[izquierda], izquierda + 1);
    paintPage(pageRight, single ? null : state.pages[izquierda + 1], izquierda + 2);

    const total = single ? state.pages.length : Math.ceil(state.pages.length / 2);
    indicator.textContent = `${state.spread + 1} / ${total}`;
    document.getElementById("prevPage").disabled = state.spread === 0;
    document.getElementById("nextPage").disabled = state.spread >= total - 1;
  }

  function maxSpread() {
    const total = SINGLE_PAGE.matches ? state.pages.length : Math.ceil(state.pages.length / 2);
    return Math.max(0, total - 1);
  }

  /** Pasa de pagina con un giro corto. La animacion es deliberadamente
   *  breve: tiene que leerse como una hoja, no hacerte esperar. */
  function turn(delta) {
    const destino = Math.min(maxSpread(), Math.max(0, state.spread + delta));
    if (destino === state.spread) return;

    const saliente = delta > 0 ? pageRight : pageLeft;
    saliente.classList.add(delta > 0 ? "is-turning-forward" : "is-turning-back");

    window.setTimeout(() => {
      saliente.classList.remove("is-turning-forward", "is-turning-back");
      state.spread = destino;
      render();
    }, 180);
  }

  function openBook() {
    if (state.open) return;
    state.open = true;
    book.dataset.state = "open";
    cover.setAttribute("aria-expanded", "true");
    controls.hidden = false;
    render();
  }

  function closeBook() {
    state.open = false;
    state.editing = null;
    state.spread = 0;
    book.dataset.state = "closed";
    cover.setAttribute("aria-expanded", "false");
    controls.hidden = true;
    cover.focus();
  }

  // ------------------------------------------------------------------
  // Interaccion. Todo por delegacion: las paginas se repintan enteras al
  // navegar, asi que un listener sobre un boton concreto no sobreviviria.
  // ------------------------------------------------------------------
  async function saveProfile(form) {
    const datos = new FormData(form);
    const response = await fetch("/api/v1/passport/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({
        country: String(datos.get("country") || "").trim(),
        city: String(datos.get("city") || "").trim(),
        languages: String(datos.get("languages") || "")
          .split(",").map((l) => l.trim()).filter(Boolean),
      }),
    });
    if (!response.ok) return;
    state.data.profile = (await response.json()).profile;
    state.editing = null;
    buildPages();
    render();
  }

  async function saveGoals(form) {
    const datos = new FormData(form);
    const goals = {
      dream_university: String(datos.get("dream_university") || "").trim(),
      desired_career: String(datos.get("desired_career") || "").trim(),
      target_country: String(datos.get("target_country") || "").trim(),
      languages_to_learn: String(datos.get("languages_to_learn") || "").trim(),
      personal_goals: String(datos.get("personal_goals") || "").trim(),
    };
    const response = await fetch("/api/v1/passport/goals", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ goals }),
    });
    if (!response.ok) return;

    const result = await response.json();
    state.data.profile = result.profile;
    state.editing = null;

    // Fijar la universidad objetivo puede haber dejado un sello nuevo: se
    // recarga el pasaporte para que aparezca en su pagina, y se celebra.
    if (result.new_stamps?.length) {
      window.FuturePilotStampToast?.show(
        result.new_stamps.map((s) => ({ label: `🎯 ${s.label}` }))
      );
      state.data = await loadPassport();
    }
    buildPages();
    render();
  }

  async function savePhoto(file) {
    if (file.size > 200_000) {
      window.alert("La imagen es muy pesada. Usa una foto de menos de 200KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const response = await fetch("/api/v1/passport/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ photo_data_url: reader.result }),
      });
      if (!response.ok) return;
      state.data.profile = (await response.json()).profile;
      buildPages();
      render();
    };
    reader.readAsDataURL(file);
  }

  spread.addEventListener("click", (event) => {
    const editar = event.target.closest("[data-edit]");
    if (editar) {
      state.editing = editar.dataset.edit;
      buildPages();
      render();
      return;
    }
    if (event.target.closest("[data-cancel]")) {
      state.editing = null;
      buildPages();
      render();
    }
  });

  spread.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-form]");
    if (!form) return;
    event.preventDefault();
    if (form.dataset.form === "profile") saveProfile(form);
    else saveGoals(form);
  });

  spread.addEventListener("change", (event) => {
    const entrada = event.target.closest("[data-photo]");
    if (entrada?.files?.[0]) savePhoto(entrada.files[0]);
  });

  cover.addEventListener("click", openBook);
  document.getElementById("prevPage").addEventListener("click", () => turn(-1));
  document.getElementById("nextPage").addEventListener("click", () => turn(1));
  document.getElementById("closeBook").addEventListener("click", closeBook);

  document.addEventListener("keydown", (event) => {
    if (!state.open) {
      if (event.key === "Enter" || event.key === " ") openBook();
      return;
    }
    // Dentro de un campo, las flechas mueven el cursor: no son navegacion.
    if (event.target.matches("input, textarea")) return;
    if (event.key === "ArrowRight") turn(1);
    if (event.key === "ArrowLeft") turn(-1);
    if (event.key === "Escape") closeBook();
  });

  // Cambiar de una pagina a dos (o al reves) mueve el indice: en pliego, el
  // pliego 3 son las paginas 6 y 7. Hay que recalcularlo para no saltar de
  // sitio al girar el movil o redimensionar la ventana.
  //
  // Se compara contra el modo con el que se pinto por ultima vez en vez de
  // confiar solo en el evento `change` de matchMedia: si ese evento no
  // llega - y no siempre llega, por ejemplo cuando el viewport lo cambia la
  // herramienta de desarrollo - el CSS pasa a una columna mientras el JS
  // sigue creyendo que pinta dos, y el pliego queda descuadrado.
  function syncLayout() {
    const single = SINGLE_PAGE.matches;
    if (single === state.single) return;
    state.spread = single ? state.spread * 2 : Math.floor(state.spread / 2);
    state.spread = Math.min(state.spread, maxSpread());
    state.single = single;
    if (state.open) render();
  }

  SINGLE_PAGE.addEventListener("change", syncLayout);
  window.addEventListener("resize", syncLayout);

  // ------------------------------------------------------------------
  async function loadPassport() {
    const response = await fetch("/api/v1/passport", { headers: authHeaders });
    if (!response.ok) throw new Error("passport fetch failed");
    return response.json();
  }

  async function init() {
    try {
      state.data = await loadPassport();
    } catch (error) {
      window.location.href = "/login?mode=login";
      return;
    }
    gate.hidden = true;
    shell.hidden = false;
    renderCover(state.data);
    buildPages();
  }

  init();
}

main();
