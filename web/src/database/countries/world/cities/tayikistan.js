// Universidades por ciudad de Tayikistán. Generado; no editar a mano.
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
  "tayikistan-dushanbe": [
      defineUniversity({
        id: "tayikistan-dushanbe-tajik-national-university",
        name: "Tajik National University",
        cityId: "tayikistan-dushanbe",
        website: "http://tgnu.tarena.tj/",
        source: "open-dataset",
        // Situada a 6.0 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-tajik-state-university-of-commerce",
        name: "Tajik State University of Commerce",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-tajik-state-pedagogical-university",
        name: "Tajik State Pedagogical University",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 6.4 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-russian-tajik-slavonic-university",
        name: "Russian-Tajik Slavonic University",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 4.5 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-institute-of-business-and-service",
        name: "Institute of Business and Service",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-tajik-state-medical-university",
        name: "Tajik State Medical University",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 7.4 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-tajik-technical-university",
        name: "Tajik Technical University",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-tajik-technical-university",
        name: "Tajik Technical University",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 3.4 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-moscow-state-university-branch-in-dushanbe",
        name: "Moscow State University Branch in Dushanbe",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 4.9 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-academy-of-the-ministry-of-internal-affairs-of-tajikistan",
        name: "Academy of the Ministry of Internal Affairs of Tajikistan",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Dushanbe (Wikidata).
      }),
      defineUniversity({
        id: "tayikistan-dushanbe-agricultural-university-of-tajikistan",
        name: "Agricultural University of Tajikistan",
        cityId: "tayikistan-dushanbe",
        website: null,
        source: "open-dataset",
        // Situada a 8.2 km del centro de Dushanbe (Wikidata).
      }),
  ],
};
