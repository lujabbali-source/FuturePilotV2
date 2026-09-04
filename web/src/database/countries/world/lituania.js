// Lituania — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "lituania";
const countryName = "Lituania";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/lituania.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "lituania-kaunas",
      name: "Kaunas",
      coordinates: {"lat": 54.90156, "lng": 23.90909},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 289380 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "lituania-antakalnis",
      name: "Antakalnis",
      coordinates: {"lat": 54.70781, "lng": 25.31706},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 40000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "lituania-klaipeda",
      name: "Klaipėda",
      coordinates: {"lat": 55.7068, "lng": 21.13912},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 172292 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "lituania-vilnius",
      name: "Vilnius",
      coordinates: {"lat": 54.68916, "lng": 25.2798},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 542366 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "lituania-fabijoniskes",
      name: "Fabijoniškės",
      coordinates: {"lat": 54.73333, "lng": 25.24167},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 37000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "lituania-telsiai",
      name: "Telsiai",
      coordinates: {"lat": 55.98139, "lng": 22.24722},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 21294 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Lithuania",
  capital: "Vilnius",
  currency: "EUR",
  language: "lituano",
  continent: "Europa",
  population: 2888774,
  cities,
  // Las universidades no van aqui: viven en ./universities/lituania.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 17,
  aliases: ["lithuania", "lituania"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
