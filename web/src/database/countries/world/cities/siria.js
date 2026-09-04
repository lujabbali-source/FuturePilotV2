// Universidades por ciudad de Siria. Generado; no editar a mano.
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
  "siria-as-sanamayn": [
      defineUniversity({
        id: "siria-as-sanamayn-qasyoun-private-university",
        name: "Qasyoun Private University",
        cityId: "siria-as-sanamayn",
        website: null,
        source: "open-dataset",
        // Situada a 9.6 km del centro de Aş Şanamayn (Wikidata).
      }),
      defineUniversity({
        id: "siria-as-sanamayn-al-jazeera-private-university",
        name: "Al-Jazeera Private University",
        cityId: "siria-as-sanamayn",
        website: null,
        source: "open-dataset",
        // Situada a 15.0 km del centro de Aş Şanamayn (Wikidata).
      }),
      defineUniversity({
        id: "siria-as-sanamayn-yarmouk-private-university",
        name: "Yarmouk Private University",
        cityId: "siria-as-sanamayn",
        website: "http://www.ypu.edu.sy/",
        source: "open-dataset",
        // Situada a 9.6 km del centro de Aş Şanamayn (Wikidata).
      }),
      defineUniversity({
        id: "siria-as-sanamayn-arab-international-university",
        name: "Arab International University",
        cityId: "siria-as-sanamayn",
        website: null,
        source: "open-dataset",
        // Situada a 15.9 km del centro de Aş Şanamayn (Wikidata).
      }),
      defineUniversity({
        id: "siria-as-sanamayn-international-university-for-science-and-technology",
        name: "International University for Science and Technology",
        cityId: "siria-as-sanamayn",
        website: "http://www.iust.edu.sy/",
        source: "open-dataset",
        // Situada a 15.5 km del centro de Aş Şanamayn (Wikidata).
      }),
  ],
  "siria-damascus": [
      defineUniversity({
        id: "siria-damascus-higher-institute-of-business-administration-damascus",
        name: "Higher Institute of Business Administration (Damascus)",
        cityId: "siria-damascus",
        website: null,
        source: "open-dataset",
        // Situada a 4.6 km del centro de Damascus (Wikidata).
      }),
      defineUniversity({
        id: "siria-damascus-higher-institute-of-dramatic-arts-damascus",
        name: "Higher Institute of Dramatic Arts (Damascus)",
        cityId: "siria-damascus",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Damascus (Wikidata).
      }),
      defineUniversity({
        id: "siria-damascus-damascus-university",
        name: "Damascus University",
        cityId: "siria-damascus",
        website: "http://www.damascusuniversity.edu.sy/",
        source: "open-dataset",
        // Situada a 0.1 km del centro de Damascus (Wikidata).
      }),
  ],
  "siria-homs": [
      defineUniversity({
        id: "siria-homs-homs-military-academy",
        name: "Homs Military Academy",
        cityId: "siria-homs",
        website: null,
        source: "open-dataset",
        // Situada a 5.4 km del centro de Homs (Wikidata).
      }),
      defineUniversity({
        id: "siria-homs-homs-university",
        name: "Homs University",
        cityId: "siria-homs",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Homs (Wikidata).
      }),
  ],
  "siria-aleppo": [
      defineUniversity({
        id: "siria-aleppo-al-shahbaa-university",
        name: "Al-Shahbaa University",
        cityId: "siria-aleppo",
        website: null,
        source: "open-dataset",
        // Situada a 4.6 km del centro de Aleppo (Wikidata).
      }),
      defineUniversity({
        id: "siria-aleppo-university-of-aleppo",
        name: "University of Aleppo",
        cityId: "siria-aleppo",
        website: "http://www.alepuniv.edu.sy/",
        source: "open-dataset",
        // Situada a 3.8 km del centro de Aleppo (Wikidata).
      }),
  ],
  "siria-latakia": [
      defineUniversity({
        id: "siria-latakia-manara-university",
        name: "Manara University",
        cityId: "siria-latakia",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Latakia (Wikidata).
      }),
      defineUniversity({
        id: "siria-latakia-university-of-latakia",
        name: "University of Latakia",
        cityId: "siria-latakia",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Latakia (Wikidata).
      }),
  ],
};
