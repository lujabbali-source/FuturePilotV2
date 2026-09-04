// Macao — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "macao";
const countryName = "Macao";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/macao.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "macao-taipa",
      name: "Taipa",
      coordinates: {"lat": 22.15583, "lng": 113.55694},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 112051 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "macao-lai-chi-van",
      name: "Lai Chi Van",
      coordinates: {"lat": 22.11972, "lng": 113.55111},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 22125 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "macao-zhuojiacun",
      name: "Zhuojiacun",
      coordinates: {"lat": 22.16139, "lng": 113.55639},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 24000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "macao-se",
      name: "Sé",
      coordinates: {"lat": 22.19089, "lng": 113.54733},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 52200 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Macao",
  capital: "Macao",
  currency: "MOP",
  language: "chino",
  continent: "Asia",
  population: 685900,
  cities,
  // Las universidades no van aqui: viven en ./universities/macao.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 4,
  aliases: ["macao"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
