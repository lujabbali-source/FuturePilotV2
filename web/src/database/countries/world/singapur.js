// Singapur — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "singapur";
const countryName = "Singapur";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/singapur.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "singapur-singapore",
      name: "Singapore",
      coordinates: {"lat": 1.28967, "lng": 103.85007},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 5638700 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "singapur-boon-lay",
      name: "Boon Lay",
      coordinates: {"lat": 1.311, "lng": 103.694},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 29510 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "singapur-queenstown-estate",
      name: "Queenstown Estate",
      coordinates: {"lat": 1.29417, "lng": 103.8025},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 101480 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "singapur-clementi-housing-estate",
      name: "Clementi Housing Estate",
      coordinates: {"lat": 1.31583, "lng": 103.76472},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 92420 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "singapur-anak-bukit",
      name: "Anak Bukit",
      coordinates: {"lat": 1.34067, "lng": 103.77301},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 22960 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "singapur-simei-new-town",
      name: "Simei New Town",
      coordinates: {"lat": 1.34111, "lng": 103.95611},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 39450 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "singapur-novena",
      name: "Novena",
      coordinates: {"lat": 1.31697, "lng": 103.8438},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 53160 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Singapore",
  capital: "Singapore",
  currency: "SGD",
  language: "cmn",
  continent: "Asia",
  population: 6111175,
  cities,
  // Las universidades no van aqui: viven en ./universities/singapur.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 18,
  aliases: ["singapore", "singapur"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
