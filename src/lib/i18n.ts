import en from "@/../public/locales/en.json";
import zh from "@/../public/locales/zh.json";

const locales = { en, zh };

export function getTranslation(locale: "en" | "zh") {
  return locales[locale] || locales.en;
}