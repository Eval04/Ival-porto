import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Navigation({ currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.contact"), href: "#contact" },
    { label: t("nav.playground"), href: "#/playground" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-void/80 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#"
          className="hover:opacity-80 transition-opacity duration-300"
        >
          <img src="/favicon.png" alt="Ival Permana" className="h-12 w-12 rounded" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300 py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          ))}

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="font-mono text-[10px] tracking-[0.1em] border border-border px-2.5 py-0.5 rounded-sm hover:border-accent hover:text-primary transition-all duration-300 flex items-center gap-1 cursor-pointer select-none ml-2"
          >
            <span className={lang === "id" ? "text-accent font-bold" : "text-secondary"}>ID</span>
            <span className="text-zinc-700">/</span>
            <span className={lang === "en" ? "text-accent font-bold" : "text-secondary"}>EN</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 justify-center"
          aria-label="Toggle menu"
        >
          <div
            className={`w-5 h-0.5 bg-primary transition-all duration-500 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-primary transition-all duration-500 ${mobileMenuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-primary transition-all duration-500 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-void/95 backdrop-blur-md border-b border-border animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300 py-3 px-2 block"
              >
                {link.label}
                <span className="absolute bottom-0 left-2 w-0 h-px bg-accent group-hover:w-[calc(100%-1rem)] transition-all duration-500 ease-out" />
              </a>
            ))}

            {/* Mobile Language Switcher */}
            <div className="py-3 px-2 border-t border-border mt-2">
              <button
                onClick={() => {
                  setLang(lang === "id" ? "en" : "id");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex justify-between items-center font-mono text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all duration-300 py-2 cursor-pointer"
              >
                <span>Language</span>
                <span className="flex gap-2">
                  <span className={lang === "id" ? "text-accent font-bold" : "text-secondary"}>ID</span>
                  <span className="text-zinc-700">/</span>
                  <span className={lang === "en" ? "text-accent font-bold" : "text-secondary"}>EN</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
