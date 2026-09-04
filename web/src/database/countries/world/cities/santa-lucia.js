// Universidades por ciudad de Santa Lucía. Generado; no editar a mano.
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
  "santa-lucia-gros-islet": [
      defineUniversity({
        id: "santa-lucia-gros-islet-american-international-medical-university",
        name: "American International Medical University",
        cityId: "santa-lucia-gros-islet",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Gros Islet (Wikidata).
      }),
  ],
  "santa-lucia-castries": [
      defineUniversity({
        id: "santa-lucia-castries-spartan-health-sciences-university",
        name: "Spartan Health Sciences University",
        cityId: "santa-lucia-castries",
        website: null,
        source: "open-dataset",
        // Situada a 27.7 km del centro de Castries (Wikidata).
      }),
  ],
};
