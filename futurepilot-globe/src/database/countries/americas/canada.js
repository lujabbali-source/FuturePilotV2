import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "canada";
const countryName = "Canadá";

const cities = [
  defineCity({
    id: "canada-toronto",
    name: "Toronto",
    region: "Ontario (Toronto, Ottawa, Waterloo, Hamilton, London)",
    coordinates: {"lat": 43.6532, "lng": -79.3832},
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    ],
  }),
  defineCity({
    id: "canada-ottawa",
    name: "Ottawa",
    region: "Ontario (Toronto, Ottawa, Waterloo, Hamilton, London)",
    coordinates: {"lat": 45.4215, "lng": -75.6972},
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-ottawa-university-of-ottawa-uottawa",
        "name": "University of Ottawa (uOttawa)",
        "cityId": "canada-ottawa",
        "website": "https://www.uottawa.ca",
        "type": "public"
      }),
      defineUniversity({
        "id": "canada-ottawa-carleton-university",
        "name": "Carleton University",
        "cityId": "canada-ottawa",
        "website": "https://carleton.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-waterloo",
    name: "Waterloo",
    region: "Ontario (Toronto, Ottawa, Waterloo, Hamilton, London)",
    coordinates: {"lat": 43.4643, "lng": -80.5204},
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    region: "Ontario (Toronto, Ottawa, Waterloo, Hamilton, London)",
    coordinates: {"lat": 43.2557, "lng": -79.8711},
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
    region: "Ontario (Toronto, Ottawa, Waterloo, Hamilton, London)",
    coordinates: {"lat": 42.9849, "lng": -81.2453},
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
    id: "canada-kingston",
    name: "Kingston",
    region: "Ontario (Toronto, Ottawa, Waterloo, Hamilton, London)",
    coordinates: {"lat": 44.2312, "lng": -76.486},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-kingston-queen-s-university-kingston",
        "name": "Queen's University (Kingston)",
        "cityId": "canada-kingston",
        "website": "https://www.queensu.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-montreal",
    name: "Montreal",
    region: "Quebec (Montreal, Ciudad de Quebec)",
    coordinates: {"lat": 45.5019, "lng": -73.5674},
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    ],
  }),
  defineCity({
    id: "canada-ciudad-de-quebec",
    name: "Ciudad de Quebec",
    region: "Quebec (Montreal, Ciudad de Quebec)",
    coordinates: {"lat": 46.8139, "lng": -71.208},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-ciudad-de-quebec-universite-laval",
        "name": "Université Laval",
        "cityId": "canada-ciudad-de-quebec",
        "website": "https://www.ulaval.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-vancouver",
    name: "Vancouver",
    region: "Columbia Británica / British Columbia (Vancouver, Victoria)",
    coordinates: {"lat": 49.2827, "lng": -123.1207},
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    ],
  }),
  defineCity({
    id: "canada-victoria",
    name: "Victoria",
    region: "Columbia Británica / British Columbia (Vancouver, Victoria)",
    coordinates: {"lat": 48.4284, "lng": -123.3656},
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
    region: "Alberta (Calgary, Edmonton)",
    coordinates: {"lat": 53.5461, "lng": -113.4938},
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
    region: "Alberta (Calgary, Edmonton)",
    coordinates: {"lat": 51.0447, "lng": -114.0719},
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
    id: "canada-winnipeg",
    name: "Winnipeg",
    region: "Provincias de las Praderas (Manitoba y Saskatchewan)",
    coordinates: {"lat": 49.8951, "lng": -97.1384},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-winnipeg-university-of-manitoba",
        "name": "University of Manitoba",
        "cityId": "canada-winnipeg",
        "website": "https://umanitoba.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-saskatoon",
    name: "Saskatoon",
    region: "Provincias de las Praderas (Manitoba y Saskatchewan)",
    coordinates: {"lat": 52.1332, "lng": -106.67},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "canada-saskatoon-university-of-saskatchewan-usask",
        "name": "University of Saskatchewan (USask)",
        "cityId": "canada-saskatoon",
        "website": "https://www.usask.ca",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "canada-halifax",
    name: "Halifax",
    region: "Provincias del Atlántico (Halifax, San Juan)",
    coordinates: {"lat": 44.6488, "lng": -63.5752},
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
    region: "Provincias del Atlántico (Halifax, San Juan)",
    coordinates: {"lat": 47.5615, "lng": -52.7126},
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
  nationalUniversities: [],
});
