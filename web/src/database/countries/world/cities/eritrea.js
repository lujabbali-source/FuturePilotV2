// Universidades por ciudad de Eritrea. Generado; no editar a mano.
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
  "eritrea-asmara": [
      defineUniversity({
        id: "eritrea-asmara-university-of-asmara",
        name: "University of Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-orota-hospital",
        name: "Orota Hospital",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-asmara-college-of-health-sciences",
        name: "Asmara College of Health Sciences",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-eritrea-institute-of-technology",
        name: "Eritrea Institute of Technology",
        cityId: "eritrea-asmara",
        website: "http://www.eit.edu.er/",
        source: "open-dataset",
        // Situada a 19.9 km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-asmara-college-of-education",
        name: "Asmara College of Education",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-college-of-arts-university-of-asmara",
        name: "College of Arts, University of Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-college-of-business-university-of-asmara",
        name: "College of Business, University of Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-college-of-education-university-of-asmara",
        name: "College of Education, University of Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-college-of-health-sciences-asmara",
        name: "College of Health Sciences, Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-college-of-medicine-university-of-asmara",
        name: "College of Medicine, University of Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-college-of-social-sciences-university-of-asmara",
        name: "College of Social Sciences, University of Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-orotta-college-of-medicine-and-health-sciences",
        name: "Orotta College of Medicine and Health Sciences",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-orotta-school-of-medicine-and-dentistry",
        name: "Orotta School of Medicine and Dentistry",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
      defineUniversity({
        id: "eritrea-asmara-school-of-law-university-of-asmara",
        name: "School of Law, University of Asmara",
        cityId: "eritrea-asmara",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Asmara (Wikidata).
      }),
  ],
};
