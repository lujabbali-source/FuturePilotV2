// Universidades por ciudad de San Marino. Generado; no editar a mano.
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
  "san-marino-san-marino": [
      defineUniversity({
        id: "san-marino-san-marino-scuola-superiore-di-studi-storici-di-san-marino",
        name: "Scuola superiore di studi storici di San Marino",
        cityId: "san-marino-san-marino",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de San Marino (Wikidata).
      }),
      defineUniversity({
        id: "san-marino-san-marino-university-of-the-republic-of-san-marino",
        name: "University of the Republic of San Marino",
        cityId: "san-marino-san-marino",
        website: null,
        source: "open-dataset",
        // Situada a 0.0 km del centro de San Marino (Wikidata).
      }),
  ],
};
