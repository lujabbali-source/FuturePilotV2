// Universidades por ciudad de Eslovenia. Generado; no editar a mano.
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
  "eslovenia-novo-mesto": [
      defineUniversity({
        id: "eslovenia-novo-mesto-university-and-research-centre-novo-mesto",
        name: "University and Research Centre Novo Mesto",
        cityId: "eslovenia-novo-mesto",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Novo Mesto (Wikidata).
      }),
      defineUniversity({
        id: "eslovenia-novo-mesto-university-of-novo-mesto",
        name: "University of Novo Mesto",
        cityId: "eslovenia-novo-mesto",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Novo Mesto (Wikidata).
      }),
  ],
  "eslovenia-maribor": [
      defineUniversity({
        id: "eslovenia-maribor-university-of-maribor",
        name: "University of Maribor",
        cityId: "eslovenia-maribor",
        website: "http://www.um.si/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Maribor (Wikidata).
      }),
      defineUniversity({
        id: "eslovenia-maribor-alma-mater-europaea",
        name: "Alma Mater Europaea",
        cityId: "eslovenia-maribor",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Maribor (Wikidata).
      }),
  ],
  "eslovenia-ljubljana": [
      defineUniversity({
        id: "eslovenia-ljubljana-university-of-ljubljana",
        name: "University of Ljubljana",
        cityId: "eslovenia-ljubljana",
        website: "http://www.uni-lj.si/",
        source: "open-dataset",
        // Situada a 0.3 km del centro de Ljubljana (Wikidata).
      }),
      defineUniversity({
        id: "eslovenia-ljubljana-faculty-of-theology-university-of-ljubljana",
        name: "Faculty of Theology – University of Ljubljana",
        cityId: "eslovenia-ljubljana",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Ljubljana (Wikidata).
      }),
  ],
  "eslovenia-koper": [
      defineUniversity({
        id: "eslovenia-koper-university-of-primorska",
        name: "University of Primorska",
        cityId: "eslovenia-koper",
        website: "http://www.upr.si/",
        source: "open-dataset",
        // Situada a 0.0 km del centro de Koper (Wikidata).
      }),
      defineUniversity({
        id: "eslovenia-koper-euro-mediterranean-university-of-slovenia",
        name: "Euro-Mediterranean University of Slovenia",
        cityId: "eslovenia-koper",
        website: null,
        source: "open-dataset",
        // Situada a 12.8 km del centro de Koper (Wikidata).
      }),
  ],
};
