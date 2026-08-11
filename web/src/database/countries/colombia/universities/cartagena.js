import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "unicartagena-cartagena", name: "Universidad de Cartagena", cityId: "cartagena", website: "https://www.unicartagena.edu.co", type: "public" }),
    defineUniversity({ id: "utb-cartagena", name: "Universidad Tecnológica de Bolívar (UTB)", cityId: "cartagena", website: "https://www.utb.edu.co", type: "private" }),
    defineUniversity({ id: "unisinu-cartagena", name: "Universidad del Sinú (Sede Cartagena)", cityId: "cartagena", website: "https://www.unisinu.edu.co", type: "private" }),
];
