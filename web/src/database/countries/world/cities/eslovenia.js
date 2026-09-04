// Universidades por ciudad de Eslovenia. Generado; no editar a mano.
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
  "eslovenia-koper": [
      defineUniversity({
        id: "eslovenia-koper-university-of-primorska",
        name: "University of Primorska",
        cityId: "eslovenia-koper",
        website: "http://www.upr.si/",
        source: "open-dataset",
        // Situada a 0.0 km del centro de Koper (Wikidata).
      }),
      defineUniversity({
        id: "eslovenia-koper-euro-mediterranean-university-of-slovenia",
        name: "Euro-Mediterranean University of Slovenia",
        cityId: "eslovenia-koper",
        website: null,
        source: "open-dataset",
        // Situada a 12.8 km del centro de Koper (Wikidata).
      }),
  ],
};
