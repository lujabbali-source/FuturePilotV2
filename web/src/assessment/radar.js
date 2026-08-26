// El perfil del estudiante como grafico de radar, con sus ocho ejes.
//
// Por que un radar y no ocho barras. Las barras se leen de una en una y
// invitan a comparar "cual es la mas alta"; el radar se lee de golpe y lo
// que muestra es la FORMA del perfil, que es de lo que va el test. Dos
// estudiantes con la misma barra mas alta pueden tener perfiles muy
// distintos, y en un radar eso se ve sin explicarlo.
//
// Cada eje se puede abrir. Debajo aparece con cuantas respuestas se midio y
// cuantos puntos saco de los posibles - lo mismo que el motor guarda en
// cluster_evidence. Un porcentaje sin procedencia es una afirmacion sobre
// alguien de 16 años que no puede comprobar; con la cuenta a la vista, puede.
//
// Sin `style=` en ninguna parte: la CSP del sitio prohibe los estilos en
// linea, y un radar pintado con ellos saldria en blanco. Los atributos de
// presentacion de SVG (fill, stroke, opacity) no son estilos en linea y si
// funcionan; el resto va por clases.
import { t } from "../shared/i18next.js";

// El orden NO es alfabetico: coloca enfrente los ejes que se oponen. Pensar
// contra hacer, personas contra cosas. Asi la forma del poligono significa
// algo - un perfil inclinado a la izquierda se lee distinto de uno inclinado
// a la derecha - en vez de depender de como quedaron ordenados en un JSON.
export const EJES = [
  "ANALYTICAL",
  "SCIENTIFIC",
  "TECHNICAL",
  "PRACTICAL",
  "ENTREPRENEURIAL",
  "LEADERSHIP",
  "SOCIAL",
  "CREATIVE",
];

const CENTRO = 170;
const RADIO = 118;
const MAXIMO = 10;

/** Coordenada de un eje a una distancia dada, en su angulo.
 *  Empieza arriba (-90 grados) y gira en el sentido del reloj. */
function punto(indice, distancia) {
  const angulo = (Math.PI * 2 * indice) / EJES.length - Math.PI / 2;
  return [
    CENTRO + Math.cos(angulo) * distancia,
    CENTRO + Math.sin(angulo) * distancia,
  ];
}

function poligono(distancias) {
  return distancias.map((d, i) => punto(i, d).map((n) => n.toFixed(1)).join(",")).join(" ");
}

/** La etiqueta se aparta del vertice y se alinea segun donde caiga, o el
 *  texto de los lados se montaria encima del grafico. */
function anclaje(indice) {
  const [x] = punto(indice, RADIO);
  if (Math.abs(x - CENTRO) < 6) return "middle";
  return x > CENTRO ? "start" : "end";
}

/**
 * `encabezado: false` lo pinta sin titulo ni pista. Lo usa el panel de cuenta,
 * que ya trae los suyos alrededor de esta seccion: con los dos salian dos
 * titulos seguidos diciendo lo mismo con otras palabras.
 */
