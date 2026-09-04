// Tonga — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "tonga";
const countryName = "Tonga";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/tonga.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "tonga-nuku-alofa",
      name: "Nuku‘alofa",
      coordinates: {"lat": -21.13683, "lng": -175.20114},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 22400 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Tonga",
  capital: "Nuku'alofa",
  currency: "TOP",
  language: "tongano",
  continent: "Oceanía",
  population: 103742,
  cities,
  // Las universidades no van aqui: viven en ./universities/tonga.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 0,
  aliases: ["tonga"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
