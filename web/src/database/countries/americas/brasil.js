import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "brasil";
const countryName = "Brasil";

const cities = [
  defineCity({
    id: "brasil-sao-paulo",
    name: "São Paulo",
    region: "São Paulo y Estado de São Paulo (Campinas, São José dos Campos)",
    coordinates: {"lat": -23.5505, "lng": -46.6333},
    statistics: { population: "~12.300.000 habitantes (Ciudad)", safety: "Moderada", weather: "15°C a 28°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~140 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
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
    region: "São Paulo y Estado de São Paulo (Campinas, São José dos Campos)",
    coordinates: {"lat": -22.9099, "lng": -47.0626},
    statistics: { population: "~12.300.000 habitantes (Ciudad)", safety: "Moderada", weather: "15°C a 28°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~140 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
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
    region: "São Paulo y Estado de São Paulo (Campinas, São José dos Campos)",
    coordinates: {"lat": -23.2237, "lng": -45.9009},
    statistics: { population: "~12.300.000 habitantes (Ciudad)", safety: "Moderada", weather: "15°C a 28°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~140 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
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
    region: "Rio de Janeiro y Niterói",
    coordinates: {"lat": -22.9068, "lng": -43.1729},
    statistics: { population: "~6.700.000 habitantes", safety: "Moderada - Baja", weather: "21°C a 34°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~120 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
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
    region: "Rio de Janeiro y Niterói",
    coordinates: {"lat": -22.8833, "lng": -43.1036},
    statistics: { population: "~6.700.000 habitantes", safety: "Moderada - Baja", weather: "21°C a 34°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~120 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
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
    region: "Brasília y Región Centro-Oeste (Goiânia, Campo Grande, Cuiabá)",
    coordinates: {"lat": -15.7939, "lng": -47.8828},
    statistics: { population: "~3.000.000 habitantes", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~130 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
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
    ],
  }),
  defineCity({
    id: "brasil-goias",
    name: "Goiás",
    region: "Brasília y Región Centro-Oeste (Goiânia, Campo Grande, Cuiabá)",
    coordinates: {"lat": -16.6869, "lng": -49.2648},
    statistics: { population: "~3.000.000 habitantes", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~130 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-goias-universidade-federal-de-goias-ufg",
        "name": "Universidade Federal de Goiás (UFG)",
        "cityId": "brasil-goias",
        "website": "https://www.ufg.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-mato-grosso-do-sul",
    name: "Mato Grosso do Sul",
    region: "Brasília y Región Centro-Oeste (Goiânia, Campo Grande, Cuiabá)",
    coordinates: {"lat": -20.4697, "lng": -54.6201},
    statistics: { population: "~3.000.000 habitantes", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~130 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-mato-grosso-do-sul-universidade-federal-de-mato-grosso-do-sul-ufms",
        "name": "Universidade Federal de Mato Grosso do Sul (UFMS)",
        "cityId": "brasil-mato-grosso-do-sul",
        "website": "https://www.ufms.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-mato-grosso",
    name: "Mato Grosso",
    region: "Brasília y Región Centro-Oeste (Goiânia, Campo Grande, Cuiabá)",
    coordinates: {"lat": -15.6014, "lng": -56.0979},
    statistics: { population: "~3.000.000 habitantes", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~130 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-mato-grosso-universidade-federal-de-mato-grosso-ufmt",
        "name": "Universidade Federal de Mato Grosso (UFMT)",
        "cityId": "brasil-mato-grosso",
        "website": "https://www.ufmt.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-belo-horizonte",
    name: "Belo Horizonte",
    region: "Minas Gerais (Belo Horizonte, Viçosa, Juiz de Fora, Uberlândia)",
    coordinates: {"lat": -19.9167, "lng": -43.9345},
    statistics: { population: "~2.500.000 habitantes (Belo Horizonte)", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~110 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    region: "Minas Gerais (Belo Horizonte, Viçosa, Juiz de Fora, Uberlândia)",
    coordinates: {"lat": -20.7546, "lng": -42.8825},
    statistics: { population: "~2.500.000 habitantes (Belo Horizonte)", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~110 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    region: "Minas Gerais (Belo Horizonte, Viçosa, Juiz de Fora, Uberlândia)",
    coordinates: {"lat": -21.7642, "lng": -43.3467},
    statistics: { population: "~2.500.000 habitantes (Belo Horizonte)", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~110 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    region: "Minas Gerais (Belo Horizonte, Viçosa, Juiz de Fora, Uberlândia)",
    coordinates: {"lat": -18.9186, "lng": -48.2772},
    statistics: { population: "~2.500.000 habitantes (Belo Horizonte)", safety: "Alta", weather: "16°C a 29°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~110 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    id: "brasil-rio-grande-do-sul",
    name: "Rio Grande do Sul",
    region: "Región Sur (Porto Alegre, Curitiba, Florianópolis)",
    coordinates: {"lat": -30.0346, "lng": -51.2177},
    statistics: { population: "~1.900.000 habitantes (Curitiba)", safety: "Muy alta", weather: "10°C a 25°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~135 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-rio-grande-do-sul-universidade-federal-do-rio-grande-do-sul-ufrgs",
        "name": "Universidade Federal do Rio Grande do Sul (UFRGS)",
        "cityId": "brasil-rio-grande-do-sul",
        "website": "https://www.ufrgs.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-rio-grande-do-sul-pontificia-universidade-catolica-do-rio-grande-do-sul-pucrs",
        "name": "Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)",
        "cityId": "brasil-rio-grande-do-sul",
        "website": "https://www.pucrs.br",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "brasil-porto-alegre",
    name: "Porto Alegre",
    region: "Región Sur (Porto Alegre, Curitiba, Florianópolis)",
    coordinates: {"lat": -30.0346, "lng": -51.2177},
    statistics: { population: "~1.900.000 habitantes (Curitiba)", safety: "Muy alta", weather: "10°C a 25°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~135 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-porto-alegre-universidade-do-vale-do-rio-dos-sinos-unisinos-sede-sao-leopoldo-porto-alegre",
        "name": "Universidade do Vale do Rio dos Sinos (UNISINOS) (Sede São Leopoldo/Porto Alegre)",
        "cityId": "brasil-porto-alegre",
        "website": "https://www.unisinos.br",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "brasil-parana",
    name: "Paraná",
    region: "Región Sur (Porto Alegre, Curitiba, Florianópolis)",
    coordinates: {"lat": -25.4284, "lng": -49.2733},
    statistics: { population: "~1.900.000 habitantes (Curitiba)", safety: "Muy alta", weather: "10°C a 25°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~135 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-parana-universidade-federal-do-parana-ufpr",
        "name": "Universidade Federal do Paraná (UFPR)",
        "cityId": "brasil-parana",
        "website": "https://www.ufpr.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-parana-pontificia-universidade-catolica-do-parana-pucpr",
        "name": "Pontifícia Universidade Católica do Paraná (PUCPR)",
        "cityId": "brasil-parana",
        "website": "https://www.pucpr.br",
        "type": "private"
      }),
      defineUniversity({
        "id": "brasil-parana-universidade-tecnologica-federal-do-parana-utfpr",
        "name": "Universidade Tecnológica Federal do Paraná (UTFPR)",
        "cityId": "brasil-parana",
        "website": "https://www.utfpr.edu.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-santa-catarina",
    name: "Santa Catarina",
    region: "Región Sur (Porto Alegre, Curitiba, Florianópolis)",
    coordinates: {"lat": -27.5954, "lng": -48.548},
    statistics: { population: "~1.900.000 habitantes (Curitiba)", safety: "Muy alta", weather: "10°C a 25°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~135 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-santa-catarina-universidade-federal-de-santa-catarina-ufsc",
        "name": "Universidade Federal de Santa Catarina (UFSC)",
        "cityId": "brasil-santa-catarina",
        "website": "https://www.ufsc.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-santa-catarina-universidade-do-estado-de-santa-catarina-udesc",
        "name": "Universidade do Estado de Santa Catarina (UDESC)",
        "cityId": "brasil-santa-catarina",
        "website": "https://www.udesc.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-bahia",
    name: "Bahia",
    region: "Región Nordeste (Salvador, Recife, Fortaleza, Natal)",
    coordinates: {"lat": -12.9777, "lng": -38.5016},
    statistics: { population: "~2.800.000 habitantes (Salvador)", safety: "Moderada - Baja", weather: "23°C a 32°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~100 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-bahia-universidade-federal-da-bahia-ufba",
        "name": "Universidade Federal da Bahia (UFBA)",
        "cityId": "brasil-bahia",
        "website": "https://www.ufba.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-bahia-universidade-do-estado-da-bahia-uneb",
        "name": "Universidade do Estado da Bahia (UNEB)",
        "cityId": "brasil-bahia",
        "website": "https://portal.uneb.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-pernambuco",
    name: "Pernambuco",
    region: "Región Nordeste (Salvador, Recife, Fortaleza, Natal)",
    coordinates: {"lat": -8.0476, "lng": -34.877},
    statistics: { population: "~2.800.000 habitantes (Salvador)", safety: "Moderada - Baja", weather: "23°C a 32°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~100 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-pernambuco-universidade-federal-de-pernambuco-ufpe",
        "name": "Universidade Federal de Pernambuco (UFPE)",
        "cityId": "brasil-pernambuco",
        "website": "https://www.ufpe.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-pernambuco-universidade-de-pernambuco-upe",
        "name": "Universidade de Pernambuco (UPE)",
        "cityId": "brasil-pernambuco",
        "website": "https://www.upe.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-ceara",
    name: "Ceará",
    region: "Región Nordeste (Salvador, Recife, Fortaleza, Natal)",
    coordinates: {"lat": -3.7172, "lng": -38.5433},
    statistics: { population: "~2.800.000 habitantes (Salvador)", safety: "Moderada - Baja", weather: "23°C a 32°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~100 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-ceara-universidade-federal-do-ceara-ufc",
        "name": "Universidade Federal do Ceará (UFC)",
        "cityId": "brasil-ceara",
        "website": "https://www.ufc.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-fortaleza",
    name: "Fortaleza",
    region: "Región Nordeste (Salvador, Recife, Fortaleza, Natal)",
    coordinates: {"lat": -3.7172, "lng": -38.5433},
    statistics: { population: "~2.800.000 habitantes (Salvador)", safety: "Moderada - Baja", weather: "23°C a 32°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~100 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    region: "Región Nordeste (Salvador, Recife, Fortaleza, Natal)",
    coordinates: {"lat": -5.7945, "lng": -35.211},
    statistics: { population: "~2.800.000 habitantes (Salvador)", safety: "Moderada - Baja", weather: "23°C a 32°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~100 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-natal-universidade-federal-do-rio-grande-do-norte-ufrn",
        "name": "Universidade Federal do Rio Grande do Norte (UFRN)",
        "cityId": "brasil-natal",
        "website": "https://www.ufrn.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-amazonas",
    name: "Amazonas",
    region: "Región Norte (Manaus, Belém)",
    coordinates: {"lat": -3.119, "lng": -60.0217},
    statistics: { population: "~2.200.000 habitantes (Manaus)", safety: "Moderada", weather: "24°C a 33°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~85 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-amazonas-universidade-federal-do-amazonas-ufam",
        "name": "Universidade Federal do Amazonas (UFAM)",
        "cityId": "brasil-amazonas",
        "website": "https://www.ufam.edu.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-amazonas-universidade-do-estado-do-amazonas-uea",
        "name": "Universidade do Estado do Amazonas (UEA)",
        "cityId": "brasil-amazonas",
        "website": "https://www.uea.edu.br",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "brasil-para",
    name: "Pará",
    region: "Región Norte (Manaus, Belém)",
    coordinates: {"lat": -1.4558, "lng": -48.5039},
    statistics: { population: "~2.200.000 habitantes (Manaus)", safety: "Moderada", weather: "24°C a 33°C", language: "Portugués", currency: "Real brasileño (BRL)", internetSpeed: "~85 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "brasil-para-universidade-federal-do-para-ufpa",
        "name": "Universidade Federal do Pará (UFPA)",
        "cityId": "brasil-para",
        "website": "https://www.ufpa.br",
        "type": "public"
      }),
      defineUniversity({
        "id": "brasil-para-universidade-do-estado-do-para-uepa",
        "name": "Universidade do Estado do Pará (UEPA)",
        "cityId": "brasil-para",
        "website": "https://www.uepa.br",
        "type": "public"
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
