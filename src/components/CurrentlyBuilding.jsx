import React from "react";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "../context/LanguageContext";

export default function CurrentlyBuilding() {
  const { t } = useLanguage();

  const items = t("currentlyBuilding.items");

  const statusConfig = {
    active: { color: "bg-emerald-500", label: "Active", pulse: true },
    progress: { color: "bg-yellow-500", label: "In Progress", pulse: true },
    planning: { color: "bg-blue-400", label: "Planning", pulse: false },
    running: { color: "bg-emerald-500", label: "Running", pulse: true },
  };

  return (
    <section
      id="currently-building"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-void relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-12 sm:mb-16 md:mb-20">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4 sm:mb-6">
              {t("currentlyBuilding.label")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05] mb-4 sm:mb-6">
              {t("currentlyBuilding.title").split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t("currentlyBuilding.title").split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-sm sm:text-base text-secondary max-w-xl">
              {t("currentlyBuilding.desc")}
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {Array.isArray(items) && items.map((item, index) => {
            const status = statusConfig[item.status] || statusConfig.planning;
            return (
              <SectionReveal key={index} delay={index * 80}>
                <div className="group border border-border rounded-sm bg-surface/30 hover:bg-surface/60 hover:border-accent/30 transition-all duration-500 p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${status.color} ${status.pulse ? "animate-pulse" : ""} shrink-0`} />
                      <h3 className="text-lg sm:text-xl font-sans font-medium text-primary group-hover:text-accent transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-tertiary border border-border px-2 py-0.5 rounded-sm shrink-0 ml-2">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-tertiary">
                    {status.label}
                  </span>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
