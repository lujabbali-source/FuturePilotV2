// Armenia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "armenia";
const countryName = "Armenia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/armenia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "armenia-kentron",
      name: "Kentron",
      coordinates: {"lat": 40.17806, "lng": 44.51303},
      isCapital: false,
      universityCount: 16,
      statistics: { population: 133000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "armenia-kanaker-zeytun",
      name: "Kanaker-Zeytun",
      coordinates: {"lat": 40.22, "lng": 44.53833},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 75500 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "armenia-gyumri",
      name: "Gyumri",
      coordinates: {"lat": 40.79305, "lng": 43.84635},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 114667 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Armenia",
  capital: "Yerevan",
  currency: "AMD",
  language: "armenio",
  continent: "Asia",
  population: 3086700,
  cities,
  // Las universidades no van aqui: viven en ./universities/armenia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 12,
  aliases: ["armenia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
