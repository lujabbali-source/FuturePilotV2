// Universidades por ciudad de Maldivas. Generado; no editar a mano.
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
  "maldivas-male": [
      defineUniversity({
        id: "maldivas-male-villa-college",
        name: "Villa College",
        cityId: "maldivas-male",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Male (Wikidata).
      }),
      defineUniversity({
        id: "maldivas-male-maldives-national-university",
        name: "Maldives National University",
        cityId: "maldivas-male",
        website: "http://www.mnu.edu.mv/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Male (Wikidata).
      }),
      defineUniversity({
        id: "maldivas-male-maldives-polytechnic",
        name: "Maldives Polytechnic",
        cityId: "maldivas-male",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Male (Wikidata).
      }),
  ],
};
