// Universidades por ciudad de Malaui. Generado; no editar a mano.
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
  "malaui-zomba": [
      defineUniversity({
        id: "malaui-zomba-zomba-theological-college",
        name: "Zomba Theological College",
        cityId: "malaui-zomba",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Zomba (Wikidata).
      }),
      defineUniversity({
        id: "malaui-zomba-university-of-malawi",
        name: "University of Malawi",
        cityId: "malaui-zomba",
        website: "http://www.unima.ac.mw/",
        source: "open-dataset",
        // Situada a 1.1 km del centro de Zomba (Wikidata).
      }),
  ],
  "malaui-mzuzu": [
      defineUniversity({
        id: "malaui-mzuzu-mzuzu-university",
        name: "Mzuzu University",
        cityId: "malaui-mzuzu",
        website: "http://www.mzuni.ac.mw/",
        source: "open-dataset",
        // Situada a 5.7 km del centro de Mzuzu (Wikidata).
      }),
      defineUniversity({
        id: "malaui-mzuzu-mzuzu-university",
        name: "Mzuzu University",
        cityId: "malaui-mzuzu",
        website: "http://www.mzuni.ac.mw/",
        source: "open-dataset",
        // Situada a 5.7 km del centro de Mzuzu (Wikidata).
      }),
  ],
  "malaui-lilongwe": [
      defineUniversity({
        id: "malaui-lilongwe-malawi-adventist-university",
        name: "Malawi Adventist University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a 9.5 km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-malawi-adventist-university",
        name: "Malawi Adventist University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a 9.5 km del centro de Lilongwe (Wikidata).
      }),
  ],
  "malaui-blantyre": [
      defineUniversity({
        id: "malaui-blantyre-catholic-university-of-malawi",
        name: "Catholic University of Malawi",
        cityId: "malaui-blantyre",
        website: "http://www.cunima.net/",
        source: "open-dataset",
        // Situada a 18.5 km del centro de Blantyre (Wikidata).
      }),
      defineUniversity({
        id: "malaui-blantyre-malawi-university-of-science-and-technology",
        name: "Malawi University of Science and Technology",
        cityId: "malaui-blantyre",
        website: "http://www.must.ac.mw/",
        source: "open-dataset",
        // Situada a 25.8 km del centro de Blantyre (Wikidata).
      }),
  ],
};
