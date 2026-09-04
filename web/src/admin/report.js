// Informe general de resultados, para administracion.
//
// El panel de /admin responde "como va la plataforma hoy": cinco contadores y
// un top 5. Esto responde otra pregunta, la que hace falta para tomar
// decisiones: QUE LE ESTA SALIENDO A LA GENTE. El reparto completo de
// carreras, no su cabeza; por area de conocimiento; que arquetipos aparecen; y
// hacia donde se inclina el perfil medio de quien usa esto.
//
// Se imprime con el mismo CSS que el informe del estudiante
// (src/report/page.css): son dos documentos distintos de la misma casa, y
// mantener dos maquetas para eso seria trabajo duplicado que ademas acabaria
// divergiendo.
//
// Regla que sigue todo lo de aqui, igual que en el resto de la app: ningun
// numero se estima. Los tests anonimos se cuentan y se dicen aparte; si la
// muestra que sostiene las medias se corto por el limite del servidor, el
// documento lo imprime en su propia cara en vez de dejarlo en un log.

import { portadaArte } from "../report/cover.js";

const ADMIN_TOKEN_KEY = "futurePilotAdminToken";

const root = document.getElementById("informe");

// Los periodos que ofrece la barra. `null` es el historico completo, que es
// el que se abre por defecto: un informe general que por defecto enseñara
// solo el ultimo mes seria un informe general que engaña por omision.
const PERIODOS = [
  { dias: null, etiqueta: "Todo el histórico" },
  { dias: 365, etiqueta: "Último año" },
  { dias: 90, etiqueta: "Últimos 90 días" },
  { dias: 30, etiqueta: "Últimos 30 días" },
];

const estado = { dias: null, datos: null, error: null };

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function fechaLarga(iso) {
  if (!iso) return "";
  const fecha = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

/** Un porcentaje con UN decimal, siempre.
 *
 *  Sin esto el mismo documento mezclaba "5.4%" con "3%" en la misma columna,
 *  porque 3.0 se serializa como 3 y JavaScript lo pinta sin decimal. En una
 *  tabla de cifras alineadas eso se lee como dos precisiones distintas. */
function porcentaje(valor) {
  return `${(Number(valor) || 0).toFixed(1)}%`;
}

/** Las barras se rellenan por CSSOM: la CSP prohibe `style=` en el markup. */
function aplicarBarras(contenedor) {
  contenedor.querySelectorAll("[data-fill]").forEach((barra) => {
    const valor = Math.max(0, Math.min(100, Number(barra.dataset.fill) || 0));
    barra.style.setProperty("width", `${valor}%`);
  });
}

function irAlLogin() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem("futurePilotAdminUser");
  window.location.href = "/admin/login";
}

// ---------------------------------------------------------------------------
// Secciones
// ---------------------------------------------------------------------------
function seccion(titulo, cuerpo, { corteDePagina = false } = {}) {
  if (!cuerpo) return "";
  return `
    <section class="rep-section${corteDePagina ? " rep-section--break" : ""}">
      <h2 class="rep-section__title">${escapeHtml(titulo)}</h2>
      ${cuerpo}
    </section>`;
}

/** Los totales, en una rejilla de cifras grandes.
 *
 *  Van juntos y a la misma escala a proposito. "412 tests" al lado de "138
 *  cuentas con test" cuenta una historia que ninguno de los dos numeros
 *  cuenta solo: la gente repite el test, y cualquier lectura que confunda
 *  tests con estudiantes se equivoca por un factor de tres. */
function renderResumen(totales, periodo) {
  const cifra = (valor, etiqueta, pista = "") => `
    <div class="rep-figure">
      <p class="rep-figure__value">${escapeHtml(String(valor))}</p>
      <p class="rep-figure__label">${escapeHtml(etiqueta)}</p>
      ${pista ? `<p class="rep-figure__hint">${escapeHtml(pista)}</p>` : ""}
    </div>`;

  const acotado = periodo.days
    ? `Tests en el periodo (${periodo.days} días)`
    : "Tests con carrera asignada";

  return `
    <div class="rep-figures">
      ${cifra(totales.tests_in_period, acotado, "Base de todos los porcentajes de este informe")}
      ${cifra(totales.users_with_results, "Cuentas con al menos un test")}
      ${cifra(totales.tests_anonymous, "Tests sin cuenta", "Completados antes de registrarse")}
      ${cifra(totales.users, "Cuentas registradas")}
      ${cifra(`${totales.careers_represented} / ${totales.careers_in_catalog}`,
              "Carreras que han salido primeras", "Sobre el catálogo completo")}
      ${cifra(totales.tests_total, "Tests en total", "Histórico, sin filtro de periodo")}
    </div>`;
}

