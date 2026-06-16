import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Terminal() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input on open or click
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, history]);

  // Initial welcome message
  useEffect(() => {
    const welcome =
      lang === "id"
        ? [
            "Selamat datang di Terminal Portofolio Ival Permana (v2.0.0).",
            "Software Developer & Product Builder.",
            "Ketik 'help' untuk melihat daftar perintah yang tersedia.",
            "",
          ]
        : [
            "Welcome to Ival Permana's Terminal Portfolio (v2.0.0).",
            "Software Developer & Product Builder.",
            "Type 'help' to see the list of available commands.",
            "",
          ];
    setHistory(welcome);
  }, [lang]);

  // Scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Keyboard shortcut Ctrl + ` and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    const newHistory = [...history, `ival@permana:~$ ${cmdText}`];

    if (!cleanCmd) {
      setHistory(newHistory);
      return;
    }

    let output = [];

    switch (cleanCmd) {
      case "help":
        output =
          lang === "id"
            ? [
                "Perintah yang tersedia:",
                "  about    - Menampilkan bio singkat",
                "  skills   - Menampilkan pohon teknologi & peralatan",
                "  projects - Menampilkan daftar proyek beserta tautan",
                "  services - Menampilkan layanan yang ditawarkan",
                "  neofetch - Menampilkan info sistem & spesifikasi",
                "  clear    - Membersihkan layar terminal",
                "  exit     - Keluar dari mode terminal",
              ]
            : [
                "Available commands:",
                "  about    - Display brief bio",
                "  skills   - Show technologies & tools tree",
                "  projects - List key projects with links",
                "  services - Show services offered",
                "  neofetch - Display system info & specs",
                "  clear    - Clear terminal screen",
                "  exit     - Close CLI terminal mode",
              ];
        break;

      case "about":
        output = [
          t("hero.role"),
          "----------------------------------------",
          t("hero.about"),
          "",
          t("about.whoami"),
        ];
        break;

      case "skills":
        output = [
          ".",
          `├── ${t("skills.categories.frontend")}`,
          "│   ├── React.js",
          "│   ├── Vue.js",
          "│   ├── HTML / CSS",
          "│   └── Dart / Flutter",
          `├── ${t("skills.categories.backend")}`,
          "│   ├── Node.js",
          "│   ├── Python",
          "│   ├── FastAPI",
          "│   ├── Java",
          "│   └── PHP",
          `├── ${t("skills.categories.database")}`,
          "│   ├── PostgreSQL",
          "│   ├── MySQL / XAMPP",
          "│   ├── Redis",
          "│   └── Firebase",
          `└── ${t("skills.categories.deploy")}`,
          "    ├── Docker",
          "    ├── Cloud Architecture",
          "    └── AI Integration",
        ];
        break;

      case "projects":
        output = [
          "1. EcoTrace (2026)",
          `   - ${t("projects.list.ecotrace.subtitle")}`,
          `   - Link: https://ecotrace-id.vercel.app/`,
          "",
          "2. CodeTack (2025)",
          `   - ${t("projects.list.codetack.subtitle")}`,
          `   - Link: https://justrahyan.github.io/CodeTack/`,
          "",
          "3. LinkinBio AI (2026)",
          `   - ${t("projects.list.linkinbio.subtitle")}`,
          `   - Link: https://link-bio-puce.vercel.app/`,
          "",
          "4. ResearchFinder (2026) ★ Featured",
          `   - ${t("projects.list.researchfinder.subtitle")}`,
          `   - Link: https://github.com/Vals-devs/ReaserchHelper.git`,
          "",
          "5. SiagaDarah (2025)",
          `   - ${t("projects.list.siagadarah.subtitle")}`,
          `   - Link: [${t("projects.privateRepo")}]`,
        ];
        break;

      case "services":
        output =
          lang === "id"
            ? [
                "Layanan yang saya tawarkan:",
                "",
                "01  Landing Page & Company Profile",
                "    → Website responsif untuk bisnis kamu",
                "",
                "02  Aplikasi Web Custom",
                "    → Dashboard, management system, business tools",
                "",
                "03  Aplikasi Mobile",
                "    → Flutter apps untuk iOS & Android",
                "",
                "04  Pengembangan MVP",
                "    → Validasi ide dengan produk minimum",
                "",
                "Hubungi: ivalpermana24@gmail.com",
              ]
            : [
                "Services I offer:",
                "",
                "01  Landing Pages & Company Profiles",
                "    → Responsive websites for your business",
                "",
                "02  Custom Web Applications",
                "    → Dashboards, management systems, business tools",
                "",
                "03  Mobile Applications",
                "    → Flutter apps for iOS & Android",
                "",
                "04  MVP Development",
                "    → Validate ideas with minimum viable products",
                "",
                "Contact: ivalpermana24@gmail.com",
              ];
        break;

      case "neofetch":
        const logo = [
          "  ___             _ ",
          " |_ _|__   __ _ _| |",
          "  | |\\ \\ / / _` | |",
          "  | | \\ V / (_| | |",
          " |___| \\_/ \\__,_|_|",
          "",
        ];
        const sysInfo = [
          "ival@permana",
          "------------",
          "Role: Software Developer & Product Builder",
          "Host: Ival Portfolio v2.0.0",
          "Kernel: React 18.2.0 + Vite",
          "Shell: bash 5.2.15",
          "Theme: Custom Dark Void (Cyberpunk)",
          "Terminal: Web-CLI",
          "Products: 5+ shipped",
          "Stack: Web + Mobile + AI",
        ];
        // Zip logo and info
        const maxLength = Math.max(logo.length, sysInfo.length);
        for (let i = 0; i < maxLength; i++) {
          const l = logo[i] || "".padEnd(20);
          const s = sysInfo[i] || "";
          output.push(`${l.padEnd(24)}${s}`);
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "exit":
        setIsOpen(false);
        return;

      default:
        output =
          lang === "id"
            ? [
                `Command not found: '${cleanCmd}'.`,
                "Ketik 'help' untuk daftar perintah.",
              ]
            : [
                `Command not found: '${cleanCmd}'.`,
                "Type 'help' for available commands.",
              ];
    }

    setHistory([...newHistory, ...output, ""]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputValue);
    setInputValue("");
  };

  return (
    <>
      {/* Floating CLI Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[60] bg-void border border-border text-accent w-12 h-12 rounded-full flex items-center justify-center font-mono text-base hover:border-accent-warm hover:text-accent-warm transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        title={lang === "id" ? "Buka Terminal Mode" : "Open Terminal Mode"}
        aria-label="Toggle terminal"
      >
        <span>&gt;_</span>
      </button>

      {/* Terminal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-void/95 backdrop-blur-md z-[100] flex flex-col p-4 sm:p-8 md:p-12 font-mono text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-secondary select-text overflow-hidden"
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          {/* Terminal Title Bar */}
          <div className="flex justify-between items-center border-b border-border pb-3 mb-6 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-tertiary ml-2 text-[10px] sm:text-[11px] uppercase tracking-wider">
                ival@permana: ~ (CLI Mode)
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-tertiary hover:text-primary transition-colors duration-300 text-xs uppercase tracking-widest cursor-pointer px-2 py-0.5 border border-border hover:border-primary rounded-sm"
            >
              {lang === "id" ? "Tutup [ESC]" : "Close [ESC]"}
            </button>
          </div>

          {/* Terminal History Display */}
          <div className="flex-grow overflow-y-auto pr-2 mb-4 space-y-1 scrollbar-thin select-text">
            {history.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {line.startsWith("ival@permana:~$") ? (
                  <span className="text-primary font-medium">{line}</span>
                ) : (
                  line
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Prompt Form */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center border-t border-border pt-4 select-none"
          >
            <span className="text-primary font-medium mr-2">ival@permana:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent border-none outline-none text-primary caret-accent flex-grow w-full font-mono p-0 m-0 focus:ring-0"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>
        </div>
      )}
    </>
  );
}
