// Universidades por ciudad de Islas Caimán. Generado; no editar a mano.
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
  "islas-caiman-george-town": [
      defineUniversity({
        id: "islas-caiman-george-town-university-college-of-the-cayman-islands",
        name: "University College of the Cayman Islands",
        cityId: "islas-caiman-george-town",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de George Town (Wikidata).
      }),
      defineUniversity({
        id: "islas-caiman-george-town-the-cayman-islands-civil-service-college",
        name: "The Cayman Islands Civil Service College",
        cityId: "islas-caiman-george-town",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de George Town (Wikidata).
      }),
  ],
};
