// Universidades por ciudad de Comoras. Generado; no editar a mano.
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
  "comoras-moroni": [
      defineUniversity({
        id: "comoras-moroni-university-of-the-comoros",
        name: "University of the Comoros",
        cityId: "comoras-moroni",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Moroni (Wikidata).
      }),
      defineUniversity({
        id: "comoras-moroni-midocean-university",
        name: "Midocean University",
        cityId: "comoras-moroni",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Moroni (Wikidata).
      }),
  ],
};
