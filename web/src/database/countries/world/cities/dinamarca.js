// Universidades por ciudad de Dinamarca. Generado; no editar a mano.
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
  "dinamarca-indre-by": [
      defineUniversity({
        id: "dinamarca-indre-by-it-university-of-copenhagen",
        name: "IT University of Copenhagen",
        cityId: "dinamarca-indre-by",
        website: "http://www.itu.dk/",
        source: "open-dataset",
        // Situada a 2.3 km del centro de Indre By (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-indre-by-university-of-copenhagen",
        name: "University of Copenhagen",
        cityId: "dinamarca-indre-by",
        website: "http://www.ku.dk/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Indre By (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-indre-by-danish-design-school",
        name: "Danish Design School",
        cityId: "dinamarca-indre-by",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Indre By (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-indre-by-kunstakademiets-arkitektskole",
        name: "Kunstakademiets Arkitektskole",
        cityId: "dinamarca-indre-by",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Indre By (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-indre-by-department-of-information-studies",
        name: "Department of Information Studies",
        cityId: "dinamarca-indre-by",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Indre By (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-indre-by-national-film-school-of-denmark",
        name: "National Film School of Denmark",
        cityId: "dinamarca-indre-by",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Indre By (Wikidata).
      }),
  ],
  "dinamarca-esbjerg": [
      defineUniversity({
        id: "dinamarca-esbjerg-uc-south",
        name: "UC South",
        cityId: "dinamarca-esbjerg",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Esbjerg (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-esbjerg-southern-university",
        name: "Southern University",
        cityId: "dinamarca-esbjerg",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Esbjerg (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-esbjerg-west-jutland-university-college",
        name: "West Jutland University College",
        cityId: "dinamarca-esbjerg",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Esbjerg (Wikidata).
      }),
  ],
  "dinamarca-aalborg": [
      defineUniversity({
        id: "dinamarca-aalborg-aalborg-business-college",
        name: "Aalborg Business College",
        cityId: "dinamarca-aalborg",
        website: "http://www.ah.dk/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Aalborg (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-aalborg-ike-group",
        name: "IKE Group",
        cityId: "dinamarca-aalborg",
        website: null,
        source: "open-dataset",
        // Situada a 4.9 km del centro de Aalborg (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-aalborg-aalborg-university",
        name: "Aalborg University",
        cityId: "dinamarca-aalborg",
        website: "http://www.auc.dk/",
        source: "open-dataset",
        // Situada a 5.4 km del centro de Aalborg (Wikidata).
      }),
  ],
  "dinamarca-virum": [
      defineUniversity({
        id: "dinamarca-virum-technical-university-of-denmark",
        name: "Technical University of Denmark",
        cityId: "dinamarca-virum",
        website: "http://www.dtu.dk/",
        source: "open-dataset",
        // Situada a 4.6 km del centro de Virum (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-virum-technical-university-of-denmark",
        name: "Technical University of Denmark",
        cityId: "dinamarca-virum",
        website: "http://www.dtu.dk/",
        source: "open-dataset",
        // Situada a 4.6 km del centro de Virum (Wikidata).
      }),
  ],
  "dinamarca-valby": [
      defineUniversity({
        id: "dinamarca-valby-aalborg-university-copenhagen",
        name: "Aalborg University Copenhagen",
        cityId: "dinamarca-valby",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Valby (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-valby-royal-danish-army-officers-academy",
        name: "Royal Danish Army Officers Academy",
        cityId: "dinamarca-valby",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Valby (Wikidata).
      }),
  ],
  "dinamarca-odense": [
      defineUniversity({
        id: "dinamarca-odense-university-of-southern-denmark",
        name: "University of Southern Denmark",
        cityId: "dinamarca-odense",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de Odense (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-odense-odense-university",
        name: "Odense University",
        cityId: "dinamarca-odense",
        website: "http://www.ou.dk/",
        source: "open-dataset",
        // Situada a 3.9 km del centro de Odense (Wikidata).
      }),
  ],
  "dinamarca-copenhagen": [
      defineUniversity({
        id: "dinamarca-copenhagen-copenhagen-business-academy",
        name: "Copenhagen Business Academy",
        cityId: "dinamarca-copenhagen",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Copenhagen (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-copenhagen-copenhagen-school-of-design-and-technology",
        name: "Copenhagen School of Design and Technology",
        cityId: "dinamarca-copenhagen",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Copenhagen (Wikidata).
      }),
  ],
  "dinamarca-kolding": [
      defineUniversity({
        id: "dinamarca-kolding-sdu-kolding",
        name: "SDU Kolding",
        cityId: "dinamarca-kolding",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Kolding (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-kolding-design-school-kolding",
        name: "Design School Kolding",
        cityId: "dinamarca-kolding",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Kolding (Wikidata).
      }),
  ],
  "dinamarca-charlottenlund": [
      defineUniversity({
        id: "dinamarca-charlottenlund-business-academy-copenhagen-north",
        name: "Business Academy Copenhagen North",
        cityId: "dinamarca-charlottenlund",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de Charlottenlund (Wikidata).
      }),
      defineUniversity({
        id: "dinamarca-charlottenlund-royal-danish-naval-academy",
        name: "Royal Danish Naval Academy",
        cityId: "dinamarca-charlottenlund",
        website: null,
        source: "open-dataset",
        // Situada a 3.9 km del centro de Charlottenlund (Wikidata).
      }),
  ],
};
