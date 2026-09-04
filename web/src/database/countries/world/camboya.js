// Camboya — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "camboya";
const countryName = "Camboya";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/camboya.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "camboya-phnom-penh",
      name: "Phnom Penh",
      coordinates: {"lat": 11.56245, "lng": 104.91601},
      isCapital: true,
      universityCount: 15,
      statistics: { population: 1573544 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "camboya-boeng-kak-pir",
      name: "Boeng Kak Pir",
      coordinates: {"lat": 11.57269, "lng": 104.89022},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 24937 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "camboya-siem-reap",
      name: "Siem Reap",
      coordinates: {"lat": 13.36179, "lng": 103.86056},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 139458 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Cambodia",
  capital: "Phnom Penh",
  currency: "KHR",
  language: "camboyano",
  continent: "Asia",
  population: 17847982,
  cities,
  // Las universidades no van aqui: viven en ./universities/camboya.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 21,
  aliases: ["cambodia", "camboya"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
