// San Vicente y las Granadinas — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "san-vicente-y-las-granadinas";
const countryName = "San Vicente y las Granadinas";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/san-vicente-y-las-granadinas.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "san-vicente-y-las-granadinas-calliaqua",
      name: "Calliaqua",
      coordinates: {"lat": 13.12867, "lng": -61.19178},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 24205 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Saint Vincent and the Grenadines",
  capital: "Kingstown",
  currency: "XCD",
  language: "inglés",
  continent: "América",
  population: 99924,
  cities,
  // Las universidades no van aqui: viven en ./universities/san-vicente-y-las-granadinas.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["saint-vincent-and-the-grenadines", "san-vicente-y-las-granadinas"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
