import Image from "next/image";
import type { SiteContent } from "@/content/site";
import { getTestimonials } from "@/content/testimonials";
import type { Locale } from "@/i18n/routing";

type WorkSectionProps = {
  locale: Locale;
  content: SiteContent["work"];
};

const workNotes: Record<Locale, string> = {
  tr: "Gerçek müşteri deneyimleri.",
  en: "Real client experiences.",
  de: "Echte Kundenerfahrungen.",
  fr: "Retours clients réels.",
  nl: "Echte klantervaringen.",
  it: "Esperienze reali dei clienti.",
  es: "Experiencias reales de clientes.",
};

export function WorkSection({ locale, content }: WorkSectionProps) {
  const testimonials = getTestimonials(locale);

  return (
    <section id="work" className="section-shell relative">
      <div className="absolute inset-x-[-20px] top-20 -z-10 h-[72%] rounded-[36px] border border-slate-200/70 bg-white/45 shadow-2xl shadow-slate-900/5 backdrop-blur" />
      <div className="absolute inset-x-0 top-24 -z-10 h-[62%] bg-[linear-gradient(to_right,rgba(15,23,42,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 className="pt-4 text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-6xl">
            {content.title}
          </h2>
          {content.description ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {content.description}
            </p>
          ) : null}
        </div>
        <div className="hidden min-w-[13rem] rounded-2xl border border-white/80 bg-white/72 px-5 py-4 text-right shadow-xl shadow-slate-900/5 backdrop-blur-xl md:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#123f8c]">
            OzGen AI
          </p>
          <p className="mt-1 text-sm font-semibold leading-5 text-slate-700">
            {workNotes[locale]}
          </p>
        </div>
      </div>
      <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            className="group relative flex min-h-[23rem] overflow-hidden rounded-[22px] border border-white/85 bg-white/78 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(18,63,140,0.13)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1597d3] via-[#123f8c] to-transparent opacity-70" />
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-[#1597d3]/20 bg-[#1597d3]/5 transition duration-300 group-hover:scale-110" />
            <div className="relative flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-5xl font-semibold leading-none text-slate-200">
                  “
                </span>
                <span className="h-px w-20 bg-gradient-to-r from-transparent to-slate-200" />
              </div>
              <p className="text-[14.5px] leading-7 text-slate-700">
                {testimonial.quote}
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-slate-200/80 pt-5">
                <Image
                  src={testimonial.image}
                  alt=""
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] rounded-full object-cover ring-1 ring-slate-200 shadow-lg shadow-slate-900/8"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
