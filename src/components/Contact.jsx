import SectionReveal from "./SectionReveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-6">
                05 — Hubungi Saya
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-primary leading-[0.95] mb-8 text-balance">
                Mari kita
                <br />
                bekerja sama.
              </h2>
              <p className="text-secondary text-lg leading-relaxed max-w-md text-balance">
                Saya terbuka untuk membantu proyek backend, infrastruktur cloud,
                atau peran teknis lainnya.
              </p>
            </div>

            <div className="flex flex-col justify-end">
              <div className="space-y-10">
                <a
                  href="mailto:ival.permana24@email.com"
                  className="group block"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-3">
                    Email
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-sans text-primary group-hover:text-accent transition-colors duration-500 relative inline-block">
                    ival.permana24@email.com
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                </a>

                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-border">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-2">
                      Lokasi
                    </span>
                    <span className="text-primary text-lg">Indonesia</span>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary block mb-2">
                      Status
                    </span>
                    <span className="text-primary text-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Terbuka untuk pekerjaan
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
