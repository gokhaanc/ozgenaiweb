"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { contactPath, localizedPath } from "@/lib/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

type NavbarProps = {
  locale: Locale;
  content: Pick<SiteContent, "nav">;
};

export function Navbar({ locale, content }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { href: "#services", label: content.nav.services },
    { href: "#work", label: content.nav.work },
    { href: localizedPath(locale, "/about"), label: content.nav.about },
    { href: contactPath(locale), label: content.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 z-40 px-4 transition-all duration-300 ${
        scrolled ? "top-2" : "top-3"
      }`}
    >
      <div
        className={`pointer-events-auto mx-auto flex items-center justify-between gap-4 border border-white/70 bg-white/54 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? "max-w-[20rem] rounded-[16px] px-2.5 py-1.5 lg:max-w-3xl"
            : "max-w-[23rem] rounded-[18px] px-3 py-2 lg:max-w-4xl"
        }`}
      >
        <Logo locale={locale} compact mini={scrolled} />
        <nav
          className={`hidden items-center text-sm font-semibold text-slate-700 transition-all duration-300 lg:flex ${
            scrolled ? "gap-4 text-[0.8125rem]" : "gap-5"
          }`}
        >
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} className="hover:text-[#123f8c]">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="hover:text-[#123f8c]">
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} />
          <TrackedLink
            href={contactPath(locale)}
            eventLabel="navbar"
            className={`rounded-[8px] bg-[#123f8c] text-sm font-semibold text-white shadow-sm shadow-[#123f8c]/25 transition hover:bg-[#08265d] ${
              scrolled ? "px-3 py-1.5 text-xs" : "px-3.5 py-2"
            }`}
          >
            {content.nav.consultation}
          </TrackedLink>
        </div>
        <details className="group relative lg:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-[8px] border border-slate-200 bg-white text-slate-950 shadow-sm">
            <Menu aria-hidden="true" size={20} />
            <span className="sr-only">{content.nav.menu}</span>
          </summary>
          <div className="absolute right-0 top-12 w-[min(84vw,320px)] rounded-[10px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/10">
            <div className="flex flex-col gap-3">
              {links.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-[8px] px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-[8px] px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <LanguageSwitcher locale={locale} />
              <TrackedLink
                href={contactPath(locale)}
                eventLabel="mobile_navbar"
                className="rounded-[8px] bg-[#123f8c] px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                {content.nav.consultation}
              </TrackedLink>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
