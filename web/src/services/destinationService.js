import { countries } from "../database/countries";

/**
 * Qué destinos destacar para este estudiante, y por qué.
 *
 * Dos niveles, no tres. Con lo que hay hoy —idioma, geografía y disposición a
 * salir— se puede defender la diferencia entre "esto encaja con lo que dijiste
 * que buscas" y "esto podría servirte, pero revísalo". Un tercer nivel
 * ("posibilidad condicionada") necesitaría costos, y hay costo de vida en 1 de
 * 223 ciudades. Inventar el escalón que falta es exactamente el tipo de falsa
 * precisión que un porcentaje de compatibilidad produce.
 *
 * Tampoco hay porcentajes por lo mismo: "Madrid 94%" suena a que alguien lo
 * midió. Nadie lo midió.
 *
 * Cada destino sale con la lista de razones por las que aparece, en claves y
 * parámetros. La frase se arma al pintar, con i18next, para que se lea en el
 * idioma que el estudiante tenga puesto hoy y no en el que tenía cuando
 * respondió.
 */

/** Las señales que de verdad existen hoy. Ver FUENTES.md. */
export const TIERS = { STRONG: "strong", EXPLORE: "explore" };

function normalizarIdioma(valor) {
  return String(valor || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().trim();
}

/** ¿La ciudad se estudia en un idioma que el estudiante ya maneja?
 *
 *  Se compara contra los idiomas del pasaporte (los que declara hablar), no
 *  contra los que quiere aprender: querer aprender alemán no te permite
 *  estudiar en alemán el año que viene. */
function hablaElIdioma(ciudad, idiomasEstudiante) {
  const dela = normalizarIdioma(ciudad.statistics?.language);
  if (!dela || !idiomasEstudiante.length) return null; // desconocido, no "no"
  return idiomasEstudiante.some((suyo) => {
    const s = normalizarIdioma(suyo);
    return s && (dela.includes(s) || s.includes(dela));
  });
}

function todasLasCiudades() {
  const salida = [];
  for (const pais of Object.values(countries)) {
    for (const ciudad of pais.cities || []) {
      salida.push({ ciudad, pais });
    }
  }
  return salida;
}

/**
 * @param {object} entrada
 * @param {object} entrada.preferences  lo respondido en el globo
 * @param {object} entrada.known        lo que el pasaporte ya sabía
 * @returns {{tier: string, cityId: string, city: object, country: object,
 *            reasons: {key: string, params: object}[]}[]}
 */
export function rankDestinations({ preferences = {}, known = {} } = {}) {
  const mobility = preferences.mobility || null;
  const idiomas = known.languages || [];
  const paisObjetivo = normalizarIdioma(known.target_country);
  const paisDeCasa = normalizarIdioma(known.home_country);

  const resultados = [];

  for (const { ciudad, pais } of todasLasCiudades()) {
    // Una ciudad sin universidades no es un destino de estudio. No es un
    // filtro de calidad: es que no hay nada que ir a estudiar.
    const universidades = ciudad.universities?.length || 0;
    if (!universidades) continue;

    const enCasa = paisDeCasa && normalizarIdioma(pais.name) === paisDeCasa;

    // La única preferencia que sí bloquea. A quien dijo que por ahora prefiere
    // quedarse, llenarle la pantalla de destinos extranjeros es ruido - y
    // además contradice lo que acaba de responder.
    if (mobility === "prefer_home" && paisDeCasa && !enCasa) continue;

    const razones = [];
    let fuerte = false;

    const idiomaOk = hablaElIdioma(ciudad, idiomas);
    if (idiomaOk === true) {
      razones.push({ key: "language", params: { language: ciudad.statistics.language } });
      fuerte = true;
    } else if (idiomaOk === false) {
      razones.push({ key: "otherLanguage", params: { language: ciudad.statistics.language } });
    }

    if (paisObjetivo && normalizarIdioma(pais.name) === paisObjetivo) {
      razones.push({ key: "targetCountry", params: { country: pais.name } });
      fuerte = true;
    }

    if (enCasa && mobility === "prefer_home") {
      razones.push({ key: "home", params: { country: pais.name } });
      fuerte = true;
    }

    razones.push({ key: "universities", params: { count: universidades } });

    // Lo que NO sabemos, dicho en la propia recomendación. Sin esto el
    // estudiante supone que la ausencia de pegas significa que no las hay.
    if (!ciudad.costOfLiving?.monthlyEstimate) {
      razones.push({ key: "checkCosts", params: {} });
    }

    resultados.push({
      tier: fuerte ? TIERS.STRONG : TIERS.EXPLORE,
      cityId: ciudad.id,
      city: ciudad,
      country: pais,
      reasons: razones,
    });
  }

  // El orden dentro de cada nivel va por CUÁNTAS señales encajan, no por
  // tamaño. Ordenando solo por número de universidades, el país que el
  // estudiante escribió como objetivo quedaba sexto por debajo de ciudades
  // que solo coincidían en el idioma: la señal más explícita que existe -
  // alguien tecleó ese país a mano - enterrada por una que se deduce.
  const FUERZA = { targetCountry: 3, home: 3, language: 1 };
  const señales = (r) => r.reasons.reduce((n, x) => n + (FUERZA[x.key] || 0), 0);

  const peso = (r) => (r.tier === TIERS.STRONG ? 0 : 1);
  resultados.sort(
    (a, b) => peso(a) - peso(b)
      || señales(b) - señales(a)
      || (b.city.universities?.length || 0) - (a.city.universities?.length || 0)
      || a.city.name.localeCompare(b.city.name),
  );
  return resultados;
}

/** Lo que hace falta para pedir una recomendación, en una sola petición. */
export async function loadDestinationInputs() {
  const token = localStorage.getItem("futurePilotAuthToken");
  if (!token) return { preferences: {}, known: {} };
  try {
    const r = await fetch("/api/v1/me/preferences", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return { preferences: {}, known: {} };
    const datos = await r.json();
    return { preferences: datos.preferences || {}, known: datos.known || {} };
  } catch {
    // Sin red no hay personalización, pero el globo sigue siendo el globo.
    return { preferences: {}, known: {} };
  }
}
