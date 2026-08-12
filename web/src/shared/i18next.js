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
// Convive con el i18n hecho a mano de shared/i18n.js, que sigue traduciendo
// por atributos `data-i18n` en las paginas que aun no se han pasado a
// namespaces. Unificar las dos es lo ultimo que queda de la consolidacion.

import i18next from "i18next";

import commonEn from "../locales/en/common.json";
import testEn from "../locales/en/test.json";
import resultsEn from "../locales/en/results.json";
import commonEs from "../locales/es/common.json";
import testEs from "../locales/es/test.json";
import resultsEs from "../locales/es/results.json";

export const supportedLanguages = ["en", "es"];

const instance = i18next.createInstance();

instance.init({
  resources: {
    en: { common: commonEn, test: testEn, results: resultsEn },
    es: { common: commonEs, test: testEs, results: resultsEs },
  },
  lng: localStorage.getItem("futurepilotLanguage") || undefined,
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  nonExplicitSupportedLngs: true,
  load: "languageOnly",
  ns: ["common", "test", "results"],
  defaultNS: "test",
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

/** Idioma activo, normalizado a dos letras ("es-CO" -> "es"). Es lo que
 *  hay que mandarle a la API en ?lang=. */
export function currentLanguage() {
  const language = (instance.language || "en").slice(0, 2);
  return supportedLanguages.includes(language) ? language : "en";
}

/** Registra un callback para cuando cambie el idioma.
 *
 *  El selector de idioma vive en el i18n heredado (shared/i18n.js), que
 *  avisa con el evento `futurepilot:translations-applied`. Aqui se
 *  reacciona a ese evento y se pone i18next al dia antes de llamar al
 *  callback, para que las dos mitades de la pagina no queden en idiomas
 *  distintos durante un instante. */
export function onLanguageChange(callback) {
  document.addEventListener("futurepilot:translations-applied", async (event) => {
    const language = event.detail?.language;
    if (language && language !== instance.language) {
      await instance.changeLanguage(language);
    }
    callback(currentLanguage());
  });
}

export const t = instance.t.bind(instance);
export default instance;
