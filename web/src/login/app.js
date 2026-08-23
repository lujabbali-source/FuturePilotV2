import { t, onLanguageChange } from "../shared/i18next.js";
import { destinoSeguro } from "../shared/sessionGuard.js";

// Todo el texto de estas pantallas vive en el namespace `login`.
const tl = (key, params) => t(key, { ns: "login", ...params });

import { claimPendingAndCelebrate } from "../shared/resultClaim.js";

// El cuerpo va dentro de una funcion con nombre porque necesita cortar
// pronto (`return`) cuando la pagina no tiene nada que montar. Un `return`
// suelto era valido dentro del IIFE que envolvia este archivo, pero en un
// modulo ES es un error de sintaxis.
/**
 * A donde ir despues de entrar.
 *
 * Antes siempre era /assessment. Ahora que el globo, las carreras, la ruta y
 * el plan de vuelo piden cuenta, esa constante partia el recorrido en dos:
 * hacias clic en "explorar el globo", te mandaba a registrarte y aterrizabas
 * en el test, sin ninguna pista de que el globo seguia esperandote.
 *
 * `destinoSeguro` filtra el parametro contra la lista de paginas reales. Sin
 * ese filtro, /login?next=https://sitio-falso.com haria que FuturePilot
 * mandara a sus propios usuarios a otro sitio justo despues de escribir la
 * contraseña, y con nuestro dominio en la barra hasta el ultimo momento.
 */
function destinoTrasEntrar() {
  const pedido = new URLSearchParams(window.location.search).get("next");
  return destinoSeguro(pedido) || "/assessment";
}

