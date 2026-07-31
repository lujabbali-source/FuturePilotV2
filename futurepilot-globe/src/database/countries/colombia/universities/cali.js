import { defineUniversity } from "./universitySchema";

export default [
    defineUniversity({ id: "univalle-cali", name: "Universidad del Valle (Univalle) (Sede Principal)", cityId: "cali", website: "https://www.univalle.edu.co", type: "public" }),
    defineUniversity({ id: "icesi-cali", name: "Universidad ICESI", cityId: "cali", website: "https://www.icesi.edu.co", type: "private" }),
    defineUniversity({ id: "javeriana-cali", name: "Pontificia Universidad Javeriana (Sede Cali)", cityId: "cali", website: "https://www.javerianacali.edu.co", type: "private" }),
    defineUniversity({ id: "uao-cali", name: "Universidad Autónoma de Occidente (UAO)", cityId: "cali", website: "https://www.uao.edu.co", type: "private" }),
    defineUniversity({ id: "usc-cali", name: "Universidad Santiago de Cali (USC)", cityId: "cali", website: "https://www.usc.edu.co", type: "private" }),
    defineUniversity({ id: "unal-palmira", name: "Universidad Nacional de Colombia (Sede Palmira)", cityId: "cali", website: "https://palmira.unal.edu.co", type: "public" }),
    defineUniversity({ id: "unipacifico-buenaventura", name: "Universidad del Pacífico (Sede Buenaventura)", cityId: "cali", website: "https://www.unipacifico.edu.co", type: "public" }),
    defineUniversity({ id: "usb-cali", name: "Universidad de San Buenaventura (Sede Cali)", cityId: "cali", website: "https://www.usbcali.edu.co", type: "private" }),
];
