import React from "react";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = t("services.list");

  return (
    <section
      id="services"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-16 sm:mb-20 md:mb-24">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4 sm:mb-6">
                {t("services.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05]">
                {t("services.title")}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-secondary max-w-sm">
              {t("services.desc")}
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {Array.isArray(services) && services.map((service, index) => (
            <SectionReveal key={index} delay={index * 100}>
              <div className="group relative border border-border rounded-sm bg-void/50 hover:bg-void/80 hover:border-accent/30 transition-all duration-500 p-6 sm:p-8 h-full flex flex-col">
                {/* Number */}
                <span className="font-mono text-[10px] sm:text-[11px] text-accent/60 mb-4 sm:mb-5 block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Service Name */}
                <h3 className="text-xl sm:text-2xl font-sans font-medium text-primary mb-4 sm:mb-5 group-hover:text-accent transition-colors duration-300 leading-tight">
                  {service.name}
                </h3>

                {/* Problem */}
                <div className="mb-4 sm:mb-5">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-tertiary block mb-1.5">
                    Problem
                  </span>
                  <p className="text-sm text-secondary leading-relaxed">
                    {service.problem}
                  </p>
                </div>

                {/* For Who */}
                <div className="mb-4 sm:mb-5">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-tertiary block mb-1.5">
                    For
                  </span>
                  <p className="text-sm text-secondary">
                    {service.forWho}
                  </p>
                </div>

                {/* Outcome */}
                <div className="mt-auto pt-4 sm:pt-5 border-t border-border/50">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-tertiary block mb-1.5">
                    Outcome
                  </span>
                  <p className="text-sm text-primary/80 leading-relaxed">
                    {service.outcome}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA */}
        <SectionReveal delay={400}>
          <div className="mt-12 sm:mt-16 text-center">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center border border-border px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] text-primary overflow-hidden transition-all duration-300 hover:border-accent hover:text-void bg-transparent cursor-pointer"
            >
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10" />
              {t("hero.cta.contact")}
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
