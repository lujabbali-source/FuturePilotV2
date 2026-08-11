import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "puerto-rico";
const countryName = "Puerto Rico";

const cities = [
  defineCity({
    id: "puerto-rico-san-juan",
    name: "San Juan",
    region: "San Juan y Área Metropolitana (Bayamón, Carolina, Guaynabo)",
    coordinates: {"lat": 18.4655, "lng": -66.1057},
    statistics: { population: "~1.200.000 habitantes (Área Metropolitana)", safety: "Moderada", weather: "22°C a 32°C", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~130 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-de-puerto-rico-recinto-de-rio-piedras-uprrp",
        "name": "Universidad de Puerto Rico - Recinto de Río Piedras (UPRRP)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://www.uprrp.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-de-puerto-rico-recinto-de-ciencias-medicas-upr-rcm",
        "name": "Universidad de Puerto Rico - Recinto de Ciencias Médicas (UPR-RCM)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://rcm.upr.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-interamericana-de-puerto-rico-recinto-metro",
        "name": "Universidad Interamericana de Puerto Rico (Recinto Metro)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://metro.inter.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-del-sagrado-corazon-sagrado-santurce",
        "name": "Universidad del Sagrado Corazón (Sagrado) (Santurce)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://www.sagrado.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-politecnica-de-puerto-rico-pupr-hato-rey",
        "name": "Universidad Politécnica de Puerto Rico (PUPR) (Hato Rey)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://www.pupr.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-carolina",
    name: "Carolina",
    region: "San Juan y Área Metropolitana (Bayamón, Carolina, Guaynabo)",
    coordinates: {"lat": 18.3808, "lng": -65.9573},
    statistics: { population: "~1.200.000 habitantes (Área Metropolitana)", safety: "Moderada", weather: "22°C a 32°C", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~130 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-carolina-universidad-ana-g-mendez-uagm-campus-de-cupey-carolina-gurabo",
        "name": "Universidad Ana G. Méndez (UAGM - Campus de Cupey / Carolina / Gurabo)",
        "cityId": "puerto-rico-carolina",
        "website": "https://uagm.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-carolina-universidad-de-puerto-rico-en-carolina-uprc",
        "name": "Universidad de Puerto Rico en Carolina (UPRC)",
        "cityId": "puerto-rico-carolina",
        "website": "https://uprc.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-bayamon",
    name: "Bayamón",
    region: "San Juan y Área Metropolitana (Bayamón, Carolina, Guaynabo)",
    coordinates: {"lat": 18.3986, "lng": -66.1614},
    statistics: { population: "~1.200.000 habitantes (Área Metropolitana)", safety: "Moderada", weather: "22°C a 32°C", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~130 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-bayamon-universidad-de-puerto-rico-en-bayamon-uprb",
        "name": "Universidad de Puerto Rico en Bayamón (UPRB)",
        "cityId": "puerto-rico-bayamon",
        "website": "https://www.uprb.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-mayaguez",
    name: "Mayagüez",
    region: "Mayagüez y la Costa Oeste (Porta del Sol - Aguadilla)",
    coordinates: {"lat": 18.2013, "lng": -67.1397},
    statistics: { population: "~70.000 habitantes (Mayagüez)", safety: "Alta", weather: "20°C a 32°C", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~110 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-de-puerto-rico-recinto-universitario-de-mayaguez-rum-colegio",
        "name": "Universidad de Puerto Rico - Recinto Universitario de Mayagüez (RUM / Colegio)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://www.uprm.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-interamericana-de-puerto-rico-recinto-de-san-german",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de San Germán)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://sangerman.inter.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-de-puerto-rico-en-aguadilla-uprag",
        "name": "Universidad de Puerto Rico en Aguadilla (UPRAG)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://www.uprag.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-interamericana-de-puerto-rico-recinto-de-aguadilla",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de Aguadilla)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://aguadilla.inter.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-ponce",
    name: "Ponce",
    region: "Ponce y la Región Sur (Porta Caribe)",
    coordinates: {"lat": 18.0111, "lng": -66.6141},
    statistics: { population: "~130.000 habitantes (Ponce)", safety: "Moderada - Alta", weather: "21°C a 33°C", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~100 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-ponce-ponce-health-sciences-university-phsu",
        "name": "Ponce Health Sciences University (PHSU)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.psm.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-ponce-pontificia-universidad-catolica-de-puerto-rico-pucpr-recinto-de-ponce",
        "name": "Pontificia Universidad Católica de Puerto Rico (PUCPR - Recinto de Ponce)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.pucpr.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-ponce-universidad-de-puerto-rico-en-ponce-uprp",
        "name": "Universidad de Puerto Rico en Ponce (UPRP)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.upr.edu/ponce",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-ponce-escuela-de-medicina-san-juan-bautista-caguas-region-centro-sur",
        "name": "Escuela de Medicina San Juan Bautista (Caguas - Región Centro-Sur)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.sanjuanbautista.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-arecibo",
    name: "Arecibo",
    region: "Arecibo y la Región Norte (Utuado)",
    coordinates: {"lat": 18.4744, "lng": -66.7156},
    statistics: { population: "~85.000 habitantes (Arecibo)", safety: "Alta", weather: "19°C a 31°C", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~90 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-arecibo-universidad-de-puerto-rico-en-arecibo-upra",
        "name": "Universidad de Puerto Rico en Arecibo (UPRA)",
        "cityId": "puerto-rico-arecibo",
        "website": "https://www.upra.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-arecibo-universidad-interamericana-de-puerto-rico-recinto-de-arecibo",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de Arecibo)",
        "cityId": "puerto-rico-arecibo",
        "website": "https://arecibo.inter.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-utuado",
    name: "Utuado",
    region: "Arecibo y la Región Norte (Utuado)",
    coordinates: {"lat": 18.2664, "lng": -66.7005},
    statistics: { population: "~85.000 habitantes (Arecibo)", safety: "Alta", weather: "19°C a 31°C", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~90 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-utuado-universidad-de-puerto-rico-en-utuado-upru",
        "name": "Universidad de Puerto Rico en Utuado (UPRU)",
        "cityId": "puerto-rico-utuado",
        "website": "https://upr.edu/utuado",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-humacao-cayey",
    name: "Humacao, Cayey",
    region: "Humacao, Cayey y el Este (Fajardo)",
    coordinates: {"lat": 18.1497, "lng": -65.8275},
    statistics: { population: "~50.000 habitantes (Humacao)", safety: "Alta", weather: "18°C a 30°C (Según altitud)", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~95 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-humacao-cayey-universidad-de-puerto-rico-en-humacao-uprh",
        "name": "Universidad de Puerto Rico en Humacao (UPRH)",
        "cityId": "puerto-rico-humacao-cayey",
        "website": "https://www.upr.edu/humacao",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-humacao-cayey-universidad-de-puerto-rico-en-cayey-uprcay",
        "name": "Universidad de Puerto Rico en Cayey (UPRCAY)",
        "cityId": "puerto-rico-humacao-cayey",
        "website": "https://www.upr.edu/cayey",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-fajardo",
    name: "Fajardo",
    region: "Humacao, Cayey y el Este (Fajardo)",
    coordinates: {"lat": 18.3258, "lng": -65.6524},
    statistics: { population: "~50.000 habitantes (Humacao)", safety: "Alta", weather: "18°C a 30°C (Según altitud)", language: "Español / Inglés", currency: "Dólar estadounidense (USD)", internetSpeed: "~95 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-fajardo-universidad-interamericana-de-puerto-rico-recinto-de-fajardo",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de Fajardo)",
        "cityId": "puerto-rico-fajardo",
        "website": "https://fajardo.inter.edu",
        "type": "private"
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
