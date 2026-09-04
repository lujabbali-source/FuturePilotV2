// Universidades por ciudad de Etiopía. Generado; no editar a mano.
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
  "etiopia-addis-ababa": [
      defineUniversity({
        id: "etiopia-addis-ababa-addis-ababa-university",
        name: "Addis Ababa University",
        cityId: "etiopia-addis-ababa",
        website: "http://www.aau.edu.et/",
        source: "open-dataset",
        // Situada a 2.7 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-teferi-mekonnen-polytechnic-college",
        name: "Teferi Mekonnen Polytechnic College",
        cityId: "etiopia-addis-ababa",
        website: null,
        source: "open-dataset",
        // Situada a 3.4 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-addis-ababa-science-and-technology-university",
        name: "Addis Ababa Science and Technology University",
        cityId: "etiopia-addis-ababa",
        website: "http://www.aastu.org/",
        source: "open-dataset",
        // Situada a 16.3 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-addis-continental-institute-of-public-health",
        name: "Addis Continental Institute of Public Health",
        cityId: "etiopia-addis-ababa",
        website: null,
        source: "open-dataset",
        // Situada a 14.3 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-dynamic-international-university-college",
        name: "Dynamic International University College",
        cityId: "etiopia-addis-ababa",
        website: null,
        source: "open-dataset",
        // Situada a 5.1 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-ethiopian-civil-service-university",
        name: "Ethiopian Civil Service University",
        cityId: "etiopia-addis-ababa",
        website: "http://www.ecsc.edu.et/",
        source: "open-dataset",
        // Situada a 9.6 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-grace-college-of-business-and-computer-science",
        name: "Grace College of Business and Computer Science",
        cityId: "etiopia-addis-ababa",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-rift-valley-university-college",
        name: "Rift Valley University College",
        cityId: "etiopia-addis-ababa",
        website: null,
        source: "open-dataset",
        // Situada a 6.4 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-royal-college-addis-abeba",
        name: "Royal College, Addis Abeba",
        cityId: "etiopia-addis-ababa",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-addis-ababa-institute-of-technology",
        name: "Addis Ababa Institute of Technology",
        cityId: "etiopia-addis-ababa",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Addis Ababa (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-addis-ababa-unity-university",
        name: "Unity University",
        cityId: "etiopia-addis-ababa",
        website: "http://www.uuc.edu.et/",
        source: "open-dataset",
        // Situada a 6.6 km del centro de Addis Ababa (Wikidata).
      }),
  ],
  "etiopia-metu": [
      defineUniversity({
        id: "etiopia-metu-mattu-university",
        name: "Mattu University",
        cityId: "etiopia-metu",
        website: null,
        source: "open-dataset",
        // Situada a 3.4 km del centro de Metu (Wikidata).
      }),
      defineUniversity({
        id: "etiopia-metu-mattu-university",
        name: "Mattu University",
        cityId: "etiopia-metu",
        website: null,
        source: "open-dataset",
        // Situada a 3.4 km del centro de Metu (Wikidata).
      }),
  ],
};
