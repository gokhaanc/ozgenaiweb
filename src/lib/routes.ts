import type { Locale } from "@/i18n/routing";

export const serviceSlugs = [
  "ai-donusumu",
  "web-sitesi",
  "reklam",
  "uygulama",
  "danismanlik",
  "marketing",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: unknown): value is ServiceSlug {
  return (
    typeof value === "string" &&
    serviceSlugs.includes(value as ServiceSlug)
  );
}

export function localizedPath(
  locale: Locale,
  path: "/" | "/about" | "/contact" = "/",
) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function contactPath(locale: Locale, service?: ServiceSlug) {
  const base = localizedPath(locale);
  return service ? `${base}?service=${service}#contact` : `${base}#contact`;
}
