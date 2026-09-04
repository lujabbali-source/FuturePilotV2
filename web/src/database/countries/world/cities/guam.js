// Universidades por ciudad de Guam. Generado; no editar a mano.
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
  "guam-mangilao-village": [
      defineUniversity({
        id: "guam-mangilao-village-university-of-guam",
        name: "University of Guam",
        cityId: "guam-mangilao-village",
        website: "http://www.uog.edu/",
        source: "open-dataset",
        // Situada a 1.6 km del centro de Mangilao Village (Wikidata).
      }),
      defineUniversity({
        id: "guam-mangilao-village-university-of-guam-marine-laboratory",
        name: "University of Guam Marine Laboratory",
        cityId: "guam-mangilao-village",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Mangilao Village (Wikidata).
      }),
      defineUniversity({
        id: "guam-mangilao-village-catholic-redemptoris-mater-archdiocesan-seminary",
        name: "Catholic Redemptoris Mater Archdiocesan Seminary",
        cityId: "guam-mangilao-village",
        website: null,
        source: "open-dataset",
        // Situada a 6.9 km del centro de Mangilao Village (Wikidata).
      }),
      defineUniversity({
        id: "guam-mangilao-village-pacific-islands-university",
        name: "Pacific Islands University",
        cityId: "guam-mangilao-village",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Mangilao Village (Wikidata).
      }),
  ],
};
