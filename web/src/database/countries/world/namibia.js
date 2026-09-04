// Namibia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "namibia";
const countryName = "Namibia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/namibia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "namibia-windhoek",
      name: "Windhoek",
      coordinates: {"lat": -22.55941, "lng": 17.08323},
      isCapital: true,
      universityCount: 4,
      statistics: { population: 386219 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Namibia",
  capital: "Windhoek",
  currency: "NAD",
  language: "inglés",
  continent: "África",
  population: 3092816,
  cities,
  // Las universidades no van aqui: viven en ./universities/namibia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 5,
  aliases: ["namibia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
