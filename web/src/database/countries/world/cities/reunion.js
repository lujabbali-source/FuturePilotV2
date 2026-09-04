// Universidades por ciudad de Reunión. Generado; no editar a mano.
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
  "reunion-sainte-marie": [
      defineUniversity({
        id: "reunion-sainte-marie-etablissement-de-la-ressource",
        name: "Établissement de La Ressource",
        cityId: "reunion-sainte-marie",
        website: null,
        source: "open-dataset",
        // Situada a 4.4 km del centro de Sainte-Marie (Wikidata).
      }),
  ],
  "reunion-saint-denis": [
      defineUniversity({
        id: "reunion-saint-denis-university-of-la-reunion",
        name: "University of La Réunion",
        cityId: "reunion-saint-denis",
        website: null,
        source: "open-dataset",
        // Situada a 4.1 km del centro de Saint-Denis (Wikidata).
      }),
  ],
};
