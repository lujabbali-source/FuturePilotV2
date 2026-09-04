// Sierra Leona — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "sierra-leona";
const countryName = "Sierra Leona";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/sierra-leona.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "sierra-leona-freetown",
      name: "Freetown",
      coordinates: {"lat": 8.48714, "lng": -13.2356},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 802639 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sierra-leona-makeni",
      name: "Makeni",
      coordinates: {"lat": 8.88605, "lng": -12.04417},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 85116 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sierra-leona-bo",
      name: "Bo",
      coordinates: {"lat": 7.96472, "lng": -11.73833},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 233684 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Sierra Leone",
  capital: "Freetown",
  currency: "SLE",
  language: "inglés",
  continent: "África",
  population: 8819794,
  cities,
  // Las universidades no van aqui: viven en ./universities/sierra-leona.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 4,
  aliases: ["sierra-leona", "sierra-leone"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
