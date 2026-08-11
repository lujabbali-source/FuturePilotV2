(() => {
  const form = document.getElementById("adminLoginForm");
  const errorBox = document.getElementById("adminLoginError");
  const submitButton = document.getElementById("adminLoginSubmit");
  const submitLabel = document.getElementById("adminSubmitLabel");

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
    submitLabel.textContent = isSubmitting ? "Verificando..." : "Entrar al panel";
  }

  // Si ya hay una sesion de admin guardada, no tiene sentido mostrar el
  // formulario de nuevo - directo al panel.
  if (localStorage.getItem("futurePilotAdminToken")) {
    window.location.href = "/admin";
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideError();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      showError("Ingresa tu email y contraseña.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitting(false);
        showError(data.detail || "Email o contraseña inválidos.");
        return;
      }

      // El login es valido, pero solo la cuenta marcada is_admin (ver
      // ADMIN_EMAIL en el backend) puede entrar al panel - cualquier otra
      // cuenta registrada normal se rechaza aqui, sin guardar nada bajo las
      // claves de sesion del admin.
      if (!data.user || !data.user.is_admin) {
        setSubmitting(false);
        showError("Esta cuenta no tiene permisos de administrador.");
        return;
      }

      localStorage.setItem("futurePilotAdminToken", data.token);
      localStorage.setItem("futurePilotAdminUser", JSON.stringify(data.user));
      window.location.href = "/admin";
    } catch (error) {
      setSubmitting(false);
      showError("No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.");
    }
  });
})();
