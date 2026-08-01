import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "./TopNav.css";

export default function TopNav() {
  const { t } = useTranslation("globe");

  return (
    <nav className="top-nav" aria-label={t("explore")}>
      <div className="top-nav__brand">
        <span className="top-nav__mark">✦</span>
        <div>
          <strong>{t("brand.name", { ns: "common" })}</strong>
          <span>{t("globalView")}</span>
        </div>
      </div>
      <div className="top-nav__actions">
        <a className="top-nav__back" href="/assessment">
          <span aria-hidden="true">←</span> {t("nav.backToResults")}
        </a>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
