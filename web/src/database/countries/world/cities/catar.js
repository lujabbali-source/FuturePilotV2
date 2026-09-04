// Universidades por ciudad de Catar. Generado; no editar a mano.
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
  "catar-ar-rayyan": [
      defineUniversity({
        id: "catar-ar-rayyan-virginia-commonwealth-university-qatar",
        name: "Virginia Commonwealth University - Qatar",
        cityId: "catar-ar-rayyan",
        website: null,
        source: "open-dataset",
        // Situada a 2.7 km del centro de Ar Rayyān (Wikidata).
      }),
      defineUniversity({
        id: "catar-ar-rayyan-hamad-bin-khalifa-university",
        name: "Hamad Bin Khalifa University",
        cityId: "catar-ar-rayyan",
        website: "https://www.hbku.edu.qa/",
        source: "open-dataset",
        // Situada a 2.6 km del centro de Ar Rayyān (Wikidata).
      }),
      defineUniversity({
        id: "catar-ar-rayyan-carnegie-mellon-university-qatar",
        name: "Carnegie Mellon University, Qatar",
        cityId: "catar-ar-rayyan",
        website: "https://www.qatar.cmu.edu/",
        source: "open-dataset",
        // Situada a 3.1 km del centro de Ar Rayyān (Wikidata).
      }),
  ],
  "catar-umm-lakhba": [
      defineUniversity({
        id: "catar-umm-lakhba-qatar-university",
        name: "Qatar University",
        cityId: "catar-umm-lakhba",
        website: null,
        source: "open-dataset",
        // Situada a 4.2 km del centro de Umm Lakhbā (Wikidata).
      }),
      defineUniversity({
        id: "catar-umm-lakhba-university-of-doha-for-science-and-technology",
        name: "University of Doha for Science and Technology",
        cityId: "catar-umm-lakhba",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Umm Lakhbā (Wikidata).
      }),
  ],
};
