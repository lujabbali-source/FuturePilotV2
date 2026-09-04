// Universidades por ciudad de Chipre. Generado; no editar a mano.
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
  "chipre-strovolos": [
      defineUniversity({
        id: "chipre-strovolos-european-university-cyprus",
        name: "European University Cyprus",
        cityId: "chipre-strovolos",
        website: "http://www.euc.ac.cy/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Stróvolos (Wikidata).
      }),
      defineUniversity({
        id: "chipre-strovolos-university-of-nicosia",
        name: "University of Nicosia",
        cityId: "chipre-strovolos",
        website: "http://www.unic.ac.cy/",
        source: "open-dataset",
        // Situada a 2.6 km del centro de Stróvolos (Wikidata).
      }),
      defineUniversity({
        id: "chipre-strovolos-cyprus-college",
        name: "Cyprus College",
        cityId: "chipre-strovolos",
        website: "http://www.cycollege.ac.cy/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Stróvolos (Wikidata).
      }),
  ],
  "chipre-nicosia": [
      defineUniversity({
        id: "chipre-nicosia-frederick-university",
        name: "Frederick University",
        cityId: "chipre-nicosia",
        website: "http://www.frederick.ac.cy/",
        source: "open-dataset",
        // Situada a 2.3 km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-near-east-university",
        name: "Near East University",
        cityId: "chipre-nicosia",
        website: "http://www.neu.edu.tr/",
        source: "open-dataset",
        // Situada a 6.6 km del centro de Nicosia (Wikidata).
      }),
  ],
  "chipre-limassol": [
      defineUniversity({
        id: "chipre-limassol-cyprus-university-of-technology",
        name: "Cyprus University of Technology",
        cityId: "chipre-limassol",
        website: "http://www.cut.ac.cy/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Limassol (Wikidata).
      }),
      defineUniversity({
        id: "chipre-limassol-cyprus-university-of-technology",
        name: "Cyprus University of Technology",
        cityId: "chipre-limassol",
        website: "http://www.cut.ac.cy/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Limassol (Wikidata).
      }),
  ],
  "chipre-aglantzia": [
      defineUniversity({
        id: "chipre-aglantzia-university-of-cyprus",
        name: "University of Cyprus",
        cityId: "chipre-aglantzia",
        website: "http://www.ucy.ac.cy/",
        source: "open-dataset",
        // Situada a 1.8 km del centro de Aglantziá (Wikidata).
      }),
      defineUniversity({
        id: "chipre-aglantzia-higher-technical-institute-of-cyprus",
        name: "Higher Technical Institute of Cyprus",
        cityId: "chipre-aglantzia",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Aglantziá (Wikidata).
      }),
  ],
};
