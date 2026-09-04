// Universidades por ciudad de Jordania. Generado; no editar a mano.
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
  "jordania-al-jubayhah": [
      defineUniversity({
        id: "jordania-al-jubayhah-jordan-academy-of-music",
        name: "Jordan Academy of Music",
        cityId: "jordania-al-jubayhah",
        website: null,
        source: "open-dataset",
        // Situada a 4.4 km del centro de Al Jubayhah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-al-jubayhah-jordan-media-institute",
        name: "Jordan Media Institute",
        cityId: "jordania-al-jubayhah",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Al Jubayhah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-al-jubayhah-german-jordanian-university",
        name: "German-Jordanian University",
        cityId: "jordania-al-jubayhah",
        website: "http://www.gju.edu.jo/",
        source: "open-dataset",
        // Situada a 2.6 km del centro de Al Jubayhah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-al-jubayhah-princess-sumaya-university-for-technology",
        name: "Princess Sumaya University for Technology",
        cityId: "jordania-al-jubayhah",
        website: "http://www.psut.edu.jo/",
        source: "open-dataset",
        // Situada a 2.5 km del centro de Al Jubayhah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-al-jubayhah-university-of-jordan",
        name: "University of Jordan",
        cityId: "jordania-al-jubayhah",
        website: "http://www.ju.edu.jo/",
        source: "open-dataset",
        // Situada a 2.4 km del centro de Al Jubayhah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-al-jubayhah-queen-rania-center-for-entrepreneurship",
        name: "Queen Rania Center for Entrepreneurship",
        cityId: "jordania-al-jubayhah",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Al Jubayhah (Wikidata).
      }),
  ],
  "jordania-madaba": [
      defineUniversity({
        id: "jordania-madaba-american-university-of-madaba",
        name: "American University of Madaba",
        cityId: "jordania-madaba",
        website: null,
        source: "open-dataset",
        // Situada a 6.1 km del centro de Mādabā (Wikidata).
      }),
      defineUniversity({
        id: "jordania-madaba-american-university-of-madaba",
        name: "American University of Madaba",
        cityId: "jordania-madaba",
        website: null,
        source: "open-dataset",
        // Situada a 6.1 km del centro de Mādabā (Wikidata).
      }),
  ],
  "jordania-khuraybat-as-suq": [
      defineUniversity({
        id: "jordania-khuraybat-as-suq-al-zaytoonah-university-of-jordan",
        name: "Al-Zaytoonah University of Jordan",
        cityId: "jordania-khuraybat-as-suq",
        website: null,
        source: "open-dataset",
        // Situada a 5.8 km del centro de Khuraybat as Sūq (Wikidata).
      }),
      defineUniversity({
        id: "jordania-khuraybat-as-suq-middle-east-university",
        name: "Middle East University",
        cityId: "jordania-khuraybat-as-suq",
        website: "http://www.meu.edu.jo/",
        source: "open-dataset",
        // Situada a 7.8 km del centro de Khuraybat as Sūq (Wikidata).
      }),
  ],
  "jordania-ar-ramtha": [
      defineUniversity({
        id: "jordania-ar-ramtha-jordan-university-of-science-and-technology",
        name: "Jordan University of Science and Technology",
        cityId: "jordania-ar-ramtha",
        website: "http://www.just.edu.jo/",
        source: "open-dataset",
        // Situada a 9.1 km del centro de Ar Ramthā (Wikidata).
      }),
      defineUniversity({
        id: "jordania-ar-ramtha-irbid-national-university",
        name: "Irbid National University",
        cityId: "jordania-ar-ramtha",
        website: "http://www.inu.edu.jo/",
        source: "open-dataset",
        // Situada a 8.4 km del centro de Ar Ramthā (Wikidata).
      }),
  ],
  "jordania-aqaba": [
      defineUniversity({
        id: "jordania-aqaba-university-of-jordan-aqaba",
        name: "University of Jordan, Aqaba",
        cityId: "jordania-aqaba",
        website: null,
        source: "open-dataset",
        // Situada a 6.6 km del centro de Aqaba (Wikidata).
      }),
      defineUniversity({
        id: "jordania-aqaba-red-sea-institute-of-cinematic-arts",
        name: "Red Sea Institute of Cinematic Arts",
        cityId: "jordania-aqaba",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Aqaba (Wikidata).
      }),
  ],
};
