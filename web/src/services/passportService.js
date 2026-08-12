import { show as showStamps } from "../shared/passport-stamp-toast.js";
// Reporta exploracion del globo al Pasaporte FuturePilot. localStorage se
// comparte con el sitio vanilla (mismo origen), asi que si el usuario
// inicio sesion en /login, ese token ya esta disponible aca sin ningun
// puente de autenticacion adicional. Si no hay sesion, no hace nada -
// explorar el globo sin cuenta sigue funcionando exactamente igual que
// siempre, sin pedir login.
// Ruta relativa, nunca un host absoluto: en produccion este build se sirve
// bajo /globe desde el mismo backend que expone la API, y en desarrollo el
// proxy de vite.config.js redirige /api al backend en el puerto 8000. Un
// "http://127.0.0.1:8000" hardcodeado hacia que el globo desplegado le
// hablara a la maquina del propio visitante, y la CSP (connect-src 'self')
// bloqueaba la peticion igualmente.
const AUTH_TOKEN_KEY = "futurePilotAuthToken";

// Evita reportar el mismo pais/ciudad/universidad mil veces en la misma
// sesion de pestaña (por ejemplo, si el usuario hace clic repetido) - el
// backend ya deduplica el sello, pero esto evita trafico de red innecesario.
const reportedThisSession = new Set();

export function recordPassportEvent(eventType, subjectId, subjectLabel) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return;

  const dedupeKey = `${eventType}:${subjectId || ""}`;
  if (reportedThisSession.has(dedupeKey)) return;
  reportedThisSession.add(dedupeKey);

  fetch("/api/v1/passport/events", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ event_type: eventType, subject_id: subjectId, subject_label: subjectLabel }),
  })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (data?.new_stamps?.length) {
        showStamps(data.new_stamps);
      }
    })
    .catch(() => {
      // Sin conexion o backend caido: la exploracion en si no se ve
      // afectada, solo se pierde el registro en el pasaporte para esta
      // vez. reportedThisSession igual queda marcado para no reintentar
      // en loop en la misma sesion de pestaña.
    });
}