export function radarMarkup(vector, evidencia, { encabezado = true } = {}) {
  if (!vector) return "";

  const valores = EJES.map((eje) => Number(vector[eje]) || 0);
  const distancias = valores.map((v) => (Math.max(0, Math.min(MAXIMO, v)) / MAXIMO) * RADIO);

  // Anillos de referencia cada 2 puntos. Sin ellos el poligono es una mancha:
  // no hay forma de saber si una punta larga es un 6 o un 10.
  const anillos = [2, 4, 6, 8, 10]
    .map((nivel) => {
      const d = (nivel / MAXIMO) * RADIO;
      const clase = nivel === MAXIMO ? "radar__ring radar__ring--outer" : "radar__ring";
      return `<polygon class="${clase}" points="${poligono(EJES.map(() => d))}" />`;
    })
    .join("");

  const radios = EJES.map((_, i) => {
    const [x, y] = punto(i, RADIO);
    return `<line class="radar__spoke" x1="${CENTRO}" y1="${CENTRO}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />`;
  }).join("");

  const vertices = EJES.map((eje, i) => {
    const [x, y] = punto(i, distancias[i]);
    return `<circle class="radar__dot" data-eje="${eje}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" />`;
  }).join("");

  // Cada eje es un boton de verdad, no un <circle> con un click encima: se
  // alcanza con el teclado y un lector de pantalla lo anuncia. El area
  // sensible es la etiqueta entera, que es mucho mas facil de acertar en un
  // movil que un punto de 5px.
  const etiquetas = EJES.map((eje, i) => {
    const [x, y] = punto(i, RADIO + 26);
    return `<text class="radar__label" data-eje="${eje}" role="button" tabindex="0"
      x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anclaje(i)}" dominant-baseline="middle"
    >${t(`radar.axis.${eje}`)}</text>`;
  }).join("");

  return `
    <section class="radar-section">
      ${encabezado ? `<div class="section-label"><span>${t("radar.title")}</span></div>
      <p class="radar-hint">${t("radar.hint")}</p>` : ""}
      <div class="radar-wrap">
        <svg class="radar" viewBox="0 0 340 340" role="img" aria-label="${t("radar.title")}">
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#00D4FF" stop-opacity=".45" />
              <stop offset="100%" stop-color="#00FFB3" stop-opacity=".25" />
            </linearGradient>
          </defs>
          ${anillos}
          ${radios}
          <polygon class="radar__area" points="${poligono(distancias)}" fill="url(#radarFill)" />
          ${vertices}
          ${etiquetas}
        </svg>
      </div>
      <div class="radar-detail" data-radar-detail>
        <p class="radar-detail__prompt">${t("radar.prompt")}</p>
      </div>
    </section>`;
}

/** Lo que se ve al abrir un eje: que mide, cuanto sacaste, y de donde sale
 *  ese numero. El "de donde sale" es el motivo entero de la pantalla. */
function detalle(eje, vector, evidencia) {
  const valor = Number(vector[eje]) || 0;
  const prueba = (evidencia && evidencia[eje]) || null;

  const medicion = prueba && prueba.answered
    ? t("radar.measured", {
        answered: prueba.answered,
        points: Number(prueba.points).toFixed(0),
        max: Number(prueba.max_points).toFixed(0),
      })
    : t("radar.notMeasured");

  return `
    <h3 class="radar-detail__title">${t(`radar.axis.${eje}`)}</h3>
    <p class="radar-detail__score"><strong>${valor.toFixed(1)}</strong><span> / 10</span></p>
    <p class="radar-detail__what">${t(`radar.desc.${eje}`)}</p>
    <p class="radar-detail__how">${medicion}</p>`;
}

export function wireRadar(root, vector, evidencia) {
  const svg = root.querySelector(".radar");
  const panel = root.querySelector("[data-radar-detail]");
  if (!svg || !panel || !vector) return;

  function abrir(eje) {
    svg.querySelectorAll(".is-selected").forEach((n) => n.classList.remove("is-selected"));
    svg.querySelectorAll(`[data-eje="${eje}"]`).forEach((n) => n.classList.add("is-selected"));
    panel.innerHTML = detalle(eje, vector, evidencia);
  }

  svg.querySelectorAll("[data-eje]").forEach((nodo) => {
    nodo.addEventListener("click", () => abrir(nodo.dataset.eje));
    nodo.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrir(nodo.dataset.eje);
      }
    });
  });

  // Se abre solo el eje mas alto. Una pantalla que empieza vacia pidiendo un
  // clic se queda vacia: el estudiante no sabe todavia que hay algo debajo.
  const masAlto = EJES.reduce((a, b) => ((Number(vector[b]) || 0) > (Number(vector[a]) || 0) ? b : a));
  abrir(masAlto);
}
