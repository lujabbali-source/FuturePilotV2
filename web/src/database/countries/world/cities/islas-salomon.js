// Universidades por ciudad de Islas Salomón. Generado; no editar a mano.
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
  "islas-salomon-honiara": [
      defineUniversity({
        id: "islas-salomon-honiara-solomon-islands-national-university",
        name: "Solomon Islands National University",
        cityId: "islas-salomon-honiara",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Honiara (Wikidata).
      }),
      defineUniversity({
        id: "islas-salomon-honiara-honiara-solomon-islands-college-of-higher-education",
        name: "Honiara Solomon Islands College of Higher Education",
        cityId: "islas-salomon-honiara",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Honiara (Wikidata).
      }),
      defineUniversity({
        id: "islas-salomon-honiara-university-of-the-south-pacific-solomon-islands",
        name: "University of the South Pacific Solomon Islands",
        cityId: "islas-salomon-honiara",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Honiara (Wikidata).
      }),
      defineUniversity({
        id: "islas-salomon-honiara-woodford-international-school",
        name: "Woodford International School",
        cityId: "islas-salomon-honiara",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Honiara (Wikidata).
      }),
  ],
};
