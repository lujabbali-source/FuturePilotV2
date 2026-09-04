// Etiopía — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "etiopia";
const countryName = "Etiopía";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/etiopia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "etiopia-addis-ababa",
      name: "Addis Ababa",
      coordinates: {"lat": 9.02497, "lng": 38.74689},
      isCapital: true,
      universityCount: 11,
      statistics: { population: 3860000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "etiopia-metu",
      name: "Metu",
      coordinates: {"lat": 8.3, "lng": 35.58333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 59700 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Ethiopia",
  capital: "Addis Ababa",
  currency: "ETB",
  language: "amhárico",
  continent: "África",
  population: 135472051,
  cities,
  // Las universidades no van aqui: viven en ./universities/etiopia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 30,
  aliases: ["ethiopia", "etiopia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
