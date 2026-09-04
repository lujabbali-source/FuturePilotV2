// Fiyi — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "fiyi";
const countryName = "Fiyi";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/fiyi.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "fiyi-suva",
      name: "Suva",
      coordinates: {"lat": -18.13683, "lng": 178.42531},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 77366 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Fiji",
  capital: "Suva",
  currency: "FJD",
  language: "inglés",
  continent: "Oceanía",
  population: 933154,
  cities,
  // Las universidades no van aqui: viven en ./universities/fiyi.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 4,
  aliases: ["fiji", "fiyi"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
