// Universidades por ciudad de Mozambique. Generado; no editar a mano.
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
  "mozambique-nampula": [
      defineUniversity({
        id: "mozambique-nampula-lurio-university",
        name: "Lúrio University",
        cityId: "mozambique-nampula",
        website: null,
        source: "open-dataset",
        // Situada a 4.9 km del centro de Nampula (Wikidata).
      }),
  ],
  "mozambique-maputo": [
      defineUniversity({
        id: "mozambique-maputo-maputo-university",
        name: "Maputo University",
        cityId: "mozambique-maputo",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Maputo (Wikidata).
      }),
      defineUniversity({
        id: "mozambique-maputo-eduardo-mondlane-university",
        name: "Eduardo Mondlane University",
        cityId: "mozambique-maputo",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Maputo (Wikidata).
      }),
  ],
  "mozambique-chimoio": [
      defineUniversity({
        id: "mozambique-chimoio-instituto-superior-politecnico-de-manica",
        name: "Instituto Superior Politécnico de Manica",
        cityId: "mozambique-chimoio",
        website: null,
        source: "open-dataset",
        // Situada a 11.8 km del centro de Chimoio (Wikidata).
      }),
      defineUniversity({
        id: "mozambique-chimoio-instituto-superior-politecnico-de-manica",
        name: "Instituto Superior Politécnico de Manica",
        cityId: "mozambique-chimoio",
        website: null,
        source: "open-dataset",
        // Situada a 11.8 km del centro de Chimoio (Wikidata).
      }),
  ],
  "mozambique-beira": [
      defineUniversity({
        id: "mozambique-beira-zambezi-university",
        name: "Zambezi University",
        cityId: "mozambique-beira",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Beira (Wikidata).
      }),
      defineUniversity({
        id: "mozambique-beira-catholic-university-of-mozambique",
        name: "Catholic University of Mozambique",
        cityId: "mozambique-beira",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Beira (Wikidata).
      }),
  ],
};
