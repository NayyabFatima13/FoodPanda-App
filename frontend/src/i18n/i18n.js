import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ur from "./locales/ur.json";

const savedLanguage =
  localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },

      ur: {
        translation: ur,
      },
    },

    lng: savedLanguage,

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

const updateDocumentDirection = (
  language
) => {
  const direction =
    language === "ur"
      ? "rtl"
      : "ltr";

  document.documentElement.dir =
    direction;

  document.documentElement.lang =
    language;
};

updateDocumentDirection(
  i18n.language
);

i18n.on(
  "languageChanged",
  updateDocumentDirection
);

export default i18n;