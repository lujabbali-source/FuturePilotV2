// JS propio de la pagina, extraido del <script> incrustado en
// Frontend/careers.html.
//
// Fuente unica de verdad: el catalogo vive en futurepilot-IA/data/careers.json
// y se sirve via /api/v1/careers. Antes esta pagina tenia su propio
// careerMap hardcodeado, con nombres que no coincidian con el catalogo real
// que usa la IA para el matching.

import { currentLanguage, onLanguageChange, t } from "../shared/i18next.js";
import "./page.css";

let careers = [];

const grid = document.getElementById("careerGrid");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function renderCareers(list) {
  // Se arma la lista entera y se asigna una vez, en vez de concatenar sobre
  // innerHTML dentro del bucle: con 73 carreras, aquello reparseaba el HTML
  // acumulado en cada vuelta.
  grid.innerHTML = list
    .map(
      (career) => `
      <div class="career-card">
        <span class="career-card__category">${escapeHtml(career.category)}</span>
        <h3>${escapeHtml(career.title)}</h3>
        <p>${escapeHtml(career.description)}</p>
        <button type="button" class="build-btn" data-career-id="${escapeHtml(career.id)}">
          ${escapeHtml(t("careers.buildPlan", { ns: "site" }))}
        </button>
      </div>`
    )
    .join("");
}

// Delegacion en vez de onclick="" en cada boton. Un manejador inline es
// script inline: la CSP del sitio declara script-src 'self' y lo bloquea,
// asi que el boton no hacia nada al pulsarlo.
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-career-id]");
  if (!button) return;

  const career = careers.find((item) => item.id === button.dataset.careerId);
  if (!career) return;

  // Por la URL, no por localStorage. El plan de vuelo tiene que ser de LA
  // carrera que se pulso: antes se guardaba el titulo en localStorage, la
  // pagina no lo miraba, y acababas en un plan sobre otra carrera distinta.
  window.location.href = `/flightplan?career=${encodeURIComponent(career.id)}`;
});

document.getElementById("searchInput").addEventListener("input", (event) => {
  const search = event.target.value.toLowerCase();
  renderCareers(
    careers.filter(
      (career) =>
        career.title.toLowerCase().includes(search) ||
        career.category.toLowerCase().includes(search)
    )
  );
});

async function loadCareers() {
  try {
    const response = await fetch(`/api/v1/careers?lang=${currentLanguage()}`);
    const data = await response.json();
    careers = data.careers || [];
    renderCareers(careers);
  } catch (error) {
    grid.innerHTML = `<p>${escapeHtml(t("careers.loadError", { ns: "site" }))}</p>`;
  }
}

loadCareers();

// El catalogo lo traduce el servidor, asi que cambiar de idioma obliga a
// volver a pedirlo: repintar lo que ya hay no cambiaria nada.
onLanguageChange(() => loadCareers());
