// Instancia de i18next para las paginas que NO son React.
//
// El globo tiene la suya en src/i18n.js, con el plugin de react-i18next.
// Importar aquella desde una pagina vanilla arrastraria React entero al
// bundle solo para traducir texto, asi que esta es una instancia aparte
// creada con createInstance().
//
// Comparten lo unico que importa que sea comun: los MISMOS archivos de
// locales y la MISMA clave de localStorage (`futurepilotLanguage`). Elegir
// idioma en cualquier pagina se respeta en todas.
//
// Este modulo sustituyo al motor de traduccion hecho a mano que vivia en
// shared/i18n.js (198 lineas con su propio diccionario, su propio
// almacenamiento y su propio recorrido del DOM). El namespace `site` son
// exactamente aquellas 57 claves.

import i18next from "i18next";

import commonEn from "../locales/en/common.json";
import testEn from "../locales/en/test.json";
import resultsEn from "../locales/en/results.json";
import siteEn from "../locales/en/site.json";
import passportEn from "../locales/en/passport.json";
import loginEn from "../locales/en/login.json";
import commonEs from "../locales/es/common.json";
import testEs from "../locales/es/test.json";
import resultsEs from "../locales/es/results.json";
import siteEs from "../locales/es/site.json";
import passportEs from "../locales/es/passport.json";
import loginEs from "../locales/es/login.json";

export const supportedLanguages = ["en", "es"];
const STORAGE_KEY = "futurepilotLanguage";

const instance = i18next.createInstance();

instance.init({
  resources: {
    en: { common: commonEn, test: testEn, results: resultsEn, site: siteEn,
          passport: passportEn, login: loginEn },
    es: { common: commonEs, test: testEs, results: resultsEs, site: siteEs,
          passport: passportEs, login: loginEs },
  },
  lng: localStorage.getItem(STORAGE_KEY) || undefined,
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  nonExplicitSupportedLngs: true,
  load: "languageOnly",
  ns: ["common", "test", "results", "site", "passport", "login"],
  defaultNS: "test",
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

export const t = instance.t.bind(instance);

/** Idioma activo, normalizado a dos letras ("es-CO" -> "es"). Es lo que
 *  hay que mandarle a la API en ?lang=. */
export function currentLanguage() {
  const language = (instance.language || "en").slice(0, 2);
  return supportedLanguages.includes(language) ? language : "en";
}

/** Traduce el HTML estatico de la pagina.
 *
 *  Las paginas que son sobre todo markup (la landing, los legales) marcan
 *  sus textos con `data-i18n="clave"` en vez de construirse desde
 *  JavaScript. Esto los rellena.
 *
 *  Las claves llevan el namespace `site` por defecto porque son las del
 *  sitio; una clave con `:` dentro (`test:nav.next`) elige otro. */
export function applyTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.getAttribute("data-i18n"), { ns: "site" });
  });
  // Variante para las pocas cadenas que llevan marcado propio, como el
  // <br> del titular del hero.
  root.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.getAttribute("data-i18n-html"), { ns: "site" });
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.getAttribute("data-i18n-placeholder"), { ns: "site" }));
  });
  // aria-label. Un boton cuyo contenido es una flecha ("←") necesita que su
  // nombre accesible tambien cambie de idioma; sin esto un lector de
  // pantalla lo anuncia en castellano con la interfaz en ingles.
  root.querySelectorAll("[data-i18n-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.getAttribute("data-i18n-label"), { ns: "site" }));
  });
  document.documentElement.lang = currentLanguage();

  // Se emite siempre - carga inicial y cada cambio - para que el codigo que
  // reescribe texto segun estado (site.js con el enlace de sesion) pueda
  // reaplicarse DESPUES de esta pasada, sin depender del orden de carga.
  document.dispatchEvent(
    new CustomEvent("futurepilot:translations-applied", { detail: { language: currentLanguage() } })
  );
}

/** Cambia el idioma, lo recuerda y repinta el markup estatico. */
export async function setLanguage(language) {
  if (!supportedLanguages.includes(language)) return;
  localStorage.setItem(STORAGE_KEY, language);
  await instance.changeLanguage(language);
  applyTranslations();
}

/** Registra un callback para cuando cambie el idioma.
 *
 *  Lo usan las paginas que se dibujan desde JavaScript (el test) y que por
 *  tanto no se arreglan solas con applyTranslations: tienen que volver a
 *  renderizar. */
export function onLanguageChange(callback) {
  document.addEventListener("futurepilot:translations-applied", (event) => {
    callback(event.detail?.language || currentLanguage());
  });
}

// Primera pasada sobre el markup estatico, en cuanto haya DOM.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => applyTranslations());
} else {
  applyTranslations();
}

export default instance;
