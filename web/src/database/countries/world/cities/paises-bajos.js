// Universidades por ciudad de Países Bajos. Generado; no editar a mano.
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
  "paises-bajos-rotterdam": [
      defineUniversity({
        id: "paises-bajos-rotterdam-nederlandsche-handels-hoogeschool",
        name: "Nederlandsche Handels-Hoogeschool",
        cityId: "paises-bajos-rotterdam",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Rotterdam (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-rotterdam-nederlandsche-economische-hoogeschool",
        name: "Nederlandsche Economische Hoogeschool",
        cityId: "paises-bajos-rotterdam",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Rotterdam (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-rotterdam-islamic-university-of-applied-sciences-rotterdam",
        name: "Islamic University of Applied Sciences Rotterdam",
        cityId: "paises-bajos-rotterdam",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Rotterdam (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-rotterdam-erasmus-university-rotterdam",
        name: "Erasmus University Rotterdam",
        cityId: "paises-bajos-rotterdam",
        website: "http://www.eur.nl/",
        source: "open-dataset",
        // Situada a 3.2 km del centro de Rotterdam (Wikidata).
      }),
  ],
  "paises-bajos-utrecht": [
      defineUniversity({
        id: "paises-bajos-utrecht-university-of-humanistic-studies",
        name: "University of Humanistic Studies",
        cityId: "paises-bajos-utrecht",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Utrecht (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-utrecht-utrecht-university",
        name: "Utrecht University",
        cityId: "paises-bajos-utrecht",
        website: "http://www.uu.nl/",
        source: "open-dataset",
        // Situada a 3.7 km del centro de Utrecht (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-utrecht-catholic-university-of-utrecht",
        name: "Catholic University of Utrecht",
        cityId: "paises-bajos-utrecht",
        website: null,
        source: "open-dataset",
        // Situada a 3.7 km del centro de Utrecht (Wikidata).
      }),
  ],
  "paises-bajos-maastricht": [
      defineUniversity({
        id: "paises-bajos-maastricht-maastricht-university",
        name: "Maastricht University",
        cityId: "paises-bajos-maastricht",
        website: "http://www.unimaas.nl/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Maastricht (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-maastricht-maastricht-university",
        name: "Maastricht University",
        cityId: "paises-bajos-maastricht",
        website: "http://www.unimaas.nl/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Maastricht (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-maastricht-maastricht-university",
        name: "Maastricht University",
        cityId: "paises-bajos-maastricht",
        website: "http://www.unimaas.nl/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Maastricht (Wikidata).
      }),
  ],
  "paises-bajos-leiden": [
      defineUniversity({
        id: "paises-bajos-leiden-webster-university-leiden",
        name: "Webster University Leiden",
        cityId: "paises-bajos-leiden",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Leiden (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-leiden-leiden-university",
        name: "Leiden University",
        cityId: "paises-bajos-leiden",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Leiden (Wikidata).
      }),
  ],
  "paises-bajos-enschede": [
      defineUniversity({
        id: "paises-bajos-enschede-university-of-twente",
        name: "University of Twente",
        cityId: "paises-bajos-enschede",
        website: "http://www.utwente.nl/",
        source: "open-dataset",
        // Situada a 4.0 km del centro de Enschede (Wikidata).
      }),
  ],
  "paises-bajos-delft": [
      defineUniversity({
        id: "paises-bajos-delft-delft-university-of-technology",
        name: "Delft University of Technology",
        cityId: "paises-bajos-delft",
        website: "http://www.tudelft.nl/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Delft (Wikidata).
      }),
      defineUniversity({
        id: "paises-bajos-delft-delft-university-of-technology",
        name: "Delft University of Technology",
        cityId: "paises-bajos-delft",
        website: "http://www.tudelft.nl/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Delft (Wikidata).
      }),
  ],
};