/** El reparto completo de carreras.
 *
 *  Completo y no un top 10: la cola es justo la parte interesante para quien
 *  mantiene el catalogo. Una carrera que nunca sale primera en trescientos
 *  tests puede tener mal calibrados sus requisitos, y en un top 10 eso no se
 *  ve nunca. */
function renderCarreras(carreras) {
  if (!carreras?.length) return "";
  const maximo = carreras[0].percent || 1;

  return `
    <ol class="rep-rank">
      ${carreras.map((carrera, indice) => `
        <li class="rep-rank__row">
          <span class="rep-rank__pos">${String(indice + 1).padStart(2, "0")}</span>
          <span class="rep-rank__name">${escapeHtml(carrera.name)}</span>
          <span class="rep-rank__track">
            <i data-fill="${(carrera.percent / maximo) * 100}"></i>
          </span>
          <span class="rep-rank__count">${carrera.total}</span>
          <span class="rep-rank__pct">${porcentaje(carrera.percent)}</span>
        </li>`).join("")}
    </ol>
    <p class="rep-note">
      La barra es relativa a la carrera más frecuente, para que el reparto se
      lea de un vistazo. El porcentaje sí es absoluto: sale sobre los
      ${carreras.reduce((suma, c) => suma + c.total, 0)} tests con carrera asignada.
    </p>`;
}

function renderCategorias(categorias) {
  if (!categorias?.length) return "";
  const maximo = categorias[0].percent || 1;

  return `
    <ul class="rep-rank">
      ${categorias.map((categoria) => `
        <li class="rep-rank__row">
          <span class="rep-rank__pos"></span>
          <span class="rep-rank__name">${escapeHtml(categoria.name)}</span>
          <span class="rep-rank__track">
            <i data-fill="${(categoria.percent / maximo) * 100}"></i>
          </span>
          <span class="rep-rank__count">${categoria.total}</span>
          <span class="rep-rank__pct">${porcentaje(categoria.percent)}</span>
        </li>`).join("")}
    </ul>
    <p class="rep-note">
      La misma información agrupada por el área de conocimiento que declara
      cada carrera en el catálogo. Es la vista que dice si la plataforma está
      empujando a todo el mundo hacia la misma familia de estudios.
    </p>`;
}

function renderArquetipos(arquetipos, totalPerfiles) {
  if (!arquetipos?.length) return "";
  const maximo = arquetipos[0].total || 1;

  return `
    <ul class="rep-rank">
      ${arquetipos.map((arquetipo) => `
        <li class="rep-rank__row">
          <span class="rep-rank__pos"></span>
          <span class="rep-rank__name">${escapeHtml(arquetipo.name)}</span>
          <span class="rep-rank__track"><i data-fill="${(arquetipo.total / maximo) * 100}"></i></span>
          <span class="rep-rank__count">${arquetipo.total}</span>
          <span class="rep-rank__pct">${
            totalPerfiles ? porcentaje((arquetipo.total / totalPerfiles) * 100) : ""
          }</span>
        </li>`).join("")}
    </ul>`;
}

/** El perfil medio de la poblacion, eje a eje.
 *
 *  Es el numero con mas consecuencias del informe y por eso lleva su aviso
 *  debajo. Una media alta en un eje puede significar dos cosas muy distintas:
 *  que la gente que usa esto es asi, o que las preguntas de ese eje son mas
 *  faciles de puntuar alto. El informe no puede distinguirlas, asi que lo
 *  dice en vez de dejar que quien lo lea suponga la primera. */
function renderPerfilMedio(perfil, contados) {
  if (!perfil?.length) return "";

  return `
    <ul class="rep-axes">
      ${perfil.map((eje) => `
        <li class="rep-axis">
          <span class="rep-axis__name">${escapeHtml(eje.label)}</span>
          <span class="rep-axis__track"><i data-fill="${eje.average * 10}"></i></span>
          <span class="rep-axis__score">${eje.average.toFixed(1)}</span>
        </li>`).join("")}
    </ul>
    <p class="rep-note">
      Media de cada dimensión sobre ${contados} resultados, en la misma escala
      de 0 a 10 que ve el estudiante. Una media alta puede significar que la
      gente que usa FuturePilot puntúa así, o que las preguntas de ese eje son
      más fáciles de puntuar alto: este informe no puede distinguir las dos
      cosas.
    </p>`;
}

