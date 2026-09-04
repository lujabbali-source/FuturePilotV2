// Universidades por ciudad de Sierra Leona. Generado; no editar a mano.
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
  "sierra-leona-freetown": [
      defineUniversity({
        id: "sierra-leona-freetown-university-of-sierra-leone",
        name: "University of Sierra Leone",
        cityId: "sierra-leona-freetown",
        website: "http://www.tusol.org/",
        source: "open-dataset",
        // Situada a 2.9 km del centro de Freetown (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-freetown-fourah-bay-college",
        name: "Fourah Bay College",
        cityId: "sierra-leona-freetown",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Freetown (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-freetown-fourah-bay-college",
        name: "Fourah Bay College",
        cityId: "sierra-leona-freetown",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Freetown (Wikidata).
      }),
  ],
};
