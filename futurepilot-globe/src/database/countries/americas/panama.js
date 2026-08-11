import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "panama";
const countryName = "Panamá";

const cities = [
  defineCity({
    id: "panama-ciudad-de-panama",
    name: "Ciudad de Panamá",
    region: "Ciudad de Panamá y Área Metropolitana (Provincia de Panamá y Panamá Oeste)",
    coordinates: {"lat": 8.9824, "lng": -79.5199},
    statistics: { population: "~1.900.000 habitantes", safety: "Moderada - Alta", weather: "23°C a 33°C", language: "Español", currency: "Balboa (PAB) / Dólar estadounidense (USD)", internetSpeed: "~115 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-de-panama-up",
        "name": "Universidad de Panamá (UP)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-tecnologica-de-panama-utp-campus-victor-levi-sasso",
        "name": "Universidad Tecnológica de Panamá (UTP - Campus Victor Levi Sasso)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://utp.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-catolica-santa-maria-la-antigua-usma",
        "name": "Universidad Católica Santa María La Antigua (USMA)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://usma.ac.pa",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-del-istmo-udi",
        "name": "Universidad del Istmo (UDI)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.udistmo.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-latina-de-panama",
        "name": "Universidad Latina de Panamá",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.ulatina.edu.pa",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-interamericana-de-panama-uip",
        "name": "Universidad Interamericana de Panamá (UIP)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.uip.edu.pa",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-maritima-internacional-de-panama-umip",
        "name": "Universidad Marítima Internacional de Panamá (UMIP)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://umip.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-especializada-de-las-americas-udelas",
        "name": "Universidad Especializada de las Américas (UDELAS)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.udelas.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-florida-state-university-panama-fsu-panama-ciudad-del-saber",
        "name": "Florida State University - Panamá (FSU Panama) (Ciudad del Saber)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://panama.fsu.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "panama-david",
    name: "David",
    region: "David y provincia de Chiriquí (Occidente)",
    coordinates: {"lat": 8.4333, "lng": -82.4333},
    statistics: { population: "~160.000 habitantes", safety: "Alta", weather: "20°C a 33°C", language: "Español", currency: "Balboa (PAB) / Dólar estadounidense (USD)", internetSpeed: "~85 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-david-universidad-autonoma-de-chiriqui-unachi-david",
        "name": "Universidad Autónoma de Chiriquí (UNACHI) (David)",
        "cityId": "panama-david",
        "website": "https://www.unachi.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-david-universidad-tecnologica-de-panama-centro-regional-de-chiriqui",
        "name": "Universidad Tecnológica de Panamá (Centro Regional de Chiriquí)",
        "cityId": "panama-david",
        "website": "https://utp.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-david-universidad-catolica-santa-maria-la-antigua-sede-david",
        "name": "Universidad Católica Santa María La Antigua (Sede David)",
        "cityId": "panama-david",
        "website": "https://usma.ac.pa",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "panama-colon",
    name: "Colón",
    region: "Colón (Atlántico / Zona Libre)",
    coordinates: {"lat": 9.3547, "lng": -79.9014},
    statistics: { population: "~240.000 habitantes", safety: "Moderada - Baja", weather: "23°C a 32°C", language: "Español", currency: "Balboa (PAB) / Dólar estadounidense (USD)", internetSpeed: "~75 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-colon-universidad-de-panama-centro-regional-universitario-de-colon-cruc",
        "name": "Universidad de Panamá (Centro Regional Universitario de Colón - CRUC)",
        "cityId": "panama-colon",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-colon-universidad-tecnologica-de-panama-centro-regional-de-colon",
        "name": "Universidad Tecnológica de Panamá (Centro Regional de Colón)",
        "cityId": "panama-colon",
        "website": "https://utp.ac.pa",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "panama-veraguas",
    name: "Veraguas",
    region: "Provincias Centrales (Santiago de Veraguas, Chitré, Penonomé)",
    coordinates: {"lat": 8.1, "lng": -80.9833},
    statistics: { population: "~90.000 habitantes (Santiago)", safety: "Muy alta", weather: "22°C a 34°C", language: "Español", currency: "Balboa (PAB) / Dólar estadounidense (USD)", internetSpeed: "~70 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-veraguas-universidad-de-panama-centro-regional-universitario-de-veraguas-cruv",
        "name": "Universidad de Panamá (Centro Regional Universitario de Veraguas - CRUV)",
        "cityId": "panama-veraguas",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "panama-chitre",
    name: "Chitré",
    region: "Provincias Centrales (Santiago de Veraguas, Chitré, Penonomé)",
    coordinates: {"lat": 7.9667, "lng": -80.4333},
    statistics: { population: "~90.000 habitantes (Santiago)", safety: "Muy alta", weather: "22°C a 34°C", language: "Español", currency: "Balboa (PAB) / Dólar estadounidense (USD)", internetSpeed: "~70 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-chitre-universidad-de-panama-cru-de-azuero-chitre",
        "name": "Universidad de Panamá (CRU de Azuero / Chitré)",
        "cityId": "panama-chitre",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "panama-cocle",
    name: "Coclé",
    region: "Provincias Centrales (Santiago de Veraguas, Chitré, Penonomé)",
    coordinates: {"lat": 8.5167, "lng": -80.3583},
    statistics: { population: "~90.000 habitantes (Santiago)", safety: "Muy alta", weather: "22°C a 34°C", language: "Español", currency: "Balboa (PAB) / Dólar estadounidense (USD)", internetSpeed: "~70 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-cocle-universidad-tecnologica-de-panama-centro-regional-de-cocle",
        "name": "Universidad Tecnológica de Panamá (Centro Regional de Coclé)",
        "cityId": "panama-cocle",
        "website": "https://utp.ac.pa",
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
