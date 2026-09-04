// Noruega — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "noruega";
const countryName = "Noruega";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/noruega.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "noruega-oslo",
      name: "Oslo",
      coordinates: {"lat": 59.91273, "lng": 10.74609},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 1082575 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "noruega-trondheim",
      name: "Trondheim",
      coordinates: {"lat": 63.43049, "lng": 10.39506},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 216518 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "noruega-troms",
      name: "Tromsø",
      coordinates: {"lat": 69.6489, "lng": 18.95508},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 41915 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "noruega-bod",
      name: "Bodø",
      coordinates: {"lat": 67.28267, "lng": 14.37513},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 34073 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "noruega-bergen",
      name: "Bergen",
      coordinates: {"lat": 60.39299, "lng": 5.32415},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 294029 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Norway",
  capital: "Oslo",
  currency: "NOK",
  language: "noruego",
  continent: "Europa",
  population: 5610870,
  cities,
  // Las universidades no van aqui: viven en ./universities/noruega.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 25,
  aliases: ["noruega", "norway"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
