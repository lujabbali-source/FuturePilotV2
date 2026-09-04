// Santa Lucía — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "santa-lucia";
const countryName = "Santa Lucía";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/santa-lucia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "santa-lucia-gros-islet",
      name: "Gros Islet",
      coordinates: {"lat": 14.06667, "lng": -60.95},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 25210 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "santa-lucia-castries",
      name: "Castries",
      coordinates: {"lat": 13.9957, "lng": -61.00614},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 20000 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Saint Lucia",
  capital: "Castries",
  currency: "XCD",
  language: "inglés",
  continent: "América",
  population: 180149,
  cities,
  // Las universidades no van aqui: viven en ./universities/santa-lucia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["saint-lucia", "santa-lucia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
