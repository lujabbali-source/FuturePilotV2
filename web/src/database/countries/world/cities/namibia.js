// Universidades por ciudad de Namibia. Generado; no editar a mano.
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
  "namibia-windhoek": [
      defineUniversity({
        id: "namibia-windhoek-university-of-namibia",
        name: "University of Namibia",
        cityId: "namibia-windhoek",
        website: "http://www.unam.na/",
        source: "open-dataset",
        // Situada a 6.3 km del centro de Windhoek (Wikidata).
      }),
      defineUniversity({
        id: "namibia-windhoek-namibia-university-of-science-and-technology",
        name: "Namibia University of Science and Technology",
        cityId: "namibia-windhoek",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Windhoek (Wikidata).
      }),
      defineUniversity({
        id: "namibia-windhoek-college-of-the-arts-windhoek",
        name: "College of the Arts, Windhoek",
        cityId: "namibia-windhoek",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Windhoek (Wikidata).
      }),
  ],
};
