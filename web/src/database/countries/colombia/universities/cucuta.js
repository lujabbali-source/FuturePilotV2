import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "ufps-cucuta", name: "Universidad Francisco de Paula Santander (UFPS)", cityId: "cucuta", website: "https://www.ufps.edu.co", type: "public" }),
    defineUniversity({ id: "unipamplona-cucuta", name: "Universidad de Pamplona", cityId: "cucuta", website: "https://www.unipamplona.edu.co", type: "public" }),
];
