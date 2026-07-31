import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "utolima-ibague", name: "Universidad del Tolima", cityId: "ibague", website: "https://www.ut.edu.co", type: "public" }),
    defineUniversity({ id: "unibague-ibague", name: "Universidad de Ibagué", cityId: "ibague", website: "https://www.unibague.edu.co", type: "private" }),
];
