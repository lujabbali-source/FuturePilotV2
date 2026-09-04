// Emiratos Árabes Unidos — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "emiratos-arabes-unidos";
const countryName = "Emiratos Árabes Unidos";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/emiratos-arabes-unidos.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "emiratos-arabes-unidos-dubai-silicon-oasis",
      name: "Dubai Silicon Oasis",
      coordinates: {"lat": 25.11985, "lng": 55.38718},
      isCapital: false,
      universityCount: 11,
      statistics: { population: 90000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-abu-dhabi",
      name: "Abu Dhabi",
      coordinates: {"lat": 24.45118, "lng": 54.39696},
      isCapital: true,
      universityCount: 8,
      statistics: { population: 1807000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-dubai-internet-city",
      name: "Dubai Internet City",
      coordinates: {"lat": 25.09538, "lng": 55.16171},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 24000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-nayf",
      name: "Nāyf",
      coordinates: {"lat": 25.27139, "lng": 55.30323},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 53075 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-al-ain-city",
      name: "Al Ain City",
      coordinates: {"lat": 24.19167, "lng": 55.76056},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 846747 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-al-mizhar-first",
      name: "Al Mizhar First",
      coordinates: {"lat": 25.24805, "lng": 55.44128},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 17498 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-halwan",
      name: "Halwan",
      coordinates: {"lat": 25.34586, "lng": 55.42165},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 19389 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-sharjah",
      name: "Sharjah",
      coordinates: {"lat": 25.3342, "lng": 55.41221},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1800000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-al-karama",
      name: "Al Karama",
      coordinates: {"lat": 25.24004, "lng": 55.30106},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 75560 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-khalifah-a-city",
      name: "Khalifah A City",
      coordinates: {"lat": 24.42588, "lng": 54.605},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 85374 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "emiratos-arabes-unidos-dubai-marina",
      name: "Dubai Marina",
      coordinates: {"lat": 25.08525, "lng": 55.14646},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 120000 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "United Arab Emirates",
  capital: "Abu Dhabi",
  currency: "AED",
  language: "árabe",
  continent: "Asia",
  population: 11513149,
  cities,
  // Las universidades no van aqui: viven en ./universities/emiratos-arabes-unidos.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 37,
  aliases: ["emiratos-arabes-unidos", "united-arab-emirates"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
