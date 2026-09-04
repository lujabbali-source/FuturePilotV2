// Universidades por ciudad de Suecia. Generado; no editar a mano.
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
  "suecia-vasastaden": [
      defineUniversity({
        id: "suecia-vasastaden-karolinska-institutet",
        name: "Karolinska Institutet",
        cityId: "suecia-vasastaden",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Vasastaden (Wikidata).
      }),
      defineUniversity({
        id: "suecia-vasastaden-stockholm-university",
        name: "Stockholm University",
        cityId: "suecia-vasastaden",
        website: "http://www.su.se/",
        source: "open-dataset",
        // Situada a 2.1 km del centro de Vasastaden (Wikidata).
      }),
      defineUniversity({
        id: "suecia-vasastaden-military-academy-karlberg",
        name: "Military Academy Karlberg",
        cityId: "suecia-vasastaden",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Vasastaden (Wikidata).
      }),
  ],
  "suecia-malmo": [
      defineUniversity({
        id: "suecia-malmo-world-maritime-university",
        name: "World Maritime University",
        cityId: "suecia-malmo",
        website: "http://www.wmu.se/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Malmö (Wikidata).
      }),
      defineUniversity({
        id: "suecia-malmo-world-maritime-university",
        name: "World Maritime University",
        cityId: "suecia-malmo",
        website: "http://www.wmu.se/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Malmö (Wikidata).
      }),
      defineUniversity({
        id: "suecia-malmo-malmo-university",
        name: "Malmö University",
        cityId: "suecia-malmo",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Malmö (Wikidata).
      }),
  ],
  "suecia-vaxjo": [
      defineUniversity({
        id: "suecia-vaxjo-linnaeus-university",
        name: "Linnaeus University",
        cityId: "suecia-vaxjo",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Växjö (Wikidata).
      }),
      defineUniversity({
        id: "suecia-vaxjo-vaxjo-university",
        name: "Växjö University",
        cityId: "suecia-vaxjo",
        website: "http://www.vxu.se/",
        source: "open-dataset",
        // Situada a 2.9 km del centro de Växjö (Wikidata).
      }),
  ],
  "suecia-uppsala": [
      defineUniversity({
        id: "suecia-uppsala-swedish-university-of-agricultural-sciences",
        name: "Swedish University of Agricultural Sciences",
        cityId: "suecia-uppsala",
        website: "http://www.slu.se/",
        source: "open-dataset",
        // Situada a 5.1 km del centro de Uppsala (Wikidata).
      }),
      defineUniversity({
        id: "suecia-uppsala-uppsala-university",
        name: "Uppsala University",
        cityId: "suecia-uppsala",
        website: "http://www.uu.se/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Uppsala (Wikidata).
      }),
  ],
  "suecia-ostermalm": [
      defineUniversity({
        id: "suecia-ostermalm-swedish-defence-university",
        name: "Swedish Defence University",
        cityId: "suecia-ostermalm",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Östermalm (Wikidata).
      }),
      defineUniversity({
        id: "suecia-ostermalm-royal-institute-of-technology",
        name: "Royal Institute of Technology",
        cityId: "suecia-ostermalm",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Östermalm (Wikidata).
      }),
  ],
  "suecia-gothenburg": [
      defineUniversity({
        id: "suecia-gothenburg-university-of-gothenburg",
        name: "University of Gothenburg",
        cityId: "suecia-gothenburg",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Gothenburg (Wikidata).
      }),
      defineUniversity({
        id: "suecia-gothenburg-chalmers-university-of-technology",
        name: "Chalmers University of Technology",
        cityId: "suecia-gothenburg",
        website: "http://www.chalmers.se/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Gothenburg (Wikidata).
      }),
  ],
};
