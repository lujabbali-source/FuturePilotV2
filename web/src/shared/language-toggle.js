// Los estilos viven en language-toggle.css: un <style> inyectado desde JS lo
// bloquea la CSP igual que uno escrito en el HTML, y asi ademas los
// empaqueta y minifica Vite.
import "./language-toggle.css";
// Selector de idioma flotante, presente en todas las paginas.
//
// Antes hablaba con window.FuturePilotI18n, el motor de traduccion hecho a
// mano. Ahora usa i18next directamente; el comportamiento visible es el
// mismo y el estado sigue viviendo en la misma clave de localStorage, asi
// que la eleccion se respeta tambien en el globo (que usa su propia
// instancia de i18next sobre los mismos archivos de locales).

import { currentLanguage, setLanguage, supportedLanguages } from "./i18next.js";

const LABELS = { en: "EN", es: "ES" };

const panel = document.createElement("div");
panel.id = "fpLanguageToggle";
panel.setAttribute("aria-label", "Language / Idioma");

function render() {
  const current = currentLanguage();
  panel.innerHTML = "";
  supportedLanguages.forEach((language) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = LABELS[language] || language.toUpperCase();
    button.className = language === current ? "is-active" : "";
    button.setAttribute("aria-pressed", String(language === current));
    button.addEventListener("click", async () => {
      await setLanguage(language);
      render();
    });
    panel.appendChild(button);
  });
}

function mount() {
  render();
  document.body.appendChild(panel);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
