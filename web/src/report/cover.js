// El dibujo de portada, compartido por los dos informes.
//
// Vive aparte porque lo usan dos documentos distintos - el informe vocacional
// del estudiante y el informe general de administracion - y son la misma
// casa: si cada uno se dibujara su avion, a la primera correccion de la curva
// tendriamos dos aviones distintos volando en dos PDFs que se supone que van
// juntos.
//
// Solo el DIBUJO se comparte. El texto de cada portada es cosa de cada
// informe: uno lleva el nombre de una persona y el otro un periodo.

/** La trayectoria del avion.
 *
 *  ESTA CADENA ESTA DUPLICADA EN page.css (.cover-plane, offset-path). Son la
 *  misma curva: el trazo que se ve y el rail por el que viaja el avion. CSS no
 *  sabe leer el `d` de un path, y meterlo desde JavaScript exigiria un
 *  `style=` que la CSP prohibe, asi que la unica salida es escribirla dos
 *  veces. Hay un test que compara las dos copias (tests/test_report.py) para
 *  que cambiar una sin la otra falle en vez de dejar al avion volando por
 *  fuera de su estela. */
export const RUTA_AVION = "M 44 242 C 152 236, 248 212, 330 172 C 412 132, 492 86, 556 54";

/** Un avion de papel despegando sobre el horizonte.
 *
 *  Por que un avion de papel y no uno de verdad: la marca se llama
 *  FuturePilot y va de decidir a donde ir, no de aviacion. Un avion de papel
 *  es lo que dobla alguien de dieciseis anos y lanza a ver hasta donde llega
 *  - que es exactamente de lo que trata este documento - y ademas se dibuja
 *  con cuatro lineas, que es lo que hace falta para que quede minimalista.
 *
 *  El arco de abajo es el horizonte, y el punto donde nace la estela es de
 *  donde sale. Nada mas: cualquier adorno extra en una portada se convierte
 *  en ruido a los dos segundos de mirarla.
 *
 *  Va en SVG en linea porque la CSP no autoriza cargar nada de fuera, y
 *  porque asi se imprime como vector - nitido a cualquier tamano - en vez de
 *  como una imagen pixelada.
 *
 *  El id "coverTrail" es fijo y no se parametriza: page.css lo referencia por
 *  nombre (`stroke: url(#coverTrail)`), asi que un id configurable dejaria la
 *  estela sin color en cuanto alguien lo cambiara. Solo hay una portada por
 *  pagina, de modo que tampoco hay riesgo de colision. */
export function portadaArte() {
  return `
    <div class="cover-art" aria-hidden="true">
      <svg viewBox="0 0 600 272" class="cover-svg">
        <defs>
          <!-- Los colores de las paradas van por CSS y no en un atributo
               stop-color: asi salen de las mismas variables que el resto del
               documento (--doc-cyan / --doc-accent) y no hay una tercera
               copia de la paleta escondida dentro de un SVG. -->
          <linearGradient id="coverTrail" x1="0" y1="1" x2="1" y2="0">
            <stop class="cover-stop cover-stop--start" offset="0%" />
            <stop class="cover-stop cover-stop--mid" offset="35%" />
            <stop class="cover-stop cover-stop--end" offset="100%" />
          </linearGradient>
        </defs>

        <path class="cover-horizon" d="M -20 252 Q 300 196, 620 252" />
        <path class="cover-trail" d="${RUTA_AVION}" />
        <circle class="cover-origin" cx="44" cy="242" r="4.5" />

        <g class="cover-plane">
          <path class="cover-plane__wing" d="M 21 0 L -19 -14 L -10 0 Z" />
          <path class="cover-plane__body" d="M 21 0 L -10 0 L -19 14 Z" />
        </g>
      </svg>
    </div>`;
}
