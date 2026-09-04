// Universidades por ciudad de Somalia. Generado; no editar a mano.
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
  "somalia-mogadishu": [
      defineUniversity({
        id: "somalia-mogadishu-zamzam-university-of-science-and-technology",
        name: "Zamzam University of Science and Technology",
        cityId: "somalia-mogadishu",
        website: null,
        source: "open-dataset",
        // Situada a 9.6 km del centro de Mogadishu (Wikidata).
      }),
      defineUniversity({
        id: "somalia-mogadishu-jobkey-university",
        name: "Jobkey University",
        cityId: "somalia-mogadishu",
        website: null,
        source: "open-dataset",
        // Situada a 4.4 km del centro de Mogadishu (Wikidata).
      }),
      defineUniversity({
        id: "somalia-mogadishu-somali-national-university",
        name: "Somali National University",
        cityId: "somalia-mogadishu",
        website: null,
        source: "open-dataset",
        // Situada a 6.3 km del centro de Mogadishu (Wikidata).
      }),
      defineUniversity({
        id: "somalia-mogadishu-university-of-somalia",
        name: "University of Somalia",
        cityId: "somalia-mogadishu",
        website: "http://www.universityofsomalia.net/",
        source: "open-dataset",
        // Situada a 4.0 km del centro de Mogadishu (Wikidata).
      }),
      defineUniversity({
        id: "somalia-mogadishu-benadir-university",
        name: "Benadir University",
        cityId: "somalia-mogadishu",
        website: "http://www.benadiruniversity.net/",
        source: "open-dataset",
        // Situada a 12.5 km del centro de Mogadishu (Wikidata).
      }),
      defineUniversity({
        id: "somalia-mogadishu-mogadishu-university",
        name: "Mogadishu University",
        cityId: "somalia-mogadishu",
        website: "http://www.mogadishuuniversity.com/",
        source: "open-dataset",
        // Situada a 8.2 km del centro de Mogadishu (Wikidata).
      }),
  ],
  "somalia-hargeysa": [
      defineUniversity({
        id: "somalia-hargeysa-barwaaqo-university",
        name: "Barwaaqo University",
        cityId: "somalia-hargeysa",
        website: null,
        source: "open-dataset",
        // Situada a 29.5 km del centro de Hargeysa (Wikidata).
      }),
      defineUniversity({
        id: "somalia-hargeysa-gollis-university",
        name: "Gollis University",
        cityId: "somalia-hargeysa",
        website: "http://www.gollisuniversity.com/",
        source: "open-dataset",
        // Situada a 2.9 km del centro de Hargeysa (Wikidata).
      }),
      defineUniversity({
        id: "somalia-hargeysa-admas-university-college",
        name: "Admas University College",
        cityId: "somalia-hargeysa",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Hargeysa (Wikidata).
      }),
  ],
};
