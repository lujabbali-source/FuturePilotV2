import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import commonEn from "./locales/en/common.json";
import testEn from "./locales/en/test.json";
import globeEn from "./locales/en/globe.json";
import roadmapEn from "./locales/en/roadmap.json";
import citiesEn from "./locales/en/cities.json";
import loginEn from "./locales/en/login.json";
import resultsEn from "./locales/en/results.json";
import commonEs from "./locales/es/common.json";
import testEs from "./locales/es/test.json";
import globeEs from "./locales/es/globe.json";
import roadmapEs from "./locales/es/roadmap.json";
import citiesEs from "./locales/es/cities.json";
import loginEs from "./locales/es/login.json";
import resultsEs from "./locales/es/results.json";

export const supportedLanguages = ["en", "es"];
export const defaultLanguage = "en";

const resources = {
  en: { common: commonEn, test: testEn, globe: globeEn, roadmap: roadmapEn, cities: citiesEn, login: loginEn, results: resultsEn },
  es: { common: commonEs, test: testEs, globe: globeEs, roadmap: roadmapEs, cities: citiesEs, login: loginEs, results: resultsEs },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    ns: ["common", "test", "globe", "roadmap", "cities", "login", "results"],
    defaultNS: "common",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "futurepilotLanguage",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  });

export default i18n;
