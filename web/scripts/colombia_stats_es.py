# -*- coding: utf-8 -*-
"""Industrias y estadisticas de ciudad, en castellano.

Dos cosas que se quedaron en ingles y salian tal cual en la pantalla:

  - `mainIndustries`, en las 18 ciudades. Es lo que se lee en la pestaña de
    empleo, y decia "Technology & Innovation" o "Coffee Production & Export".
  - El clima, la seguridad y la calidad de vida de las ciudades que el
    documento trae en formato condensado.

Los nombres propios se quedan: "BPO" es como se llama el sector en Colombia,
"Vallenato" y "Salsa" no se traducen, y la Sierra Nevada de Santa Marta ya
estaba en castellano dentro del texto ingles.
"""

# Las 57 industrias distintas del documento. Ordenadas alfabeticamente por su
# original para que añadir una nueva sea evidente.
INDUSTRIAS_ES = {
    "Agribusiness": "Agroindustria",
    "Agriculture": "Agricultura",
    "Agro-industry": "Agroindustria",
    "Amazon River Logistics": "Logística fluvial del Amazonas",
    "Artisanal Fishing": "Pesca artesanal",
    "BPO": "BPO",
    "Banana & Palm Agribusiness": "Agroindustria de banano y palma",
    "Border Trade with Venezuela": "Comercio fronterizo con Venezuela",
    "Call Centers/BPO": "Call centers y BPO",
    "Cattle Livestock": "Ganadería",
    "Cattle Ranching": "Ganadería extensiva",
    "Clay & Ceramic Manufacturing": "Arcilla y cerámica",
    "Coal Mining Logistics": "Logística del carbón",
    "Coffee Logistics": "Logística cafetera",
    "Coffee Production & Export": "Producción y exportación de café",
    "Commerce": "Comercio",
    "Commercial Trade": "Comercio",
    "Construction": "Construcción",
    "Cotton & Agribusiness": "Algodón y agroindustria",
    "Dairy Production": "Producción lechera",
    "Ecotourism": "Ecoturismo",
    "Energy": "Energía",
    "Finance": "Finanzas",
    "Financial Services": "Servicios financieros",
    "Food & Beverage Processing": "Procesamiento de alimentos y bebidas",
    "Footwear & Apparel Manufacturing": "Calzado y confección",
    "Forestry": "Silvicultura",
    "Garment Manufacturing": "Confección",
    "Gold & Platinum Mining trade": "Comercio de oro y platino",
    "Handicrafts": "Artesanías",
    "Health Tourism": "Turismo de salud",
    "Healthcare Services": "Servicios de salud",
    "Higher Education": "Educación superior",
    "Indigenous Crafts": "Artesanía indígena",
    "Industrial Manufacturing": "Manufactura industrial",
    "International Tourism": "Turismo internacional",
    "Livestock & Beef Exports": "Ganadería y exportación de carne",
    "Logistics & Maritime Freight": "Logística y carga marítima",
    "Metalworking": "Metalmecánica",
    "Mining": "Minería",
    "Oil & Gas engineering": "Ingeniería de petróleo y gas",
    "Petrochemicals": "Petroquímica",
    "Pharmaceuticals": "Farmacéutica",
    "Port Operations": "Operación portuaria",
    "Public Sector": "Sector público",
    "River Commerce": "Comercio fluvial",
    "River Transportation along Atrato River": "Transporte fluvial por el río Atrato",
    "Salsa Tourism": "Turismo de salsa",
    "Services": "Servicios",
    "Sugar Cane & Agro-industry": "Caña de azúcar y agroindustria",
    "Technology": "Tecnología",
    "Technology & Innovation": "Tecnología e innovación",
    "Textiles": "Textiles",
    "Textiles & Fashion": "Textiles y moda",
    "Tourism & Hospitality": "Turismo y hotelería",
    "Tourism & Leisure": "Turismo y ocio",
    "Vallenato Culture": "Cultura vallenata",
}

# Clima, seguridad y calidad de vida de las ciudades que el documento trae en
# formato condensado y que en la app estaban vacias. Los valores son cortos a
# proposito: el panel los muestra en una rejilla, no en parrafos.
ESTADISTICAS_ES = {
    "valledupar": {
        "weather": "~29 °C, tropical cálido al pie de la Sierra Nevada",
        "qualityOfLife": "Media",
    },
    "quibdo": {
        "weather": "~27 °C, selva tropical (de las ciudades más lluviosas del mundo)",
        "qualityOfLife": "Media",
    },
    "leticia": {
        "weather": "~26 °C, selva ecuatorial en la triple frontera",
        "qualityOfLife": "Media",
    },
    "pasto": {"weather": "~13 °C, clima frío de montaña al pie del Galeras"},
    "neiva": {"weather": "28 °C a 32 °C, tropical cálido junto al Magdalena"},
    "villavicencio": {"weather": "~26 °C, tropical cálido, puerta del Llano"},
    "santa-marta": {"weather": "~28 °C, costero cálido"},
    "monteria": {"weather": "Tropical cálido junto al río Sinú"},
    "popayan": {"weather": "~18 °C, templado de altiplano"},
    "cucuta": {"weather": "~28 °C, semiárido cálido"},
    "cali": {
        "weather": "~25 °C, sabana tropical con brisas del Pacífico por la tarde",
        "qualityOfLife": "Media",
        "safety": "Baja (28,4/100)",
    },
    "pereira": {
        "weather": "~21 °C, templado de montaña",
        "qualityOfLife": "Alta",
        "safety": "Moderada (46,8/100)",
    },
    "manizales": {
        "weather": "~16 °C, subtropical de montaña, tardes frescas y con niebla",
        "qualityOfLife": "Muy alta",
        "safety": "Alta para Colombia (62,4/100)",
    },
}
