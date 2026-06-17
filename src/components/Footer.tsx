import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { contactPath, localizedPath } from "@/lib/routes";
import { Logo } from "./Logo";

const footerLabels: Record<
  Locale,
  {
    menu: string;
    services: string;
    resources: string;
    legal: string;
    studio: string;
    clientStories: string;
    projectBrief: string;
    privacyAnalytics: string;
    cookieConsent: string;
    secureContact: string;
  }
> = {
  en: {
    menu: "Menu",
    services: "Services",
    resources: "Resources",
    legal: "Legal",
    studio: "Studio",
    clientStories: "Client stories",
    projectBrief: "Project brief",
    privacyAnalytics: "Privacy-first analytics",
    cookieConsent: "Cookie consent",
    secureContact: "Secure contact flow",
  },
  tr: {
    menu: "Menü",
    services: "Hizmetler",
    resources: "Kaynaklar",
    legal: "Güven",
    studio: "Stüdyo",
    clientStories: "Müşteri yorumları",
    projectBrief: "Proje brief'i",
    privacyAnalytics: "Gizlilik öncelikli ölçüm",
    cookieConsent: "Çerez onayı",
    secureContact: "Güvenli iletişim akışı",
  },
  de: {
    menu: "Menü",
    services: "Leistungen",
    resources: "Ressourcen",
    legal: "Vertrauen",
    studio: "Studio",
    clientStories: "Kundenstimmen",
    projectBrief: "Projektbriefing",
    privacyAnalytics: "Datenschutzbewusste Analytics",
    cookieConsent: "Cookie-Zustimmung",
    secureContact: "Sicherer Kontaktfluss",
  },
  fr: {
    menu: "Menu",
    services: "Services",
    resources: "Ressources",
    legal: "Confiance",
    studio: "Studio",
    clientStories: "Avis clients",
    projectBrief: "Brief projet",
    privacyAnalytics: "Analytics respectueux",
    cookieConsent: "Consentement cookies",
    secureContact: "Parcours contact sécurisé",
  },
  nl: {
    menu: "Menu",
    services: "Diensten",
    resources: "Bronnen",
    legal: "Vertrouwen",
    studio: "Studio",
    clientStories: "Klantverhalen",
    projectBrief: "Projectbrief",
    privacyAnalytics: "Privacygerichte analytics",
    cookieConsent: "Cookie-toestemming",
    secureContact: "Veilige contactflow",
  },
  it: {
    menu: "Menu",
    services: "Servizi",
    resources: "Risorse",
    legal: "Fiducia",
    studio: "Studio",
    clientStories: "Storie clienti",
    projectBrief: "Brief progetto",
    privacyAnalytics: "Analytics privacy-first",
    cookieConsent: "Consenso cookie",
    secureContact: "Flusso contatto sicuro",
  },
  es: {
    menu: "Menú",
    services: "Servicios",
    resources: "Recursos",
    legal: "Confianza",
    studio: "Estudio",
    clientStories: "Historias de clientes",
    projectBrief: "Brief de proyecto",
    privacyAnalytics: "Analytics con privacidad",
    cookieConsent: "Consentimiento cookies",
    secureContact: "Flujo de contacto seguro",
  },
};

type FooterProps = {
  locale: Locale;
  content: Pick<SiteContent, "footer" | "nav" | "services">;
};

export function Footer({ locale, content }: FooterProps) {
  const labels = footerLabels[locale];
  const menuLinks = [
    { href: "#services", label: content.nav.services },
    { href: "#work", label: content.nav.work },
    { href: localizedPath(locale, "/about"), label: content.nav.about },
    { href: contactPath(locale), label: content.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0 opacity-25">
        <div className="systems-map" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-10 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <Logo locale={locale} />
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
            {content.footer.tagline}
          </p>
          <div className="mt-8 rounded-[12px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-cyan-100">
              {content.nav.consultation}
            </p>
            <a
              href={contactPath(locale)}
              className="mt-3 inline-flex rounded-[8px] bg-[#123f8c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1597d3]"
            >
              {content.nav.contact}
            </a>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title={labels.menu}>
            {menuLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ),
            )}
          </FooterColumn>
          <FooterColumn title={labels.services}>
            {content.services.items.map((service) => (
              <a key={service.slug} href="#services" className="footer-link">
                {service.shortTitle}
              </a>
            ))}
          </FooterColumn>
          <FooterColumn title={labels.resources}>
            <Link href={localizedPath(locale, "/about")} className="footer-link">
              {labels.studio}
            </Link>
            <a href="#work" className="footer-link">
              {labels.clientStories}
            </a>
            <a href="#contact" className="footer-link">
              {labels.projectBrief}
            </a>
          </FooterColumn>
          <FooterColumn title={labels.legal}>
            <span className="footer-link text-left">{labels.privacyAnalytics}</span>
            <span className="footer-link text-left">{labels.cookieConsent}</span>
            <span className="footer-link text-left">{labels.secureContact}</span>
          </FooterColumn>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-5 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {content.footer.copyright}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-sm">{children}</div>
    </div>
  );
}
