// Kuwait — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "kuwait";
const countryName = "Kuwait";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/kuwait.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "kuwait-as-salimiyah",
      name: "As Sālimīyah",
      coordinates: {"lat": 29.33389, "lng": 48.07611},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 147649 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kuwait-ar-riqqah",
      name: "Ar Riqqah",
      coordinates: {"lat": 29.14583, "lng": 48.09472},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 52068 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kuwait-al-mahbulah",
      name: "Al Mahbūlah",
      coordinates: {"lat": 29.145, "lng": 48.13028},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 18178 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kuwait-kuwait-city",
      name: "Kuwait City",
      coordinates: {"lat": 29.367, "lng": 47.97429},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 60064 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kuwait-al-jahra",
      name: "Al Jahrā’",
      coordinates: {"lat": 29.3375, "lng": 47.65806},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 24281 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kuwait-ar-rabiyah",
      name: "Ar Rābiyah",
      coordinates: {"lat": 29.295, "lng": 47.93306},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 36447 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kuwait-sabah-as-salim",
      name: "Şabāḩ as Sālim",
      coordinates: {"lat": 29.25722, "lng": 48.05722},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 139163 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Kuwait",
  capital: "Kuwait City",
  currency: "KWD",
  language: "árabe",
  continent: "Asia",
  population: 4865298,
  cities,
  // Las universidades no van aqui: viven en ./universities/kuwait.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 8,
  aliases: ["kuwait"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
