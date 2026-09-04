// Universidades por ciudad de Timor Oriental. Generado; no editar a mano.
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
  "timor-oriental-dili": [
      defineUniversity({
        id: "timor-oriental-dili-catholic-university-of-timor-saint-john-paul-ii",
        name: "Catholic University of Timor Saint John Paul II",
        cityId: "timor-oriental-dili",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Dili (Wikidata).
      }),
      defineUniversity({
        id: "timor-oriental-dili-universidade-dili",
        name: "Universidade Dili",
        cityId: "timor-oriental-dili",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Dili (Wikidata).
      }),
      defineUniversity({
        id: "timor-oriental-dili-st-john-de-britto-institute",
        name: "St. John de Britto Institute",
        cityId: "timor-oriental-dili",
        website: null,
        source: "open-dataset",
        // Situada a 12.4 km del centro de Dili (Wikidata).
      }),
      defineUniversity({
        id: "timor-oriental-dili-minor-seminary-of-our-lady-of-fatima",
        name: "Minor Seminary of Our Lady of Fatima",
        cityId: "timor-oriental-dili",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Dili (Wikidata).
      }),
      defineUniversity({
        id: "timor-oriental-dili-national-university-of-east-timor",
        name: "National University of East Timor",
        cityId: "timor-oriental-dili",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Dili (Wikidata).
      }),
      defineUniversity({
        id: "timor-oriental-dili-universidade-da-paz",
        name: "Universidade Da Paz",
        cityId: "timor-oriental-dili",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Dili (Wikidata).
      }),
  ],
};
