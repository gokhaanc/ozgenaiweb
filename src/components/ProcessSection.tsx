"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { SiteContent } from "@/content/site";

type ProcessSectionProps = {
  content: SiteContent["process"];
  embedded?: boolean;
};

export function ProcessSection({ content, embedded = false }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateActiveStep() {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const progress =
        (window.innerHeight * 0.72 - rect.top) /
        Math.max(rect.height * 0.72, 1);
      const nextStep = Math.min(
        content.steps.length - 1,
        Math.max(0, Math.floor(progress * content.steps.length)),
      );
      setActiveStep(nextStep);
    }

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [content.steps.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    if (typeof window.IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={
        embedded
          ? "w-full"
          : "section-shell py-12 md:py-16"
      }
    >
      <div
        className={`relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/72 shadow-2xl shadow-slate-900/7 backdrop-blur-xl ${
          embedded ? "p-6 md:p-8" : "p-5 md:p-8"
        } ${isVisible ? "is-visible" : ""}`}
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(18,63,140,0.08),transparent_42%,rgba(45,212,191,0.1))]" />
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <h2
              className={`font-semibold leading-[1.02] tracking-normal text-slate-950 ${
                embedded
                  ? "text-4xl md:text-5xl xl:text-[3.65rem]"
                  : "text-3xl md:text-5xl"
              }`}
            >
              {content.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {content.description}
            </p>
          </div>
          <div className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="process-flow-line">
              <span
                style={{
                  width: `${((activeStep + 1) / content.steps.length) * 100}%`,
                }}
              />
            </div>
            {content.steps.map((step, index) => (
              <div
                key={step}
                className={`process-step relative rounded-[18px] border shadow-xl transition-all duration-500 ${
                  index <= activeStep
                    ? "border-[#02040a]/18 bg-white shadow-slate-900/10"
                    : "border-slate-200 bg-white/78 shadow-slate-900/4"
                } ${embedded ? "min-h-[9.5rem] p-5 xl:p-6" : "p-4"}`}
                style={{ "--step-index": index } as CSSProperties}
              >
                <span
                  className={`block h-1.5 w-12 rounded-full transition-colors duration-500 ${
                    index <= activeStep ? "bg-[#06101f]" : "bg-slate-200"
                  }`}
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-base font-semibold leading-tight text-slate-950">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
