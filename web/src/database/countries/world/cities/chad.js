// Universidades por ciudad de Chad. Generado; no editar a mano.
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
  "chad-n-djamena": [
      defineUniversity({
        id: "chad-n-djamena-national-higher-school-of-information-and-communication-technologies",
        name: "National Higher School of Information and Communication Technologies",
        cityId: "chad-n-djamena",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de N'Djamena (Wikidata).
      }),
      defineUniversity({
        id: "chad-n-djamena-hec-chad-university",
        name: "HEC-Chad University",
        cityId: "chad-n-djamena",
        website: null,
        source: "open-dataset",
        // Situada a 5.5 km del centro de N'Djamena (Wikidata).
      }),
      defineUniversity({
        id: "chad-n-djamena-university-of-n-djamena",
        name: "University of N'Djaména",
        cityId: "chad-n-djamena",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de N'Djamena (Wikidata).
      }),
      defineUniversity({
        id: "chad-n-djamena-universite-emi-koussi",
        name: "Université Emi Koussi",
        cityId: "chad-n-djamena",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de N'Djamena (Wikidata).
      }),
  ],
  "chad-sarh": [
      defineUniversity({
        id: "chad-sarh-saint-charles-lwanga-university-of-sarh",
        name: "Saint Charles Lwanga University of Sarh",
        cityId: "chad-sarh",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Sarh (Wikidata).
      }),
      defineUniversity({
        id: "chad-sarh-universite-de-sarh",
        name: "Université de Sarh",
        cityId: "chad-sarh",
        website: null,
        source: "open-dataset",
        // Situada a 8.5 km del centro de Sarh (Wikidata).
      }),
  ],
};
