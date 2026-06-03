import SectionReveal from "./SectionReveal";

export default function Skills() {
  const categories = [
    {
      title: "Bahasa Pemrograman",
      items: [
        { name: "Node.js", context: "Backend JavaScript" },
        { name: "Java", context: "Untuk aplikasi besar" },
        { name: "HTML / CSS", context: "Tampilan web" },
        { name: "Dart / Flutter", context: "Aplikasi mobile" },
      ],
    },
    {
      title: "Database & Storage",
      items: [
        { name: "PostgreSQL", context: "Database yang stabil" },
        { name: "Redis", context: "Cache dan real-time" },
        { name: "Docker", context: "Kontainer aplikasi" },
      ],
    },
    {
      title: "Infrastruktur",
      items: [
        {
          name: "Cloud Architecture",
          context: "AWS / GCP untuk scalability",
        },
        {
          name: "Network Engineering",
          context: "Koneksi dan keamanan jaringan",
        },
        {
          name: "Microservices",
          context: "Sistem modular yang fleksibel",
        },
      ],
    },
    {
      title: "Tools & Lainnya",
      items: [
        {
          name: "AI Integration",
          context: "Integrasi AI / Machine Learning",
        },
        { name: "System Design", context: "Desain sistem yang efisien" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-void relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-24 md:mb-32">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-6">
              04 — Tools & Teknologi
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05] max-w-3xl text-balance">
              Tools yang saya gunakan untuk membangun aplikasi.
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {categories.map((category, catIndex) => (
            <SectionReveal key={category.title} delay={catIndex * 100}>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary border-b border-border pb-4 mb-8">
                  {category.title}
                </h3>
                <ul className="space-y-5">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex items-baseline justify-between gap-4"
                    >
                      <span className="text-primary font-sans text-lg md:text-xl group-hover:text-accent transition-colors duration-300">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-tertiary text-right max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 group-hover:translate-x-0 hidden md:block">
                        {item.context}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
