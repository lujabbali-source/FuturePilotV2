// Universidades por ciudad de Camerún. Generado; no editar a mano.
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
  "camerun-yaounde": [
      defineUniversity({
        id: "camerun-yaounde-unhimas",
        name: "UNHIMAS",
        cityId: "camerun-yaounde",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Yaoundé (Wikidata).
      }),
      defineUniversity({
        id: "camerun-yaounde-catholic-university-of-central-africa",
        name: "Catholic University of Central Africa",
        cityId: "camerun-yaounde",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Yaoundé (Wikidata).
      }),
      defineUniversity({
        id: "camerun-yaounde-universite-de-yaounde-i",
        name: "Université de Yaoundé I",
        cityId: "camerun-yaounde",
        website: "http://www.uy1.uninet.cm/",
        source: "open-dataset",
        // Situada a 2.0 km del centro de Yaoundé (Wikidata).
      }),
      defineUniversity({
        id: "camerun-yaounde-university-of-yaounde",
        name: "University of Yaoundé",
        cityId: "camerun-yaounde",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Yaoundé (Wikidata).
      }),
      defineUniversity({
        id: "camerun-yaounde-universite-protestante-d-afrique-centrale",
        name: "Université Protestante d'Afrique Centrale",
        cityId: "camerun-yaounde",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Yaoundé (Wikidata).
      }),
  ],
  "camerun-bamenda": [
      defineUniversity({
        id: "camerun-bamenda-university-of-bamenda",
        name: "University of Bamenda",
        cityId: "camerun-bamenda",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Bamenda (Wikidata).
      }),
      defineUniversity({
        id: "camerun-bamenda-catholic-university-of-cameroon",
        name: "Catholic University of Cameroon",
        cityId: "camerun-bamenda",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Bamenda (Wikidata).
      }),
      defineUniversity({
        id: "camerun-bamenda-international-university-bamenda",
        name: "International University, Bamenda",
        cityId: "camerun-bamenda",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Bamenda (Wikidata).
      }),
      defineUniversity({
        id: "camerun-bamenda-bambili-higher-teacher-training-college",
        name: "Bambili Higher Teacher Training College",
        cityId: "camerun-bamenda",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bamenda (Wikidata).
      }),
      defineUniversity({
        id: "camerun-bamenda-bambili-higher-technical-teacher-training-college",
        name: "Bambili Higher Technical Teacher Training College",
        cityId: "camerun-bamenda",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bamenda (Wikidata).
      }),
  ],
  "camerun-douala": [
      defineUniversity({
        id: "camerun-douala-universite-de-douala",
        name: "Université de Douala",
        cityId: "camerun-douala",
        website: "http://www.univ-douala.com/",
        source: "open-dataset",
        // Situada a 3.4 km del centro de Douala (Wikidata).
      }),
      defineUniversity({
        id: "camerun-douala-jacky-felly-nafack-hightech-university-institute",
        name: "Jacky Felly Nafack Hightech University Institute",
        cityId: "camerun-douala",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Douala (Wikidata).
      }),
  ],
};
