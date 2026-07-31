import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "nicaragua";
const countryName = "Nicaragua";

const cities = [
  defineCity({
    id: "nicaragua-managua",
    name: "Managua",
    coordinates: null,
    isCapital: false,
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
    coordinates: null,
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
    id: "nicaragua-esteli-matagalpa",
    name: "Estelí, Matagalpa",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-esteli-matagalpa-esteli",
        "name": "Estelí",
        "cityId": "nicaragua-esteli-matagalpa",
        "website": "https://www.farem.unan.edu.ni",
        "type": null
      }),
      defineUniversity({
        "id": "nicaragua-esteli-matagalpa-farem-esteli-unan-managua-facultad-regional-multidisciplinaria",
        "name": "FAREM-Estelí (UNAN-Managua / Facultad Regional Multidisciplinaria)",
        "cityId": "nicaragua-esteli-matagalpa",
        "website": "https://www.farem.unan.edu.ni",
        "type": "public"
      }),
      defineUniversity({
        "id": "nicaragua-esteli-matagalpa-universidad-catolica-del-tropico-seco-ucatse",
        "name": "Universidad Católica del Tropico Seco (UCATSE)",
        "cityId": "nicaragua-esteli-matagalpa",
        "website": "https://www.ucatse.edu.ni",
        "type": "private"
      }),
      defineUniversity({
        "id": "nicaragua-esteli-matagalpa-matagalpa",
        "name": "Matagalpa",
        "cityId": "nicaragua-esteli-matagalpa",
        "website": "https://www.unan.edu.ni",
        "type": null
      }),
      defineUniversity({
        "id": "nicaragua-esteli-matagalpa-farem-matagalpa-unan-managua",
        "name": "FAREM-Matagalpa (UNAN-Managua)",
        "cityId": "nicaragua-esteli-matagalpa",
        "website": "https://www.unan.edu.ni",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-granada-rivas",
    name: "Granada, Rivas",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "nicaragua-granada-rivas-granada",
        "name": "Granada",
        "cityId": "nicaragua-granada-rivas",
        "website": "https://www.unival.edu.ni",
        "type": null
      }),
      defineUniversity({
        "id": "nicaragua-granada-rivas-universidad-internacional-de-la-integracion-de-america-latina-unival",
        "name": "Universidad Internacional de la Integración de América Latina (UNIVAL)",
        "cityId": "nicaragua-granada-rivas",
        "website": "https://www.unival.edu.ni",
        "type": "private"
      }),
      defineUniversity({
        "id": "nicaragua-granada-rivas-carazo-jinotepe",
        "name": "Carazo (Jinotepe)",
        "cityId": "nicaragua-granada-rivas",
        "website": "https://www.unan.edu.ni",
        "type": null
      }),
      defineUniversity({
        "id": "nicaragua-granada-rivas-farem-carazo-unan-managua",
        "name": "FAREM-Carazo (UNAN-Managua)",
        "cityId": "nicaragua-granada-rivas",
        "website": "https://www.unan.edu.ni",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "nicaragua-bluefields",
    name: "Bluefields",
    coordinates: null,
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
