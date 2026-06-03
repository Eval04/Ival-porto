import SectionReveal from "./SectionReveal";
import ArchitectureDiagram from "./ArchitectureDiagram";
import profilePhoto from "../assets/images/IvalV2.jpg";

export default function About() {
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
                  alt="Profile"
                  className="w-full h-auto rounded-sm border border-border hover:shadow-lg hover:shadow-accent/10 transition-all duration-500"
                />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-6 sm:mb-8">
                01 — Fokus Saya
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-primary leading-[1.05] text-balance">
                Sistem di balik
                <br />
                layar.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:pt-20">
              <p className="text-base sm:text-lg md:text-xl text-secondary leading-relaxed mb-4 sm:mb-6 text-balance">
                Saya fokus pada sistem yang bekerja di belakang layar. Dari
                database, server, hingga semua infrastruktur digital yang
                membuat aplikasi berjalan lancar. Setiap keputusan saya buat
                dengan memikirkan performa, keamanan, dan kemampuan untuk
                berkembang.
              </p>
              <p className="text-sm sm:text-base text-tertiary leading-relaxed text-balance">
                Saya menggunakan cara kerja yang terukur dan praktis. Bukan
                hanya menulis kode, tetapi membuat sistem yang tahan lama dan
                dapat menangani pertumbuhan. Tujuan saya adalah memastikan
                semuanya bekerja dengan mulus tanpa hambatan.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={150}>
          <div className="mt-20 sm:mt-28 md:mt-32 lg:mt-40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary">
                02 — Arsitektur
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-tertiary hidden md:block">
                Contoh Project — Gambaran Teknis
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
