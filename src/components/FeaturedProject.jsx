import React from "react";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "../context/LanguageContext";

export default function FeaturedProject() {
  const { t } = useLanguage();

  const features = t("featured.features.list");
  const roadmapItems = t("featured.roadmap.items");

  return (
    <section
      id="featured"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-void relative overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal>
          <div className="mb-12 sm:mb-16">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-accent block mb-4 sm:mb-6">
              ★ {t("featured.label")}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-primary leading-[1.05]">
                {t("featured.title")}
              </h2>
              <span className="font-mono text-[11px] text-tertiary italic">
                {t("featured.subtitle")}
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Main Content Grid */}
        <SectionReveal delay={100}>
          <div className="border border-border rounded-sm overflow-hidden bg-surface/80 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-void border-b border-border">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[10px] text-tertiary ml-3 tracking-wider">
                ival@portfolio — ~/featured/researchfinder
              </span>
            </div>

            <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
              {/* Screenshot */}
              <div className="mb-8 sm:mb-10 overflow-hidden rounded-sm border border-border bg-void/50">
                <img
                  src="/images/ReaserchFinder.png"
                  alt="ResearchFinder — AI-Powered Research Paper Finder"
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column — Problem & Solution */}
                <div className="space-y-6">
                  {/* Problem */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                      <span className="text-emerald-500">$</span>
                      <span className="text-accent">cat</span>
                      <span className="text-primary">problem.txt</span>
                    </div>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed pl-0 sm:pl-4">
                      {t("featured.problem")}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                      <span className="text-emerald-500">$</span>
                      <span className="text-accent">cat</span>
                      <span className="text-primary">solution.txt</span>
                    </div>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed pl-0 sm:pl-4">
                      {t("featured.solution")}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                      <span className="text-emerald-500">$</span>
                      <span className="text-accent">ls</span>
                      <span className="text-primary">tech-stack/</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-0 sm:pl-4">
                      {["Vue.js 3", "FastAPI", "Groq API", "Python", "PostgreSQL", "Redis", "Tailwind v4", "Pinia", "Docker"].map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-tertiary border border-border px-2.5 py-1 rounded-sm hover:border-accent hover:text-accent transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column — Features */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4 font-mono text-sm">
                      <span className="text-emerald-500">$</span>
                      <span className="text-accent">cat</span>
                      <span className="text-primary">features.md</span>
                    </div>
                    <ul className="space-y-4 pl-0 sm:pl-4">
                      {Array.isArray(features) && features.map((feature, index) => (
                        <li key={index} className="group">
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-[10px] text-accent mt-1 shrink-0">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <span className="text-primary text-sm sm:text-base font-medium block mb-1 group-hover:text-accent transition-colors duration-300">
                                {feature.name}
                              </span>
                              <span className="text-tertiary text-xs sm:text-sm leading-relaxed">
                                {feature.desc}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Vision & Roadmap */}
              <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Vision */}
                <div>
                  <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                    <span className="text-emerald-500">$</span>
                    <span className="text-accent">cat</span>
                    <span className="text-primary">vision.txt</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-sans font-medium text-primary mb-2 pl-0 sm:pl-4">
                    {t("featured.vision.title")}
                  </h3>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed pl-0 sm:pl-4">
                    {t("featured.vision.body")}
                  </p>
                </div>

                {/* Roadmap */}
                <div>
                  <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                    <span className="text-emerald-500">$</span>
                    <span className="text-accent">cat</span>
                    <span className="text-primary">roadmap.md</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-sans font-medium text-primary mb-3 pl-0 sm:pl-4">
                    {t("featured.roadmap.title")}
                  </h3>
                  <ul className="space-y-2 pl-0 sm:pl-4">
                    {Array.isArray(roadmapItems) && roadmapItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-tertiary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-border flex justify-between items-center">
                <a
                  href="https://github.com/Vals-devs/ReaserchHelper.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300 py-1"
                >
                  <span className="w-6 h-px bg-border group-hover/link:w-10 group-hover/link:bg-accent transition-all duration-500 ease-out" />
                  {t("featured.cta")}
                </a>
                {/* Blinking cursor */}
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">$</span>
                  <span className="w-2 h-4 bg-accent/80 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
