// Universidades por ciudad de Malta. Generado; no editar a mano.
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
  "malta-valletta": [
      defineUniversity({
        id: "malta-valletta-pegaso-international",
        name: "Pegaso International",
        cityId: "malta-valletta",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Valletta (Wikidata).
      }),
      defineUniversity({
        id: "malta-valletta-collegium-melitense",
        name: "Collegium Melitense",
        cityId: "malta-valletta",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Valletta (Wikidata).
      }),
      defineUniversity({
        id: "malta-valletta-london-school-of-commerce-valletta",
        name: "London School of Commerce, Valletta",
        cityId: "malta-valletta",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Valletta (Wikidata).
      }),
      defineUniversity({
        id: "malta-valletta-royal-university-of-malta",
        name: "Royal University of Malta",
        cityId: "malta-valletta",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Valletta (Wikidata).
      }),
      defineUniversity({
        id: "malta-valletta-med-e-a-university",
        name: "MED.E.A. University",
        cityId: "malta-valletta",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Valletta (Wikidata).
      }),
  ],
};
