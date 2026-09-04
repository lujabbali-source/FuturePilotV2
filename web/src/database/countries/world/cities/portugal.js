// Universidades por ciudad de Portugal. Generado; no editar a mano.
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
  "portugal-lisbon": [
      defineUniversity({
        id: "portugal-lisbon-instituto-superior-autonomo-de-estudos-politecnicos",
        name: "Instituto Superior Autónomo de Estudos Politécnicos",
        cityId: "portugal-lisbon",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Lisbon (Wikidata).
      }),
      defineUniversity({
        id: "portugal-lisbon-universidade-autonoma-de-lisboa",
        name: "Universidade Autónoma de Lisboa",
        cityId: "portugal-lisbon",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Lisbon (Wikidata).
      }),
      defineUniversity({
        id: "portugal-lisbon-universidade-aberta-de-portugal",
        name: "Universidade Aberta de Portugal",
        cityId: "portugal-lisbon",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Lisbon (Wikidata).
      }),
  ],
  "portugal-funchal": [
      defineUniversity({
        id: "portugal-funchal-university-of-madeira",
        name: "University of Madeira",
        cityId: "portugal-funchal",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Funchal (Wikidata).
      }),
      defineUniversity({
        id: "portugal-funchal-colegio-dos-jesuitas-do-funchal",
        name: "Colégio dos Jesuítas do Funchal",
        cityId: "portugal-funchal",
        website: null,
        source: "open-dataset",
        // Situada a 2.3 km del centro de Funchal (Wikidata).
      }),
      defineUniversity({
        id: "portugal-funchal-instituto-superior-de-administracao-e-linguas-da-madeira",
        name: "Instituto Superior de Administração e Línguas da Madeira",
        cityId: "portugal-funchal",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Funchal (Wikidata).
      }),
  ],
  "portugal-viseu": [
      defineUniversity({
        id: "portugal-viseu-polytechnic-institute-of-viseu",
        name: "Polytechnic Institute of Viseu",
        cityId: "portugal-viseu",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Viseu (Wikidata).
      }),
      defineUniversity({
        id: "portugal-viseu-polytechnic-institute-of-viseu",
        name: "Polytechnic Institute of Viseu",
        cityId: "portugal-viseu",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Viseu (Wikidata).
      }),
      defineUniversity({
        id: "portugal-viseu-polytechnic-institute-of-viseu",
        name: "Polytechnic Institute of Viseu",
        cityId: "portugal-viseu",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Viseu (Wikidata).
      }),
  ],
  "portugal-paranhos": [
      defineUniversity({
        id: "portugal-paranhos-oporto-global-university",
        name: "Oporto Global University",
        cityId: "portugal-paranhos",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Paranhos (Wikidata).
      }),
      defineUniversity({
        id: "portugal-paranhos-lusiada-university-of-porto",
        name: "Lusíada University of Porto",
        cityId: "portugal-paranhos",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Paranhos (Wikidata).
      }),
      defineUniversity({
        id: "portugal-paranhos-fernando-pessoa-university",
        name: "Fernando Pessoa University",
        cityId: "portugal-paranhos",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Paranhos (Wikidata).
      }),
  ],
  "portugal-coimbra": [
      defineUniversity({
        id: "portugal-coimbra-instituto-superior-de-engenharia-de-coimbra",
        name: "Instituto Superior de Engenharia de Coimbra",
        cityId: "portugal-coimbra",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Coimbra (Wikidata).
      }),
      defineUniversity({
        id: "portugal-coimbra-coimbra-academic-association",
        name: "Coimbra Academic Association",
        cityId: "portugal-coimbra",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Coimbra (Wikidata).
      }),
      defineUniversity({
        id: "portugal-coimbra-university-of-coimbra",
        name: "University of Coimbra",
        cityId: "portugal-coimbra",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Coimbra (Wikidata).
      }),
  ],
  "portugal-sao-jorge-de-arroios": [
      defineUniversity({
        id: "portugal-sao-jorge-de-arroios-ispa-university-institute",
        name: "ISPA – University Institute",
        cityId: "portugal-sao-jorge-de-arroios",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de São Jorge de Arroios (Wikidata).
      }),
      defineUniversity({
        id: "portugal-sao-jorge-de-arroios-portuguese-military-academy",
        name: "Portuguese Military Academy",
        cityId: "portugal-sao-jorge-de-arroios",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de São Jorge de Arroios (Wikidata).
      }),
      defineUniversity({
        id: "portugal-sao-jorge-de-arroios-colegio-de-santo-antao",
        name: "Colégio de Santo Antão",
        cityId: "portugal-sao-jorge-de-arroios",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de São Jorge de Arroios (Wikidata).
      }),
  ],
  "portugal-setubal": [
      defineUniversity({
        id: "portugal-setubal-polytechnic-institute-of-setubal",
        name: "Polytechnic Institute of Setúbal",
        cityId: "portugal-setubal",
        website: null,
        source: "open-dataset",
        // Situada a 4.3 km del centro de Setúbal (Wikidata).
      }),
      defineUniversity({
        id: "portugal-setubal-polytechnic-institute-of-setubal",
        name: "Polytechnic Institute of Setúbal",
        cityId: "portugal-setubal",
        website: null,
        source: "open-dataset",
        // Situada a 4.3 km del centro de Setúbal (Wikidata).
      }),
  ],
  "portugal-castelo-branco": [
      defineUniversity({
        id: "portugal-castelo-branco-polytechnic-university-of-castelo-branco",
        name: "Polytechnic University of Castelo Branco",
        cityId: "portugal-castelo-branco",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Castelo Branco (Wikidata).
      }),
      defineUniversity({
        id: "portugal-castelo-branco-polytechnic-university-of-castelo-branco",
        name: "Polytechnic University of Castelo Branco",
        cityId: "portugal-castelo-branco",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Castelo Branco (Wikidata).
      }),
  ],
  "portugal-alcantara": [
      defineUniversity({
        id: "portugal-alcantara-european-university-of-lisbon",
        name: "European University of Lisbon",
        cityId: "portugal-alcantara",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Alcântara (Wikidata).
      }),
      defineUniversity({
        id: "portugal-alcantara-instituto-superior-de-ciencias-policiais-e-seguranca-interna",
        name: "Instituto Superior de Ciências Policiais e Segurança Interna",
        cityId: "portugal-alcantara",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Alcântara (Wikidata).
      }),
  ],
  "portugal-porto": [
      defineUniversity({
        id: "portugal-porto-universidade-lusofona-do-porto",
        name: "Universidade Lusófona do Porto",
        cityId: "portugal-porto",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Porto (Wikidata).
      }),
      defineUniversity({
        id: "portugal-porto-university-of-porto",
        name: "University of Porto",
        cityId: "portugal-porto",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Porto (Wikidata).
      }),
  ],
  "portugal-cidade-universitaria": [
      defineUniversity({
        id: "portugal-cidade-universitaria-university-of-lisbon",
        name: "University of Lisbon",
        cityId: "portugal-cidade-universitaria",
        website: null,
        source: "open-dataset",
        // Situada a 0.1 km del centro de Cidade Universitária (Wikidata).
      }),
      defineUniversity({
        id: "portugal-cidade-universitaria-universidade-lusofona",
        name: "Universidade Lusófona",
        cityId: "portugal-cidade-universitaria",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Cidade Universitária (Wikidata).
      }),
  ],
};
