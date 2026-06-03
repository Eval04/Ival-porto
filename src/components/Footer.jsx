export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-void border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-mono text-[10px] text-tertiary tracking-wider">
          © 2024 Ival Permana. Semua sistem beroperasional.
        </span>
        <div className="flex gap-8">
          {["GitHub", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-tertiary hover:text-primary transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
