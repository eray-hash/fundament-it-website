import { Link } from "react-router-dom";
import iconColor from "../assets/logo/fundament-it-icon-color.svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--hairline)] bg-[var(--blueprint)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={iconColor} alt="" className="h-6 w-auto" />
          <span className="font-display text-[15px] font-semibold tracking-tight">Fundament IT</span>
        </Link>
        <nav className="font-mono hidden gap-8 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dim)] sm:flex">
          <a href="/#module" className="transition hover:text-[var(--ink)]">
            Module
          </a>
          <a href="/#check" className="transition hover:text-[var(--ink)]">
            Automatisierungs-Check
          </a>
          <a href="/#ueber" className="transition hover:text-[var(--ink)]">
            Über uns
          </a>
          <a href="/#kontakt" className="transition hover:text-[var(--ink)]">
            Kontakt
          </a>
        </nav>
        <a
          href="/#check"
          className="font-mono rounded-sm border border-[var(--turquoise)]/50 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--turquoise-text)] transition hover:bg-[var(--turquoise)]/10"
        >
          Check starten
        </a>
      </div>
    </header>
  );
}
