import SectionReveal from "./SectionReveal";
import { useLanguage } from "../context/LanguageContext";

import nodejsIcon from "../assets/images/logos/nodejs.svg";
import html5Icon from "../assets/images/logos/html5.svg";
import flutterIcon from "../assets/images/logos/flutter.svg";
import postgresIcon from "../assets/images/logos/postgresql.svg";
import redisIcon from "../assets/images/logos/redis.svg";
import dockerIcon from "../assets/images/logos/docker.svg";

const iconMap = {
  "Node.js": nodejsIcon,
  "HTML / CSS": html5Icon,
  "Dart / Flutter": flutterIcon,
  PostgreSQL: postgresIcon,
  Redis: redisIcon,
  Docker: dockerIcon,
};

export default function Skills() {
  const { t } = useLanguage();

  const categories = [
    {
      title: t("skills.categories.languages"),
      items: [
        { name: "Node.js", context: t("skills.contexts.nodejs") },
        { name: "Java", context: t("skills.contexts.java") },
        { name: "HTML / CSS", context: t("skills.contexts.html") },
        { name: "Dart / Flutter", context: t("skills.contexts.flutter") },
      ],
    },
    {
      title: t("skills.categories.database"),
      items: [
        { name: "PostgreSQL", context: t("skills.contexts.postgres") },
        { name: "Redis", context: t("skills.contexts.redis") },
        { name: "Docker", context: t("skills.contexts.docker") },
      ],
    },
    {
      title: t("skills.categories.infra"),
      items: [
        {
          name: "Cloud Architecture",
          context: t("skills.contexts.cloud"),
        },
        {
          name: "Network Engineering",
          context: t("skills.contexts.network"),
        },
        {
          name: "Microservices",
          context: t("skills.contexts.microservices"),
        },
      ],
    },
    {
      title: t("skills.categories.tools"),
      items: [
        {
          name: "AI Integration",
          context: t("skills.contexts.ai"),
        },
        { name: "System Design", context: t("skills.contexts.systemDesign") },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-void relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4 sm:mb-6">
              {t("skills.label")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05] max-w-3xl text-balance">
              {t("skills.title")}
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-x-16 md:gap-y-20">
          {categories.map((category, catIndex) => (
            <SectionReveal key={category.title} delay={catIndex * 100}>
              <div>
                <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-tertiary border-b border-border pb-3 sm:pb-4 mb-6 sm:mb-8">
                  {category.title}
                </h3>
                <ul className="space-y-3 sm:space-y-5">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4 py-1"
                    >
                      {iconMap[item.name] ? (
                        <div className="flex items-center gap-4">
                          <img
                            src={iconMap[item.name]}
                            alt={item.name + " icon"}
                            className="w-8 h-8 object-contain"
                          />
                          <span className="text-primary font-sans text-base sm:text-lg md:text-xl group-hover:text-accent transition-colors duration-300">
                            {item.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-primary font-sans text-base sm:text-lg md:text-xl group-hover:text-accent transition-colors duration-300">
                          {item.name}
                        </span>
                      )}
                      <span className="font-mono text-[9px] sm:text-[10px] text-tertiary text-left sm:text-right max-w-full sm:max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 group-hover:translate-x-0 hidden sm:block">
                        {item.context}
                      </span>
                      <span className="font-mono text-[9px] sm:hidden text-tertiary text-left opacity-70">
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
