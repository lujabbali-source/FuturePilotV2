// El resultado del test, convertido en documento.
//
// Por que una pagina aparte y no un boton "imprimir" sobre la pantalla de
// cuenta: esa pantalla es una interfaz -carreras que se despliegan, un
// formulario de contrasena, un boton de borrar cuenta- y al imprimirla sale
// media hoja de resultados y un panel de ajustes. Un informe es otra cosa:
// se lee entero, en orden, sin nada que pulsar, y termina diciendo de donde
// sale cada numero. Es lo que un estudiante le ensena a su familia o lleva a
// una cita con un orientador.
//
// El PDF lo hace el navegador (window.print + el bloque @media print de
// page.css). No hay libreria de por medio, y esa es la decision de diseno
// importante: el documento se compone con el MISMO CSS que se ve en
// pantalla, asi que no hay dos maquetas que mantener sincronizadas, el
// servidor no tiene que renderizar nada, y el texto sale como texto -
// seleccionable y buscable - en vez de como una imagen.
//
// Los datos salen enteros de /api/v1/me/dashboard, que ya devuelve el ultimo
// resultado traducido, la cuenta y las metas del pasaporte en una sola
// peticion. Aqui no se calcula NADA sobre el estudiante: si un dato no vino,
// su seccion no se pinta. Un informe vocacional con un hueco relleno de
// ejemplo es peor que uno mas corto.

import { t, currentLanguage } from "../shared/i18next.js";
import { radarMarkup, fiabilidad, wireRadar, EJES } from "../assessment/radar.js";
import { portadaArte } from "./cover.js";

const AUTH_TOKEN_KEY = "futurePilotAuthToken";

// El banco tiene 50 preguntas. Solo se usa para el texto de fiabilidad
// ("respondiste 32 de 50"), nunca para puntuar: es el mismo numero que usa
// la pantalla de cuenta y sale del mismo sitio.
const TOTAL_PREGUNTAS = 50;

const tr = (key, params) => t(`report.${key}`, params);

const root = document.getElementById("informe");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

/** Fecha larga en el idioma activo. Devuelve "" si no hay fecha, para poder
 *  omitir la linea entera en vez de imprimir un guion. */
function fechaLarga(iso) {
  if (!iso) return "";
  const fecha = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toLocaleDateString(currentLanguage(), {
    day: "numeric", month: "long", year: "numeric",
  });
}

/** Un porcentaje de compatibilidad con UN decimal, siempre.
 *
 *  La justificacion que redacta el servidor ya dice "Con un 89.0% de
 *  compatibilidad...", pero el numero grande de al lado salia de
 *  `${match_percentage}%`, y 89.0 se serializa como 89: la misma tarjeta
 *  imprimia "89%" arriba y "89.0%" dos lineas mas abajo. En una columna de
 *  cifras alineadas eso se lee como dos precisiones distintas del mismo
 *  dato. */
function porcentaje(valor) {
  return `${(Number(valor) || 0).toFixed(1)}%`;
}

/** Las barras se rellenan por CSSOM y no con `style=`: la CSP del sitio
 *  prohibe los estilos en linea, y un informe lleno de barras vacias no
 *  avisaria de nada - saldria simplemente mal impreso. */
function aplicarBarras(contenedor) {
  contenedor.querySelectorAll("[data-fill]").forEach((barra) => {
    const valor = Math.max(0, Math.min(100, Number(barra.dataset.fill) || 0));
    barra.style.setProperty("width", `${valor}%`);
  });
}

// ---------------------------------------------------------------------------
// Portada
// ---------------------------------------------------------------------------
/** La primera pagina, entera para ella sola.
 *
 *  Antes esto era una cabecera y el informe empezaba debajo. Una portada de
 *  verdad hace dos cosas que una cabecera no puede: da a entender de un
 *  vistazo que esto es un DOCUMENTO y no la impresion de una pantalla, y deja
 *  el nombre del estudiante solo en una hoja, que es la diferencia entre
 *  entregar un listado y entregarle algo suyo.
 *
 *  Lleva la fecha del TEST y la de emision por separado a proposito: un
 *  informe reimpreso un ano despues sigue describiendo el perfil de aquel
 *  dia, y quien lo lee tiene derecho a saberlo. */
