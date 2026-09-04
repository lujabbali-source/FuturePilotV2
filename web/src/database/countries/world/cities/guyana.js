// Universidades por ciudad de Guyana. Generado; no editar a mano.
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
  "guyana-georgetown": [
      defineUniversity({
        id: "guyana-georgetown-university-of-guyana",
        name: "University of Guyana",
        cityId: "guyana-georgetown",
        website: "http://www.uog.edu.gy/",
        source: "open-dataset",
        // Situada a 4.3 km del centro de Georgetown (Wikidata).
      }),
      defineUniversity({
        id: "guyana-georgetown-texila-american-university",
        name: "Texila American University",
        cityId: "guyana-georgetown",
        website: "http://www.tauedu.org/",
        source: "open-dataset",
        // Situada a 5.5 km del centro de Georgetown (Wikidata).
      }),
      defineUniversity({
        id: "guyana-georgetown-georgetown-american-university",
        name: "Georgetown American University",
        cityId: "guyana-georgetown",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Georgetown (Wikidata).
      }),
      defineUniversity({
        id: "guyana-georgetown-gemsville-technical-university",
        name: "Gemsville Technical University",
        cityId: "guyana-georgetown",
        website: "http://www.gemsvilleuniversity.com/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Georgetown (Wikidata).
      }),
  ],
};
