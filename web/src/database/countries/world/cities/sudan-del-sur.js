// Universidades por ciudad de Sudán del Sur. Generado; no editar a mano.
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
  "sudan-del-sur-juba": [
      defineUniversity({
        id: "sudan-del-sur-juba-university-of-juba",
        name: "University of Juba",
        cityId: "sudan-del-sur-juba",
        website: "http://www.juba.edu.sd/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Juba (Wikidata).
      }),
      defineUniversity({
        id: "sudan-del-sur-juba-st-mary-s-university-in-juba",
        name: "St. Mary's University in Juba",
        cityId: "sudan-del-sur-juba",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Juba (Wikidata).
      }),
      defineUniversity({
        id: "sudan-del-sur-juba-the-bridge-university",
        name: "The Bridge University",
        cityId: "sudan-del-sur-juba",
        website: null,
        source: "open-dataset",
        // Situada a 2.7 km del centro de Juba (Wikidata).
      }),
      defineUniversity({
        id: "sudan-del-sur-juba-ramciel-university",
        name: "Ramciel University",
        cityId: "sudan-del-sur-juba",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Juba (Wikidata).
      }),
  ],
  "sudan-del-sur-wau": [
      defineUniversity({
        id: "sudan-del-sur-wau-catholic-university-of-south-sudan",
        name: "Catholic University of South Sudan",
        cityId: "sudan-del-sur-wau",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Wau (Wikidata).
      }),
      defineUniversity({
        id: "sudan-del-sur-wau-university-of-bahr-el-ghazal",
        name: "University of Bahr El-Ghazal",
        cityId: "sudan-del-sur-wau",
        website: null,
        source: "open-dataset",
        // Situada a 3.7 km del centro de Wau (Wikidata).
      }),
  ],
};
