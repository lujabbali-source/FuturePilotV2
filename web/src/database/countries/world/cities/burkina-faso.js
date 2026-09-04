// Universidades por ciudad de Burkina Faso. Generado; no editar a mano.
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
  "burkina-faso-ouagadougou": [
      defineUniversity({
        id: "burkina-faso-ouagadougou-universite-aube-nouvelle",
        name: "Université Aube Nouvelle",
        cityId: "burkina-faso-ouagadougou",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de Ouagadougou (Wikidata).
      }),
      defineUniversity({
        id: "burkina-faso-ouagadougou-university-joseph-ki-zerbo",
        name: "University Joseph Ki-Zerbo",
        cityId: "burkina-faso-ouagadougou",
        website: null,
        source: "open-dataset",
        // Situada a 3.8 km del centro de Ouagadougou (Wikidata).
      }),
      defineUniversity({
        id: "burkina-faso-ouagadougou-virtual-university-of-burkina-faso",
        name: "Virtual university of Burkina Faso",
        cityId: "burkina-faso-ouagadougou",
        website: null,
        source: "open-dataset",
        // Situada a 7.1 km del centro de Ouagadougou (Wikidata).
      }),
      defineUniversity({
        id: "burkina-faso-ouagadougou-international-institute-for-water-and-environmental-engineering",
        name: "International Institute for Water and Environmental Engineering",
        cityId: "burkina-faso-ouagadougou",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Ouagadougou (Wikidata).
      }),
  ],
  "burkina-faso-nioko-i": [
      defineUniversity({
        id: "burkina-faso-nioko-i-universite-privee-de-ouagadougou",
        name: "Université Privée de Ouagadougou",
        cityId: "burkina-faso-nioko-i",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Nioko I (Wikidata).
      }),
      defineUniversity({
        id: "burkina-faso-nioko-i-universite-ouaga-ii",
        name: "Université Ouaga II",
        cityId: "burkina-faso-nioko-i",
        website: null,
        source: "open-dataset",
        // Situada a 13.0 km del centro de Nioko I (Wikidata).
      }),
  ],
  "burkina-faso-saonre": [
      defineUniversity({
        id: "burkina-faso-saonre-ouagadougou-polytechnic-institute",
        name: "Ouagadougou Polytechnic institute",
        cityId: "burkina-faso-saonre",
        website: null,
        source: "open-dataset",
        // Situada a 5.3 km del centro de Saonré (Wikidata).
      }),
      defineUniversity({
        id: "burkina-faso-saonre-higher-institute-of-technologies",
        name: "Higher Institute of Technologies",
        cityId: "burkina-faso-saonre",
        website: null,
        source: "open-dataset",
        // Situada a 5.8 km del centro de Saonré (Wikidata).
      }),
  ],
};
