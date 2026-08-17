// Sistema visual de sellos del Pasaporte FuturePilot.
//
// Un sello NO es un badge: es tinta estampada sobre papel. Eso impone tres
// cosas que un badge de app no tiene, y que este modulo resuelve:
//
//   1. FORMA PROPIA POR TIPO. Una ciudad no se sella igual que un pais ni
//      que una universidad. Cada `type` que emite el backend
//      (ver _award_passport_stamps en app.py) tiene aqui su geometria:
//      rectangular horizontal, vertical, circular, hexagonal, irregular.
//
//   2. IMPERFECCION ESTABLE. Un sello real nunca cae recto ni entinta
//      parejo. La rotacion, el desplazamiento y la densidad de tinta salen
//      de un hash de la CLAVE del sello, no de Math.random: asi el mismo
//      sello se ve idéntico en cada carga - si bailara al recargar, se
//      notaria que es dibujado, que es justo lo contrario del efecto.
//
//   3. TINTA, NO RELLENO. Se dibujan con trazo, opacidad parcial y
//      `mix-blend-mode: multiply` (en la hoja de estilos) para que el color
//      se integre con el papel en vez de flotar encima.
//
// La rareza solo cambia el color de la tinta y el grosor del marco. No hay
// destellos ni "legendario": es una coleccion, no un videojuego.
//
// El texto GRABADO en los sellos (CITY, EXPLORED, MILESTONE...) va siempre en
// ingles, y es a proposito: un sello de inmigracion real tampoco cambia de
// idioma segun quien lo mire. Lo unico que sigue al idioma de la aplicacion
// es el formato de la fecha.

import { currentLanguage } from "../shared/i18next.js";

/** Hash determinista y pequeño de una cadena. Da los mismos numeros para la
 *  misma clave, que es lo que hace estables las imperfecciones. */
