// Senegal — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "senegal";
const countryName = "Senegal";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/senegal.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "senegal-dakar",
      name: "Dakar",
      coordinates: {"lat": 14.6937, "lng": -17.44406},
      isCapital: true,
      universityCount: 16,
      statistics: { population: 2646503 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "senegal-saint-louis",
      name: "Saint-Louis",
      coordinates: {"lat": 16.01793, "lng": -16.48962},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 254171 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "senegal-kaolack",
      name: "Kaolack",
      coordinates: {"lat": 14.15197, "lng": -16.07259},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 298904 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "senegal-diamniadio",
      name: "Diamniadio",
      coordinates: {"lat": 14.72051, "lng": -17.1816},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 47759 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "senegal-le-plateau",
      name: "Le Plateau",
      coordinates: {"lat": 14.66222, "lng": -17.43972},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 34713 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Senegal",
  capital: "Dakar",
  currency: "XOF",
  language: "francés",
  continent: "África",
  population: 18931966,
  cities,
  // Las universidades no van aqui: viven en ./universities/senegal.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 10,
  aliases: ["senegal"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
