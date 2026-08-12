// El cuerpo va dentro de una funcion con nombre porque necesita cortar
// pronto (`return`) cuando la pagina no tiene nada que montar. Un `return`
// suelto era valido dentro del IIFE que envolvia este archivo, pero en un
// modulo ES es un error de sintaxis.
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
    subtitle.textContent = "Este link no incluye un token válido.";
    form.hidden = true;
    showError("Solicita un nuevo link de recuperación desde la página de inicio de sesión.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password.length < 8) {
      showError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      showError("Las contraseñas no coinciden.");
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
        submitLabel.textContent = "Guardar nueva contraseña";
        showError(data.detail || "No pudimos actualizar tu contraseña. Solicita un nuevo link.");
        return;
      }

      form.hidden = true;
      showInfo("¡Listo! Tu contraseña se actualizó. Te llevamos a iniciar sesión...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2200);
    } catch (error) {
      submitButton.disabled = false;
      submitLabel.textContent = "Guardar nueva contraseña";
      showError("No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.");
    }
  });
}

main();