function renderPortada(cuenta, fechaTest) {
  const nombre = cuenta.name || "";
  const dato = (etiqueta, valor) => (valor
    ? `<div><dt>${escapeHtml(etiqueta)}</dt><dd>${escapeHtml(valor)}</dd></div>`
    : "");

  return `
    <header class="rep-cover">
      <p class="rep-brand">
        <img class="rep-brand__mark" src="/Frontend/futurepilot-logo-transparent.png" alt="">
        Future<span>Pilot</span>
      </p>

      <!-- El dibujo y el titulo son UNA pieza, no dos. Sueltos, el reparto
           vertical de la portada los separaba y el avion acababa flotando en
           mitad del folio sin relacion con el texto de debajo. -->
      <div class="cover-middle">
        ${portadaArte()}

        <div class="cover-titles">
          <p class="rep-kicker">${escapeHtml(tr("kicker"))}</p>
          <h1 class="cover-title">FuturePilot <span>${escapeHtml(tr("analysis"))}</span></h1>
          <p class="cover-for">
            ${escapeHtml(tr("preparedFor"))}
            <strong>${escapeHtml(nombre || tr("noName"))}</strong>
          </p>
        </div>
      </div>

      <dl class="rep-meta">
        ${dato(tr("meta.passportId"), cuenta.passport_id)}
        ${dato(tr("meta.testDate"), fechaLarga(fechaTest))}
        ${dato(tr("meta.issued"), fechaLarga(new Date().toISOString()))}
      </dl>
    </header>`;
}

/** Cabecera de seccion. El numero lo pone CSS con un contador, no este
 *  archivo: asi reordenar dos secciones no obliga a renumerar ocho cadenas
 *  de traduccion en dos idiomas. */
function seccion(claveTitulo, cuerpo, { corteDePagina = false, sufijo = "" } = {}) {
  if (!cuerpo) return "";
  return `
    <section class="rep-section${corteDePagina ? " rep-section--break" : ""}">
      <h2 class="rep-section__title">
        ${escapeHtml(tr(`sections.${claveTitulo}`))}${sufijo ? `: ${escapeHtml(sufijo)}` : ""}
      </h2>
      ${cuerpo}
    </section>`;
}

// ---------------------------------------------------------------------------
// 1. Tu perfil
// ---------------------------------------------------------------------------
function renderPerfil(resultado) {
  if (!resultado.personality) return "";
  const fiab = fiabilidad(resultado.user_vector, resultado.cluster_evidence, TOTAL_PREGUNTAS);

  return `
    <div class="rep-card">
      <p class="rep-card__label">${escapeHtml(tr("profile.archetype"))}</p>
      <p class="rep-card__value">${escapeHtml(resultado.personality)}</p>
      ${resultado.learning_style ? `
        <p class="rep-card__label rep-card__label--sep">${escapeHtml(tr("profile.learningStyle"))}</p>
        <p class="rep-card__value rep-card__value--small">${escapeHtml(resultado.learning_style)}</p>` : ""}
      <p class="reliability reliability--${fiab.nivel}">
        ${escapeHtml(t("reliability.label"))}: ${escapeHtml(fiab.texto)}
      </p>
    </div>`;
}

// ---------------------------------------------------------------------------
// 2. Tu ADN vocacional
// ---------------------------------------------------------------------------
/** El radar mas las OCHO dimensiones desarrolladas, una a una.
 *
 *  Van los dos y no uno: el radar ensena la FORMA del perfil de un vistazo,
 *  que es lo que se recuerda, y la lista da el numero exacto, que mide y de
 *  cuantas respuestas sale - que es lo que hace que el numero se pueda
 *  discutir en vez de creer.
 *
 *  POR QUE LAS OCHO Y NO SOLO LA ABIERTA. En pantalla el radar es
 *  interactivo: pulsas un eje y debajo aparece que mide y como se calculo.
 *  Un PDF no tiene donde pulsar, asi que si el papel solo trajera el eje que
 *  quedo abierto, el informe explicaria UNA dimension de ocho y las otras
 *  siete serian un numero sin procedencia. Aqui se imprime lo que en pantalla
 *  hay que ir abriendo: cada eje con su definicion y con el recuento de
 *  respuestas y puntos del que sale.
 *
 *  Se ordenan de mayor a menor, no en el orden de los ejes: en papel se lee
 *  de arriba abajo una sola vez, y lo primero tiene que ser lo que mas
 *  destaca. */
