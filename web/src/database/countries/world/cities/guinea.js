// Universidades por ciudad de Guinea. Generado; no editar a mano.
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
  "guinea-dixinn": [
      defineUniversity({
        id: "guinea-dixinn-mahatma-gandhi-university",
        name: "Mahatma Gandhi University",
        cityId: "guinea-dixinn",
        website: null,
        source: "open-dataset",
        // Situada a 12.3 km del centro de Dixinn (Wikidata).
      }),
      defineUniversity({
        id: "guinea-dixinn-kofi-annan-university-of-guinea",
        name: "Kofi Annan University of Guinea",
        cityId: "guinea-dixinn",
        website: null,
        source: "open-dataset",
        // Situada a 8.1 km del centro de Dixinn (Wikidata).
      }),
      defineUniversity({
        id: "guinea-dixinn-nongo-conakry-university",
        name: "Nongo Conakry University",
        cityId: "guinea-dixinn",
        website: null,
        source: "open-dataset",
        // Situada a 8.5 km del centro de Dixinn (Wikidata).
      }),
      defineUniversity({
        id: "guinea-dixinn-international-university-cheick-modibo-diarra",
        name: "International University Cheick Modibo Diarra",
        cityId: "guinea-dixinn",
        website: null,
        source: "open-dataset",
        // Situada a 8.4 km del centro de Dixinn (Wikidata).
      }),
  ],
};
