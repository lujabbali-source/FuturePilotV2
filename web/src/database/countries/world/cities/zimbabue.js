// Universidades por ciudad de Zimbabue. Generado; no editar a mano.
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
  "zimbabue-harare": [
      defineUniversity({
        id: "zimbabue-harare-harare-polytechnic",
        name: "Harare Polytechnic",
        cityId: "zimbabue-harare",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Harare (Wikidata).
      }),
      defineUniversity({
        id: "zimbabue-harare-harare-institute-of-technology",
        name: "Harare Institute of Technology",
        cityId: "zimbabue-harare",
        website: "http://www.hit.ac.zw/",
        source: "open-dataset",
        // Situada a 4.9 km del centro de Harare (Wikidata).
      }),
      defineUniversity({
        id: "zimbabue-harare-harare-institute-of-technology",
        name: "Harare Institute of Technology",
        cityId: "zimbabue-harare",
        website: "http://www.hit.ac.zw/",
        source: "open-dataset",
        // Situada a 4.9 km del centro de Harare (Wikidata).
      }),
      defineUniversity({
        id: "zimbabue-harare-university-of-zimbabwe",
        name: "University of Zimbabwe",
        cityId: "zimbabue-harare",
        website: "http://www.uz.ac.zw/",
        source: "open-dataset",
        // Situada a 4.9 km del centro de Harare (Wikidata).
      }),
      defineUniversity({
        id: "zimbabue-harare-catholic-university-of-zimbabwe",
        name: "Catholic University of Zimbabwe",
        cityId: "zimbabue-harare",
        website: null,
        source: "open-dataset",
        // Situada a 4.8 km del centro de Harare (Wikidata).
      }),
      defineUniversity({
        id: "zimbabue-harare-zimbabwe-open-university",
        name: "Zimbabwe Open University",
        cityId: "zimbabue-harare",
        website: "http://www.zou.ac.zw/",
        source: "open-dataset",
        // Situada a 5.0 km del centro de Harare (Wikidata).
      }),
  ],
  "zimbabue-masvingo": [
      defineUniversity({
        id: "zimbabue-masvingo-reformed-church-university",
        name: "Reformed Church University",
        cityId: "zimbabue-masvingo",
        website: "http://www.rcu.ac.zw/",
        source: "open-dataset",
        // Situada a 5.9 km del centro de Masvingo (Wikidata).
      }),
      defineUniversity({
        id: "zimbabue-masvingo-great-zimbabwe-university",
        name: "Great Zimbabwe University",
        cityId: "zimbabue-masvingo",
        website: "http://www.gzu.ac.zw/",
        source: "open-dataset",
        // Situada a 5.7 km del centro de Masvingo (Wikidata).
      }),
  ],
  "zimbabue-bulawayo": [
      defineUniversity({
        id: "zimbabue-bulawayo-bulawayo-polytechnic-college",
        name: "Bulawayo Polytechnic College",
        cityId: "zimbabue-bulawayo",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Bulawayo (Wikidata).
      }),
      defineUniversity({
        id: "zimbabue-bulawayo-national-university-of-science-and-technology-zimbabwe",
        name: "National University of Science and Technology, Zimbabwe",
        cityId: "zimbabue-bulawayo",
        website: null,
        source: "open-dataset",
        // Situada a 6.3 km del centro de Bulawayo (Wikidata).
      }),
  ],
};