function renderAdn(vector, evidencia) {
  if (!vector) return "";

  const filas = EJES
    .map((eje) => [eje, Number(vector[eje]) || 0])
    .sort((a, b) => b[1] - a[1])
    .map(([eje, valor]) => {
      const prueba = evidencia?.[eje];
      // El mismo texto que la pantalla ensena al abrir el eje, con los mismos
      // numeros: si el papel y la app dijeran cosas distintas del mismo dato,
      // el que perderia credibilidad seria el papel.
      const procedencia = prueba?.answered
        ? t("radar.measured", {
            answered: prueba.answered,
            points: Number(prueba.points).toFixed(0),
            max: Number(prueba.max_points).toFixed(0),
          })
        : t("radar.notMeasured");

      return `
        <li class="rep-axis">
          <span class="rep-axis__name">${escapeHtml(t(`radar.axis.${eje}`))}</span>
          <span class="rep-axis__track"><i data-fill="${valor * 10}"></i></span>
          <span class="rep-axis__score">${valor.toFixed(1)}</span>
          <p class="rep-axis__what">${escapeHtml(t(`radar.desc.${eje}`))}</p>
          <p class="rep-axis__how">${escapeHtml(procedencia)}</p>
        </li>`;
    })
    .join("");

  return `
    ${radarMarkup(vector, evidencia, { encabezado: false })}
    <ul class="rep-axes">${filas}</ul>
    <p class="rep-note">${escapeHtml(tr("dna.note"))}</p>`;
}

// ---------------------------------------------------------------------------
// 3. Fortalezas y areas por desarrollar
// ---------------------------------------------------------------------------
/** Las tres mas altas y las tres mas bajas del vector.
 *
 *  Se toman del vector y no de `strengths`/`weaknesses` del motor por lo
 *  mismo que en la pantalla de cuenta: aquellos salen de un umbral, asi que
 *  un perfil equilibrado se queda sin nada que mirar. Tres y tres siempre
 *  dicen algo concreto, y lo bajo se enmarca como terreno por recorrer. */
function renderFortalezas(vector) {
  if (!vector) return "";
  const ordenadas = EJES
    .map((eje) => [eje, Number(vector[eje]) || 0])
    .sort((a, b) => b[1] - a[1]);

  const bloque = (lista, clase) => lista
    .map(([eje, valor]) => `
      <li class="rep-chip rep-chip--${clase}">
        <span>${escapeHtml(t(`radar.axis.${eje}`))}</span>
        <b>${valor.toFixed(1)}</b>
      </li>`)
    .join("");

  return `
    <div class="rep-split">
      <div>
        <p class="rep-card__label">${escapeHtml(tr("strengths.top"))}</p>
        <ul class="rep-chips">${bloque(ordenadas.slice(0, 3), "strength")}</ul>
      </div>
      <div>
        <p class="rep-card__label">${escapeHtml(tr("strengths.grow"))}</p>
        <ul class="rep-chips">${bloque(ordenadas.slice(-3).reverse(), "gap")}</ul>
      </div>
    </div>
    <p class="rep-note">${escapeHtml(tr("strengths.note"))}</p>`;
}

// ---------------------------------------------------------------------------
// 4. Carreras que encajan
// ---------------------------------------------------------------------------
/** Todas las compatibles, con el detalle abierto.
 *
 *  En pantalla el detalle se despliega al pulsar; aqui va desplegado siempre.
 *  Un documento no tiene botones, y una lista de ocho titulos con un
 *  porcentaje al lado no orienta a nadie: lo que orienta es POR QUE encaja,
 *  que aporta el perfil y que falta por reforzar. Todo eso ya venia en la
 *  respuesta del test y en pantalla habia que ir abriendolo de uno en uno. */
