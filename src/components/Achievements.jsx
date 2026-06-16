import React from "react";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "../context/LanguageContext";

export default function Achievements() {
  const { t } = useLanguage();

  const achievements = t("achievements.list");

  return (
    <section
      id="achievements"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-12 sm:mb-16 md:mb-20">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4 sm:mb-6">
              {t("achievements.label")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05]">
              {t("achievements.title")}
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {Array.isArray(achievements) && achievements.map((achievement, index) => (
            <SectionReveal key={index} delay={index * 80}>
              <div className="group border border-border rounded-sm bg-void/50 hover:bg-void/80 hover:border-accent/30 transition-all duration-500 p-5 sm:p-6 flex gap-4 sm:gap-5 items-start">
                {/* Icon */}
                <span className="text-2xl sm:text-3xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-base sm:text-lg font-sans font-medium text-primary group-hover:text-accent transition-colors duration-300 truncate">
                      {achievement.title}
                    </h3>
                    <span className="font-mono text-[9px] sm:text-[10px] text-tertiary shrink-0">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {achievement.desc}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
