import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "./TopNav.css";

const AUTH_TOKEN_KEY = "futurePilotAuthToken";

// Los mismos enlaces, en el mismo orden y con las mismas etiquetas que la
// cabecera del resto del sitio (shared/site-header.js). El globo no puede
// montar esa cabecera porque es una app de React aparte con su propio chrome
// sobre el <Canvas>, pero antes eso significaba que aqui solo habia marca e
// idioma: entrabas al globo y no habia forma de ir a ningun otro lado. La
// pantalla mas inmersiva del producto era tambien un callejon sin salida.
const LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/careers", key: "nav.careers" },
  { href: "/globe", key: "nav.globe" },
  { href: "/passport", key: "nav.passport", requiresSession: true },
];

export default function TopNav() {
  const { t } = useTranslation("globe");
  const signedIn = Boolean(localStorage.getItem(AUTH_TOKEN_KEY));

  return (
    <nav className="top-nav" aria-label={t("explore")}>
      <a className="top-nav__brand" href="/">
        <img className="top-nav__mark" src="/Frontend/futurepilot-logo-transparent.png" alt="" />
        <div>
          <strong>{t("brand.name", { ns: "common" })}</strong>
          <span>{t("globalView")}</span>
        </div>
      </a>

      <div className="top-nav__links">
        {LINKS.filter((link) => !link.requiresSession || signedIn).map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="top-nav__link"
            /* El globo es la pagina actual: se marca, o el estudiante no sabe
               en cual de las cuatro esta parado. */
            aria-current={link.href === "/globe" ? "page" : undefined}
          >
            {t(link.key, { ns: "site" })}
          </a>
        ))}
      </div>

      <div className="top-nav__actions">
        {/* Reabrir la guia sin tener que borrar nada. Quien ya respondio la
            pregunta de movilidad no vuelve a ver el arranque automatico, y
            sin esto no tendria forma de leer las instrucciones otra vez. */}
        <button
          type="button"
          className="top-nav__help"
          onClick={() => document.dispatchEvent(new CustomEvent("futurepilot:globe-guide"))}
          title={t("guide.reopen")}
        >
          <span aria-hidden="true">?</span>
          <span className="top-nav__help-text">{t("guide.reopen")}</span>
        </button>
        <a className="top-nav__back" href={signedIn ? "/assessment" : "/login"}>
          {t(signedIn ? "nav.myAccount" : "nav.signin", { ns: "site" })}
        </a>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
