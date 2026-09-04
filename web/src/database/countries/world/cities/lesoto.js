// Universidades por ciudad de Lesoto. Generado; no editar a mano.
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
  "lesoto-maseru": [
      defineUniversity({
        id: "lesoto-maseru-lerotholi-polytechnic",
        name: "Lerotholi Polytechnic",
        cityId: "lesoto-maseru",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Maseru (Wikidata).
      }),
      defineUniversity({
        id: "lesoto-maseru-higher-institute-of-art-and-design",
        name: "Higher Institute of Art and Design",
        cityId: "lesoto-maseru",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Maseru (Wikidata).
      }),
      defineUniversity({
        id: "lesoto-maseru-higher-institute-of-cinema-and-audiovisual",
        name: "Higher Institute of Cinema and Audiovisual",
        cityId: "lesoto-maseru",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Maseru (Wikidata).
      }),
      defineUniversity({
        id: "lesoto-maseru-higher-institute-of-journalism-and-communication",
        name: "Higher Institute of Journalism and Communication",
        cityId: "lesoto-maseru",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Maseru (Wikidata).
      }),
      defineUniversity({
        id: "lesoto-maseru-national-school-of-public-health-morocco",
        name: "National School of Public Health Morocco",
        cityId: "lesoto-maseru",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Maseru (Wikidata).
      }),
      defineUniversity({
        id: "lesoto-maseru-royal-institute-of-the-amazigh-culture",
        name: "Royal Institute of the Amazigh Culture",
        cityId: "lesoto-maseru",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Maseru (Wikidata).
      }),
      defineUniversity({
        id: "lesoto-maseru-mohammadia-school-of-engineers",
        name: "Mohammadia School of Engineers",
        cityId: "lesoto-maseru",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Maseru (Wikidata).
      }),
  ],
};
