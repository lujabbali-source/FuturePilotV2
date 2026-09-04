// Universidades por ciudad de Myanmar. Generado; no editar a mano.
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
  "myanmar-mandalay": [
      defineUniversity({
        id: "myanmar-mandalay-university-of-medicine-mandalay",
        name: "University of Medicine, Mandalay",
        cityId: "myanmar-mandalay",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Mandalay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mandalay-myanmar-institute-of-information-technology",
        name: "Myanmar Institute of Information Technology",
        cityId: "myanmar-mandalay",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Mandalay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mandalay-state-pariyatti-sasana-university-mandalay",
        name: "State Pariyatti Sasana University, Mandalay",
        cityId: "myanmar-mandalay",
        website: null,
        source: "open-dataset",
        // Situada a 4.4 km del centro de Mandalay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mandalay-mandalay-technological-university",
        name: "Mandalay Technological University",
        cityId: "myanmar-mandalay",
        website: "http://www.most.gov.mm/",
        source: "open-dataset",
        // Situada a 10.6 km del centro de Mandalay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mandalay-mandalay-university",
        name: "Mandalay University",
        cityId: "myanmar-mandalay",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Mandalay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mandalay-university-of-computer-studies-mandalay",
        name: "University of Computer Studies, Mandalay",
        cityId: "myanmar-mandalay",
        website: null,
        source: "open-dataset",
        // Situada a 10.3 km del centro de Mandalay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mandalay-national-university-of-arts-and-culture-mandalay",
        name: "National University of Arts and Culture, Mandalay",
        cityId: "myanmar-mandalay",
        website: null,
        source: "open-dataset",
        // Situada a 10.3 km del centro de Mandalay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mandalay-university-of-distance-education-mandalay",
        name: "University of Distance Education, Mandalay",
        cityId: "myanmar-mandalay",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Mandalay (Wikidata).
      }),
  ],
  "myanmar-myenigon": [
      defineUniversity({
        id: "myanmar-myenigon-university-of-medicine-1-yangon",
        name: "University of Medicine 1, Yangon",
        cityId: "myanmar-myenigon",
        website: "http://www.um1ygn.edu.mm/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Myenigon (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-myenigon-university-of-yangon",
        name: "University of Yangon",
        cityId: "myanmar-myenigon",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Myenigon (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-myenigon-university-of-computer-studies-yangon",
        name: "University of Computer Studies, Yangon",
        cityId: "myanmar-myenigon",
        website: "http://www.ucsy.edu.mm/",
        source: "open-dataset",
        // Situada a 2.6 km del centro de Myenigon (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-myenigon-yangon-university-of-education",
        name: "Yangon University of Education",
        cityId: "myanmar-myenigon",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Myenigon (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-myenigon-practising-school-yangon-institute-of-education",
        name: "Practising School Yangon Institute of Education",
        cityId: "myanmar-myenigon",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Myenigon (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-myenigon-university-of-distance-education-yangon",
        name: "University of Distance Education, Yangon",
        cityId: "myanmar-myenigon",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Myenigon (Wikidata).
      }),
  ],
  "myanmar-pyinmana": [
      defineUniversity({
        id: "myanmar-pyinmana-national-defence-college",
        name: "National Defence College",
        cityId: "myanmar-pyinmana",
        website: null,
        source: "open-dataset",
        // Situada a 19.4 km del centro de Pyinmana (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-pyinmana-university-of-forestry",
        name: "University of Forestry",
        cityId: "myanmar-pyinmana",
        website: null,
        source: "open-dataset",
        // Situada a 13.1 km del centro de Pyinmana (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-pyinmana-yezin-agricultural-university",
        name: "Yezin Agricultural University",
        cityId: "myanmar-pyinmana",
        website: null,
        source: "open-dataset",
        // Situada a 12.7 km del centro de Pyinmana (Wikidata).
      }),
  ],
  "myanmar-pyay": [
      defineUniversity({
        id: "myanmar-pyay-pyay-university",
        name: "Pyay University",
        cityId: "myanmar-pyay",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Pyay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-pyay-computer-university-pyay",
        name: "Computer University, Pyay",
        cityId: "myanmar-pyay",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Pyay (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-pyay-pyay-technological-university",
        name: "Pyay Technological University",
        cityId: "myanmar-pyay",
        website: null,
        source: "open-dataset",
        // Situada a 12.5 km del centro de Pyay (Wikidata).
      }),
  ],
  "myanmar-monywa": [
      defineUniversity({
        id: "myanmar-monywa-computer-university-monywa",
        name: "Computer University, Monywa",
        cityId: "myanmar-monywa",
        website: null,
        source: "open-dataset",
        // Situada a 12.1 km del centro de Monywa (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-monywa-monywa-institute-of-economics",
        name: "Monywa Institute of Economics",
        cityId: "myanmar-monywa",
        website: null,
        source: "open-dataset",
        // Situada a 5.2 km del centro de Monywa (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-monywa-technological-university-monywa",
        name: "Technological University, Monywa",
        cityId: "myanmar-monywa",
        website: null,
        source: "open-dataset",
        // Situada a 10.1 km del centro de Monywa (Wikidata).
      }),
  ],
  "myanmar-pyin-oo-lwin": [
      defineUniversity({
        id: "myanmar-pyin-oo-lwin-defence-services-academy",
        name: "Defence Services Academy",
        cityId: "myanmar-pyin-oo-lwin",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Pyin Oo Lwin (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-pyin-oo-lwin-defence-services-technological-academy",
        name: "Defence Services Technological Academy",
        cityId: "myanmar-pyin-oo-lwin",
        website: null,
        source: "open-dataset",
        // Situada a 4.8 km del centro de Pyin Oo Lwin (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-pyin-oo-lwin-defence-services-technological-academy",
        name: "Defence Services Technological Academy",
        cityId: "myanmar-pyin-oo-lwin",
        website: null,
        source: "open-dataset",
        // Situada a 4.8 km del centro de Pyin Oo Lwin (Wikidata).
      }),
  ],
  "myanmar-taungoo": [
      defineUniversity({
        id: "myanmar-taungoo-paku-karen-baptist-association",
        name: "Paku Karen Baptist Association",
        cityId: "myanmar-taungoo",
        website: null,
        source: "open-dataset",
        // Situada a 2.7 km del centro de Taungoo (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-taungoo-taungoo-university",
        name: "Taungoo University",
        cityId: "myanmar-taungoo",
        website: null,
        source: "open-dataset",
        // Situada a 7.4 km del centro de Taungoo (Wikidata).
      }),
  ],
  "myanmar-taunggyi": [
      defineUniversity({
        id: "myanmar-taunggyi-taunggyi-university",
        name: "Taunggyi University",
        cityId: "myanmar-taunggyi",
        website: null,
        source: "open-dataset",
        // Situada a 4.0 km del centro de Taunggyi (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-taunggyi-technological-university-taunggyi",
        name: "Technological University, Taunggyi",
        cityId: "myanmar-taunggyi",
        website: null,
        source: "open-dataset",
        // Situada a 4.6 km del centro de Taunggyi (Wikidata).
      }),
  ],
  "myanmar-thanlyin": [
      defineUniversity({
        id: "myanmar-thanlyin-myanmar-maritime-university",
        name: "Myanmar Maritime University",
        cityId: "myanmar-thanlyin",
        website: null,
        source: "open-dataset",
        // Situada a 7.6 km del centro de Thanlyin (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-thanlyin-east-yangon-university",
        name: "East Yangon University",
        cityId: "myanmar-thanlyin",
        website: null,
        source: "open-dataset",
        // Situada a 5.8 km del centro de Thanlyin (Wikidata).
      }),
  ],
  "myanmar-sittwe": [
      defineUniversity({
        id: "myanmar-sittwe-computer-university-sittwe",
        name: "Computer University, Sittwe",
        cityId: "myanmar-sittwe",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Sittwe (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-sittwe-technological-university-sittwe",
        name: "Technological University, Sittwe",
        cityId: "myanmar-sittwe",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Sittwe (Wikidata).
      }),
  ],
  "myanmar-sagaing": [
      defineUniversity({
        id: "myanmar-sagaing-technological-university-sagaing",
        name: "Technological University, Sagaing",
        cityId: "myanmar-sagaing",
        website: null,
        source: "open-dataset",
        // Situada a 5.6 km del centro de Sagaing (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-sagaing-sagaing-institute-of-education",
        name: "Sagaing Institute of Education",
        cityId: "myanmar-sagaing",
        website: null,
        source: "open-dataset",
        // Situada a 6.0 km del centro de Sagaing (Wikidata).
      }),
  ],
  "myanmar-pazundaung": [
      defineUniversity({
        id: "myanmar-pazundaung-national-university-of-arts-and-culture",
        name: "National University of Arts and Culture",
        cityId: "myanmar-pazundaung",
        website: null,
        source: "open-dataset",
        // Situada a 8.2 km del centro de Pazundaung (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-pazundaung-university-of-dental-medicine-yangon",
        name: "University of Dental Medicine, Yangon",
        cityId: "myanmar-pazundaung",
        website: null,
        source: "open-dataset",
        // Situada a 5.6 km del centro de Pazundaung (Wikidata).
      }),
  ],
  "myanmar-nansang": [
      defineUniversity({
        id: "myanmar-nansang-panglong-university",
        name: "Panglong University",
        cityId: "myanmar-nansang",
        website: null,
        source: "open-dataset",
        // Situada a 23.6 km del centro de Nansang (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-nansang-technological-university-panglong",
        name: "Technological University, Panglong",
        cityId: "myanmar-nansang",
        website: null,
        source: "open-dataset",
        // Situada a 14.5 km del centro de Nansang (Wikidata).
      }),
  ],
  "myanmar-myitkyina": [
      defineUniversity({
        id: "myanmar-myitkyina-technological-university-myitkyina",
        name: "Technological University, Myitkyina",
        cityId: "myanmar-myitkyina",
        website: null,
        source: "open-dataset",
        // Situada a 8.9 km del centro de Myitkyina (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-myitkyina-myitkyina-university",
        name: "Myitkyina University",
        cityId: "myanmar-myitkyina",
        website: null,
        source: "open-dataset",
        // Situada a 4.1 km del centro de Myitkyina (Wikidata).
      }),
  ],
  "myanmar-mawlamyine": [
      defineUniversity({
        id: "myanmar-mawlamyine-government-technical-institute-mawlamyine",
        name: "Government Technical Institute (Mawlamyine)",
        cityId: "myanmar-mawlamyine",
        website: null,
        source: "open-dataset",
        // Situada a 5.0 km del centro de Mawlamyine (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-mawlamyine-mawlamyine-university",
        name: "Mawlamyine University",
        cityId: "myanmar-mawlamyine",
        website: null,
        source: "open-dataset",
        // Situada a 6.2 km del centro de Mawlamyine (Wikidata).
      }),
  ],
  "myanmar-myeik": [
      defineUniversity({
        id: "myanmar-myeik-shan-community-college",
        name: "Shan Community College",
        cityId: "myanmar-myeik",
        website: null,
        source: "open-dataset",
        // Situada a 20.6 km del centro de Myeik (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-myeik-technological-university-myeik",
        name: "Technological University, Myeik",
        cityId: "myanmar-myeik",
        website: null,
        source: "open-dataset",
        // Situada a 15.0 km del centro de Myeik (Wikidata).
      }),
  ],
  "myanmar-meiktila": [
      defineUniversity({
        id: "myanmar-meiktila-myanmar-aerospace-engineering-university",
        name: "Myanmar Aerospace Engineering University",
        cityId: "myanmar-meiktila",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Meiktila (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-meiktila-technological-university-meiktila",
        name: "Technological University, Meiktila",
        cityId: "myanmar-meiktila",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de Meiktila (Wikidata).
      }),
  ],
  "myanmar-loikaw": [
      defineUniversity({
        id: "myanmar-loikaw-computer-university-loikaw",
        name: "Computer University, Loikaw",
        cityId: "myanmar-loikaw",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Loikaw (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-loikaw-technological-university-loikaw",
        name: "Technological University, Loikaw",
        cityId: "myanmar-loikaw",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Loikaw (Wikidata).
      }),
  ],
  "myanmar-lashio": [
      defineUniversity({
        id: "myanmar-lashio-technological-university-lashio",
        name: "Technological University, Lashio",
        cityId: "myanmar-lashio",
        website: null,
        source: "open-dataset",
        // Situada a 10.9 km del centro de Lashio (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-lashio-lashio-university",
        name: "Lashio University",
        cityId: "myanmar-lashio",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Lashio (Wikidata).
      }),
  ],
  "myanmar-san-chaung": [
      defineUniversity({
        id: "myanmar-san-chaung-dhammaduta-chekinda-university",
        name: "Dhammaduta Chekinda University",
        cityId: "myanmar-san-chaung",
        website: null,
        source: "open-dataset",
        // Situada a 7.3 km del centro de San Chaung (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-san-chaung-technological-university-hmawbi",
        name: "Technological University(Hmawbi)",
        cityId: "myanmar-san-chaung",
        website: null,
        source: "open-dataset",
        // Situada a 10.6 km del centro de San Chaung (Wikidata).
      }),
  ],
  "myanmar-kyo-kone-east": [
      defineUniversity({
        id: "myanmar-kyo-kone-east-west-yangon-technological-university",
        name: "West Yangon Technological University",
        cityId: "myanmar-kyo-kone-east",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Kyo Kone East (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-kyo-kone-east-yangon-technological-university",
        name: "Yangon Technological University",
        cityId: "myanmar-kyo-kone-east",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Kyo Kone East (Wikidata).
      }),
  ],
  "myanmar-saw-bwar-gyi-kone": [
      defineUniversity({
        id: "myanmar-saw-bwar-gyi-kone-international-theravada-buddhist-missionary-university",
        name: "International Theravāda Buddhist Missionary University",
        cityId: "myanmar-saw-bwar-gyi-kone",
        website: "http://www.itbmu.org.mm/",
        source: "open-dataset",
        // Situada a 2.7 km del centro de Saw Bwar Gyi Kone (Wikidata).
      }),
      defineUniversity({
        id: "myanmar-saw-bwar-gyi-kone-university-of-medicine-2",
        name: "University of Medicine 2",
        cityId: "myanmar-saw-bwar-gyi-kone",
        website: null,
        source: "open-dataset",
        // Situada a 3.4 km del centro de Saw Bwar Gyi Kone (Wikidata).
      }),
  ],
};
