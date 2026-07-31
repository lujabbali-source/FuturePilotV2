import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "uis-bucaramanga", name: "Universidad Industrial de Santander (UIS)", cityId: "bucaramanga", website: "https://www.uis.edu.co", type: "public" }),
    defineUniversity({ id: "unab-bucaramanga", name: "Universidad Autónoma de Bucaramanga (UNAB)", cityId: "bucaramanga", website: "https://www.unab.edu.co", type: "private" }),
    defineUniversity({ id: "upb-bucaramanga", name: "Universidad Pontificia Bolivariana (UPB - Sede Bucaramanga)", cityId: "bucaramanga", website: "https://www.upb.edu.co/es/bucaramanga", type: "private" }),
    defineUniversity({ id: "udes-bucaramanga", name: "Universidad de Santander (UDES)", cityId: "bucaramanga", website: "https://udes.edu.co", type: "private" }),
];
