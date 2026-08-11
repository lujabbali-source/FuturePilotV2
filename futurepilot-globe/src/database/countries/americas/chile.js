import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "chile";
const countryName = "Chile";

const cities = [
  defineCity({
    id: "chile-santiago",
    name: "Santiago",
    region: "Santiago y Región Metropolitana",
    coordinates: {"lat": -33.4489, "lng": -70.6693},
    statistics: { population: "~7.100.000 habitantes", safety: "Moderada", weather: "3°C a 31°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~180 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-santiago-pontificia-universidad-catolica-de-chile-uc",
        "name": "Pontificia Universidad Católica de Chile (UC)",
        "cityId": "chile-santiago",
        "website": "https://www.uc.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-de-chile-uchile",
        "name": "Universidad de Chile (UChile)",
        "cityId": "chile-santiago",
        "website": "https://uchile.cl",
        "type": "public"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-de-santiago-de-chile-usach",
        "name": "Universidad de Santiago de Chile (USACH)",
        "cityId": "chile-santiago",
        "website": "https://www.usach.cl",
        "type": "public"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-de-los-andes-uandes",
        "name": "Universidad de los Andes (UANDES)",
        "cityId": "chile-santiago",
        "website": "https://www.uandes.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-adolfo-ibanez-uai",
        "name": "Universidad Adolfo Ibáñez (UAI)",
        "cityId": "chile-santiago",
        "website": "https://www.uai.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-diego-portales-udp",
        "name": "Universidad Diego Portales (UDP)",
        "cityId": "chile-santiago",
        "website": "https://www.udp.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-del-desarrollo-udd",
        "name": "Universidad del Desarrollo (UDD)",
        "cityId": "chile-santiago",
        "website": "https://www.udd.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-andres-bello-unab",
        "name": "Universidad Andrés Bello (UNAB)",
        "cityId": "chile-santiago",
        "website": "https://www.unab.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-alberto-hurtado-uah",
        "name": "Universidad Alberto Hurtado (UAH)",
        "cityId": "chile-santiago",
        "website": "https://www.uahurtado.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-mayor",
        "name": "Universidad Mayor",
        "cityId": "chile-santiago",
        "website": "https://www.umayor.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-santiago-universidad-tecnologica-metropolitana-utem",
        "name": "Universidad Tecnológica Metropolitana (UTEM)",
        "cityId": "chile-santiago",
        "website": "https://www.utem.cl",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "chile-valparaiso",
    name: "Valparaíso",
    region: "Valparaíso y Viña del Mar (Región de Valparaíso)",
    coordinates: {"lat": -33.0472, "lng": -71.6127},
    statistics: { population: "~950.000 habitantes", safety: "Moderada", weather: "10°C a 22°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~150 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-valparaiso-universidad-tecnica-federico-santa-maria-usm-matriz-valparaiso",
        "name": "Universidad Técnica Federico Santa María (USM) (Matriz Valparaíso)",
        "cityId": "chile-valparaiso",
        "website": "https://usm.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-valparaiso-pontificia-universidad-catolica-de-valparaiso-pucv",
        "name": "Pontificia Universidad Católica de Valparaíso (PUCV)",
        "cityId": "chile-valparaiso",
        "website": "https://www.pucv.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-valparaiso-universidad-de-valparaiso-uv",
        "name": "Universidad de Valparaíso (UV)",
        "cityId": "chile-valparaiso",
        "website": "https://www.uv.cl",
        "type": "public"
      }),
      defineUniversity({
        "id": "chile-valparaiso-universidad-de-playa-ancha-upla",
        "name": "Universidad de Playa Ancha (UPLA)",
        "cityId": "chile-valparaiso",
        "website": "https://www.upla.cl",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "chile-concepcion",
    name: "Concepción",
    region: "Concepción y Región del Biobío",
    coordinates: {"lat": -36.8201, "lng": -73.0444},
    statistics: { population: "~1.000.000 habitantes (Gran Concepción)", safety: "Alta", weather: "6°C a 21°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~140 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-concepcion-universidad-de-concepcion-udec",
        "name": "Universidad de Concepción (UdeC)",
        "cityId": "chile-concepcion",
        "website": "https://www.udec.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-concepcion-universidad-del-bio-bio-ubb",
        "name": "Universidad del Bío-Bío (UBB)",
        "cityId": "chile-concepcion",
        "website": "https://www.ubiobio.cl",
        "type": "public"
      }),
      defineUniversity({
        "id": "chile-concepcion-universidad-catolica-de-la-santisima-concepcion-ucsc",
        "name": "Universidad Católica de la Santísima Concepción (UCSC)",
        "cityId": "chile-concepcion",
        "website": "https://www.ucsc.cl",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "chile-valdivia",
    name: "Valdivia",
    region: "Valdivia y Región de Los Ríos",
    coordinates: {"lat": -39.8142, "lng": -73.2459},
    statistics: { population: "~175.000 habitantes", safety: "Muy alta", weather: "4°C a 22°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~120 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-valdivia-universidad-austral-de-chile-uach",
        "name": "Universidad Austral de Chile (UACh)",
        "cityId": "chile-valdivia",
        "website": "https://www.uach.cl",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "chile-temuco",
    name: "Temuco",
    region: "Temuco (Región de La Araucanía)",
    coordinates: {"lat": -38.7359, "lng": -72.5904},
    statistics: { population: "~300.000 habitantes", safety: "Moderada - Alta", weather: "4°C a 24°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~110 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-temuco-universidad-de-la-frontera-ufro",
        "name": "Universidad de La Frontera (UFRO)",
        "cityId": "chile-temuco",
        "website": "https://www.ufro.cl",
        "type": "public"
      }),
      defineUniversity({
        "id": "chile-temuco-universidad-catolica-de-temuco-uct",
        "name": "Universidad Católica de Temuco (UCT)",
        "cityId": "chile-temuco",
        "website": "https://www.uct.cl",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "chile-antofagasta",
    name: "Antofagasta",
    region: "Antofagasta y Zona Norte (Arica, Iquique, La Serena)",
    coordinates: {"lat": -23.6509, "lng": -70.3975},
    statistics: { population: "~400.000 habitantes (Antofagasta)", safety: "Moderada", weather: "13°C a 24°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~130 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-antofagasta-universidad-de-antofagasta-ua",
        "name": "Universidad de Antofagasta (UA)",
        "cityId": "chile-antofagasta",
        "website": "https://www.uantof.cl",
        "type": "public"
      }),
      defineUniversity({
        "id": "chile-antofagasta-universidad-catolica-del-norte-ucn",
        "name": "Universidad Católica del Norte (UCN)",
        "cityId": "chile-antofagasta",
        "website": "https://www.ucn.cl",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "chile-arica",
    name: "Arica",
    region: "Antofagasta y Zona Norte (Arica, Iquique, La Serena)",
    coordinates: {"lat": -18.4783, "lng": -70.3126},
    statistics: { population: "~400.000 habitantes (Antofagasta)", safety: "Moderada", weather: "13°C a 24°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~130 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-arica-universidad-de-tarapaca-uta",
        "name": "Universidad de Tarapacá (UTA)",
        "cityId": "chile-arica",
        "website": "https://www.uta.cl",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "chile-iquique",
    name: "Iquique",
    region: "Antofagasta y Zona Norte (Arica, Iquique, La Serena)",
    coordinates: {"lat": -20.2141, "lng": -70.1522},
    statistics: { population: "~400.000 habitantes (Antofagasta)", safety: "Moderada", weather: "13°C a 24°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~130 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-iquique-universidad-arturo-prat-unap",
        "name": "Universidad Arturo Prat (UNAP)",
        "cityId": "chile-iquique",
        "website": "https://www.unap.cl",
        "type": "public"
      }),
      defineUniversity({
        "id": "chile-iquique-universidad-de-la-serena-uls",
        "name": "Universidad de La Serena (ULS)",
        "cityId": "chile-iquique",
        "website": "https://www.userena.cl",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "chile-puerto-montt",
    name: "Puerto Montt",
    region: "Zona Sur Austral (Puerto Montt, Punta Arenas)",
    coordinates: {"lat": -41.4693, "lng": -72.9424},
    statistics: { population: "~250.000 habitantes (Puerto Montt)", safety: "Muy alta", weather: "1°C a 18°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~100 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-puerto-montt-universidad-austral-de-chile-sede-puerto-montt",
        "name": "Universidad Austral de Chile (Sede Puerto Montt)",
        "cityId": "chile-puerto-montt",
        "website": "https://www.pm.uach.cl",
        "type": "private"
      }),
      defineUniversity({
        "id": "chile-puerto-montt-universidad-de-los-lagos-ulagos-osorno-puerto-montt",
        "name": "Universidad de Los Lagos (ULagos) (Osorno / Puerto Montt)",
        "cityId": "chile-puerto-montt",
        "website": "https://www.ulagos.cl",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "chile-magallanes",
    name: "Magallanes",
    region: "Zona Sur Austral (Puerto Montt, Punta Arenas)",
    coordinates: {"lat": -53.1638, "lng": -70.9171},
    statistics: { population: "~250.000 habitantes (Puerto Montt)", safety: "Muy alta", weather: "1°C a 18°C", language: "Español", currency: "Peso chileno (CLP)", internetSpeed: "~100 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "chile-magallanes-universidad-de-magallanes-umag",
        "name": "Universidad de Magallanes (UMAG)",
        "cityId": "chile-magallanes",
        "website": "http://www.umag.cl",
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
