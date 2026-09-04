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

// La geometria de la rueda, de dentro hacia fuera:
//
//   NUCLEO ....... el disco del centro. Un 0 cae aqui.
//   RADIO ........ hasta donde llega un 10. Es la zona de datos.
//   ARO_INT/EXT .. la corona exterior, partida en un segmento por dimension.
//   ETIQUETA ..... donde se escribe el nombre, ya fuera de la rueda.
//
// La corona no es adorno: es lo que convierte ocho puntas sueltas en una
// rueda con ocho sitios, y da a cada dimension un lugar fijo que se reconoce
// aunque su puntuacion sea cero. Antes, un eje en 0 no tenia NINGUNA presencia
// en el grafico salvo su nombre suelto en el borde.
const CENTRO = 200;
const RADIO = 120;
const NUCLEO = 22;
const ARO_INT = 132;
const ARO_EXT = 152;
const ETIQUETA = 168;
const LIENZO = 400;
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
  const [x] = punto(indice, ETIQUETA);
  if (Math.abs(x - CENTRO) < 6) return "middle";
  return x > CENTRO ? "start" : "end";
}

/** Angulos de apertura y cierre del hueco que ocupa un eje en la rueda.
 *  `holgura` en radianes recorta los dos extremos, que es lo que deja el
 *  respiro entre un segmento de la corona y el siguiente. */
function tramo(indice, holgura = 0) {
  const paso = (Math.PI * 2) / EJES.length;
  const centroEje = paso * indice - Math.PI / 2;
  return [centroEje - paso / 2 + holgura, centroEje + paso / 2 - holgura];
}

/** Coordenada en un angulo y una distancia, ya formateada para un `d`. */
function coord(angulo, distancia) {
  return `${(CENTRO + Math.cos(angulo) * distancia).toFixed(1)} `
       + `${(CENTRO + Math.sin(angulo) * distancia).toFixed(1)}`;
}

/** Un segmento de la corona exterior: el "sitio" de esa dimension en la rueda.
 *
 *  Es un trozo de anillo - se va por fuera, vuelve por dentro y cierra - en
 *  vez de un arco con trazo grueso, porque asi los extremos quedan cortados en
 *  radial y los ocho encajan como una rueda de verdad. Con `stroke-width` los
 *  extremos salen planos y el conjunto parece ocho palitos curvos. */
function arco(indice) {
  const [desde, hasta] = tramo(indice, 0.035);
  return `M ${coord(desde, ARO_INT)}`
       + ` L ${coord(desde, ARO_EXT)}`
       + ` A ${ARO_EXT} ${ARO_EXT} 0 0 1 ${coord(hasta, ARO_EXT)}`
       + ` L ${coord(hasta, ARO_INT)}`
       + ` A ${ARO_INT} ${ARO_INT} 0 0 0 ${coord(desde, ARO_INT)} Z`;
}

/** El trozo de grafico que pertenece a un eje: su porcion de tarta.
 *
 *  Existe para poder PULSAR el eje. Hasta ahora lo unico que se podia tocar
 *  dentro del grafico era el vertice, y el vertice esta a la distancia que
 *  marque la puntuacion: un eje con un 0 pone su punto en el centro exacto,
 *  asi que los ejes bajos acababan TODOS amontonados en el mismo pixel, uno
 *  tapando a otro. En un perfil con cinco ceros solo se dejaban pulsar tres
 *  ejes de ocho, y los otros cinco no es que fallaran - es que no habia
 *  ningun sitio donde pulsarlos.
 *
 *  Con un sector por eje, la superficie sensible ya no depende de la
 *  puntuacion: cada punto del grafico pertenece al eje mas cercano, siempre.
 *  Van invisibles y debajo de todo, asi que no cambian el dibujo en nada.
 *
 *  No son focusables a proposito: quien navega con teclado ya tiene los ocho
 *  nombres como botones (ver `etiquetas`), y duplicarlos dejaria dieciseis
 *  paradas de tabulador para ocho ejes. */
