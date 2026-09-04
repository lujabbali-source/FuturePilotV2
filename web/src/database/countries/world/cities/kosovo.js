// Universidades por ciudad de Kosovo. Generado; no editar a mano.
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
  "kosovo-pristina": [
      defineUniversity({
        id: "kosovo-pristina-university-of-pristina-1969-1999",
        name: "University of Pristina (1969–1999)",
        cityId: "kosovo-pristina",
        website: null,
        source: "open-dataset",
        // Situada a 2.7 km del centro de Pristina (Wikidata).
      }),
      defineUniversity({
        id: "kosovo-pristina-iliria-college",
        name: "Iliria College",
        cityId: "kosovo-pristina",
        website: "http://www.uiliria.org/",
        source: "open-dataset",
        // Situada a 1.9 km del centro de Pristina (Wikidata).
      }),
      defineUniversity({
        id: "kosovo-pristina-university-for-business-and-technology",
        name: "University for Business and Technology",
        cityId: "kosovo-pristina",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Pristina (Wikidata).
      }),
      defineUniversity({
        id: "kosovo-pristina-university-of-pristina",
        name: "University of Pristina",
        cityId: "kosovo-pristina",
        website: "http://www.pr.ac.rs/",
        source: "open-dataset",
        // Situada a 1.6 km del centro de Pristina (Wikidata).
      }),
      defineUniversity({
        id: "kosovo-pristina-faculty-of-construction-and-architecture-of-the-university-of-pristina",
        name: "Faculty of Construction and Architecture of the University of Pristina",
        cityId: "kosovo-pristina",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Pristina (Wikidata).
      }),
      defineUniversity({
        id: "kosovo-pristina-rit-kosovo",
        name: "RIT Kosovo",
        cityId: "kosovo-pristina",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Pristina (Wikidata).
      }),
  ],
};
