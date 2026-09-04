// Universidades por ciudad de Macao. Generado; no editar a mano.
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
  "macao-taipa": [
      defineUniversity({
        id: "macao-taipa-macau-university-of-science-and-technology",
        name: "Macau University of Science and Technology",
        cityId: "macao-taipa",
        website: "http://www.must.edu.mo/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Taipa (Wikidata).
      }),
  ],
  "macao-lai-chi-van": [
      defineUniversity({
        id: "macao-lai-chi-van-university-of-macau",
        name: "University of Macau",
        cityId: "macao-lai-chi-van",
        website: "http://www.um.edu.mo/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Lai Chi Van (Wikidata).
      }),
  ],
  "macao-zhuojiacun": [
      defineUniversity({
        id: "macao-zhuojiacun-city-university-of-macau",
        name: "City University of Macau",
        cityId: "macao-zhuojiacun",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Zhuojiacun (Wikidata).
      }),
  ],
  "macao-se": [
      defineUniversity({
        id: "macao-se-macao-polytechnic-university",
        name: "Macao Polytechnic University",
        cityId: "macao-se",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Sé (Wikidata).
      }),
  ],
};
