// Universidades por ciudad de Guadalupe. Generado; no editar a mano.
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
  "guadalupe-pointe-a-pitre": [
      defineUniversity({
        id: "guadalupe-pointe-a-pitre-university-of-the-french-antilles",
        name: "University of the French Antilles",
        cityId: "guadalupe-pointe-a-pitre",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Pointe-à-Pitre (Wikidata).
      }),
  ],
};
