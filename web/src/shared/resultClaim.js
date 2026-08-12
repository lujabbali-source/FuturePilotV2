import { show as showStamps } from "./passport-stamp-toast.js";
// Vinculación del resultado del test a la cuenta del estudiante.
//
// Existe UN solo sitio donde se reclama un resultado, y es este. Antes la
// llamada estaba copiada en login.js y en assessment.js, cada una con su
// propio manejo de errores - y las dos con el mismo fallo: borraban
// futurePilotResultId pasara lo que pasara.
//
// El resultado del test se calcula ANTES de que exista una cuenta (queda
// como fila anónima en test_results) y result_id, guardado en
// localStorage, es el ÚNICO puntero que existe hacia él. La regla que
// impone este módulo es una sola:
//
//   nunca borrar result_id hasta que el servidor confirme que lo procesó.
//
// Si el claim falla, el id se conserva y la llamada se puede reintentar.
// El endpoint es idempotente (ver claim_test_result en users_store.py):
// reintentar un claim que en realidad sí funcionó devuelve éxito, no 404,
// así que reintentar siempre es seguro.
// Ya no se registra en window: sus dos consumidores (el test y el login)
// estan migrados al build, asi que se importa como cualquier otro modulo.
const RESULT_ID_KEY = "futurePilotResultId";
const AUTH_TOKEN_KEY = "futurePilotAuthToken";

function pendingResultId() {
  return localStorage.getItem(RESULT_ID_KEY);
}

/**
 * Reclama el resultado pendiente, si lo hay.
 *
 * @param {string} [authToken] token a usar; por defecto el de localStorage.
 *   login.js lo pasa explícito porque acaba de recibirlo y aún no ha
 *   terminado de escribirlo.
 * @returns {Promise<{status: string, newStamps: Array}>}
 *   status: "claimed"  - vinculado (o ya lo estaba). result_id ya borrado.
 *           "nothing"  - no había nada pendiente.
 *           "rejected" - el servidor lo rechazó (no existe, o es de otra
 *                        cuenta). No es reintentable: result_id borrado
 *                        para no dejar al usuario en un bucle.
 *           "failed"   - no se pudo confirmar (red, 5xx, timeout).
 *                        result_id CONSERVADO. Reintentable.
 */
async function claimPending(authToken) {
  const resultId = pendingResultId();
  const token = authToken || localStorage.getItem(AUTH_TOKEN_KEY);
  if (!resultId || !token) return { status: "nothing", newStamps: [] };

  let response;
  try {
    response = await fetch("/api/v1/me/claim-result", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ result_id: Number(resultId) }),
    });
  } catch (error) {
    // Red caída o petición abortada: no sabemos si el servidor llegó a
    // procesarlo. Se conserva el id justamente por eso.
    console.warn("[FuturePilot] No se pudo vincular el resultado (red):", error);
    return { status: "failed", newStamps: [] };
  }

  if (response.status === 404) {
    // El resultado no existe o pertenece a otra cuenta. Reintentar daría
    // 404 para siempre, así que se descarta el puntero - pero se deja
    // constancia, porque llegar aquí significa que algo se perdió.
    console.warn("[FuturePilot] El resultado pendiente ya no es reclamable; se descarta.");
    localStorage.removeItem(RESULT_ID_KEY);
    return { status: "rejected", newStamps: [] };
  }

  if (!response.ok) {
    console.warn(`[FuturePilot] El servidor rechazó el claim (${response.status}); se reintentará.`);
    return { status: "failed", newStamps: [] };
  }

  const data = await response.json().catch(() => ({}));
  // Solo aquí, con el 2xx ya en la mano, se suelta el puntero.
  localStorage.removeItem(RESULT_ID_KEY);
  return { status: "claimed", newStamps: data.new_stamps || [] };
}

/** claimPending + el toast de sellos nuevos, que es lo que quieren las
 *  dos páginas que lo usan. Devuelve el mismo objeto que claimPending. */
async function claimPendingAndCelebrate(authToken) {
  const outcome = await claimPending(authToken);
  if (outcome.newStamps.length) {
    showStamps(outcome.newStamps);
  }
  return outcome;
}

export { claimPending, claimPendingAndCelebrate, pendingResultId };
