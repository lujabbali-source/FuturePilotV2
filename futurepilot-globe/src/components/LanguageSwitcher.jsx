import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../i18n";
import "./LanguageSwitcher.css";

const languageMeta = {
  en: { flag: "🇺🇸", labelKey: "language.english" },
  es: { flag: "🇪🇸", labelKey: "language.spanish" },
};

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");
  const currentLanguage = i18n.resolvedLanguage?.split("-")[0] || "en";
  const current = languageMeta[currentLanguage] || languageMeta.en;

  const handleChange = (event) => {
    void i18n.changeLanguage(event.target.value);
  };

  return (
    <label className="language-switcher">
      <span className="language-switcher__icon" aria-hidden="true">{current.flag}</span>
      <span className="language-switcher__label">{t("language.label")}</span>
      <select
        aria-label={t("language.switchTo")}
        value={supportedLanguages.includes(currentLanguage) ? currentLanguage : "en"}
        onChange={handleChange}
      >
        {supportedLanguages.map((language) => (
          <option key={language} value={language}>
            {languageMeta[language].flag} {t(languageMeta[language].labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}
