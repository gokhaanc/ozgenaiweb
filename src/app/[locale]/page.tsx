import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { ImpactStats } from "@/components/ImpactStats";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesTabs } from "@/components/ServicesTabs";
import { TechStackStrip } from "@/components/TechStackStrip";
import { WorkSection } from "@/components/WorkSection";
import { getSiteContent } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/routing";
import { isServiceSlug, type ServiceSlug } from "@/lib/routes";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    service?: string | string[];
  }>;
};

export default async function HomePage({ params, searchParams }: HomePageProps) {
  const [{ locale: rawLocale }, query] = await Promise.all([params, searchParams]);
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const serviceValue = Array.isArray(query.service)
    ? query.service[0]
    : query.service;
  const initialService = isServiceSlug(serviceValue)
    ? (serviceValue as ServiceSlug)
    : undefined;
  const content = getSiteContent(locale);

  return (
    <>
      <Hero locale={locale} content={content} />
      <TechStackStrip content={content.techStack} />
      <section className="mx-auto flex min-h-[100svh] w-[min(100%_-_40px,1200px)] flex-col justify-center gap-5 py-8 md:py-10">
        <ImpactStats locale={locale} />
        <ProcessSection content={content.process} embedded />
      </section>
      <ServicesTabs locale={locale} content={content.services} />
      <WorkSection locale={locale} content={content.work} />
      <ContactSection
        locale={locale}
        content={content}
        initialService={initialService}
      />
    </>
  );
}
