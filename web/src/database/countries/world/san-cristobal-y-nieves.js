// San Cristóbal y Nieves — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "san-cristobal-y-nieves";
const countryName = "San Cristóbal y Nieves";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/san-cristobal-y-nieves.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "san-cristobal-y-nieves-basseterre",
      name: "Basseterre",
      coordinates: {"lat": 17.2955, "lng": -62.72499},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 12920 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Saint Kitts and Nevis",
  capital: "Basseterre",
  currency: "XCD",
  language: "inglés",
  continent: "América",
  population: 46922,
  cities,
  // Las universidades no van aqui: viven en ./universities/san-cristobal-y-nieves.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 4,
  aliases: ["saint-kitts-and-nevis", "san-cristobal-y-nieves"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
