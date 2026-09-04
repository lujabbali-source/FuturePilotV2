// Universidades por ciudad de Liechtenstein. Generado; no editar a mano.
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
  "liechtenstein-vaduz": [
      defineUniversity({
        id: "liechtenstein-vaduz-private-university-in-the-principality-of-liechtenstein",
        name: "Private University in the Principality of Liechtenstein",
        cityId: "liechtenstein-vaduz",
        website: null,
        source: "open-dataset",
        // Situada a 3.7 km del centro de Vaduz (Wikidata).
      }),
      defineUniversity({
        id: "liechtenstein-vaduz-university-of-liechtenstein",
        name: "University of Liechtenstein",
        cityId: "liechtenstein-vaduz",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Vaduz (Wikidata).
      }),
  ],
};
