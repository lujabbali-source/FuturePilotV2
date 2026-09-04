// Universidades por ciudad de Omán. Generado; no editar a mano.
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
  "oman-ibra": [
      defineUniversity({
        id: "oman-ibra-a-sharqiyah-university",
        name: "A'Sharqiyah University",
        cityId: "oman-ibra",
        website: null,
        source: "open-dataset",
        // Situada a 10.2 km del centro de Ibrā’ (Wikidata).
      }),
      defineUniversity({
        id: "oman-ibra-a-sharqiyah-university",
        name: "A'Sharqiyah University",
        cityId: "oman-ibra",
        website: null,
        source: "open-dataset",
        // Situada a 10.0 km del centro de Ibrā’ (Wikidata).
      }),
  ],
  "oman-seeb": [
      defineUniversity({
        id: "oman-seeb-german-university-of-technology-in-oman",
        name: "German University of Technology in Oman",
        cityId: "oman-seeb",
        website: null,
        source: "open-dataset",
        // Situada a 15.1 km del centro de Seeb (Wikidata).
      }),
      defineUniversity({
        id: "oman-seeb-sultan-qaboos-university",
        name: "Sultan Qaboos University",
        cityId: "oman-seeb",
        website: "http://www.squ.edu.om/",
        source: "open-dataset",
        // Situada a 8.0 km del centro de Seeb (Wikidata).
      }),
  ],
};
