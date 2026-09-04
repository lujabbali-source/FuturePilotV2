// Universidades por ciudad de Rumania. Generado; no editar a mano.
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
  "rumania-bucharest": [
      defineUniversity({
        id: "rumania-bucharest-spiru-haret-university",
        name: "Spiru Haret University",
        cityId: "rumania-bucharest",
        website: "http://www.spiruharet.ro/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-bucharest-university-of-economic-studies",
        name: "Bucharest University of Economic Studies",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-bucharest-national-university-of-arts",
        name: "Bucharest National University of Arts",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-titu-maiorescu-university",
        name: "Titu Maiorescu University",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-national-university-of-music-bucharest",
        name: "National University of Music Bucharest",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-carol-davila-university-of-medicine-and-pharmacy",
        name: "Carol Davila University of Medicine and Pharmacy",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-national-academy-of-physical-education-and-sport",
        name: "National Academy of Physical Education and Sport",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-hyperion-university-of-bucharest",
        name: "Hyperion University of Bucharest",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-nicolae-titulescu-university",
        name: "Nicolae Titulescu University",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-dimitrie-cantemir-christian-university",
        name: "Dimitrie Cantemir Christian University",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-carol-i-national-defence-university",
        name: "Carol I National Defence University",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-university-of-bucharest",
        name: "University of Bucharest",
        cityId: "rumania-bucharest",
        website: "http://www.unibuc.ro/",
        source: "open-dataset",
        // Situada a 0.5 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-military-technical-academy",
        name: "Military Technical Academy",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-ion-mincu-university-of-architecture-and-urban-planning",
        name: "Ion Mincu University of Architecture and Urban Planning",
        cityId: "rumania-bucharest",
        website: "https://www.uauim.ro/",
        source: "open-dataset",
        // Situada a 0.7 km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-the-higher-school-of-journalism-in-bucharest",
        name: "The Higher School of Journalism in Bucharest",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-artifex-university",
        name: "Artifex University",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-alexandru-ioan-cuza-police-academy",
        name: "Alexandru Ioan Cuza Police Academy",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-national-intelligence-academy",
        name: "National Intelligence Academy",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-national-college-of-defence",
        name: "National College of Defence",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-ecological-university-of-bucharest",
        name: "Ecological University of Bucharest",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-people-s-art-school-bucharest",
        name: "People's Art School Bucharest",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bucharest-university-of-wales-romania",
        name: "University of Wales, Romania",
        cityId: "rumania-bucharest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bucharest (Wikidata).
      }),
  ],
  "rumania-cluj-napoca": [
      defineUniversity({
        id: "rumania-cluj-napoca-iuliu-hatieganu-university-of-medicine-and-pharmacy",
        name: "Iuliu Hațieganu University of Medicine and Pharmacy",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-king-ferdinand-i-university",
        name: "\"King Ferdinand I\" University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-university-of-agricultural-sciences-and-veterinary-medicine-of-cluj-napoca",
        name: "University of Agricultural Sciences and Veterinary Medicine of Cluj-Napoca",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 2.3 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-protestant-theological-institute-of-cluj",
        name: "Protestant Theological Institute of Cluj",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-babes-bolyai-university",
        name: "Babeș-Bolyai University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-victor-babes-university",
        name: "Victor Babeș University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-sapientia-university",
        name: "Sapientia University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-technical-university-of-cluj-napoca",
        name: "Technical University of Cluj-Napoca",
        cityId: "rumania-cluj-napoca",
        website: "http://www.utcluj.ro/",
        source: "open-dataset",
        // Situada a 1.1 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-bolyai-university",
        name: "Bolyai University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-art-and-design-university-of-cluj-napoca",
        name: "Art and Design University of Cluj-Napoca",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-franz-joseph-university",
        name: "Franz Joseph University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-carol-ii-university",
        name: "Carol II University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-upper-dacia-university",
        name: "Upper Dacia University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-bogdan-voda-university",
        name: "Bogdan Voda University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-faculty-of-roman-catholic-theology-in-babes-bolyai-university",
        name: "Faculty of Roman Catholic Theology in Babeș-Bolyai University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-faculty-of-greek-catholic-theology-of-babes-bolyai-university",
        name: "Faculty of Greek Catholic Theology of Babeș-Bolyai University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Cluj-Napoca (Wikidata).
      }),
      defineUniversity({
        id: "rumania-cluj-napoca-faculty-of-roman-catholic-theology-of-babes-bolyai-university",
        name: "Faculty of Roman Catholic Theology of Babeș-Bolyai University",
        cityId: "rumania-cluj-napoca",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Cluj-Napoca (Wikidata).
      }),
  ],
  "rumania-iasi": [
      defineUniversity({
        id: "rumania-iasi-alexandru-ioan-cuza-university",
        name: "Alexandru Ioan Cuza University",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a 2.3 km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-apollonia-university",
        name: "Apollonia University",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-grigore-t-popa-university-of-medicine-and-pharmacy",
        name: "Grigore T. Popa University of Medicine and Pharmacy",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-iasi-university-of-life-sciences",
        name: "Iași University of Life Sciences",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a 4.3 km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-george-enescu-university-of-arts",
        name: "George Enescu University of Arts",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-gheorghe-asachi-technical-university-of-iasi",
        name: "Gheorghe Asachi Technical University of Iași",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-princely-academy-of-iasi",
        name: "Princely Academy of Iași",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-petre-andrei-university",
        name: "Petre Andrei University",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-gheorghe-zane-university",
        name: "Gheorghe Zane University",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-mihail-kogalniceanu-university-of-iasi",
        name: "Mihail Kogălniceanu University of Iași",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-roman-catholic-theological-institute-of-iasi",
        name: "Roman Catholic Theological Institute of Iași",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Iaşi (Wikidata).
      }),
      defineUniversity({
        id: "rumania-iasi-the-faculty-of-roman-catholic-theology-of-the-alexandru-ioan-cuza-university-of-iasi",
        name: "The Faculty of Roman Catholic Theology of the \"Alexandru Ioan Cuza\" University of Iași",
        cityId: "rumania-iasi",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Iaşi (Wikidata).
      }),
  ],
  "rumania-timisoara": [
      defineUniversity({
        id: "rumania-timisoara-politehnica-university-of-timisoara",
        name: "Politehnica University of Timișoara",
        cityId: "rumania-timisoara",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Timişoara (Wikidata).
      }),
      defineUniversity({
        id: "rumania-timisoara-king-mihai-i-university-of-life-sciences-of-timisoara",
        name: "King Mihai I University of Life Sciences of Timisoara",
        cityId: "rumania-timisoara",
        website: null,
        source: "open-dataset",
        // Situada a 3.3 km del centro de Timişoara (Wikidata).
      }),
      defineUniversity({
        id: "rumania-timisoara-west-university-of-timisoara",
        name: "West University of Timișoara",
        cityId: "rumania-timisoara",
        website: "http://www.uvt.ro/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Timişoara (Wikidata).
      }),
      defineUniversity({
        id: "rumania-timisoara-victor-babes-university-of-medicine-and-pharmacy",
        name: "Victor Babeș University of Medicine and Pharmacy",
        cityId: "rumania-timisoara",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Timişoara (Wikidata).
      }),
      defineUniversity({
        id: "rumania-timisoara-tibiscus-university-of-timisoara",
        name: "Tibiscus University of Timișoara",
        cityId: "rumania-timisoara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Timişoara (Wikidata).
      }),
      defineUniversity({
        id: "rumania-timisoara-mihai-eminescu-university",
        name: "Mihai Eminescu University",
        cityId: "rumania-timisoara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Timişoara (Wikidata).
      }),
  ],
  "rumania-sibiu": [
      defineUniversity({
        id: "rumania-sibiu-nicolae-balcescu-academy-of-land-forces",
        name: "Nicolae Bălcescu Academy of Land Forces",
        cityId: "rumania-sibiu",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Sibiu (Wikidata).
      }),
      defineUniversity({
        id: "rumania-sibiu-lucian-blaga-university-of-sibiu",
        name: "Lucian Blaga University of Sibiu",
        cityId: "rumania-sibiu",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Sibiu (Wikidata).
      }),
      defineUniversity({
        id: "rumania-sibiu-romanian-german-university-of-sibiu",
        name: "Romanian-German University of Sibiu",
        cityId: "rumania-sibiu",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Sibiu (Wikidata).
      }),
  ],
  "rumania-oradea": [
      defineUniversity({
        id: "rumania-oradea-university-of-oradea",
        name: "University of Oradea",
        cityId: "rumania-oradea",
        website: "http://www.uoradea.ro/",
        source: "open-dataset",
        // Situada a 0.1 km del centro de Oradea (Wikidata).
      }),
      defineUniversity({
        id: "rumania-oradea-agora-university",
        name: "Agora University",
        cityId: "rumania-oradea",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Oradea (Wikidata).
      }),
      defineUniversity({
        id: "rumania-oradea-partium-christian-university",
        name: "Partium Christian University",
        cityId: "rumania-oradea",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Oradea (Wikidata).
      }),
  ],
  "rumania-constanta": [
      defineUniversity({
        id: "rumania-constanta-mircea-cel-batran-naval-academy",
        name: "Mircea cel Bătrân Naval Academy",
        cityId: "rumania-constanta",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Constanţa (Wikidata).
      }),
      defineUniversity({
        id: "rumania-constanta-maritime-university",
        name: "Maritime University",
        cityId: "rumania-constanta",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Constanţa (Wikidata).
      }),
      defineUniversity({
        id: "rumania-constanta-andrei-saguna-university",
        name: "Andrei Saguna University",
        cityId: "rumania-constanta",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Constanţa (Wikidata).
      }),
  ],
  "rumania-brasov": [
      defineUniversity({
        id: "rumania-brasov-transilvania-university-of-brasov",
        name: "Transilvania University of Brașov",
        cityId: "rumania-brasov",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Braşov (Wikidata).
      }),
      defineUniversity({
        id: "rumania-brasov-henri-coanda-air-force-academy",
        name: "Henri Coanda Air Force Academy",
        cityId: "rumania-brasov",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Braşov (Wikidata).
      }),
  ],
  "rumania-sector-1": [
      defineUniversity({
        id: "rumania-sector-1-romanian-american-university",
        name: "Romanian-American University",
        cityId: "rumania-sector-1",
        website: "http://www.rau.ro/",
        source: "open-dataset",
        // Situada a 2.5 km del centro de Sector 1 (Wikidata).
      }),
      defineUniversity({
        id: "rumania-sector-1-bioterra-university",
        name: "Bioterra University",
        cityId: "rumania-sector-1",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Sector 1 (Wikidata).
      }),
      defineUniversity({
        id: "rumania-sector-1-university-of-agronomic-sciences-and-veterinary-medicine-of-bucharest",
        name: "University of Agronomic Sciences and Veterinary Medicine of Bucharest",
        cityId: "rumania-sector-1",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Sector 1 (Wikidata).
      }),
  ],
  "rumania-targu-mures": [
      defineUniversity({
        id: "rumania-targu-mures-university-of-arts-targu-mures",
        name: "University of Arts Târgu-Mureș",
        cityId: "rumania-targu-mures",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Târgu Mureş (Wikidata).
      }),
      defineUniversity({
        id: "rumania-targu-mures-petru-maior-university-of-targu-mures",
        name: "Petru Maior University of Târgu Mureș",
        cityId: "rumania-targu-mures",
        website: "http://www.upm.ro/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Târgu Mureş (Wikidata).
      }),
  ],
  "rumania-targoviste": [
      defineUniversity({
        id: "rumania-targoviste-ferdinand-i-cavalry-officers-school",
        name: "\"Ferdinand I\" Cavalry Officers School",
        cityId: "rumania-targoviste",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Târgovişte (Wikidata).
      }),
      defineUniversity({
        id: "rumania-targoviste-valahia-university-of-targoviste",
        name: "Valahia University of Târgoviște",
        cityId: "rumania-targoviste",
        website: "http://www.valahia.ro/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Târgovişte (Wikidata).
      }),
  ],
  "rumania-resita": [
      defineUniversity({
        id: "rumania-resita-university-eftimie-murgu-of-resita",
        name: "University \"Eftimie Murgu\" of Reșița",
        cityId: "rumania-resita",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Reşiţa (Wikidata).
      }),
      defineUniversity({
        id: "rumania-resita-eftimie-murgu-university-of-resita",
        name: "Eftimie Murgu University of Resita",
        cityId: "rumania-resita",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Reşiţa (Wikidata).
      }),
  ],
  "rumania-pitesti": [
      defineUniversity({
        id: "rumania-pitesti-constantin-brancoveanu-university",
        name: "Constantin Brâncoveanu University",
        cityId: "rumania-pitesti",
        website: null,
        source: "open-dataset",
        // Situada a 2.3 km del centro de Piteşti (Wikidata).
      }),
      defineUniversity({
        id: "rumania-pitesti-university-of-pitesti",
        name: "University of Pitești",
        cityId: "rumania-pitesti",
        website: "http://www.upit.ro/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Piteşti (Wikidata).
      }),
  ],
  "rumania-bacau": [
      defineUniversity({
        id: "rumania-bacau-george-bacovia-university",
        name: "George Bacovia University",
        cityId: "rumania-bacau",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Bacău (Wikidata).
      }),
      defineUniversity({
        id: "rumania-bacau-vasile-alecsandri-university",
        name: "Vasile Alecsandri University",
        cityId: "rumania-bacau",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Bacău (Wikidata).
      }),
  ],
  "rumania-sector-2": [
      defineUniversity({
        id: "rumania-sector-2-i-l-caragiale-national-university-of-theatre-and-film",
        name: "I. L. Caragiale National University of Theatre and Film",
        cityId: "rumania-sector-2",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Sector 2 (Wikidata).
      }),
      defineUniversity({
        id: "rumania-sector-2-technical-university-of-civil-engineering-of-bucharest",
        name: "Technical University of Civil Engineering of Bucharest",
        cityId: "rumania-sector-2",
        website: "http://www.utcb.ro/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Sector 2 (Wikidata).
      }),
  ],
};
