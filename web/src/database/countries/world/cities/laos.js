// Universidades por ciudad de Laos. Generado; no editar a mano.
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
  "laos-vientiane": [
      defineUniversity({
        id: "laos-vientiane-national-university-of-laos",
        name: "National University of Laos",
        cityId: "laos-vientiane",
        website: "https://www.nuol.edu.la/",
        source: "open-dataset",
        // Situada a 8.7 km del centro de Vientiane (Wikidata).
      }),
  ],
  "laos-pakse": [
      defineUniversity({
        id: "laos-pakse-champasak-university",
        name: "Champasak University",
        cityId: "laos-pakse",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Pakse (Wikidata).
      }),
  ],
  "laos-luang-prabang": [
      defineUniversity({
        id: "laos-luang-prabang-souphanouvong-university",
        name: "Souphanouvong University",
        cityId: "laos-luang-prabang",
        website: null,
        source: "open-dataset",
        // Situada a 4.9 km del centro de Luang Prabang (Wikidata).
      }),
  ],
};
