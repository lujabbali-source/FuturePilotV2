// Universidades por ciudad de Turkmenistán. Generado; no editar a mano.
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
  "turkmenistan-ashgabat": [
      defineUniversity({
        id: "turkmenistan-ashgabat-international-university-of-humanities-and-development",
        name: "International University of Humanities and Development",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-oguz-han-engineering-and-technology-university-of-turkmenistan",
        name: "Oguz Han Engineering and Technology University of Turkmenistan",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 5.1 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-myrat-garryyev-state-medical-university-of-turkmenistan",
        name: "Myrat Garryyev State Medical University of Turkmenistan",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 8.1 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-institute-of-international-relations",
        name: "Institute of International Relations",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-turkmen-state-institute-of-culture",
        name: "Turkmen State Institute of Culture",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 6.1 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-turkmen-national-institute-of-world-languages",
        name: "Turkmen National Institute of World Languages",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-turkmen-agricultural-university-named-after-s-a-nyyazow",
        name: "Turkmen Agricultural University Named After S.A. Nyýazow",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-turkmen-institute-of-national-economy",
        name: "Turkmen Institute of National Economy",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a 5.9 km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-magtymguly-turkmen-state-university",
        name: "Magtymguly Turkmen State University",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-military-institute-of-the-ministry-of-defense-of-turkmenistan",
        name: "Military Institute of the Ministry of Defense of Turkmenistan",
        cityId: "turkmenistan-ashgabat",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Ashgabat (Wikidata).
      }),
      defineUniversity({
        id: "turkmenistan-ashgabat-international-turkmen-turkish-university",
        name: "International Turkmen-Turkish University",
        cityId: "turkmenistan-ashgabat",
        website: "http://www.ittu.edu.tm/",
        source: "open-dataset",
        // Situada a None km del centro de Ashgabat (Wikidata).
      }),
  ],
};
