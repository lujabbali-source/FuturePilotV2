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
        website: "http://www.isra.edu.pk/",
        source: "open-dataset",
        // Situada a 2.8 km del centro de Gaza (Wikidata).
      }),
  ],
  "palestina-east-jerusalem": [
      defineUniversity({
        id: "palestina-east-jerusalem-hebrew-university-of-jerusalem",
        name: "Hebrew University of Jerusalem",
        cityId: "palestina-east-jerusalem",
        website: "http://www.huji.ac.il/",
        source: "open-dataset",
        // Situada a 1.5 km del centro de East Jerusalem (Wikidata).
      }),
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
      defineUniversity({
        id: "palestina-east-jerusalem-studium-biblicum-franciscanum",
        name: "Studium Biblicum Franciscanum",
        cityId: "palestina-east-jerusalem",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de East Jerusalem (Wikidata).
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
  "palestina-old-city": [
      defineUniversity({
        id: "palestina-old-city-institute-of-law-in-palestine",
        name: "Institute of Law in palestine",
        cityId: "palestina-old-city",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Old City (Wikidata).
      }),
      defineUniversity({
        id: "palestina-old-city-wajdi-nihad-abu-gharbia-university-college-of-technology",
        name: "Wajdi Nihad Abu Gharbia University College of Technology",
        cityId: "palestina-old-city",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Old City (Wikidata).
      }),
      defineUniversity({
        id: "palestina-old-city-studium-theologicum-salesianum",
        name: "Studium Theologicum Salesianum",
        cityId: "palestina-old-city",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Old City (Wikidata).
      }),
  ],
  "palestina-nablus": [
      defineUniversity({
        id: "palestina-nablus-an-najah-national-university",
        name: "An-Najah National University",
        cityId: "palestina-nablus",
        website: "http://www.najah.edu/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Nablus (Wikidata).
      }),
      defineUniversity({
        id: "palestina-nablus-nablus-university-for-vocational-and-technical-education",
        name: "Nablus University for Vocational and Technical Education",
        cityId: "palestina-nablus",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nablus (Wikidata).
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
  ],
};
