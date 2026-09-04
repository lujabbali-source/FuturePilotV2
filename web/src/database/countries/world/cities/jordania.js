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
  "jordania-amman": [
      defineUniversity({
        id: "jordania-amman-luminus-technical-university-college",
        name: "Luminus Technical University College",
        cityId: "jordania-amman",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Amman (Wikidata).
      }),
      defineUniversity({
        id: "jordania-amman-jordan-academy-for-maritime-studies",
        name: "Jordan Academy for Maritime Studies",
        cityId: "jordania-amman",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Amman (Wikidata).
      }),
      defineUniversity({
        id: "jordania-amman-al-ahliyya-amman-university",
        name: "Al-Ahliyya Amman University",
        cityId: "jordania-amman",
        website: "http://www.ammanu.edu.jo/",
        source: "open-dataset",
        // Situada a None km del centro de Amman (Wikidata).
      }),
      defineUniversity({
        id: "jordania-amman-amman-arab-university",
        name: "Amman Arab University",
        cityId: "jordania-amman",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Amman (Wikidata).
      }),
      defineUniversity({
        id: "jordania-amman-applied-science-private-university",
        name: "Applied Science Private University",
        cityId: "jordania-amman",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Amman (Wikidata).
      }),
      defineUniversity({
        id: "jordania-amman-talal-abu-ghazaleh-graduate-school-of-business",
        name: "Talal Abu-Ghazaleh Graduate School of Business",
        cityId: "jordania-amman",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Amman (Wikidata).
      }),
  ],
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
  "jordania-hayy-al-quwaysimah": [
      defineUniversity({
        id: "jordania-hayy-al-quwaysimah-arab-open-university-jordan",
        name: "Arab Open University - Jordan",
        cityId: "jordania-hayy-al-quwaysimah",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Ḩayy al Quwaysimah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-hayy-al-quwaysimah-ibn-sina-university-for-medical-sciences",
        name: "Ibn Sina University for Medical Sciences",
        cityId: "jordania-hayy-al-quwaysimah",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Ḩayy al Quwaysimah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-hayy-al-quwaysimah-isra-university",
        name: "Isra University",
        cityId: "jordania-hayy-al-quwaysimah",
        website: "http://www.isra.edu.pk/",
        source: "open-dataset",
        // Situada a None km del centro de Ḩayy al Quwaysimah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-hayy-al-quwaysimah-philadelphia-university",
        name: "Philadelphia University",
        cityId: "jordania-hayy-al-quwaysimah",
        website: "http://www.philadelphia.edu.jo/",
        source: "open-dataset",
        // Situada a None km del centro de Ḩayy al Quwaysimah (Wikidata).
      }),
      defineUniversity({
        id: "jordania-hayy-al-quwaysimah-world-islamic-sciences-and-education-university",
        name: "World Islamic Sciences and Education University",
        cityId: "jordania-hayy-al-quwaysimah",
        website: "http://www.wise.edu.jo/",
        source: "open-dataset",
        // Situada a None km del centro de Ḩayy al Quwaysimah (Wikidata).
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
  "jordania-irbid": [
      defineUniversity({
        id: "jordania-irbid-yarmouk-university",
        name: "Yarmouk University",
        cityId: "jordania-irbid",
        website: "http://www.yu.edu.jo/",
        source: "open-dataset",
        // Situada a 2.1 km del centro de Irbid (Wikidata).
      }),
      defineUniversity({
        id: "jordania-irbid-jadara-university",
        name: "Jadara University",
        cityId: "jordania-irbid",
        website: "http://www.jadara.edu.jo/",
        source: "open-dataset",
        // Situada a None km del centro de Irbid (Wikidata).
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
