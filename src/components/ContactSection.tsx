import type { SiteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import type { ServiceSlug } from "@/lib/routes";
import { ContactForm } from "./ContactForm";

type ContactSectionProps = {
  locale: Locale;
  content: SiteContent;
  initialService?: ServiceSlug;
};

export function ContactSection({
  locale,
  content,
  initialService,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr]"
    >
      <div className="lg:sticky lg:top-32 lg:self-start">
        <h2 className="text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-6xl">
          {content.contact.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {content.contact.description}
        </p>
      </div>
      <ContactForm
        locale={locale}
        content={content.contact}
        services={content.services.items}
        initialService={initialService}
      />
    </section>
  );
}
