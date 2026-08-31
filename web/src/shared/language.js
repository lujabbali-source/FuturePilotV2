// De que idiomas habla el sitio, cual usa por defecto y donde recuerda la
// eleccion. UN SOLO SITIO, a proposito.
//
// Habia dos motores de i18next - el del globo (src/i18n.js, con React) y el
// de las paginas vanilla (shared/i18next.js) - y cada uno declaraba su
// propia lista de idiomas, su propio idioma por defecto y su propia clave de
// localStorage. Ya habian divergido: el globo miraba el idioma del
// navegador y el sitio no, asi que con un Chrome en ingles la portada salia
// en ingles y el globo en castellano, o al reves. Dos copias de la misma
// decision siempre acaban diciendo cosas distintas; la unica forma de que no
// vuelva a pasar es que solo haya una.

export const supportedLanguages = ["en", "es"];

// Castellano por defecto, y NO se mira el idioma del navegador.
//
// Parece que mirarlo seria mas listo, pero para este publico es una mala
// señal: en Colombia es muy comun tener Windows y Chrome instalados en
// ingles y hablar castellano. Un estudiante de bachillerato de Bogota
// aterrizaba en una pagina en ingles para preguntarle que quiere estudiar,
// y la landing le habla de universidades de Colombia.
//
// Lo que SI se respeta siempre es una eleccion explicita: si toca EN en el
// selector, se guarda y gana en todas las paginas. La suposicion cede ante
// la decision de la persona, que es el orden correcto.
export const defaultLanguage = "es";

// La misma clave en los dos motores: elegir idioma en cualquier pagina se
// respeta en todas.
export const LANGUAGE_STORAGE_KEY = "futurepilotLanguage";

/** El idioma guardado, o null si no hay ninguno o no se puede leer.
 *
 *  Va en try/catch porque en un navegador con el almacenamiento bloqueado
 *  (modo privado estricto, cookies de terceros desactivadas) `localStorage`
 *  no devuelve vacio: LANZA. Sin esto, ese acceso ocurre al evaluar el
 *  modulo de i18n y se lleva por delante la pagina entera antes de pintar
 *  nada. */
export function storedLanguage() {
  try {
    const guardado = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguages.includes(guardado) ? guardado : null;
  } catch {
    return null;
  }
}
