// Universidades por ciudad de Bután. Generado; no editar a mano.
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
  "butan-thimphu": [
      defineUniversity({
        id: "butan-thimphu-royal-institute-of-health-sciences",
        name: "Royal Institute of Health Sciences",
        cityId: "butan-thimphu",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Thimphu (Wikidata).
      }),
      defineUniversity({
        id: "butan-thimphu-paro-college-of-education",
        name: "Paro College of Education",
        cityId: "butan-thimphu",
        website: null,
        source: "open-dataset",
        // Situada a 22.3 km del centro de Thimphu (Wikidata).
      }),
      defineUniversity({
        id: "butan-thimphu-royal-university-of-bhutan",
        name: "Royal University of Bhutan",
        cityId: "butan-thimphu",
        website: "http://www.rub.edu.bt/",
        source: "open-dataset",
        // Situada a None km del centro de Thimphu (Wikidata).
      }),
      defineUniversity({
        id: "butan-thimphu-khesar-gyalpo-university-of-medical-sciences-of-bhutan",
        name: "Khesar Gyalpo University of Medical Sciences of Bhutan",
        cityId: "butan-thimphu",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Thimphu (Wikidata).
      }),
  ],
  "butan-phuntsholing": [
      defineUniversity({
        id: "butan-phuntsholing-college-of-science-and-technology",
        name: "College of Science and Technology",
        cityId: "butan-phuntsholing",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Phuntsholing (Wikidata).
      }),
      defineUniversity({
        id: "butan-phuntsholing-gaeddu-college-of-business-studies",
        name: "Gaeddu College of Business Studies",
        cityId: "butan-phuntsholing",
        website: null,
        source: "open-dataset",
        // Situada a 15.4 km del centro de Phuntsholing (Wikidata).
      }),
  ],
};
