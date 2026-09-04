// Nueva Zelanda — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "nueva-zelanda";
const countryName = "Nueva Zelanda";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/nueva-zelanda.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "nueva-zelanda-auckland",
      name: "Auckland",
      coordinates: {"lat": -36.84853, "lng": 174.76349},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 1547200 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nueva-zelanda-palmerston-north",
      name: "Palmerston North",
      coordinates: {"lat": -40.35636, "lng": 175.61113},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 90500 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nueva-zelanda-christchurch",
      name: "Christchurch",
      coordinates: {"lat": -43.53333, "lng": 172.63333},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 419200 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nueva-zelanda-rolleston",
      name: "Rolleston",
      coordinates: {"lat": -43.58333, "lng": 172.38333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 34100 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nueva-zelanda-lower-hutt",
      name: "Lower Hutt",
      coordinates: {"lat": -41.21667, "lng": 174.91667},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 114200 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nueva-zelanda-dunedin",
      name: "Dunedin",
      coordinates: {"lat": -45.87416, "lng": 170.50361},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 132800 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nueva-zelanda-avondale",
      name: "Avondale",
      coordinates: {"lat": -36.88333, "lng": 174.7},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 26450 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "New Zealand",
  capital: "Wellington",
  currency: "NZD",
  language: "inglés",
  continent: "Oceanía",
  population: 5324700,
  cities,
  // Las universidades no van aqui: viven en ./universities/nueva-zelanda.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 12,
  aliases: ["new-zealand", "nueva-zelanda"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
