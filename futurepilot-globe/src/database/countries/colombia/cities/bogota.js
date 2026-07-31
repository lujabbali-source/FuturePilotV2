import universities from "../universities/bogota";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "bogota",
    name: "Bogotá",
    coordinates: { lat: 4.711, lng: -74.0721 },
    universities,
    isCapital: true,
    costOfLiving: { currency: "COP", monthlyEstimate: 2400000, rent: 1400000, food: 650000, transportation: 180000, utilities: null, studentBudget: 2400000 },
    statistics: { population: 7968095, safety: null, weather: "Mild highland climate", language: "Spanish", currency: "COP", internetSpeed: null, qualityOfLife: 82, studentSatisfaction: null },
    jobs: { averageSalary: null, mainIndustries: ["Technology", "Finance", "Services"], studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null },
    living: { bestNeighborhoods: [], transportation: "TransMilenio and integrated public transit", healthcare: [], nightlife: [], culture: [], food: [], tourism: [] },
});
