// Universidades por ciudad de Libia. Generado; no editar a mano.
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
  "libia-tripoli": [
      defineUniversity({
        id: "libia-tripoli-alrefak-university",
        name: "Alrefak University",
        cityId: "libia-tripoli",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Tripoli (Wikidata).
      }),
      defineUniversity({
        id: "libia-tripoli-al-hadra-university-of-humanities-and-applied-sciences",
        name: "Al-Hadra University of Humanities and Applied Sciences",
        cityId: "libia-tripoli",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Tripoli (Wikidata).
      }),
      defineUniversity({
        id: "libia-tripoli-al-tahadi-national-medical-university",
        name: "Al-Tahadi National Medical University",
        cityId: "libia-tripoli",
        website: null,
        source: "open-dataset",
        // Situada a 4.5 km del centro de Tripoli (Wikidata).
      }),
      defineUniversity({
        id: "libia-tripoli-libyan-university-of-humanities-and-applied-sciences",
        name: "Libyan University of Humanities and Applied Sciences",
        cityId: "libia-tripoli",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Tripoli (Wikidata).
      }),
      defineUniversity({
        id: "libia-tripoli-university-of-tripoli",
        name: "University of Tripoli",
        cityId: "libia-tripoli",
        website: "http://www.uot.edu.ly/",
        source: "open-dataset",
        // Situada a 5.5 km del centro de Tripoli (Wikidata).
      }),
  ],
  "libia-benghazi": [
      defineUniversity({
        id: "libia-benghazi-university-of-benghazi",
        name: "University of Benghazi",
        cityId: "libia-benghazi",
        website: "http://www.uob.edu.ly/",
        source: "open-dataset",
        // Situada a 0.3 km del centro de Benghazi (Wikidata).
      }),
      defineUniversity({
        id: "libia-benghazi-libyan-international-university",
        name: "Libyan International University",
        cityId: "libia-benghazi",
        website: null,
        source: "open-dataset",
        // Situada a 5.4 km del centro de Benghazi (Wikidata).
      }),
      defineUniversity({
        id: "libia-benghazi-benghazi-military-university-academy",
        name: "Benghazi Military University Academy",
        cityId: "libia-benghazi",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Benghazi (Wikidata).
      }),
  ],
  "libia-al-bayda": [
      defineUniversity({
        id: "libia-al-bayda-mohammed-bin-ali-al-sunoussi-islamic-university",
        name: "Mohammed bin Ali Al Sunoussi Islamic University",
        cityId: "libia-al-bayda",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Al Bayḑā’ (Wikidata).
      }),
      defineUniversity({
        id: "libia-al-bayda-omar-al-mukhtar-university",
        name: "Omar Al-Mukhtar University",
        cityId: "libia-al-bayda",
        website: "http://www.omu.edu.ly/",
        source: "open-dataset",
        // Situada a 4.0 km del centro de Al Bayḑā’ (Wikidata).
      }),
  ],
  "libia-janzur": [
      defineUniversity({
        id: "libia-janzur-libyan-academy",
        name: "Libyan Academy",
        cityId: "libia-janzur",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Janzūr (Wikidata).
      }),
      defineUniversity({
        id: "libia-janzur-university-of-tripoli-al-ahlia",
        name: "University of Tripoli Al-ahlia",
        cityId: "libia-janzur",
        website: null,
        source: "open-dataset",
        // Situada a 3.8 km del centro de Janzūr (Wikidata).
      }),
  ],
};
