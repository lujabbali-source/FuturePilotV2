import leticia from "./leticia";
import quibdo from "./quibdo";
import valledupar from "./valledupar";
import bogota from "./bogota";
import medellin from "./medellin";
import cali from "./cali";
import barranquilla from "./barranquilla";
import cartagena from "./cartagena";
import santaMarta from "./santa-marta";
import monteria from "./monteria";
import sincelejo from "./sincelejo";
import bucaramanga from "./bucaramanga";
import cucuta from "./cucuta";
import manizales from "./manizales";
import pereira from "./pereira";
import armenia from "./armenia";
import popayan from "./popayan";
import pasto from "./pasto";
import ibague from "./ibague";
import neiva from "./neiva";
import florencia from "./florencia";
import tunja from "./tunja";
import villavicencio from "./villavicencio";
import yopal from "./yopal";

// Cada ciudad viene de su propio archivo (cities/<ciudad>.js), que ya trae
// universidades reales, costo de vida y estadisticas via defineCity - antes
// esta lista era una copia plana sin esos datos, asi que el panel del
// globo terminaba sin universidades para Colombia y caia al catalogo WHED
// como fallback (ver services/universityService.js). Ahora se usan los
// archivos reales directamente, sin duplicar nada.
const cities = [
    bogota,
    medellin,
    cali,
    barranquilla,
    cartagena,
    santaMarta,
    monteria,
    sincelejo,
    bucaramanga,
    cucuta,
    manizales,
    pereira,
    armenia,
    popayan,
    pasto,
    ibague,
    neiva,
    florencia,
    tunja,
    villavicencio,
    yopal,
    // De 'America cities.docx': no existían como ficha hasta ahora.
    valledupar,
    quibdo,
    leticia,
];

export default cities;
