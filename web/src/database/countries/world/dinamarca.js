// Dinamarca — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "dinamarca";
const countryName = "Dinamarca";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/dinamarca.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "dinamarca-indre-by",
      name: "Indre By",
      coordinates: {"lat": 55.67772, "lng": 12.57302},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 26223 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-esbjerg",
      name: "Esbjerg",
      coordinates: {"lat": 55.47028, "lng": 8.45187},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 71698 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-odense",
      name: "Odense",
      coordinates: {"lat": 55.39594, "lng": 10.38831},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 180863 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-copenhagen",
      name: "Copenhagen",
      coordinates: {"lat": 55.67594, "lng": 12.56553},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 1153615 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-charlottenlund",
      name: "Charlottenlund",
      coordinates: {"lat": 55.75238, "lng": 12.5745},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 40000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-aalborg",
      name: "Aalborg",
      coordinates: {"lat": 57.048, "lng": 9.9187},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 142937 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-valby",
      name: "Valby",
      coordinates: {"lat": 55.66613, "lng": 12.51388},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 46161 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-slagelse",
      name: "Slagelse",
      coordinates: {"lat": 55.40276, "lng": 11.35459},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 31896 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-kolding",
      name: "Kolding",
      coordinates: {"lat": 55.4904, "lng": 9.47216},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 61638 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "dinamarca-arhus",
      name: "Århus",
      coordinates: {"lat": 56.15674, "lng": 10.21076},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 285273 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Denmark",
  capital: "Copenhagen",
  currency: "DKK",
  language: "danés",
  continent: "Europa",
  population: 6009169,
  cities,
  // Las universidades no van aqui: viven en ./universities/dinamarca.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 34,
  aliases: ["denmark", "dinamarca"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