function renderPaises(paises) {
  if (!paises?.length) return "";
  const maximo = paises[0].total || 1;

  return `
    <ul class="rep-rank">
      ${paises.map((pais) => `
        <li class="rep-rank__row">
          <span class="rep-rank__pos"></span>
          <span class="rep-rank__name">${escapeHtml(pais.name)}</span>
          <span class="rep-rank__track"><i data-fill="${(pais.total / maximo) * 100}"></i></span>
          <span class="rep-rank__count">${pais.total}</span>
          <span class="rep-rank__pct"></span>
        </li>`).join("")}
    </ul>
    <p class="rep-note">
      Cuenta estudiantes distintos, no visitas: quien abre el mismo país cinco
      veces suma uno.
    </p>`;
}

/** El alcance del documento. Lo que este informe NO puede decir.
 *
 *  Un informe agregado se usa para decidir - donde invertir, que carreras
 *  ampliar, que contarle a un colegio - y esas decisiones se toman peor con
 *  un numero cuyo origen no se conoce. */
function renderMetodo(datos) {
  const { totals: totales, sample: muestra, period: periodo } = datos;
  const anonimos = totales.tests_anonymous;

  return `
    <p class="rep-method">
      Los recuentos de carreras salen de contar la tabla de resultados entera,
      no una muestra: el porcentaje de cada carrera es exacto sobre los
      ${totales.tests_in_period} tests con carrera asignada
      ${periodo.days ? `en los últimos ${periodo.days} días` : "registrados hasta hoy"}.
    </p>
    <p class="rep-method">
      Los arquetipos y el perfil medio se calculan abriendo cada resultado uno
      a uno, así que se leen los ${muestra.size} más recientes${
        muestra.truncated
          ? ` — el tope del servidor es ${muestra.limit} y se alcanzó, de modo que
              esas dos secciones describen los más recientes y no el histórico completo`
          : ""
      }.
    </p>
    <p class="rep-method">
      ${anonimos > 0
        ? `${anonimos} de estos tests se completaron sin cuenta, porque el test se
           puede hacer antes de registrarse. Cuentan para el reparto de carreras,
           pero no se sabe cuántas personas distintas hay detrás de ellos: dos
           tests anónimos pueden ser dos estudiantes o el mismo dos veces.`
        : `Todos los tests de este periodo pertenecen a una cuenta.`}
    </p>
    <p class="rep-method">
      Un mismo estudiante puede repetir el test, y cada intento cuenta como una
      fila. Por eso el número de tests es siempre mayor o igual que el de
      estudiantes, y ninguna cifra de aquí debe leerse como "personas".
    </p>`;
}

// ---------------------------------------------------------------------------
// Pintado
// ---------------------------------------------------------------------------
function renderBarra() {
  const opciones = PERIODOS.map((periodo) => `
    <button type="button"
            class="rep-chip-btn${periodo.dias === estado.dias ? " is-active" : ""}"
            data-periodo="${periodo.dias ?? ""}">${escapeHtml(periodo.etiqueta)}</button>`).join("");

  return `
    <div class="rep-toolbar">
      <a class="rep-action rep-action--ghost" href="/admin"><span aria-hidden="true">←</span> Volver al panel</a>
      <button type="button" class="rep-action" data-action="print">Descargar PDF</button>
      <div class="rep-periods">${opciones}</div>
    </div>`;
}

