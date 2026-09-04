// Universidades por ciudad de Zambia. Generado; no editar a mano.
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
  "zambia-lusaka": [
      defineUniversity({
        id: "zambia-lusaka-university-of-zambia",
        name: "University of Zambia",
        cityId: "zambia-lusaka",
        website: "http://www.unza.zm/",
        source: "open-dataset",
        // Situada a 5.0 km del centro de Lusaka (Wikidata).
      }),
      defineUniversity({
        id: "zambia-lusaka-rockview-university",
        name: "Rockview University",
        cityId: "zambia-lusaka",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Lusaka (Wikidata).
      }),
      defineUniversity({
        id: "zambia-lusaka-cavendish-university-zambia",
        name: "Cavendish University Zambia",
        cityId: "zambia-lusaka",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Lusaka (Wikidata).
      }),
      defineUniversity({
        id: "zambia-lusaka-nkrumah-university",
        name: "Nkrumah University",
        cityId: "zambia-lusaka",
        website: null,
        source: "open-dataset",
        // Situada a 5.0 km del centro de Lusaka (Wikidata).
      }),
      defineUniversity({
        id: "zambia-lusaka-university-of-lusaka",
        name: "University of Lusaka",
        cityId: "zambia-lusaka",
        website: "http://www.unilus.ac.zm/",
        source: "open-dataset",
        // Situada a 4.6 km del centro de Lusaka (Wikidata).
      }),
      defineUniversity({
        id: "zambia-lusaka-united-nations-institute-for-namibia",
        name: "United Nations Institute for Namibia",
        cityId: "zambia-lusaka",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lusaka (Wikidata).
      }),
  ],
  "zambia-kitwe": [
      defineUniversity({
        id: "zambia-kitwe-zambia-forestry-college",
        name: "Zambia Forestry College",
        cityId: "zambia-kitwe",
        website: null,
        source: "open-dataset",
        // Situada a 16.6 km del centro de Kitwe (Wikidata).
      }),
      defineUniversity({
        id: "zambia-kitwe-mukuba-university",
        name: "Mukuba University",
        cityId: "zambia-kitwe",
        website: null,
        source: "open-dataset",
        // Situada a 11.0 km del centro de Kitwe (Wikidata).
      }),
      defineUniversity({
        id: "zambia-kitwe-copperbelt-university",
        name: "Copperbelt University",
        cityId: "zambia-kitwe",
        website: "http://www.cbu.edu.zm/",
        source: "open-dataset",
        // Situada a 3.0 km del centro de Kitwe (Wikidata).
      }),
      defineUniversity({
        id: "zambia-kitwe-central-african-baptist-university",
        name: "Central African Baptist University",
        cityId: "zambia-kitwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kitwe (Wikidata).
      }),
      defineUniversity({
        id: "zambia-kitwe-copperstone-university",
        name: "Copperstone University",
        cityId: "zambia-kitwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kitwe (Wikidata).
      }),
      defineUniversity({
        id: "zambia-kitwe-mindolo-ecumenical-centre",
        name: "Mindolo Ecumenical Centre",
        cityId: "zambia-kitwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kitwe (Wikidata).
      }),
  ],
  "zambia-kabwe": [
      defineUniversity({
        id: "zambia-kabwe-mulungushi-university",
        name: "Mulungushi University",
        cityId: "zambia-kabwe",
        website: "http://www.mu.ac.zm/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Kabwe (Wikidata).
      }),
      defineUniversity({
        id: "zambia-kabwe-paglory-university",
        name: "Paglory University",
        cityId: "zambia-kabwe",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Kabwe (Wikidata).
      }),
  ],
};
