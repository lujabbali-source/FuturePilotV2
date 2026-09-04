// Universidades por ciudad de Baréin. Generado; no editar a mano.
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
  "barein-ar-rifa": [
      defineUniversity({
        id: "barein-ar-rifa-gulf-university",
        name: "Gulf University",
        cityId: "barein-ar-rifa",
        website: null,
        source: "open-dataset",
        // Situada a 3.1 km del centro de Ar Rifā‘ (Wikidata).
      }),
      defineUniversity({
        id: "barein-ar-rifa-kingdom-university",
        name: "Kingdom University",
        cityId: "barein-ar-rifa",
        website: "http://www.ku.edu.bh/",
        source: "open-dataset",
        // Situada a 2.9 km del centro de Ar Rifā‘ (Wikidata).
      }),
      defineUniversity({
        id: "barein-ar-rifa-gulf-university",
        name: "Gulf University",
        cityId: "barein-ar-rifa",
        website: null,
        source: "open-dataset",
        // Situada a 3.1 km del centro de Ar Rifā‘ (Wikidata).
      }),
      defineUniversity({
        id: "barein-ar-rifa-royal-university-for-women",
        name: "Royal University for Women",
        cityId: "barein-ar-rifa",
        website: null,
        source: "open-dataset",
        // Situada a 3.1 km del centro de Ar Rifā‘ (Wikidata).
      }),
      defineUniversity({
        id: "barein-ar-rifa-american-university-of-bahrain",
        name: "American University of Bahrain",
        cityId: "barein-ar-rifa",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Ar Rifā‘ (Wikidata).
      }),
  ],
  "barein-manama": [
      defineUniversity({
        id: "barein-manama-arabian-gulf-university",
        name: "Arabian Gulf University",
        cityId: "barein-manama",
        website: "http://www.agu.edu.bh/",
        source: "open-dataset",
        // Situada a 2.0 km del centro de Manama (Wikidata).
      }),
      defineUniversity({
        id: "barein-manama-ahlia-university",
        name: "Ahlia University",
        cityId: "barein-manama",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Manama (Wikidata).
      }),
      defineUniversity({
        id: "barein-manama-college-of-health-sciences-bahrain",
        name: "College of Health Sciences, Bahrain",
        cityId: "barein-manama",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Manama (Wikidata).
      }),
      defineUniversity({
        id: "barein-manama-delmon-university-for-science-technology",
        name: "Delmon University for Science & Technology",
        cityId: "barein-manama",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Manama (Wikidata).
      }),
  ],
  "barein-madinat-isa": [
      defineUniversity({
        id: "barein-madinat-isa-ama-international-university",
        name: "AMA International University",
        cityId: "barein-madinat-isa",
        website: "http://www.amaiu.edu.bh/",
        source: "open-dataset",
        // Situada a 3.3 km del centro de Madīnat ‘Īsá (Wikidata).
      }),
      defineUniversity({
        id: "barein-madinat-isa-bahrain-polytechnic",
        name: "Bahrain Polytechnic",
        cityId: "barein-madinat-isa",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Madīnat ‘Īsá (Wikidata).
      }),
  ],
};