function main() {

  // Si ya hay una sesion guardada, mostrar el formulario de login de nuevo
  // es un callejon sin salida para el usuario (el "loop" reportado al
  // hacer clic en "Sign In" estando ya logueado). /assessment decide que
  // mostrar - resultados guardados si ya hizo el test con esta cuenta, o
  // el test si es la primera vez.
  if (localStorage.getItem("futurePilotAuthToken")) {
    window.location.href = destinoTrasEntrar();
    return;
  }

  const form = document.getElementById("loginForm");
  const nameField = document.getElementById("nameField");
  const adminTokenField = document.getElementById("adminTokenField");
  const passwordField = document.getElementById("passwordField");
  const cardTitle = document.getElementById("cardTitle");
  const cardSubtitle = document.getElementById("cardSubtitle");
  const loginOptions = document.getElementById("loginOptions");
  const minorField = document.getElementById("minorField");
  const isMinorCheck = document.getElementById("isMinorCheck");
  const guardianField = document.getElementById("guardianField");
  const guardianHint = document.getElementById("guardianHint");
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

  // Se lee en cada uso y no una sola vez al cargar: si fuera una constante,
  // cambiar de idioma con el formulario delante no cambiaria nada.
  function copyFor(which) {
    const M = {
      login: {
        title: [tl("mode.loginTitle"), tl("mode.loginTitleAccent")],
        subtitle: tl("mode.loginSubtitle"),
        submit: tl("signIn"),
        prompt: tl("mode.loginSwitchPrompt"),
        switchLabel: tl("mode.loginSwitchAction"),
      },
      register: {
        title: [tl("mode.registerTitle"), tl("mode.registerTitleAccent")],
        subtitle: tl("mode.registerSubtitle"),
        submit: tl("createAccount"),
        prompt: tl("mode.registerSwitchPrompt"),
        switchLabel: tl("mode.registerSwitchAction"),
      },
      forgot: {
        title: [tl("mode.recoverTitle"), tl("mode.recoverTitleAccent")],
        subtitle: tl("mode.recoverSubtitle"),
        submit: tl("mode.recoverSubmit"),
      },
    };
    return M[which];
  }

  /**
   * El correo del acudiente aparece solo si la casilla esta marcada.
   *
   * Al ocultarlo se BORRA su contenido. Si no, alguien que marca la casilla,
   * escribe un correo y se desmarca al darse cuenta de que ya cumplio 18
   * dejaria enviado el correo de su padre en un campo que ya no ve - y el
   * servidor lo ignoraria, pero habria viajado igual.
   */
  function aplicarAcudiente() {
    const visible = mode === "register" && isMinorCheck.checked;
    guardianField.hidden = !visible;
    guardianHint.hidden = !visible;
    if (!visible) form.guardianEmail.value = "";
    form.guardianEmail.required = visible;
  }

  function applyMode() {
    const copy = copyFor(mode);
    cardTitle.innerHTML = `${copy.title[0]}<span>${copy.title[1]}</span>`;
    cardSubtitle.textContent = copy.subtitle;
    submitLabel.textContent = copy.submit;

    const isForgot = mode === "forgot";
    const esRegistro = mode === "register";
    nameField.hidden = !esRegistro;

    // La edad solo se pregunta al crear la cuenta. En login no hace falta:
    // ya se guardo, y volver a preguntarla invitaria a cambiarla.
    minorField.hidden = !esRegistro;
    if (!esRegistro) isMinorCheck.checked = false;
    aplicarAcudiente();
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
    const entrada = mode === "register"
      ? tl("status.accountCreated")
      : tl("status.alreadySignedIn");
    infoBox.hidden = true;
    errorBox.hidden = false;
    errorBox.innerHTML = `
      <span>${tl("claim.notLinked", { entrada })}</span>
      <button type="button" class="text-action" data-action="retry-claim">${tl("claim.retry")}</button>
      <button type="button" class="text-action" data-action="skip-claim">${tl("claim.skip")}</button>
    `;
  }

  function setSubmitting(isSubmitting) {
    submitButton.disabled = isSubmitting;
    submitLabel.textContent = isSubmitting ? tl("status.working") : copyFor(mode).submit;
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
        input.type === "password" ? tl("fields.showPassword") : tl("fields.hidePassword")
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
          actionButton.textContent = tl("status.retry");
          return;
        }
        window.location.href = destinoTrasEntrar();
      });
    }

    if (action === "skip-claim") {
      // Salida voluntaria. El result_id se conserva: /assessment vuelve a
      // intentar la vinculacion al cargar, asi que sigue siendo
      // recuperable sin que el usuario tenga que hacer nada.
      window.location.href = destinoTrasEntrar();
    }
  });

  isMinorCheck.addEventListener("change", aplicarAcudiente);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessages();

    const email = form.email.value.trim();
    const password = form.password.value;
    const name = form.name ? form.name.value.trim() : "";

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showError(tl("errors.email"));
      return;
    }
    if (mode !== "forgot" && password.length < 8) {
      showError(tl("errors.password"));
      return;
    }

    // El correo del acudiente, si la casilla esta marcada. Se valida aqui y
    // no solo en el servidor porque el formulario lleva `novalidate`: sin
    // esto el unico aviso seria un 422, que no dice nada util a un chico.
    if (mode === "register" && isMinorCheck.checked) {
      const acudiente = form.guardianEmail.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(acudiente)) {
        showError(tl("errors.guardianEmail"));
        return;
      }
      if (acudiente.toLowerCase() === email.toLowerCase()) {
        showError(tl("errors.guardianSame"));
        return;
      }
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
          showError(data.detail || tl("errors.generic"));
          return;
        }
        showInfo(data.detail || tl("recover.sent"));
      } catch (error) {
        setSubmitting(false);
        showError(tl("errors.network"));
      }
      return;
    }

    const endpoint = mode === "register" ? "/api/v1/auth/register" : "/api/v1/auth/login";
    const adminSetupToken = form.adminSetupToken?.value.trim();
    const esMenor = mode === "register" && isMinorCheck.checked;
    const body = mode === "register"
      ? {
          email, password,
          name: name || undefined,
          admin_setup_token: adminSetupToken || undefined,
          is_minor: esMenor,
          // Solo si lo es. El servidor lo descarta igualmente cuando
          // is_minor es falso, pero no tiene por que llegar hasta alli.
          guardian_email: esMenor ? form.guardianEmail.value.trim() : undefined,
        }
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
        showError(data.detail || tl("errors.generic"));
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
      window.location.href = destinoTrasEntrar();
    } catch (error) {
      setSubmitting(false);
      showError(tl("errors.network"));
    }
  });

  applyMode();

  // El titulo, el subtitulo y el boton los escribe JavaScript segun el modo
  // (login / registro / recuperar), asi que traducir el markup estatico no
  // los alcanza: hay que volver a aplicarlos.
  //
  // applyMode() llama a hideMessages(), asi que un error visible se borraria
  // al cambiar de idioma. Se conserva y se vuelve a mostrar.
  onLanguageChange(() => {
    const errorVisible = errorBox.hidden ? null : errorBox.textContent;
    applyMode();
    if (errorVisible) showError(errorVisible);
  });
}

main();
