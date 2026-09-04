// Universidades por ciudad de Madagascar. Generado; no editar a mano.
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
  "madagascar-antananarivo": [
      defineUniversity({
        id: "madagascar-antananarivo-accem",
        name: "ACCEM",
        cityId: "madagascar-antananarivo",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Antananarivo (Wikidata).
      }),
      defineUniversity({
        id: "madagascar-antananarivo-university-of-antananarivo",
        name: "University of Antananarivo",
        cityId: "madagascar-antananarivo",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Antananarivo (Wikidata).
      }),
      defineUniversity({
        id: "madagascar-antananarivo-inscae",
        name: "INSCAE",
        cityId: "madagascar-antananarivo",
        website: null,
        source: "open-dataset",
        // Situada a 3.3 km del centro de Antananarivo (Wikidata).
      }),
  ],
  "madagascar-antsirabe": [
      defineUniversity({
        id: "madagascar-antsirabe-military-academy-of-antsirabe",
        name: "Military Academy of Antsirabe",
        cityId: "madagascar-antsirabe",
        website: null,
        source: "open-dataset",
        // Situada a 0.1 km del centro de Antsirabe (Wikidata).
      }),
      defineUniversity({
        id: "madagascar-antsirabe-military-academy-of-antsirabe",
        name: "Military Academy of Antsirabe",
        cityId: "madagascar-antsirabe",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Antsirabe (Wikidata).
      }),
  ],
};
