// Moldavia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "moldavia";
const countryName = "Moldavia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/moldavia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "moldavia-chisinau",
      name: "Chisinau",
      coordinates: {"lat": 47.00902, "lng": 28.85938},
      isCapital: true,
      universityCount: 9,
      statistics: { population: 635994 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "moldavia-tiraspol",
      name: "Tiraspol",
      coordinates: {"lat": 46.84275, "lng": 29.6284},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 157000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "moldavia-balti",
      name: "Bălţi",
      coordinates: {"lat": 47.76291, "lng": 27.92854},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 125000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "moldavia-durlesti",
      name: "Durleşti",
      coordinates: {"lat": 47.02156, "lng": 28.76303},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 26308 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Moldova",
  capital: "Chisinau",
  currency: "MDL",
  language: "rumano",
  continent: "Europa",
  population: 2360527,
  cities,
  // Las universidades no van aqui: viven en ./universities/moldavia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 12,
  aliases: ["moldavia", "moldova"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
