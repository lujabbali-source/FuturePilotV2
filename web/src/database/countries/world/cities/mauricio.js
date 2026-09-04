// Universidades por ciudad de Mauricio. Generado; no editar a mano.
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
  "mauricio-beau-bassin-rose-hill": [
      defineUniversity({
        id: "mauricio-beau-bassin-rose-hill-university-of-mauritius",
        name: "University of Mauritius",
        cityId: "mauricio-beau-bassin-rose-hill",
        website: "http://www.uom.ac.mu/",
        source: "open-dataset",
        // Situada a 3.2 km del centro de Beau Bassin-Rose Hill (Wikidata).
      }),
      defineUniversity({
        id: "mauricio-beau-bassin-rose-hill-universite-des-mascareignes",
        name: "Université des Mascareignes",
        cityId: "mauricio-beau-bassin-rose-hill",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Beau Bassin-Rose Hill (Wikidata).
      }),
      defineUniversity({
        id: "mauricio-beau-bassin-rose-hill-mauritius-college-of-the-air",
        name: "Mauritius College of the Air",
        cityId: "mauricio-beau-bassin-rose-hill",
        website: null,
        source: "open-dataset",
        // Situada a 3.5 km del centro de Beau Bassin-Rose Hill (Wikidata).
      }),
      defineUniversity({
        id: "mauricio-beau-bassin-rose-hill-open-university-of-mauritius",
        name: "Open University of Mauritius",
        cityId: "mauricio-beau-bassin-rose-hill",
        website: null,
        source: "open-dataset",
        // Situada a 3.5 km del centro de Beau Bassin-Rose Hill (Wikidata).
      }),
  ],
};
