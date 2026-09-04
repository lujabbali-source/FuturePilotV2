// Universidades por ciudad de Islas Marshall. Generado; no editar a mano.
//
// Se carga bajo demanda al abrir una ciudad, no en el arranque del globo.
// Cada universidad lleva en un comentario a cuantos km del centro de la
// ciudad esta: es lo que justifica la asignacion, y permite revisarla. Las
// que quedaron a mas del radio no estan en ningun sitio, que es lo correcto.
//
// `type` va en null siempre: la fuente abierta no dice si es publica o
// privada. `website` solo aparece si el nombre cuadra exactamente con una
// entrada de Hipolabs.

import { defineUniversity } from "../../schema.js";

export default {
  "islas-marshall-dalap-uliga-dorrit": [
      defineUniversity({
        id: "islas-marshall-dalap-uliga-dorrit-university-of-the-southpacific-rmi-campus",
        name: "University of the Southpacific - RMI Campus",
        cityId: "islas-marshall-dalap-uliga-dorrit",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Dalap-Uliga-Dorrit (Wikidata).
      }),
  ],
};
