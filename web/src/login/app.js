import { claimPendingAndCelebrate } from "../shared/resultClaim.js";

// El cuerpo va dentro de una funcion con nombre porque necesita cortar
// pronto (`return`) cuando la pagina no tiene nada que montar. Un `return`
// suelto era valido dentro del IIFE que envolvia este archivo, pero en un
// modulo ES es un error de sintaxis.
function main() {

  // Si ya hay una sesion guardada, mostrar el formulario de login de nuevo
  // es un callejon sin salida para el usuario (el "loop" reportado al
  // hacer clic en "Sign In" estando ya logueado). /assessment decide que
  // mostrar - resultados guardados si ya hizo el test con esta cuenta, o
  // el test si es la primera vez.
  if (localStorage.getItem("futurePilotAuthToken")) {
    window.location.href = "/assessment";
    return;
  }

  const form = document.getElementById("loginForm");
  const nameField = document.getElementById("nameField");
  const adminTokenField = document.getElementById("adminTokenField");
  const passwordField = document.getElementById("passwordField");
  const cardTitle = document.getElementById("cardTitle");
  const cardSubtitle = document.getElementById("cardSubtitle");
  const loginOptions = document.getElementById("loginOptions");
  const backToLoginLink = document.getElementById("backToLoginLink");
  const submitLabel = document.getElementById("submitLabel");
  const submitButton = document.getElementById("loginSubmit");
  const errorBox = document.getElementById("loginError");
  const infoBox = document.getElementById("loginInfo");
  const switchPrompt = document.getElementById("switchPrompt");
  const switchAction = document.getElementById("switchAction");
  const loginSwitchRow = switchAction.closest(".login-switch");

  // /assessment redirige aca (con ?mode=register o ?mode=login) cuando el
  // usuario viene de "desbloquear" sus resultados tras el test - este es
  // ahora el UNICO formulario de login/registro de toda la app (antes
  // assessment.js tenia su propia copia con otro diseño).
  const requestedMode = new URLSearchParams(window.location.search).get("mode");
  let mode = requestedMode === "register" ? "register" : "login";

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
    forgot: {
      title: ["Recupera", " tu acceso"],
      subtitle: "Ingresa tu email y te enviamos instrucciones para elegir una nueva contraseña.",
      submit: "Enviar instrucciones",
    },
  };

  function applyMode() {
    const copy = COPY[mode];
    cardTitle.innerHTML = `${copy.title[0]}<span>${copy.title[1]}</span>`;
    cardSubtitle.textContent = copy.subtitle;
    submitLabel.textContent = copy.submit;

    const isForgot = mode === "forgot";
    nameField.hidden = mode !== "register";
    adminTokenField.hidden = true;
    passwordField.hidden = isForgot;
    form.password.required = !isForgot;
    loginOptions.style.display = isForgot || mode === "register" ? "none" : "flex";
    backToLoginLink.hidden = !isForgot;
    loginSwitchRow.hidden = isForgot;

    if (!isForgot) {
      switchPrompt.textContent = copy.prompt;
      switchAction.textContent = copy.switchLabel;
    }

    form.password.autocomplete = mode === "register" ? "new-password" : "current-password";
    hideMessages();
  }

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

  function hideMessages() {
    errorBox.hidden = true;
    errorBox.textContent = "";
    infoBox.hidden = true;
    infoBox.textContent = "";
  }

  /** El registro/login funciono, pero no pudimos confirmar la vinculacion
   *  del resultado del test. Las respuestas NO se han perdido (el
   *  result_id sigue en localStorage, ver result-claim.js), asi que se le
   *  dice eso y se le ofrece reintentar en el sitio - mandarlo a
   *  /assessment aqui le mostraria la pantalla de bienvenida del test que
   *  acaba de terminar, que es exactamente la impresion contraria. */
  function showRetryClaim() {
    // El mensaje depende de por donde entro: decirle "tu cuenta quedó
    // creada" a quien acaba de INICIAR SESION en una cuenta que ya tenia
    // es sencillamente falso.
    const entrada = mode === "register" ? "Tu cuenta quedó creada" : "Ya iniciaste sesión";
    infoBox.hidden = true;
    errorBox.hidden = false;
    errorBox.innerHTML = `
      <span>${entrada}, pero no pudimos vincular tu resultado todavía.
      No te preocupes: tus respuestas siguen guardadas.</span>
      <button type="button" class="text-action" data-action="retry-claim">Intentar de nuevo</button>
      <button type="button" class="text-action" data-action="skip-claim">Continuar sin vincular</button>
    `;
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
      mode = "forgot";
      applyMode();
    }

    if (action === "back-to-login") {
      mode = "login";
      applyMode();
    }

    if (action === "retry-claim") {
      actionButton.disabled = true;
      actionButton.textContent = "Vinculando...";
      claimPendingAndCelebrate().then((claim) => {
        // Reintentar es seguro incluso si el claim original si funciono:
        // el endpoint es idempotente y devuelve exito, no 404 (ver
        // claim_test_result en users_store.py).
        if (claim.status === "failed") {
          actionButton.disabled = false;
          actionButton.textContent = "Intentar de nuevo";
          return;
        }
        window.location.href = "/assessment";
      });
    }

    if (action === "skip-claim") {
      // Salida voluntaria. El result_id se conserva: /assessment vuelve a
      // intentar la vinculacion al cargar, asi que sigue siendo
      // recuperable sin que el usuario tenga que hacer nada.
      window.location.href = "/assessment";
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessages();

    const email = form.email.value.trim();
    const password = form.password.value;
    const name = form.name ? form.name.value.trim() : "";

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showError("Ingresa un email válido.");
      return;
    }
    if (mode !== "forgot" && password.length < 8) {
      showError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setSubmitting(true);

    if (mode === "forgot") {
      try {
        const response = await fetch("/api/v1/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json().catch(() => ({}));
        setSubmitting(false);
        if (!response.ok) {
          showError(data.detail || "No pudimos procesar tu solicitud. Intenta de nuevo.");
          return;
        }
        showInfo(data.detail || "Si existe una cuenta con ese email, enviamos instrucciones para recuperar el acceso.");
      } catch (error) {
        setSubmitting(false);
        showError("No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.");
      }
      return;
    }

    const endpoint = mode === "register" ? "/api/v1/auth/register" : "/api/v1/auth/login";
    const adminSetupToken = form.adminSetupToken?.value.trim();
    const body = mode === "register"
      ? { email, password, name: name || undefined, admin_setup_token: adminSetupToken || undefined }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitting(false);
        // El unico 403 que puede dar el registro es el del email reservado
        // para la cuenta de administrador. Se revela el campo del token en
        // ese momento, en vez de enseñarselo a cada estudiante que se
        // registra: quien despliega ya tiene el token delante, en la consola
        // del servidor.
        if (mode === "register" && response.status === 403) {
          adminTokenField.hidden = false;
          form.adminSetupToken?.focus();
        }
        showError(data.detail || "No pudimos procesar tu solicitud. Intenta de nuevo.");
        return;
      }

      localStorage.setItem("futurePilotAuthToken", data.token);
      localStorage.setItem("futurePilotUser", JSON.stringify(data.user));

      // Si venimos de "desbloquear resultados" tras el test, hay un
      // resultado esperando a asociarse a esta cuenta - se reclama aca,
      // antes de ir a /assessment, para que la pantalla de resultados
      // completos ya lo tenga listo (ver assessment.js init(), que hace
      // fetch a /api/v1/me/results apenas carga).
      //
      // Se pasa data.token explicito: acaba de llegar en esta respuesta y
      // localStorage podria no haberlo propagado todavia.
      const claim = await claimPendingAndCelebrate(data.token);

      if (claim.status === "failed") {
        // El resultado NO se perdio: result-claim.js conserva el
        // result_id. Pero mandarlo a /assessment ahora significaria
        // enseñarle la pantalla de bienvenida del test que acaba de
        // hacer, asi que se le dice la verdad y se le deja reintentar
        // sin salir de aqui.
        setSubmitting(false);
        showRetryClaim();
        return;
      }

      // /assessment decide que mostrar: resultados recien reclamados (o ya
      // guardados de antes) si existen, o el test si es la primera vez.
      window.location.href = "/assessment";
    } catch (error) {
      setSubmitting(false);
      showError("No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.");
    }
  });

  applyMode();
}

main();
