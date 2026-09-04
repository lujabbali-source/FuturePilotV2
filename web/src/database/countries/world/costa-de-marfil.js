// Costa de Marfil — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "costa-de-marfil";
const countryName = "Costa de Marfil";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/costa-de-marfil.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "costa-de-marfil-san-pedro",
      name: "San-Pédro",
      coordinates: {"lat": 4.74851, "lng": -6.6363},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 390654 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "costa-de-marfil-abobo",
      name: "Abobo",
      coordinates: {"lat": 5.41613, "lng": -4.0159},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1340083 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "costa-de-marfil-marcory",
      name: "Marcory",
      coordinates: {"lat": 5.31198, "lng": -3.99363},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 214061 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Ivory Coast",
  capital: "Yamoussoukro",
  currency: "XOF",
  language: "francés",
  continent: "África",
  population: 32711547,
  cities,
  // Las universidades no van aqui: viven en ./universities/costa-de-marfil.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 4,
  aliases: ["costa-de-marfil", "ivory-coast"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
