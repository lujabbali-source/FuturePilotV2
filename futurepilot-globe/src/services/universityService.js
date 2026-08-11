// Fuente unica de universidades: el documento de Word curado a mano
// (America universidades.docx), ya volcado a cada archivo de ciudad via
// scripts/parse_universities_docx.py + import_americas_docx.py. No hay
// fallback a un catalogo externo - si una ciudad no tiene universidades
// cargadas todavia, se devuelve una lista vacia en vez de inventar datos
// o consultar otra fuente.
export async function getUniversities(city) {
    if (Array.isArray(city?.universities)) {
        return city.universities;
    }
    return [];
}
