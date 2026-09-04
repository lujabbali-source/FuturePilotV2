// Universidades por ciudad de Congo. Generado; no editar a mano.
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
  "congo-brazzaville": [
      defineUniversity({
        id: "congo-brazzaville-marien-ngouabi-university",
        name: "Marien Ngouabi University",
        cityId: "congo-brazzaville",
        website: null,
        source: "open-dataset",
        // Situada a 4.1 km del centro de Brazzaville (Wikidata).
      }),
      defineUniversity({
        id: "congo-brazzaville-universite-denis-sassou-nguesso",
        name: "Université Denis Sassou Nguesso",
        cityId: "congo-brazzaville",
        website: null,
        source: "open-dataset",
        // Situada a 16.5 km del centro de Brazzaville (Wikidata).
      }),
      defineUniversity({
        id: "congo-brazzaville-free-university-of-congo",
        name: "Free University of Congo",
        cityId: "congo-brazzaville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Brazzaville (Wikidata).
      }),
  ],
};
