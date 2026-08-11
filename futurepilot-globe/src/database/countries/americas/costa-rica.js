import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "costa-rica";
const countryName = "Costa Rica";

const cities = [
  defineCity({
    id: "costa-rica-san-jose",
    name: "San José",
    region: "San José y Gran Área Metropolitana (GAM)",
    coordinates: {"lat": 9.9281, "lng": -84.0907},
    statistics: { population: "~1.400.000 habitantes", safety: "Moderada - Alta", weather: "17°C a 28°C", language: "Español", currency: "Colón costarricense (CRC)", internetSpeed: "~85 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-de-costa-rica-ucr-sede-rodrigo-facio",
        "name": "Universidad de Costa Rica (UCR - Sede Rodrigo Facio)",
        "cityId": "costa-rica-san-jose",
        "website": "https://www.ucr.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-de-ciencias-medicas-ucimed",
        "name": "Universidad de Ciencias Médicas (UCIMED)",
        "cityId": "costa-rica-san-jose",
        "website": "https://www.ucimed.com",
        "type": "private"
      }),
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-latinoamericana-de-ciencia-y-tecnologia-ulacit",
        "name": "Universidad Latinoamericana de Ciencia y Tecnología (ULACIT)",
        "cityId": "costa-rica-san-jose",
        "website": "https://www.ulacit.ac.cr",
        "type": "private"
      }),
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-latina-de-costa-rica-campus-san-pedro",
        "name": "Universidad Latina de Costa Rica (Campus San Pedro)",
        "cityId": "costa-rica-san-jose",
        "website": "https://www.ulatina.ac.cr",
        "type": "private"
      }),
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-veritas",
        "name": "Universidad Veritas",
        "cityId": "costa-rica-san-jose",
        "website": "https://www.veritas.cr",
        "type": "private"
      }),
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-hispanoamericana-uh",
        "name": "Universidad Hispanoamericana (UH)",
        "cityId": "costa-rica-san-jose",
        "website": "https://uh.ac.cr",
        "type": "private"
      }),
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-estatal-a-distancia-uned-sede-central-sabanilla",
        "name": "Universidad Estatal a Distancia (UNED) (Sede Central Sabanilla)",
        "cityId": "costa-rica-san-jose",
        "website": "https://www.uned.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-san-jose-universidad-lead",
        "name": "Universidad LEAD",
        "cityId": "costa-rica-san-jose",
        "website": "https://u.lead.ac.cr",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "costa-rica-heredia",
    name: "Heredia",
    region: "Heredia (La Ciudad de las Flores)",
    coordinates: {"lat": 9.9989, "lng": -84.117},
    statistics: { population: "~140.000 habitantes (Heredia)", safety: "Alta", weather: "18°C a 29°C", language: "Español", currency: "Colón costarricense (CRC)", internetSpeed: "~80 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "costa-rica-heredia-universidad-nacional-de-costa-rica-una-campus-omar-dengo-benjamin-nunez",
        "name": "Universidad Nacional de Costa Rica (UNA - Campus Omar Dengo / Benjamín Núñez)",
        "cityId": "costa-rica-heredia",
        "website": "https://www.una.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-heredia-incae-business-school-campus-walter-kissling-gam-alajuela-heredia",
        "name": "INCAE Business School (Campus Walter Kissling Gam - Alajuela/Heredia)",
        "cityId": "costa-rica-heredia",
        "website": "https://www.incae.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "costa-rica-heredia-universidad-latina-de-costa-rica-campus-heredia",
        "name": "Universidad Latina de Costa Rica (Campus Heredia)",
        "cityId": "costa-rica-heredia",
        "website": "https://www.ulatina.ac.cr",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "costa-rica-cartago",
    name: "Cartago",
    region: "Cartago (Valle del Guarco)",
    coordinates: {"lat": 9.8644, "lng": -83.9194},
    statistics: { population: "~160.000 habitantes", safety: "Muy alta", weather: "14°C a 25°C", language: "Español", currency: "Colón costarricense (CRC)", internetSpeed: "~80 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "costa-rica-cartago-instituto-tecnologico-de-costa-rica-tec-sede-central-cartago",
        "name": "Instituto Tecnológico de Costa Rica (TEC - Sede Central Cartago)",
        "cityId": "costa-rica-cartago",
        "website": "https://www.tec.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-cartago-universidad-florencio-del-castillo-uca",
        "name": "Universidad Florencio del Castillo (UCA)",
        "cityId": "costa-rica-cartago",
        "website": "https://www.ufidelitas.ac.cr",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "costa-rica-alajuela",
    name: "Alajuela",
    region: "Alajuela",
    coordinates: {"lat": 10.0162, "lng": -84.2116},
    statistics: { population: "~140.000 habitantes (Heredia)", safety: "Alta", weather: "18°C a 29°C", language: "Español", currency: "Colón costarricense (CRC)", internetSpeed: "~80 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "costa-rica-alajuela-universidad-tecnica-nacional-utn-sede-central-alajuela",
        "name": "Universidad Técnica Nacional (UTN) (Sede Central Alajuela)",
        "cityId": "costa-rica-alajuela",
        "website": "https://www.utn.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-alajuela-universidad-de-costa-rica-sede-del-occidente-san-ramon",
        "name": "Universidad de Costa Rica (Sede del Occidente - San Ramón)",
        "cityId": "costa-rica-alajuela",
        "website": "https://so.ucr.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-alajuela-universidad-fidelitas-campus-san-pedro-y-alajuela",
        "name": "Universidad Fidelitas (Campus San Pedro y Alajuela)",
        "cityId": "costa-rica-alajuela",
        "website": "https://www.ufidelitas.ac.cr",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "costa-rica-liberia-santa-cruz",
    name: "Liberia / Santa Cruz",
    region: "Guanacaste y Puntarenas (Región Pacífico)",
    coordinates: {"lat": 10.6346, "lng": -85.437},
    statistics: { population: "~70.000 habitantes (Liberia)", safety: "Alta", weather: "22°C a 35°C", language: "Español", currency: "Colón costarricense (CRC)", internetSpeed: "~65 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "costa-rica-liberia-santa-cruz-universidad-de-costa-rica-sede-de-guanacaste",
        "name": "Universidad de Costa Rica (Sede de Guanacaste)",
        "cityId": "costa-rica-liberia-santa-cruz",
        "website": "https://www.ucr.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-liberia-santa-cruz-universidad-earth-campus-la-flor-liberia",
        "name": "Universidad EARTH (Campus La Flor - Liberia)",
        "cityId": "costa-rica-liberia-santa-cruz",
        "website": "https://www.earth.ac.cr",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "costa-rica-puntarenas",
    name: "Puntarenas",
    region: "Guanacaste y Puntarenas (Región Pacífico)",
    coordinates: {"lat": 9.9763, "lng": -84.8384},
    statistics: { population: "~70.000 habitantes (Liberia)", safety: "Alta", weather: "22°C a 35°C", language: "Español", currency: "Colón costarricense (CRC)", internetSpeed: "~65 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "costa-rica-puntarenas-universidad-de-costa-rica-sede-del-pacifico-puntarenas",
        "name": "Universidad de Costa Rica (Sede del Pacífico - Puntarenas)",
        "cityId": "costa-rica-puntarenas",
        "website": "https://sp.ucr.ac.cr",
        "type": "public"
      }),
      defineUniversity({
        "id": "costa-rica-puntarenas-universidad-tecnica-nacional-sede-del-pacifico",
        "name": "Universidad Técnica Nacional (Sede del Pacífico)",
        "cityId": "costa-rica-puntarenas",
        "website": "https://www.utn.ac.cr",
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
