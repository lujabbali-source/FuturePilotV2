// Universidades por ciudad de Suiza. Generado; no editar a mano.
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
  "suiza-geneva": [
      defineUniversity({
        id: "suiza-geneva-ecole-hoteliere-de-geneve",
        name: "École Hôtelière de Genève",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-ubis-university",
        name: "UBIS University",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-sciences-ii",
        name: "Sciences II",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-geneva-business-school",
        name: "Geneva Business School",
        cityId: "suiza-geneva",
        website: "http://www.gbs-ge.ch/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-haute-ecole-de-musique-de-geneve",
        name: "Haute école de musique de Genève",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-university-of-geneva",
        name: "University of Geneva",
        cityId: "suiza-geneva",
        website: "http://www.unige.ch/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-eu-business-school",
        name: "EU Business School",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-geneva-graduate-institute",
        name: "Geneva Graduate Institute",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-graduate-institute-of-international-studies",
        name: "Graduate Institute of International Studies",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Geneva (Wikidata).
      }),
      defineUniversity({
        id: "suiza-geneva-leman-university-geneva",
        name: "Leman University Geneva",
        cityId: "suiza-geneva",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Geneva (Wikidata).
      }),
  ],
  "suiza-zurich": [
      defineUniversity({
        id: "suiza-zurich-eth-zurich",
        name: "ETH Zurich",
        cityId: "suiza-zurich",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Zürich (Wikidata).
      }),
      defineUniversity({
        id: "suiza-zurich-carolinum-zurich",
        name: "Carolinum Zürich",
        cityId: "suiza-zurich",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Zürich (Wikidata).
      }),
      defineUniversity({
        id: "suiza-zurich-university-of-zurich",
        name: "University of Zurich",
        cityId: "suiza-zurich",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Zürich (Wikidata).
      }),
      defineUniversity({
        id: "suiza-zurich-benedict-schools",
        name: "Benedict Schools",
        cityId: "suiza-zurich",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Zürich (Wikidata).
      }),
      defineUniversity({
        id: "suiza-zurich-swiss-association-for-private-schools-and-universities",
        name: "Swiss Association for Private Schools and Universities",
        cityId: "suiza-zurich",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Zürich (Wikidata).
      }),
      defineUniversity({
        id: "suiza-zurich-eth-zurich-faculty-of-architecture",
        name: "ETH Zurich Faculty of Architecture",
        cityId: "suiza-zurich",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Zürich (Wikidata).
      }),
      defineUniversity({
        id: "suiza-zurich-russian-and-eurasian-security-network",
        name: "Russian and Eurasian Security Network",
        cityId: "suiza-zurich",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Zürich (Wikidata).
      }),
  ],
  "suiza-bern": [
      defineUniversity({
        id: "suiza-bern-benedict-international-education-group",
        name: "Benedict International Education Group",
        cityId: "suiza-bern",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Bern (Wikidata).
      }),
      defineUniversity({
        id: "suiza-bern-agricultural-college-1913",
        name: "Agricultural college (1913)",
        cityId: "suiza-bern",
        website: null,
        source: "open-dataset",
        // Situada a 10.6 km del centro de Bern (Wikidata).
      }),
      defineUniversity({
        id: "suiza-bern-university-of-bern",
        name: "University of Bern",
        cityId: "suiza-bern",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Bern (Wikidata).
      }),
      defineUniversity({
        id: "suiza-bern-oeschger-centre-for-climate-change-research",
        name: "Oeschger Centre for Climate Change Research",
        cityId: "suiza-bern",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bern (Wikidata).
      }),
  ],
  "suiza-basel": [
      defineUniversity({
        id: "suiza-basel-basel-school-of-business",
        name: "Basel School of Business",
        cityId: "suiza-basel",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Basel (Wikidata).
      }),
      defineUniversity({
        id: "suiza-basel-eth-department-of-biosystems-science-and-engineering",
        name: "ETH Department of Biosystems Science and Engineering",
        cityId: "suiza-basel",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Basel (Wikidata).
      }),
      defineUniversity({
        id: "suiza-basel-university-of-basel",
        name: "University of Basel",
        cityId: "suiza-basel",
        website: "http://www.unibas.ch/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Basel (Wikidata).
      }),
      defineUniversity({
        id: "suiza-basel-biozentrum-university-of-basel",
        name: "Biozentrum University of Basel",
        cityId: "suiza-basel",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Basel (Wikidata).
      }),
  ],
  "suiza-renens": [
      defineUniversity({
        id: "suiza-renens-swiss-federal-institute-of-technology-in-lausanne",
        name: "Swiss Federal Institute of Technology in Lausanne",
        cityId: "suiza-renens",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Renens (Wikidata).
      }),
      defineUniversity({
        id: "suiza-renens-centre-europeen-de-calcul-atomique-et-moleculaire",
        name: "Centre européen de calcul atomique et moléculaire",
        cityId: "suiza-renens",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Renens (Wikidata).
      }),
      defineUniversity({
        id: "suiza-renens-university-of-lausanne",
        name: "University of Lausanne",
        cityId: "suiza-renens",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Renens (Wikidata).
      }),
  ],
  "suiza-zug": [
      defineUniversity({
        id: "suiza-zug-supdi",
        name: "SUPDI",
        cityId: "suiza-zug",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Zug (Wikidata).
      }),
  ],
  "suiza-montreux": [
      defineUniversity({
        id: "suiza-montreux-lrg-university-of-applied-sciences",
        name: "LRG University of Applied Sciences",
        cityId: "suiza-montreux",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Montreux (Wikidata).
      }),
      defineUniversity({
        id: "suiza-montreux-glion-institute-of-higher-education",
        name: "Glion Institute of Higher Education",
        cityId: "suiza-montreux",
        website: "http://www.glion.edu/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Montreux (Wikidata).
      }),
  ],
  "suiza-luzern": [
      defineUniversity({
        id: "suiza-luzern-university-of-lucerne",
        name: "University of Lucerne",
        cityId: "suiza-luzern",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Luzern (Wikidata).
      }),
      defineUniversity({
        id: "suiza-luzern-international-school-of-business-management",
        name: "International School of Business Management",
        cityId: "suiza-luzern",
        website: "http://www.isbm-school.com/",
        source: "open-dataset",
        // Situada a None km del centro de Luzern (Wikidata).
      }),
  ],
  "suiza-lugano": [
      defineUniversity({
        id: "suiza-lugano-universita-della-svizzera-italiana",
        name: "Università della Svizzera italiana",
        cityId: "suiza-lugano",
        website: "http://www.usi.ch/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Lugano (Wikidata).
      }),
      defineUniversity({
        id: "suiza-lugano-theological-faculty-lugano",
        name: "Theological Faculty Lugano",
        cityId: "suiza-lugano",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lugano (Wikidata).
      }),
  ],
  "suiza-fribourg": [
      defineUniversity({
        id: "suiza-fribourg-pedagogical-university-of-fribourg",
        name: "Pedagogical University of Fribourg",
        cityId: "suiza-fribourg",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Fribourg (Wikidata).
      }),
      defineUniversity({
        id: "suiza-fribourg-university-of-fribourg",
        name: "University of Fribourg",
        cityId: "suiza-fribourg",
        website: "http://www.unifr.ch/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Fribourg (Wikidata).
      }),
  ],
};
