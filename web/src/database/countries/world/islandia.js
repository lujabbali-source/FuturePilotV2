// Islandia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "islandia";
const countryName = "Islandia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/islandia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "islandia-reykjavik",
      name: "Reykjavík",
      coordinates: {"lat": 64.13548, "lng": -21.89541},
      isCapital: true,
      universityCount: 4,
      statistics: { population: 118918 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Iceland",
  capital: "Reykjavik",
  currency: "ISK",
  language: "islandés",
  continent: "Europa",
  population: 392404,
  cities,
  // Las universidades no van aqui: viven en ./universities/islandia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 10,
  aliases: ["iceland", "islandia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
