import { useState } from "react";
import { Link } from "react-router-dom";
import iconColor from "../assets/logo/fundament-it-icon-color.svg";

const NAV = [
  { label: "Module", href: "/#module" },
  { label: "Industrie", to: "/industrie" },
  { label: "Automatisierungs-Check", href: "/#check" },
  { label: "Über uns", href: "/#ueber" },
  { label: "Kontakt", href: "/#kontakt" },
];

const linkClass = "transition hover:text-[var(--ink)]";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--hairline)] bg-[var(--blueprint)]/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-sm focus:bg-[var(--ink)] focus:px-3 focus:py-2 focus:text-[12px] focus:text-[var(--blueprint)]"
      >
        Zum Inhalt springen
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={close} className="flex items-center gap-2.5" aria-label="Fundament IT – Startseite">
          <img src={iconColor} alt="" className="h-6 w-auto" />
          <span className="font-display whitespace-nowrap text-[15px] font-semibold tracking-tight">Fundament IT</span>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="font-mono hidden gap-8 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dim)] md:flex"
        >
          {NAV.map((n) =>
            n.to ? (
              <Link key={n.label} to={n.to} className={linkClass}>
                {n.label}
              </Link>
            ) : (
              <a key={n.label} href={n.href} className={linkClass}>
                {n.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#check"
            className="font-mono hidden whitespace-nowrap rounded-sm border border-[var(--turquoise)]/50 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--turquoise-text)] transition hover:bg-[var(--turquoise)]/10 sm:inline-block"
          >
            Check starten
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--hairline-strong)] md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-[var(--ink)] transition-all duration-200 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-[1.5px] w-5 bg-[var(--ink)] transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-[var(--ink)] transition-all duration-200 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile Navigation"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-[var(--hairline)] bg-[var(--blueprint)]`}
      >
        <ul className="mx-auto max-w-6xl px-6 py-3">
          {NAV.map((n) => (
            <li key={n.label} className="border-b border-[var(--hairline)] last:border-0">
              {n.to ? (
                <Link
                  to={n.to}
                  onClick={close}
                  className="font-mono block py-3.5 text-[12px] uppercase tracking-[0.14em] text-[var(--ink)]"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  href={n.href}
                  onClick={close}
                  className="font-mono block py-3.5 text-[12px] uppercase tracking-[0.14em] text-[var(--ink)]"
                >
                  {n.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
