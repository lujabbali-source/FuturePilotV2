// Universidades por ciudad de Surinam. Generado; no editar a mano.
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
  "surinam-rainville": [
      defineUniversity({
        id: "surinam-rainville-south-american-international-university",
        name: "South American International University",
        cityId: "surinam-rainville",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Rainville (Wikidata).
      }),
  ],
  "surinam-tammenga": [
      defineUniversity({
        id: "surinam-tammenga-international-business-school-americas-europe",
        name: "International Business School Americas Europe",
        cityId: "surinam-tammenga",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Tammenga (Wikidata).
      }),
  ],
  "surinam-latour": [
      defineUniversity({
        id: "surinam-latour-anton-de-kom-university-of-suriname",
        name: "Anton de Kom University of Suriname",
        cityId: "surinam-latour",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Latour (Wikidata).
      }),
  ],
};
