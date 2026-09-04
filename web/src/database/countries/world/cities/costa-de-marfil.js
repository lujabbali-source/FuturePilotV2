// Universidades por ciudad de Costa de Marfil. Generado; no editar a mano.
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
  "costa-de-marfil-san-pedro": [
      defineUniversity({
        id: "costa-de-marfil-san-pedro-university-of-san-pedro",
        name: "University of San Pedro",
        cityId: "costa-de-marfil-san-pedro",
        website: null,
        source: "open-dataset",
        // Situada a 8.1 km del centro de San-Pédro (Wikidata).
      }),
  ],
  "costa-de-marfil-abobo": [
      defineUniversity({
        id: "costa-de-marfil-abobo-university-of-abobo-adjame",
        name: "University of Abobo-Adjamé",
        cityId: "costa-de-marfil-abobo",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Abobo (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abobo-university-of-abobo-adjame",
        name: "University of Abobo-Adjamé",
        cityId: "costa-de-marfil-abobo",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Abobo (Wikidata).
      }),
  ],
  "costa-de-marfil-marcory": [
      defineUniversity({
        id: "costa-de-marfil-marcory-universite-catholique-de-l-afrique-de-l-ouest",
        name: "Université Catholique de l'Afrique de l'Ouest",
        cityId: "costa-de-marfil-marcory",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Marcory (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-marcory-higher-institute-of-technology-of-ivory-coast",
        name: "Higher Institute of Technology of Ivory Coast",
        cityId: "costa-de-marfil-marcory",
        website: null,
        source: "open-dataset",
        // Situada a 3.5 km del centro de Marcory (Wikidata).
      }),
  ],
};
