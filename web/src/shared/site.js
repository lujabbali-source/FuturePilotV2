import { currentLanguage, t } from "./i18next.js";

(() => {
  // Año dinámico en el footer - se actualiza solo cada año, sin tocar el HTML.
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Cifra real de carreras en el hero. Estaba escrita a mano como "100+"
  // mientras el catalogo tenia 10, y volveria a desfasarse cada vez que
  // careers.json crezca. Si la API no responde se queda el valor del HTML,
  // asi que la landing nunca depende de esta llamada para verse bien.
  const careerCountEl = document.getElementById("careerCountStat");
  if (careerCountEl && location.protocol !== "file:") {
    fetch(`/api/v1/careers?lang=${currentLanguage()}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        // Sin el "+": son 73 exactas, y un "73+" insinua que hay mas. Las
        // otras dos cifras del hero son literales, y una sola inflada
        // pone en duda a las tres.
        if (data && data.total) careerCountEl.textContent = String(data.total);
      })
      .catch(() => {});
  }

  // Nav consciente de sesión: si ya hay una cuenta logueada, "Sign In" ya
  // no tiene sentido (era el "loop" reportado) - pasa a ser un acceso
  // directo a la experiencia del usuario, que /assessment resuelve solo
  // (resultados guardados si ya hizo el test, o el test si es su primera
  // vez con esa cuenta). El link "Pasaporte" solo aparece con sesion
  // activa - no es parte de la experiencia de un visitante anonimo.
  const authLink = document.getElementById("navAuthLink");
  const passportLink = document.getElementById("navPassportLink");

  function applyAuthLabel() {
    const isAuthed = !!localStorage.getItem("futurePilotAuthToken");

    if (passportLink) passportLink.hidden = !isAuthed;

    if (!authLink || !isAuthed) return;
    authLink.textContent = t("nav.myAccount", { ns: "site" });
    authLink.href = "/assessment";
  }

  // i18n.js reescribe navAuthLink/navPassportLink en cada pasada de
  // traduccion (carga inicial y cada cambio de idioma) segun data-i18n -
  // hay que reaplicar esto DESPUES de esa pasada, nunca antes.
  document.addEventListener("futurepilot:translations-applied", applyAuthLabel);
  applyAuthLabel();
})();
