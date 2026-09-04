// Universidades por ciudad de Groenlandia. Generado; no editar a mano.
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
  "groenlandia-nuuk": [
      defineUniversity({
        id: "groenlandia-nuuk-university-of-greenland",
        name: "University of Greenland",
        cityId: "groenlandia-nuuk",
        website: "http://www.ilisimatusarfik.gl/",
        source: "open-dataset",
        // Situada a 1.5 km del centro de Nuuk (Wikidata).
      }),
  ],
};
