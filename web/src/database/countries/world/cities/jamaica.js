// Universidades por ciudad de Jamaica. Generado; no editar a mano.
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
  "jamaica-new-kingston": [
      defineUniversity({
        id: "jamaica-new-kingston-university-of-technology",
        name: "University of Technology",
        cityId: "jamaica-new-kingston",
        website: "http://www.utm.ac.mu/",
        source: "open-dataset",
        // Situada a 4.3 km del centro de New Kingston (Wikidata).
      }),
      defineUniversity({
        id: "jamaica-new-kingston-university-of-the-west-indies",
        name: "University of the West Indies",
        cityId: "jamaica-new-kingston",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de New Kingston (Wikidata).
      }),
      defineUniversity({
        id: "jamaica-new-kingston-university-of-the-commonwealth-caribbean",
        name: "University of the Commonwealth Caribbean",
        cityId: "jamaica-new-kingston",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de New Kingston (Wikidata).
      }),
  ],
  "jamaica-kingston": [
      defineUniversity({
        id: "jamaica-kingston-mico-university-college",
        name: "Mico University College",
        cityId: "jamaica-kingston",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Kingston (Wikidata).
      }),
      defineUniversity({
        id: "jamaica-kingston-international-university-of-the-caribbean",
        name: "International University of the Caribbean",
        cityId: "jamaica-kingston",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kingston (Wikidata).
      }),
  ],
};
