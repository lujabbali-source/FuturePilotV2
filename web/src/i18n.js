import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import {
  LANGUAGE_STORAGE_KEY,
  defaultLanguage,
  supportedLanguages,
} from "./shared/language.js";
import commonEn from "./locales/en/common.json";
import testEn from "./locales/en/test.json";
import globeEn from "./locales/en/globe.json";
import roadmapEn from "./locales/en/roadmap.json";
import citiesEn from "./locales/en/cities.json";
import loginEn from "./locales/en/login.json";
import resultsEn from "./locales/en/results.json";
// El globo reutiliza las etiquetas de navegacion del sitio en vez de
// copiarlas: dos listas de enlaces acaban diciendo cosas distintas.
import siteEn from "./locales/en/site.json";
import commonEs from "./locales/es/common.json";
import testEs from "./locales/es/test.json";
import globeEs from "./locales/es/globe.json";
import roadmapEs from "./locales/es/roadmap.json";
import citiesEs from "./locales/es/cities.json";
import loginEs from "./locales/es/login.json";
import resultsEs from "./locales/es/results.json";
import siteEs from "./locales/es/site.json";

// Declarados en shared/language.js, no aqui: este modulo y el de las
// paginas vanilla tenian cada uno su copia y ya habian divergido.
export { supportedLanguages, defaultLanguage };

const resources = {
  en: { common: commonEn, test: testEn, globe: globeEn, roadmap: roadmapEn, cities: citiesEn, login: loginEn, results: resultsEn, site: siteEn },
  es: { common: commonEs, test: testEs, globe: globeEs, roadmap: roadmapEs, cities: citiesEs, login: loginEs, results: resultsEs, site: siteEs },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    ns: ["common", "test", "globe", "roadmap", "cities", "login", "results", "site"],
    defaultNS: "common",
    // Solo la eleccion guardada. `navigator` se quito a proposito: era lo
    // unico que diferenciaba a este motor del de las paginas vanilla, que
    // nunca lo miro, asi que con un Chrome en castellano el globo salia en
    // castellano y la portada en ingles. Y para este publico el idioma del
    // navegador es mala señal: en Colombia es muy comun tener el sistema en
    // ingles y hablar castellano. Sin nada guardado manda defaultLanguage.
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  });

// El `lang` del documento. Las páginas vanilla lo ponen (ver
// shared/i18next.js) y esta no lo hacía: el globo se quedaba con el idioma
// escrito en el HTML mientras el texto salía en otro. No se ve, pero un lector
// de pantalla lee el español con pronunciación inglesa, y el navegador ofrece
// traducir una página que ya está en el idioma del lector.
function marcarIdioma(lng) {
  if (lng) document.documentElement.lang = lng;
}
marcarIdioma(i18n.resolvedLanguage || i18n.language);
i18n.on("languageChanged", marcarIdioma);

export default i18n;
