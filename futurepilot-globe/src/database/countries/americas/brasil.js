import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "brasil";
const countryName = "Brasil";

const cities = [
  defineCity({
    id: "brasil-sao-paulo",
    name: "São Paulo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-sao-paulo-universidade-de-sao-paulo-usp",
        "name": "Universidade de São Paulo (USP)",
        "cityId": "brasil-sao-paulo",
        "website": "https://www.usp.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-sao-paulo-universidade-estadual-paulista-unesp",
        "name": "Universidade Estadual Paulista (UNESP)",
        "cityId": "brasil-sao-paulo",
        "website": "https://www.unesp.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-sao-paulo-universidade-federal-de-sao-paulo-unifesp",
        "name": "Universidade Federal de São Paulo (UNIFESP)",
        "cityId": "brasil-sao-paulo",
        "website": "https://www.unifesp.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-sao-paulo-universidade-federal-de-sao-carlos-ufscar-sede-sao-carlos",
        "name": "Universidade Federal de São Carlos (UFSCar) (Sede São Carlos)",
        "cityId": "brasil-sao-paulo",
        "website": "https://www.ufscar.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-sao-paulo-pontificia-universidade-catolica-de-sao-paulo-puc-sp",
        "name": "Pontifícia Universidade Católica de São Paulo (PUC-SP)",
        "cityId": "brasil-sao-paulo",
        "website": "https://www.pucsp.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-sao-paulo-fundacao-getulio-vargas-fgv-sp",
        "name": "Fundação Getulio Vargas (FGV-SP)",
        "cityId": "brasil-sao-paulo",
        "website": "https://www.fgv.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-sao-paulo-universidade-presbiteriana-mackenzie",
        "name": "Universidade Presbiteriana Mackenzie",
        "cityId": "brasil-sao-paulo",
        "website": "https://www.mackenzie.br",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "brasil-campinas",
    name: "Campinas",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-campinas-universidade-estadual-de-campinas-unicamp-sede-campinas",
        "name": "Universidade Estadual de Campinas (UNICAMP) (Sede Campinas)",
        "cityId": "brasil-campinas",
        "website": "https://www.unicamp.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-sao-jose-dos-campos",
    name: "São José dos Campos",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-sao-jose-dos-campos-instituto-tecnologico-de-aeronautica-ita-sede-sao-jose-dos-campos",
        "name": "Instituto Tecnológico de Aeronáutica (ITA) (Sede São José dos Campos)",
        "cityId": "brasil-sao-jose-dos-campos",
        "website": "https://www.ita.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-rio-de-janeiro",
    name: "Rio de Janeiro",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-rio-de-janeiro-universidade-federal-do-rio-de-janeiro-ufrj",
        "name": "Universidade Federal do Rio de Janeiro (UFRJ)",
        "cityId": "brasil-rio-de-janeiro",
        "website": "https://ufrj.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-rio-de-janeiro-universidade-do-estado-do-rio-de-janeiro-uerj",
        "name": "Universidade do Estado do Rio de Janeiro (UERJ)",
        "cityId": "brasil-rio-de-janeiro",
        "website": "https://www.uerj.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-rio-de-janeiro-pontificia-universidade-catolica-do-rio-de-janeiro-puc-rio",
        "name": "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)",
        "cityId": "brasil-rio-de-janeiro",
        "website": "https://www.puc-rio.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-rio-de-janeiro-universidade-federal-do-estado-do-rio-de-janeiro-unirio",
        "name": "Universidade Federal do Estado do Rio de Janeiro (UNIRIO)",
        "cityId": "brasil-rio-de-janeiro",
        "website": "https://www.unirio.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-rio-de-janeiro-fundacao-getulio-vargas-fgv-rio",
        "name": "Fundação Getulio Vargas (FGV Rio)",
        "cityId": "brasil-rio-de-janeiro",
        "website": "https://fgv.br",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "brasil-niteroi",
    name: "Niterói",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-niteroi-universidade-federal-fluminense-uff-sede-niteroi",
        "name": "Universidade Federal Fluminense (UFF) (Sede Niterói)",
        "cityId": "brasil-niteroi",
        "website": "https://www.uff.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-brasilia",
    name: "Brasília",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-brasilia-brasilia-distrito-federal",
        "name": "Brasília (Distrito Federal)",
        "cityId": "brasil-brasilia",
        "website": "https://www.unb.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-brasilia-universidade-de-brasilia-unb",
        "name": "Universidade de Brasília (UnB)",
        "cityId": "brasil-brasilia",
        "website": "https://www.unb.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-brasilia-universidade-catolica-de-brasilia-ucb",
        "name": "Universidade Católica de Brasília (UCB)",
        "cityId": "brasil-brasilia",
        "website": "https://ucb.catolica.edu.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-brasilia-universidade-federal-de-goias-ufg",
        "name": "Universidade Federal de Goiás (UFG)",
        "cityId": "brasil-brasilia",
        "website": "https://www.ufg.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-brasilia-universidade-federal-de-mato-grosso-do-sul-ufms",
        "name": "Universidade Federal de Mato Grosso do Sul (UFMS)",
        "cityId": "brasil-brasilia",
        "website": "https://www.ufms.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-brasilia-universidade-federal-de-mato-grosso-ufmt",
        "name": "Universidade Federal de Mato Grosso (UFMT)",
        "cityId": "brasil-brasilia",
        "website": "https://www.ufmt.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-goiania",
    name: "Goiânia",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-goiania-goiania-goias",
        "name": "Goiânia (Goiás)",
        "cityId": "brasil-goiania",
        "website": "https://www.ufg.br",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "brasil-campo-grande",
    name: "Campo Grande",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-campo-grande-campo-grande-mato-grosso-do-sul",
        "name": "Campo Grande (Mato Grosso do Sul)",
        "cityId": "brasil-campo-grande",
        "website": "https://www.ufms.br",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "brasil-cuiaba",
    name: "Cuiabá",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-cuiaba-cuiaba-mato-grosso",
        "name": "Cuiabá (Mato Grosso)",
        "cityId": "brasil-cuiaba",
        "website": "https://www.ufmt.br",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "brasil-belo-horizonte",
    name: "Belo Horizonte",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-belo-horizonte-belo-horizonte",
        "name": "Belo Horizonte",
        "cityId": "brasil-belo-horizonte",
        "website": "https://www.ufmg.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-belo-horizonte-universidade-federal-de-minas-gerais-ufmg",
        "name": "Universidade Federal de Minas Gerais (UFMG)",
        "cityId": "brasil-belo-horizonte",
        "website": "https://www.ufmg.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-belo-horizonte-pontificia-universidade-catolica-de-minas-gerais-puc-minas",
        "name": "Pontifícia Universidade Católica de Minas Gerais (PUC Minas)",
        "cityId": "brasil-belo-horizonte",
        "website": "https://www.pucminas.br",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "brasil-vicosa",
    name: "Viçosa",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-vicosa-vicosa",
        "name": "Viçosa",
        "cityId": "brasil-vicosa",
        "website": "https://www.ufv.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-vicosa-universidade-federal-de-vicosa-ufv",
        "name": "Universidade Federal de Viçosa (UFV)",
        "cityId": "brasil-vicosa",
        "website": "https://www.ufv.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-juiz-de-fora",
    name: "Juiz de Fora",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-juiz-de-fora-juiz-de-fora",
        "name": "Juiz de Fora",
        "cityId": "brasil-juiz-de-fora",
        "website": "https://www.ufjf.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-juiz-de-fora-universidade-federal-de-juiz-de-fora-ufjf",
        "name": "Universidade Federal de Juiz de Fora (UFJF)",
        "cityId": "brasil-juiz-de-fora",
        "website": "https://www.ufjf.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-uberlandia",
    name: "Uberlândia",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-uberlandia-uberlandia",
        "name": "Uberlândia",
        "cityId": "brasil-uberlandia",
        "website": "https://www.ufu.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-uberlandia-universidade-federal-de-uberlandia-ufu",
        "name": "Universidade Federal de Uberlândia (UFU)",
        "cityId": "brasil-uberlandia",
        "website": "https://www.ufu.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-porto-alegre",
    name: "Porto Alegre",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-porto-alegre-porto-alegre-rio-grande-do-sul",
        "name": "Porto Alegre (Rio Grande do Sul)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.ufrgs.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-universidade-federal-do-rio-grande-do-sul-ufrgs",
        "name": "Universidade Federal do Rio Grande do Sul (UFRGS)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.ufrgs.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-pontificia-universidade-catolica-do-rio-grande-do-sul-pucrs",
        "name": "Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.pucrs.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-universidade-do-vale-do-rio-dos-sinos-unisinos-sede-sao-leopoldo-porto-alegre",
        "name": "Universidade do Vale do Rio dos Sinos (UNISINOS) (Sede São Leopoldo/Porto Alegre)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.unisinos.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-universidade-federal-do-parana-ufpr",
        "name": "Universidade Federal do Paraná (UFPR)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.ufpr.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-pontificia-universidade-catolica-do-parana-pucpr",
        "name": "Pontifícia Universidade Católica do Paraná (PUCPR)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.pucpr.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-universidade-tecnologica-federal-do-parana-utfpr",
        "name": "Universidade Tecnológica Federal do Paraná (UTFPR)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.utfpr.edu.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-universidade-federal-de-santa-catarina-ufsc",
        "name": "Universidade Federal de Santa Catarina (UFSC)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.ufsc.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-porto-alegre-universidade-do-estado-de-santa-catarina-udesc",
        "name": "Universidade do Estado de Santa Catarina (UDESC)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.udesc.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-curitiba",
    name: "Curitiba",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-curitiba-curitiba-parana",
        "name": "Curitiba (Paraná)",
        "cityId": "brasil-curitiba",
        "website": "https://www.ufpr.br",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "brasil-florianopolis",
    name: "Florianópolis",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-florianopolis-florianopolis-santa-catarina",
        "name": "Florianópolis (Santa Catarina)",
        "cityId": "brasil-florianopolis",
        "website": "https://www.ufsc.br",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "brasil-salvador",
    name: "Salvador",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-salvador-salvador-bahia",
        "name": "Salvador (Bahia)",
        "cityId": "brasil-salvador",
        "website": "https://www.ufba.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-salvador-universidade-federal-da-bahia-ufba",
        "name": "Universidade Federal da Bahia (UFBA)",
        "cityId": "brasil-salvador",
        "website": "https://www.ufba.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-salvador-universidade-do-estado-da-bahia-uneb",
        "name": "Universidade do Estado da Bahia (UNEB)",
        "cityId": "brasil-salvador",
        "website": "https://portal.uneb.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-salvador-universidade-federal-de-pernambuco-ufpe",
        "name": "Universidade Federal de Pernambuco (UFPE)",
        "cityId": "brasil-salvador",
        "website": "https://www.ufpe.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-salvador-universidade-de-pernambuco-upe",
        "name": "Universidade de Pernambuco (UPE)",
        "cityId": "brasil-salvador",
        "website": "https://www.upe.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-salvador-universidade-federal-do-ceara-ufc",
        "name": "Universidade Federal do Ceará (UFC)",
        "cityId": "brasil-salvador",
        "website": "https://www.ufc.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-salvador-universidade-federal-do-rio-grande-do-norte-ufrn",
        "name": "Universidade Federal do Rio Grande do Norte (UFRN)",
        "cityId": "brasil-salvador",
        "website": "https://www.ufrn.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-recife",
    name: "Recife",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-recife-recife-pernambuco",
        "name": "Recife (Pernambuco)",
        "cityId": "brasil-recife",
        "website": "https://www.ufpe.br",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "brasil-fortaleza",
    name: "Fortaleza",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-fortaleza-fortaleza-ceara",
        "name": "Fortaleza (Ceará)",
        "cityId": "brasil-fortaleza",
        "website": "https://www.ufc.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-fortaleza-universidade-de-fortaleza-unifor",
        "name": "Universidade de Fortaleza (UNIFOR)",
        "cityId": "brasil-fortaleza",
        "website": "https://www.unifor.br",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "brasil-natal",
    name: "Natal",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-natal-natal-rio-grande-do-norte",
        "name": "Natal (Rio Grande do Norte)",
        "cityId": "brasil-natal",
        "website": "https://www.ufrn.br",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "brasil-manaus",
    name: "Manaus",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-manaus-manaus-amazonas",
        "name": "Manaus (Amazonas)",
        "cityId": "brasil-manaus",
        "website": "https://www.ufam.edu.br",
        "type": null
      }),
      defineUniversity({
        "id": "brasil-manaus-universidade-federal-do-amazonas-ufam",
        "name": "Universidade Federal do Amazonas (UFAM)",
        "cityId": "brasil-manaus",
        "website": "https://www.ufam.edu.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-manaus-universidade-do-estado-do-amazonas-uea",
        "name": "Universidade do Estado do Amazonas (UEA)",
        "cityId": "brasil-manaus",
        "website": "https://www.uea.edu.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-manaus-universidade-federal-do-para-ufpa",
        "name": "Universidade Federal do Pará (UFPA)",
        "cityId": "brasil-manaus",
        "website": "https://www.ufpa.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-manaus-universidade-do-estado-do-para-uepa",
        "name": "Universidade do Estado do Pará (UEPA)",
        "cityId": "brasil-manaus",
        "website": "https://www.uepa.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-belem",
    name: "Belém",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-belem-belem-para",
        "name": "Belém (Pará)",
        "cityId": "brasil-belem",
        "website": "https://www.ufpa.br",
        "type": null
      }),
    ],
  }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  capital: null,
  currency: null,
  language: null,
  continent: "America",
  cities,
  nationalUniversities: [],
});
