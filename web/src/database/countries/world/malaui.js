// Malaui — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "malaui";
const countryName = "Malaui";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/malaui.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "malaui-zomba",
      name: "Zomba",
      coordinates: {"lat": -15.38596, "lng": 35.3188},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 118440 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malaui-mzuzu",
      name: "Mzuzu",
      coordinates: {"lat": -11.46556, "lng": 34.02071},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 249564 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malaui-lilongwe",
      name: "Lilongwe",
      coordinates: {"lat": -13.96692, "lng": 33.78725},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 1115815 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "malaui-blantyre",
      name: "Blantyre",
      coordinates: {"lat": -15.78499, "lng": 35.00854},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 902588 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Malawi",
  capital: "Lilongwe",
  currency: "MWK",
  language: "chichewa",
  continent: "África",
  population: 22216120,
  cities,
  // Las universidades no van aqui: viven en ./universities/malaui.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 8,
  aliases: ["malaui", "malawi"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
