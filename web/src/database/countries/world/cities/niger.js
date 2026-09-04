// Universidades por ciudad de Níger. Generado; no editar a mano.
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
  "niger-niamey": [
      defineUniversity({
        id: "niger-niamey-african-development-university",
        name: "African Development University",
        cityId: "niger-niamey",
        website: null,
        source: "open-dataset",
        // Situada a 6.1 km del centro de Niamey (Wikidata).
      }),
      defineUniversity({
        id: "niger-niamey-african-university-of-social-technical-and-medical-sciences",
        name: "African University of Social, Technical and Medical Sciences",
        cityId: "niger-niamey",
        website: null,
        source: "open-dataset",
        // Situada a 6.0 km del centro de Niamey (Wikidata).
      }),
      defineUniversity({
        id: "niger-niamey-elhadj-mahmoud-kaat-international-university",
        name: "Elhadj Mahmoud Kaat International University",
        cityId: "niger-niamey",
        website: null,
        source: "open-dataset",
        // Situada a 4.3 km del centro de Niamey (Wikidata).
      }),
      defineUniversity({
        id: "niger-niamey-tunisian-international-university",
        name: "Tunisian International University",
        cityId: "niger-niamey",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Niamey (Wikidata).
      }),
      defineUniversity({
        id: "niger-niamey-universite-abdou-moumouni",
        name: "Université Abdou Moumouni",
        cityId: "niger-niamey",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Niamey (Wikidata).
      }),
      defineUniversity({
        id: "niger-niamey-universite-canadienne-du-niger",
        name: "Université Canadienne du Niger",
        cityId: "niger-niamey",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Niamey (Wikidata).
      }),
  ],
  "niger-maradi": [
      defineUniversity({
        id: "niger-maradi-aboubacar-ibrahim-international-university",
        name: "Aboubacar Ibrahim International University",
        cityId: "niger-maradi",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Maradi (Wikidata).
      }),
      defineUniversity({
        id: "niger-maradi-annahda-international-university",
        name: "Annahda International University",
        cityId: "niger-maradi",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Maradi (Wikidata).
      }),
      defineUniversity({
        id: "niger-maradi-universite-dan-dicko-dankoulodo-de-maradi",
        name: "Université Dan Dicko Dankoulodo de Maradi",
        cityId: "niger-maradi",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Maradi (Wikidata).
      }),
      defineUniversity({
        id: "niger-maradi-universite-libre-de-maradi",
        name: "Université libre de Maradi",
        cityId: "niger-maradi",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Maradi (Wikidata).
      }),
      defineUniversity({
        id: "niger-maradi-maryam-abacha-america-university-of-niger",
        name: "Maryam Abacha America University of Niger",
        cityId: "niger-maradi",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Maradi (Wikidata).
      }),
  ],
  "niger-say": [
      defineUniversity({
        id: "niger-say-universite-populaire-de-niamey",
        name: "Université populaire de Niamey",
        cityId: "niger-say",
        website: null,
        source: "open-dataset",
        // Situada a 5.1 km del centro de Say (Wikidata).
      }),
      defineUniversity({
        id: "niger-say-islamic-university-of-niger",
        name: "Islamic University of Niger",
        cityId: "niger-say",
        website: null,
        source: "open-dataset",
        // Situada a 5.1 km del centro de Say (Wikidata).
      }),
  ],
};
