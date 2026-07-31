import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "uruguay";
const countryName = "Uruguay";

const cities = [
  defineCity({
    id: "uruguay-montevideo",
    name: "Montevideo",
    coordinates: null,
    isCapital: false,
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
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    coordinates: null,
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
    coordinates: null,
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
