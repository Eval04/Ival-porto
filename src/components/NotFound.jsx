import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t, lang } = useLanguage();
  const [glitchText, setGlitchText] = useState("404");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Glitch effect on mount
    const chars = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";
    let iterations = 0;
    const maxIterations = 8;

    const interval = setInterval(() => {
      setGlitchText(
        "404"
          .split("")
          .map((char, i) => {
            if (iterations > i * 2) return "404"[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setGlitchText("404");
        setShowContent(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 bg-void relative overflow-hidden pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.1] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Error Code */}
        <div className="mb-8 sm:mb-12">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-red-500/70 block mb-4">
            {lang === "id" ? "// KESALAHAN: HALAMAN TIDAK DITEMUKAN" : "// ERROR: PAGE NOT FOUND"}
          </span>
          <h1
            className="text-[80px] sm:text-[120px] md:text-[160px] font-mono font-bold text-primary leading-none tracking-tighter select-none"
            style={{
              textShadow: showContent
                ? "none"
                : "2px 0 #ef4444, -2px 0 #3b82f6",
            }}
          >
            {glitchText}
          </h1>
        </div>

        {/* Terminal-style error message */}
        <div
          className={`border border-border rounded-sm overflow-hidden bg-surface/50 backdrop-blur-sm mb-8 sm:mb-12 transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-void border-b border-border">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[9px] text-tertiary ml-3 tracking-wider">
              error.log
            </span>
          </div>
          <div className="px-4 sm:px-6 py-4 sm:py-6 font-mono text-xs sm:text-sm text-left space-y-2">
            <p className="text-red-400">
              <span className="text-tertiary">$</span> curl{" "}
              <span className="text-secondary">
                {typeof window !== "undefined" ? window.location.href : ""}
              </span>
            </p>
            <p className="text-red-400">
              <span className="text-tertiary">→</span> HTTP/1.1{" "}
              <span className="text-red-500 font-medium">404 Not Found</span>
            </p>
            <p className="text-secondary mt-3">
              <span className="text-tertiary">$</span>{" "}
              {lang === "id"
                ? "Halaman yang kamu cari tidak ada atau telah dipindahkan."
                : "The page you're looking for doesn't exist or has been moved."}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-700 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="#"
            className="group relative inline-flex items-center justify-center border border-accent bg-accent/10 px-6 sm:px-8 py-3 sm:py-3.5 rounded-sm font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary overflow-hidden transition-all duration-300 hover:bg-accent hover:text-void"
          >
            {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
            <svg
              className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </a>
          <a
            href="#/all-projects"
            className="group relative inline-flex items-center justify-center border border-border px-6 sm:px-8 py-3 sm:py-3.5 rounded-sm font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary overflow-hidden transition-all duration-300 hover:border-accent hover:text-void bg-transparent"
          >
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10" />
            {lang === "id" ? "Lihat Proyek" : "View Projects"}
            <svg
              className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        {/* Suggested links */}
        <div
          className={`mt-10 sm:mt-14 transition-all duration-700 delay-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tertiary mb-4">
            {lang === "id" ? "Mungkin yang kamu cari:" : "Maybe you're looking for:"}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: lang === "id" ? "Proyek" : "Projects", href: "#projects" },
              { label: lang === "id" ? "Layanan" : "Services", href: "#services" },
              { label: lang === "id" ? "Tentang" : "About", href: "#about" },
              { label: lang === "id" ? "Kontak" : "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary border border-border/50 px-3 py-1.5 rounded-sm hover:border-accent hover:text-primary transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
