import { useEffect, useRef } from "react";

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll(".char");
    chars?.forEach((char, i) => {
      setTimeout(
        () => {
          char.style.opacity = "1";
          char.style.transform = "translateY(0)";
        },
        100 + i * 40,
      );
    });
  }, []);

  const name = "IVAL PERMANA";

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full">
        <div className="mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-tertiary">
            Developer Backend & Cloud Engineer
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-[13vw] md:text-[11vw] lg:text-[9vw] font-sans font-medium tracking-[-0.04em] leading-[0.85] text-primary mb-12"
        >
          {name.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block opacity-0 translate-y-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-8 max-w-5xl">
          <p className="max-w-lg text-secondary text-lg md:text-xl leading-relaxed text-balance">
            Saya membuat sistem yang kuat dan dapat berkembang. Memastikan
            semuanya berjalan dengan lancar dan dapat menangani pertumbuhan di
            masa depan.
          </p>

          <div className="font-mono text-[11px] text-tertiary flex items-center gap-3 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Siap membantu dengan konsultasi teknis
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex items-center gap-4">
        <div className="w-px h-16 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[slideDown_2.5s_ease-in-out_infinite]" />
        </div>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-tertiary"
          style={{ writingMode: "vertical-lr" }}
        >
          Gulir
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
