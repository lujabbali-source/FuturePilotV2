import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "canada";
const countryName = "Canadá";

const cities = [
  defineCity({
    id: "canada-toronto",
    name: "Toronto",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-toronto-toronto-y-area-metropolitana-gta",
        "name": "Toronto y Área Metropolitana (GTA)",
        "cityId": "canada-toronto",
        "website": "https://www.utoronto.ca",
        "type": null
      }),
      defineUniversity({
        "id": "canada-toronto-university-of-toronto-u-of-t",
        "name": "University of Toronto (U of T)",
        "cityId": "canada-toronto",
        "website": "https://www.utoronto.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-toronto-york-university",
        "name": "York University",
        "cityId": "canada-toronto",
        "website": "https://www.yorku.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-toronto-toronto-metropolitan-university-tmu-anteriormente-ryerson",
        "name": "Toronto Metropolitan University (TMU) (Anteriormente Ryerson)",
        "cityId": "canada-toronto",
        "website": "https://www.torontomu.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-toronto-carleton-university",
        "name": "Carleton University",
        "cityId": "canada-toronto",
        "website": "https://carleton.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-toronto-queen-s-university-kingston",
        "name": "Queen's University (Kingston)",
        "cityId": "canada-toronto",
        "website": "https://www.queensu.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-ottawa",
    name: "Ottawa",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-ottawa-ottawa-capital-nacional",
        "name": "Ottawa (Capital Nacional)",
        "cityId": "canada-ottawa",
        "website": "https://www.uottawa.ca",
        "type": null
      }),
      defineUniversity({
        "id": "canada-ottawa-university-of-ottawa-uottawa",
        "name": "University of Ottawa (uOttawa)",
        "cityId": "canada-ottawa",
        "website": "https://www.uottawa.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-waterloo",
    name: "Waterloo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-waterloo-waterloo-hamilton-london-y-kingston",
        "name": "Waterloo, Hamilton, London y Kingston",
        "cityId": "canada-waterloo",
        "website": "https://uwaterloo.ca",
        "type": null
      }),
      defineUniversity({
        "id": "canada-waterloo-university-of-waterloo-waterloo",
        "name": "University of Waterloo (Waterloo)",
        "cityId": "canada-waterloo",
        "website": "https://uwaterloo.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-hamilton",
    name: "Hamilton",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-hamilton-mcmaster-university-hamilton",
        "name": "McMaster University (Hamilton)",
        "cityId": "canada-hamilton",
        "website": "https://www.mcmaster.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-london",
    name: "London",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-london-western-university-london",
        "name": "Western University (London)",
        "cityId": "canada-london",
        "website": "https://www.uwo.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-montreal",
    name: "Montreal",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-montreal-montreal",
        "name": "Montreal",
        "cityId": "canada-montreal",
        "website": "https://www.mcgill.ca",
        "type": null
      }),
      defineUniversity({
        "id": "canada-montreal-mcgill-university",
        "name": "McGill University",
        "cityId": "canada-montreal",
        "website": "https://www.mcgill.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-montreal-universite-de-montreal-udem",
        "name": "Université de Montréal (UdeM)",
        "cityId": "canada-montreal",
        "website": "https://www.umontreal.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-montreal-concordia-university",
        "name": "Concordia University",
        "cityId": "canada-montreal",
        "website": "https://www.concordia.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-montreal-universite-du-quebec-a-montreal-uqam",
        "name": "Université du Québec à Montréal (UQAM)",
        "cityId": "canada-montreal",
        "website": "https://uqam.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-montreal-universite-laval",
        "name": "Université Laval",
        "cityId": "canada-montreal",
        "website": "https://www.ulaval.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-ciudad-de-quebec",
    name: "Ciudad de Quebec",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-ciudad-de-quebec-ciudad-de-quebec",
        "name": "Ciudad de Quebec",
        "cityId": "canada-ciudad-de-quebec",
        "website": "https://www.ulaval.ca",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "canada-vancouver",
    name: "Vancouver",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-vancouver-vancouver-y-area-metropolitana",
        "name": "Vancouver y Área Metropolitana",
        "cityId": "canada-vancouver",
        "website": "https://www.ubc.ca",
        "type": null
      }),
      defineUniversity({
        "id": "canada-vancouver-university-of-british-columbia-ubc",
        "name": "University of British Columbia (UBC)",
        "cityId": "canada-vancouver",
        "website": "https://www.ubc.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-vancouver-simon-fraser-university-sfu-burnaby-vancouver",
        "name": "Simon Fraser University (SFU) (Burnaby/Vancouver)",
        "cityId": "canada-vancouver",
        "website": "https://www.sfu.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-vancouver-victoria-isla-de-vancouver",
        "name": "Victoria (Isla de Vancouver)",
        "cityId": "canada-vancouver",
        "website": "https://www.uvic.ca",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "canada-victoria",
    name: "Victoria",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-victoria-university-of-victoria-uvic",
        "name": "University of Victoria (UVic)",
        "cityId": "canada-victoria",
        "website": "https://www.uvic.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-edmonton",
    name: "Edmonton",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-edmonton-university-of-alberta-u-of-a-edmonton",
        "name": "University of Alberta (U of A) (Edmonton)",
        "cityId": "canada-edmonton",
        "website": "https://www.ualberta.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-calgary",
    name: "Calgary",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-calgary-university-of-calgary-ucalgary-calgary",
        "name": "University of Calgary (UCalgary) (Calgary)",
        "cityId": "canada-calgary",
        "website": "https://www.ucalgary.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-halifax",
    name: "Halifax",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-halifax-dalhousie-university-halifax-nueva-escocia",
        "name": "Dalhousie University (Halifax, Nueva Escocia)",
        "cityId": "canada-halifax",
        "website": "https://www.dal.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-san-juan",
    name: "San Juan",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-san-juan-memorial-university-of-newfoundland-mun-san-juan-terranova-y-labrador",
        "name": "Memorial University of Newfoundland (MUN) (San Juan, Terranova y Labrador)",
        "cityId": "canada-san-juan",
        "website": "https://www.mun.ca",
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
  nationalUniversities: [
  {
    "name": "Manitoba (Winnipeg)",
    "website": "https://umanitoba.ca",
    "type": null
  },
  {
    "name": "University of Manitoba",
    "website": "https://umanitoba.ca",
    "type": "public"
  },
  {
    "name": "Saskatchewan (Saskatoon)",
    "website": "https://www.usask.ca",
    "type": null
  },
  {
    "name": "University of Saskatchewan (USask)",
    "website": "https://www.usask.ca",
    "type": "public"
  }
],
});
