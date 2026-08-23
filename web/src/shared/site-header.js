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

// Si la sesion actual es la del administrador. Se pregunta al servidor en vez
// de guardarse una bandera al entrar, por dos razones. Una: la bandera se
// quedaria desfasada, y quien manda sobre quien es admin es ADMIN_EMAIL, que
// se re-sincroniza en cada login. Otra, mas practica: en un despliegue sin
// disco la cuenta desaparece en cada reinicio, y una bandera guardada seguiria
// enseñando un enlace que ya no lleva a ninguna parte.
//
// Que alguien se invente el valor en su navegador no da acceso a nada: esto
// solo decide si se pinta un enlace, y /admin comprueba la sesion en el
// servidor.
let esAdmin = false;

async function comprobarAdmin() {
  if (!isSignedIn()) return false;
  try {
    const respuesta = await fetch("/api/v1/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}` },
    });
    if (!respuesta.ok) return false;
    const datos = await respuesta.json();
    return Boolean(datos.user?.is_admin);
  } catch {
    // Sin red la cabecera se pinta igual, solo que sin el enlace: es una
    // comodidad, no algo sin lo que la pagina no funcione.
    return false;
  }
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

  // El panel solo para quien lo administra. Va como un enlace mas y no como
  // una pantalla aparte a proposito: quien administra FuturePilot tambien
  // tiene que poder usarlo como lo usa un estudiante, y obligarle a elegir
  // entre las dos cosas al entrar seria pedirle que administre a ciegas.
  if (esAdmin) {
    const current = isCurrent("/admin") ? ' aria-current="page"' : "";
    items.push(`<a href="/admin"${current}>${t("nav.admin", { ns: "site" })}</a>`);
  }

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

  // La cabecera se pinta ya, sin esperar a la red, y el enlace del panel
  // aparece despues si procede. Al reves - esperar la respuesta para pintar -
  // dejaria el sitio sin navegacion durante lo que tarde la peticion.
  comprobarAdmin().then((resultado) => {
    if (!resultado) return;
    esAdmin = true;
    render(header);
  });

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
