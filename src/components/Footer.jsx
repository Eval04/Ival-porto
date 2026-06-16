import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  
  // Simulated metric states
  const [productsShipped, setProductsShipped] = useState(5);
  const [linesOfCode, setLinesOfCode] = useState("42.8k");
  const [uptime, setUptime] = useState("");

  // Calculate uptime dynamically since June 1, 2026
  useEffect(() => {
    const calculateUptime = () => {
      const launchDate = new Date("2026-06-01T00:00:00Z");
      const diff = new Date() - launchDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setUptime(`${days}d ${hours}h ${mins}m ${secs}s`);
    };
    
    calculateUptime();
    const interval = setInterval(calculateUptime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-void border-t border-border select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-mono text-[10px] text-tertiary tracking-wider">
              {t("footer.rights")}
            </span>
            <button
              onClick={() => setIsTelemetryOpen((prev) => !prev)}
              className="group inline-flex items-center font-mono text-[10px] uppercase tracking-[0.15em] text-secondary hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 group-hover:bg-emerald-400 animate-pulse" />
              <span>{t("footer.status")}</span>
              <svg
                className={`w-3 h-3 ml-1 text-tertiary group-hover:text-primary transition-transform duration-300 ${
                  isTelemetryOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex gap-8">
            <a
              href="https://github.com/Eval04"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-tertiary hover:text-primary transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ival-permana-5273b6306"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-tertiary hover:text-primary transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Telemetry Dashboard Dropdown */}
        {isTelemetryOpen && (
          <div className="border-t border-border pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-tertiary">
                Products Shipped
              </span>
              <span className="font-mono text-xs text-primary font-medium">
                {productsShipped}+ products
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-tertiary">
                Lines Written
              </span>
              <span className="font-mono text-xs text-primary font-medium">
                ~{linesOfCode}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-tertiary">
                Home Server
              </span>
              <span className="font-mono text-xs text-emerald-500 font-medium flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-500" />
                Online (Docker)
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-tertiary">
                Builder Uptime
              </span>
              <span className="font-mono text-xs text-primary font-medium">
                {uptime}
              </span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
