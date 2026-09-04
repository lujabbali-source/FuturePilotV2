// Universidades por ciudad de Mauritania. Generado; no editar a mano.
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
  "mauritania-nouakchott": [
      defineUniversity({
        id: "mauritania-nouakchott-faculte-des-sciences-juridiques-et-economiques",
        name: "Faculté des Sciences Juridiques et Economiques",
        cityId: "mauritania-nouakchott",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Nouakchott (Wikidata).
      }),
      defineUniversity({
        id: "mauritania-nouakchott-graduate-school-of-education",
        name: "Graduate School of Education",
        cityId: "mauritania-nouakchott",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nouakchott (Wikidata).
      }),
      defineUniversity({
        id: "mauritania-nouakchott-higher-school-of-education",
        name: "Higher School of Education",
        cityId: "mauritania-nouakchott",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nouakchott (Wikidata).
      }),
      defineUniversity({
        id: "mauritania-nouakchott-nouakchott-business-school",
        name: "Nouakchott Business School",
        cityId: "mauritania-nouakchott",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nouakchott (Wikidata).
      }),
      defineUniversity({
        id: "mauritania-nouakchott-al-aasriya-university-of-nouakchott",
        name: "Al Aasriya University of Nouakchott",
        cityId: "mauritania-nouakchott",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nouakchott (Wikidata).
      }),
  ],
  "mauritania-ksar": [
      defineUniversity({
        id: "mauritania-ksar-universite-libanaise-internationale-en-mauritanie",
        name: "Université Libanaise Internationale en Mauritanie",
        cityId: "mauritania-ksar",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Ksar (Wikidata).
      }),
      defineUniversity({
        id: "mauritania-ksar-universite-des-sciences-de-technologie-et-de-medecine",
        name: "Université des Sciences, de Technologie et de Médecine",
        cityId: "mauritania-ksar",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Ksar (Wikidata).
      }),
  ],
};
