// Universidades por ciudad de Grecia. Generado; no editar a mano.
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
  "grecia-athens": [
      defineUniversity({
        id: "grecia-athens-keele-university-greece",
        name: "Keele University Greece",
        cityId: "grecia-athens",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Athens (Wikidata).
      }),
      defineUniversity({
        id: "grecia-athens-athens-university-of-economics-and-business",
        name: "Athens University of Economics and Business",
        cityId: "grecia-athens",
        website: "https://www.aueb.gr/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Athens (Wikidata).
      }),
      defineUniversity({
        id: "grecia-athens-national-technical-university-of-athens",
        name: "National Technical University of Athens",
        cityId: "grecia-athens",
        website: "https://www.ntua.gr/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Athens (Wikidata).
      }),
      defineUniversity({
        id: "grecia-athens-university-of-athens",
        name: "University of Athens",
        cityId: "grecia-athens",
        website: "https://www.uoa.gr/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Athens (Wikidata).
      }),
      defineUniversity({
        id: "grecia-athens-vakalo-art-design-college",
        name: "Vakalo Art & Design College",
        cityId: "grecia-athens",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Athens (Wikidata).
      }),
  ],
  "grecia-thessaloniki": [
      defineUniversity({
        id: "grecia-thessaloniki-university-of-macedonia",
        name: "University of Macedonia",
        cityId: "grecia-thessaloniki",
        website: "https://www.uom.gr/",
        source: "open-dataset",
        // Situada a 2.7 km del centro de Thessaloníki (Wikidata).
      }),
      defineUniversity({
        id: "grecia-thessaloniki-salonica-law-school",
        name: "Salonica Law School",
        cityId: "grecia-thessaloniki",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Thessaloníki (Wikidata).
      }),
      defineUniversity({
        id: "grecia-thessaloniki-city-college-university-of-york-europe-campus",
        name: "CITY College, University of York Europe Campus",
        cityId: "grecia-thessaloniki",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Thessaloníki (Wikidata).
      }),
  ],
  "grecia-piraeus": [
      defineUniversity({
        id: "grecia-piraeus-university-of-piraeus",
        name: "University of Piraeus",
        cityId: "grecia-piraeus",
        website: "https://www.unipi.gr/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Piraeus (Wikidata).
      }),
      defineUniversity({
        id: "grecia-piraeus-hellenic-naval-academy",
        name: "Hellenic Naval Academy",
        cityId: "grecia-piraeus",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Piraeus (Wikidata).
      }),
  ],
  "grecia-patra": [
      defineUniversity({
        id: "grecia-patra-university-of-patras",
        name: "University of Patras",
        cityId: "grecia-patra",
        website: "https://www.upatras.gr/",
        source: "open-dataset",
        // Situada a 6.3 km del centro de Pátra (Wikidata).
      }),
      defineUniversity({
        id: "grecia-patra-hellenic-open-university",
        name: "Hellenic Open University",
        cityId: "grecia-patra",
        website: "https://www.eap.gr/",
        source: "open-dataset",
        // Situada a 5.1 km del centro de Pátra (Wikidata).
      }),
  ],
  "grecia-chania": [
      defineUniversity({
        id: "grecia-chania-technical-university-of-crete",
        name: "Technical University of Crete",
        cityId: "grecia-chania",
        website: "https://www.tuc.gr/",
        source: "open-dataset",
        // Situada a 3.9 km del centro de Chaniá (Wikidata).
      }),
      defineUniversity({
        id: "grecia-chania-mediterranean-agronomic-institute-of-chania",
        name: "Mediterranean Agronomic Institute of Chania",
        cityId: "grecia-chania",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Chaniá (Wikidata).
      }),
  ],
  "grecia-irakleion": [
      defineUniversity({
        id: "grecia-irakleion-university-of-crete",
        name: "University of Crete",
        cityId: "grecia-irakleion",
        website: "https://www.uoc.gr/",
        source: "open-dataset",
        // Situada a 6.0 km del centro de Irákleion (Wikidata).
      }),
      defineUniversity({
        id: "grecia-irakleion-tei-of-heraklion",
        name: "TEI Of Heraklion",
        cityId: "grecia-irakleion",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de Irákleion (Wikidata).
      }),
  ],
  "grecia-agrinio": [
      defineUniversity({
        id: "grecia-agrinio-university-of-western-greece",
        name: "University of Western Greece",
        cityId: "grecia-agrinio",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Agrínio (Wikidata).
      }),
      defineUniversity({
        id: "grecia-agrinio-technological-educational-institute-of-messolonghi",
        name: "Technological Educational Institute of Messolonghi",
        cityId: "grecia-agrinio",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Agrínio (Wikidata).
      }),
  ],
  "grecia-corfu": [
      defineUniversity({
        id: "grecia-corfu-ionian-academy",
        name: "Ionian Academy",
        cityId: "grecia-corfu",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Corfu (Wikidata).
      }),
      defineUniversity({
        id: "grecia-corfu-ionian-university",
        name: "Ionian University",
        cityId: "grecia-corfu",
        website: "https://ionio.gr/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Corfu (Wikidata).
      }),
  ],
};
