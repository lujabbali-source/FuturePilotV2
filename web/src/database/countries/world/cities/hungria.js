// Universidades por ciudad de Hungría. Generado; no editar a mano.
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
  "hungria-budapest-viii-kerulet": [
      defineUniversity({
        id: "hungria-budapest-viii-kerulet-university-of-theatre-and-film-arts",
        name: "University of Theatre and Film Arts",
        cityId: "hungria-budapest-viii-kerulet",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Budapest VIII. kerület (Wikidata).
      }),
      defineUniversity({
        id: "hungria-budapest-viii-kerulet-pazmany-peter-catholic-university",
        name: "Pázmány Péter Catholic University",
        cityId: "hungria-budapest-viii-kerulet",
        website: "http://www.ppke.hu/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Budapest VIII. kerület (Wikidata).
      }),
      defineUniversity({
        id: "hungria-budapest-viii-kerulet-semmelweis-university",
        name: "Semmelweis University",
        cityId: "hungria-budapest-viii-kerulet",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Budapest VIII. kerület (Wikidata).
      }),
      defineUniversity({
        id: "hungria-budapest-viii-kerulet-andrassy-university-budapest",
        name: "Andrássy University Budapest",
        cityId: "hungria-budapest-viii-kerulet",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Budapest VIII. kerület (Wikidata).
      }),
      defineUniversity({
        id: "hungria-budapest-viii-kerulet-budapest-university-of-jewish-studies",
        name: "Budapest University of Jewish Studies",
        cityId: "hungria-budapest-viii-kerulet",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Budapest VIII. kerület (Wikidata).
      }),
      defineUniversity({
        id: "hungria-budapest-viii-kerulet-eotvos-lorand-university",
        name: "Eötvös Loránd University",
        cityId: "hungria-budapest-viii-kerulet",
        website: "http://www.elte.hu/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Budapest VIII. kerület (Wikidata).
      }),
      defineUniversity({
        id: "hungria-budapest-viii-kerulet-corvinus-university-of-budapest",
        name: "Corvinus University of Budapest",
        cityId: "hungria-budapest-viii-kerulet",
        website: "https://www.uni-corvinus.hu/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Budapest VIII. kerület (Wikidata).
      }),
  ],
  "hungria-zuglo": [
      defineUniversity({
        id: "hungria-zuglo-hungarian-dance-university",
        name: "Hungarian Dance University",
        cityId: "hungria-zuglo",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Zugló (Wikidata).
      }),
      defineUniversity({
        id: "hungria-zuglo-lutheran-theological-university",
        name: "Lutheran Theological University",
        cityId: "hungria-zuglo",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Zugló (Wikidata).
      }),
      defineUniversity({
        id: "hungria-zuglo-budapest-business-university",
        name: "Budapest Business University",
        cityId: "hungria-zuglo",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Zugló (Wikidata).
      }),
  ],
  "hungria-lagymanyos": [
      defineUniversity({
        id: "hungria-lagymanyos-budapest-university-of-technology-and-economics",
        name: "Budapest University of Technology and Economics",
        cityId: "hungria-lagymanyos",
        website: "http://www.bme.hu/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Lágymányos (Wikidata).
      }),
      defineUniversity({
        id: "hungria-lagymanyos-pazmany-peter-catholic-university-faculty-of-theology",
        name: "Pázmány Péter Catholic University Faculty of Theology",
        cityId: "hungria-lagymanyos",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lágymányos (Wikidata).
      }),
      defineUniversity({
        id: "hungria-lagymanyos-university-of-buda",
        name: "University of Buda",
        cityId: "hungria-lagymanyos",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lágymányos (Wikidata).
      }),
  ],
  "hungria-erzsebetvaros": [
      defineUniversity({
        id: "hungria-erzsebetvaros-university-of-veterinary-medicine-budapest",
        name: "University of Veterinary Medicine Budapest",
        cityId: "hungria-erzsebetvaros",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Erzsébetváros (Wikidata).
      }),
      defineUniversity({
        id: "hungria-erzsebetvaros-baptist-theological-seminary",
        name: "Baptist Theological Seminary",
        cityId: "hungria-erzsebetvaros",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Erzsébetváros (Wikidata).
      }),
      defineUniversity({
        id: "hungria-erzsebetvaros-budapest-semesters-in-mathematics",
        name: "Budapest Semesters in Mathematics",
        cityId: "hungria-erzsebetvaros",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Erzsébetváros (Wikidata).
      }),
  ],
  "hungria-ujszeged": [
      defineUniversity({
        id: "hungria-ujszeged-gal-ferenc-university",
        name: "Gál Ferenc University",
        cityId: "hungria-ujszeged",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Újszeged (Wikidata).
      }),
  ],
  "hungria-szeged": [
      defineUniversity({
        id: "hungria-szeged-university-of-szeged",
        name: "University of Szeged",
        cityId: "hungria-szeged",
        website: "http://www.u-szeged.hu/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Szeged (Wikidata).
      }),
      defineUniversity({
        id: "hungria-szeged-albert-szent-gyorgyi-university-of-medicine",
        name: "Albert Szent-Györgyi University of Medicine",
        cityId: "hungria-szeged",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Szeged (Wikidata).
      }),
  ],
  "hungria-nyiregyhaza": [
      defineUniversity({
        id: "hungria-nyiregyhaza-st-athanasius-greek-orthodox-theological-college",
        name: "St. Athanasius Greek Orthodox Theological College",
        cityId: "hungria-nyiregyhaza",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Nyíregyháza (Wikidata).
      }),
      defineUniversity({
        id: "hungria-nyiregyhaza-university-of-nyiregyhaza",
        name: "University of Nyíregyháza",
        cityId: "hungria-nyiregyhaza",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Nyíregyháza (Wikidata).
      }),
  ],
  "hungria-eger": [
      defineUniversity({
        id: "hungria-eger-theological-college-of-eger",
        name: "Theological College of Eger",
        cityId: "hungria-eger",
        website: null,
        source: "open-dataset",
        // Situada a 0.1 km del centro de Eger (Wikidata).
      }),
      defineUniversity({
        id: "hungria-eger-eszterhazy-karoly-catholic-university",
        name: "Eszterházy Károly Catholic University",
        cityId: "hungria-eger",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Eger (Wikidata).
      }),
  ],
  "hungria-debrecen": [
      defineUniversity({
        id: "hungria-debrecen-debrecen-reformed-theological-university",
        name: "Debrecen Reformed Theological University",
        cityId: "hungria-debrecen",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Debrecen (Wikidata).
      }),
      defineUniversity({
        id: "hungria-debrecen-university-of-debrecen",
        name: "University of Debrecen",
        cityId: "hungria-debrecen",
        website: "http://www.unideb.hu/",
        source: "open-dataset",
        // Situada a 2.5 km del centro de Debrecen (Wikidata).
      }),
  ],
  "hungria-sopron": [
      defineUniversity({
        id: "hungria-sopron-joseph-haydn-konservatorium-eisenstadt",
        name: "Joseph Haydn Konservatorium, Eisenstadt",
        cityId: "hungria-sopron",
        website: null,
        source: "open-dataset",
        // Situada a 19.2 km del centro de Sopron (Wikidata).
      }),
      defineUniversity({
        id: "hungria-sopron-university-of-sopron",
        name: "University of Sopron",
        cityId: "hungria-sopron",
        website: "http://www.efe.hu/",
        source: "open-dataset",
        // Situada a 1.1 km del centro de Sopron (Wikidata).
      }),
  ],
  "hungria-pest": [
      defineUniversity({
        id: "hungria-pest-zrinyi-miklos-national-defense-university",
        name: "Zrínyi Miklós National Defense University",
        cityId: "hungria-pest",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Pest (Wikidata).
      }),
      defineUniversity({
        id: "hungria-pest-mcdaniel-college-budapest",
        name: "McDaniel College Budapest",
        cityId: "hungria-pest",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Pest (Wikidata).
      }),
  ],
  "hungria-pecs": [
      defineUniversity({
        id: "hungria-pecs-university-of-pecs",
        name: "University of Pécs",
        cityId: "hungria-pecs",
        website: "http://www.pte.hu/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Pécs (Wikidata).
      }),
      defineUniversity({
        id: "hungria-pecs-medical-university-of-pecs",
        name: "Medical University of Pécs",
        cityId: "hungria-pecs",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Pécs (Wikidata).
      }),
  ],
  "hungria-gyor": [
      defineUniversity({
        id: "hungria-gyor-szechenyi-istvan-university",
        name: "Széchenyi István University",
        cityId: "hungria-gyor",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Győr (Wikidata).
      }),
      defineUniversity({
        id: "hungria-gyor-st-gerard-bible-college",
        name: "St. Gerard Bible College",
        cityId: "hungria-gyor",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Győr (Wikidata).
      }),
  ],
  "hungria-godollo": [
      defineUniversity({
        id: "hungria-godollo-godollo-university-of-agricultural-sciences",
        name: "Gödöllő University of Agricultural Sciences",
        cityId: "hungria-godollo",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Gödöllő (Wikidata).
      }),
      defineUniversity({
        id: "hungria-godollo-hungarian-university-of-agriculture-and-life-sciences",
        name: "Hungarian University of Agriculture and Life Sciences",
        cityId: "hungria-godollo",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Gödöllő (Wikidata).
      }),
  ],
  "hungria-ferencvaros": [
      defineUniversity({
        id: "hungria-ferencvaros-national-university-of-public-service",
        name: "National University of Public Service",
        cityId: "hungria-ferencvaros",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Ferencváros (Wikidata).
      }),
      defineUniversity({
        id: "hungria-ferencvaros-ludovica-military-academy",
        name: "Ludovica Military Academy",
        cityId: "hungria-ferencvaros",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Ferencváros (Wikidata).
      }),
  ],
  "hungria-budapest": [
      defineUniversity({
        id: "hungria-budapest-university-of-construction-and-transportation-engineering",
        name: "University of Construction and Transportation Engineering",
        cityId: "hungria-budapest",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Budapest (Wikidata).
      }),
  ],
};
