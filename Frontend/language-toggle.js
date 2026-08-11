(() => {
  if (!window.FuturePilotI18n) return;

  const style = document.createElement("style");
  style.textContent = `
    #fpLanguageToggle {
      position: fixed;
      top: 18px;
      right: 18px;
      z-index: 9998;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 4px;
      border-radius: 999px;
      background: rgba(4, 10, 8, .55);
      border: 1px solid rgba(255,255,255,.12);
      backdrop-filter: blur(10px);
      font: 600 .74rem/1 Inter, Arial, sans-serif;
    }
    #fpLanguageToggle button {
      padding: 7px 12px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: rgba(255,255,255,.6);
      cursor: pointer;
      transition: background .2s ease, color .2s ease;
    }
    #fpLanguageToggle button.is-active {
      background: #00FFB3;
      color: #04150f;
    }
  `;

  const panel = document.createElement("div");
  panel.id = "fpLanguageToggle";
  panel.setAttribute("aria-label", "Language / Idioma");

  const languages = window.FuturePilotI18n.supportedLanguages;
  const labels = { en: "EN", es: "ES" };

  function render() {
    const current = window.FuturePilotI18n.getLanguage();
    panel.innerHTML = "";
    languages.forEach((language) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = labels[language] || language.toUpperCase();
      button.className = language === current ? "is-active" : "";
      button.addEventListener("click", () => {
        window.FuturePilotI18n.setLanguage(language);
        render();
      });
      panel.appendChild(button);
    });
  }

  render();
  document.head.appendChild(style);
  document.body.appendChild(panel);
})();
