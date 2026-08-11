import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "uruguay";
const countryName = "Uruguay";

const cities = [
  defineCity({
    id: "uruguay-montevideo",
    name: "Montevideo",
    region: "Montevideo (Capital)",
    coordinates: {"lat": -34.9011, "lng": -56.1645},
    statistics: { population: "~1.400.000 habitantes", safety: "Alta", weather: "8°C a 28°C", language: "Español", currency: "Peso uruguayo (UYU)", internetSpeed: "~125 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "uruguay-montevideo-universidad-de-la-republica-udelar",
        "name": "Universidad de la República (UdelaR)",
        "cityId": "uruguay-montevideo",
        "website": "https://udelar.edu.uy",
        "type": "public"
      }),
      defineUniversity({
        "id": "uruguay-montevideo-universidad-tecnologica-del-uruguay-utec-oficinas-centrales",
        "name": "Universidad Tecnológica del Uruguay (UTEC) (Oficinas Centrales)",
        "cityId": "uruguay-montevideo",
        "website": "https://utec.edu.uy",
        "type": "public"
      }),
      defineUniversity({
        "id": "uruguay-montevideo-universidad-ort-uruguay",
        "name": "Universidad ORT Uruguay",
        "cityId": "uruguay-montevideo",
        "website": "https://www.ort.edu.uy",
        "type": "private"
      }),
      defineUniversity({
        "id": "uruguay-montevideo-universidad-catolica-del-uruguay-ucu",
        "name": "Universidad Católica del Uruguay (UCU)",
        "cityId": "uruguay-montevideo",
        "website": "https://www.ucu.edu.uy",
        "type": "private"
      }),
      defineUniversity({
        "id": "uruguay-montevideo-universidad-de-montevideo-um",
        "name": "Universidad de Montevideo (UM)",
        "cityId": "uruguay-montevideo",
        "website": "https://um.edu.uy",
        "type": "private"
      }),
      defineUniversity({
        "id": "uruguay-montevideo-universidad-de-la-empresa-ude",
        "name": "Universidad de la Empresa (UDE)",
        "cityId": "uruguay-montevideo",
        "website": "https://ude.edu.uy",
        "type": "private"
      }),
      defineUniversity({
        "id": "uruguay-montevideo-instituto-universitario-claeh-iuclaeh",
        "name": "Instituto Universitario CLAEH (IUCLAEH)",
        "cityId": "uruguay-montevideo",
        "website": "https://claeh.edu.uy",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "uruguay-maldonado",
    name: "Maldonado",
    region: "Maldonado y Punta del Este (Región Este)",
    coordinates: {"lat": -34.9036, "lng": -54.9548},
    statistics: { population: "~100.000 habitantes (Maldonado)", safety: "Muy alta", weather: "9°C a 26°C", language: "Español", currency: "Peso uruguayo (UYU)", internetSpeed: "~110 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "uruguay-maldonado-universidad-de-la-republica-cure-centro-universitario-regional-este-maldonado-rocha-treinta-y-tres",
        "name": "Universidad de la República (CURE - Centro Universitario Regional Este) (Maldonado / Rocha / Treinta y Tres)",
        "cityId": "uruguay-maldonado",
        "website": "https://cure.edu.uy",
        "type": "public"
      }),
      defineUniversity({
        "id": "uruguay-maldonado-universidad-catolica-del-uruguay-sede-punta-del-este",
        "name": "Universidad Católica del Uruguay (Sede Punta del Este)",
        "cityId": "uruguay-maldonado",
        "website": "https://www.ucu.edu.uy",
        "type": "private"
      }),
      defineUniversity({
        "id": "uruguay-maldonado-instituto-universitario-claeh-sede-punta-del-este",
        "name": "Instituto Universitario CLAEH (Sede Punta del Este)",
        "cityId": "uruguay-maldonado",
        "website": "https://claeh.edu.uy",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "uruguay-salto",
    name: "Salto",
    region: "Salto y Paysandú (Región Litoral Norte)",
    coordinates: {"lat": -31.3833, "lng": -57.9667},
    statistics: { population: "~105.000 habitantes (Salto)", safety: "Muy alta", weather: "10°C a 30°C", language: "Español", currency: "Peso uruguayo (UYU)", internetSpeed: "~95 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "uruguay-salto-universidad-de-la-republica-cenur-litoral-norte-sede-salto-paysandu",
        "name": "Universidad de la República (CENUR Litoral Norte - Sede Salto / Paysandú)",
        "cityId": "uruguay-salto",
        "website": "https://www.litoralnorte.udelar.edu.uy",
        "type": "public"
      }),
      defineUniversity({
        "id": "uruguay-salto-universidad-catolica-del-uruguay-sede-salto",
        "name": "Universidad Católica del Uruguay (Sede Salto)",
        "cityId": "uruguay-salto",
        "website": "https://www.ucu.edu.uy",
        "type": "private"
      }),
      defineUniversity({
        "id": "uruguay-salto-universidad-tecnologica-del-uruguay-utec-sede-fray-bentos-paysandu",
        "name": "Universidad Tecnológica del Uruguay (UTEC - Sede Fray Bentos / Paysandú)",
        "cityId": "uruguay-salto",
        "website": "https://utec.edu.uy",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "uruguay-rivera",
    name: "Rivera",
    region: "Rivera y Tacuarembó (Región Noreste / Centro)",
    coordinates: {"lat": -30.9053, "lng": -55.5508},
    statistics: { population: "~80.000 habitantes (Rivera)", safety: "Alta", weather: "11°C a 29°C", language: "Español / Portuñol", currency: "Peso uruguayo (UYU)", internetSpeed: "~85 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "uruguay-rivera-universidad-de-la-republica-cenur-noreste-sede-rivera-tacuarembo",
        "name": "Universidad de la República (CENUR Noreste - Sede Rivera / Tacuarembó)",
        "cityId": "uruguay-rivera",
        "website": "https://www.noreste.udelar.edu.uy",
        "type": "public"
      }),
      defineUniversity({
        "id": "uruguay-rivera-universidad-tecnologica-del-uruguay-utec-regional-norte-rivera",
        "name": "Universidad Tecnológica del Uruguay (UTEC - Regional Norte / Rivera)",
        "cityId": "uruguay-rivera",
        "website": "https://utec.edu.uy",
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
