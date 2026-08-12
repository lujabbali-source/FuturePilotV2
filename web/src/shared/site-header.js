// Cabecera unica del sitio.
//
// Cada pagina traia la suya: la landing un <nav>, journey otro distinto, el
// pasaporte un tercero, flightplan solo un enlace de "volver", y careers,
// login y reset-password ninguna. Seis tratamientos y tres huecos, asi que
// el estudiante se quedaba sin forma de volver ni de ver si tenia sesion
// justo en las pantallas donde mas perdido esta.
//
// Se monta sola con importarla. El selector de idioma va dentro, en vez de
// flotar suelto sobre el contenido.

import "./site-header.css";
import { currentLanguage, setLanguage, supportedLanguages, t } from "./i18next.js";

const LANG_LABELS = { en: "EN", es: "ES" };
const AUTH_TOKEN_KEY = "futurePilotAuthToken";

// href -> clave de traduccion. El Pasaporte solo aparece con sesion: no es
// parte de la experiencia de un visitante anonimo.
const LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/careers", key: "nav.careers" },
  { href: "/globe", key: "nav.globe" },
  { href: "/passport", key: "nav.passport", requiresSession: true },
];

function isSignedIn() {
  return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
}

/** Marca el enlace de la pagina actual. `/` solo coincide exacto, o seria
 *  el actual en todas partes. */
function isCurrent(href) {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

function buildLinks() {
  const signedIn = isSignedIn();
  const visible = LINKS.filter((link) => !link.requiresSession || signedIn);

  const items = visible.map((link) => {
    const current = isCurrent(link.href) ? ' aria-current="page"' : "";
    return `<a href="${link.href}"${current}>${t(link.key, { ns: "site" })}</a>`;
  });

  // La accion principal cambia con la sesion. Estando dentro, "Iniciar
  // sesion" no significa nada: lleva a /assessment, que decide solo si
  // enseñar resultados guardados o el test.
  items.push(
    signedIn
      ? `<a class="fp-header__cta" href="/assessment">${t("nav.myAccount", { ns: "site" })}</a>`
      : `<a class="fp-header__cta" href="/login">${t("nav.signin", { ns: "site" })}</a>`
  );

  return items.join("");
}

function buildLanguage() {
  const current = currentLanguage();
  const buttons = supportedLanguages
    .map((language) => {
      const active = language === current ? ' class="is-active"' : "";
      const label = LANG_LABELS[language] || language.toUpperCase();
      return `<button type="button" data-lang="${language}"${active} aria-pressed="${language === current}">${label}</button>`;
    })
    .join("");
  return `<div class="fp-header__lang" aria-label="Language / Idioma">${buttons}</div>`;
}

function render(header) {
  header.innerHTML = `
    <a class="fp-header__brand" href="/">
      <img src="/Frontend/futurepilot-logo-transparent.png" alt="">
      Future<span>Pilot</span>
    </a>
    <nav class="fp-header__links" aria-label="${t("nav.home", { ns: "site" })}">
      ${buildLinks()}
      ${buildLanguage()}
    </nav>
  `;

  header.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
}

function mount() {
  // Las paginas que ya tienen su propia barra (el globo con su TopNav de
  // React, el panel de admin con su topbar y sidebar) la declaran y esta se
  // salta: son shells con navegacion propia, no paginas del sitio.
  if (document.querySelector("[data-fp-own-header]")) return;

  const header = document.createElement("header");
  header.className = "fp-header";
  render(header);
  document.body.prepend(header);

  // Repintar al cambiar el idioma. Se escucha el evento en vez de llamar a
  // render desde setLanguage para no acoplar la cabecera al selector: el
  // idioma tambien puede cambiar desde otra pagina o pestaña.
  document.addEventListener("futurepilot:translations-applied", () => render(header));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
