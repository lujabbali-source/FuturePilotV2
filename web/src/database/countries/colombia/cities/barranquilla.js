import universities from "../universities/barranquilla";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "barranquilla",
    name: "Barranquilla",
    coordinates: { lat: 10.9685, lng: -74.7813 },
    region: "Barranquilla y Región Caribe (Cartagena, Santa Marta, Montería, Sincelejo)",
    statistics: { population: "~1.300.000 habitantes (Barranquilla)", safety: "Moderada", weather: "24°C a 33°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~80 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 2200000, "max": 3600000, "currency": "COP"},
        studentBudget: {"min": 350, "max": 500, "currency": "USD"},
        rent: {"min": 560000, "max": 920000, "currency": "COP"},
        food: {"min": 520000, "max": 720000, "currency": "COP"},
        transportation: {"min": 100000, "max": 140000, "currency": "COP"},
        utilities: {"min": 200000, "max": 360000, "currency": "COP"},
    },
    jobs: { mainIndustries: [{"es": "Logística y carga marítima", "en": "Logistics & Maritime Freight"}, {"es": "Manufactura industrial", "en": "Industrial Manufacturing"}, {"es": "Construcción", "en": "Construction"}, {"es": "BPO", "en": "BPO"}, {"es": "Comercio", "en": "Commerce"}] },
    living: {
        bestNeighborhoods: [{"es": "Alto Prado, Riomar, Villa Santos, El Prado, Bellavista.", "en": "Alto Prado, Riomar, Villa Santos, El Prado, Bellavista."}],
        healthcare: [{"es": "Excelente (Clínica Portoazul, Clínica Iberoamérica).", "en": "Excellent (Clínica Portoazul, Clínica Iberoamérica)."}],
        culture: [{"es": "Carnaval de Barranquilla (Patrimonio de la Humanidad de la Unesco), Gran Malecón del Río, Museo del Caribe.", "en": "Carnaval de Barranquilla (UNESCO World Heritage), Gran Malecón del Río, Museo del Caribe."}],
        tourism: [{"es": "Gran Malecón, Bocas de Ceniza, Muelle de Puerto Colombia.", "en": "Gran Malecón, Bocas de Cenoza, Puerto Colombia Pier."}],
        food: [{"es": "Arepa de huevo, arroz de lisa, sancocho de guandú, pescado y mariscos frescos.", "en": "Arepa de huevo, Arroz de lisa, Sancocho de guandú, fresh seafood."}],
        nightlife: [{"es": "Carrera 53, Calle 84, La Troja (templo de la salsa).", "en": "Carrera 53, Calle 84, La Troja (legendary salsa venue)."}],
        transportation: {"es": "TransMetro, buses urbanos, taxis y aplicaciones de transporte.", "en": "TransMetro, urban buses, taxis, rideshare apps."},
    },
    outlook: {
        safetyStrategy: {"es": "Los sectores del norte (Alto Prado, Riomar) son seguros; las zonas del sur exigen precaución.", "en": "Northern sectors (Alto Prado, Riomar) are secure; southern zones require caution."},
        englishProficiency: {"es": "Bajo-moderado; más alto en colegios privados y en los centros regionales de BPO.", "en": "Low-Moderate; higher in private schools and regional BPO hubs."},
        strengths: {"es": "Crecimiento rápido en infraestructura, puerto industrial y logístico de gran calado, y un festival cultural conocido en todo el mundo (el Carnaval).", "en": "Rapid infrastructural growth, major industrial/logistics seaport, world-famous cultural festival (Carnaval)."},
        challenges: {"es": "Calor intenso que obliga a aire acondicionado, e inundaciones de calles durante los aguaceros repentinos (los arroyos, aunque los canales principales ya están canalizados).", "en": "Intense heat requiring AC, street flooding during sudden heavy rains ( arroyos , though major channels are paved)."},
    },
    breakdown: {
        household: [{"label": {"es": "Una persona (moderado)", "en": "Single person (Moderate)"}, "amount": {"min": 2200000, "max": 3600000, "currency": "COP"}}, {"label": {"es": "Estudiante (frugal)", "en": "Student (Frugal)"}, "amount": {"min": 1400000, "max": 2000000, "currency": "COP"}}, {"label": {"es": "Familia de cuatro", "en": "Family of four"}, "amount": {"min": 5600000, "max": 8800000, "currency": "COP"}}],
        housing: [{"label": {"es": "Habitación compartida (estudiante/coliving)", "en": "Shared room (Student/Coliving)"}, "amount": {"min": 560000, "max": 920000, "currency": "COP"}}, {"label": {"es": "Apartaestudio (zona estándar - Villa Santos/El Prado)", "en": "1 bedroom apartment (Standard area - Villa Santos/El Prado)"}, "amount": {"min": 1200000, "max": 1800000, "currency": "COP"}}, {"label": {"es": "Apartaestudio (zona alta - Alto Prado/Riomar)", "en": "1 bedroom apartment (Upscale area - Alto Prado/Riomar)"}, "amount": {"min": 2000000, "max": 3200000, "currency": "COP"}}],
        food: [{"label": {"es": "Mercado (1 persona)", "en": "Local groceries (1 person)"}, "amount": {"min": 520000, "max": 720000, "currency": "COP"}}, {"label": {"es": "Corrientazo", "en": "Cheap local lunch (Corrientazo)"}, "amount": {"min": 10000, "max": 16000, "currency": "COP"}}, {"label": {"es": "Cena de gama media (2 personas)", "en": "Mid-range restaurant dinner (2 people)"}, "amount": {"min": 100000, "max": 160000, "currency": "COP"}}],
        utilities: [{"label": {"es": "Estratos 3–4 (clase media)", "en": "Strata 3–4 (Middle class)"}, "amount": {"min": 200000, "max": 360000, "currency": "COP"}}, {"label": {"es": "Estratos 5–6 (clase alta)", "en": "Strata 5–6 (Upper class)"}, "amount": {"min": 440000, "max": 720000, "currency": "COP"}}, {"label": {"es": "Internet en casa y plan móvil", "en": "Home internet & mobile plan"}, "amount": {"min": 80000, "max": 120000, "currency": "COP"}}],
        transport: [{"label": {"es": "TransMetro y buses urbanos", "en": "TransMetro / Public buses"}, "amount": {"min": 100000, "max": 140000, "currency": "COP"}}, {"label": {"es": "Taxis / InDrive / Uber", "en": "Taxis / InDrive / Uber"}, "amount": {"min": 30, "max": 55, "currency": "USD"}}],
        student: [{"label": {"es": "Costo esencial total del estudiante", "en": "Total essential student cost"}, "amount": {"min": 350, "max": 500, "currency": "USD"}}, {"label": {"es": "En qué consiste", "en": "Composition"}, "note": {"es": "Cubre habitación compartida cerca de la Universidad del Norte o la Uniatlántico, mercado y bus urbano.", "en": "Covers shared room near Universidad del Norte or Uniatlántico, groceries, local bus."}}],
    },
});
