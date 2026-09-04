// Universidades por ciudad de Nueva Zelanda. Generado; no editar a mano.
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
  "nueva-zelanda-auckland": [
      defineUniversity({
        id: "nueva-zelanda-auckland-te-kupenga-catholic-theological-college",
        name: "Te Kupenga – Catholic Theological College",
        cityId: "nueva-zelanda-auckland",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Auckland (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-auckland-university-of-auckland",
        name: "University of Auckland",
        cityId: "nueva-zelanda-auckland",
        website: "http://www.auckland.ac.nz/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Auckland (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-auckland-holy-cross-college",
        name: "Holy Cross College",
        cityId: "nueva-zelanda-auckland",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Auckland (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-auckland-holy-name-seminary",
        name: "Holy Name Seminary",
        cityId: "nueva-zelanda-auckland",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Auckland (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-auckland-auckland-university-of-technology",
        name: "Auckland University of Technology",
        cityId: "nueva-zelanda-auckland",
        website: "http://www.aut.ac.nz/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Auckland (Wikidata).
      }),
  ],
  "nueva-zelanda-christchurch": [
      defineUniversity({
        id: "nueva-zelanda-christchurch-ara-institute-of-canterbury",
        name: "Ara Institute of Canterbury",
        cityId: "nueva-zelanda-christchurch",
        website: "https://www.ara.ac.nz/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Christchurch (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-christchurch-university-of-canterbury",
        name: "University of Canterbury",
        cityId: "nueva-zelanda-christchurch",
        website: "http://www.canterbury.ac.nz/",
        source: "open-dataset",
        // Situada a 4.3 km del centro de Christchurch (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-christchurch-christchurch-polytechnic-institute-of-technology",
        name: "Christchurch Polytechnic Institute of Technology",
        cityId: "nueva-zelanda-christchurch",
        website: "http://www.cpit.ac.nz/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Christchurch (Wikidata).
      }),
  ],
  "nueva-zelanda-palmerston-north": [
      defineUniversity({
        id: "nueva-zelanda-palmerston-north-massey-university",
        name: "Massey University",
        cityId: "nueva-zelanda-palmerston-north",
        website: "http://www.massey.ac.nz/",
        source: "open-dataset",
        // Situada a 3.2 km del centro de Palmerston North (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-palmerston-north-universal-college-of-learning",
        name: "Universal College of Learning",
        cityId: "nueva-zelanda-palmerston-north",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Palmerston North (Wikidata).
      }),
  ],
  "nueva-zelanda-lower-hutt": [
      defineUniversity({
        id: "nueva-zelanda-lower-hutt-the-open-polytechnic-of-new-zealand",
        name: "The Open Polytechnic of New Zealand",
        cityId: "nueva-zelanda-lower-hutt",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Lower Hutt (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-lower-hutt-wellington-institute-of-technology",
        name: "Wellington Institute of Technology",
        cityId: "nueva-zelanda-lower-hutt",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Lower Hutt (Wikidata).
      }),
  ],
  "nueva-zelanda-dunedin": [
      defineUniversity({
        id: "nueva-zelanda-dunedin-university-of-otago",
        name: "University of Otago",
        cityId: "nueva-zelanda-dunedin",
        website: "http://www.otago.ac.nz/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Dunedin (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-dunedin-otago-polytechnic",
        name: "Otago Polytechnic",
        cityId: "nueva-zelanda-dunedin",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Dunedin (Wikidata).
      }),
  ],
  "nueva-zelanda-avondale": [
      defineUniversity({
        id: "nueva-zelanda-avondale-auckland-institute-of-studies",
        name: "Auckland Institute of Studies",
        cityId: "nueva-zelanda-avondale",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Avondale (Wikidata).
      }),
      defineUniversity({
        id: "nueva-zelanda-avondale-unitec-institute-of-technology",
        name: "Unitec Institute of Technology",
        cityId: "nueva-zelanda-avondale",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Avondale (Wikidata).
      }),
  ],
};
