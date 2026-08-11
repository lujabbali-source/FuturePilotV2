import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "argentina";
const countryName = "Argentina";

const cities = [
  defineCity({
    id: "argentina-ciudad-autonoma-de-buenos-aires",
    name: "Ciudad Autónoma de Buenos Aires",
    region: "Ciudad Autónoma de Buenos Aires (CABA) y Gran Buenos Aires",
    coordinates: {"lat": -34.6037, "lng": -58.3816},
    statistics: { population: "~15.000.000 habitantes (Área Metropolitana)", safety: "Moderada", weather: "11°C a 28°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~95 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-de-buenos-aires-uba",
        "name": "Universidad de Buenos Aires (UBA)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.uba.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-pontificia-universidad-catolica-argentina-uca",
        "name": "Pontificia Universidad Católica Argentina (UCA)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://uca.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-austral",
        "name": "Universidad Austral",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.austral.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-torcuato-di-tella-utdt",
        "name": "Universidad Torcuato Di Tella (UTDT)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.utdt.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-de-san-andres-udesa",
        "name": "Universidad de San Andrés (UdeSA)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.udesa.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-de-belgrano-ub",
        "name": "Universidad de Belgrano (UB)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.ub.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-de-palermo-up",
        "name": "Universidad de Palermo (UP)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.palermo.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-nacional-de-general-san-martin-unsam",
        "name": "Universidad Nacional de General San Martín (UNSAM)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.unsam.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-nacional-de-quilmes-unq",
        "name": "Universidad Nacional de Quilmes (UNQ)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.unq.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-universidad-argentina-de-la-empresa-uade",
        "name": "Universidad Argentina de la Empresa (UADE)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.uade.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-ciudad-autonoma-de-buenos-aires-instituto-tecnologico-de-buenos-aires-itba",
        "name": "Instituto Tecnológico de Buenos Aires (ITBA)",
        "cityId": "argentina-ciudad-autonoma-de-buenos-aires",
        "website": "https://www.itba.edu.ar",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "argentina-caba",
    name: "CABA",
    region: "Ciudad Autónoma de Buenos Aires (CABA) y Gran Buenos Aires",
    coordinates: {"lat": -34.6037, "lng": -58.3816},
    statistics: { population: "~15.000.000 habitantes (Área Metropolitana)", safety: "Moderada", weather: "11°C a 28°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~95 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-caba-universidad-tecnologica-nacional-utn-rectorado-y-sedes-caba-avellaneda",
        "name": "Universidad Tecnológica Nacional (UTN) (Rectorado y Sedes CABA/Avellaneda)",
        "cityId": "argentina-caba",
        "website": "https://www.utn.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-la-plata",
    name: "La Plata",
    region: "La Plata y Provincia de Buenos Aires",
    coordinates: {"lat": -34.9215, "lng": -57.9545},
    statistics: { population: "~900.000 habitantes (La Plata)", safety: "Moderada", weather: "9°C a 26°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~80 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-la-plata-universidad-nacional-de-la-plata-unlp",
        "name": "Universidad Nacional de La Plata (UNLP)",
        "cityId": "argentina-la-plata",
        "website": "https://unlp.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-la-plata-universidad-nacional-del-sur-uns-bahia-blanca",
        "name": "Universidad Nacional del Sur (UNS) (Bahía Blanca)",
        "cityId": "argentina-la-plata",
        "website": "https://www.uns.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-la-plata-universidad-nacional-del-mar-del-plata-unmdp-mar-del-plata",
        "name": "Universidad Nacional del Mar del Plata (UNMDP) (Mar del Plata)",
        "cityId": "argentina-la-plata",
        "website": "https://www.mdp.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-la-plata-universidad-nacional-del-centro-de-la-provincia-de-buenos-aires-unicen-tandil",
        "name": "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN) (Tandil)",
        "cityId": "argentina-la-plata",
        "website": "https://www.unicen.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-cordoba",
    name: "Córdoba",
    region: "Córdoba",
    coordinates: {"lat": -31.4201, "lng": -64.1888},
    statistics: { population: "~1.600.000 habitantes", safety: "Moderada - Alta", weather: "10°C a 28°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~85 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-cordoba-universidad-nacional-de-cordoba-unc",
        "name": "Universidad Nacional de Córdoba (UNC)",
        "cityId": "argentina-cordoba",
        "website": "https://www.unc.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-cordoba-universidad-catolica-de-cordoba-ucc",
        "name": "Universidad Católica de Córdoba (UCC)",
        "cityId": "argentina-cordoba",
        "website": "https://www.ucc.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-cordoba-universidad-siglo-21",
        "name": "Universidad Siglo 21",
        "cityId": "argentina-cordoba",
        "website": "https://21.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-cordoba-universidad-nacional-de-rio-cuarto-unrc-rio-cuarto",
        "name": "Universidad Nacional de Río Cuarto (UNRC) (Río Cuarto)",
        "cityId": "argentina-cordoba",
        "website": "https://www.unrc.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-rosario",
    name: "Rosario",
    region: "Rosario y Región Litoral (Santa Fe, Paraná)",
    coordinates: {"lat": -32.9442, "lng": -60.6505},
    statistics: { population: "~1.300.000 habitantes (Rosario)", safety: "Moderada - Baja", weather: "11°C a 29°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~80 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-rosario-universidad-nacional-de-rosario-unr",
        "name": "Universidad Nacional de Rosario (UNR)",
        "cityId": "argentina-rosario",
        "website": "https://unr.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-rosario-universidad-del-centro-educativo-latinoamericano-ucel",
        "name": "Universidad del Centro Educativo Latinoamericano (UCEL)",
        "cityId": "argentina-rosario",
        "website": "https://www.ucel.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-rosario-universidad-nacional-del-litoral-unl",
        "name": "Universidad Nacional del Litoral (UNL)",
        "cityId": "argentina-rosario",
        "website": "https://www.unl.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-santa-fe",
    name: "Santa Fe",
    region: "Rosario y Región Litoral (Santa Fe, Paraná)",
    coordinates: {"lat": -31.6333, "lng": -60.7},
    statistics: { population: "~1.300.000 habitantes (Rosario)", safety: "Moderada - Baja", weather: "11°C a 29°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~80 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-santa-fe-universidad-catolica-de-santa-fe-ucsf",
        "name": "Universidad Católica de Santa Fe (UCSF)",
        "cityId": "argentina-santa-fe",
        "website": "https://www.ucsf.edu.ar",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "argentina-entre-rios",
    name: "Entre Ríos",
    region: "Rosario y Región Litoral (Santa Fe, Paraná)",
    coordinates: {"lat": -31.7333, "lng": -60.5238},
    statistics: { population: "~1.300.000 habitantes (Rosario)", safety: "Moderada - Baja", weather: "11°C a 29°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~80 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-entre-rios-universidad-nacional-de-entre-rios-uner",
        "name": "Universidad Nacional de Entre Ríos (UNER)",
        "cityId": "argentina-entre-rios",
        "website": "https://www.uner.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-mendoza",
    name: "Mendoza",
    region: "Mendoza y Región Cuyo (San Juan, San Luis)",
    coordinates: {"lat": -32.8895, "lng": -68.8458},
    statistics: { population: "~1.100.000 habitantes (Gran Mendoza)", safety: "Alta", weather: "6°C a 30°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~75 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-mendoza-universidad-nacional-de-cuyo-uncuyo",
        "name": "Universidad Nacional de Cuyo (UNCUYO)",
        "cityId": "argentina-mendoza",
        "website": "https://www.uncuyo.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-mendoza-universidad-del-aconcagua-uda",
        "name": "Universidad del Aconcagua (UDA)",
        "cityId": "argentina-mendoza",
        "website": "https://www.uda.edu.ar",
        "type": "private"
      }),
      defineUniversity({
        "id": "argentina-mendoza-universidad-de-mendoza-um",
        "name": "Universidad de Mendoza (UM)",
        "cityId": "argentina-mendoza",
        "website": "https://um.edu.ar",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "argentina-san-juan",
    name: "San Juan",
    region: "Mendoza y Región Cuyo (San Juan, San Luis)",
    coordinates: {"lat": -31.5375, "lng": -68.5364},
    statistics: { population: "~1.100.000 habitantes (Gran Mendoza)", safety: "Alta", weather: "6°C a 30°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~75 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-san-juan-universidad-nacional-de-san-juan-unsj",
        "name": "Universidad Nacional de San Juan (UNSJ)",
        "cityId": "argentina-san-juan",
        "website": "https://www.unsj.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-san-luis",
    name: "San Luis",
    region: "Mendoza y Región Cuyo (San Juan, San Luis)",
    coordinates: {"lat": -33.3017, "lng": -66.3378},
    statistics: { population: "~1.100.000 habitantes (Gran Mendoza)", safety: "Alta", weather: "6°C a 30°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~75 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-san-luis-universidad-nacional-de-san-luis-unsl",
        "name": "Universidad Nacional de San Luis (UNSL)",
        "cityId": "argentina-san-luis",
        "website": "https://www.unsl.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-san-miguel-de-tucuman",
    name: "San Miguel de Tucumán",
    region: "San Miguel de Tucumán y Norte Argentino (Salta, Jujuy, Santiago del Estero)",
    coordinates: {"lat": -26.8083, "lng": -65.2176},
    statistics: { population: "~900.000 habitantes (Tucumán)", safety: "Moderada", weather: "12°C a 31°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~65 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-san-miguel-de-tucuman-universidad-nacional-de-tucuman-unt",
        "name": "Universidad Nacional de Tucumán (UNT)",
        "cityId": "argentina-san-miguel-de-tucuman",
        "website": "https://www.unt.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-san-miguel-de-tucuman-universidad-del-norte-santo-tomas-de-aquino-unsta",
        "name": "Universidad del Norte Santo Tomás de Aquino (UNSTA)",
        "cityId": "argentina-san-miguel-de-tucuman",
        "website": "https://www.unsta.edu.ar",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "argentina-salta",
    name: "Salta",
    region: "San Miguel de Tucumán y Norte Argentino (Salta, Jujuy, Santiago del Estero)",
    coordinates: {"lat": -24.7859, "lng": -65.4117},
    statistics: { population: "~900.000 habitantes (Tucumán)", safety: "Moderada", weather: "12°C a 31°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~65 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-salta-universidad-nacional-de-salta-unsa",
        "name": "Universidad Nacional de Salta (UNSa)",
        "cityId": "argentina-salta",
        "website": "https://www.unsa.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-salta-universidad-catolica-de-salta-ucasal",
        "name": "Universidad Católica de Salta (UCASAL)",
        "cityId": "argentina-salta",
        "website": "https://www.ucasal.edu.ar",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "argentina-san-salvador-de-jujuy",
    name: "San Salvador de Jujuy",
    region: "San Miguel de Tucumán y Norte Argentino (Salta, Jujuy, Santiago del Estero)",
    coordinates: {"lat": -24.1858, "lng": -65.2995},
    statistics: { population: "~900.000 habitantes (Tucumán)", safety: "Moderada", weather: "12°C a 31°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~65 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-san-salvador-de-jujuy-universidad-nacional-de-jujuy-unju",
        "name": "Universidad Nacional de Jujuy (UNJu)",
        "cityId": "argentina-san-salvador-de-jujuy",
        "website": "https://www.unju.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-san-carlos-de-bariloche",
    name: "San Carlos de Bariloche",
    region: "Patagonia Argentina (Bariloche, Neuquén, Comodoro Rivadavia)",
    coordinates: {"lat": -41.1335, "lng": -71.3103},
    statistics: { population: "~150.000 habitantes (Bariloche)", safety: "Muy alta", weather: "-2°C a 18°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~70 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-san-carlos-de-bariloche-instituto-balseiro-bariloche-centro-de-referencia-en-fisica-e-ingenieria-nuclear",
        "name": "Instituto Balseiro (Bariloche - Centro de referencia en física e ingeniería nuclear)",
        "cityId": "argentina-san-carlos-de-bariloche",
        "website": "https://www.ib.edu.ar",
        "type": "public"
      }),
      defineUniversity({
        "id": "argentina-san-carlos-de-bariloche-universidad-nacional-de-rio-negro-unrn-bariloche-general-roca",
        "name": "Universidad Nacional de Río Negro (UNRN) (Bariloche/General Roca)",
        "cityId": "argentina-san-carlos-de-bariloche",
        "website": "https://www.unrn.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-neuquen",
    name: "Neuquén",
    region: "Patagonia Argentina (Bariloche, Neuquén, Comodoro Rivadavia)",
    coordinates: {"lat": -38.9516, "lng": -68.0591},
    statistics: { population: "~150.000 habitantes (Bariloche)", safety: "Muy alta", weather: "-2°C a 18°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~70 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-neuquen-universidad-nacional-del-comahue-unco-neuquen-y-rio-negro",
        "name": "Universidad Nacional del Comahue (UNCo) (Neuquén y Río Negro)",
        "cityId": "argentina-neuquen",
        "website": "https://www.uncoma.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-chubut",
    name: "Chubut",
    region: "Patagonia Argentina (Bariloche, Neuquén, Comodoro Rivadavia)",
    coordinates: {"lat": -45.8647, "lng": -67.4966},
    statistics: { population: "~150.000 habitantes (Bariloche)", safety: "Muy alta", weather: "-2°C a 18°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~70 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-chubut-universidad-nacional-de-la-patagonia-san-juan-bosco-unpsjb-comodoro-rivadavia",
        "name": "Universidad Nacional de la Patagonia San Juan Bosco (UNPSJB) (Comodoro Rivadavia)",
        "cityId": "argentina-chubut",
        "website": "http://www.unp.edu.ar",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "argentina-tierra-del-fuego",
    name: "Tierra del Fuego",
    region: "Patagonia Argentina (Bariloche, Neuquén, Comodoro Rivadavia)",
    coordinates: {"lat": -54.8019, "lng": -68.303},
    statistics: { population: "~150.000 habitantes (Bariloche)", safety: "Muy alta", weather: "-2°C a 18°C", language: "Español", currency: "Peso argentino (ARS)", internetSpeed: "~70 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "argentina-tierra-del-fuego-universidad-nacional-de-tierra-del-fuego-untdf-ushuaia-rio-grande",
        "name": "Universidad Nacional de Tierra del Fuego (UNTDF) (Ushuaia/Río Grande)",
        "cityId": "argentina-tierra-del-fuego",
        "website": "https://www.untdf.edu.ar",
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
