import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "unicordoba-monteria", name: "Universidad de Córdoba", cityId: "monteria", website: "https://www.unicordoba.edu.co", type: "public" }),
    defineUniversity({ id: "unisinu-monteria", name: "Universidad del Sinú (Elías Bechara Zainúm)", cityId: "monteria", website: "https://www.unisinu.edu.co", type: "private" }),
];
