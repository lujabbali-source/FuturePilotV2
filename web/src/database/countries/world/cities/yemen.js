// Universidades por ciudad de Yemen. Generado; no editar a mano.
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
  "yemen-sanaa": [
      defineUniversity({
        id: "yemen-sanaa-emirates-international-university",
        name: "Emirates International University",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a 5.2 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-lebanese-international-university-yemen",
        name: "Lebanese International University, Yemen",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a 7.4 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-sanaa-university",
        name: "Sanaa University",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-queen-arwa-university",
        name: "Queen Arwa University",
        cityId: "yemen-sanaa",
        website: "http://www.arwauniversity.org/",
        source: "open-dataset",
        // Situada a 3.9 km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-university-of-science-and-technology-sanaa",
        name: "University of Science and Technology, Sanaa",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-university-of-science-and-technology-in-sana-a-yemen",
        name: "University of Science and Technology in Sana'a - Yemen",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-international-university-of-technology-twintech",
        name: "International University of Technology Twintech",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-civilization-university",
        name: "Civilization University",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-future-university",
        name: "Future University",
        cityId: "yemen-sanaa",
        website: "http://www.futureuniversity.edu.eg/",
        source: "open-dataset",
        // Situada a None km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-modern-specialized-university",
        name: "modern specialized university",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Sanaa (Wikidata).
      }),
      defineUniversity({
        id: "yemen-sanaa-yemen-college-of-middle-eastern-studies",
        name: "Yemen College of Middle Eastern Studies",
        cityId: "yemen-sanaa",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Sanaa (Wikidata).
      }),
  ],
  "yemen-taiz": [
      defineUniversity({
        id: "yemen-taiz-al-janad-university-for-science-and-technology",
        name: "Al Janad University for Science and Technology",
        cityId: "yemen-taiz",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Taiz (Wikidata).
      }),
      defineUniversity({
        id: "yemen-taiz-al-saeed-university",
        name: "Al Saeed University",
        cityId: "yemen-taiz",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Taiz (Wikidata).
      }),
      defineUniversity({
        id: "yemen-taiz-taiz-university",
        name: "Taiz University",
        cityId: "yemen-taiz",
        website: "http://www.taizun.net/",
        source: "open-dataset",
        // Situada a None km del centro de Taiz (Wikidata).
      }),
  ],
  "yemen-ibb": [
      defineUniversity({
        id: "yemen-ibb-ibb-university",
        name: "Ibb University",
        cityId: "yemen-ibb",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Ibb (Wikidata).
      }),
      defineUniversity({
        id: "yemen-ibb-jiblah-university-for-medical-and-health-sciences",
        name: "Jiblah University for Medical and Health Sciences",
        cityId: "yemen-ibb",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Ibb (Wikidata).
      }),
      defineUniversity({
        id: "yemen-ibb-al-jazeera-university",
        name: "Al Jazeera University",
        cityId: "yemen-ibb",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Ibb (Wikidata).
      }),
  ],
  "yemen-mukalla": [
      defineUniversity({
        id: "yemen-mukalla-hadhramout-university",
        name: "Hadhramout University",
        cityId: "yemen-mukalla",
        website: null,
        source: "open-dataset",
        // Situada a 13.8 km del centro de Mukalla (Wikidata).
      }),
      defineUniversity({
        id: "yemen-mukalla-al-ahgaff-university",
        name: "Al-Ahgaff University",
        cityId: "yemen-mukalla",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Mukalla (Wikidata).
      }),
  ],
};
