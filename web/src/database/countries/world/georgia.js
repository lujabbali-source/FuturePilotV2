// Georgia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "georgia";
const countryName = "Georgia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/georgia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "georgia-tbilisi",
      name: "Tbilisi",
      coordinates: {"lat": 41.69143, "lng": 44.83412},
      isCapital: true,
      universityCount: 28,
      statistics: { population: 1049498 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "georgia-kutaisi",
      name: "Kutaisi",
      coordinates: {"lat": 42.26791, "lng": 42.69459},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 135201 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "georgia-batumi",
      name: "Batumi",
      coordinates: {"lat": 41.64077, "lng": 41.6306},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 186949 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "georgia-gori",
      name: "Gori",
      coordinates: {"lat": 41.98532, "lng": 44.1129},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 41933 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Georgia",
  capital: "Tbilisi",
  currency: "GEL",
  language: "georgiano",
  continent: "Asia",
  population: 3935766,
  cities,
  // Las universidades no van aqui: viven en ./universities/georgia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 15,
  aliases: ["georgia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
