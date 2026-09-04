// Universidades por ciudad de Niue. Generado; no editar a mano.
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
  "niue-alofi": [
      defineUniversity({
        id: "niue-alofi-st-clements-university",
        name: "St. Clements University",
        cityId: "niue-alofi",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Alofi (Wikidata).
      }),
  ],
};
