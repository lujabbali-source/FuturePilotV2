// Universidades por ciudad de Esuatini. Generado; no editar a mano.
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
  "esuatini-mbabane": [
      defineUniversity({
        id: "esuatini-mbabane-limkokwing-university-of-creative-technology-swaziland",
        name: "Limkokwing University of Creative Technology Swaziland",
        cityId: "esuatini-mbabane",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Mbabane (Wikidata).
      }),
      defineUniversity({
        id: "esuatini-mbabane-rutherford-university",
        name: "Rutherford University",
        cityId: "esuatini-mbabane",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Mbabane (Wikidata).
      }),
  ],
  "esuatini-manzini": [
      defineUniversity({
        id: "esuatini-manzini-university-of-eswatini",
        name: "University of Eswatini",
        cityId: "esuatini-manzini",
        website: null,
        source: "open-dataset",
        // Situada a 7.0 km del centro de Manzini (Wikidata).
      }),
      defineUniversity({
        id: "esuatini-manzini-southern-africa-nazarene-university",
        name: "Southern Africa Nazarene University",
        cityId: "esuatini-manzini",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Manzini (Wikidata).
      }),
  ],
};
