// Universidades por ciudad de Cabo Verde. Generado; no editar a mano.
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
  "cabo-verde-praia": [
      defineUniversity({
        id: "cabo-verde-praia-universidade-intercontinental-de-cabo-verde",
        name: "Universidade Intercontinental de Cabo Verde",
        cityId: "cabo-verde-praia",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Praia (Wikidata).
      }),
      defineUniversity({
        id: "cabo-verde-praia-universidade-jean-piaget-de-cabo-verde",
        name: "Universidade Jean Piaget de Cabo Verde",
        cityId: "cabo-verde-praia",
        website: "http://cv.unipiaget.org/",
        source: "open-dataset",
        // Situada a 3.0 km del centro de Praia (Wikidata).
      }),
      defineUniversity({
        id: "cabo-verde-praia-university-of-cape-verde",
        name: "University of Cape Verde",
        cityId: "cabo-verde-praia",
        website: null,
        source: "open-dataset",
        // Situada a 4.0 km del centro de Praia (Wikidata).
      }),
  ],
  "cabo-verde-mindelo": [
      defineUniversity({
        id: "cabo-verde-mindelo-university-of-mindelo",
        name: "University of Mindelo",
        cityId: "cabo-verde-mindelo",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Mindelo (Wikidata).
      }),
      defineUniversity({
        id: "cabo-verde-mindelo-atlantic-technical-university",
        name: "Atlantic Technical University",
        cityId: "cabo-verde-mindelo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Mindelo (Wikidata).
      }),
  ],
};
