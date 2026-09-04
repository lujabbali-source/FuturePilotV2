// Malasia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "malasia";
const countryName = "Malasia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/malasia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "malasia-bandar-sunway",
      name: "Bandar Sunway",
      coordinates: {"lat": 3.0693, "lng": 101.6074},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 200000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-kuala-lumpur",
      name: "Kuala Lumpur",
      coordinates: {"lat": 3.1412, "lng": 101.68653},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 1453975 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-tanjong-malim",
      name: "Tanjong Malim",
      coordinates: {"lat": 3.681, "lng": 101.5198},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 66103 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-gelang-patah",
      name: "Gelang Patah",
      coordinates: {"lat": 1.4484, "lng": 103.5873},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 64375 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-shah-alam",
      name: "Shah Alam",
      coordinates: {"lat": 3.08507, "lng": 101.53281},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 740750 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-kota-kinabalu",
      name: "Kota Kinabalu",
      coordinates: {"lat": 5.9749, "lng": 116.0724},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 500421 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-george-town",
      name: "George Town",
      coordinates: {"lat": 5.41123, "lng": 100.33543},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 158336 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-taman-melati",
      name: "Taman Melati",
      coordinates: {"lat": 3.22124, "lng": 101.72324},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 50000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-bandar-baru-salak-tinggi",
      name: "Bandar Baru Salak Tinggi",
      coordinates: {"lat": 2.81232, "lng": 101.73562},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 21534 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-bukit-jalil",
      name: "Bukit Jalil",
      coordinates: {"lat": 3.04913, "lng": 101.68036},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 200000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-durian-tunggal",
      name: "Durian Tunggal",
      coordinates: {"lat": 2.3125, "lng": 102.2805},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 42185 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-bangi",
      name: "Bangi",
      coordinates: {"lat": 2.9, "lng": 101.78333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 45042 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-kota-bharu",
      name: "Kota Bharu",
      coordinates: {"lat": 6.12361, "lng": 102.24333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 568900 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-kampung-baharu-nilai",
      name: "Kampung Baharu Nilai",
      coordinates: {"lat": 2.8033, "lng": 101.7972},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 38612 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-cyberjaya",
      name: "Cyberjaya",
      coordinates: {"lat": 2.92281, "lng": 101.65718},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 79200 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-bukit-bintang",
      name: "Bukit Bintang",
      coordinates: {"lat": 3.14657, "lng": 101.71023},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 120529 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-bangsar",
      name: "Bangsar",
      coordinates: {"lat": 3.12945, "lng": 101.67004},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 40000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malasia-seminyih",
      name: "Seminyih",
      coordinates: {"lat": 2.94761, "lng": 101.84695},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 19724 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Malaysia",
  capital: "Kuala Lumpur",
  currency: "MYR",
  language: "malayo",
  continent: "Asia",
  population: 35977838,
  cities,
  // Las universidades no van aqui: viven en ./universities/malasia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 152,
  aliases: ["malasia", "malaysia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
