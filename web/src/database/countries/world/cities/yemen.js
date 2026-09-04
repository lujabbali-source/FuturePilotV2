// Universidades por ciudad de Yemen. Generado; no editar a mano.
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
  "yemen-sanaa": [
      defineUniversity({
        id: "yemen-sanaa-emirates-international-university",
        name: "Emirates International University",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a 5.2 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-lebanese-international-university-yemen",
        name: "Lebanese International University, Yemen",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a 7.4 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-sanaa-university",
        name: "Sanaa University",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-queen-arwa-university",
        name: "Queen Arwa University",
        cityId: "yemen-sanaa",
        website: "http://www.arwauniversity.org/",
        source: "open-dataset",
        // Situada a 3.9 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-queen-arwa-university",
        name: "Queen Arwa University",
        cityId: "yemen-sanaa",
        website: "http://www.arwauniversity.org/",
        source: "open-dataset",
        // Situada a 3.9 km del centro de Sanaa (Wikidata).
      }),
  ],
  "yemen-mukalla": [
      defineUniversity({
        id: "yemen-mukalla-hadhramout-university",
        name: "Hadhramout University",
        cityId: "yemen-mukalla",
        website: null,
        source: "open-dataset",
        // Situada a 13.8 km del centro de Mukalla (Wikidata).
      }),
      defineUniversity({
        id: "yemen-mukalla-hadhramout-university",
        name: "Hadhramout University",
        cityId: "yemen-mukalla",
        website: null,
        source: "open-dataset",
        // Situada a 13.8 km del centro de Mukalla (Wikidata).
      }),
  ],
};
