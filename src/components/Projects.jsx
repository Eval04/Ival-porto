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
      year: "2024",
    },
    {
      title: "AutoPresence",
      subtitle: "Sistem Catat Kehadiran Otomatis",
      description:
        "Sistem untuk mencatat kehadiran secara otomatis menggunakan data biometrik. Dapat disinkronkan di berbagai tempat dan dibangun khusus untuk sekolah atau universitas besar.",
      tags: ["Java", "Flutter", "Backend", "Sistem"],
      year: "2023",
    },
    {
      title: "Infrastructure Toolkit",
      subtitle: "Kumpulan Tools untuk Backend",
      description:
        "Kumpulan tools siap pakai untuk backend application, mulai dari sistem login, monitoring kesehatan sistem, hingga logging. Mudah dipasang di berbagai platform cloud.",
      tags: ["Node.js", "Docker", "Backend", "DevOps"],
      year: "2023",
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex items-end justify-between mb-24 md:mb-32">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-6">
                03 — Proyek Saya
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05]">
                Aplikasi &<br />
                Sistem
              </h2>
            </div>
            <span className="hidden md:block font-mono text-[11px] text-tertiary">
              {String(projects.length).padStart(2, "0")} Proyek
            </span>
          </div>
        </SectionReveal>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <SectionReveal key={project.title} delay={index * 100}>
              <article className="group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[11px] text-tertiary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="mb-6">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-warm mb-3 block">
                        {project.subtitle}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-primary leading-tight mb-6">
                        <TextScramble text={project.title} />
                      </h3>
                    </div>
                    <p className="text-secondary leading-relaxed mb-8 max-w-2xl text-balance">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wider text-tertiary border border-border px-2.5 py-1 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex lg:justify-end items-start lg:pt-2">
                    <a
                      href={project.link || "#"}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      className="group/link inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300"
                    >
                      <span className="w-8 h-px bg-border group-hover/link:w-14 group-hover/link:bg-accent transition-all duration-500 ease-out" />
                      {project.link ? "Buka Aplikasi" : "Lihat Detail"}
                      <span className="text-tertiary ml-1">{project.year}</span>
                    </a>
                  </div>
                </div>

                {index !== projects.length - 1 && (
                  <div className="mt-24 md:mt-32 h-px bg-border w-full" />
                )}
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
