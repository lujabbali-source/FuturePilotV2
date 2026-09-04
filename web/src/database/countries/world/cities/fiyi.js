// Universidades por ciudad de Fiyi. Generado; no editar a mano.
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
  "fiyi-suva": [
      defineUniversity({
        id: "fiyi-suva-university-of-the-south-pacific",
        name: "University of the South Pacific",
        cityId: "fiyi-suva",
        website: "http://www.usp.ac.fj/",
        source: "open-dataset",
        // Situada a 2.4 km del centro de Suva (Wikidata).
      }),
      defineUniversity({
        id: "fiyi-suva-fiji-national-university",
        name: "Fiji National University",
        cityId: "fiyi-suva",
        website: "http://www.fnu.ac.fj/",
        source: "open-dataset",
        // Situada a 1.8 km del centro de Suva (Wikidata).
      }),
      defineUniversity({
        id: "fiyi-suva-university-of-fiji",
        name: "university of Fiji",
        cityId: "fiyi-suva",
        website: "http://www.unifiji.ac.fj/",
        source: "open-dataset",
        // Situada a 2.7 km del centro de Suva (Wikidata).
      }),
  ],
};
