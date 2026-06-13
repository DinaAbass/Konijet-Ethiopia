import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en";
import am from "./i18n/am";
import ar from "./i18n/ar";
import zh from "./i18n/zh";
import es from "./i18n/es";
import fr from "./i18n/fr";
import pt from "./i18n/pt";
import it from "./i18n/it";
import ru from "./i18n/ru";
import tr from "./i18n/tr";
import nl from "./i18n/nl";
import pl from "./i18n/pl";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "am", label: "አማርኛ", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "zh", label: "中文", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "pt", label: "Português", dir: "ltr" },
  { code: "it", label: "Italiano", dir: "ltr" },
  { code: "ru", label: "Русский", dir: "ltr" },
  { code: "tr", label: "Türkçe", dir: "ltr" },
  { code: "nl", label: "Nederlands", dir: "ltr" },
  { code: "pl", label: "Polski", dir: "ltr" },
] as const;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      ar: { translation: ar },
      zh: { translation: zh },
      es: { translation: es },
      fr: { translation: fr },
      pt: { translation: pt },
      it: { translation: it },
      ru: { translation: ru },
      tr: { translation: tr },
      nl: { translation: nl },
      pl: { translation: pl },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS.map(l => l.code),
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
  });

i18n.on("languageChanged", (lng: string) => {
  const meta = SUPPORTED_LANGS.find(l => l.code === lng);
  if (typeof document !== "undefined") {
    document.documentElement.dir = meta?.dir ?? "ltr";
    document.documentElement.lang = lng;
  }
});

export default i18n;
