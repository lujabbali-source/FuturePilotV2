import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "peru";
const countryName = "Perú";

const cities = [
  defineCity({
    id: "peru-lima",
    name: "Lima",
    region: "Lima y Callao (Capital y Área Metropolitana)",
    coordinates: {"lat": -12.0464, "lng": -77.0428},
    statistics: { population: "~10.000.000 habitantes", safety: "Moderada - Baja", weather: "15°C a 26°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~100 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-lima-universidad-nacional-mayor-de-san-marcos-unmsm",
        "name": "Universidad Nacional Mayor de San Marcos (UNMSM)",
        "cityId": "peru-lima",
        "website": "https://www.unmsm.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-lima-pontificia-universidad-catolica-del-peru-pucp",
        "name": "Pontificia Universidad Católica del Perú (PUCP)",
        "cityId": "peru-lima",
        "website": "https://www.pucp.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-nacional-de-ingenieria-uni",
        "name": "Universidad Nacional de Ingeniería (UNI)",
        "cityId": "peru-lima",
        "website": "https://www.uni.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-del-pacifico-up",
        "name": "Universidad del Pacífico (UP)",
        "cityId": "peru-lima",
        "website": "https://www.up.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-peruana-cayetano-heredia-upch",
        "name": "Universidad Peruana Cayetano Heredia (UPCH)",
        "cityId": "peru-lima",
        "website": "https://www.cayetano.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-de-lima-ulima",
        "name": "Universidad de Lima (ULima)",
        "cityId": "peru-lima",
        "website": "https://www.ulima.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-peruana-de-ciencias-aplicadas-upc",
        "name": "Universidad Peruana de Ciencias Aplicadas (UPC)",
        "cityId": "peru-lima",
        "website": "https://www.upc.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-nacional-agraria-la-molina-unalm",
        "name": "Universidad Nacional Agraria La Molina (UNALM)",
        "cityId": "peru-lima",
        "website": "https://www.lamolina.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-de-piura-udep-sede-lima",
        "name": "Universidad de Piura (UDEP - Sede Lima)",
        "cityId": "peru-lima",
        "website": "https://udep.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-de-san-martin-de-porres-usmp",
        "name": "Universidad de San Martín de Porres (USMP)",
        "cityId": "peru-lima",
        "website": "https://www.usmp.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-nacional-del-callao-unac",
        "name": "Universidad Nacional del Callao (UNAC)",
        "cityId": "peru-lima",
        "website": "https://www.unac.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-cientifica-del-sur-ucsur",
        "name": "Universidad Científica del Sur (UCSUR)",
        "cityId": "peru-lima",
        "website": "https://www.cientifica.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-lima-universidad-san-ignacio-de-loyola-usil",
        "name": "Universidad San Ignacio de Loyola (USIL)",
        "cityId": "peru-lima",
        "website": "https://www.usil.edu.pe",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "peru-arequipa",
    name: "Arequipa",
    region: "Arequipa (Región Sur)",
    coordinates: {"lat": -16.409, "lng": -71.5375},
    statistics: { population: "~1.100.000 habitantes", safety: "Alta", weather: "10°C a 22°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~80 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-arequipa-universidad-nacional-de-san-agustin-de-arequipa-unsa",
        "name": "Universidad Nacional de San Agustín de Arequipa (UNSA)",
        "cityId": "peru-arequipa",
        "website": "https://www.unsa.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-arequipa-universidad-catolica-de-santa-maria-ucsm",
        "name": "Universidad Católica de Santa María (UCSM)",
        "cityId": "peru-arequipa",
        "website": "https://www.ucsm.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-arequipa-universidad-catolica-san-pablo-ucsp",
        "name": "Universidad Católica San Pablo (UCSP)",
        "cityId": "peru-arequipa",
        "website": "https://ucsp.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-arequipa-universidad-continental-sede-arequipa",
        "name": "Universidad Continental (Sede Arequipa)",
        "cityId": "peru-arequipa",
        "website": "https://ucontinental.edu.pe",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "peru-trujillo",
    name: "Trujillo",
    region: "Trujillo y Chiclayo (Costa Norte)",
    coordinates: {"lat": -8.1116, "lng": -79.029},
    statistics: { population: "~950.000 habitantes (Trujillo)", safety: "Moderada", weather: "16°C a 26°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~70 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-trujillo-universidad-nacional-de-trujillo-unt",
        "name": "Universidad Nacional de Trujillo (UNT)",
        "cityId": "peru-trujillo",
        "website": "https://www.unitru.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-trujillo-universidad-privada-antenor-orrego-upao",
        "name": "Universidad Privada Antenor Orrego (UPAO)",
        "cityId": "peru-trujillo",
        "website": "https://www.upao.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-trujillo-universidad-cesar-vallejo-ucv-sede-trujillo",
        "name": "Universidad César Vallejo (UCV - Sede Trujillo)",
        "cityId": "peru-trujillo",
        "website": "https://www.ucv.edu.pe",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "peru-chiclayo",
    name: "Chiclayo",
    region: "Trujillo y Chiclayo (Costa Norte)",
    coordinates: {"lat": -6.7714, "lng": -79.8409},
    statistics: { population: "~950.000 habitantes (Trujillo)", safety: "Moderada", weather: "16°C a 26°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~70 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-chiclayo-universidad-nacional-pedro-ruiz-gallo-unprg",
        "name": "Universidad Nacional Pedro Ruiz Gallo (UNPRG)",
        "cityId": "peru-chiclayo",
        "website": "https://www.unprg.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-chiclayo-universidad-catolica-santo-toribio-de-mogrovejo-usat",
        "name": "Universidad Católica Santo Toribio de Mogrovejo (USAT)",
        "cityId": "peru-chiclayo",
        "website": "https://www.usat.edu.pe",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "peru-piura",
    name: "Piura",
    region: "Piura (Extremo Norte)",
    coordinates: {"lat": -5.1945, "lng": -80.6328},
    statistics: { population: "~500.000 habitantes", safety: "Moderada", weather: "18°C a 33°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~65 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-piura-universidad-de-piura-udep-campus-matriz-piura",
        "name": "Universidad de Piura (UDEP - Campus Matriz Piura)",
        "cityId": "peru-piura",
        "website": "https://udep.edu.pe",
        "type": "private"
      }),
      defineUniversity({
        "id": "peru-piura-universidad-nacional-de-piura-unp",
        "name": "Universidad Nacional de Piura (UNP)",
        "cityId": "peru-piura",
        "website": "https://www.unp.edu.pe",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "peru-cusco",
    name: "Cusco",
    region: "Cusco y Puno (Sierra Sur)",
    coordinates: {"lat": -13.532, "lng": -71.9675},
    statistics: { population: "~450.000 habitantes (Cusco)", safety: "Alta", weather: "1°C a 20°C", language: "Español / Quechua", currency: "Sol peruano (PEN)", internetSpeed: "~60 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-cusco-universidad-nacional-de-san-antonio-abad-del-cusco-unsaac",
        "name": "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)",
        "cityId": "peru-cusco",
        "website": "https://www.unsaac.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-cusco-universidad-andina-del-cusco-uac",
        "name": "Universidad Andina del Cusco (UAC)",
        "cityId": "peru-cusco",
        "website": "https://www.uandina.edu.pe",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "peru-puno",
    name: "Puno",
    region: "Cusco y Puno (Sierra Sur)",
    coordinates: {"lat": -15.8402, "lng": -70.0219},
    statistics: { population: "~450.000 habitantes (Cusco)", safety: "Alta", weather: "1°C a 20°C", language: "Español / Quechua", currency: "Sol peruano (PEN)", internetSpeed: "~60 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-puno-universidad-nacional-del-altiplano-unap",
        "name": "Universidad Nacional del Altiplano (UNAP)",
        "cityId": "peru-puno",
        "website": "https://portal.unap.edu.pe",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "peru-huancayo",
    name: "Huancayo",
    region: "Huancayo y la Sierra Central (Junín, Ayacucho)",
    coordinates: {"lat": -12.0654, "lng": -75.2049},
    statistics: { population: "~400.000 habitantes", safety: "Moderada - Alta", weather: "4°C a 20°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~55 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-huancayo-universidad-nacional-del-centro-del-peru-uncp",
        "name": "Universidad Nacional del Centro del Perú (UNCP)",
        "cityId": "peru-huancayo",
        "website": "https://uncp.edu.pe",
        "type": "public"
      }),
      defineUniversity({
        "id": "peru-huancayo-universidad-continental-sede-matriz-huancayo",
        "name": "Universidad Continental (Sede Matriz Huancayo)",
        "cityId": "peru-huancayo",
        "website": "https://ucontinental.edu.pe",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "peru-ayacucho",
    name: "Ayacucho",
    region: "Huancayo y la Sierra Central (Junín, Ayacucho)",
    coordinates: {"lat": -13.1588, "lng": -74.2232},
    statistics: { population: "~400.000 habitantes", safety: "Moderada - Alta", weather: "4°C a 20°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~55 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-ayacucho-universidad-nacional-de-san-cristobal-de-huamanga-unsch",
        "name": "Universidad Nacional de San Cristóbal de Huamanga (UNSCH)",
        "cityId": "peru-ayacucho",
        "website": "https://www.unsch.edu.pe",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "peru-iquitos",
    name: "Iquitos",
    region: "Iquitos y Pucallpa (Amazonía Peruana)",
    coordinates: {"lat": -3.7437, "lng": -73.2516},
    statistics: { population: "~480.000 habitantes (Iquitos)", safety: "Moderada", weather: "22°C a 32°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~40 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-iquitos-universidad-nacional-de-la-amazonia-peruana-unap",
        "name": "Universidad Nacional de la Amazonía Peruana (UNAP)",
        "cityId": "peru-iquitos",
        "website": "https://www.unapiquitos.edu.pe",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "peru-ucayali",
    name: "Ucayali",
    region: "Iquitos y Pucallpa (Amazonía Peruana)",
    coordinates: {"lat": -8.3791, "lng": -74.5539},
    statistics: { population: "~480.000 habitantes (Iquitos)", safety: "Moderada", weather: "22°C a 32°C", language: "Español", currency: "Sol peruano (PEN)", internetSpeed: "~40 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "peru-ucayali-universidad-nacional-de-ucayali-unu",
        "name": "Universidad Nacional de Ucayali (UNU)",
        "cityId": "peru-ucayali",
        "website": "https://www.unu.edu.pe",
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
