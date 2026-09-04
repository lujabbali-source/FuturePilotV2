// Macedonia del Norte — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "macedonia-del-norte";
const countryName = "Macedonia del Norte";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/macedonia-del-norte.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "macedonia-del-norte-skopje",
      name: "Skopje",
      coordinates: {"lat": 41.99646, "lng": 21.43141},
      isCapital: true,
      universityCount: 8,
      statistics: { population: 474889 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "macedonia-del-norte-shtip",
      name: "Shtip",
      coordinates: {"lat": 41.74583, "lng": 22.19583},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 48279 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "macedonia-del-norte-cair",
      name: "Čair",
      coordinates: {"lat": 42.01528, "lng": 21.44111},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 64773 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "macedonia-del-norte-struga",
      name: "Struga",
      coordinates: {"lat": 41.17787, "lng": 20.67894},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 37387 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "North Macedonia",
  capital: "Skopje",
  currency: "MKD",
  language: "macedonio",
  continent: "Europa",
  population: 1820909,
  cities,
  // Las universidades no van aqui: viven en ./universities/macedonia-del-norte.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 9,
  aliases: ["macedonia-del-norte", "north-macedonia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
