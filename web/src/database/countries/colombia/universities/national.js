import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "unad-national", name: "Universidad Nacional Abierta y a Distancia (UNAD)", cityId: "national", website: "https://www.unad.edu.co", type: null }),
    defineUniversity({ id: "uniminuto-national", name: "Corporación Universitaria Minuto de Dios (Uniminuto)", cityId: "national", website: "https://www.uniminuto.edu", type: null }),
    defineUniversity({ id: "ucc-national", name: "Universidad Cooperativa de Colombia (UCC)", cityId: "national", website: "https://www.ucc.edu.co", type: null }),
    defineUniversity({ id: "unilibre-national", name: "Universidad Libre", cityId: "national", website: "https://www.unlibre.edu.co", type: null, coverage: "Sedes en Bogotá, Cali, Barranquilla, Pereira, Cúcuta, Socorro y Cartagena" }),
];