function sector(indice) {
  const [desde, hasta] = tramo(indice);
  // Llega hasta el borde de la corona: la rueda entera responde al clic, no
  // solo la zona de datos. La etiqueta cae fuera y tiene su propio manejador.
  const r = ARO_EXT;
  return `M ${CENTRO} ${CENTRO} L ${coord(desde, r)}`
       + ` A ${r} ${r} 0 0 1 ${coord(hasta, r)} Z`;
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
  //
  // Son CIRCULOS y ya no octogonos. Un octogono de rejilla compite con el
  // octogono del perfil - las dos figuras tienen la misma forma y a poca
  // distancia se confunden. Con la rejilla circular, lo unico angular del
  // grafico es el dato.
  const anillos = [2, 4, 6, 8, 10]
    .map((nivel) => {
      const d = (nivel / MAXIMO) * RADIO;
      const clase = nivel === MAXIMO ? "radar__ring radar__ring--outer" : "radar__ring";
      return `<circle class="${clase}" cx="${CENTRO}" cy="${CENTRO}" r="${d.toFixed(1)}" />`;
    })
    .join("");

  const radios = EJES.map((_, i) => {
    const [x, y] = punto(i, RADIO);
    return `<line class="radar__spoke" x1="${CENTRO}" y1="${CENTRO}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />`;
  }).join("");

  // La corona: un segmento por dimension, cada uno con su tono del degradado
  // de marca. Es lo que le da a cada eje un sitio propio en la rueda aunque su
  // puntuacion sea cero, y lo que hace que el grafico se lea como una pieza y
  // no como ocho lineas que salen de un punto.
  //
  // Tambien es pulsable: en una rueda, el sitio evidente donde pulsar para
  // "abrir" una dimension es su trozo de corona.
  const corona = EJES.map((eje, i) => (
    `<path class="radar__arc radar__arc--${i}" data-eje="${eje}" d="${arco(i)}" />`
  )).join("");

  // El numero dentro de cada segmento. Da un nombre corto a cada sitio - "el
  // 3" - que se puede seguir del grafico a la lista de abajo sin releer ocho
  // etiquetas largas.
  const numeros = EJES.map((eje, i) => {
    const [x, y] = punto(i, (ARO_INT + ARO_EXT) / 2);
    return `<text class="radar__num" data-eje="${eje}"
      x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" dominant-baseline="central"
    >${i + 1}</text>`;
  }).join("");

  // Las zonas sensibles, una por eje. Van ANTES que el area y los vertices
  // para quedar por debajo en el dibujo; los clics les llegan igual porque
  // todo lo que tienen encima es o transparente o del mismo eje.
  const zonas = EJES.map((eje, i) => (
    `<path class="radar__hit" data-eje="${eje}" d="${sector(i)}" aria-hidden="true" />`
  )).join("");

  const vertices = EJES.map((eje, i) => {
    const [x, y] = punto(i, distancias[i]);
    return `<circle class="radar__dot" data-eje="${eje}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" />`;
  }).join("");

  // Cada eje es un boton de verdad, no un <circle> con un click encima: se
  // alcanza con el teclado y un lector de pantalla lo anuncia. El area
  // sensible es la etiqueta entera, que es mucho mas facil de acertar en un
  // movil que un punto de 5px.
  const etiquetas = EJES.map((eje, i) => {
    const [x, y] = punto(i, ETIQUETA);
    return `<text class="radar__label" data-eje="${eje}" role="button" tabindex="0"
      x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anclaje(i)}" dominant-baseline="middle"
    >${t(`radar.axis.${eje}`)}</text>`;
  }).join("");

  return `
    <section class="radar-section">
      ${encabezado ? `<div class="section-label"><span>${t("radar.title")}</span></div>
      <p class="radar-hint">${t("radar.hint")}</p>` : ""}
      <div class="radar-wrap">
        <svg class="radar" viewBox="0 0 ${LIENZO} ${LIENZO}" role="img" aria-label="${t("radar.title")}">
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#00D4FF" stop-opacity=".45" />
              <stop offset="100%" stop-color="#00FFB3" stop-opacity=".25" />
            </linearGradient>
          </defs>
          <!-- El nucleo. Marca donde esta el cero: sin el, un perfil con
               varios ejes bajos se lee como una mancha pegada al centro sin
               referencia de donde empieza la escala. -->
          <circle class="radar__core" cx="${CENTRO}" cy="${CENTRO}" r="${NUCLEO}" />
          ${anillos}
          ${radios}
          ${zonas}
          <polygon class="radar__area" points="${poligono(distancias)}" fill="url(#radarFill)" />
          <!-- El nivel del eje abierto: un anillo a la altura EXACTA de su
               puntuacion, y el radio encendido del centro a su vertice. Los
               dos nacen vacios y los rellena wireRadar al abrir un eje; se
               dibujan encima del perfil, que no se toca. -->
          <polygon class="radar__level" data-radar-level points="" />
          <line class="radar__ray" data-radar-ray
                x1="${CENTRO}" y1="${CENTRO}" x2="${CENTRO}" y2="${CENTRO}" />
          ${vertices}
          ${corona}
          ${numeros}
          ${etiquetas}
        </svg>
      </div>
      ${aviso(vector, evidencia)}
      <div class="radar-detail" data-radar-detail>
        <p class="radar-detail__prompt">${t("radar.prompt")}</p>
      </div>
    </section>`;
}

