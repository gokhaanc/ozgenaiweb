import { redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/routing";
import { contactPath, isServiceSlug } from "@/lib/routes";

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    service?: string | string[];
  }>;
};

export default async function ContactPage({ params, searchParams }: ContactPageProps) {
  const [{ locale: rawLocale }, query] = await Promise.all([params, searchParams]);
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const serviceValue = Array.isArray(query.service)
    ? query.service[0]
    : query.service;

  redirect(
    isServiceSlug(serviceValue)
      ? contactPath(locale, serviceValue)
      : contactPath(locale),
  );
}
