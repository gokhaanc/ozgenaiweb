import { ArrowRight } from "lucide-react";
import type { SiteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { contactPath } from "@/lib/routes";
import { TrackedLink } from "./TrackedLink";

type CtaSectionProps = {
  locale: Locale;
  content: SiteContent["cta"];
};

export function CtaSection({ locale, content }: CtaSectionProps) {
  return (
    <section className="section-shell pb-24">
      <div className="relative overflow-hidden rounded-[8px] bg-[#d6efe5] p-8 md:p-12">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-30 md:block">
          <div className="systems-map" />
        </div>
        <div className="relative max-w-2xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p className="mt-4 text-lg leading-8 text-stone-700">{content.description}</p>
          <TrackedLink
            href={contactPath(locale)}
            eventLabel="footer_cta"
            className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-[#06101f] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#123f8c]"
          >
            {content.button}
            <ArrowRight size={18} aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
