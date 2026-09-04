// Universidades por ciudad de Islandia. Generado; no editar a mano.
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
  "islandia-reykjavik": [
      defineUniversity({
        id: "islandia-reykjavik-university-of-iceland",
        name: "University of Iceland",
        cityId: "islandia-reykjavik",
        website: "http://www.hi.is/",
        source: "open-dataset",
        // Situada a 2.7 km del centro de Reykjavík (Wikidata).
      }),
      defineUniversity({
        id: "islandia-reykjavik-university-of-iceland-school-of-education",
        name: "University of Iceland -School of Education",
        cityId: "islandia-reykjavik",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Reykjavík (Wikidata).
      }),
      defineUniversity({
        id: "islandia-reykjavik-iceland-university-of-the-arts",
        name: "Iceland University of the Arts",
        cityId: "islandia-reykjavik",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Reykjavík (Wikidata).
      }),
      defineUniversity({
        id: "islandia-reykjavik-technical-university-of-iceland",
        name: "Technical University of Iceland",
        cityId: "islandia-reykjavik",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Reykjavík (Wikidata).
      }),
  ],
};
