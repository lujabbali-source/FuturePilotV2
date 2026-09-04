// Universidades por ciudad de República Checa. Generado; no editar a mano.
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
  "republica-checa-olomouc": [
      defineUniversity({
        id: "republica-checa-olomouc-jesuit-college-building-in-olomouc",
        name: "Jesuit college building in Olomouc",
        cityId: "republica-checa-olomouc",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Olomouc (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-olomouc-saints-cyril-and-methodius-faculty-of-theology-of-palacky-university-olomouc",
        name: "Saints Cyril and Methodius Faculty of Theology of Palacký University, Olomouc",
        cityId: "republica-checa-olomouc",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Olomouc (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-olomouc-palacky-university-olomouc",
        name: "Palacký University Olomouc",
        cityId: "republica-checa-olomouc",
        website: "https://www.upol.cz/",
        source: "open-dataset",
        // Situada a 0.5 km del centro de Olomouc (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-olomouc-cyrilometodejska-teologicka-fakulta-univerzity-palackeho",
        name: "Cyrilometodějská teologická fakulta Univerzity Palackého",
        cityId: "republica-checa-olomouc",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Olomouc (Wikidata).
      }),
  ],
  "republica-checa-brno": [
      defineUniversity({
        id: "republica-checa-brno-brno-university-of-technology",
        name: "Brno University of Technology",
        cityId: "republica-checa-brno",
        website: "https://www.vutbr.cz/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Brno (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-brno-janacek-academy-of-music-and-performing-arts",
        name: "Janáček Academy of Music and Performing Arts",
        cityId: "republica-checa-brno",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Brno (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-brno-masaryk-university",
        name: "Masaryk University",
        cityId: "republica-checa-brno",
        website: "https://www.muni.cz/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Brno (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-brno-jesuit-college-in-brno",
        name: "Jesuit college in Brno",
        cityId: "republica-checa-brno",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Brno (Wikidata).
      }),
  ],
  "republica-checa-zizkov": [
      defineUniversity({
        id: "republica-checa-zizkov-prague-university-of-economics-and-business",
        name: "Prague University of Economics and Business",
        cityId: "republica-checa-zizkov",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Žižkov (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-zizkov-prague-university-of-economics-and-business",
        name: "Prague University of Economics and Business",
        cityId: "republica-checa-zizkov",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Žižkov (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-zizkov-unicorn-university",
        name: "Unicorn University",
        cityId: "republica-checa-zizkov",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Žižkov (Wikidata).
      }),
  ],
  "republica-checa-prague": [
      defineUniversity({
        id: "republica-checa-prague-charles-university",
        name: "Charles University",
        cityId: "republica-checa-prague",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Prague (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-prague-charles-university",
        name: "Charles University",
        cityId: "republica-checa-prague",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Prague (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-prague-academy-of-performing-arts",
        name: "Academy of Performing Arts",
        cityId: "republica-checa-prague",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Prague (Wikidata).
      }),
  ],
  "republica-checa-nove-mesto": [
      defineUniversity({
        id: "republica-checa-nove-mesto-university-of-business-in-prague",
        name: "University of Business in Prague",
        cityId: "republica-checa-nove-mesto",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Nové Město (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-nove-mesto-jezuitska-kolej-karlovo-namesti",
        name: "Jezuitská kolej Karlovo náměstí",
        cityId: "republica-checa-nove-mesto",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Nové Město (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-nove-mesto-university-of-new-york-in-prague",
        name: "University of New York in Prague",
        cityId: "republica-checa-nove-mesto",
        website: "http://www.unyp.cz/",
        source: "open-dataset",
        // Situada a 0.7 km del centro de Nové Město (Wikidata).
      }),
  ],
  "republica-checa-jihlava": [
      defineUniversity({
        id: "republica-checa-jihlava-jesuit-college-telc",
        name: "Jesuit College (Telč)",
        cityId: "republica-checa-jihlava",
        website: null,
        source: "open-dataset",
        // Situada a 25.6 km del centro de Jihlava (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-jihlava-jesuit-seminary-in-telc",
        name: "Jesuit seminary in Telč",
        cityId: "republica-checa-jihlava",
        website: null,
        source: "open-dataset",
        // Situada a 25.6 km del centro de Jihlava (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-jihlava-jesuit-collegium",
        name: "Jesuit collegium",
        cityId: "republica-checa-jihlava",
        website: null,
        source: "open-dataset",
        // Situada a 0.1 km del centro de Jihlava (Wikidata).
      }),
  ],
  "republica-checa-dejvice": [
      defineUniversity({
        id: "republica-checa-dejvice-catholic-theological-faculty-of-charles-university",
        name: "Catholic Theological Faculty of Charles University",
        cityId: "republica-checa-dejvice",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Dejvice (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-dejvice-czech-technical-university-in-prague",
        name: "Czech Technical University in Prague",
        cityId: "republica-checa-dejvice",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Dejvice (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-dejvice-university-of-chemistry-and-technology",
        name: "University of Chemistry and Technology",
        cityId: "republica-checa-dejvice",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Dejvice (Wikidata).
      }),
  ],
  "republica-checa-ceske-budejovice": [
      defineUniversity({
        id: "republica-checa-ceske-budejovice-university-of-south-bohemia-in-ceske-budejovice",
        name: "University of South Bohemia in České Budějovice",
        cityId: "republica-checa-ceske-budejovice",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de České Budějovice (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-ceske-budejovice-horni-152-cesky-krumlov",
        name: "Horní 152 (Český Krumlov)",
        cityId: "republica-checa-ceske-budejovice",
        website: null,
        source: "open-dataset",
        // Situada a 21.5 km del centro de České Budějovice (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-ceske-budejovice-jesuit-college-in-cesky-krumlov",
        name: "Jesuit college in Český Krumlov",
        cityId: "republica-checa-ceske-budejovice",
        website: null,
        source: "open-dataset",
        // Situada a 21.5 km del centro de České Budějovice (Wikidata).
      }),
  ],
  "republica-checa-pilsen": [
      defineUniversity({
        id: "republica-checa-pilsen-university-of-west-bohemia",
        name: "University of West Bohemia",
        cityId: "republica-checa-pilsen",
        website: "http://www.zcu.cz/",
        source: "open-dataset",
        // Situada a 3.6 km del centro de Pilsen (Wikidata).
      }),
      defineUniversity({
        id: "republica-checa-pilsen-university-of-west-bohemia",
        name: "University of West Bohemia",
        cityId: "republica-checa-pilsen",
        website: "http://www.zcu.cz/",
        source: "open-dataset",
        // Situada a 3.6 km del centro de Pilsen (Wikidata).
      }),
  ],
  "republica-checa-jindrichuv-hradec": [

  ],
  "republica-checa-jicin": [
      defineUniversity({
        id: "republica-checa-jicin-jesuit-college-in-jicin",
        name: "Jesuit college in Jičín",
        cityId: "republica-checa-jicin",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Jičín (Wikidata).
      }),
  ],
};
