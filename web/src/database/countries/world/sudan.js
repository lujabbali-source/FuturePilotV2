// Sudán — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "sudan";
const countryName = "Sudán";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/sudan.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "sudan-khartoum",
      name: "Khartoum",
      coordinates: {"lat": 15.55177, "lng": 32.53241},
      isCapital: true,
      universityCount: 14,
      statistics: { population: 1974647 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudan-omdurman",
      name: "Omdurman",
      coordinates: {"lat": 15.64453, "lng": 32.47773},
      isCapital: false,
      universityCount: 8,
      statistics: { population: 1849659 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudan-khartoum-north",
      name: "Khartoum North",
      coordinates: {"lat": 15.64925, "lng": 32.53458},
      isCapital: false,
      universityCount: 8,
      statistics: { population: 1012211 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudan-wad-medani",
      name: "Wad Medani",
      coordinates: {"lat": 14.40118, "lng": 33.51989},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 332714 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudan-port-sudan",
      name: "Port Sudan",
      coordinates: {"lat": 19.61745, "lng": 37.21644},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 489725 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudan-el-obeid",
      name: "El Obeid",
      coordinates: {"lat": 13.18421, "lng": 30.21669},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 393311 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Sudan",
  capital: "Khartoum",
  currency: "SDG",
  language: "árabe",
  continent: "África",
  population: 51662147,
  cities,
  // Las universidades no van aqui: viven en ./universities/sudan.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 35,
  aliases: ["sudan"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
