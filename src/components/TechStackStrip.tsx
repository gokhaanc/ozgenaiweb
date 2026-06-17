"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/site";
import type { ServiceSlug } from "@/lib/routes";

type ConnectionPath = {
  d: string;
};

type BusinessNode = {
  position: string;
  slug: ServiceSlug;
  title: string;
  detail: string;
};

type TechStackContent = SiteContent["techStack"];

type PositionedNode = {
  position: string;
  slug: ServiceSlug;
};

type LocalizedNode = {
  slug: string;
  title: string;
  detail: string;
};

type PlatformLogo = {
  src: string;
  label: string;
  width: number;
  height: number;
};

const networkNodePositions: PositionedNode[] = [
  {
    slug: "uygulama",
    position: "left-[24%] top-[22%]",
  },
  {
    slug: "web-sitesi",
    position: "left-[24%] top-[50%]",
  },
  {
    slug: "reklam",
    position: "left-[24%] top-[78%]",
  },
  {
    slug: "ai-donusumu",
    position: "left-[76%] top-[22%]",
  },
  {
    slug: "danismanlik",
    position: "left-[76%] top-[50%]",
  },
  {
    slug: "marketing",
    position: "left-[76%] top-[78%]",
  },
];

const connectionPaths: ConnectionPath[] = [
  { d: "M500 120 C430 88 350 54 240 53" },
  { d: "M500 120 C430 113 350 120 240 120" },
  { d: "M500 120 C430 152 350 186 240 187" },
  { d: "M500 120 C570 88 650 54 760 53" },
  { d: "M500 120 C570 113 650 120 760 120" },
  { d: "M500 120 C570 152 650 186 760 187" },
];

const brandLogos: PlatformLogo[] = [
  { src: "/images/brand-logos/wordpress.svg", label: "WordPress", width: 132, height: 48 },
  { src: "/images/brand-logos/woo.svg", label: "Woo", width: 132, height: 48 },
  { src: "/images/brand-logos/shopify.svg", label: "Shopify", width: 132, height: 48 },
  { src: "/images/brand-logos/amazon.svg", label: "Amazon", width: 132, height: 48 },
  { src: "/images/brand-logos/google.svg", label: "Google", width: 132, height: 48 },
  { src: "/images/brand-logos/hetzner.svg", label: "Hetzner", width: 160, height: 48 },
  { src: "/images/brand-logos/aws.svg", label: "AWS", width: 132, height: 48 },
  { src: "/images/brand-logos/google-ads.svg", label: "Google Ads", width: 132, height: 48 },
  { src: "/images/brand-logos/meta.svg", label: "Meta", width: 132, height: 48 },
  { src: "/images/brand-logos/instagram.svg", label: "Instagram", width: 132, height: 48 },
  { src: "/images/brand-logos/tiktok.svg", label: "TikTok", width: 132, height: 48 },
  { src: "/images/brand-logos/youtube.svg", label: "YouTube", width: 132, height: 48 },
  { src: "/images/brand-logos/whatsapp.svg", label: "WhatsApp", width: 132, height: 48 },
  { src: "/images/brand-logos/app-store.svg", label: "App Store", width: 132, height: 48 },
  { src: "/images/brand-logos/google-play.svg", label: "Google Play", width: 132, height: 48 },
  { src: "/images/brand-logos/stripe.svg", label: "Stripe", width: 132, height: 48 },
  { src: "/images/brand-logos/hubspot.svg", label: "HubSpot", width: 132, height: 48 },
  { src: "/images/brand-logos/facebook.svg", label: "Facebook", width: 132, height: 48 },
  { src: "/images/brand-logos/mailchimp.svg", label: "MailChimp", width: 132, height: 48 },
  { src: "/images/brand-logos/cloudflare.svg", label: "Cloudflare", width: 132, height: 48 },
];

const logoSrc = "/images/ozgen-ai-logo-20260618.png";

