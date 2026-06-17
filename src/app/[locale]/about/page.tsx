import type { Metadata } from "next";
import { getSiteContent } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/routing";

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const content = getSiteContent(locale);

  return {
    title: content.about.metaTitle,
    description: content.about.metaDescription,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const content = getSiteContent(locale);

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-28">
      <p className="eyebrow">{content.about.eyebrow}</p>
      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-normal text-stone-950 md:text-7xl">
        {content.about.title}
      </h1>
      <p className="mt-6 max-w-3xl text-xl leading-8 text-stone-600">
        {content.about.description}
      </p>
      <div className="mt-12 grid gap-8 text-lg leading-8 text-stone-700">
        {content.about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-14 rounded-[8px] bg-white p-6 shadow-xl shadow-stone-950/5 md:p-8">
        <h2 className="text-3xl font-semibold text-stone-950">
          {content.about.principlesTitle}
        </h2>
        <ul className="mt-6 grid gap-4">
          {content.about.principles.map((principle) => (
            <li key={principle} className="border-l-2 border-[#123f8c] pl-4 text-stone-700">
              {principle}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
