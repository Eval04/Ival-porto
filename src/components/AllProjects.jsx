import React, { useState } from "react";
import SectionReveal from "./SectionReveal";
import TextScramble from "./TextScramble";
import { useLanguage } from "../context/LanguageContext";

export default function AllProjects() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      title: t("projects.list.linkinbio.title"),
      subtitle: t("projects.list.linkinbio.subtitle"),
      description: t("projects.list.linkinbio.desc"),
      tags: ["Vue.js 3", "Laravel 11", "Tailwind v4", "Docker", "PostgreSQL", "Redis", "Groq API"],
      link: "https://link-bio-puce.vercel.app/",
      image: "/images/LinkBio.png",
      year: "2026",
      categories: ["all", "fullstack", "ai"],
    },
    {
      title: t("projects.list.ecotrace.title"),
      subtitle: t("projects.list.ecotrace.subtitle"),
      description: t("projects.list.ecotrace.desc"),
      tags: ["React.js", "Firebase", "Tailwind", "Leaflet.js", "Cloudinary"],
      link: "https://ecotrace-id.vercel.app/",
      image: "/images/Ecotrace.png",
      year: "2026",
      categories: ["all", "fullstack", "frontend"],
    },
    {
      title: t("projects.list.codetack.title"),
      subtitle: t("projects.list.codetack.subtitle"),
      description: t("projects.list.codetack.desc"),
      tags: ["HTML", "CSS", "Tailwind", "JavaScript", "Live Coding"],
      link: "https://justrahyan.github.io/CodeTack/",
      image: "/images/CodeTack.png",
      year: "2025",
      categories: ["all", "frontend"],
    },
    {
      title: t("projects.list.researchfinder.title"),
      subtitle: t("projects.list.researchfinder.subtitle"),
      description: t("projects.list.researchfinder.desc"),
      tags: ["Vue.js 3", "FastAPI", "Groq API", "Python", "PostgreSQL", "Redis", "Tailwind v4", "Pinia", "Docker"],
      link: "https://github.com/Vals-devs/ReaserchHelper.git",
      image: "/images/ReaserchFinder.png",
      year: "2026",
      categories: ["all", "fullstack", "ai"],
    },
  ];

  const filters = [
    { key: "all", label: t("projects.filterAll") },
    { key: "fullstack", label: t("projects.filterFullstack") },
    { key: "frontend", label: t("projects.filterFrontend") },
    { key: "ai", label: t("projects.filterAI") },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredProjects = projects.filter((project) =>
    project.categories.includes(activeFilter)
  );

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-void min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-12">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("projects.backHome")}
          </a>
        </div>

        {/* Title */}
        <div className="mb-16">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4">
            {t("projects.allProjects")}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-medium tracking-tight text-primary leading-none">
            <TextScramble text={t("projects.allProjects")} />
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 md:gap-3 border-b border-border pb-6 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key);
                setHoveredIndex(null);
              }}
              className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-4 py-2 border rounded-sm transition-all duration-300 cursor-pointer ${
                activeFilter === filter.key
                  ? "bg-primary border-primary text-void font-medium"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
            {filteredProjects.map((project, index) => (
              <SectionReveal key={project.title} delay={index * 100}>
                <article
                  className="group flex flex-col h-full bg-surface/10 border border-border/30 rounded-md p-5 hover:border-border hover:bg-surface/25 transition-all duration-500"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image Card */}
                  <div className="block overflow-hidden rounded-md border border-border bg-void/50 aspect-video relative group/img mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-[1.02] transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Header Info */}
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-accent-warm">
                      {project.subtitle.split(" — ")[0]}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-tertiary">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-sans font-medium text-primary mb-3">
                    <TextScramble
                      text={project.title}
                      trigger={hoveredIndex === index}
                    />
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-tertiary border border-border/80 px-2 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="border-t border-border/50 pt-4 flex justify-between items-center">
                    <a
                      href={project.link || "#"}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      className="group/link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300 py-1"
                    >
                      <span className="w-4 h-px bg-border group-hover/link:w-8 group-hover/link:bg-accent transition-all duration-500 ease-out" />
                      {project.link ? t("projects.openApp") : t("projects.viewDetail")}
                    </a>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border rounded-md">
            <p className="font-mono text-sm text-tertiary">
              {lang === "id"
                ? "Tidak ada proyek ditemukan dalam kategori ini."
                : "No projects found in this category."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
