// Universidades por ciudad de Australia. Generado; no editar a mano.
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
  "australia-canberra": [
      defineUniversity({
        id: "australia-canberra-australian-national-university",
        name: "Australian National University",
        cityId: "australia-canberra",
        website: "http://www.anu.edu.au/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Canberra (Wikidata).
      }),
      defineUniversity({
        id: "australia-canberra-anu-college-of-law-governance-and-policy",
        name: "ANU College of Law, Governance and Policy",
        cityId: "australia-canberra",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Canberra (Wikidata).
      }),
      defineUniversity({
        id: "australia-canberra-university-of-canberra",
        name: "University of Canberra",
        cityId: "australia-canberra",
        website: "http://www.canberra.edu.au/",
        source: "open-dataset",
        // Situada a 6.2 km del centro de Canberra (Wikidata).
      }),
      defineUniversity({
        id: "australia-canberra-royal-military-college",
        name: "Royal Military College",
        cityId: "australia-canberra",
        website: null,
        source: "open-dataset",
        // Situada a 3.8 km del centro de Canberra (Wikidata).
      }),
      defineUniversity({
        id: "australia-canberra-australian-defence-force-academy",
        name: "Australian Defence Force Academy",
        cityId: "australia-canberra",
        website: "http://www.adfa.oz.au/",
        source: "open-dataset",
        // Situada a 3.5 km del centro de Canberra (Wikidata).
      }),
  ],
  "australia-brisbane": [
      defineUniversity({
        id: "australia-brisbane-queensland-university-of-technology",
        name: "Queensland University of Technology",
        cityId: "australia-brisbane",
        website: "http://www.qut.edu.au/",
        source: "open-dataset",
        // Situada a 1.0 km del centro de Brisbane (Wikidata).
      }),
      defineUniversity({
        id: "australia-brisbane-brisbane-central-technical-college",
        name: "Brisbane Central Technical College",
        cityId: "australia-brisbane",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Brisbane (Wikidata).
      }),
      defineUniversity({
        id: "australia-brisbane-crossway-college",
        name: "Crossway College",
        cityId: "australia-brisbane",
        website: null,
        source: "open-dataset",
        // Situada a 5.2 km del centro de Brisbane (Wikidata).
      }),
      defineUniversity({
        id: "australia-brisbane-university-of-queensland",
        name: "University of Queensland",
        cityId: "australia-brisbane",
        website: "http://www.uq.edu.au/",
        source: "open-dataset",
        // Situada a 3.6 km del centro de Brisbane (Wikidata).
      }),
  ],
  "australia-surry-hills": [
      defineUniversity({
        id: "australia-surry-hills-university-of-technology-sydney",
        name: "University of Technology Sydney",
        cityId: "australia-surry-hills",
        website: "http://www.uts.edu.au/",
        source: "open-dataset",
        // Situada a 1.1 km del centro de Surry Hills (Wikidata).
      }),
      defineUniversity({
        id: "australia-surry-hills-academy-of-music-and-performing-arts",
        name: "Academy of Music and Performing Arts",
        cityId: "australia-surry-hills",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Surry Hills (Wikidata).
      }),
      defineUniversity({
        id: "australia-surry-hills-university-of-sydney",
        name: "University of Sydney",
        cityId: "australia-surry-hills",
        website: "http://sydney.edu.au/",
        source: "open-dataset",
        // Situada a 2.1 km del centro de Surry Hills (Wikidata).
      }),
  ],
  "australia-ballarat": [
      defineUniversity({
        id: "australia-ballarat-federation-university-australia",
        name: "Federation University Australia",
        cityId: "australia-ballarat",
        website: "http://federation.edu.au/",
        source: "open-dataset",
        // Situada a 7.6 km del centro de Ballarat (Wikidata).
      }),
      defineUniversity({
        id: "australia-ballarat-university-of-ballarat",
        name: "University of Ballarat",
        cityId: "australia-ballarat",
        website: null,
        source: "open-dataset",
        // Situada a 7.6 km del centro de Ballarat (Wikidata).
      }),
      defineUniversity({
        id: "australia-ballarat-victorian-school-of-forestry",
        name: "Victorian School of Forestry",
        cityId: "australia-ballarat",
        website: null,
        source: "open-dataset",
        // Situada a 16.6 km del centro de Ballarat (Wikidata).
      }),
  ],
  "australia-willetton": [
      defineUniversity({
        id: "australia-willetton-curtin-university",
        name: "Curtin University",
        cityId: "australia-willetton",
        website: "http://www.curtin.edu.au/",
        source: "open-dataset",
        // Situada a 5.3 km del centro de Willetton (Wikidata).
      }),
      defineUniversity({
        id: "australia-willetton-murdoch-university",
        name: "Murdoch University",
        cityId: "australia-willetton",
        website: "http://www.murdoch.edu.au/",
        source: "open-dataset",
        // Situada a 5.2 km del centro de Willetton (Wikidata).
      }),
      defineUniversity({
        id: "australia-willetton-university-of-notre-dame-australia",
        name: "University of Notre Dame Australia",
        cityId: "australia-willetton",
        website: "http://www.nd.edu.au/",
        source: "open-dataset",
        // Situada a 13.6 km del centro de Willetton (Wikidata).
      }),
  ],
  "australia-adelaide-city-centre": [
      defineUniversity({
        id: "australia-adelaide-city-centre-adelaide-university",
        name: "Adelaide University",
        cityId: "australia-adelaide-city-centre",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Adelaide city centre (Wikidata).
      }),
      defineUniversity({
        id: "australia-adelaide-city-centre-bible-college-of-south-australia",
        name: "Bible College of South Australia",
        cityId: "australia-adelaide-city-centre",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Adelaide city centre (Wikidata).
      }),
      defineUniversity({
        id: "australia-adelaide-city-centre-torrens-university-australia",
        name: "Torrens University Australia",
        cityId: "australia-adelaide-city-centre",
        website: "https://www.torrens.edu.au/",
        source: "open-dataset",
        // Situada a 0.2 km del centro de Adelaide city centre (Wikidata).
      }),
  ],
  "australia-darwin": [
      defineUniversity({
        id: "australia-darwin-charles-darwin-university",
        name: "Charles Darwin University",
        cityId: "australia-darwin",
        website: "http://www.cdu.edu.au/",
        source: "open-dataset",
        // Situada a 10.8 km del centro de Darwin (Wikidata).
      }),
      defineUniversity({
        id: "australia-darwin-northern-territory-university",
        name: "Northern Territory University",
        cityId: "australia-darwin",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Darwin (Wikidata).
      }),
  ],
  "australia-sydney": [
      defineUniversity({
        id: "australia-sydney-sydney-community-college",
        name: "Sydney Community College",
        cityId: "australia-sydney",
        website: null,
        source: "open-dataset",
        // Situada a 3.1 km del centro de Sydney (Wikidata).
      }),
      defineUniversity({
        id: "australia-sydney-mary-andrews-college",
        name: "Mary Andrews College",
        cityId: "australia-sydney",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Sydney (Wikidata).
      }),
  ],
  "australia-epping": [
      defineUniversity({
        id: "australia-epping-emmaus-bible-college",
        name: "Emmaus Bible College",
        cityId: "australia-epping",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Epping (Wikidata).
      }),
      defineUniversity({
        id: "australia-epping-macquarie-university",
        name: "Macquarie University",
        cityId: "australia-epping",
        website: "http://www.mq.edu.au/",
        source: "open-dataset",
        // Situada a 2.9 km del centro de Epping (Wikidata).
      }),
  ],
  "australia-carlton": [
      defineUniversity({
        id: "australia-carlton-university-of-melbourne",
        name: "University of Melbourne",
        cityId: "australia-carlton",
        website: "http://www.unimelb.edu.au/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Carlton (Wikidata).
      }),
      defineUniversity({
        id: "australia-carlton-corpus-christi-college-melbourne",
        name: "Corpus Christi College, Melbourne",
        cityId: "australia-carlton",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Carlton (Wikidata).
      }),
  ],
  "australia-buderim": [
      defineUniversity({
        id: "australia-buderim-university-of-the-sunshine-coast",
        name: "University of the Sunshine Coast",
        cityId: "australia-buderim",
        website: "http://www.usc.edu.au/",
        source: "open-dataset",
        // Situada a 3.7 km del centro de Buderim (Wikidata).
      }),
      defineUniversity({
        id: "australia-buderim-sunshine-coast-theological-college",
        name: "Sunshine Coast Theological College",
        cityId: "australia-buderim",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Buderim (Wikidata).
      }),
  ],
  "australia-bendigo": [
      defineUniversity({
        id: "australia-bendigo-australian-college-of-christian-studies",
        name: "Australian College of Christian Studies",
        cityId: "australia-bendigo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bendigo (Wikidata).
      }),
      defineUniversity({
        id: "australia-bendigo-melbourne-university-private",
        name: "Melbourne University Private",
        cityId: "australia-bendigo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Bendigo (Wikidata).
      }),
  ],
  "australia-cranebrook": [
      defineUniversity({
        id: "australia-cranebrook-western-sydney-university",
        name: "Western Sydney University",
        cityId: "australia-cranebrook",
        website: "https://www.westernsydney.edu.au/",
        source: "open-dataset",
        // Situada a 11.5 km del centro de Cranebrook (Wikidata).
      }),
      defineUniversity({
        id: "australia-cranebrook-hawkesbury-agricultural-college",
        name: "Hawkesbury Agricultural College",
        cityId: "australia-cranebrook",
        website: null,
        source: "open-dataset",
        // Situada a 10.6 km del centro de Cranebrook (Wikidata).
      }),
  ],
};
