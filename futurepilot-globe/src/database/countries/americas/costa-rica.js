import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "costa-rica";
const countryName = "Costa Rica";

const cities = [
  defineCity({
    id: "costa-rica-san-jose",
    name: "San José",
    coordinates: null,
    isCapital: false,
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
    coordinates: null,
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
    coordinates: null,
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
    coordinates: null,
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
];

export default defineCountry({
  id: countryId,
  name: countryName,
  capital: null,
  currency: null,
  language: null,
  continent: "America",
  cities,
  nationalUniversities: [
  {
    "name": "Liberia / Santa Cruz (Guanacaste)",
    "website": "https://www.ucr.ac.cr",
    "type": null
  },
  {
    "name": "Universidad de Costa Rica (Sede de Guanacaste)",
    "website": "https://www.ucr.ac.cr",
    "type": "public"
  },
  {
    "name": "Universidad EARTH (Campus La Flor - Liberia)",
    "website": "https://www.earth.ac.cr",
    "type": "private"
  },
  {
    "name": "Puntarenas",
    "website": "https://sp.ucr.ac.cr",
    "type": null
  },
  {
    "name": "Universidad de Costa Rica (Sede del Pacífico - Puntarenas)",
    "website": "https://sp.ucr.ac.cr",
    "type": "public"
  },
  {
    "name": "Universidad Técnica Nacional (Sede del Pacífico)",
    "website": "https://www.utn.ac.cr",
    "type": "public"
  }
],
});
