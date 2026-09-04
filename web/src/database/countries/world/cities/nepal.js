// Universidades por ciudad de Nepal. Generado; no editar a mano.
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
  "nepal-kathmandu": [
      defineUniversity({
        id: "nepal-kathmandu-university-of-nepal",
        name: "University of Nepal",
        cityId: "nepal-kathmandu",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Kathmandu (Wikidata).
      }),
      defineUniversity({
        id: "nepal-kathmandu-national-school-of-sciences",
        name: "National School of Sciences",
        cityId: "nepal-kathmandu",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Kathmandu (Wikidata).
      }),
      defineUniversity({
        id: "nepal-kathmandu-nca-college-of-management",
        name: "NCA College of Management",
        cityId: "nepal-kathmandu",
        website: null,
        source: "open-dataset",
        // Situada a 2.3 km del centro de Kathmandu (Wikidata).
      }),
      defineUniversity({
        id: "nepal-kathmandu-siddhartha-vanasthali-institute",
        name: "Siddhartha Vanasthali Institute",
        cityId: "nepal-kathmandu",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Kathmandu (Wikidata).
      }),
      defineUniversity({
        id: "nepal-kathmandu-st-xavier-s-college-kathmandu",
        name: "St. Xavier's College, Kathmandu",
        cityId: "nepal-kathmandu",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Kathmandu (Wikidata).
      }),
  ],
  "nepal-pokhara": [
      defineUniversity({
        id: "nepal-pokhara-bhalam",
        name: "Bhalam",
        cityId: "nepal-pokhara",
        website: null,
        source: "open-dataset",
        // Situada a 4.4 km del centro de Pokhara (Wikidata).
      }),
      defineUniversity({
        id: "nepal-pokhara-pokhara-university",
        name: "Pokhara University",
        cityId: "nepal-pokhara",
        website: "http://www.pu.edu.np/",
        source: "open-dataset",
        // Situada a 17.3 km del centro de Pokhara (Wikidata).
      }),
      defineUniversity({
        id: "nepal-pokhara-prithvi-narayan-campus",
        name: "Prithvi Narayan Campus",
        cityId: "nepal-pokhara",
        website: null,
        source: "open-dataset",
        // Situada a 3.7 km del centro de Pokhara (Wikidata).
      }),
  ],
  "nepal-madhyapur-thimi": [
      defineUniversity({
        id: "nepal-madhyapur-thimi-nepalese-military-academy",
        name: "Nepalese Military Academy",
        cityId: "nepal-madhyapur-thimi",
        website: null,
        source: "open-dataset",
        // Situada a 6.0 km del centro de Madhyapur Thimi (Wikidata).
      }),
      defineUniversity({
        id: "nepal-madhyapur-thimi-bagiswori-college",
        name: "Bagiswori College",
        cityId: "nepal-madhyapur-thimi",
        website: null,
        source: "open-dataset",
        // Situada a 5.1 km del centro de Madhyapur Thimi (Wikidata).
      }),
      defineUniversity({
        id: "nepal-madhyapur-thimi-khwopa-engineering-college",
        name: "Khwopa Engineering College",
        cityId: "nepal-madhyapur-thimi",
        website: null,
        source: "open-dataset",
        // Situada a 5.2 km del centro de Madhyapur Thimi (Wikidata).
      }),
  ],
  "nepal-rajbiraj": [
      defineUniversity({
        id: "nepal-rajbiraj-madhesh-agricultural-university",
        name: "Madhesh Agricultural University",
        cityId: "nepal-rajbiraj",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Rājbirāj (Wikidata).
      }),
      defineUniversity({
        id: "nepal-rajbiraj-sai-krishna-medical-college-hospital",
        name: "Sai Krishna Medical College & Hospital",
        cityId: "nepal-rajbiraj",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Rājbirāj (Wikidata).
      }),
  ],
  "nepal-nepalgunj": [
      defineUniversity({
        id: "nepal-nepalgunj-lumbini-technological-university",
        name: "Lumbini Technological University",
        cityId: "nepal-nepalgunj",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Nepalgunj (Wikidata).
      }),
      defineUniversity({
        id: "nepal-nepalgunj-lumbini-technological-university",
        name: "Lumbini Technological University",
        cityId: "nepal-nepalgunj",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Nepalgunj (Wikidata).
      }),
  ],
};
