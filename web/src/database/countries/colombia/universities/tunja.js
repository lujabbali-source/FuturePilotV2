import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "uptc-tunja", name: "Universidad Pedagógica y Tecnológica de Colombia (UPTC)", cityId: "tunja", website: "https://www.uptc.edu.co", type: "public" }),
    defineUniversity({ id: "uniboyaca-tunja", name: "Universidad de Boyacá (UniBoyacá)", cityId: "tunja", website: "https://www.uniboyaca.edu.co", type: "private" }),
];
