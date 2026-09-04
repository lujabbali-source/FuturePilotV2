// Universidades por ciudad de Nueva Caledonia. Generado; no editar a mano.
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
  "nueva-caledonia-noumea": [
      defineUniversity({
        id: "nueva-caledonia-noumea-university-of-new-caledonia",
        name: "University of New Caledonia",
        cityId: "nueva-caledonia-noumea",
        website: "http://www.ufp.nc/",
        source: "open-dataset",
        // Situada a 3.1 km del centro de Nouméa (Wikidata).
      }),
  ],
};
