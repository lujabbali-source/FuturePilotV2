// Universidades por ciudad de Togo. Generado; no editar a mano.
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
  "togo-lome": [
      defineUniversity({
        id: "togo-lome-university-of-lome",
        name: "University of Lomé",
        cityId: "togo-lome",
        website: null,
        source: "open-dataset",
        // Situada a 5.0 km del centro de Lomé (Wikidata).
      }),
  ],
  "togo-kara": [
      defineUniversity({
        id: "togo-kara-university-of-kara",
        name: "University of Kara",
        cityId: "togo-kara",
        website: null,
        source: "open-dataset",
        // Situada a 3.3 km del centro de Kara (Wikidata).
      }),
  ],
};
