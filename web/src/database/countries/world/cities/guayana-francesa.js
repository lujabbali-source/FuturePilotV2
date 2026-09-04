// Universidades por ciudad de Guayana Francesa. Generado; no editar a mano.
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
  "guayana-francesa-cayenne": [
      defineUniversity({
        id: "guayana-francesa-cayenne-university-of-french-guiana",
        name: "University of French Guiana",
        cityId: "guayana-francesa-cayenne",
        website: null,
        source: "open-dataset",
        // Situada a 3.7 km del centro de Cayenne (Wikidata).
      }),
      defineUniversity({
        id: "guayana-francesa-cayenne-university-of-the-french-west-indies-and-guiana",
        name: "University of the French West Indies and Guiana",
        cityId: "guayana-francesa-cayenne",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Cayenne (Wikidata).
      }),
  ],
};
