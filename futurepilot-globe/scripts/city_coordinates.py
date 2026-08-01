"""
Coordenadas geograficas publicas para las "ciudades" (en varios casos, en
realidad estados/provincias/departamentos usados como agrupador en el
documento) que aparecen como encabezado en "America universidades.docx".

Estas coordenadas NO vienen del documento del usuario (que no trae lat/lng)
- se agregan aqui a mano, a partir de conocimiento geografico publico, para
que el sistema de estrellas del globo (CityMarkers.jsx) pueda ubicarlas.
Cuando el "city_id" del parser corresponde a un estado/provincia/region en
vez de una ciudad puntual, se usa la capital o ciudad principal de esa
region como referencia.

Las claves son exactamente los `city_id` que genera
`import_americas_docx.py` (prefijo del pais + slug del nombre de ciudad).
Cualquier ciudad que NO aparezca aqui queda sin coordenadas
(`dataStatus: "source-word-needs-coordinates"`, ya soportado por
`countries/schema.js`) en vez de inventar una ubicacion aproximada.

isCapital marca la ciudad que aloja la capital nacional del pais.
"""

CITY_COORDINATES: dict[str, tuple[float, float, bool]] = {
    # (lat, lng, isCapital)

    # Brasil
    "brasil-sao-paulo": (-23.5505, -46.6333, False),
    "brasil-campinas": (-22.9099, -47.0626, False),
    "brasil-sao-jose-dos-campos": (-23.2237, -45.9009, False),
    "brasil-rio-de-janeiro": (-22.9068, -43.1729, False),
    "brasil-niteroi": (-22.8833, -43.1036, False),
    "brasil-brasilia": (-15.7939, -47.8828, True),
    "brasil-goias": (-16.6869, -49.2648, False),
    "brasil-mato-grosso-do-sul": (-20.4697, -54.6201, False),
    "brasil-mato-grosso": (-15.6014, -56.0979, False),
    "brasil-belo-horizonte": (-19.9167, -43.9345, False),
    "brasil-vicosa": (-20.7546, -42.8825, False),
    "brasil-juiz-de-fora": (-21.7642, -43.3467, False),
    "brasil-uberlandia": (-18.9186, -48.2772, False),
    "brasil-rio-grande-do-sul": (-30.0346, -51.2177, False),
    "brasil-porto-alegre": (-30.0346, -51.2177, False),
    "brasil-parana": (-25.4284, -49.2733, False),
    "brasil-santa-catarina": (-27.5954, -48.5480, False),
    "brasil-bahia": (-12.9777, -38.5016, False),
    "brasil-pernambuco": (-8.0476, -34.8770, False),
    "brasil-ceara": (-3.7172, -38.5433, False),
    "brasil-fortaleza": (-3.7172, -38.5433, False),
    "brasil-natal": (-5.7945, -35.2110, False),
    "brasil-amazonas": (-3.1190, -60.0217, False),
    "brasil-para": (-1.4558, -48.5039, False),

    # Ecuador
    "ecuador-quito": (-0.1807, -78.4678, True),
    "ecuador-guayaquil": (-2.1894, -79.8891, False),
    "ecuador-cuenca": (-2.9006, -79.0045, False),
    "ecuador-ambato": (-1.2417, -78.6197, False),
    "ecuador-chimborazo": (-1.6635, -78.6547, False),
    "ecuador-cotopaxi": (-0.9331, -78.6157, False),
    "ecuador-loja": (-3.9931, -79.2042, False),
    "ecuador-machala": (-3.2581, -79.9553, False),
    "ecuador-portoviejo": (-1.0546, -80.4530, False),
    "ecuador-santa-elena": (-2.2270, -80.8580, False),
    "ecuador-esmeraldas": (0.9682, -79.6517, False),
    "ecuador-ibarra": (0.3517, -78.1223, False),
    "ecuador-urcuqui": (0.3833, -78.1917, False),
    "ecuador-puyo": (-1.4924, -78.0022, False),
    "ecuador-tena": (-0.9938, -77.8131, False),

    # Argentina
    "argentina-ciudad-autonoma-de-buenos-aires": (-34.6037, -58.3816, True),
    "argentina-caba": (-34.6037, -58.3816, False),
    "argentina-la-plata": (-34.9215, -57.9545, False),
    "argentina-cordoba": (-31.4201, -64.1888, False),
    "argentina-rosario": (-32.9442, -60.6505, False),
    "argentina-santa-fe": (-31.6333, -60.7000, False),
    "argentina-entre-rios": (-31.7333, -60.5238, False),
    "argentina-mendoza": (-32.8895, -68.8458, False),
    "argentina-san-juan": (-31.5375, -68.5364, False),
    "argentina-san-luis": (-33.3017, -66.3378, False),
    "argentina-san-miguel-de-tucuman": (-26.8083, -65.2176, False),
    "argentina-salta": (-24.7859, -65.4117, False),
    "argentina-san-salvador-de-jujuy": (-24.1858, -65.2995, False),
    "argentina-san-carlos-de-bariloche": (-41.1335, -71.3103, False),
    "argentina-neuquen": (-38.9516, -68.0591, False),
    "argentina-chubut": (-45.8647, -67.4966, False),
    "argentina-tierra-del-fuego": (-54.8019, -68.3030, False),

    # Peru
    "peru-lima": (-12.0464, -77.0428, True),
    "peru-arequipa": (-16.4090, -71.5375, False),
    "peru-trujillo": (-8.1116, -79.0290, False),
    "peru-chiclayo": (-6.7714, -79.8409, False),
    "peru-piura": (-5.1945, -80.6328, False),
    "peru-cusco": (-13.5320, -71.9675, False),
    "peru-puno": (-15.8402, -70.0219, False),
    "peru-huancayo": (-12.0654, -75.2049, False),
    "peru-ayacucho": (-13.1588, -74.2232, False),
    "peru-iquitos": (-3.7437, -73.2516, False),
    "peru-ucayali": (-8.3791, -74.5539, False),

    # Chile
    "chile-santiago": (-33.4489, -70.6693, True),
    "chile-valparaiso": (-33.0472, -71.6127, False),
    "chile-concepcion": (-36.8201, -73.0444, False),
    "chile-valdivia": (-39.8142, -73.2459, False),
    "chile-temuco": (-38.7359, -72.5904, False),
    "chile-antofagasta": (-23.6509, -70.3975, False),
    "chile-arica": (-18.4783, -70.3126, False),
    "chile-iquique": (-20.2141, -70.1522, False),
    "chile-puerto-montt": (-41.4693, -72.9424, False),
    "chile-magallanes": (-53.1638, -70.9171, False),

    # Uruguay
    "uruguay-montevideo": (-34.9011, -56.1645, True),
    "uruguay-maldonado": (-34.9036, -54.9548, False),
    "uruguay-salto": (-31.3833, -57.9667, False),
    "uruguay-rivera": (-30.9053, -55.5508, False),

    # Paraguay
    "paraguay-asuncion": (-25.2637, -57.5759, True),
    "paraguay-encarnacion": (-27.3308, -55.8664, False),
    "paraguay-coronel-oviedo": (-25.4478, -56.4436, False),
    "paraguay-villarrica": (-25.7500, -56.4333, False),
    "paraguay-concepcion": (-23.4064, -57.4344, False),
    "paraguay-pilar": (-26.8664, -58.2967, False),

    # Bolivia
    "bolivia-la-paz": (-16.5000, -68.1500, True),
    "bolivia-cochabamba": (-17.3895, -66.1568, False),
    "bolivia-sucre": (-19.0333, -65.2627, False),
    "bolivia-oruro": (-17.9833, -67.1500, False),
    "bolivia-potosi": (-19.5836, -65.7531, False),
    "bolivia-trinidad": (-14.8333, -64.9000, False),
    "bolivia-pando": (-11.0267, -68.7692, False),

    # Mexico
    "mexico-ciudad-de-mexico": (19.4326, -99.1332, True),
    "mexico-monterrey": (25.6866, -100.3161, False),
    "mexico-guadalajara": (20.6597, -103.3496, False),
    "mexico-puebla": (19.0414, -98.2063, False),
    "mexico-queretaro": (20.5888, -100.3899, False),
    "mexico-guanajuato": (21.0190, -101.2574, False),
    "mexico-merida": (20.9674, -89.5926, False),
    "mexico-tijuana": (32.5149, -117.0382, False),

    # Estados Unidos (buckets son region/estado, se usa la ciudad principal)
    "estados-unidos-massachusetts": (42.3601, -71.0589, False),
    "estados-unidos-nueva-york": (40.7128, -74.0060, False),
    "estados-unidos-nueva-jersey": (40.3573, -74.6672, False),
    "estados-unidos-pensilvania": (39.9526, -75.1652, False),
    "estados-unidos-connecticut": (41.3083, -72.9279, False),
    "estados-unidos-silicon-valley": (37.4419, -122.1430, False),
    "estados-unidos-austin": (30.2672, -97.7431, False),
    "estados-unidos-houston": (29.7604, -95.3698, False),
    "estados-unidos-dallas": (32.7767, -96.7970, False),
    "estados-unidos-chicago": (41.8781, -87.6298, False),
    "estados-unidos-michigan-e-indiana": (42.2808, -83.7430, False),
    "estados-unidos-gainesville": (29.6516, -82.3248, False),
    "estados-unidos-miami": (25.7617, -80.1918, False),
    "estados-unidos-georgia": (33.7490, -84.3880, False),
    "estados-unidos-seattle": (47.6062, -122.3321, False),

    # Canada
    "canada-toronto": (43.6532, -79.3832, False),
    "canada-ottawa": (45.4215, -75.6972, True),
    "canada-waterloo": (43.4643, -80.5204, False),
    "canada-hamilton": (43.2557, -79.8711, False),
    "canada-london": (42.9849, -81.2453, False),
    "canada-kingston": (44.2312, -76.4860, False),
    "canada-montreal": (45.5019, -73.5674, False),
    "canada-ciudad-de-quebec": (46.8139, -71.2080, False),
    "canada-vancouver": (49.2827, -123.1207, False),
    "canada-victoria": (48.4284, -123.3656, False),
    "canada-edmonton": (53.5461, -113.4938, False),
    "canada-calgary": (51.0447, -114.0719, False),
    "canada-winnipeg": (49.8951, -97.1384, False),
    "canada-saskatoon": (52.1332, -106.6700, False),
    "canada-halifax": (44.6488, -63.5752, False),
    "canada-san-juan": (47.5615, -52.7126, False),  # St. John's, Newfoundland

    # Costa Rica
    "costa-rica-san-jose": (9.9281, -84.0907, True),
    "costa-rica-heredia": (9.9989, -84.1170, False),
    "costa-rica-cartago": (9.8644, -83.9194, False),
    "costa-rica-alajuela": (10.0162, -84.2116, False),
    "costa-rica-liberia-santa-cruz": (10.6346, -85.4370, False),
    "costa-rica-puntarenas": (9.9763, -84.8384, False),

    # Republica Dominicana
    "republica-dominicana-santo-domingo": (18.4861, -69.9312, True),
    "republica-dominicana-santiago-de-los-caballeros": (19.4517, -70.6970, False),
    "republica-dominicana-san-pedro-de-macoris": (18.4539, -69.2975, False),
    "republica-dominicana-la-vega-moca": (19.2223, -70.5292, False),
    "republica-dominicana-san-francisco-de-macoris": (19.3008, -70.2531, False),
    "republica-dominicana-san-cristobal": (18.4167, -70.1000, False),
    "republica-dominicana-barahona": (18.2085, -71.1000, False),

    # Panama
    "panama-ciudad-de-panama": (8.9824, -79.5199, True),
    "panama-david": (8.4333, -82.4333, False),
    "panama-colon": (9.3547, -79.9014, False),
    "panama-veraguas": (8.1000, -80.9833, False),
    "panama-chitre": (7.9667, -80.4333, False),
    "panama-cocle": (8.5167, -80.3583, False),

    # Cuba
    "cuba-la-habana": (23.1136, -82.3666, True),
    "cuba-santa-clara": (22.4069, -79.9647, False),
    "cuba-villa-clara": (22.4069, -79.9647, False),
    "cuba-cienfuegos": (22.1461, -80.4361, False),
    "cuba-santiago-de-cuba": (20.0247, -75.8219, False),
    "cuba-camaguey": (21.3808, -77.9169, False),
    "cuba-holguin": (20.8872, -76.2631, False),
    "cuba-pinar-del-rio": (22.4175, -83.6981, False),
    "cuba-matanzas": (23.0411, -81.5775, False),

    # Haiti
    "haiti-puerto-principe": (18.5944, -72.3074, True),
    "haiti-cap-haitien": (19.7592, -72.2014, False),
    "haiti-les-cayes": (18.2000, -73.7500, False),
    "haiti-jacmel": (18.2340, -72.5350, False),
    "haiti-gonaives": (19.4500, -72.6833, False),

    # Guatemala
    "guatemala-ciudad-de-guatemala": (14.6349, -90.5069, True),
    "guatemala-quetzaltenango": (14.8347, -91.5181, False),
    "guatemala-coban": (15.4667, -90.3667, False),
    "guatemala-escuintla": (14.3050, -90.7850, False),
    "guatemala-zacapa": (14.9722, -89.5306, False),

    # Honduras
    "honduras-tegucigalpa": (14.0723, -87.1921, True),
    "honduras-san-pedro-sula": (15.5044, -88.0250, False),
    "honduras-la-ceiba": (15.7597, -86.7822, False),
    "honduras-comayagua": (14.4522, -87.6392, False),
    "honduras-santa-rosa-de-copan": (14.7667, -88.7833, False),
    "honduras-choluteca": (13.3000, -87.1833, False),

    # Nicaragua
    "nicaragua-managua": (12.1150, -86.2362, True),
    "nicaragua-leon": (12.4340, -86.8780, False),
    "nicaragua-esteli": (13.0900, -86.3536, False),
    "nicaragua-matagalpa": (12.9250, -85.9167, False),
    "nicaragua-granada": (11.9297, -85.9564, False),
    "nicaragua-carazo": (11.8500, -86.1958, False),
    "nicaragua-bluefields": (12.0083, -83.7614, False),

    # Puerto Rico
    "puerto-rico-san-juan": (18.4655, -66.1057, True),
    "puerto-rico-carolina": (18.3808, -65.9573, False),
    "puerto-rico-bayamon": (18.3986, -66.1614, False),
    "puerto-rico-mayaguez": (18.2013, -67.1397, False),
    "puerto-rico-ponce": (18.0111, -66.6141, False),
    "puerto-rico-arecibo": (18.4744, -66.7156, False),
    "puerto-rico-utuado": (18.2664, -66.7005, False),
    "puerto-rico-humacao-cayey": (18.1497, -65.8275, False),
    "puerto-rico-fajardo": (18.3258, -65.6524, False),

    # El Salvador
    "el-salvador-san-salvador": (13.6929, -89.2182, True),
    "el-salvador-antiguo-cuscatlan": (13.6725, -89.2464, False),
    "el-salvador-santa-ana": (13.9942, -89.5597, False),
    "el-salvador-san-miguel": (13.4833, -88.1833, False),
    "el-salvador-usulutan": (13.3500, -88.4500, False),
    "el-salvador-san-vicente": (13.6411, -88.7844, False),
}
