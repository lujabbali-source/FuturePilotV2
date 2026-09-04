// Universidades por ciudad de Belice. Generado; no editar a mano.
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
  "belice-orange-walk": [
      defineUniversity({
        id: "belice-orange-walk-centro-escolar-mexico-junior-college",
        name: "Centro Escolar Mexico Junior College",
        cityId: "belice-orange-walk",
        website: null,
        source: "open-dataset",
        // Situada a 25.5 km del centro de Orange Walk (Wikidata).
      }),
      defineUniversity({
        id: "belice-orange-walk-muffles-junior-college",
        name: "Muffles Junior College",
        cityId: "belice-orange-walk",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Orange Walk (Wikidata).
      }),
  ],
  "belice-belmopan": [
      defineUniversity({
        id: "belice-belmopan-university-of-belize-central-campus",
        name: "University of Belize, Central Campus",
        cityId: "belice-belmopan",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Belmopan (Wikidata).
      }),
      defineUniversity({
        id: "belice-belmopan-university-of-belize",
        name: "University of Belize",
        cityId: "belice-belmopan",
        website: "http://www.ub.edu.bz/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Belmopan (Wikidata).
      }),
  ],
  "belice-belize-city": [
      defineUniversity({
        id: "belice-belize-city-st-john-s-college-belize",
        name: "St. John's College, Belize",
        cityId: "belice-belize-city",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Belize City (Wikidata).
      }),
      defineUniversity({
        id: "belice-belize-city-wesley-junior-college",
        name: "Wesley Junior College",
        cityId: "belice-belize-city",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Belize City (Wikidata).
      }),
  ],
};
