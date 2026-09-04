// Mauricio — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "mauricio";
const countryName = "Mauricio";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/mauricio.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "mauricio-beau-bassin-rose-hill",
      name: "Beau Bassin-Rose Hill",
      coordinates: {"lat": -20.23325, "lng": 57.46609},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 111355 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Mauritius",
  capital: "Port Louis",
  currency: "MUR",
  language: "inglés",
  continent: "África",
  population: 1243741,
  cities,
  // Las universidades no van aqui: viven en ./universities/mauricio.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 2,
  aliases: ["mauricio", "mauritius"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
