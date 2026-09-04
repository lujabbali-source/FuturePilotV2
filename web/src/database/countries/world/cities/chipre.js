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
        id: "chipre-nicosia-netkent-research-and-science-university",
        name: "Netkent Research and Science University",
        cityId: "chipre-nicosia",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-near-east-university",
        name: "Near East University",
        cityId: "chipre-nicosia",
        website: "http://www.neu.edu.tr/",
        source: "open-dataset",
        // Situada a 6.6 km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-philips-university",
        name: "Philips University",
        cityId: "chipre-nicosia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-cyprus-international-university",
        name: "Cyprus International University",
        cityId: "chipre-nicosia",
        website: "http://www.ciu.edu.tr/",
        source: "open-dataset",
        // Situada a None km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-university-of-limassol",
        name: "University of Limassol",
        cityId: "chipre-nicosia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-kes-college",
        name: "KES College",
        cityId: "chipre-nicosia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-k-br-s-sagl-k-ve-toplum-bilimleri-universitesi",
        name: "Kıbrıs Sağlık ve Toplum Bilimleri Üniversitesi",
        cityId: "chipre-nicosia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-cyprus-institute-of-marketing",
        name: "Cyprus Institute of Marketing",
        cityId: "chipre-nicosia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nicosia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-nicosia-university-of-mediterranean-karpasia",
        name: "University of Mediterranean Karpasia",
        cityId: "chipre-nicosia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nicosia (Wikidata).
      }),
  ],
  "chipre-kyrenia": [
      defineUniversity({
        id: "chipre-kyrenia-girne-american-university",
        name: "Girne American University",
        cityId: "chipre-kyrenia",
        website: "http://www.gau.edu.tr/",
        source: "open-dataset",
        // Situada a 3.9 km del centro de Kyrenia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-kyrenia-final-international-university",
        name: "Final International University",
        cityId: "chipre-kyrenia",
        website: null,
        source: "open-dataset",
        // Situada a 4.1 km del centro de Kyrenia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-kyrenia-university-of-kyrenia",
        name: "University of Kyrenia",
        cityId: "chipre-kyrenia",
        website: "https://kyrenia.edu.tr/",
        source: "open-dataset",
        // Situada a None km del centro de Kyrenia (Wikidata).
      }),
      defineUniversity({
        id: "chipre-kyrenia-british-university-of-nicosia",
        name: "British University of Nicosia",
        cityId: "chipre-kyrenia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kyrenia (Wikidata).
      }),
  ],
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
  "chipre-morfou": [
      defineUniversity({
        id: "chipre-morfou-european-university-of-lefke",
        name: "European University of Lefke",
        cityId: "chipre-morfou",
        website: "http://www.lefke.edu.tr/",
        source: "open-dataset",
        // Situada a 16.6 km del centro de Mórfou (Wikidata).
      }),
      defineUniversity({
        id: "chipre-morfou-middle-east-technical-university-northern-cyprus-campus",
        name: "Middle East Technical University Northern Cyprus Campus",
        cityId: "chipre-morfou",
        website: "https://ncc.metu.edu.tr/",
        source: "open-dataset",
        // Situada a 5.9 km del centro de Mórfou (Wikidata).
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
        id: "chipre-limassol-dublin-metropolitan-university",
        name: "Dublin Metropolitan University",
        cityId: "chipre-limassol",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Limassol (Wikidata).
      }),
  ],
  "chipre-famagusta": [
      defineUniversity({
        id: "chipre-famagusta-cyprus-west-university",
        name: "Cyprus West University",
        cityId: "chipre-famagusta",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Famagusta (Wikidata).
      }),
      defineUniversity({
        id: "chipre-famagusta-european-leadership-university",
        name: "European Leadership University",
        cityId: "chipre-famagusta",
        website: "https://amsterdam.tech/",
        source: "open-dataset",
        // Situada a None km del centro de Famagusta (Wikidata).
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
