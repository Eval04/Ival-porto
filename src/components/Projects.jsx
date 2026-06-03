import SectionReveal from "./SectionReveal";
import TextScramble from "./TextScramble";

export default function Projects() {
  const projects = [
    {
      title: "EcoTrace",
      subtitle: "Platform Pemantauan Lingkungan",
      description:
        "Aplikasi untuk memantau kondisi lingkungan secara real-time. Menggunakan AI untuk mendeteksi masalah dan membuat laporan otomatis. Dibangun untuk dapat menangani banyak pengguna.",
      tags: ["Node.js", "PostgreSQL", "Docker", "AI", "Backend"],
      link: "https://ecotrace-id.vercel.app/",
      year: "2026",
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
                03 — Proyek Saya
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05]">
                Aplikasi &<br />
                Sistem
              </h2>
            </div>
            <span className="hidden md:block font-mono text-[11px] text-tertiary">
              {String(projects.length).padStart(2, "0")} Proyek
            </span>
          </div>
        </SectionReveal>

        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <SectionReveal key={project.title} delay={index * 100}>
              <article className="group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[10px] sm:text-[11px] text-tertiary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="mb-4 sm:mb-6">
                      <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-accent-warm mb-2 sm:mb-3 block">
                        {project.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-primary leading-tight mb-4 sm:mb-6">
                        <TextScramble text={project.title} />
                      </h3>
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

                  <div className="lg:col-span-4 flex lg:justify-end items-start lg:pt-2 pt-2">
                    <a
                      href={project.link || "#"}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      className="group/link inline-flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300 py-2 px-2 rounded hover:bg-surface/30"
                    >
                      <span className="w-6 sm:w-8 h-px bg-border group-hover/link:w-10 sm:group-hover/link:w-14 group-hover/link:bg-accent transition-all duration-500 ease-out" />
                      {project.link ? "Buka Aplikasi" : "Lihat Detail"}
                      <span className="text-tertiary ml-0.5 sm:ml-1">
                        {project.year}
                      </span>
                    </a>
                  </div>
                </div>

                {index !== projects.length - 1 && (
                  <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 h-px bg-border w-full" />
                )}
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