/**
 * Cuanto se puede fiar el estudiante de este resultado, dicho con datos suyos.
 *
 * Aqui habia un "Confianza del analisis: 80%". Ese numero salia de
 * 0.4 + respondidas*0.3 + definicion*0.3 (ai_engine.py), o sea que NUNCA
 * bajaba del 40%: quien contestara cinco preguntas al azar veia un 47%. Un
 * porcentaje con esa pinta se lee como una probabilidad de acertar, y no lo
 * era - era un indice inventado por la casa, sin nada en pantalla que dijera
 * de que se componia.
 *
 * Se sustituye por las dos cosas reales de las que dependia, que ademas el
 * estudiante puede comprobar: cuantas preguntas respondio, y si su perfil
 * marca diferencias entre ejes. Una palabra en vez de un decimal, y los
 * numeros que la sostienen al lado.
 */
export function fiabilidad(vector, evidencia, totalPreguntas) {
  const respondidas = EJES.reduce(
    (suma, eje) => suma + ((evidencia && evidencia[eje] && evidencia[eje].answered) || 0), 0);

  const valores = EJES.map((eje) => Number((vector || {})[eje]) || 0);
  const media = valores.reduce((a, b) => a + b, 0) / (valores.length || 1);
  const desviacion = Math.sqrt(
    valores.reduce((suma, v) => suma + (v - media) ** 2, 0) / (valores.length || 1));

  const cobertura = totalPreguntas ? respondidas / totalPreguntas : 0;
  const definicion = desviacion / 5;

  // Las dos condiciones tienen que cumplirse: responderlo entero sin mostrar
  // ninguna inclinacion no es un resultado fiable, y un perfil muy marcado
  // sacado de seis respuestas, tampoco.
  const nivel = cobertura >= 0.8 && definicion >= 0.24 ? "high"
    : cobertura >= 0.5 && definicion >= 0.15 ? "mid"
    : "low";

  return {
    nivel,
    texto: t(`reliability.${nivel}`, { answered: respondidas, total: totalPreguntas || 0 }),
  };
}

