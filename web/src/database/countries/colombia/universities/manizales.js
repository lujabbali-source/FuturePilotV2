import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "ucaldas-manizales", name: "Universidad de Caldas", cityId: "manizales", website: "https://www.ucaldas.edu.co", type: "public" }),
    defineUniversity({ id: "umanizales-manizales", name: "Universidad de Manizales", cityId: "manizales", website: "https://umanizales.edu.co", type: "private" }),
    defineUniversity({ id: "uam-manizales", name: "Universidad Autónoma de Manizales", cityId: "manizales", website: "https://www.autonoma.edu.co", type: "private" }),
    defineUniversity({ id: "ucm-manizales", name: "Universidad Católica de Manizales", cityId: "manizales", website: "https://www.ucm.edu.co", type: "private" }),
    defineUniversity({ id: "unal-manizales", name: "Universidad Nacional de Colombia (Sede Manizales)", cityId: "manizales", website: "https://manizales.unal.edu.co", type: "public" }),
];
