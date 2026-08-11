import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "utp-pereira", name: "Universidad Tecnológica de Pereira (UTP)", cityId: "pereira", website: "https://www.utp.edu.co", type: "public" }),
    defineUniversity({ id: "ucp-pereira", name: "Universidad Católica de Pereira", cityId: "pereira", website: "https://www.ucp.edu.co", type: "private" }),
];