function renderCarreras(carreras) {
  if (!carreras?.length) return "";

  return `
    <ol class="rep-careers">
      ${carreras.map((carrera, indice) => {
        const fortalezas = (carrera.strengths || []).join(", ");
        const brechas = (carrera.skill_gaps || []).join(", ");
        const puntuacion = Number(carrera.match_percentage) || 0;
        return `
          <li class="rep-career">
            <div class="rep-career__head">
              <span class="rep-career__rank">${String(indice + 1).padStart(2, "0")}</span>
              <h3 class="rep-career__name">${escapeHtml(carrera.title)}</h3>
              <span class="rep-career__score">${porcentaje(puntuacion)}</span>
            </div>
            <span class="rep-career__bar"><i data-fill="${puntuacion}"></i></span>
            ${carrera.justification
              ? `<p class="rep-career__why">${escapeHtml(carrera.justification)}</p>` : ""}
            <dl class="rep-career__detail">
              ${fortalezas ? `<div><dt>${escapeHtml(tr("careers.strongOn"))}</dt><dd>${escapeHtml(fortalezas)}</dd></div>` : ""}
              ${brechas ? `<div><dt>${escapeHtml(tr("careers.workOn"))}</dt><dd>${escapeHtml(brechas)}</dd></div>` : ""}
              ${carrera.description ? `<div><dt>${escapeHtml(tr("careers.whatYouDo"))}</dt><dd>${escapeHtml(carrera.description)}</dd></div>` : ""}
            </dl>
          </li>`;
      }).join("")}
    </ol>`;
}

// ---------------------------------------------------------------------------
// 5. Tu ruta
// ---------------------------------------------------------------------------
/** El roadmap de la carrera principal, hito a hito y con sus sub-tareas.
 *
 *  Lo marcado no se pinta. En /journey las casillas son el estado vivo de
 *  algo que se sigue haciendo; en un PDF fechado serian una foto que envejece
 *  mal - se imprime en marzo, se ensena en junio, y las casillas mienten. El
 *  informe describe el camino; el progreso vive en la app. */
function renderRuta(roadmap) {
  if (!roadmap?.checkpoints?.length) return "";

  return `
    <ol class="rep-steps">
      ${roadmap.checkpoints.map((hito) => {
        const titulo = hito.content?.title || hito.title || "";
        const items = hito.content?.items || [];
        return `
          <li class="rep-step">
            <h3 class="rep-step__title">
              <span class="rep-step__num">${escapeHtml(String(hito.step ?? ""))}</span>
              ${escapeHtml(titulo)}
            </h3>
            ${hito.description ? `<p class="rep-step__desc">${escapeHtml(hito.description)}</p>` : ""}
            ${items.length ? `
              <ul class="rep-tasks">
                ${items.map((item) => `<li>${escapeHtml(item.text)}</li>`).join("")}
              </ul>` : ""}
          </li>`;
      }).join("")}
    </ol>`;
}

// ---------------------------------------------------------------------------
// 6. Que hacer ahora
// ---------------------------------------------------------------------------
/** Lo accionable: los siguientes pasos que sugiere el motor, los destinos
 *  recomendados y - si el estudiante los escribio - sus propios objetivos.
 *
 *  Los objetivos van los ultimos y con sus palabras. Es la unica parte del
 *  informe que no dice nada sobre el estudiante sino que le devuelve lo que
 *  el dijo, y por eso cierra: el documento termina en su intencion, no en
 *  nuestro diagnostico. */
function renderAhora(resultado, metas) {
  const acciones = (resultado.next_actions || []).filter(Boolean);
  const hubs = resultado.recommended_hubs || [];

  const campos = [
    ["dream_university", "goals.university"],
    ["desired_career", "goals.career"],
    ["target_country", "goals.country"],
    ["languages_to_learn", "goals.languages"],
  ].filter(([campo]) => (metas?.[campo] || "").trim());

  if (!acciones.length && !hubs.length && !campos.length) return "";

  return `
    ${acciones.length ? `
      <p class="rep-card__label">${escapeHtml(tr("now.actions"))}</p>
      <ul class="rep-list">
        ${acciones.map((accion) => `<li>${escapeHtml(accion)}</li>`).join("")}
      </ul>` : ""}

    ${hubs.length ? `
      <p class="rep-card__label rep-card__label--sep">${escapeHtml(tr("now.hubs"))}</p>
      <ul class="rep-hubs">
        ${hubs.map((hub) => `
          <li>
            <strong>${escapeHtml(hub.city || hub.name || "")}${hub.country ? `, ${escapeHtml(hub.country)}` : ""}</strong>
            ${hub.desc ? `<span>${escapeHtml(hub.desc)}</span>` : ""}
          </li>`).join("")}
      </ul>` : ""}

    ${campos.length ? `
      <p class="rep-card__label rep-card__label--sep">${escapeHtml(tr("now.goals"))}</p>
      <dl class="rep-goals">
        ${campos.map(([campo, clave]) => `
          <div>
            <dt>${escapeHtml(tr(clave))}</dt>
            <dd>${escapeHtml(metas[campo])}</dd>
          </div>`).join("")}
      </dl>` : ""}`;
}

