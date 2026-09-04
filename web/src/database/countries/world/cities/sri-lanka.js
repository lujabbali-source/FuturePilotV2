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
  "sri-lanka-moratuwa": [
      defineUniversity({
        id: "sri-lanka-moratuwa-university-of-moratuwa",
        name: "University of Moratuwa",
        cityId: "sri-lanka-moratuwa",
        website: "http://www.mrt.ac.lk/",
        source: "open-dataset",
        // Situada a 3.4 km del centro de Moratuwa (Wikidata).
      }),
      defineUniversity({
        id: "sri-lanka-moratuwa-university-of-moratuwa",
        name: "University of Moratuwa",
        cityId: "sri-lanka-moratuwa",
        website: "http://www.mrt.ac.lk/",
        source: "open-dataset",
        // Situada a 3.4 km del centro de Moratuwa (Wikidata).
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
  ],
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
  ],
};