/**
 * El aviso cuando el perfil no distingue nada.
 *
 * Un octagono lleno se lee como un boletin de notas perfecto, y no lo es: las
 * 50 frases del test estan escritas en positivo ("disfruto resolviendo
 * problemas dificiles"), asi que estar de acuerdo con todas es facil y da 10
 * en los ocho ejes. Ese 10 no dice "se te da bien todo", dice "el test no
 * pudo distinguir". Callarselo seria dejar que alguien de 16 años saque una
 * conclusion sobre si mismo que sus propios datos no sostienen.
 *
 * El umbral es el mismo que usa el motor para bajar la confianza del analisis
 * (profile_definition en ai_engine.py): desviacion tipica sobre 5, y por
 * debajo de 0.24 el perfil se considera plano.
 */
function aviso(vector, evidencia) {
  const valores = EJES.map((eje) => Number(vector[eje]) || 0);
  const media = valores.reduce((a, b) => a + b, 0) / valores.length;
  const desviacion = Math.sqrt(
    valores.reduce((suma, v) => suma + (v - media) ** 2, 0) / valores.length
  );

  const respondidas = EJES.reduce(
    (suma, eje) => suma + ((evidencia && evidencia[eje] && evidencia[eje].answered) || 0), 0);

  // Pocas respuestas explican cualquier forma rara, asi que ese aviso manda
  // sobre el de perfil plano: no tiene sentido decirle que fue poco selectivo
  // a quien apenas contesto.
  if (respondidas > 0 && respondidas < 15) {
    return `<p class="radar-note">${t("radar.noteFew", { answered: respondidas })}</p>`;
  }

  if (desviacion / 5 >= 0.24) return "";

  const clave = media >= 7 ? "noteFlatHigh" : media <= 3 ? "noteFlatLow" : "noteFlatMid";
  return `<p class="radar-note">${t(`radar.${clave}`)}</p>`;
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

  const nivel = svg.querySelector("[data-radar-level]");
  const rayo = svg.querySelector("[data-radar-ray]");

  /** Situa la puntuacion del eje abierto SOBRE el grafico.
   *
   *  El poligono del perfil no se toca: sigue siendo la forma real, y por eso
   *  se puede seguir comparando el eje abierto con los otros siete. Lo que se
   *  añade encima son dos cosas que no existian: un anillo a la altura exacta
   *  de la puntuacion - el "hasta aqui llegas" - y el radio del eje encendido
   *  del centro a su vertice.
   *
   *  Hacia falta porque hasta ahora abrir un eje solo cambiaba el texto de
   *  debajo. En los ejes altos se notaba algo; en uno bajo, cuyo vertice esta
   *  casi en el centro, no se movia nada visible en el grafico.
   *
   *  Se escribe con setAttribute y no con `style=`: `points`, `x2` e `y2` son
   *  atributos de SVG, no estilos, asi que la CSP no los bloquea. */
  function situarNivel(eje) {
    if (!nivel || !rayo) return;
    const indice = EJES.indexOf(eje);
    const valor = Math.max(0, Math.min(MAXIMO, Number(vector[eje]) || 0));
    const distancia = (valor / MAXIMO) * RADIO;

    // Un eje en 0 esta EN el centro: no hay anillo que dibujar ni radio que
    // encender. Se vacia en vez de pintar un poligono degenerado, y el panel
    // de abajo ya dice "0.0 / 10", que es la informacion honesta.
    if (distancia < 0.5) {
      nivel.setAttribute("points", "");
      rayo.setAttribute("x2", CENTRO);
      rayo.setAttribute("y2", CENTRO);
      return;
    }

    nivel.setAttribute("points", poligono(EJES.map(() => distancia)));
    const [x, y] = punto(indice, distancia);
    rayo.setAttribute("x2", x.toFixed(1));
    rayo.setAttribute("y2", y.toFixed(1));
  }

  function abrir(eje) {
    svg.querySelectorAll(".is-selected").forEach((n) => n.classList.remove("is-selected"));
    svg.querySelectorAll(`[data-eje="${eje}"]`).forEach((n) => n.classList.add("is-selected"));
    // Marca el grafico entero como "hay un eje abierto", que es lo que usa el
    // CSS para atenuar suavemente lo demas y dejar brillar al elegido.
    svg.classList.add("is-focused");
    situarNivel(eje);
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
