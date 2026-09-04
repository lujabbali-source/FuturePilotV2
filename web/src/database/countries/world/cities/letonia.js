// Universidades por ciudad de Letonia. Generado; no editar a mano.
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
  "letonia-riga": [
      defineUniversity({
        id: "letonia-riga-riga-stradins-university",
        name: "Riga Stradiņš University",
        cityId: "letonia-riga",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Riga (Wikidata).
      }),
      defineUniversity({
        id: "letonia-riga-riga-technical-university",
        name: "Riga Technical University",
        cityId: "letonia-riga",
        website: "http://www.rtu.lv/",
        source: "open-dataset",
        // Situada a 0.1 km del centro de Riga (Wikidata).
      }),
      defineUniversity({
        id: "letonia-riga-latvian-maritime-academy",
        name: "Latvian Maritime Academy",
        cityId: "letonia-riga",
        website: "http://www.lama.lv/",
        source: "open-dataset",
        // Situada a 12.1 km del centro de Riga (Wikidata).
      }),
      defineUniversity({
        id: "letonia-riga-riseba-university-of-business-arts-and-technology",
        name: "RISEBA University of Business, Arts and Technology",
        cityId: "letonia-riga",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Riga (Wikidata).
      }),
      defineUniversity({
        id: "letonia-riga-university-of-latvia",
        name: "University of Latvia",
        cityId: "letonia-riga",
        website: "http://www.lu.lv/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Riga (Wikidata).
      }),
  ],
  "letonia-darzciems": [
      defineUniversity({
        id: "letonia-darzciems-riga-nordic-university",
        name: "Riga Nordic University",
        cityId: "letonia-darzciems",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Dārzciems (Wikidata).
      }),
      defineUniversity({
        id: "letonia-darzciems-baltic-international-academy",
        name: "Baltic International Academy",
        cityId: "letonia-darzciems",
        website: "http://www.bsa.edu.lv/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Dārzciems (Wikidata).
      }),
      defineUniversity({
        id: "letonia-darzciems-latvian-academy-of-culture",
        name: "Latvian Academy of Culture",
        cityId: "letonia-darzciems",
        website: "http://www.lka.edu.lv/",
        source: "open-dataset",
        // Situada a 2.0 km del centro de Dārzciems (Wikidata).
      }),
      defineUniversity({
        id: "letonia-darzciems-riga-civil-aviation-engineers-institute",
        name: "Riga Civil Aviation Engineers Institute",
        cityId: "letonia-darzciems",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Dārzciems (Wikidata).
      }),
  ],
};
