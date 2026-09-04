// Universidades por ciudad de Angola. Generado; no editar a mano.
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
  "angola-luanda": [
      defineUniversity({
        id: "angola-luanda-independent-university-of-angola",
        name: "Independent University of Angola",
        cityId: "angola-luanda",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Luanda (Wikidata).
      }),
      defineUniversity({
        id: "angola-luanda-methodist-university-of-angola",
        name: "Methodist University of Angola",
        cityId: "angola-luanda",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Luanda (Wikidata).
      }),
      defineUniversity({
        id: "angola-luanda-universidade-gregorio-semedo",
        name: "Universidade Gregório Semedo",
        cityId: "angola-luanda",
        website: "http://www.ugs.ed.ao/",
        source: "open-dataset",
        // Situada a None km del centro de Luanda (Wikidata).
      }),
      defineUniversity({
        id: "angola-luanda-universidade-oscar-ribas",
        name: "Universidade Óscar Ribas",
        cityId: "angola-luanda",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Luanda (Wikidata).
      }),
      defineUniversity({
        id: "angola-luanda-belas-university",
        name: "Belas University",
        cityId: "angola-luanda",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Luanda (Wikidata).
      }),
      defineUniversity({
        id: "angola-luanda-private-university-of-angola",
        name: "Private University of Angola",
        cityId: "angola-luanda",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Luanda (Wikidata).
      }),
  ],
  "angola-vila-flor": [
      defineUniversity({
        id: "angola-vila-flor-universidade-metropolitana",
        name: "Universidade Metropolitana",
        cityId: "angola-vila-flor",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Vila Flor (Wikidata).
      }),
      defineUniversity({
        id: "angola-vila-flor-universidade-de-belas",
        name: "Universidade de Belas",
        cityId: "angola-vila-flor",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Vila Flor (Wikidata).
      }),
  ],
};
