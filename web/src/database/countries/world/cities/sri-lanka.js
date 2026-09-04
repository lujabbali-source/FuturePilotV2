// Universidades por ciudad de Sri Lanka. Generado; no editar a mano.
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
  "sri-lanka-colombo": [
      defineUniversity({
        id: "sri-lanka-colombo-advanced-technological-institute-sri-lanka",
        name: "Advanced Technological Institute, Sri Lanka",
        cityId: "sri-lanka-colombo",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-university-of-colombo",
        name: "University of Colombo",
        cityId: "sri-lanka-colombo",
        website: "http://www.cmb.ac.lk/",
        source: "open-dataset",
        // Situada a 4.0 km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-institute-of-higher-national-diploma-in-engineering",
        name: "Institute of Higher National Diploma in Engineering",
        cityId: "sri-lanka-colombo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-university-of-colombo-school-of-computing",
        name: "University of Colombo School of Computing",
        cityId: "sri-lanka-colombo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-open-university-of-sri-lanka",
        name: "Open University of Sri Lanka",
        cityId: "sri-lanka-colombo",
        website: "http://www.ou.ac.lk/",
        source: "open-dataset",
        // Situada a None km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-buddhist-and-pali-university-of-sri-lanka",
        name: "Buddhist and Pali University of Sri Lanka",
        cityId: "sri-lanka-colombo",
        website: "http://www.bpu.ac.lk/",
        source: "open-dataset",
        // Situada a None km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-colombo-institute-of-research-psychology",
        name: "Colombo Institute of Research & Psychology",
        cityId: "sri-lanka-colombo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-faculty-of-arts-university-of-colombo",
        name: "Faculty of Arts, University of Colombo",
        cityId: "sri-lanka-colombo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Colombo (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-colombo-university-of-the-visual-performing-arts",
        name: "University of the Visual & Performing Arts",
        cityId: "sri-lanka-colombo",
        website: "http://www.vpa.ac.lk/",
        source: "open-dataset",
        // Situada a None km del centro de Colombo (Wikidata).
      }),
  ],
  "sri-lanka-kandy": [
      defineUniversity({
        id: "sri-lanka-kandy-university-of-vocational-technology",
        name: "University of Vocational Technology",
        cityId: "sri-lanka-kandy",
        website: null,
        source: "open-dataset",
        // Situada a 5.7 km del centro de Kandy (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-kandy-university-of-peradeniya",
        name: "University of Peradeniya",
        cityId: "sri-lanka-kandy",
        website: "http://www.pdn.ac.lk/",
        source: "open-dataset",
        // Situada a 5.7 km del centro de Kandy (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-kandy-department-of-computer-engineering-university-of-peradeniya",
        name: "Department of Computer Engineering, University of Peradeniya",
        cityId: "sri-lanka-kandy",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kandy (Wikidata).
      }),
  ],
  "sri-lanka-anuradhapura": [
      defineUniversity({
        id: "sri-lanka-anuradhapura-buddhasravaka-bhiksu-university",
        name: "Buddhasravaka Bhiksu University",
        cityId: "sri-lanka-anuradhapura",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Anuradhapura (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-anuradhapura-rajarata-university-of-sri-lanka",
        name: "Rajarata University of Sri Lanka",
        cityId: "sri-lanka-anuradhapura",
        website: "http://www.rjt.ac.lk/",
        source: "open-dataset",
        // Situada a None km del centro de Anuradhapura (Wikidata).
      }),
  ],
};
