import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";

type HeroProps = {
  locale: Locale;
  content: Pick<SiteContent, "hero">;
};

export function Hero({ content }: HeroProps) {
  const heroLines = content.hero.title.includes("\n")
    ? content.hero.title.split("\n")
    : content.hero.title.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [
        content.hero.title,
      ];

  return (
    <section className="relative isolate flex min-h-[62vh] items-center overflow-hidden bg-[#edf4ff] px-5 pb-12 pt-[7.25rem] md:min-h-[58vh] md:px-10 md:pb-14 md:pt-[8rem]">
      <Image
        src="/images/hero-systems-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-left opacity-90 md:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(247,250,255,0.26),rgba(247,250,255,0.62)_50%,rgba(246,248,251,0.95)_100%)]" />
      <div className="absolute inset-y-0 left-0 -z-10 w-3/4 bg-[radial-gradient(circle_at_12%_52%,rgba(37,99,235,0.22),transparent_46%)] md:w-1/2" />
      <div className="absolute inset-y-0 right-0 -z-10 w-2/3 bg-[radial-gradient(circle_at_92%_45%,rgba(30,64,175,0.18),transparent_44%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#f6f8fb] to-transparent" />
      <div className="mx-auto max-w-6xl text-center">
        <h1
          className="mx-auto flex max-w-7xl flex-col text-[clamp(1.7rem,5.8vw,4.55rem)] font-semibold leading-[0.95] tracking-normal text-slate-950 drop-shadow-[0_18px_42px_rgba(255,255,255,0.78)]"
          aria-label={content.hero.title.replace(/\n/g, " ")}
        >
          {heroLines.map((line, index) => (
            <span
              key={line}
              aria-hidden="true"
              className="hero-title-line whitespace-nowrap pb-2"
              style={
                {
                  "--hero-line-delay": `${120 + index * 120}ms`,
                } as CSSProperties
              }
            >
              {line.trim()}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-700 [text-wrap:balance] md:text-lg md:leading-8">
          {content.hero.description}
        </p>
        <div className="mx-auto mt-7 h-px max-w-2xl bg-gradient-to-r from-transparent via-[#1597d3]/60 to-transparent" />
      </div>
    </section>
  );
}
