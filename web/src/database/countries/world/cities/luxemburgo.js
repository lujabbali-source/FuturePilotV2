// Universidades por ciudad de Luxemburgo. Generado; no editar a mano.
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
  "luxemburgo-luxembourg": [
      defineUniversity({
        id: "luxemburgo-luxembourg-sacred-heart-university-luxembourg",
        name: "Sacred Heart University Luxembourg",
        cityId: "luxemburgo-luxembourg",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Luxembourg (Wikidata).
      }),
      defineUniversity({
        id: "luxemburgo-luxembourg-institut-universitaire-international-luxembourg",
        name: "Institut universitaire international Luxembourg",
        cityId: "luxemburgo-luxembourg",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Luxembourg (Wikidata).
      }),
  ],
  "luxemburgo-esch-sur-alzette": [
      defineUniversity({
        id: "luxemburgo-esch-sur-alzette-miami-university-dolibois-european-center",
        name: "Miami University Dolibois European Center",
        cityId: "luxemburgo-esch-sur-alzette",
        website: null,
        source: "open-dataset",
        // Situada a 7.2 km del centro de Esch-sur-Alzette (Wikidata).
      }),
      defineUniversity({
        id: "luxemburgo-esch-sur-alzette-university-of-luxembourg",
        name: "University of Luxembourg",
        cityId: "luxemburgo-esch-sur-alzette",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Esch-sur-Alzette (Wikidata).
      }),
  ],
};
