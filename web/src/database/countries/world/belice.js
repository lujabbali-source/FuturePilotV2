// Belice — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "belice";
const countryName = "Belice";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/belice.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "belice-orange-walk",
      name: "Orange Walk",
      coordinates: {"lat": 18.08124, "lng": -88.56328},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 15298 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belice-belmopan",
      name: "Belmopan",
      coordinates: {"lat": 17.25376, "lng": -88.76401},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 13381 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belice-belize-city",
      name: "Belize City",
      coordinates: {"lat": 17.49952, "lng": -88.19756},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 65222 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Belize",
  capital: "Belmopan",
  currency: "BZD",
  language: "inglés",
  continent: "América",
  population: 422924,
  cities,
  // Las universidades no van aqui: viven en ./universities/belice.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 5,
  aliases: ["belice", "belize"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
