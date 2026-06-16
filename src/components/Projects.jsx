import React, { useState } from "react";
import SectionReveal from "./SectionReveal";
import TextScramble from "./TextScramble";
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
  const { t, lang } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: t("projects.list.ecotrace.title"),
      subtitle: t("projects.list.ecotrace.subtitle"),
      description: t("projects.list.ecotrace.desc"),
      problem: t("projects.list.ecotrace.problem"),
      outcome: t("projects.list.ecotrace.outcome"),
      tags: ["React.js", "Firebase", "Tailwind", "Leaflet.js", "Cloudinary"],
      link: "https://ecotrace-id.vercel.app/",
      image: "/images/Ecotrace.png",
      year: "2026",
    },
    {
      title: t("projects.list.codetack.title"),
      subtitle: t("projects.list.codetack.subtitle"),
      description: t("projects.list.codetack.desc"),
      problem: t("projects.list.codetack.problem"),
      outcome: t("projects.list.codetack.outcome"),
      tags: ["HTML", "CSS", "Tailwind", "JavaScript", "Live Coding"],
      link: "https://justrahyan.github.io/CodeTack/",
      image: "/images/CodeTack.png",
      year: "2025",
    },
    {
      title: t("projects.list.siagadarah.title"),
      subtitle: t("projects.list.siagadarah.subtitle"),
      description: t("projects.list.siagadarah.desc"),
      problem: t("projects.list.siagadarah.problem"),
      outcome: t("projects.list.siagadarah.outcome"),
      tags: ["Flutter", "Firebase Auth", "Cloud Firestore", "Firebase Messaging", "Google Maps API"],
      link: "",
      isPrivate: true,
      isMobile: true,
      image: "/images/SiagaDarah.png",
      year: "2025",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-16 sm:mb-24 md:mb-32">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4 sm:mb-6">
                {t("projects.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05]">
                {t("projects.title").split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t("projects.title").split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
            </div>
            <span className="hidden md:block font-mono text-[11px] text-tertiary">
              {String(projects.length).padStart(2, "0")} {t("projects.projectsCount")}
            </span>
          </div>
        </SectionReveal>

        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <SectionReveal key={project.title} delay={index * 100}>
              <article
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[10px] sm:text-[11px] text-tertiary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="mb-4 sm:mb-6">
                      <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-accent-warm mb-2 sm:mb-3 block">
                        {project.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-primary leading-tight mb-4 sm:mb-6">
                        <TextScramble
                          text={project.title}
                          trigger={hoveredIndex === index}
                        />
                      </h3>
                    </div>

                    {/* Problem & Outcome */}
                    <div className="mb-4 sm:mb-6 space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-tertiary shrink-0 mt-0.5 w-16 sm:w-20">Problem</span>
                        <span className="text-secondary leading-relaxed">{project.problem}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-500/70 shrink-0 mt-0.5 w-16 sm:w-20">Outcome</span>
                        <span className="text-secondary leading-relaxed">{project.outcome}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed mb-6 sm:mb-8 max-w-2xl text-balance">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-tertiary border border-border px-2 sm:px-2.5 py-1 rounded-sm hover:border-accent hover:text-accent transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className={`block overflow-hidden rounded-md border border-border bg-void/50 relative group/img ${project.isMobile ? "aspect-[9/16] max-w-[260px] mx-auto w-full" : "aspect-video"}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full grayscale opacity-60 group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-[1.03] transition-all duration-700 ease-out ${project.isMobile ? "object-contain" : "object-cover"}`}
                      />
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {project.isPrivate ? (
                        <span className="inline-flex items-center gap-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-tertiary py-1 select-none">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          {t("projects.privateRepo")}
                        </span>
                      ) : (
                        <a
                          href={project.link || "#"}
                          target={project.link ? "_blank" : undefined}
                          rel={project.link ? "noopener noreferrer" : undefined}
                          className="group/link inline-flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300 py-1"
                        >
                          <span className="w-4 sm:w-6 h-px bg-border group-hover/link:w-8 sm:group-hover/link:w-10 group-hover/link:bg-accent transition-all duration-500 ease-out" />
                          {project.link ? t("projects.openApp") : t("projects.viewDetail")}
                        </a>
                      )}
                      <span className="font-mono text-[9px] sm:text-[11px] text-tertiary">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>

                {index !== projects.length - 1 && (
                  <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 h-px bg-border w-full" />
                )}
              </article>
            </SectionReveal>
          ))}
        </div>

        {/* View All Projects Button */}
        <SectionReveal delay={200}>
          <div className="mt-16 sm:mt-24 md:mt-32 flex justify-center">
            <a
              href="#/all-projects"
              className="group relative inline-flex items-center justify-center border border-border px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] text-primary overflow-hidden transition-all duration-300 hover:border-accent hover:text-void bg-transparent cursor-pointer"
            >
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10" />
              {lang === "id" ? "Lihat Semua Proyek" : "View All Projects"}
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
