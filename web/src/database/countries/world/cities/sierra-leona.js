// Universidades por ciudad de Sierra Leona. Generado; no editar a mano.
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
  "sierra-leona-freetown": [
      defineUniversity({
        id: "sierra-leona-freetown-university-of-sierra-leone",
        name: "University of Sierra Leone",
        cityId: "sierra-leona-freetown",
        website: "http://www.tusol.org/",
        source: "open-dataset",
        // Situada a 2.9 km del centro de Freetown (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-freetown-fourah-bay-college",
        name: "Fourah Bay College",
        cityId: "sierra-leona-freetown",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Freetown (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-freetown-college-of-medicine-and-allied-health-sciences",
        name: "College of Medicine and Allied Health Sciences",
        cityId: "sierra-leona-freetown",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Freetown (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-freetown-sierra-leone-law-school",
        name: "Sierra Leone Law School",
        cityId: "sierra-leona-freetown",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Freetown (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-freetown-university-of-management-and-technology",
        name: "University of Management and Technology",
        cityId: "sierra-leona-freetown",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Freetown (Wikidata).
      }),
  ],
  "sierra-leona-makeni": [
      defineUniversity({
        id: "sierra-leona-makeni-university-of-makeni",
        name: "University of Makeni",
        cityId: "sierra-leona-makeni",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Makeni (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-makeni-magburaka-technical-institute",
        name: "Magburaka Technical Institute",
        cityId: "sierra-leona-makeni",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Makeni (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-makeni-makeni-teacher-s-college",
        name: "Makeni Teacher's College",
        cityId: "sierra-leona-makeni",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Makeni (Wikidata).
      }),
  ],
  "sierra-leona-bo": [
      defineUniversity({
        id: "sierra-leona-bo-bo-teacher-s-college",
        name: "Bo Teacher's College",
        cityId: "sierra-leona-bo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bo (Wikidata).
      }),
      defineUniversity({
        id: "sierra-leona-bo-njala-university",
        name: "Njala University",
        cityId: "sierra-leona-bo",
        website: "http://www.nu-online.com/",
        source: "open-dataset",
        // Situada a None km del centro de Bo (Wikidata).
      }),
  ],
};
