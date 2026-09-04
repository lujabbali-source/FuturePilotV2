// Universidades por ciudad de Samoa. Generado; no editar a mano.
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
  "samoa-apia": [
      defineUniversity({
        id: "samoa-apia-national-university-of-samoa",
        name: "National University of Samoa",
        cityId: "samoa-apia",
        website: "http://www.nus.edu.ws/",
        source: "open-dataset",
        // Situada a 2.6 km del centro de Apia (Wikidata).
      }),
  ],
};
