import React from "react";
import SectionReveal from "./SectionReveal";
import ArchitectureDiagram from "./ArchitectureDiagram";
import profilePhoto from "../assets/images/IvalV2.jpg";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-void relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="mb-8 sm:mb-10 md:mb-12 w-full max-w-xs">
                <img
                  src={profilePhoto}
                  alt="Ival Permana - Backend Developer & Cloud Engineer"
                  className="w-full h-auto rounded-sm border border-border hover:shadow-lg hover:shadow-accent/10 transition-all duration-500"
                />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-6 sm:mb-8">
                {t("about.focus")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05] text-balance">
                {t("about.title").split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t("about.title").split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
            </div>

            {/* TERMINAL AESTHETIC */}
            <div className="lg:col-span-7 lg:pt-10">
              <div className="border border-border rounded-sm overflow-hidden bg-surface/80 backdrop-blur-sm">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-void border-b border-border">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[10px] text-tertiary ml-3 tracking-wider">
                    ival@portfolio — ~/about
                  </span>
                </div>

                {/* Terminal Body */}
                <div className="px-4 sm:px-6 py-6 sm:py-8 font-mono text-sm sm:text-base leading-relaxed">
                  <div className="mb-6">
                    <span className="text-emerald-500 mr-2">$</span>
                    <span className="text-accent">cat</span>
                    <span className="text-primary ml-2">whoami.txt</span>
                  </div>

                  <p className="text-secondary mb-4 pl-0 sm:pl-4">
                    {t("about.whoami")}
                  </p>

                  <p className="text-tertiary mb-6 pl-0 sm:pl-4">
                    {t("about.philosophyTitle")}
                  </p>

                  <div className="mb-6">
                    <span className="text-emerald-500 mr-2">$</span>
                    <span className="text-accent">cat</span>
                    <span className="text-primary ml-2">philosophy.txt</span>
                  </div>

                  <p className="text-tertiary mb-2 pl-0 sm:pl-4">
                    {t("about.philosophyBody")}
                  </p>

                  {/* Cursor berkedip di akhir */}
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">$</span>
                    <span className="w-2 h-4 bg-accent/80 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={150}>
          <div className="mt-20 sm:mt-28 md:mt-32 lg:mt-40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary">
                {t("about.architectureLabel")}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-tertiary hidden md:block">
                {t("about.architectureDesc")}
              </span>
            </div>
            <div className="border border-border bg-surface/30 rounded-sm overflow-hidden">
              <ArchitectureDiagram />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
