// Liberia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "liberia";
const countryName = "Liberia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/liberia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "liberia-kakata",
      name: "Kakata",
      coordinates: {"lat": 6.53104, "lng": -10.35368},
      isCapital: false,
      universityCount: 9,
      statistics: { population: 52247 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "liberia-monrovia",
      name: "Monrovia",
      coordinates: {"lat": 6.30054, "lng": -10.7969},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 1542549 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "liberia-saclepea",
      name: "Saclepea",
      coordinates: {"lat": 6.9625, "lng": -8.84056},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 20818 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Liberia",
  capital: "Monrovia",
  currency: "LRD",
  language: "inglés",
  continent: "África",
  population: 5731206,
  cities,
  // Las universidades no van aqui: viven en ./universities/liberia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["liberia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
