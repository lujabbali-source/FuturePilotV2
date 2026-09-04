// Universidades por ciudad de Papúa Nueva Guinea. Generado; no editar a mano.
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
  "papua-nueva-guinea-port-moresby": [
      defineUniversity({
        id: "papua-nueva-guinea-port-moresby-pacific-adventist-university",
        name: "Pacific Adventist University",
        cityId: "papua-nueva-guinea-port-moresby",
        website: "http://www.pau.ac.pg/",
        source: "open-dataset",
        // Situada a 15.8 km del centro de Port Moresby (Wikidata).
      }),
      defineUniversity({
        id: "papua-nueva-guinea-port-moresby-university-of-papua-new-guinea",
        name: "University of Papua New Guinea",
        cityId: "papua-nueva-guinea-port-moresby",
        website: "http://www.upng.ac.pg/",
        source: "open-dataset",
        // Situada a 8.3 km del centro de Port Moresby (Wikidata).
      }),
      defineUniversity({
        id: "papua-nueva-guinea-port-moresby-institute-of-business-studies",
        name: "Institute of Business Studies",
        cityId: "papua-nueva-guinea-port-moresby",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Port Moresby (Wikidata).
      }),
  ],
  "papua-nueva-guinea-kokopo": [
      defineUniversity({
        id: "papua-nueva-guinea-kokopo-papua-new-guinea-university-of-natural-resources-and-environment",
        name: "Papua New Guinea University of Natural Resources and Environment",
        cityId: "papua-nueva-guinea-kokopo",
        website: null,
        source: "open-dataset",
        // Situada a 28.8 km del centro de Kokopo (Wikidata).
      }),
      defineUniversity({
        id: "papua-nueva-guinea-kokopo-sonoma-adventist-college",
        name: "Sonoma Adventist College",
        cityId: "papua-nueva-guinea-kokopo",
        website: null,
        source: "open-dataset",
        // Situada a 9.2 km del centro de Kokopo (Wikidata).
      }),
  ],
};
