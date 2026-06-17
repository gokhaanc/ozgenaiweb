import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollTracker } from "@/components/ScrollTracker";
import { getSiteContent } from "@/content/site";
import { isLocale, locales, type Locale } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const content = getSiteContent(locale);

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const messages = await getMessages();
  const content = getSiteContent(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ScrollTracker />
      <div className="flex min-h-screen flex-col">
        <Navbar locale={locale} content={content} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} content={content} />
      </div>
      <CookieConsent content={content.consent} />
    </NextIntlClientProvider>
  );
}
