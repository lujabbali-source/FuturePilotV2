// Universidades por ciudad de Guinea Ecuatorial. Generado; no editar a mano.
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
  "guinea-ecuatorial-malabo": [
      defineUniversity({
        id: "guinea-ecuatorial-malabo-national-university-of-equatorial-guinea",
        name: "National University of Equatorial Guinea",
        cityId: "guinea-ecuatorial-malabo",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Malabo (Wikidata).
      }),
  ],
  "guinea-ecuatorial-bata": [
      defineUniversity({
        id: "guinea-ecuatorial-bata-campus-uned-guinea-ecuatorial",
        name: "Campus UNED Guinea Ecuatorial",
        cityId: "guinea-ecuatorial-bata",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Bata (Wikidata).
      }),
  ],
  "guinea-ecuatorial-ciudad-de-la-paz": [
      defineUniversity({
        id: "guinea-ecuatorial-ciudad-de-la-paz-afro-american-university-of-central-africa",
        name: "Afro-American University of Central Africa",
        cityId: "guinea-ecuatorial-ciudad-de-la-paz",
        website: null,
        source: "open-dataset",
        // Situada a 4.3 km del centro de Ciudad de la Paz (Wikidata).
      }),
  ],
};
