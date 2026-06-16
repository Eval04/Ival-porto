import React from "react";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "../context/LanguageContext";

export default function BuildingInPublic() {
  const { t } = useLanguage();

  const entries = t("buildingInPublic.entries");

  const formatDate = (dateStr) => {
    const [year, month] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <section
      id="building-in-public"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-void relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
            {/* Left — Title */}
            <div className="lg:col-span-4">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4 sm:mb-6">
                {t("buildingInPublic.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-primary leading-[1.05] mb-4 sm:mb-6">
                {t("buildingInPublic.title").split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t("buildingInPublic.title").split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6 sm:mb-8">
                {t("buildingInPublic.desc")}
              </p>
              <a
                href="https://github.com/Eval04"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300"
              >
                <span className="w-4 sm:w-6 h-px bg-border group-hover/link:w-8 sm:group-hover/link:w-10 group-hover/link:bg-accent transition-all duration-500 ease-out" />
                {t("buildingInPublic.followCta")}
              </a>
            </div>

            {/* Right — Timeline */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[52px] sm:left-[62px] top-0 bottom-0 w-px bg-border hidden sm:block" />

                <div className="space-y-0">
                  {Array.isArray(entries) && entries.map((entry, index) => (
                    <SectionReveal key={index} delay={index * 80}>
                      <div className="group flex gap-4 sm:gap-6 py-4 sm:py-5 border-b border-border/30 last:border-0 hover:bg-surface/20 transition-colors duration-300 px-2 sm:px-3 rounded-sm">
                        {/* Date */}
                        <div className="shrink-0 w-[44px] sm:w-[50px]">
                          <span className="font-mono text-[10px] sm:text-[11px] text-tertiary group-hover:text-accent transition-colors duration-300">
                            {formatDate(entry.date)}
                          </span>
                        </div>

                        {/* Dot */}
                        <div className="shrink-0 hidden sm:flex items-start pt-1.5">
                          <span className={`w-2 h-2 rounded-full border border-border group-hover:border-accent transition-colors duration-300 ${index === 0 ? "bg-emerald-500 border-emerald-500" : "bg-void"}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base text-secondary group-hover:text-primary transition-colors duration-300 leading-relaxed">
                            {entry.text}
                          </p>
                        </div>
                      </div>
                    </SectionReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
