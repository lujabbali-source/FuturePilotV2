// Universidades por ciudad de Angola. Generado; no editar a mano.
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
  "angola-kilamba": [
      defineUniversity({
        id: "angola-kilamba-catholic-university-of-angola",
        name: "Catholic University of Angola",
        cityId: "angola-kilamba",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Kilamba (Wikidata).
      }),
      defineUniversity({
        id: "angola-kilamba-catholic-university-of-angola",
        name: "Catholic University of Angola",
        cityId: "angola-kilamba",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Kilamba (Wikidata).
      }),
  ],
};
