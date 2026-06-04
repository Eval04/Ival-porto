import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef(null);
  const { lang, t } = useLanguage();

  const terminalContent = [
    { type: "command", text: "whoami" },
    { type: "output", text: "IVAL PERMANA" },
    { type: "command", text: "cat role.txt" },
    { type: "output", text: t("hero.role") },
    { type: "command", text: "cat about.txt" },
    {
      type: "output",
      text: t("hero.about"),
    },
    { type: "command", text: "systemctl status availability" },
    {
      type: "output",
      text: t("hero.availability"),
      status: "active",
    },
  ];

  useEffect(() => {
    // Reset typing animation when language changes
    setLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
    setIsTyping(true);
  }, [lang]);

  useEffect(() => {
    if (currentLine >= terminalContent.length) {
      setIsTyping(false);
      return;
    }

    const line = terminalContent[currentLine];
    const text = line.text;

    if (currentChar < text.length) {
      const timer = setTimeout(
        () => {
          setCurrentChar((prev) => prev + 1);
        },
        15 + Math.random() * 15,
      );
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(
        () => {
          setLines((prev) => [...prev, { ...line, typed: text }]);
          setCurrentLine((prev) => prev + 1);
          setCurrentChar(0);
        },
        line.type === "command" ? 150 : 300,
      );
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentChar, currentLine]);

  const getCurrentTypingText = () => {
    if (currentLine >= terminalContent.length) return "";
    return terminalContent[currentLine].text.slice(0, currentChar);
  };

  const getCurrentLineType = () => {
    if (currentLine >= terminalContent.length) return null;
    return terminalContent[currentLine].type;
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        <div className="border border-border rounded-sm overflow-hidden bg-surface/90 backdrop-blur-sm shadow-2xl shadow-void/50">
          <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-void border-b border-border">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors" />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-tertiary ml-3 sm:ml-4 tracking-wider">
              ival@portfolio — ~/
            </span>
          </div>

          <div
            ref={terminalRef}
            className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 font-mono text-sm sm:text-base md:text-lg leading-relaxed min-h-[60vh] sm:min-h-[50vh] max-h-[70vh] overflow-y-auto"
          >
            {lines.map((line, index) => (
              <div key={index} className="mb-1 sm:mb-2">
                {line.type === "command" ? (
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 shrink-0">$</span>
                    <span className="text-accent">{line.typed}</span>
                  </div>
                ) : line.status === "active" ? (
                  <div className="flex items-start gap-2 pl-0 sm:pl-4">
                    <span className="text-emerald-500 mt-1 shrink-0">●</span>
                    <span className="text-primary">{line.typed}</span>
                  </div>
                ) : (
                  <div className="pl-0 sm:pl-4">
                    <span
                      className={
                        index === 1
                          ? "text-primary text-xl sm:text-2xl md:text-3xl font-medium tracking-tight"
                          : "text-secondary"
                      }
                    >
                      {line.typed}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && currentLine < terminalContent.length && (
              <div className="flex items-start gap-2">
                {getCurrentLineType() === "command" ? (
                  <>
                    <span className="text-emerald-500 shrink-0">$</span>
                    <span className="text-accent">
                      {getCurrentTypingText()}
                      <span
                        className={`inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-accent ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-75`}
                      />
                    </span>
                  </>
                ) : (
                  <div className="pl-0 sm:pl-4">
                    <span
                      className={
                        currentLine === 1
                          ? "text-primary text-xl sm:text-2xl md:text-3xl font-medium tracking-tight"
                          : "text-secondary"
                      }
                    >
                      {getCurrentTypingText()}
                    </span>
                    <span
                      className={`inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-primary ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-75`}
                    />
                  </div>
                )}
              </div>
            )}

            {!isTyping && (
              <div className="flex items-start gap-2 mt-2">
                <span className="text-emerald-500 shrink-0">$</span>
                <span
                  className={`inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-accent ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-75`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator — FIX JARAK, DIJAUHKAN DARI TERMINAL */}
      <div className="absolute bottom-6 sm:bottom-10 left-2 sm:left-4 md:left-8 lg:left-16 flex items-center gap-2 sm:gap-4">
        <div className="w-px h-12 sm:h-16 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[slideDown_2.5s_ease-in-out_infinite]" />
        </div>
        <span
          className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-tertiary"
          style={{ writingMode: "vertical-lr" }}
        >
          {t("hero.scroll")}
        </span>
      </div>

      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
