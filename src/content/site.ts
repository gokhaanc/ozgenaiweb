import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import nl from "./nl.json";
import tr from "./tr.json";
import type { Locale } from "@/i18n/routing";

export const siteContent = {
  de,
  en,
  es,
  fr,
  it,
  nl,
  tr,
} as const;

export type SiteContent = typeof en;
export type ServiceContent = SiteContent["services"]["items"][number];

export function getSiteContent(locale: Locale): SiteContent {
  return siteContent[locale] ?? siteContent.en;
}
