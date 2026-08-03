(() => {
  const form = document.getElementById("loginForm");
  const nameField = document.getElementById("nameField");
  const cardTitle = document.getElementById("cardTitle");
  const cardSubtitle = document.getElementById("cardSubtitle");
  const loginOptions = document.getElementById("loginOptions");
  const submitLabel = document.getElementById("submitLabel");
  const submitButton = document.getElementById("loginSubmit");
  const errorBox = document.getElementById("loginError");
  const switchPrompt = document.getElementById("switchPrompt");
  const switchAction = document.getElementById("switchAction");
  const socialNote = document.getElementById("socialNote");

  let mode = "login";

  const COPY = {
    login: {
      title: ["Bienvenido", " de nuevo"],
      subtitle: "Tu camino hacia la carrera de tus sueños empieza aquí.",
      submit: "Iniciar sesión",
      prompt: "¿No tienes una cuenta?",
      switchLabel: "Crear una",
    },
    register: {
      title: ["Crea tu", " cuenta"],
      subtitle: "Guarda tu perfil y desbloquea tu plan completo con FuturePilot.",
      submit: "Crear cuenta",
      prompt: "¿Ya tienes una cuenta?",
      switchLabel: "Iniciar sesión",
    },
  };

  function applyMode() {
    const copy = COPY[mode];
    cardTitle.innerHTML = `${copy.title[0]}<span>${copy.title[1]}</span>`;
    cardSubtitle.textContent = copy.subtitle;
    submitLabel.textContent = copy.submit;
    switchPrompt.textContent = copy.prompt;
    switchAction.textContent = copy.switchLabel;
    nameField.hidden = mode !== "register";
    loginOptions.style.display = mode === "register" ? "none" : "flex";
    form.password.autocomplete = mode === "register" ? "new-password" : "current-password";
    hideError();
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function hideError() {
    errorBox.hidden = true;
    errorBox.textContent = "";
  }

  function setSubmitting(isSubmitting) {
    submitButton.disabled = isSubmitting;
    submitLabel.textContent = isSubmitting ? "Un momento..." : COPY[mode].submit;
  }

  document.body.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    const action = actionButton?.dataset.action;

    if (action === "switch-mode") {
      mode = mode === "login" ? "register" : "login";
      applyMode();
    }

    if (action === "toggle-password") {
      const input = form.password;
      input.type = input.type === "password" ? "text" : "password";
      actionButton.setAttribute(
        "aria-label",
        input.type === "password" ? "Mostrar contraseña" : "Ocultar contraseña"
      );
    }

    if (action === "forgot") {
      showError("La recuperación de contraseña todavía no está disponible. Escríbenos si necesitas ayuda con tu cuenta.");
    }

  });

  document.querySelectorAll("[data-provider]").forEach((button) => {
    button.addEventListener("click", () => {
      socialNote.hidden = false;
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideError();
    socialNote.hidden = true;

    const email = form.email.value.trim();
    const password = form.password.value;
    const name = form.name ? form.name.value.trim() : "";

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showError("Ingresa un email válido.");
      return;
    }
    if (password.length < 8) {
      showError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setSubmitting(true);

    const endpoint = mode === "register" ? "/api/v1/auth/register" : "/api/v1/auth/login";
    const body = mode === "register" ? { email, password, name: name || undefined } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitting(false);
        showError(data.detail || "No pudimos procesar tu solicitud. Intenta de nuevo.");
        return;
      }

      localStorage.setItem("futurePilotAuthToken", data.token);
      localStorage.setItem("futurePilotUser", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (error) {
      setSubmitting(false);
      showError("No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.");
    }
  });

  applyMode();
})();
