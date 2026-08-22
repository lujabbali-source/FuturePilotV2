import universities from "../universities/medellin";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "medellin",
    name: "Medellín",
    coordinates: { lat: 6.2442, lng: -75.5812 },
    region: "Medellín y Área Metropolitana (Envigado, Sabaneta, Caldas)",
    statistics: { population: "~4.000.000 habitantes", safety: "Moderada", weather: "16°C a 28°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~105 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 2600000, "max": 4400000, "currency": "COP"},
        studentBudget: {"min": 1600000, "max": 2300000, "currency": "COP"},
        rent: {"min": 680000, "max": 1100000, "currency": "COP"},
        food: {"min": 560000, "max": 800000, "currency": "COP"},
        transportation: {"min": 100000, "max": 160000, "currency": "COP"},
        utilities: {"min": 140000, "max": 260000, "currency": "COP"},
    },
    jobs: { mainIndustries: ["Technology & Innovation", "Textiles & Fashion", "Financial Services", "Health Tourism", "BPO"] },
    living: {
        bestNeighborhoods: [{"es": "El Poblado / Provenza (estrato 6), Laureles - Estadio (estratos 4–5), Envigado (estratos 4–5), Sabaneta (estratos 3–4).", "en": "El Poblado / Provenza (Estrato 6), Laureles - Estadio (Estrato 4–5), Envigado (Estrato 4–5), Sabaneta (Estrato 3–4)."}],
        healthcare: [{"es": "De primer nivel. Hospital Pablo Tobón Uribe, Clínica Las Américas.", "en": "World-class. Hospital Pablo Tobón Uribe, Clínica Las Américas."}],
        culture: [{"es": "Feria de las Flores, Museo de Antioquia (Plaza Botero), Parque Arví, recorridos de arte por la Comuna 13.", "en": "Feria de las Flores, Museo de Antioquia (Botero Plaza), Parque Arví, Comuna 13 art tours."}],
        tourism: [{"es": "Pueblito Paisa, Comuna 13, metrocables, paseo de un día a Guatapé y El Peñol.", "en": "Pueblito Paisa, Comuna 13, Cable cars, Day trip to Guatapé & El Peñol."}],
        food: [{"es": "Bandeja paisa, arepa de choclo, cocina internacional de autor en Provenza.", "en": "Bandeja Paisa, Arepa de Choclo, gourmet international dining in Provenza."}],
        nightlife: [{"es": "Provenza, Parque Lleras, La 70 (Laureles), Dulce Jesús Mío.", "en": "Provenza, Parque Lleras, La 70 (Laureles), Dulce Jesús Mío."}],
        transportation: {"es": "Metro de Medellín, Metrocable, Tranvía de Ayacucho, EnCicla (bicicletas públicas), aplicaciones de transporte.", "en": "Metro de Medellín, Metrocable, Tranvía de Ayacucho, EnCicla (bike share), Rideshares."},
    },
    outlook: {
        safetyStrategy: {"es": "El Poblado, Envigado y Laureles están bien vigilados; conviene precaución en El Centro de noche.", "en": "El Poblado, Envigado, and Laureles are well-policed; caution required in Downtown (El Centro) at night."},
        englishProficiency: {"es": "Moderado en las zonas de extranjeros y nómadas digitales (El Poblado, Provenza); fuera de ahí hace falta español básico.", "en": "Moderate in expat/digital nomad hubs (El Poblado, Provenza); basic Spanish needed elsewhere."},
        strengths: {"es": "Transporte urbano de primer nivel (el único metro de Colombia), ecosistema de innovación fuerte, clima ideal y vida social vibrante.", "en": "Top-tier urban transport (only Metro in Colombia), strong innovation ecosystem, ideal climate, vibrant social life."},
        challenges: {"es": "Gentrificación en El Poblado y Laureles, y contaminación del aire en el valle durante las inversiones térmicas estacionales.", "en": "Gentrification in El Poblado/Laureles, air pollution in the valley during seasonal inversions."},
    },
});
