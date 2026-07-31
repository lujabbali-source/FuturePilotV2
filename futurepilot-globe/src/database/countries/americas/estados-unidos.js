import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "estados-unidos";
const countryName = "Estados Unidos (USA)";

const cities = [
  defineCity({
    id: "estados-unidos-boston",
    name: "Boston",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-boston-massachusetts-boston-cambridge",
        "name": "Massachusetts (Boston & Cambridge)",
        "cityId": "estados-unidos-boston",
        "website": "https://www.harvard.edu",
        "type": null
      }),
      defineUniversity({
        "id": "estados-unidos-boston-harvard-university",
        "name": "Harvard University",
        "cityId": "estados-unidos-boston",
        "website": "https://www.harvard.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-boston-massachusetts-institute-of-technology-mit",
        "name": "Massachusetts Institute of Technology (MIT)",
        "cityId": "estados-unidos-boston",
        "website": "https://www.mit.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-boston-boston-university-bu",
        "name": "Boston University (BU)",
        "cityId": "estados-unidos-boston",
        "website": "https://www.bu.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-boston-northeastern-university",
        "name": "Northeastern University",
        "cityId": "estados-unidos-boston",
        "website": "https://www.northeastern.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-boston-cornell-university-ithaca",
        "name": "Cornell University (Ithaca)",
        "cityId": "estados-unidos-boston",
        "website": "https://www.cornell.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-boston-nueva-jersey-pensilvania-y-connecticut",
        "name": "Nueva Jersey, Pensilvania y Connecticut",
        "cityId": "estados-unidos-boston",
        "website": "https://www.princeton.edu",
        "type": null
      }),
      defineUniversity({
        "id": "estados-unidos-boston-princeton-university-nueva-jersey",
        "name": "Princeton University (Nueva Jersey)",
        "cityId": "estados-unidos-boston",
        "website": "https://www.princeton.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "estados-unidos-boston-yale-university-new-haven-connecticut",
        "name": "Yale University (New Haven, Connecticut)",
        "cityId": "estados-unidos-boston",
        "website": "https://www.yale.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-nueva-york",
    name: "Nueva York",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-nueva-york-nueva-york",
        "name": "Nueva York",
        "cityId": "estados-unidos-nueva-york",
        "website": "https://www.columbia.edu",
        "type": null
      }),
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
    ],
  }),
  defineCity({
    id: "estados-unidos-filadelfia",
    name: "Filadelfia",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-filadelfia-university-of-pennsylvania-upenn-filadelfia-pensilvania",
        "name": "University of Pennsylvania (UPenn) (Filadelfia, Pensilvania)",
        "cityId": "estados-unidos-filadelfia",
        "website": "https://www.upenn.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-silicon-valley",
    name: "Silicon Valley",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-silicon-valley-area-de-la-bahia-silicon-valley",
        "name": "Área de la Bahía / Silicon Valley",
        "cityId": "estados-unidos-silicon-valley",
        "website": "https://www.stanford.edu",
        "type": null
      }),
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
    id: "estados-unidos-los-angeles",
    name: "Los Ángeles",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-los-angeles-area-de-los-angeles-y-sur-de-california",
        "name": "Área de Los Ángeles y Sur de California",
        "cityId": "estados-unidos-los-angeles",
        "website": "https://www.ucla.edu",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-austin",
    name: "Austin",
    coordinates: null,
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
    coordinates: null,
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
    coordinates: null,
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
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-chicago-illinois-chicago",
        "name": "Illinois (Chicago)",
        "cityId": "estados-unidos-chicago",
        "website": "https://www.uchicago.edu",
        "type": null
      }),
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
      defineUniversity({
        "id": "estados-unidos-chicago-michigan-e-indiana",
        "name": "Míchigan e Indiana",
        "cityId": "estados-unidos-chicago",
        "website": "https://umich.edu",
        "type": null
      }),
      defineUniversity({
        "id": "estados-unidos-chicago-university-of-michigan-ann-arbor",
        "name": "University of Michigan (Ann Arbor)",
        "cityId": "estados-unidos-chicago",
        "website": "https://umich.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-chicago-purdue-university-indiana",
        "name": "Purdue University (Indiana)",
        "cityId": "estados-unidos-chicago",
        "website": "https://www.purdue.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-chicago-university-of-notre-dame-indiana",
        "name": "University of Notre Dame (Indiana)",
        "cityId": "estados-unidos-chicago",
        "website": "https://www.nd.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-miami",
    name: "Miami",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-miami-florida",
        "name": "Florida",
        "cityId": "estados-unidos-miami",
        "website": "https://www.ufl.edu",
        "type": null
      }),
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
      defineUniversity({
        "id": "estados-unidos-miami-georgia",
        "name": "Georgia",
        "cityId": "estados-unidos-miami",
        "website": "https://www.gatech.edu",
        "type": null
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-gainesville",
    name: "Gainesville",
    coordinates: null,
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
    id: "estados-unidos-atlanta",
    name: "Atlanta",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "estados-unidos-atlanta-georgia-institute-of-technology-georgia-tech-atlanta",
        "name": "Georgia Institute of Technology (Georgia Tech) (Atlanta)",
        "cityId": "estados-unidos-atlanta",
        "website": "https://www.gatech.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "estados-unidos-atlanta-emory-university-atlanta",
        "name": "Emory University (Atlanta)",
        "cityId": "estados-unidos-atlanta",
        "website": "https://www.emory.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "estados-unidos-seattle",
    name: "Seattle",
    coordinates: null,
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
