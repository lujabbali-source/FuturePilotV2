// Universidades por ciudad de Gambia. Generado; no editar a mano.
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
  "gambia-latri-kunda": [
      defineUniversity({
        id: "gambia-latri-kunda-university-of-the-gambia",
        name: "University of the Gambia",
        cityId: "gambia-latri-kunda",
        website: "http://www.utg.edu.gm/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Latri Kunda (Wikidata).
      }),
      defineUniversity({
        id: "gambia-latri-kunda-university-of-the-gambia",
        name: "University of the Gambia",
        cityId: "gambia-latri-kunda",
        website: "http://www.utg.edu.gm/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Latri Kunda (Wikidata).
      }),
  ],
};
