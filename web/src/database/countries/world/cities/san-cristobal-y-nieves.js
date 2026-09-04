// Universidades por ciudad de San Cristóbal y Nieves. Generado; no editar a mano.
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
  "san-cristobal-y-nieves-basseterre": [
      defineUniversity({
        id: "san-cristobal-y-nieves-basseterre-ross-university-school-of-veterinary-medicine",
        name: "Ross University School of Veterinary Medicine",
        cityId: "san-cristobal-y-nieves-basseterre",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Basseterre (Wikidata).
      }),
      defineUniversity({
        id: "san-cristobal-y-nieves-basseterre-university-of-medicine-and-health-sciences",
        name: "University of Medicine and Health Sciences",
        cityId: "san-cristobal-y-nieves-basseterre",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Basseterre (Wikidata).
      }),
  ],
};
