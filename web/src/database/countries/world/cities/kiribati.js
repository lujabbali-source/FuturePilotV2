// Universidades por ciudad de Kiribati. Generado; no editar a mano.
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
  "kiribati-tarawa": [
      defineUniversity({
        id: "kiribati-tarawa-university-of-the-south-pacific-center",
        name: "University of the South Pacific Center",
        cityId: "kiribati-tarawa",
        website: null,
        source: "open-dataset",
        // Situada a 4.1 km del centro de Tarawa (Wikidata).
      }),
      defineUniversity({
        id: "kiribati-tarawa-marine-training-centre",
        name: "Marine Training Centre",
        cityId: "kiribati-tarawa",
        website: null,
        source: "open-dataset",
        // Situada a 5.1 km del centro de Tarawa (Wikidata).
      }),
  ],
};