// ---------------------------------------------------------------------------
// 7. Como se calculo
// ---------------------------------------------------------------------------
/** La nota metodologica. No es letra pequena de tramite.
 *
 *  Este documento va a acabar en manos de una familia decidiendo que estudia
 *  alguien de dieciseis anos, y un porcentaje impreso en un PDF con logo pesa
 *  mucho mas de lo que deberia. Decir aqui de que sale, que no es, y que se
 *  puede repetir es lo unico que evita que un "87%" se lea como un veredicto.
 *  Va al final para que se lea despues de los numeros, que es cuando hace
 *  falta. */
function renderMetodo(fechaTest) {
  const fecha = fechaLarga(fechaTest);
  return `
    <p class="rep-method">${escapeHtml(tr("method.how"))}</p>
    <p class="rep-method">${escapeHtml(tr("method.limits"))}</p>
    <p class="rep-method">${escapeHtml(tr("method.retake"))}</p>
    ${fecha
      ? `<p class="rep-method rep-method--stamp">${escapeHtml(tr("method.dated", { date: fecha }))}</p>`
      : ""}`;
}

// ---------------------------------------------------------------------------
// Estados sin informe
// ---------------------------------------------------------------------------
function renderVacio(claveTitulo, claveCuerpo, destino, claveCta) {
  return `
    <div class="rep-empty">
      <p class="rep-kicker">${escapeHtml(tr("kicker"))}</p>
      <h1>${escapeHtml(tr(claveTitulo))}</h1>
      <p>${escapeHtml(tr(claveCuerpo))}</p>
      <a class="rep-action" href="${destino}">${escapeHtml(tr(claveCta))} <span aria-hidden="true">&rarr;</span></a>
    </div>`;
}

/** El precio, con el formato de la moneda y del idioma activo.
 *  En centavos a proposito desde el servidor: el dinero no viaja en coma
 *  flotante. Aqui se divide una sola vez, justo antes de ensenarlo. */
function precioLegible(price) {
  if (!price) return "";
  try {
    return new Intl.NumberFormat(currentLanguage(), {
      style: "currency", currency: price.currency, maximumFractionDigits: 0,
    }).format(price.amount_cents / 100);
  } catch {
    // Una moneda que Intl no conozca no puede dejar la pantalla sin precio.
    return `${Math.round(price.amount_cents / 100)} ${price.currency}`;
  }
}

/** La pantalla que sustituye al informe cuando no esta desbloqueado.
 *
 *  Se pinta EN LUGAR del documento, no encima con un difuminado: un informe
 *  medio visible detras de un velo es una invitacion a mirar el codigo, y
 *  ademas los datos ya habrian viajado hasta el navegador.
 *
 *  Enumera lo que incluye porque a estas alturas la persona ya vio su
 *  analisis, su ruta y sus universidades: lo que se le pide que pague no es
 *  informacion nueva, es el documento -y eso hay que decirlo, no insinuarlo. */
function renderMuro(acceso) {
  const precio = precioLegible(acceso.price);
  const incluye = ["lock.item1", "lock.item2", "lock.item3", "lock.item4"];

  // Sin pasarela todavia no hay boton: ver checkout_url en app.py.
  const accion = acceso.checkout_url
    ? `<a class="rep-action" href="${escapeHtml(acceso.checkout_url)}">${escapeHtml(tr("lock.cta"))} <span aria-hidden="true">&rarr;</span></a>`
    : `<p class="rep-lock__soon">${escapeHtml(tr("lock.soon"))}</p>`;

  return `
    <div class="rep-lock">
      <p class="rep-kicker">${escapeHtml(tr("kicker"))}</p>
      <h1>${escapeHtml(tr("lock.title"))}</h1>
      <p class="rep-lock__lead">${escapeHtml(tr("lock.body"))}</p>

      <ul class="rep-lock__list">
        ${incluye.map((clave) => `<li>${escapeHtml(tr(clave))}</li>`).join("")}
      </ul>

      ${precio ? `<p class="rep-lock__price"><strong>${escapeHtml(precio)}</strong> <span>${escapeHtml(tr("lock.once"))}</span></p>` : ""}
      ${accion}

      <a class="rep-action rep-action--ghost" href="/assessment">
        <span aria-hidden="true">&larr;</span> ${escapeHtml(tr("backToAccount"))}
      </a>
    </div>`;
}

