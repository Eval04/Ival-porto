import React from "react";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-4 sm:mb-6">
                {t("contact.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-medium tracking-tight text-primary leading-[0.95] mb-6 sm:mb-8 text-balance">
                {t("contact.title").split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t("contact.title").split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed max-w-md text-balance">
                {t("contact.desc")}
              </p>
            </div>

            <div className="flex flex-col justify-end">
              <div className="space-y-8 sm:space-y-10">
                <a
                  href="mailto:ivalpermana24@gmail.com"
                  onClick={(e) => {
                    e.preventDefault();
                    const gmailUrl =
                      "https://mail.google.com/mail/?view=cm&fs=1&to=ivalpermana24@gmail.com";
                    window.open(gmailUrl, "_blank");
                  }}
                  className="group block py-2 px-2 rounded hover:bg-surface/30 transition-colors duration-300"
                >
                  <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-2 sm:mb-3">
                    Email
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans text-primary group-hover:text-accent transition-colors duration-500 relative inline-block break-all sm:break-normal">
                    ivalpermana24@gmail.com
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                </a>

                <a
                  href="https://wa.me/6285111203407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-2 px-2 rounded hover:bg-surface/30 transition-colors duration-300"
                >
                  <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-2 sm:mb-3">
                    WhatsApp / Phone
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans text-primary group-hover:text-accent transition-colors duration-500 relative inline-block">
                    +62 851-1120-3407
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/ival_permana28?igsh=MXBiNHMxOGRydWRndw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-2 px-2 rounded hover:bg-surface/30 transition-colors duration-300"
                >
                  <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-2 sm:mb-3">
                    Instagram
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans text-primary group-hover:text-accent transition-colors duration-500 relative inline-block">
                    @ival_permana28
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                </a>

                {/* GitHub moved to footer */}

                <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-border">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-1 sm:mb-2">
                      {t("contact.location")}
                    </span>
                    <span className="text-base sm:text-lg text-primary">
                      Indonesia
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-1 sm:mb-2">
                      {t("contact.status")}
                    </span>
                    <span className="text-base sm:text-lg text-primary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{t("contact.statusVal")}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
