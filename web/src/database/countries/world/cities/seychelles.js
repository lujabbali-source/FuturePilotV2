// Universidades por ciudad de Seychelles. Generado; no editar a mano.
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
  "seychelles-victoria": [
      defineUniversity({
        id: "seychelles-victoria-university-of-seychelles",
        name: "University of Seychelles",
        cityId: "seychelles-victoria",
        website: "http://www.unisey.ac.sc/",
        source: "open-dataset",
        // Situada a 15.0 km del centro de Victoria (Wikidata).
      }),
  ],
};
