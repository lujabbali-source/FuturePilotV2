// Universidades por ciudad de Singapur. Generado; no editar a mano.
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
  "singapur-singapore": [
      defineUniversity({
        id: "singapur-singapore-university-of-the-arts-singapore",
        name: "University of the Arts Singapore",
        cityId: "singapur-singapore",
        website: "https://www.uas.edu.sg/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Singapore (Wikidata).
      }),
      defineUniversity({
        id: "singapur-singapore-lasalle-college-of-the-arts",
        name: "LASALLE College of the Arts",
        cityId: "singapur-singapore",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Singapore (Wikidata).
      }),
      defineUniversity({
        id: "singapur-singapore-melior-international-college",
        name: "Melior International College",
        cityId: "singapur-singapore",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Singapore (Wikidata).
      }),
      defineUniversity({
        id: "singapur-singapore-smu-school-of-social-sciences",
        name: "SMU School of Social Sciences",
        cityId: "singapur-singapore",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Singapore (Wikidata).
      }),
      defineUniversity({
        id: "singapur-singapore-singapore-institute-of-technology",
        name: "Singapore Institute of Technology",
        cityId: "singapur-singapore",
        website: "https://www.singaporetech.edu.sg/",
        source: "open-dataset",
        // Situada a 0.1 km del centro de Singapore (Wikidata).
      }),
      defineUniversity({
        id: "singapur-singapore-singapore-management-university",
        name: "Singapore Management University",
        cityId: "singapur-singapore",
        website: "https://www.smu.edu.sg/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Singapore (Wikidata).
      }),
  ],
  "singapur-boon-lay": [
      defineUniversity({
        id: "singapur-boon-lay-specialist-and-warrant-officer-institute",
        name: "Specialist and Warrant Officer Institute",
        cityId: "singapur-boon-lay",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Boon Lay (Wikidata).
      }),
      defineUniversity({
        id: "singapur-boon-lay-nanyang-technological-university",
        name: "Nanyang Technological University",
        cityId: "singapur-boon-lay",
        website: "https://www.ntu.edu.sg/",
        source: "open-dataset",
        // Situada a 4.0 km del centro de Boon Lay (Wikidata).
      }),
      defineUniversity({
        id: "singapur-boon-lay-s-rajaratnam-school-of-international-studies",
        name: "S. Rajaratnam School of International Studies",
        cityId: "singapur-boon-lay",
        website: null,
        source: "open-dataset",
        // Situada a 4.0 km del centro de Boon Lay (Wikidata).
      }),
      defineUniversity({
        id: "singapur-boon-lay-safti-military-institute",
        name: "SAFTI Military Institute",
        cityId: "singapur-boon-lay",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Boon Lay (Wikidata).
      }),
  ],
  "singapur-queenstown-estate": [
      defineUniversity({
        id: "singapur-queenstown-estate-curtin-singapore",
        name: "Curtin Singapore",
        cityId: "singapur-queenstown-estate",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Queenstown Estate (Wikidata).
      }),
      defineUniversity({
        id: "singapur-queenstown-estate-management-development-institute-of-singapore",
        name: "Management Development Institute of Singapore",
        cityId: "singapur-queenstown-estate",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Queenstown Estate (Wikidata).
      }),
      defineUniversity({
        id: "singapur-queenstown-estate-singapore-mit-alliance-for-research-and-technology",
        name: "Singapore-MIT Alliance for Research and Technology",
        cityId: "singapur-queenstown-estate",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Queenstown Estate (Wikidata).
      }),
      defineUniversity({
        id: "singapur-queenstown-estate-university-of-wales-institute-cardiff-asia-campus",
        name: "University of Wales Institute, Cardiff: Asia Campus",
        cityId: "singapur-queenstown-estate",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Queenstown Estate (Wikidata).
      }),
  ],
  "singapur-clementi-housing-estate": [
      defineUniversity({
        id: "singapur-clementi-housing-estate-tum-asia",
        name: "TUM Asia",
        cityId: "singapur-clementi-housing-estate",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Clementi Housing Estate (Wikidata).
      }),
      defineUniversity({
        id: "singapur-clementi-housing-estate-national-university-of-singapore",
        name: "National University of Singapore",
        cityId: "singapur-clementi-housing-estate",
        website: "https://www.nus.edu/",
        source: "open-dataset",
        // Situada a 2.5 km del centro de Clementi Housing Estate (Wikidata).
      }),
      defineUniversity({
        id: "singapur-clementi-housing-estate-singapore-polytechnic",
        name: "Singapore Polytechnic",
        cityId: "singapur-clementi-housing-estate",
        website: "https://www.sp.edu.sg/",
        source: "open-dataset",
        // Situada a 1.8 km del centro de Clementi Housing Estate (Wikidata).
      }),
  ],
  "singapur-anak-bukit": [
      defineUniversity({
        id: "singapur-anak-bukit-ngee-ann-polytechnic",
        name: "Ngee Ann Polytechnic",
        cityId: "singapur-anak-bukit",
        website: "https://www.np.edu.sg/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Anak Bukit (Wikidata).
      }),
      defineUniversity({
        id: "singapur-anak-bukit-singapore-university-of-social-sciences",
        name: "Singapore University of Social Sciences",
        cityId: "singapur-anak-bukit",
        website: "https://www.suss.edu.sg/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Anak Bukit (Wikidata).
      }),
      defineUniversity({
        id: "singapur-anak-bukit-sim-university",
        name: "SIM University",
        cityId: "singapur-anak-bukit",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Anak Bukit (Wikidata).
      }),
  ],
  "singapur-simei-new-town": [
      defineUniversity({
        id: "singapur-simei-new-town-singapore-university-of-technology-and-design",
        name: "Singapore University of Technology and Design",
        cityId: "singapur-simei-new-town",
        website: "https://www.sutd.edu.sg/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Simei New Town (Wikidata).
      }),
      defineUniversity({
        id: "singapur-simei-new-town-university-of-new-south-wales-asia",
        name: "University of New South Wales Asia",
        cityId: "singapur-simei-new-town",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Simei New Town (Wikidata).
      }),
  ],
  "singapur-novena": [
      defineUniversity({
        id: "singapur-novena-far-eastern-bible-college",
        name: "Far Eastern Bible College",
        cityId: "singapur-novena",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Novena (Wikidata).
      }),
      defineUniversity({
        id: "singapur-novena-embry-riddle-aeronautical-university-asia",
        name: "Embry-Riddle Aeronautical University Asia",
        cityId: "singapur-novena",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Novena (Wikidata).
      }),
  ],
};
