// Universidades por ciudad de Hong Kong. Generado; no editar a mano.
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
  "hong-kong-oi-man-estate": [
      defineUniversity({
        id: "hong-kong-oi-man-estate-hong-kong-polytechnic-university",
        name: "Hong Kong Polytechnic University",
        cityId: "hong-kong-oi-man-estate",
        website: "https://www.polyu.edu.hk/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Oi Man Estate (Wikidata).
      }),
      defineUniversity({
        id: "hong-kong-oi-man-estate-student-halls-of-residence-hung-hom-bay",
        name: "Student Halls of Residence Hung Hom Bay",
        cityId: "hong-kong-oi-man-estate",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Oi Man Estate (Wikidata).
      }),
      defineUniversity({
        id: "hong-kong-oi-man-estate-hong-kong-polytechnic-university-faculty-of-humanities",
        name: "Hong Kong Polytechnic University Faculty of Humanities",
        cityId: "hong-kong-oi-man-estate",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Oi Man Estate (Wikidata).
      }),
      defineUniversity({
        id: "hong-kong-oi-man-estate-tung-wah-college",
        name: "Tung Wah College",
        cityId: "hong-kong-oi-man-estate",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Oi Man Estate (Wikidata).
      }),
  ],
  "hong-kong-tai-shui-hang": [
      defineUniversity({
        id: "hong-kong-tai-shui-hang-the-chinese-university-of-hong-kong",
        name: "The Chinese University of Hong Kong",
        cityId: "hong-kong-tai-shui-hang",
        website: "https://www.cuhk.edu.cn/",
        source: "open-dataset",
        // Situada a 2.3 km del centro de Tai Shui Hang (Wikidata).
      }),
      defineUniversity({
        id: "hong-kong-tai-shui-hang-cw-chu-college",
        name: "CW Chu College",
        cityId: "hong-kong-tai-shui-hang",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Tai Shui Hang (Wikidata).
      }),
  ],
  "hong-kong-wong-chuk-hang": [
      defineUniversity({
        id: "hong-kong-wong-chuk-hang-hong-kong-police-college",
        name: "Hong Kong Police College",
        cityId: "hong-kong-wong-chuk-hang",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Wong Chuk Hang (Wikidata).
      }),
      defineUniversity({
        id: "hong-kong-wong-chuk-hang-ocean-park-conservation-foundation-hong-kong",
        name: "Ocean Park Conservation Foundation Hong Kong",
        cityId: "hong-kong-wong-chuk-hang",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Wong Chuk Hang (Wikidata).
      }),
  ],
  "hong-kong-wang-tau-hom-estate": [
      defineUniversity({
        id: "hong-kong-wang-tau-hom-estate-hkbu-department-of-communication-studies",
        name: "HKBU Department of Communication Studies",
        cityId: "hong-kong-wang-tau-hom-estate",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Wang Tau Hom Estate (Wikidata).
      }),
      defineUniversity({
        id: "hong-kong-wang-tau-hom-estate-hong-kong-baptist-university",
        name: "Hong Kong Baptist University",
        cityId: "hong-kong-wang-tau-hom-estate",
        website: "https://www.hkbu.edu.hk/",
        source: "open-dataset",
        // Situada a 0.5 km del centro de Wang Tau Hom Estate (Wikidata).
      }),
  ],
};
