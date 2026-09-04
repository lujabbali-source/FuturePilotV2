// Eslovaquia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "eslovaquia";
const countryName = "Eslovaquia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/eslovaquia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "eslovaquia-kosice",
      name: "Košice",
      coordinates: {"lat": 48.71441, "lng": 21.25802},
      isCapital: false,
      universityCount: 10,
      statistics: { population: 225044 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "eslovaquia-bratislava",
      name: "Bratislava",
      coordinates: {"lat": 48.14816, "lng": 17.10674},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 423737 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "eslovaquia-trnava",
      name: "Trnava",
      coordinates: {"lat": 48.37773, "lng": 17.58603},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 62806 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "eslovaquia-trencin",
      name: "Trenčín",
      coordinates: {"lat": 48.89452, "lng": 18.04436},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 58278 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "eslovaquia-nitra",
      name: "Nitra",
      coordinates: {"lat": 48.30763, "lng": 18.08453},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 86329 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Slovakia",
  capital: "Bratislava",
  currency: "EUR",
  language: "eslovaco",
  continent: "Europa",
  population: 5413813,
  cities,
  // Las universidades no van aqui: viven en ./universities/eslovaquia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 31,
  aliases: ["eslovaquia", "slovakia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
