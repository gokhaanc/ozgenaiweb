"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";

type LanguageSwitcherProps = {
  locale: Locale;
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  tr: "🇹🇷",
  de: "🇩🇪",
  fr: "🇫🇷",
  nl: "🇳🇱",
  it: "🇮🇹",
  es: "🇪🇸",
};

const localeCodes: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  nl: "NL",
  es: "ES",
  de: "DE",
  tr: "TR",
  it: "IT",
};

const languageOptions: Locale[] = ["en", "fr", "nl", "es", "de", "tr", "it"];

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    const parts = pathname.split("/");
    parts[1] = nextLocale;
    const nextPath = parts.join("/") || `/${nextLocale}`;
    const query = searchParams.toString();
    const hash = window.location.hash;

    try {
      window.localStorage.setItem("ozgenai-locale", nextLocale);
    } catch {
      // Locale switching should still work when browser storage is blocked.
    }
    trackEvent("language_change", { from: locale, to: nextLocale });
    router.push(`${query ? `${nextPath}?${query}` : nextPath}${hash}`);
  }

  return (
    <label className="inline-flex h-10 items-center rounded-[8px] border border-stone-200 bg-white px-2 text-sm font-semibold text-stone-700 shadow-sm">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        className="bg-transparent text-sm font-semibold outline-none"
        aria-label="Language"
      >
        {languageOptions.map((item) => (
          <option key={item} value={item}>
            {localeFlags[item]} {localeCodes[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