function selectServiceFromNode(service: ServiceSlug) {
  window.dispatchEvent(
    new CustomEvent("ozgenai:select-service", {
      detail: { slug: service },
    }),
  );
  document.getElementById("services")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function getNetworkNodes(content: TechStackContent): BusinessNode[] {
  return networkNodePositions.map((nodePosition) => {
    const localizedNode = content.nodes.find(
      (node: LocalizedNode) => node.slug === nodePosition.slug,
    );

    return {
      ...nodePosition,
      title: localizedNode?.title ?? nodePosition.slug,
      detail: localizedNode?.detail ?? "",
    };
  });
}

function formatOpenCapability(template: string, title: string) {
  return template.replace("{title}", title);
}

export function TechStackStrip({ content }: { content: TechStackContent }) {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [receivingNodeIndex, setReceivingNodeIndex] = useState<number | null>(
    null,
  );
  const networkNodes = getNetworkNodes(content);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return;
    }

    let index = 0;
    let receiveTimer: number;
    let clearTimer: number;
    let nextTimer: number;

    function runSignal() {
      setActivePathIndex(index);
      setReceivingNodeIndex(null);

      receiveTimer = window.setTimeout(() => {
        setReceivingNodeIndex(index);
      }, 590);

      clearTimer = window.setTimeout(() => {
        setReceivingNodeIndex(null);
      }, 780);

      nextTimer = window.setTimeout(() => {
        index = (index + 1) % connectionPaths.length;
        runSignal();
      }, 1440);
    }

    runSignal();

    return () => {
      window.clearTimeout(receiveTimer);
      window.clearTimeout(clearTimer);
      window.clearTimeout(nextTimer);
    };
  }, []);

  return (
    <section
      className="relative z-10 mx-auto -mt-8 w-full max-w-7xl px-5 pb-4 md:-mt-10 md:px-10"
      aria-label={content.ariaLabel}
    >
      <div className="relative mx-auto h-[232px] max-w-6xl overflow-visible md:h-[252px]">
          <svg
            viewBox="0 0 1000 240"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fiber-packet" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#1597d3" stopOpacity="0" />
                <stop offset="34%" stopColor="#1597d3" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#effbff" stopOpacity="1" />
                <stop offset="66%" stopColor="#1597d3" stopOpacity="0.36" />
                <stop offset="100%" stopColor="#1597d3" stopOpacity="0" />
              </linearGradient>
              <filter id="fiber-glow" x="-12%" y="-40%" width="124%" height="180%">
                <feGaussianBlur stdDeviation="2.1" result="blur" />
                <feDropShadow dx="0" dy="0" stdDeviation="2.4" floodColor="#1597d3" floodOpacity="0.28" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {connectionPaths.map((connection) => (
              <path
                key={`line-${connection.d}`}
                className="tech-line"
                d={connection.d}
              />
            ))}
            {connectionPaths.map((connection) => (
              <path
                key={`fiber-${connection.d}`}
                className="tech-signal-path"
                stroke="url(#fiber-packet)"
                filter="url(#fiber-glow)"
                d={connection.d}
                pathLength={100}
              />
            ))}
            <path
              key={`active-fiber-${activePathIndex}`}
              className="tech-signal-path is-active"
              stroke="url(#fiber-packet)"
              filter="url(#fiber-glow)"
              d={connectionPaths[activePathIndex].d}
              pathLength={100}
            />
          </svg>
          <div className="absolute left-1/2 top-1/2 h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] border border-white/95 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/90">
            <Image
              src={logoSrc}
              alt=""
              fill
              sizes="66px"
              className="object-contain p-1.5 drop-shadow-[0_3px_5px_rgba(15,23,42,0.28)]"
            />
          </div>
          {networkNodes.map((node, index) => {
            return (
              <button
                key={node.slug}
                type="button"
                className={`tech-node-card absolute ${node.position} group flex h-[52px] w-[162px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[16px] border border-white/70 bg-white/58 px-5 text-center text-slate-800 shadow-xl shadow-slate-950/10 ring-1 ring-slate-200/55 backdrop-blur-xl transition duration-300 hover:scale-[1.025] hover:border-[#1597d3]/45 hover:bg-white/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1597d3] md:h-[58px] md:w-[186px] ${
                  receivingNodeIndex === index ? "is-receiving" : ""
                }`}
                aria-label={formatOpenCapability(
                  content.openCapability,
                  node.title,
                )}
                data-node={node.slug}
                onClick={() => selectServiceFromNode(node.slug)}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-semibold leading-4 text-slate-950 md:text-[13px]">
                    {node.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] font-semibold leading-3 text-slate-500 md:text-[11px]">
                    {node.detail}
                  </span>
                </span>
              </button>
            );
          })}
      </div>
      <div className="mx-auto mt-6 max-w-7xl py-3">
        <div className="brand-marquee" aria-label={content.supportedPlatforms}>
          <div className="brand-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                className="brand-marquee-group"
                aria-hidden={groupIndex === 1}
              >
                {brandLogos.map((brand) => (
                  <BrandLogo key={`${brand.label}-${groupIndex}`} brand={brand} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ brand }: { brand: PlatformLogo }) {
  return (
    <span className="brand-logo" aria-label={brand.label}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Local SVG wordmarks render cleaner without Next image aspect warnings. */}
      <img
        src={brand.src}
        alt=""
        width={brand.width}
        height={brand.height}
        className="brand-logo-image"
      />
    </span>
  );
}
