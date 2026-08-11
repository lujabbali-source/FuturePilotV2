// Motor de traduccion minimo para el sitio vanilla (Frontend/). Comparte la
// misma clave de localStorage que el globo (web/src/i18n.js
// usa "futurepilotLanguage" via i18next-browser-languagedetector), asi que
// cambiar el idioma en cualquiera de los dos lados queda sincronizado con
// el otro. Solo cubre EN/ES y las claves que de verdad tienen texto
// traducido (ver data-i18n en index.html/login.html) - un data-i18n sin
// traduccion para el idioma activo simplemente no se toca.
(() => {
  const STORAGE_KEY = "futurepilotLanguage";
  const SUPPORTED = ["en", "es"];
  const DEFAULT_LANGUAGE = "en";

  const translations = {
    en: {
      "nav.home": "Home",
      "nav.careers": "Careers",
      "nav.assessment": "Assessment",
      "nav.globe": "Explore the Globe",
      "nav.roadmaps": "Roadmaps",
      "nav.passport": "My Passport",
      "nav.signin": "Sign In",
      "nav.myAccount": "My Account",

      "hero.badge": "🚀 Your Future Starts Here",
      "hero.title": "Navigate Your Future.<br>Build Your Destination.",
      "hero.subtitle": "Stop guessing your next step. Discover career paths, personalized roadmaps, and opportunities designed for ambitious students.",
      "hero.ctaPrimary": "Build My Flight Plan",
      "hero.ctaSecondary": "Explore the Globe",
      "hero.stat1": "Career Paths",
      "hero.stat2": "Learning Resources",
      "hero.stat3": "Possibilities",

      "features.heading": "What's Inside FuturePilot",
      "features.ai.title": "Personalized AI",
      "features.ai.desc": "An engine that analyzes your unique profile and matches you with careers that actually fit.",
      "features.globe.title": "Interactive Globe",
      "features.globe.desc": "Explore universities and opportunities across the continent on a 3D interactive globe.",
      "features.universities.title": "Universities & Countries",
      "features.universities.desc": "Compare real costs, programs and cities to make the decision that fits you best.",
      "features.roadmap.title": "Personalized Roadmap",
      "features.roadmap.desc": "A step-by-step plan generated from your profile to get where you want to be.",
      "features.recommendations.title": "Smart Recommendations",
      "features.recommendations.desc": "Suggestions that evolve with your progress and interests over time.",
      "features.academic.title": "Academic Development Plan",
      "features.academic.desc": "A clear path from where you are today to your ideal career.",

      "destinations.heading": "Where Do You Want To Go?",
      "destinations.ai.title": "AI & Technology",
      "destinations.ai.desc": "Artificial Intelligence, Software Engineering and Data Science.",
      "destinations.medicine.title": "Medicine & Health",
      "destinations.medicine.desc": "Medicine, Nursing and Healthcare careers.",
      "destinations.law.title": "Law & Social Sciences",
      "destinations.law.desc": "Law, Psychology and International Relations.",
      "destinations.business.title": "Business",
      "destinations.business.desc": "Business, Finance and Entrepreneurship.",
      "destinations.creative.title": "Creative Arts",
      "destinations.creative.desc": "Design, Media and Content Creation.",
      "destinations.science.title": "Science & Research",
      "destinations.science.desc": "Biology, Chemistry and Scientific Research.",

      "howitworks.heading": "How FuturePilot Works",
      "howitworks.discover.title": "Discover",
      "howitworks.discover.desc": "Take the Future Assessment and discover careers that fit you.",
      "howitworks.plan.title": "Plan",
      "howitworks.plan.desc": "Receive a personalized Flight Plan built around your goals.",
      "howitworks.achieve.title": "Achieve",
      "howitworks.achieve.desc": "Learn, build projects and track your progress.",

      "footer.tagline": "A clear path forward, from where you are today to your ideal career. FuturePilot guides you every step of the way.",
      "footer.platform": "Platform",
      "footer.legal": "Legal",
      "footer.support": "Support",
      "footer.supportNote": "Questions, suggestions or feedback:",
      "footer.terms": "Terms & Conditions",
      "footer.privacy": "Privacy Policy",
      "footer.rights": "All rights reserved.",
    },
    es: {
      "nav.home": "Inicio",
      "nav.careers": "Carreras",
      "nav.assessment": "Test",
      "nav.globe": "Explorar el Globo",
      "nav.roadmaps": "Roadmaps",
      "nav.passport": "Mi Pasaporte",
      "nav.signin": "Iniciar sesión",
      "nav.myAccount": "Mi cuenta",

      "hero.badge": "🚀 Tu futuro empieza aquí",
      "hero.title": "Navega tu futuro.<br>Construye tu destino.",
      "hero.subtitle": "Deja de adivinar tu siguiente paso. Descubre caminos de carrera, roadmaps personalizados y oportunidades diseñadas para estudiantes ambiciosos.",
      "hero.ctaPrimary": "Crear mi plan de vuelo",
      "hero.ctaSecondary": "Explorar el Globo",
      "hero.stat1": "Caminos de carrera",
      "hero.stat2": "Recursos de aprendizaje",
      "hero.stat3": "Posibilidades",

      "features.heading": "Qué encuentras en FuturePilot",
      "features.ai.title": "IA personalizada",
      "features.ai.desc": "Un motor que analiza tu perfil único y encuentra las carreras que realmente encajan contigo.",
      "features.globe.title": "Globo interactivo",
      "features.globe.desc": "Explora universidades y oportunidades en todo el continente sobre un globo 3D interactivo.",
      "features.universities.title": "Universidades y países",
      "features.universities.desc": "Compara costos, programas y ciudades reales para tomar la mejor decisión.",
      "features.roadmap.title": "Roadmap personalizado",
      "features.roadmap.desc": "Un plan paso a paso generado desde tu perfil para llegar a donde quieres estar.",
      "features.recommendations.title": "Recomendaciones inteligentes",
      "features.recommendations.desc": "Sugerencias que evolucionan con tu progreso e intereses con el tiempo.",
      "features.academic.title": "Plan de desarrollo académico",
      "features.academic.desc": "Un camino claro desde donde estás hoy hasta tu carrera ideal.",

      "destinations.heading": "¿A dónde quieres llegar?",
      "destinations.ai.title": "IA y Tecnología",
      "destinations.ai.desc": "Inteligencia Artificial, Ingeniería de Software y Ciencia de Datos.",
      "destinations.medicine.title": "Medicina y Salud",
      "destinations.medicine.desc": "Medicina, Enfermería y carreras de la salud.",
      "destinations.law.title": "Derecho y Ciencias Sociales",
      "destinations.law.desc": "Derecho, Psicología y Relaciones Internacionales.",
      "destinations.business.title": "Negocios",
      "destinations.business.desc": "Negocios, Finanzas y Emprendimiento.",
      "destinations.creative.title": "Artes Creativas",
      "destinations.creative.desc": "Diseño, Medios y Creación de Contenido.",
      "destinations.science.title": "Ciencia e Investigación",
      "destinations.science.desc": "Biología, Química e Investigación Científica.",

      "howitworks.heading": "Cómo funciona FuturePilot",
      "howitworks.discover.title": "Descubre",
      "howitworks.discover.desc": "Toma el Future Assessment y descubre carreras que encajan contigo.",
      "howitworks.plan.title": "Planea",
      "howitworks.plan.desc": "Recibe un Flight Plan personalizado construido alrededor de tus metas.",
      "howitworks.achieve.title": "Logra",
      "howitworks.achieve.desc": "Aprende, construye proyectos y sigue tu progreso.",

      "footer.tagline": "Un camino claro hacia adelante, desde donde estás hoy hasta tu carrera ideal. FuturePilot te guía en cada paso.",
      "footer.platform": "Plataforma",
      "footer.legal": "Legal",
      "footer.support": "Soporte",
      "footer.supportNote": "Dudas, sugerencias o comentarios:",
      "footer.terms": "Términos y Condiciones",
      "footer.privacy": "Política de Privacidad",
      "footer.rights": "Todos los derechos reservados.",
    },
  };

  function detectLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || "").slice(0, 2);
    return SUPPORTED.includes(nav) ? nav : DEFAULT_LANGUAGE;
  }

  let currentLanguage = detectLanguage();

  function t(key) {
    return (translations[currentLanguage] && translations[currentLanguage][key])
      || translations[DEFAULT_LANGUAGE][key]
      || key;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.documentElement.lang = currentLanguage;
    // Se dispara siempre (carga inicial y cada cambio de idioma) para que
    // otros scripts que sobreescriben texto segun estado (ej. site.js con
    // el link de "Sign In" -> "Mi cuenta" cuando hay sesion) puedan
    // reaplicar su logica DESPUES de esta pasada, sin depender del orden
    // en que se cargaron los <script>.
    document.dispatchEvent(new CustomEvent("futurepilot:translations-applied", { detail: { language: currentLanguage } }));
  }

  function setLanguage(language) {
    if (!SUPPORTED.includes(language)) return;
    currentLanguage = language;
    localStorage.setItem(STORAGE_KEY, language);
    applyTranslations();
  }

  window.FuturePilotI18n = {
    supportedLanguages: SUPPORTED,
    getLanguage: () => currentLanguage,
    setLanguage,
    t,
    applyTranslations,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations);
  } else {
    applyTranslations();
  }
})();
