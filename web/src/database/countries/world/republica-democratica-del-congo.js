// República Democrática del Congo — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "republica-democratica-del-congo";
const countryName = "República Democrática del Congo";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/republica-democratica-del-congo.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "republica-democratica-del-congo-kinshasa",
      name: "Kinshasa",
      coordinates: {"lat": -4.32758, "lng": 15.31357},
      isCapital: true,
      universityCount: 22,
      statistics: { population: 16000000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-butembo",
      name: "Butembo",
      coordinates: {"lat": 0.14164, "lng": 29.29117},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 286242 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-beni",
      name: "Beni",
      coordinates: {"lat": 0.49113, "lng": 29.47306},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 140731 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-bukavu",
      name: "Bukavu",
      coordinates: {"lat": -2.49077, "lng": 28.84281},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 816811 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-kisangani",
      name: "Kisangani",
      coordinates: {"lat": 0.51528, "lng": 25.19099},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 1181788 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-kindu",
      name: "Kindu",
      coordinates: {"lat": -2.94373, "lng": 25.92237},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 234651 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-kananga",
      name: "Kananga",
      coordinates: {"lat": -5.89624, "lng": 22.41659},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 1247168 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-goma",
      name: "Goma",
      coordinates: {"lat": -1.67409, "lng": 29.22845},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 432587 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-lubumbashi",
      name: "Lubumbashi",
      coordinates: {"lat": -11.66089, "lng": 27.47938},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 2221925 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-mbuji-mayi",
      name: "Mbuji-Mayi",
      coordinates: {"lat": -6.13603, "lng": 23.58979},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 2101332 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-lodja",
      name: "Lodja",
      coordinates: {"lat": -3.52105, "lng": 23.6005},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 91409 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-kabinda",
      name: "Kabinda",
      coordinates: {"lat": -6.13791, "lng": 24.48179},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 219396 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-bunia",
      name: "Bunia",
      coordinates: {"lat": 1.55941, "lng": 30.25224},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 399282 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-kolwezi",
      name: "Kolwezi",
      coordinates: {"lat": -10.71484, "lng": 25.46674},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 790248 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-democratica-del-congo-masina",
      name: "Masina",
      coordinates: {"lat": -4.38361, "lng": 15.39139},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 485167 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Democratic Republic of the Congo",
  capital: "Kinshasa",
  currency: "CDF",
  language: "francés",
  continent: "África",
  population: 112832473,
  cities,
  // Las universidades no van aqui: viven en ./universities/republica-democratica-del-congo.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 10,
  aliases: ["democratic-republic-of-the-congo", "republica-democratica-del-congo"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
