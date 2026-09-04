// Universidades por ciudad de Bulgaria. Generado; no editar a mano.
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
  "bulgaria-sofia": [
      defineUniversity({
        id: "bulgaria-sofia-university-of-national-and-world-economy",
        name: "University of National and World Economy",
        cityId: "bulgaria-sofia",
        website: "http://www.unwe.acad.bg/",
        source: "open-dataset",
        // Situada a 5.7 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-todor-kableshkov-higher-school-of-transport",
        name: "Todor Kableshkov Higher School of Transport",
        cityId: "bulgaria-sofia",
        website: null,
        source: "open-dataset",
        // Situada a 5.1 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-state-polytechnical-school",
        name: "State Polytechnical School",
        cityId: "bulgaria-sofia",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-university-of-chemical-technology-and-metallurgy",
        name: "University of Chemical Technology and Metallurgy",
        cityId: "bulgaria-sofia",
        website: "http://www.uctm.edu/",
        source: "open-dataset",
        // Situada a 5.3 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-sofia-medical-university",
        name: "Sofia Medical University",
        cityId: "bulgaria-sofia",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-state-university-of-library-studies-and-information-technologies",
        name: "State University of Library Studies and Information Technologies",
        cityId: "bulgaria-sofia",
        website: null,
        source: "open-dataset",
        // Situada a 6.8 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-technical-university-of-sofia",
        name: "Technical University of Sofia",
        cityId: "bulgaria-sofia",
        website: "http://www.tu-sofia.bg/",
        source: "open-dataset",
        // Situada a 5.3 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-university-of-mining-and-geology-saint-ivan-rilski",
        name: "University of Mining and Geology \"Saint Ivan Rilski\"",
        cityId: "bulgaria-sofia",
        website: null,
        source: "open-dataset",
        // Situada a 4.9 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-new-bulgarian-university",
        name: "New Bulgarian University",
        cityId: "bulgaria-sofia",
        website: "http://www.nbu.bg/",
        source: "open-dataset",
        // Situada a 6.2 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-military-medical-academy",
        name: "Military Medical Academy",
        cityId: "bulgaria-sofia",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-university-of-architecture-civil-engineering-and-geodesy",
        name: "University of Architecture, Civil Engineering and Geodesy",
        cityId: "bulgaria-sofia",
        website: "http://www.uacg.bg/",
        source: "open-dataset",
        // Situada a 1.7 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-university-of-forestry-sofia",
        name: "University of Forestry, Sofia",
        cityId: "bulgaria-sofia",
        website: "http://www.ltu.bg/",
        source: "open-dataset",
        // Situada a 5.7 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-sofia-university",
        name: "Sofia University",
        cityId: "bulgaria-sofia",
        website: "https://www.sofia.edu/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Sofia (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-sofia-agricultural-academy",
        name: "Agricultural Academy",
        cityId: "bulgaria-sofia",
        website: null,
        source: "open-dataset",
        // Situada a 4.9 km del centro de Sofia (Wikidata).
      }),
  ],
  "bulgaria-veliko-turnovo": [
      defineUniversity({
        id: "bulgaria-veliko-turnovo-veliko-tarnovo-university",
        name: "Veliko Tarnovo University",
        cityId: "bulgaria-veliko-turnovo",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Veliko Tŭrnovo (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-veliko-turnovo-vasil-levski-national-military-university",
        name: "Vasil Levski National Military University",
        cityId: "bulgaria-veliko-turnovo",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Veliko Tŭrnovo (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-veliko-turnovo-nvu",
        name: "NVU",
        cityId: "bulgaria-veliko-turnovo",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Veliko Tŭrnovo (Wikidata).
      }),
  ],
  "bulgaria-varna": [
      defineUniversity({
        id: "bulgaria-varna-varna-university-of-management",
        name: "Varna University of Management",
        cityId: "bulgaria-varna",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Varna (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-varna-varna-free-university",
        name: "Varna Free University",
        cityId: "bulgaria-varna",
        website: "http://www.vfu.bg/",
        source: "open-dataset",
        // Situada a 10.4 km del centro de Varna (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-varna-technical-university-of-varna",
        name: "Technical University of Varna",
        cityId: "bulgaria-varna",
        website: "http://www.tu-varna.acad.bg/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Varna (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-varna-university-of-economics-varna",
        name: "University of Economics - Varna",
        cityId: "bulgaria-varna",
        website: "http://www.ue-varna.bg/",
        source: "open-dataset",
        // Situada a 1.6 km del centro de Varna (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-varna-medical-university-of-varna",
        name: "Medical University of Varna",
        cityId: "bulgaria-varna",
        website: "http://www.mu-varna.bg/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Varna (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-varna-nikola-vaptsarov-naval-academy",
        name: "Nikola Vaptsarov Naval Academy",
        cityId: "bulgaria-varna",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Varna (Wikidata).
      }),
  ],
  "bulgaria-plovdiv": [
      defineUniversity({
        id: "bulgaria-plovdiv-university-of-food-technologies",
        name: "University of Food Technologies",
        cityId: "bulgaria-plovdiv",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Plovdiv (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-plovdiv-agricultural-university-plovdiv",
        name: "Agricultural University Plovdiv",
        cityId: "bulgaria-plovdiv",
        website: "http://www.au-plovdiv.bg/",
        source: "open-dataset",
        // Situada a 2.5 km del centro de Plovdiv (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-plovdiv-plovdiv-medical-university",
        name: "Plovdiv Medical University",
        cityId: "bulgaria-plovdiv",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Plovdiv (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-plovdiv-plovdiv-university",
        name: "Plovdiv University",
        cityId: "bulgaria-plovdiv",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Plovdiv (Wikidata).
      }),
  ],
  "bulgaria-burgas": [
      defineUniversity({
        id: "bulgaria-burgas-burgas-free-university",
        name: "Burgas Free University",
        cityId: "bulgaria-burgas",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Burgas (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-burgas-prof-dr-assen-zlatarov-university",
        name: "\"Prof. Dr. Assen Zlatarov\" University",
        cityId: "bulgaria-burgas",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Burgas (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-burgas-college-of-economics-bourgas",
        name: "College of Economics – Bourgas",
        cityId: "bulgaria-burgas",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Burgas (Wikidata).
      }),
  ],
  "bulgaria-blagoevgrad": [
      defineUniversity({
        id: "bulgaria-blagoevgrad-south-west-university-neofit-rilski",
        name: "South-West University \"Neofit Rilski\"",
        cityId: "bulgaria-blagoevgrad",
        website: "http://www.swu.bg/",
        source: "open-dataset",
        // Situada a 1.7 km del centro de Blagoevgrad (Wikidata).
      }),
      defineUniversity({
        id: "bulgaria-blagoevgrad-american-university-in-bulgaria",
        name: "American University in Bulgaria",
        cityId: "bulgaria-blagoevgrad",
        website: "http://www.aubg.bg/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Blagoevgrad (Wikidata).
      }),
  ],
};
