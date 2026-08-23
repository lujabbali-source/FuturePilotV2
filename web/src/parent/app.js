// Centro para Padres: leer el expediente, explicarlo y recoger la respuesta.
//
// El token viaja en la RUTA (/consent/{token}), no en la query. Da igual
// para la seguridad - los dos van en la URL - pero las rutas no acaban en
// los `Referer` que el navegador manda a terceros con la misma facilidad, y
// se leen mejor en un correo.

import { t, onLanguageChange } from "../shared/i18next.js";

// `tp` ya es el atajo del pasaporte (namespace `passport`). Reutilizar el
// nombre para otro namespace hacia que el test de i18n resolviera estas
// claves contra el catalogo equivocado.
const ta = (clave, params) => t(`parent.${clave}`, { ns: "site", ...params });

function tokenDeLaUrl() {
    // /consent/AbC123...  ->  AbC123...
    const partes = window.location.pathname.split("/").filter(Boolean);
    return partes[0] === "consent" && partes[1] ? partes[1] : null;
}

function mostrar(id, visible) {
    const nodo = document.getElementById(id);
    if (nodo) nodo.hidden = !visible;
}

function fecha(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const idioma = document.documentElement.lang === "en" ? "en-US" : "es-ES";
    return d.toLocaleDateString(idioma, { year: "numeric", month: "long", day: "numeric" });
}

/** Los estados en los que ya no se puede responder, con su explicacion. */
const YA_RESUELTO = {
    AUTHORIZED: "stateAuthorized",
    DENIED: "stateDenied",
    REVOKED: "stateRevoked",
    EXPIRED: "stateExpired",
};

function pintar(consent) {
    mostrar("parentLoading", false);
    mostrar("parentBody", true);

    // De quien se habla. El acudiente puede tener mas de un hijo.
    const quien = document.getElementById("parentWho");
    quien.textContent = ta("who", {
        name: consent.studentName || consent.studentEmail,
        email: consent.studentEmail,
    });

    const pendiente = consent.status === "PENDING";
    mostrar("parentForm", pendiente);
    mostrar("parentDeadline", pendiente);
    mostrar("parentResolved", !pendiente);

    if (pendiente) {
        const aviso = document.querySelector("#parentDeadline p:last-child");
        if (aviso) aviso.textContent = ta("deadline", { date: fecha(consent.expiresAt) });
        return;
    }

    document.getElementById("parentResolvedTitle").textContent = ta("resolvedTitle");
    document.getElementById("parentResolvedText").textContent =
        ta(YA_RESUELTO[consent.status] || "stateExpired", { date: fecha(consent.resolvedAt) });
}

function invalido() {
    mostrar("parentLoading", false);
    mostrar("parentBody", false);
    mostrar("parentInvalid", true);
}

async function cargar(token) {
    try {
        const respuesta = await fetch(`/api/v1/consent/${encodeURIComponent(token)}`);
        if (!respuesta.ok) return invalido();
        const datos = await respuesta.json();
        pintar(datos.consent);
    } catch {
        invalido();
    }
}

async function responder(token, autoriza) {
    const error = document.getElementById("parentError");
    error.hidden = true;
    try {
        const respuesta = await fetch(`/api/v1/consent/${encodeURIComponent(token)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ authorized: autoriza }),
        });
        const datos = await respuesta.json().catch(() => ({}));
        if (respuesta.ok) {
            pintar(datos.consent);
            return;
        }
        // 409: alguien ya respondio (o vencio) entre que cargo la pagina y
        // pulso. Se pinta el estado real en vez de un error: lo que importa
        // es que vea que quedo, no que algo fallo.
        if (respuesta.status === 409 && datos.detail?.consent) {
            pintar(datos.detail.consent);
            return;
        }
        error.textContent = ta("errorGeneric");
        error.hidden = false;
    } catch {
        error.textContent = ta("errorNetwork");
        error.hidden = false;
    }
}

function main() {
    const token = tokenDeLaUrl();
    if (!token) return invalido();

    const casilla = document.getElementById("parentAgree");
    const autorizar = document.getElementById("parentAuthorize");
    const negar = document.getElementById("parentDeny");
    const formulario = document.getElementById("parentForm");

    // "Autorizo" no se puede pulsar sin marcar la casilla. Negar SI, sin
    // marcar nada: exigir una confirmacion para decir que no convertiria la
    // negativa en el camino dificil, y entonces el consentimiento dejaria de
    // ser libre.
    casilla.addEventListener("change", () => {
        autorizar.disabled = !casilla.checked;
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!casilla.checked) return;
        responder(token, true);
    });

    negar.addEventListener("click", () => responder(token, false));

    cargar(token);
    // Al cambiar de idioma hay que repintar: el texto interpolado (fechas,
    // el nombre del hijo) no lo toca applyTranslations, que solo recorre los
    // data-i18n del HTML.
    onLanguageChange(() => cargar(token));
}

main();
