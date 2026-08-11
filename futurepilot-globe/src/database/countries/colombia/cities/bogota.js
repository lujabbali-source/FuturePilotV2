import universities from "../universities/bogota";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "bogota",
    name: "Bogotá",
    coordinates: { lat: 4.711, lng: -74.0721 },
    region: "Bogotá D.C. y Alrededores (Chía, Cajicá)",
    universities,
    isCapital: true,
    costOfLiving: { currency: "COP", monthlyEstimate: 2400000, rent: 1400000, food: 650000, transportation: 180000, utilities: null, studentBudget: 2400000 },
    statistics: { population: "~8.000.000 habitantes", safety: "Moderada", weather: "8°C a 19°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~110 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
    jobs: { averageSalary: null, mainIndustries: ["Technology", "Finance", "Services"], studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null },
    living: { bestNeighborhoods: [], transportation: "TransMilenio and integrated public transit", healthcare: [], nightlife: [], culture: [], food: [], tourism: [] },
});
