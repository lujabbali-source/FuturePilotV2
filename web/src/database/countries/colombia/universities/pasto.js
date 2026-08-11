import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "udenar-pasto", name: "Universidad de Nariño (Udenar)", cityId: "pasto", website: "https://www.udenar.edu.co", type: "public" }),
    defineUniversity({ id: "umariana-pasto", name: "Universidad Mariana", cityId: "pasto", website: "https://www.umariana.edu.co", type: "private" }),
];
