import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { localizedPath } from "@/lib/routes";

const logoSrc = "/images/ozgen-ai-logo-20260618.png";

type LogoProps = {
  locale: Locale;
  compact?: boolean;
  mini?: boolean;
};

export function Logo({ locale, compact = false, mini = false }: LogoProps) {
  return (
    <Link
      href={localizedPath(locale)}
      className="group flex items-center gap-3 text-slate-950 no-underline"
      aria-label="OzGen AI home"
    >
      <span
        className={`relative overflow-hidden rounded-[8px] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/90 transition-all duration-300 group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.18)] ${
          mini ? "h-8 w-8" : compact ? "h-9 w-9" : "h-11 w-11"
        }`}
      >
        <Image
          src={logoSrc}
          alt=""
          fill
          sizes="44px"
          className="object-contain drop-shadow-[0_2px_4px_rgba(15,23,42,0.28)]"
          priority
        />
      </span>
      <span
        className={`font-semibold tracking-normal transition-all duration-300 ${
          mini ? "text-sm" : compact ? "text-base" : "text-lg"
        }`}
      >
        OzGen AI
      </span>
    </Link>
  );
}
