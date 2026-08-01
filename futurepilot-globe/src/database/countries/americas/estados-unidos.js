import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "estados-unidos";
const countryName = "Estados Unidos (USA)";

const cities = [
  defineCity({
    id: "estados-unidos-massachusetts",
    name: "Massachusetts",
    region: "Noreste y Nueva Inglaterra (Boston, Cambridge, Nueva York, Filadelfia)",
    coordinates: {"lat": 42.3601, "lng": -71.0589},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-massachusetts-harvard-university",
        "name": "Harvard University",
        "cityId": "estados-unidos-massachusetts",
        "website": "https://www.harvard.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-massachusetts-massachusetts-institute-of-technology-mit",
        "name": "Massachusetts Institute of Technology (MIT)",
        "cityId": "estados-unidos-massachusetts",
        "website": "https://www.mit.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-massachusetts-boston-university-bu",
        "name": "Boston University (BU)",
        "cityId": "estados-unidos-massachusetts",
        "website": "https://www.bu.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-massachusetts-northeastern-university",
        "name": "Northeastern University",
        "cityId": "estados-unidos-massachusetts",
        "website": "https://www.northeastern.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-nueva-york",
    name: "Nueva York",
    region: "Noreste y Nueva Inglaterra (Boston, Cambridge, Nueva York, Filadelfia)",
    coordinates: {"lat": 40.7128, "lng": -74.006},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-nueva-york-columbia-university-ciudad-de-nueva-york",
        "name": "Columbia University (Ciudad de Nueva York)",
        "cityId": "estados-unidos-nueva-york",
        "website": "https://www.columbia.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-nueva-york-new-york-university-nyu-ciudad-de-nueva-york",
        "name": "New York University (NYU) (Ciudad de Nueva York)",
        "cityId": "estados-unidos-nueva-york",
        "website": "https://www.nyu.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-nueva-york-cornell-university-ithaca",
        "name": "Cornell University (Ithaca)",
        "cityId": "estados-unidos-nueva-york",
        "website": "https://www.cornell.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-nueva-jersey",
    name: "Nueva Jersey",
    region: "Noreste y Nueva Inglaterra (Boston, Cambridge, Nueva York, Filadelfia)",
    coordinates: {"lat": 40.3573, "lng": -74.6672},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-nueva-jersey-princeton-university-nueva-jersey",
        "name": "Princeton University (Nueva Jersey)",
        "cityId": "estados-unidos-nueva-jersey",
        "website": "https://www.princeton.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-pensilvania",
    name: "Pensilvania",
    region: "Noreste y Nueva Inglaterra (Boston, Cambridge, Nueva York, Filadelfia)",
    coordinates: {"lat": 39.9526, "lng": -75.1652},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-pensilvania-university-of-pennsylvania-upenn-filadelfia-pensilvania",
        "name": "University of Pennsylvania (UPenn) (Filadelfia, Pensilvania)",
        "cityId": "estados-unidos-pensilvania",
        "website": "https://www.upenn.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-connecticut",
    name: "Connecticut",
    region: "Noreste y Nueva Inglaterra (Boston, Cambridge, Nueva York, Filadelfia)",
    coordinates: {"lat": 41.3083, "lng": -72.9279},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-connecticut-yale-university-new-haven-connecticut",
        "name": "Yale University (New Haven, Connecticut)",
        "cityId": "estados-unidos-connecticut",
        "website": "https://www.yale.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-silicon-valley",
    name: "Silicon Valley",
    region: "Costa Oeste - California (Silicon Valley, Los Ángeles, San Francisco)",
    coordinates: {"lat": 37.4419, "lng": -122.143},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-silicon-valley-stanford-university-stanford-palo-alto",
        "name": "Stanford University (Stanford/Palo Alto)",
        "cityId": "estados-unidos-silicon-valley",
        "website": "https://www.stanford.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-silicon-valley-university-of-california-berkeley-uc-berkeley",
        "name": "University of California, Berkeley (UC Berkeley)",
        "cityId": "estados-unidos-silicon-valley",
        "website": "https://www.berkeley.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-silicon-valley-university-of-california-los-angeles-ucla",
        "name": "University of California, Los Angeles (UCLA)",
        "cityId": "estados-unidos-silicon-valley",
        "website": "https://www.ucla.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-silicon-valley-university-of-southern-california-usc",
        "name": "University of Southern California (USC)",
        "cityId": "estados-unidos-silicon-valley",
        "website": "https://www.usc.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-silicon-valley-california-institute-of-technology-caltech-pasadena",
        "name": "California Institute of Technology (Caltech) (Pasadena)",
        "cityId": "estados-unidos-silicon-valley",
        "website": "https://www.caltech.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-silicon-valley-university-of-california-san-diego-uc-san-diego",
        "name": "University of California, San Diego (UC San Diego)",
        "cityId": "estados-unidos-silicon-valley",
        "website": "https://ucsd.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-austin",
    name: "Austin",
    region: "Texas (Austin, Houston, Dallas)",
    coordinates: {"lat": 30.2672, "lng": -97.7431},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-austin-the-university-of-texas-at-austin-ut-austin",
        "name": "The University of Texas at Austin (UT Austin)",
        "cityId": "estados-unidos-austin",
        "website": "https://www.utexas.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-austin-texas-a-m-university-college-station",
        "name": "Texas A&M University (College Station)",
        "cityId": "estados-unidos-austin",
        "website": "https://www.tamu.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-houston",
    name: "Houston",
    region: "Texas (Austin, Houston, Dallas)",
    coordinates: {"lat": 29.7604, "lng": -95.3698},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-houston-rice-university-houston",
        "name": "Rice University (Houston)",
        "cityId": "estados-unidos-houston",
        "website": "https://www.rice.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-dallas",
    name: "Dallas",
    region: "Texas (Austin, Houston, Dallas)",
    coordinates: {"lat": 32.7767, "lng": -96.797},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-dallas-southern-methodist-university-smu-dallas",
        "name": "Southern Methodist University (SMU) (Dallas)",
        "cityId": "estados-unidos-dallas",
        "website": "https://www.smu.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-chicago",
    name: "Chicago",
    region: "Medio Oeste (Chicago, Illinois, Míchigan, Indiana)",
    coordinates: {"lat": 41.8781, "lng": -87.6298},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-chicago-university-of-chicago",
        "name": "University of Chicago",
        "cityId": "estados-unidos-chicago",
        "website": "https://www.uchicago.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-chicago-northwestern-university-evanston-chicago",
        "name": "Northwestern University (Evanston/Chicago)",
        "cityId": "estados-unidos-chicago",
        "website": "https://www.northwestern.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-chicago-university-of-illinois-urbana-champaign",
        "name": "University of Illinois Urbana-Champaign",
        "cityId": "estados-unidos-chicago",
        "website": "https://illinois.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-michigan-e-indiana",
    name: "Míchigan e Indiana",
    region: "Medio Oeste (Chicago, Illinois, Míchigan, Indiana)",
    coordinates: {"lat": 42.2808, "lng": -83.743},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-michigan-e-indiana-university-of-michigan-ann-arbor",
        "name": "University of Michigan (Ann Arbor)",
        "cityId": "estados-unidos-michigan-e-indiana",
        "website": "https://umich.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-michigan-e-indiana-purdue-university-indiana",
        "name": "Purdue University (Indiana)",
        "cityId": "estados-unidos-michigan-e-indiana",
        "website": "https://www.purdue.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-michigan-e-indiana-university-of-notre-dame-indiana",
        "name": "University of Notre Dame (Indiana)",
        "cityId": "estados-unidos-michigan-e-indiana",
        "website": "https://www.nd.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-gainesville",
    name: "Gainesville",
    region: "Florida y el Sureste (Miami, Gainesville, Atlanta)",
    coordinates: {"lat": 29.6516, "lng": -82.3248},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-gainesville-university-of-florida-uf-gainesville",
        "name": "University of Florida (UF) (Gainesville)",
        "cityId": "estados-unidos-gainesville",
        "website": "https://www.ufl.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-miami",
    name: "Miami",
    region: "Florida y el Sureste (Miami, Gainesville, Atlanta)",
    coordinates: {"lat": 25.7617, "lng": -80.1918},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-miami-university-of-miami-um-coral-gables-miami",
        "name": "University of Miami (UM) (Coral Gables/Miami)",
        "cityId": "estados-unidos-miami",
        "website": "https://welcome.miami.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-miami-florida-international-university-fiu-miami",
        "name": "Florida International University (FIU) (Miami)",
        "cityId": "estados-unidos-miami",
        "website": "https://www.fiu.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-georgia",
    name: "Georgia",
    region: "Florida y el Sureste (Miami, Gainesville, Atlanta)",
    coordinates: {"lat": 33.749, "lng": -84.388},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-georgia-georgia-institute-of-technology-georgia-tech-atlanta",
        "name": "Georgia Institute of Technology (Georgia Tech) (Atlanta)",
        "cityId": "estados-unidos-georgia",
        "website": "https://www.gatech.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-georgia-emory-university-atlanta",
        "name": "Emory University (Atlanta)",
        "cityId": "estados-unidos-georgia",
        "website": "https://www.emory.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-seattle",
    name: "Seattle",
    region: "Noroeste del Pacífico y Montañas (Seattle, San Francisco)",
    coordinates: {"lat": 47.6062, "lng": -122.3321},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-seattle-university-of-washington-seattle-washington",
        "name": "University of Washington (Seattle, Washington)",
        "cityId": "estados-unidos-seattle",
        "website": "https://www.washington.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-seattle-university-of-colorado-boulder-colorado",
        "name": "University of Colorado Boulder (Colorado)",
        "cityId": "estados-unidos-seattle",
        "website": "https://www.colorado.edu",
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
