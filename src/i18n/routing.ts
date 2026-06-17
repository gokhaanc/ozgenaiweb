import { defineRouting } from "next-intl/routing";

export const locales = ["en", "tr", "de", "fr", "nl", "it", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  fr: "Français",
  nl: "Nederlands",
  it: "Italiano",
  es: "Español",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
