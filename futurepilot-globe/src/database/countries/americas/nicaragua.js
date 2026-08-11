import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "nicaragua";
const countryName = "Nicaragua";

const cities = [
  defineCity({
    id: "nicaragua-managua",
    name: "Managua",
    region: "Managua (Capital y Departamento de Managua)",
    coordinates: {"lat": 12.115, "lng": -86.2362},
    statistics: { population: "~1.050.000 habitantes", safety: "Moderada", weather: "22°C a 35°C", language: "Español", currency: "Córdoba (NIO)", internetSpeed: "~50 Mbps", qualityOfLife: "Media", studentSatisfaction: "Muy alta" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-managua-universidad-nacional-autonoma-de-nicaragua-managua-unan-managua",
        "name": "Universidad Nacional Autónoma de Nicaragua - Managua (UNAN-Managua)",
        "cityId": "nicaragua-managua",
        "website": "https://www.unan.edu.ni",
        "type": "public"
      }),
      defineUniversity({
        "id": "nicaragua-managua-universidad-nacional-de-ingenieria-uni",
        "name": "Universidad Nacional de Ingeniería (UNI)",
        "cityId": "nicaragua-managua",
        "website": "https://www.uni.edu.ni",
        "type": "public"
      }),
      defineUniversity({
        "id": "nicaragua-managua-universidad-nacional-agraria-una",
        "name": "Universidad Nacional Agraria (UNA)",
        "cityId": "nicaragua-managua",
        "website": "https://www.una.edu.ni",
        "type": "public"
      }),
      defineUniversity({
        "id": "nicaragua-managua-universidad-central-de-nicaragua-ucn",
        "name": "Universidad Central de Nicaragua (UCN)",
        "cityId": "nicaragua-managua",
        "website": "https://www.ucn.edu.ni",
        "type": "private"
      }),
      defineUniversity({
        "id": "nicaragua-managua-universidad-americana-uam",
        "name": "Universidad Americana (UAM)",
        "cityId": "nicaragua-managua",
        "website": "https://www.uam.edu.ni",
        "type": "private"
      }),
      defineUniversity({
        "id": "nicaragua-managua-universidad-catolica-redemptoris-mater-unica",
        "name": "Universidad Católica Redemptoris Mater (UNICA)",
        "cityId": "nicaragua-managua",
        "website": "https://www.unica.edu.ni",
        "type": "private"
      }),
      defineUniversity({
        "id": "nicaragua-managua-universidad-de-ciencias-comerciales-ucc",
        "name": "Universidad de Ciencias Comerciales (UCC)",
        "cityId": "nicaragua-managua",
        "website": "https://www.ucc.edu.ni",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-leon",
    name: "León",
    region: "León (Ciudad Universitaria)",
    coordinates: {"lat": 12.434, "lng": -86.878},
    statistics: { population: "~210.000 habitantes", safety: "Alta", weather: "23°C a 36°C", language: "Español", currency: "Córdoba (NIO)", internetSpeed: "~40 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-leon-universidad-nacional-autonoma-de-nicaragua-leon-unan-leon",
        "name": "Universidad Nacional Autónoma de Nicaragua - León (UNAN-León)",
        "cityId": "nicaragua-leon",
        "website": "https://www.unanleon.edu.ni",
        "type": "public"
      }),
      defineUniversity({
        "id": "nicaragua-leon-universidad-de-ciencias-comerciales-ucc-sede-leon",
        "name": "Universidad de Ciencias Comerciales (UCC - Sede León)",
        "cityId": "nicaragua-leon",
        "website": "https://www.ucc.edu.ni",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-esteli",
    name: "Estelí",
    region: "Estelí, Matagalpa y Jinotega (Región Norte)",
    coordinates: {"lat": 13.09, "lng": -86.3536},
    statistics: { population: "~130.000 habitantes (Estelí)", safety: "Muy alta", weather: "16°C a 29°C", language: "Español", currency: "Córdoba (NIO)", internetSpeed: "~35 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-esteli-farem-esteli-unan-managua-facultad-regional-multidisciplinaria",
        "name": "FAREM-Estelí (UNAN-Managua / Facultad Regional Multidisciplinaria)",
        "cityId": "nicaragua-esteli",
        "website": "https://www.farem.unan.edu.ni",
        "type": "public"
      }),
      defineUniversity({
        "id": "nicaragua-esteli-universidad-catolica-del-tropico-seco-ucatse",
        "name": "Universidad Católica del Tropico Seco (UCATSE)",
        "cityId": "nicaragua-esteli",
        "website": "https://www.ucatse.edu.ni",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-matagalpa",
    name: "Matagalpa",
    region: "Estelí, Matagalpa y Jinotega (Región Norte)",
    coordinates: {"lat": 12.925, "lng": -85.9167},
    statistics: { population: "~130.000 habitantes (Estelí)", safety: "Muy alta", weather: "16°C a 29°C", language: "Español", currency: "Córdoba (NIO)", internetSpeed: "~35 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-matagalpa-farem-matagalpa-unan-managua",
        "name": "FAREM-Matagalpa (UNAN-Managua)",
        "cityId": "nicaragua-matagalpa",
        "website": "https://www.unan.edu.ni",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-granada",
    name: "Granada",
    region: "Granada, Rivas y Carazo (Región Pacífico Sur)",
    coordinates: {"lat": 11.9297, "lng": -85.9564},
    statistics: { population: "~125.000 habitantes (Granada)", safety: "Muy alta", weather: "21°C a 33°C", language: "Español", currency: "Córdoba (NIO)", internetSpeed: "~40 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-granada-universidad-internacional-de-la-integracion-de-america-latina-unival",
        "name": "Universidad Internacional de la Integración de América Latina (UNIVAL)",
        "cityId": "nicaragua-granada",
        "website": "https://www.unival.edu.ni",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-carazo",
    name: "Carazo",
    region: "Granada, Rivas y Carazo (Región Pacífico Sur)",
    coordinates: {"lat": 11.85, "lng": -86.1958},
    statistics: { population: "~125.000 habitantes (Granada)", safety: "Muy alta", weather: "21°C a 33°C", language: "Español", currency: "Córdoba (NIO)", internetSpeed: "~40 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-carazo-farem-carazo-unan-managua",
        "name": "FAREM-Carazo (UNAN-Managua)",
        "cityId": "nicaragua-carazo",
        "website": "https://www.unan.edu.ni",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-bluefields",
    name: "Bluefields",
    region: "Costa Caribe (Bluefields y Puerto Cabezas / Bilwi)",
    coordinates: {"lat": 12.0083, "lng": -83.7614},
    statistics: { population: "~60.000 habitantes (Bluefields)", safety: "Moderada - Alta", weather: "23°C a 31°C", language: "Español / Inglés Criollo / Miskito", currency: "Córdoba (NIO)", internetSpeed: "~25 Mbps", qualityOfLife: "Media - Baja", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-bluefields-bluefields-indian-caribbean-university-bicu-bluefields",
        "name": "Bluefields Indian & Caribbean University (BICU) (Bluefields)",
        "cityId": "nicaragua-bluefields",
        "website": "https://www.bicu.edu.ni",
        "type": "public"
      }),
      defineUniversity({
        "id": "nicaragua-bluefields-universidad-de-las-regiones-autonomas-de-la-costa-caribe-nicaraguense-uraccan-puerto-cabezas-siuna-bluefields",
        "name": "Universidad de las Regiones Autónomas de la Costa Caribe Nicaragüense (URACCAN) (Puerto Cabezas / Siuna / Bluefields)",
        "cityId": "nicaragua-bluefields",
        "website": "https://www.uraccan.edu.ni",
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
