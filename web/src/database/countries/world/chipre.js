// Chipre — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "chipre";
const countryName = "Chipre";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/chipre.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "chipre-strovolos",
      name: "Stróvolos",
      coordinates: {"lat": 35.14867, "lng": 33.33384},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 67904 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "chipre-nicosia",
      name: "Nicosia",
      coordinates: {"lat": 35.17284, "lng": 33.35397},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 200452 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "chipre-limassol",
      name: "Limassol",
      coordinates: {"lat": 34.68406, "lng": 33.03794},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 154000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "chipre-aglantzia",
      name: "Aglantziá",
      coordinates: {"lat": 35.15422, "lng": 33.39643},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 21543 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Cyprus",
  capital: "Nicosia",
  currency: "EUR",
  language: "griego",
  continent: "Europa",
  population: 1370754,
  cities,
  // Las universidades no van aqui: viven en ./universities/chipre.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 17,
  aliases: ["chipre", "cyprus"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
