// Universidades por ciudad de Botsuana. Generado; no editar a mano.
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
  "botsuana-gaborone": [
      defineUniversity({
        id: "botsuana-gaborone-botswana-institute-of-administration-and-commerce",
        name: "Botswana Institute of Administration and Commerce",
        cityId: "botsuana-gaborone",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Gaborone (Wikidata).
      }),
      defineUniversity({
        id: "botsuana-gaborone-university-of-botswana",
        name: "University of Botswana",
        cityId: "botsuana-gaborone",
        website: "http://www.ub.bw/",
        source: "open-dataset",
        // Situada a 2.8 km del centro de Gaborone (Wikidata).
      }),
      defineUniversity({
        id: "botsuana-gaborone-botho-college",
        name: "Botho College",
        cityId: "botsuana-gaborone",
        website: null,
        source: "open-dataset",
        // Situada a 4.6 km del centro de Gaborone (Wikidata).
      }),
      defineUniversity({
        id: "botsuana-gaborone-ba-isago-university",
        name: "BA ISAGO University",
        cityId: "botsuana-gaborone",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Gaborone (Wikidata).
      }),
  ],
};
