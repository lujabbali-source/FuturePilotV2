// Universidades por ciudad de Barbados. Generado; no editar a mano.
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
  "barbados-bridgetown": [
      defineUniversity({
        id: "barbados-bridgetown-american-university-of-barbados-school-of-medicine",
        name: "American University of Barbados School of Medicine",
        cityId: "barbados-bridgetown",
        website: null,
        source: "open-dataset",
        // Situada a 4.8 km del centro de Bridgetown (Wikidata).
      }),
      defineUniversity({
        id: "barbados-bridgetown-washington-university-of-barbados",
        name: "Washington University of Barbados",
        cityId: "barbados-bridgetown",
        website: null,
        source: "open-dataset",
        // Situada a 15.9 km del centro de Bridgetown (Wikidata).
      }),
      defineUniversity({
        id: "barbados-bridgetown-bridgetown-international-university",
        name: "Bridgetown International University",
        cityId: "barbados-bridgetown",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Bridgetown (Wikidata).
      }),
  ],
};
