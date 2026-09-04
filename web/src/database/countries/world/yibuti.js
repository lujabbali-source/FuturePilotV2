// Yibuti — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "yibuti";
const countryName = "Yibuti";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/yibuti.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "yibuti-djibouti",
      name: "Djibouti",
      coordinates: {"lat": 11.58901, "lng": 43.14503},
      isCapital: true,
      universityCount: 20,
      statistics: { population: 626512 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Djibouti",
  capital: "Djibouti",
  currency: "DJF",
  language: "francés",
  continent: "África",
  population: 1184076,
  cities,
  // Las universidades no van aqui: viven en ./universities/yibuti.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["djibouti", "yibuti"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
