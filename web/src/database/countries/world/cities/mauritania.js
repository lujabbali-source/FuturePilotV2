// Universidades por ciudad de Mauritania. Generado; no editar a mano.
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
  "mauritania-ksar": [
      defineUniversity({
        id: "mauritania-ksar-universite-libanaise-internationale-en-mauritanie",
        name: "Université Libanaise Internationale en Mauritanie",
        cityId: "mauritania-ksar",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Ksar (Wikidata).
      }),
      defineUniversity({
        id: "mauritania-ksar-universite-des-sciences-de-technologie-et-de-medecine",
        name: "Université des Sciences, de Technologie et de Médecine",
        cityId: "mauritania-ksar",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Ksar (Wikidata).
      }),
  ],
};
