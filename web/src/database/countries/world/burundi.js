// Burundi — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "burundi";
const countryName = "Burundi";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/burundi.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "burundi-bujumbura",
      name: "Bujumbura",
      coordinates: {"lat": -3.38193, "lng": 29.36142},
      isCapital: false,
      universityCount: 24,
      statistics: { population: 769317 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "burundi-gitega",
      name: "Gitega",
      coordinates: {"lat": -3.42708, "lng": 29.92463},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 64904 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "burundi-ngozi",
      name: "Ngozi",
      coordinates: {"lat": -2.9075, "lng": 29.8306},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 61716 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Burundi",
  capital: "Gitega",
  currency: "BIF",
  language: "francés",
  continent: "África",
  population: 14390003,
  cities,
  // Las universidades no van aqui: viven en ./universities/burundi.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 3,
  aliases: ["burundi"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
