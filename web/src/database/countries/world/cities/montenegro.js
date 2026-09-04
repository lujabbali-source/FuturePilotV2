// Universidades por ciudad de Montenegro. Generado; no editar a mano.
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
  "montenegro-podgorica": [
      defineUniversity({
        id: "montenegro-podgorica-university-of-donja-gorica",
        name: "University of Donja Gorica",
        cityId: "montenegro-podgorica",
        website: null,
        source: "open-dataset",
        // Situada a 5.6 km del centro de Podgorica (Wikidata).
      }),
      defineUniversity({
        id: "montenegro-podgorica-university-of-montenegro",
        name: "University of Montenegro",
        cityId: "montenegro-podgorica",
        website: "http://www.ucg.cg.ac.yu/",
        source: "open-dataset",
        // Situada a 1.7 km del centro de Podgorica (Wikidata).
      }),
      defineUniversity({
        id: "montenegro-podgorica-mediterranean-university",
        name: "Mediterranean University",
        cityId: "montenegro-podgorica",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Podgorica (Wikidata).
      }),
  ],
};