// ---------------------------------------------------------------------------
// Pintado
// ---------------------------------------------------------------------------
/** La barra de acciones. Desaparece al imprimir: un boton "Descargar PDF"
 *  impreso DENTRO del PDF es justo la clase de detalle que delata que el
 *  documento es la captura de una pantalla. */
function renderBarra() {
  return `
    <div class="rep-toolbar">
      <a class="rep-action rep-action--ghost" href="/assessment">
        <span aria-hidden="true">&larr;</span> ${escapeHtml(tr("backToAccount"))}
      </a>
      <button type="button" class="rep-action" data-action="print">
        ${escapeHtml(tr("download"))}
      </button>
      <p class="rep-toolbar__hint">${escapeHtml(tr("printHint"))}</p>
    </div>`;
}

function render(datos) {
  const ultimo = datos.latest;
  const resultado = ultimo?.results || {};
  const cuenta = datos.account || {};
  const fechaTest = ultimo?.created_at;

  root.innerHTML = `
    ${renderBarra()}
    <article class="rep-sheet">
      ${renderPortada(cuenta, fechaTest)}
      <!-- La entradilla abre la SEGUNDA pagina, no la portada. Explica como se
           lee lo que viene detras, asi que su sitio es justo antes de que
           empiece, no debajo del titulo. -->
      <p class="rep-lead">${escapeHtml(tr("lead"))}</p>
      ${seccion("profile", renderPerfil(resultado))}
      ${seccion("dna", renderAdn(resultado.user_vector, resultado.cluster_evidence), { corteDePagina: true })}
      ${seccion("strengths", renderFortalezas(resultado.user_vector))}
      ${seccion("careers", renderCarreras(resultado.recommended_careers), { corteDePagina: true })}
      ${seccion("path", renderRuta(resultado.roadmap), {
        corteDePagina: true,
        sufijo: resultado.roadmap?.career_title || "",
      })}
      ${seccion("now", renderAhora(resultado, datos.goals))}
      ${seccion("method", renderMetodo(fechaTest))}
      <footer class="rep-foot">
        <span>FuturePilot${cuenta.passport_id ? ` &middot; ${escapeHtml(cuenta.passport_id)}` : ""}</span>
        <span>${escapeHtml(tr("footNote"))}</span>
      </footer>
    </article>`;

  aplicarBarras(root);
  // El radar sigue siendo interactivo en pantalla. Ademas abre solo el eje
  // mas alto, asi que en papel el panel tampoco sale vacio pidiendo un clic.
  wireRadar(root, resultado.user_vector, resultado.cluster_evidence);
}

root.addEventListener("click", (evento) => {
  if (evento.target.closest("[data-action='print']")) window.print();
});

// ---------------------------------------------------------------------------
async function main() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  // Sin sesion no se llega aqui (ver exigirCuenta en main.js), pero si el
  // token caduco entre aquella comprobacion y esta peticion, mejor decirlo
  // que pintar un informe en blanco.
  if (!token) {
    root.innerHTML = renderVacio("gone.title", "gone.body", "/login", "gone.cta");
    return;
  }

  let datos;
  try {
    const respuesta = await fetch(`/api/v1/me/dashboard?lang=${currentLanguage()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!respuesta.ok) throw new Error(String(respuesta.status));
    datos = await respuesta.json();
  } catch {
    root.innerHTML = renderVacio("error.title", "error.body", "/assessment", "error.cta");
    return;
  }

  // Un informe vocacional sin test es una portada con un nombre. Se dice y se
  // manda a hacerlo, en vez de imprimir siete secciones vacias.
  if (!datos.latest?.results) {
    root.innerHTML = renderVacio("empty.title", "empty.body", "/assessment", "empty.cta");
    return;
  }

  // El muro. Va DESPUES de comprobar que hay resultado: a quien no ha hecho
  // el test hay que mandarlo a hacerlo, no pedirle dinero por el informe de
  // un test que no existe.
  //
  // Con el muro apagado en el servidor esto no se cumple nunca y la pagina
  // se comporta igual que siempre.
  if (datos.report_access && !datos.report_access.unlocked) {
    root.innerHTML = renderMuro(datos.report_access);
    return;
  }

  render(datos);
}

main();
