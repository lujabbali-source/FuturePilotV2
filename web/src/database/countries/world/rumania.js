// Rumania — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "rumania";
const countryName = "Rumania";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/rumania.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "rumania-bucharest",
      name: "Bucharest",
      coordinates: {"lat": 44.43225, "lng": 26.10626},
      isCapital: true,
      universityCount: 21,
      statistics: { population: 1877155 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-cluj-napoca",
      name: "Cluj-Napoca",
      coordinates: {"lat": 46.76667, "lng": 23.6},
      isCapital: false,
      universityCount: 12,
      statistics: { population: 286598 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-iasi",
      name: "Iaşi",
      coordinates: {"lat": 47.16667, "lng": 27.6},
      isCapital: false,
      universityCount: 9,
      statistics: { population: 378954 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-timisoara",
      name: "Timişoara",
      coordinates: {"lat": 45.75372, "lng": 21.22571},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 250849 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-oradea",
      name: "Oradea",
      coordinates: {"lat": 47.0458, "lng": 21.91833},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 183105 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-sibiu",
      name: "Sibiu",
      coordinates: {"lat": 45.8, "lng": 24.15},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 134309 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-sector-1",
      name: "Sector 1",
      coordinates: {"lat": 44.49239, "lng": 26.04831},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 225453 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-targu-mures",
      name: "Târgu Mureş",
      coordinates: {"lat": 46.54245, "lng": 24.55747},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 212752 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-pitesti",
      name: "Piteşti",
      coordinates: {"lat": 44.85, "lng": 24.86667},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 141275 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-bacau",
      name: "Bacău",
      coordinates: {"lat": 46.56718, "lng": 26.91384},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 136087 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "rumania-sector-2",
      name: "Sector 2",
      coordinates: {"lat": 44.4528, "lng": 26.13321},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 290507 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Romania",
  capital: "Bucharest",
  currency: "RON",
  language: "rumano",
  continent: "Europa",
  population: 19020271,
  cities,
  // Las universidades no van aqui: viven en ./universities/rumania.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 63,
  aliases: ["romania", "rumania"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
