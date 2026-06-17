"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { ServiceContent, SiteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";
import { contactPath, type ServiceSlug } from "@/lib/routes";
import { TrackedLink } from "./TrackedLink";

type ServicesTabsProps = {
  locale: Locale;
  content: SiteContent["services"];
};

export function ServicesTabs({ locale, content }: ServicesTabsProps) {
  const [activeSlug, setActiveSlug] = useState<ServiceSlug>(
    content.items[0].slug as ServiceSlug,
  );
  const [userControlled, setUserControlled] = useState(false);

  const serviceSlugs = useMemo(
    () => content.items.map((item) => item.slug as ServiceSlug),
    [content.items],
  );

  const active = useMemo(
    () =>
      content.items.find((item) => item.slug === activeSlug) ??
      content.items[0],
    [activeSlug, content.items],
  ) as ServiceContent;

  function selectService(slug: ServiceSlug) {
    setUserControlled(true);
    setActiveSlug(slug);
    trackEvent("service_tab_click", { service: slug });
  }

  useEffect(() => {
    if (userControlled) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlug((current) => {
        const currentIndex = serviceSlugs.indexOf(current);
        return serviceSlugs[(currentIndex + 1) % serviceSlugs.length];
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [serviceSlugs, userControlled]);

  useEffect(() => {
    function handleNodeSelect(event: Event) {
      const slug = (event as CustomEvent<{ slug?: ServiceSlug }>).detail?.slug;

      if (!slug || !serviceSlugs.includes(slug)) {
        return;
      }

      setUserControlled(true);
      setActiveSlug(slug);
      trackEvent("service_tab_click", { service: slug, source: "network_node" });
    }

    window.addEventListener("ozgenai:select-service", handleNodeSelect);

    return () => {
      window.removeEventListener("ozgenai:select-service", handleNodeSelect);
    };
  }, [serviceSlugs]);

  return (
    <section
      id="services"
      className="mx-auto flex min-h-[100svh] w-[min(100%_-_40px,1200px)] flex-col justify-start py-8 md:py-10"
    >
      <div className="relative h-auto overflow-hidden rounded-[28px] border border-slate-200/90 bg-[#f8fbff] shadow-2xl shadow-slate-900/7 lg:h-[calc(100svh-8rem)] lg:min-h-[700px] lg:max-h-[780px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.06)_1px,transparent_1px)] bg-[size:46px_46px]" />
        <div className="absolute -right-28 top-4 h-96 w-96 rounded-full border border-[#1597d3]/18" />
        <div className="absolute bottom-0 right-0 h-1/2 w-2/3 bg-[radial-gradient(circle_at_70%_55%,rgba(21,151,211,.18),transparent_48%)]" />
        <div className="relative min-h-[620px] p-4 md:p-5 lg:h-full lg:min-h-0 lg:p-6">
          <div className="relative z-30 flex min-h-16 flex-col gap-3 rounded-[20px] border border-white/80 bg-white/72 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl lg:flex-row lg:items-center lg:gap-4">
            <div className="flex shrink-0 items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1597d3]" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-[#123f8c]" />
            </div>
            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {content.items.map((item) => {
                const slug = item.slug as ServiceSlug;
                const isActive = activeSlug === slug;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    className={`service-app-tab flex h-10 min-w-fit flex-1 items-center justify-center rounded-full border px-4 text-sm font-semibold transition duration-500 ${
                      isActive
                        ? "is-active border-[#123f8c] bg-[#06101f] text-white shadow-lg shadow-[#123f8c]/18"
                        : "border-transparent bg-white/52 text-slate-600 hover:border-slate-200 hover:bg-white/78 hover:text-slate-950"
                    }`}
                    onClick={() => selectService(slug)}
                  >
                    <span className="relative z-10 whitespace-nowrap">
                      {item.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-[8rem] right-4 top-[6.35rem] hidden w-[68%] overflow-hidden rounded-[26px] border border-white/90 bg-white/66 shadow-[0_32px_90px_rgba(18,63,140,0.13)] backdrop-blur lg:block">
            <div className="absolute inset-x-0 top-0 h-12 border-b border-slate-200/80 bg-white/70" />
            <div className="absolute left-8 top-5 h-2 w-24 rounded-full bg-slate-200" />
            <div className="absolute right-8 top-5 h-2 w-36 rounded-full bg-slate-200/80" />
            <div className="absolute inset-x-8 bottom-8 top-16">
              <Image
                key={active.image}
                src={active.image}
                alt={active.imageAlt}
                width={1344}
                height={768}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-full w-full rounded-[22px] object-contain"
                priority={active.slug === "ai-donusumu"}
              />
            </div>
          </div>

          <div className="relative z-20 mt-4 lg:h-[calc(100%_-_5.25rem)]">
            <div className="flex max-w-[35rem] flex-col rounded-[24px] border border-white/85 bg-white/88 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-7 lg:h-[448px]">
              <div className="mb-5 h-px w-full bg-gradient-to-r from-slate-200 via-slate-300 to-transparent" />
              <h3 className="text-3xl font-semibold leading-[1.03] text-slate-950 md:text-5xl lg:text-[2.42rem] xl:text-[2.55rem]">
                {active.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-[1.05rem]">
                {active.description}
              </p>
              <div className="mt-auto grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <p className="min-h-[3.25rem] max-w-sm text-[0.92rem] font-semibold leading-6 text-slate-800">
                  {active.result}
                </p>
                <TrackedLink
                  href={contactPath(locale, active.slug as ServiceSlug)}
                  eventLabel={`service_${active.slug}`}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#06101f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#123f8c]/16 transition hover:bg-[#123f8c]"
                >
                  {active.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[24px] border border-white/85 bg-white/70 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.09)] backdrop-blur-xl lg:hidden">
              <Image
                key={active.image}
                src={active.image}
                alt={active.imageAlt}
                width={1344}
                height={768}
                sizes="100vw"
                className="h-full w-full rounded-[18px] object-contain"
                priority={active.slug === "ai-donusumu"}
              />
            </div>

            <ul className="mt-4 grid max-w-5xl gap-3 sm:grid-cols-2 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:grid-cols-4">
              {active.features.map((feature, featureIndex) => (
                <li
                  key={`${active.slug}-${feature}`}
                  className="service-feature-card min-h-24 rounded-[18px] border border-white/85 bg-white/82 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                  style={{ "--feature-delay": `${featureIndex * 500}ms` } as CSSProperties}
                >
                  <div className="mb-5 h-px w-full bg-gradient-to-r from-[#1597d3]/45 via-slate-200 to-transparent" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
