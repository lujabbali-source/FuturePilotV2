import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "uninorte-barranquilla", name: "Universidad del Norte (Uninorte)", cityId: "barranquilla", website: "https://www.uninorte.edu.co", type: "private" }),
    defineUniversity({ id: "uniatlantico-barranquilla", name: "Universidad del Atlántico", cityId: "barranquilla", website: "https://www.uniatlantico.edu.co", type: "public" }),
    defineUniversity({ id: "unisimon-barranquilla", name: "Universidad Simón Bolívar (Unisimón)", cityId: "barranquilla", website: "https://www.unisimon.edu.co", type: "private" }),
    defineUniversity({ id: "unilibre-barranquilla", name: "Universidad Libre (Sede Barranquilla)", cityId: "barranquilla", website: "https://www.unilibre.edu.co/barranquilla", type: "private" }),
    defineUniversity({ id: "uac-barranquilla", name: "Universidad Autónoma del Caribe", cityId: "barranquilla", website: "https://www.uac.edu.co", type: "private" }),
];
