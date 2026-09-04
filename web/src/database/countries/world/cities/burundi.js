// Universidades por ciudad de Burundi. Generado; no editar a mano.
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
  "burundi-bujumbura": [
      defineUniversity({
        id: "burundi-bujumbura-international-university-of-equator-burundi",
        name: "International University of Equator, Burundi",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-international-leadership-university-burundi",
        name: "International Leadership University, Burundi",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-bujumbura-international-university",
        name: "Bujumbura International University",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 3.4 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-universite-sagesse-d-afrique",
        name: "Université Sagesse d’Afrique",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 6.4 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-university-of-burundi",
        name: "University of Burundi",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-universite-espoir-d-afrique",
        name: "Université Espoir d'Afrique",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 4.0 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-universite-des-grands-lacs",
        name: "Université des Grands Lacs",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-universite-lumiere-de-bujumbura",
        name: "Université Lumière de Bujumbura",
        cityId: "burundi-bujumbura",
        website: "http://www.ulbu.bi/",
        source: "open-dataset",
        // Situada a 4.0 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-universite-du-lac-tanganyika",
        name: "Université du Lac Tanganyika",
        cityId: "burundi-bujumbura",
        website: null,
        source: "open-dataset",
        // Situada a 3.5 km del centro de Bujumbura (Wikidata).
      }),
      defineUniversity({
        id: "burundi-bujumbura-universite-du-burundi",
        name: "Université du Burundi",
        cityId: "burundi-bujumbura",
        website: "http://www.ub.edu.bi/",
        source: "open-dataset",
        // Situada a 2.6 km del centro de Bujumbura (Wikidata).
      }),
  ],
  "burundi-ngozi": [
      defineUniversity({
        id: "burundi-ngozi-universite-de-ngozi",
        name: "Université de Ngozi",
        cityId: "burundi-ngozi",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Ngozi (Wikidata).
      }),
      defineUniversity({
        id: "burundi-ngozi-universite-de-ngozi",
        name: "Université de Ngozi",
        cityId: "burundi-ngozi",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Ngozi (Wikidata).
      }),
  ],
};