function hashKey(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Variaciones visuales de un sello concreto, siempre las mismas. */
function quirks(key) {
  const hash = hashKey(key);
  return {
    rotation: ((hash % 900) / 100 - 4.5).toFixed(2), // -4.5º a +4.5º
    offsetX: ((hash >> 3) % 9) - 4,
    offsetY: ((hash >> 6) % 7) - 3,
    // Cuanta tinta agarro: unos salen mas marcados que otros.
    ink: (0.72 + ((hash >> 9) % 24) / 100).toFixed(2),
    seed: hash % 100,
  };
}

// La rareza se lee en el color de la tinta, no en un adorno. Los cuatro
// tonos salen de la paleta de FuturePilot.
const INK = {
  common: { stroke: "#1f7a5a", label: "#186049" },
  special: { stroke: "#0f766e", label: "#0b5a54" },
  rare: { stroke: "#0e7490", label: "#0b5a70" },
  milestone: { stroke: "#166534", label: "#14532d" },
};

const RARITY_LABEL = {
  common: "", // lo comun no necesita anunciarse
  special: "SPECIAL",
  rare: "RARE",
  milestone: "MILESTONE",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

/** Recorta un texto largo para que no reviente la caja del sello. */
function fit(text, max) {
  const clean = String(text ?? "").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

function year(iso) {
  if (!iso) return "";
  const date = new Date(iso.endsWith?.("Z") || iso.includes?.("+") ? iso : `${iso}Z`);
  return Number.isNaN(date.getTime()) ? "" : String(date.getFullYear());
}

function shortDate(iso) {
  if (!iso) return "";
  const date = new Date(iso.endsWith?.("Z") || iso.includes?.("+") ? iso : `${iso}Z`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(currentLanguage(), { day: "2-digit", month: "short" }).toUpperCase();
}

// --------------------------------------------------------------------------
// Geometrias. Cada una devuelve el interior de un <svg> de 100x100 unidades;
// el CSS decide el tamaño real. Trabajar en un lienzo cuadrado permite
// rotarlos sin recalcular nada.
// --------------------------------------------------------------------------

/** CIUDAD - rectangulo horizontal con un perfil de skyline abstracto.
 *  Es el sello mas frecuente, asi que es tambien el mas sobrio. */
function cityStamp(stamp, ink) {
  const skyline = [18, 34, 26, 44, 30, 52, 24, 38].map((h, i) =>
    `<rect x="${22 + i * 7}" y="${74 - h / 3}" width="5" height="${h / 3}" />`
  ).join("");
  return `
    <rect x="8" y="24" width="84" height="52" rx="3" fill="none" stroke="${ink.stroke}" stroke-width="2.5"/>
    <rect x="12" y="28" width="76" height="44" rx="1.5" fill="none" stroke="${ink.stroke}" stroke-width="0.8" opacity=".55"/>
    <text x="50" y="41" text-anchor="middle" class="fp-stamp__kicker">CITY</text>
    <text x="50" y="55" text-anchor="middle" class="fp-stamp__name">${escapeHtml(fit(stamp.subject_label || stamp.label, 14))}</text>
    <g fill="${ink.stroke}" opacity=".45">${skyline}</g>
    <text x="50" y="70" text-anchor="middle" class="fp-stamp__meta">EXPLORED · ${escapeHtml(shortDate(stamp.earned_at))}</text>
  `;
}

/** UNIVERSIDAD - vertical, con un arco que evoca una portada academica. */
function universityStamp(stamp, ink) {
  return `
    <path d="M22 16 h56 a4 4 0 0 1 4 4 v60 a4 4 0 0 1-4 4 h-56 a4 4 0 0 1-4-4 v-60 a4 4 0 0 1 4-4 z"
          fill="none" stroke="${ink.stroke}" stroke-width="2.5"/>
    <path d="M32 44 a18 18 0 0 1 36 0" fill="none" stroke="${ink.stroke}" stroke-width="1.6" opacity=".7"/>
    <path d="M50 24 l14 8 -14 8 -14 -8 z" fill="none" stroke="${ink.stroke}" stroke-width="1.6"/>
    <line x1="26" y1="52" x2="74" y2="52" stroke="${ink.stroke}" stroke-width="0.8" opacity=".5"/>
    <text x="50" y="62" text-anchor="middle" class="fp-stamp__kicker">UNIVERSITY</text>
    <text x="50" y="71" text-anchor="middle" class="fp-stamp__kicker">DISCOVERY</text>
    <text x="50" y="80" text-anchor="middle" class="fp-stamp__name fp-stamp__name--sm">${escapeHtml(fit(stamp.subject_label || stamp.label, 18))}</text>
  `;
}

/** PAIS - circular con doble anillo y la bandera al centro. El clasico. */
function countryStamp(stamp, ink) {
  const flag = stamp.metadata?.flag || "";
  return `
    <circle cx="50" cy="50" r="40" fill="none" stroke="${ink.stroke}" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="${ink.stroke}" stroke-width="0.9" opacity=".6"/>
    <path id="arcTop-${escapeHtml(stamp.key)}" d="M50 50 m-27 0 a27 27 0 0 1 54 0" fill="none"/>
    <text class="fp-stamp__kicker">
      <textPath href="#arcTop-${escapeHtml(stamp.key)}" startOffset="50%" text-anchor="middle">COUNTRY EXPLORER</textPath>
    </text>
    <text x="50" y="52" text-anchor="middle" class="fp-stamp__flag">${escapeHtml(flag)}</text>
    <text x="50" y="66" text-anchor="middle" class="fp-stamp__name fp-stamp__name--sm">${escapeHtml(fit(stamp.subject_label || stamp.label, 16))}</text>
    <text x="50" y="76" text-anchor="middle" class="fp-stamp__meta">${escapeHtml(year(stamp.earned_at))}</text>
  `;
}

/** CONTINENTE - hexagono. Se gana con recorrido, asi que pesa mas. */
function continentStamp(stamp, ink) {
  const count = stamp.metadata?.countries;
  return `
    <path d="M50 8 L86 29 V71 L50 92 L14 71 V29 Z" fill="none" stroke="${ink.stroke}" stroke-width="2.8"/>
    <path d="M50 15 L80 32.5 V67.5 L50 85 L20 67.5 V32.5 Z" fill="none" stroke="${ink.stroke}" stroke-width="0.9" opacity=".55"/>
    <text x="50" y="42" text-anchor="middle" class="fp-stamp__name">${escapeHtml(fit(stamp.subject_label || stamp.label, 12))}</text>
    <line x1="30" y1="47" x2="70" y2="47" stroke="${ink.stroke}" stroke-width="0.8" opacity=".6"/>
    <text x="50" y="58" text-anchor="middle" class="fp-stamp__kicker">EXPLORER</text>
    ${count ? `<text x="50" y="72" text-anchor="middle" class="fp-stamp__meta">${count} COUNTRIES</text>` : ""}
  `;
}

/** ROADMAP - horizontal, con la ruta dibujada como una linea de nodos. */
function roadmapStamp(stamp, ink) {
  const nodes = [24, 42, 60, 78].map((x, i) =>
    `<circle cx="${x}" cy="58" r="${i === 3 ? 4 : 2.6}" fill="${i === 3 ? ink.stroke : "none"}" stroke="${ink.stroke}" stroke-width="1.6"/>`
  ).join("");
  return `
    <rect x="6" y="28" width="88" height="44" rx="2" fill="none" stroke="${ink.stroke}" stroke-width="2.5"/>
    <text x="50" y="44" text-anchor="middle" class="fp-stamp__kicker">ROADMAP</text>
    <text x="50" y="52" text-anchor="middle" class="fp-stamp__kicker">CREATED</text>
    <line x1="24" y1="58" x2="78" y2="58" stroke="${ink.stroke}" stroke-width="1.2" opacity=".65" stroke-dasharray="3 3"/>
    ${nodes}
    <text x="50" y="69" text-anchor="middle" class="fp-stamp__meta">${escapeHtml(shortDate(stamp.earned_at))}</text>
  `;
}

/** META ACADEMICA - irregular, como estampado a mano y algo torcido. */
function academicGoalStamp(stamp, ink) {
  return `
    <path d="M14 30 L88 22 L92 68 L20 78 Z" fill="none" stroke="${ink.stroke}" stroke-width="2.6"/>
    <path d="M20 35 L82 28 L85 63 L25 72 Z" fill="none" stroke="${ink.stroke}" stroke-width="0.8" opacity=".5"/>
    <text x="52" y="43" text-anchor="middle" class="fp-stamp__kicker">ACADEMIC</text>
    <text x="52" y="52" text-anchor="middle" class="fp-stamp__kicker">GOAL</text>
    <text x="52" y="64" text-anchor="middle" class="fp-stamp__name fp-stamp__name--sm">${escapeHtml(fit(stamp.subject_label || stamp.label, 16))}</text>
  `;
}

/** PERFIL VOCACIONAL - circular con anillos concentricos. */
function assessmentStamp(stamp, ink) {
  return `
    <circle cx="50" cy="50" r="38" fill="none" stroke="${ink.stroke}" stroke-width="2.6"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="${ink.stroke}" stroke-width="0.8" opacity=".5"/>
    <circle cx="50" cy="50" r="22" fill="none" stroke="${ink.stroke}" stroke-width="0.8" opacity=".35"/>
    <text x="50" y="44" text-anchor="middle" class="fp-stamp__kicker">VOCATIONAL</text>
    <text x="50" y="54" text-anchor="middle" class="fp-stamp__kicker">PROFILE</text>
    <text x="50" y="68" text-anchor="middle" class="fp-stamp__meta">${escapeHtml(shortDate(stamp.earned_at))}</text>
  `;
}

/** MENTOR - cuadrado pequeño, el mas discreto de todos. */
function mentorStamp(stamp, ink) {
  return `
    <rect x="22" y="22" width="56" height="56" rx="2" fill="none" stroke="${ink.stroke}" stroke-width="2.4"/>
    <path d="M34 44 h32 M34 52 h24" stroke="${ink.stroke}" stroke-width="1.6" opacity=".7"/>
    <text x="50" y="36" text-anchor="middle" class="fp-stamp__kicker">MENTOR</text>
    <text x="50" y="68" text-anchor="middle" class="fp-stamp__meta">${escapeHtml(year(stamp.earned_at))}</text>
  `;
}

const GEOMETRY = {
  city: cityStamp,
  university: universityStamp,
  country: countryStamp,
  continent: continentStamp,
  roadmap: roadmapStamp,
  academic_goal: academicGoalStamp,
  assessment: assessmentStamp,
  mentor: mentorStamp,
};

/** Un tipo que no conozcamos todavia no debe romper la pagina: se dibuja
 *  con un marco neutro y su etiqueta. Asi el backend puede emitir tipos
 *  nuevos antes de que exista su diseño. */
function fallbackStamp(stamp, ink) {
  return `
    <rect x="12" y="30" width="76" height="40" rx="2" fill="none" stroke="${ink.stroke}" stroke-width="2.4"/>
    <text x="50" y="54" text-anchor="middle" class="fp-stamp__name fp-stamp__name--sm">${escapeHtml(fit(stamp.label, 16))}</text>
  `;
}

/** Devuelve el HTML de un sello listo para insertar en una pagina. */
export function renderStamp(stamp) {
  const ink = INK[stamp.rarity] || INK.common;
  const draw = GEOMETRY[stamp.type] || fallbackStamp;
  const { rotation, offsetX, offsetY, ink: opacity } = quirks(stamp.key);
  const rareza = RARITY_LABEL[stamp.rarity] || "";

  // Las variaciones viajan como data-* y se aplican con CSSOM en
  // applyStampQuirks: un atributo style= lo bloquea la CSP del sitio
  // (style-src sin 'unsafe-inline'), y el sello saldria recto y plano.
  return `
    <figure class="fp-stamp fp-stamp--${escapeHtml(stamp.type)} fp-stamp--${escapeHtml(stamp.rarity)}"
            data-rotation="${rotation}" data-x="${offsetX}" data-y="${offsetY}" data-ink="${opacity}"
            title="${escapeHtml(stamp.label)}">
      <svg viewBox="0 0 100 100" role="img" aria-label="${escapeHtml(stamp.label)}">
        ${draw(stamp, ink)}
      </svg>
      ${rareza ? `<figcaption class="fp-stamp__rarity">${rareza}</figcaption>` : ""}
    </figure>
  `;
}

/** Aplica las imperfecciones a los sellos ya insertados en el DOM.
 *
 *  Va aparte del HTML porque son custom properties y la CSP no permite
 *  atributos style=. Hay que llamarla despues de pintar una pagina. */
export function applyStampQuirks(root) {
  root.querySelectorAll(".fp-stamp[data-rotation]").forEach((element) => {
    element.style.setProperty("--stamp-rotation", `${element.dataset.rotation}deg`);
    element.style.setProperty("--stamp-x", `${element.dataset.x}px`);
    element.style.setProperty("--stamp-y", `${element.dataset.y}px`);
    element.style.setProperty("--stamp-ink", element.dataset.ink);
  });
}

/** Marca de agua para las paginas de sellos que todavia estan vacias: el
 *  pasaporte empieza casi en blanco y eso hay que enseñarlo, no esconderlo. */
export function renderEmptySlot(index) {
  return `<div class="fp-stamp-slot" aria-hidden="true"><span>${String(index + 1).padStart(2, "0")}</span></div>`;
}

export const STAMP_TYPES = Object.keys(GEOMETRY);
