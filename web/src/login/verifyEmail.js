// Confirmacion del correo, la pantalla que abre el enlace del registro.
//
// La pagina no decide nada: pregunta a /api/v1/auth/verify-email y pinta la
// respuesta. Toda la validacion del token vive en el servidor, que es el
// unico que puede compararlo contra la base.
//
// El caso de "ya estaba confirmado" se pinta como EXITO, no como error.
// Volver a pulsar el enlace es lo normal - el correo se queda en la bandeja
// y se abre otra vez desde el movil - y decirle "enlace invalido" a alguien
// que si esta confirmado seria mentirle sobre el estado de su cuenta.
import { t } from "../shared/i18next.js";

const tl = (key, params) => t(key, { ns: "login", ...params });

function main() {
  const subtitulo = document.getElementById("verifySubtitle");
  const errorBox = document.getElementById("verifyError");
  const infoBox = document.getElementById("verifyInfo");
  const nota = document.getElementById("verifyNote");
  const acciones = document.getElementById("verifyActions");
  const botonReenvio = document.getElementById("verifyResend");

  function mostrarError(mensaje) {
    errorBox.textContent = mensaje;
    errorBox.hidden = false;
    infoBox.hidden = true;
  }

  function mostrarInfo(mensaje) {
    infoBox.textContent = mensaje;
    infoBox.hidden = false;
    errorBox.hidden = true;
  }

  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    subtitulo.textContent = tl("verify.noToken");
    mostrarError(tl("verify.invalid"));
    acciones.hidden = false;
    return;
  }

  // El boton de reenvio solo aparece cuando hay algo que reenviar, y exige
  // sesion: el endpoint manda siempre al correo del usuario autenticado, no
  // a una direccion que venga del cliente. Sin sesion se manda a /login, que
  // es donde puede conseguirla.
  async function reenviar() {
    botonReenvio.disabled = true;
    let sesion;
    try {
      sesion = localStorage.getItem("futurePilotAuthToken");
    } catch {
      // Navegador con el almacenamiento bloqueado: se trata como sin sesion.
      sesion = null;
    }
    if (!sesion) {
      window.location.href = "/login";
      return;
    }
    try {
      const respuesta = await fetch("/api/v1/auth/resend-verification", {
        method: "POST",
        headers: { Authorization: `Bearer ${sesion}` },
      });
      const datos = await respuesta.json().catch(() => ({}));
      if (!respuesta.ok) {
        botonReenvio.disabled = false;
        mostrarError(datos.detail || tl("verify.resendFailed"));
        return;
      }
      mostrarInfo(datos.enviado ? tl("verify.resendSent") : datos.detail || tl("verify.already"));
    } catch {
      botonReenvio.disabled = false;
      mostrarError(tl("verify.network"));
    }
  }

  botonReenvio.addEventListener("click", reenviar);

  (async () => {
    subtitulo.textContent = tl("verify.checking");
    try {
      const respuesta = await fetch("/api/v1/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const datos = await respuesta.json().catch(() => ({}));

      if (respuesta.ok) {
        subtitulo.textContent = "";
        mostrarInfo(datos.estado === "ya_estaba" ? tl("verify.already") : tl("verify.done"));
        nota.hidden = false;
        acciones.hidden = false;
        botonReenvio.hidden = true;
        return;
      }

      subtitulo.textContent = "";
      // 410 = el enlace existio y se le paso el plazo. Es el unico caso en
      // que reenviar sirve de algo, asi que es el unico que ofrece el boton.
      if (respuesta.status === 410) {
        mostrarError(datos.detail || tl("verify.expired"));
        botonReenvio.hidden = false;
      } else {
        mostrarError(datos.detail || tl("verify.invalid"));
        botonReenvio.hidden = true;
      }
      acciones.hidden = false;
    } catch {
      subtitulo.textContent = "";
      mostrarError(tl("verify.network"));
      acciones.hidden = false;
    }
  })();
}

main();
