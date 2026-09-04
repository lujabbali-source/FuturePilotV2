// Universidades por ciudad de Islas Feroe. Generado; no editar a mano.
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
  "islas-feroe-torshavn": [
      defineUniversity({
        id: "islas-feroe-torshavn-university-of-the-faroe-islands",
        name: "University of the Faroe Islands",
        cityId: "islas-feroe-torshavn",
        website: "http://www.setur.fo/",
        source: "open-dataset",
        // Situada a 0.5 km del centro de Tórshavn (Wikidata).
      }),
  ],
};
