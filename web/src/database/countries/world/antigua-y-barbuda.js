// Antigua y Barbuda — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "antigua-y-barbuda";
const countryName = "Antigua y Barbuda";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/antigua-y-barbuda.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "antigua-y-barbuda-saint-john-s",
      name: "Saint John’s",
      coordinates: {"lat": 17.12096, "lng": -61.84329},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 51737 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Antigua and Barbuda",
  capital: "St. John's",
  currency: "XCD",
  language: "inglés",
  continent: "América",
  population: 94209,
  cities,
  // Las universidades no van aqui: viven en ./universities/antigua-y-barbuda.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 2,
  aliases: ["antigua-and-barbuda", "antigua-y-barbuda"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
