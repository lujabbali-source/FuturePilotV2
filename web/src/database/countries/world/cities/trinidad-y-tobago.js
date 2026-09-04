// Universidades por ciudad de Trinidad y Tobago. Generado; no editar a mano.
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
  "trinidad-y-tobago-tunapuna": [
      defineUniversity({
        id: "trinidad-y-tobago-tunapuna-university-of-the-southern-caribbean",
        name: "University of the Southern Caribbean",
        cityId: "trinidad-y-tobago-tunapuna",
        website: "http://www.usc.edu.tt/",
        source: "open-dataset",
        // Situada a 5.0 km del centro de Tunapuna (Wikidata).
      }),
      defineUniversity({
        id: "trinidad-y-tobago-tunapuna-university-of-the-southern-caribbean",
        name: "University of the Southern Caribbean",
        cityId: "trinidad-y-tobago-tunapuna",
        website: "http://www.usc.edu.tt/",
        source: "open-dataset",
        // Situada a 5.0 km del centro de Tunapuna (Wikidata).
      }),
  ],
};
