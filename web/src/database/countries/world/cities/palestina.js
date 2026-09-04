// Universidades por ciudad de Palestina. Generado; no editar a mano.
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
  "palestina-gaza": [
      defineUniversity({
        id: "palestina-gaza-gaza-university",
        name: "Gaza University",
        cityId: "palestina-gaza",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Gaza (Wikidata).
      }),
      defineUniversity({
        id: "palestina-gaza-al-aqsa-university",
        name: "al-Aqsa University",
        cityId: "palestina-gaza",
        website: "http://www.alaqsa.edu.ps/",
        source: "open-dataset",
        // Situada a 2.7 km del centro de Gaza (Wikidata).
      }),
      defineUniversity({
        id: "palestina-gaza-al-aqsa-university",
        name: "al-Aqsa University",
        cityId: "palestina-gaza",
        website: "http://www.alaqsa.edu.ps/",
        source: "open-dataset",
        // Situada a 2.7 km del centro de Gaza (Wikidata).
      }),
      defineUniversity({
        id: "palestina-gaza-islamic-university-of-gaza",
        name: "Islamic University of Gaza",
        cityId: "palestina-gaza",
        website: "http://www.iugaza.edu.ps/",
        source: "open-dataset",
        // Situada a 2.8 km del centro de Gaza (Wikidata).
      }),
      defineUniversity({
        id: "palestina-gaza-al-azhar-university-gaza",
        name: "Al-Azhar University – Gaza",
        cityId: "palestina-gaza",
        website: "http://www.alazhar.edu.ps/",
        source: "open-dataset",
        // Situada a 3.2 km del centro de Gaza (Wikidata).
      }),
      defineUniversity({
        id: "palestina-gaza-isra-university",
        name: "Isra University",
        cityId: "palestina-gaza",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Gaza (Wikidata).
      }),
  ],
  "palestina-tulkarm": [
      defineUniversity({
        id: "palestina-tulkarm-college-of-agriculture-and-veterinary-medicine-at-an-najah-national-university",
        name: "College of Agriculture and Veterinary Medicine at An-Najah National University",
        cityId: "palestina-tulkarm",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Ţūlkarm (Wikidata).
      }),
      defineUniversity({
        id: "palestina-tulkarm-al-quds-open-university-tulkarm",
        name: "Al-Quds Open University, Tulkarm",
        cityId: "palestina-tulkarm",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Ţūlkarm (Wikidata).
      }),
      defineUniversity({
        id: "palestina-tulkarm-palestine-technical-university",
        name: "Palestine Technical University",
        cityId: "palestina-tulkarm",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Ţūlkarm (Wikidata).
      }),
  ],
  "palestina-bethlehem": [
      defineUniversity({
        id: "palestina-bethlehem-palestine-ahliya-university",
        name: "Palestine Ahliya University",
        cityId: "palestina-bethlehem",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Bethlehem (Wikidata).
      }),
      defineUniversity({
        id: "palestina-bethlehem-bethlehem-university",
        name: "Bethlehem University",
        cityId: "palestina-bethlehem",
        website: "http://www.bethlehem.edu/",
        source: "open-dataset",
        // Situada a 0.7 km del centro de Bethlehem (Wikidata).
      }),
      defineUniversity({
        id: "palestina-bethlehem-dar-al-kalima-university",
        name: "Dar al-Kalima University",
        cityId: "palestina-bethlehem",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Bethlehem (Wikidata).
      }),
  ],
  "palestina-hebron": [
      defineUniversity({
        id: "palestina-hebron-hebron-university",
        name: "Hebron University",
        cityId: "palestina-hebron",
        website: "http://www.hebron.edu/",
        source: "open-dataset",
        // Situada a 2.3 km del centro de Hebron (Wikidata).
      }),
      defineUniversity({
        id: "palestina-hebron-palestine-polytechnic-university",
        name: "Palestine Polytechnic University",
        cityId: "palestina-hebron",
        website: "http://www.ppu.edu/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Hebron (Wikidata).
      }),
      defineUniversity({
        id: "palestina-hebron-palestine-polytechnic-university",
        name: "Palestine Polytechnic University",
        cityId: "palestina-hebron",
        website: "http://www.ppu.edu/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Hebron (Wikidata).
      }),
  ],
  "palestina-ramallah": [
      defineUniversity({
        id: "palestina-ramallah-al-quds-open-university",
        name: "Al-Quds Open University",
        cityId: "palestina-ramallah",
        website: "http://www.qou.edu/",
        source: "open-dataset",
        // Situada a 1.6 km del centro de Ramallah (Wikidata).
      }),
      defineUniversity({
        id: "palestina-ramallah-al-quds-open-university",
        name: "Al-Quds Open University",
        cityId: "palestina-ramallah",
        website: "http://www.qou.edu/",
        source: "open-dataset",
        // Situada a 1.6 km del centro de Ramallah (Wikidata).
      }),
  ],
  "palestina-jericho": [
      defineUniversity({
        id: "palestina-jericho-al-istiqlal-university",
        name: "Al-Istiqlal University",
        cityId: "palestina-jericho",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Jericho (Wikidata).
      }),
      defineUniversity({
        id: "palestina-jericho-al-istiqlal-university",
        name: "Al-Istiqlal University",
        cityId: "palestina-jericho",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Jericho (Wikidata).
      }),
  ],
  "palestina-east-jerusalem": [
      defineUniversity({
        id: "palestina-east-jerusalem-ibrahimieh-college",
        name: "Ibrahimieh College",
        cityId: "palestina-east-jerusalem",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de East Jerusalem (Wikidata).
      }),
      defineUniversity({
        id: "palestina-east-jerusalem-st-george-s-college-jerusalem",
        name: "St. George's College, Jerusalem",
        cityId: "palestina-east-jerusalem",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de East Jerusalem (Wikidata).
      }),
  ],
};
