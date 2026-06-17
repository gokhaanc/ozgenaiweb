"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";

type ImpactValue = number | [number, number];

type ImpactStat = {
  area: string;
  value: ImpactValue;
  decimals?: number;
  suffix: string;
  label: string;
  source: string;
};

const copy: Record<Locale, ImpactStat[]> = {
  en: [
    {
      area: "AI + automation",
      value: [60, 70],
      suffix: "%",
      label:
        "of employee time is tied to activities that current AI and automation can technically automate.",
      source: "McKinsey",
    },
    {
      area: "AI productivity",
      value: 40,
      suffix: "%",
      label:
        "performance lift reported for skilled workers using generative AI within its capability frontier.",
      source: "HBS / MIT Sloan",
    },
    {
      area: "Social demand",
      value: 76,
      suffix: "%",
      label:
        "of users say social content influenced a purchase in the last six months.",
      source: "Sprout Social",
    },
    {
      area: "Revenue lift",
      value: [5, 15],
      suffix: "%",
      label:
        "revenue lift McKinsey reports from personalization done well.",
      source: "McKinsey",
    },
    {
      area: "Marketing ROI",
      value: [10, 30],
      suffix: "%",
      label: "marketing ROI increase reported from strong personalization.",
      source: "McKinsey",
    },
  ],
  tr: [
    {
      area: "Yapay zeka + otomasyon",
      value: [60, 70],
      suffix: "%",
      label:
        "çalışan zamanını alan aktivitelerin teknik olarak AI ve otomasyonla otomatikleşme potansiyeli.",
      source: "McKinsey",
    },
    {
      area: "AI verimliliği",
      value: 40,
      suffix: "%",
      label:
        "doğru kullanım sınırında üretken AI kullanan nitelikli çalışanlarda raporlanan performans artışı.",
      source: "HBS / MIT Sloan",
    },
    {
      area: "Sosyal talep",
      value: 76,
      suffix: "%",
      label:
        "kullanıcı son 6 ayda sosyal içeriğin satın alma kararını etkilediğini söylüyor.",
      source: "Sprout Social",
    },
    {
      area: "Gelir artışı",
      value: [5, 15],
      suffix: "%",
      label:
        "iyi kişiselleştirme ile McKinsey'nin raporladığı gelir artışı.",
      source: "McKinsey",
    },
    {
      area: "Marketing ROI",
      value: [10, 30],
      suffix: "%",
      label:
        "güçlü kişiselleştirme ile raporlanan marketing ROI artışı.",
      source: "McKinsey",
    },
  ],
  de: [
    {
      area: "KI + Automation",
      value: [60, 70],
      suffix: "%",
      label:
        "der Arbeitszeit steckt in Taetigkeiten, die heutige KI und Automation technisch automatisieren koennen.",
      source: "McKinsey",
    },
    {
      area: "KI-Produktivitaet",
      value: 40,
      suffix: "%",
      label:
        "Leistungsplus fuer qualifizierte Mitarbeitende, wenn generative KI innerhalb ihrer Staerken genutzt wird.",
      source: "HBS / MIT Sloan",
    },
    {
      area: "Social Demand",
      value: 76,
      suffix: "%",
      label:
        "der Nutzer sagen, dass Social Content einen Kauf in den letzten sechs Monaten beeinflusst hat.",
      source: "Sprout Social",
    },
    {
      area: "Umsatzplus",
      value: [5, 15],
      suffix: "%",
      label:
        "Umsatzsteigerung, die McKinsey fuer gute Personalisierung berichtet.",
      source: "McKinsey",
    },
    {
      area: "Marketing ROI",
      value: [10, 30],
      suffix: "%",
      label:
        "Marketing-ROI-Steigerung durch starke Personalisierung.",
      source: "McKinsey",
    },
  ],
  fr: [
    {
      area: "IA + automatisation",
      value: [60, 70],
      suffix: "%",
      label:
        "du temps salarie est lie a des activites que l'IA actuelle et l'automatisation peuvent techniquement automatiser.",
      source: "McKinsey",
    },
    {
      area: "Productivite IA",
      value: 40,
      suffix: "%",
      label:
        "gain de performance observe chez des profils qualifies utilisant l'IA generative dans son domaine de force.",
      source: "HBS / MIT Sloan",
    },
    {
      area: "Demande sociale",
      value: 76,
      suffix: "%",
      label:
        "des utilisateurs disent qu'un contenu social a influence un achat dans les six derniers mois.",
      source: "Sprout Social",
    },
    {
      area: "Hausse revenu",
      value: [5, 15],
      suffix: "%",
      label:
        "hausse de revenu rapportee par McKinsey avec une personnalisation bien executee.",
      source: "McKinsey",
    },
    {
      area: "ROI marketing",
      value: [10, 30],
      suffix: "%",
      label:
        "hausse du ROI marketing avec une personnalisation solide.",
      source: "McKinsey",
    },
  ],
  nl: [
    {
      area: "AI + automatisering",
      value: [60, 70],
      suffix: "%",
      label:
        "van werktijd zit in activiteiten die huidige AI en automatisering technisch kunnen automatiseren.",
      source: "McKinsey",
    },
    {
      area: "AI-productiviteit",
      value: 40,
      suffix: "%",
      label:
        "prestatieverbetering bij kenniswerkers die generatieve AI binnen haar sterke gebied gebruiken.",
      source: "HBS / MIT Sloan",
    },
    {
      area: "Social vraag",
      value: 76,
      suffix: "%",
      label:
        "van gebruikers zegt dat social content een aankoop in de laatste zes maanden heeft beinvloed.",
      source: "Sprout Social",
    },
    {
      area: "Omzetgroei",
      value: [5, 15],
      suffix: "%",
      label:
        "omzetstijging die McKinsey rapporteert bij sterke personalisatie.",
      source: "McKinsey",
    },
    {
      area: "Marketing ROI",
      value: [10, 30],
      suffix: "%",
      label:
        "marketing-ROI stijging door sterke personalisatie.",
      source: "McKinsey",
    },
  ],
  it: [
    {
      area: "AI + automazione",
      value: [60, 70],
      suffix: "%",
      label:
        "del tempo dei dipendenti e legato ad attivita che AI e automazione possono tecnicamente automatizzare.",
      source: "McKinsey",
    },
    {
      area: "Produttivita AI",
      value: 40,
      suffix: "%",
      label:
        "miglioramento delle prestazioni per lavoratori qualificati che usano AI generativa nel suo campo forte.",
      source: "HBS / MIT Sloan",
    },
    {
      area: "Domanda social",
      value: 76,
      suffix: "%",
      label:
        "degli utenti dice che i contenuti social hanno influenzato un acquisto negli ultimi sei mesi.",
      source: "Sprout Social",
    },
    {
      area: "Crescita ricavi",
      value: [5, 15],
      suffix: "%",
      label:
        "aumento dei ricavi riportato da McKinsey con una forte personalizzazione.",
      source: "McKinsey",
    },
    {
      area: "Marketing ROI",
      value: [10, 30],
      suffix: "%",
      label:
        "aumento del ROI marketing con una personalizzazione solida.",
      source: "McKinsey",
    },
  ],
  es: [
    {
      area: "IA + automatizacion",
      value: [60, 70],
      suffix: "%",
      label:
        "del tiempo laboral esta ligado a actividades que la IA actual y la automatizacion pueden automatizar tecnicamente.",
      source: "McKinsey",
    },
    {
      area: "Productividad IA",
      value: 40,
      suffix: "%",
      label:
        "mejora de rendimiento en trabajadores cualificados que usan IA generativa dentro de su zona fuerte.",
      source: "HBS / MIT Sloan",
    },
    {
      area: "Demanda social",
      value: 76,
      suffix: "%",
      label:
        "de usuarios dice que el contenido social influyo en una compra en los ultimos seis meses.",
      source: "Sprout Social",
    },
    {
      area: "Crecimiento ingreso",
      value: [5, 15],
      suffix: "%",
      label:
        "aumento de ingresos reportado por McKinsey con buena personalizacion.",
      source: "McKinsey",
    },
    {
      area: "ROI marketing",
      value: [10, 30],
      suffix: "%",
      label:
        "aumento del ROI marketing con personalizacion fuerte.",
      source: "McKinsey",
    },
  ],
};

