// Universidades por ciudad de Mali. Generado; no editar a mano.
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
  "mali-bamako": [
      defineUniversity({
        id: "mali-bamako-university-of-legal-and-political-sciences-of-bamako",
        name: "University of Legal and Political Sciences of Bamako",
        cityId: "mali-bamako",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Bamako (Wikidata).
      }),
      defineUniversity({
        id: "mali-bamako-university-of-legal-and-political-sciences-of-bamako",
        name: "University of Legal and Political Sciences of Bamako",
        cityId: "mali-bamako",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Bamako (Wikidata).
      }),
  ],
};
