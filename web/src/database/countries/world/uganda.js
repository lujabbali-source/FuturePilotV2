// Uganda — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "uganda";
const countryName = "Uganda";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/uganda.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "uganda-kampala",
      name: "Kampala",
      coordinates: {"lat": 0.31628, "lng": 32.58219},
      isCapital: true,
      universityCount: 22,
      statistics: { population: 1680600 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-masaka",
      name: "Masaka",
      coordinates: {"lat": -0.33379, "lng": 31.73409},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 116600 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-lira",
      name: "Lira",
      coordinates: {"lat": 2.2499, "lng": 32.89985},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 119323 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-gulu",
      name: "Gulu",
      coordinates: {"lat": 2.77457, "lng": 32.29899},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 177400 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-ishaka",
      name: "Ishaka",
      coordinates: {"lat": -0.54306, "lng": 30.13694},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 43700 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-mbarara",
      name: "Mbarara",
      coordinates: {"lat": -0.60467, "lng": 30.64851},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 221300 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-mbale",
      name: "Mbale",
      coordinates: {"lat": 1.08209, "lng": 34.17503},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 111300 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-lugazi",
      name: "Lugazi",
      coordinates: {"lat": 0.36788, "lng": 32.9376},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 128400 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-kireka",
      name: "Kireka",
      coordinates: {"lat": 0.3475, "lng": 32.64917},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 17947 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-fort-portal",
      name: "Fort Portal",
      coordinates: {"lat": 0.66174, "lng": 30.2748},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 60800 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-bombo",
      name: "Bombo",
      coordinates: {"lat": 0.57387, "lng": 32.51545},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 29600 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-arua",
      name: "Arua",
      coordinates: {"lat": 3.02013, "lng": 30.91105},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 72400 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uganda-kyaka-ii-refugee-camp",
      name: "Kyaka II Refugee Camp",
      coordinates: {"lat": 0.36738, "lng": 31.10817},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 27300 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Uganda",
  capital: "Kampala",
  currency: "UGX",
  language: "inglés",
  continent: "África",
  population: 51384894,
  cities,
  // Las universidades no van aqui: viven en ./universities/uganda.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 18,
  aliases: ["uganda"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
