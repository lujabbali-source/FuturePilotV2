# -*- coding: utf-8 -*-
"""Las 39 frases de vida diaria, en castellano.

Criterio de traduccion: los nombres propios NO se traducen. "Museo del Oro",
"Comuna 13", "Parque Tayrona" y "Bandeja Paisa" son como se llaman las cosas, y
traducirlos volveria el texto inutil para quien luego busque el sitio. Lo que
se traduce es el conector y la descripcion: "World-class institutions like" ->
"Instituciones de primer nivel como".

Donde el documento traduce al ingles un nombre que ya era español ("Walled
City", "Lost City", "Rosario Islands"), se recupera el original.
"""

TRADUCCIONES = {
    "bogota": {
        "bestNeighborhoods": "Chicó y Parque de la 93 (estratos 5–6), Chapinero Alto y Zona G (estrato 4), Usaquén (estratos 5–6), Teusaquillo y La Soledad (estratos 3–4).",
        "healthcare": "Excelente. Instituciones de primer nivel como la Fundación Santa Fe de Bogotá y el Hospital Universitario San Ignacio.",
        "culture": "Museo del Oro, Museo Botero, arte urbano, Parque Simón Bolívar, Ciclovía.",
        "tourism": "Monserrate, La Candelaria, Catedral de Sal de Zipaquirá.",
        "food": "Ajiaco, alta cocina internacional en la Zona G, cadenas de siempre como Crepes & Waffles.",
        "nightlife": "Zona Rosa (Zona T), Andrés Carne de Res (Chía), Theatron en Chapinero.",
        "transportation": "TransMilenio, SITP, aplicaciones de transporte (Uber, Cabify, DiDi).",
    },
    "medellin": {
        "bestNeighborhoods": "El Poblado / Provenza (estrato 6), Laureles - Estadio (estratos 4–5), Envigado (estratos 4–5), Sabaneta (estratos 3–4).",
        "healthcare": "De primer nivel. Hospital Pablo Tobón Uribe, Clínica Las Américas.",
        "culture": "Feria de las Flores, Museo de Antioquia (Plaza Botero), Parque Arví, recorridos de arte por la Comuna 13.",
        "tourism": "Pueblito Paisa, Comuna 13, metrocables, paseo de un día a Guatapé y El Peñol.",
        "food": "Bandeja paisa, arepa de choclo, cocina internacional de autor en Provenza.",
        "nightlife": "Provenza, Parque Lleras, La 70 (Laureles), Dulce Jesús Mío.",
        "transportation": "Metro de Medellín, Metrocable, Tranvía de Ayacucho, EnCicla (bicicletas públicas), aplicaciones de transporte.",
    },
    "barranquilla": {
        "bestNeighborhoods": "Alto Prado, Riomar, Villa Santos, El Prado, Bellavista.",
        "healthcare": "Excelente (Clínica Portoazul, Clínica Iberoamérica).",
        "culture": "Carnaval de Barranquilla (Patrimonio de la Humanidad de la Unesco), Gran Malecón del Río, Museo del Caribe.",
        "tourism": "Gran Malecón, Bocas de Ceniza, Muelle de Puerto Colombia.",
        "food": "Arepa de huevo, arroz de lisa, sancocho de guandú, pescado y mariscos frescos.",
        "nightlife": "Carrera 53, Calle 84, La Troja (templo de la salsa).",
        "transportation": "TransMetro, buses urbanos, taxis y aplicaciones de transporte.",
    },
    "cartagena": {
        "bestNeighborhoods": "Bocagrande, Castillogrande, Manga, Getsemaní, Zona Norte.",
        "tourism": "Ciudad Amurallada, Castillo San Felipe de Barajas, Islas del Rosario, Barú.",
        "food": "Posta negra cartagenera, arroz con coco, pescado frito, patacones.",
    },
    "bucaramanga": {
        "bestNeighborhoods": "Cabecera del Llano, Sotomayor, Cañaveral (Floridablanca), Ruitoque.",
        "healthcare": "Referente nacional destacado (Fundación FOSCAL, Hospital Internacional de Colombia - HIC).",
    },
    "manizales": {
        "bestNeighborhoods": "El Cable, Palermo, La Estrella, Chipre, Milán.",
        "tourism": "Parque Nacional Natural Los Nevados, Termales San Vicente y del Otoño, Catedral Basílica de Nuestra Señora del Rosario, Cable Aéreo.",
    },
    "pereira": {
        "bestNeighborhoods": "Pinares, Avenida Circunvalar, Cerritos (zona campestre), Álamos.",
        "tourism": "Bioparque Ukumarí, Salento y el Valle de Cocora (cerca), Termales de Santa Rosa de Cabal, Otún Quimbaya.",
    },
    "cali": {
        "bestNeighborhoods": "San Antonio (bohemio e histórico), Granada, El Peñón, Ciudad Jardín (sur).",
    },
    "pasto": {
        "culture": "Carnaval de Negros y Blancos (Patrimonio de la Humanidad de la Unesco), Laguna de la Cocha, Santuario de Las Lajas (Ipiales).",
    },
    "neiva": {
        "tourism": "Desierto de la Tatacoa, Parque Arqueológico de San Agustín (en la región).",
    },
    "villavicencio": {
        "culture": "Música y baile de joropo, coleo, gastronomía de carnes (ternera a la llanera).",
    },
    "santa-marta": {
        "tourism": "Parque Nacional Natural Tayrona, Minca (café y bosque de niebla), El Rodadero, Ciudad Perdida.",
    },
    "valledupar": {
        "culture": "Cuna del vallenato (Festival de la Leyenda Vallenata), río Guatapurí.",
    },
    "popayan": {
        "culture": "Ciudad Unesco de la Gastronomía, procesiones de Semana Santa.",
    },
    "quibdo": {
        "culture": "Fiestas de San Pacho (Patrimonio Cultural Inmaterial de la Unesco), música y cocina afrocolombiana del Pacífico.",
    },
    "leticia": {
        "culture": "Excursiones por el río Amazonas, Reserva Tanimboca, Isla de los Micos.",
    },
}
