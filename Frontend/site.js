(() => {
  // Año dinámico en el footer - se actualiza solo cada año, sin tocar el HTML.
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
    authLink.textContent = window.FuturePilotI18n ? window.FuturePilotI18n.t("nav.myAccount") : "My Account";
    authLink.href = "/assessment";
  }

  // i18n.js reescribe navAuthLink/navPassportLink en cada pasada de
  // traduccion (carga inicial y cada cambio de idioma) segun data-i18n -
  // hay que reaplicar esto DESPUES de esa pasada, nunca antes.
  document.addEventListener("futurepilot:translations-applied", applyAuthLabel);
  applyAuthLabel();
})();