function render() {
  if (estado.error) {
    root.innerHTML = `
      ${renderBarra()}
      <div class="rep-empty">
        <p class="rep-kicker">Informe general de resultados</p>
        <h1>No pudimos generar el informe</h1>
        <p>${escapeHtml(estado.error)}</p>
      </div>`;
    return;
  }

  // Todavia no ha llegado nada. Pasa en la primera carga y al cambiar de
  // periodo con la red lenta: se deja la barra puesta para que el periodo
  // elegido ya se vea marcado, y el documento aparece cuando hay datos.
  if (!estado.datos) {
    root.innerHTML = `${renderBarra()}<p class="rep-loading">Reuniendo los resultados…</p>`;
    return;
  }

  const datos = estado.datos;
  const periodo = datos.period;
  const etiquetaPeriodo = PERIODOS.find((p) => p.dias === periodo.days)?.etiqueta
    || "Todo el histórico";

  root.innerHTML = `
    ${renderBarra()}
    <article class="rep-sheet">
      <header class="rep-cover">
        <p class="rep-brand">
          <img class="rep-brand__mark" src="/Frontend/futurepilot-logo-transparent.png" alt="">
          Future<span>Pilot</span>
        </p>

        <!-- El mismo dibujo y la misma composicion que el informe del
             estudiante (ver src/report/cover.js). Son dos documentos de la
             misma casa y se van a leer juntos: uno explica a una persona y el
             otro a la poblacion entera. Lo que los distingue es el
             subtitulo - "Administración" - y no un diseño aparte. -->
        <div class="cover-middle">
          ${portadaArte()}

          <div class="cover-titles">
            <p class="rep-kicker">Informe general de resultados</p>
            <h1 class="cover-title">FuturePilot <span>Análisis</span></h1>
            <p class="cover-for">
              Administración &middot; ${escapeHtml(etiquetaPeriodo.toLowerCase())}
              <strong>Qué está produciendo el test</strong>
            </p>
          </div>
        </div>

        <dl class="rep-meta">
          <div><dt>Generado el</dt><dd>${escapeHtml(fechaLarga(datos.generated_at))}</dd></div>
          <div><dt>Desde</dt>
            <dd>${escapeHtml(periodo.since ? fechaLarga(periodo.since) : "El primer test registrado")}</dd></div>
          <div><dt>Base</dt><dd>${datos.totals.tests_in_period} tests</dd></div>
        </dl>
      </header>

      <!-- La entradilla abre la SEGUNDA pagina, igual que en el informe del
           estudiante: explica como leer lo que viene detras, asi que su sitio
           es justo antes de que empiece. -->
      <p class="rep-lead">
        Este documento resume lo que ha salido del test de orientación en el
        periodo indicado. Todas las cifras salen de resultados realmente
        registrados; ninguna está estimada. La última sección dice qué puede
        y qué no puede afirmarse con estos datos.
      </p>

      ${seccion("Resumen", renderResumen(datos.totals, periodo))}
      ${seccion("Carreras más obtenidas", renderCarreras(datos.careers), { corteDePagina: true })}
      ${seccion("Por área de conocimiento", renderCategorias(datos.categories), { corteDePagina: true })}
      ${seccion("Arquetipos más frecuentes", renderArquetipos(datos.archetypes, datos.profiles_counted))}
      ${seccion("Perfil medio de la población", renderPerfilMedio(datos.average_profile, datos.profiles_counted))}
      ${seccion("Países más explorados", renderPaises(datos.top_countries))}
      ${seccion("Alcance de este informe", renderMetodo(datos), { corteDePagina: true })}

      <footer class="rep-foot">
        <span>FuturePilot · Administración</span>
        <span>Documento interno. Contiene datos agregados, nunca resultados individuales.</span>
      </footer>
    </article>`;

  aplicarBarras(root);
}

// ---------------------------------------------------------------------------
async function cargar() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) {
    irAlLogin();
    return;
  }

  const consulta = new URLSearchParams({ lang: "es" });
  if (estado.dias) consulta.set("days", String(estado.dias));

  try {
    const respuesta = await fetch(`/api/v1/admin/report?${consulta}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // 401/403 no es un fallo del informe: es que esta sesion ya no manda
    // aqui. Se sale al login en vez de enseñar un error que invita a
    // recargar.
    if (respuesta.status === 401 || respuesta.status === 403) {
      irAlLogin();
      return;
    }
    if (!respuesta.ok) throw new Error(`el servidor respondió ${respuesta.status}`);
    estado.datos = await respuesta.json();
    estado.error = null;
  } catch (fallo) {
    estado.error = `No conseguimos los datos: ${fallo.message}.`;
  }
  render();
}

root.addEventListener("click", (evento) => {
  if (evento.target.closest("[data-action='print']")) {
    window.print();
    return;
  }

  const boton = evento.target.closest("[data-periodo]");
  if (!boton) return;
  const valor = boton.dataset.periodo;
  estado.dias = valor ? Number(valor) : null;
  render();          // el periodo elegido se marca ya, sin esperar a la red
  cargar();
});

cargar();
