import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Portofolio", href: "#projects" },
    { label: "Tentang", href: "#about" },
    { label: "Teknologi", href: "#skills" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-void/80 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm tracking-[0.2em] text-primary hover:text-accent transition-colors duration-300"
        >
          IVAL.PERMANA
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
          </div>
        </div>
      )}
    </nav>
  );
}