type CountUpProps = {
  value: ImpactValue;
  decimals?: number;
  suffix: string;
  active: boolean;
  delay: number;
};

function formatValue(value: number, decimals = 0) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

function formatImpactValue(
  value: ImpactValue,
  progress: number,
  decimals = 0,
) {
  if (Array.isArray(value)) {
    return `${formatValue(value[0] * progress, decimals)}-${formatValue(
      value[1] * progress,
      decimals,
    )}`;
  }

  return formatValue(value * progress, decimals);
}

function CountUp({ value, decimals = 0, suffix, active, delay }: CountUpProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    let frame = 0;
    let startedAt = 0;
    const timeout = window.setTimeout(() => {
      frame = window.requestAnimationFrame(function tick(timestamp) {
        if (!startedAt) {
          startedAt = timestamp;
        }

        const elapsed = timestamp - startedAt;
        const nextProgress = Math.min(elapsed / 1100, 1);
        const eased = 1 - Math.pow(1 - nextProgress, 3);
        setProgress(eased);

        if (nextProgress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      });
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [active, delay]);

  return (
    <>
      {formatImpactValue(value, progress, decimals)}
      {suffix}
    </>
  );
}

export function ImpactStats({ locale }: { locale: Locale }) {
  const stats = copy[locale] ?? copy.en;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const timeout = globalThis.setTimeout(() => setActive(true), 0);

      return () => globalThis.clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-slate-200/90 bg-white/62 p-3 shadow-2xl shadow-slate-900/7 backdrop-blur-xl"
      aria-label="Research-backed impact statistics"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-[#1597d3]/16" />
      <div className="absolute bottom-0 right-0 h-2/3 w-1/2 bg-[radial-gradient(circle_at_75%_55%,rgba(21,151,211,.13),transparent_54%)]" />
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={`${stat.source}-${stat.label}`}
            className="group relative min-h-[11rem] overflow-hidden rounded-[22px] border border-white/85 bg-white/78 px-5 py-5 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_24px_70px_rgba(18,63,140,0.12)] md:px-6 xl:px-4"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#1597d3]/45 to-transparent opacity-70" />
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#123f8c]">
              {stat.area}
            </p>
            <div className="whitespace-nowrap bg-[linear-gradient(112deg,#02040a_0%,#1f2937_36%,#6b7280_52%,#123f8c_74%,#02040a_100%)] bg-clip-text text-[clamp(2rem,3.6vw,2.82rem)] font-semibold leading-none tracking-normal text-transparent">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                active={active}
                delay={index * 140}
              />
            </div>
            <p className="mx-auto mt-3 max-w-72 text-sm font-medium leading-5 text-slate-600 xl:text-[0.78rem] xl:leading-5">
              {stat.label}
            </p>
            <p className="mt-3 inline-flex rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              {stat.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
