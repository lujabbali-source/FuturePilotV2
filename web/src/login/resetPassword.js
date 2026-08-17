// El cuerpo va dentro de una funcion con nombre porque necesita cortar
// pronto (`return`) cuando la pagina no tiene nada que montar. Un `return`
// suelto era valido dentro del IIFE que envolvia este archivo, pero en un
// modulo ES es un error de sintaxis.
import { t, onLanguageChange } from "../shared/i18next.js";

// Todo el texto de estas pantallas vive en el namespace `login`.
const tl = (key, params) => t(key, { ns: "login", ...params });

function main() {
  const form = document.getElementById("resetForm");
  const errorBox = document.getElementById("resetError");
  const infoBox = document.getElementById("resetInfo");
  const submitButton = document.getElementById("resetSubmit");
  const submitLabel = document.getElementById("resetSubmitLabel");
  const subtitle = document.getElementById("resetSubtitle");

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
    infoBox.hidden = true;
  }

  function showInfo(message) {
    infoBox.textContent = message;
    infoBox.hidden = false;
    errorBox.hidden = true;
  }

  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    subtitle.textContent = tl("reset.noToken");
    form.hidden = true;
    showError(tl("reset.requestNew"));
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password.length < 8) {
      showError(tl("errors.password"));
      return;
    }
    if (password !== confirmPassword) {
      showError(tl("reset.mismatch"));
      return;
    }

    submitButton.disabled = true;
    submitLabel.textContent = "Guardando...";

    try {
      const response = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        submitButton.disabled = false;
        submitLabel.textContent = tl("reset.submit");
        showError(data.detail || tl("reset.failed"));
        return;
      }

      form.hidden = true;
      showInfo(tl("reset.done"));
      setTimeout(() => {
        window.location.href = "/login";
      }, 2200);
    } catch (error) {
      submitButton.disabled = false;
      submitLabel.textContent = tl("reset.submit");
      showError(tl("errors.network"));
    }
  });
}

main();
