import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { REFERENZEN } from "../data/industrie";
// Schriften liegen auf dem eigenen Server, es wird nichts von Google geladen.
import "@fontsource-variable/geist/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import "./entwurf.css";

/** Solange der Entwurf neben der alten Seite läuft, hängen alle Seiten unter /entwurf. */
export const BASE = "/entwurf";
export const to = (path = "") => `${BASE}${path}` || "/";

export function useTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} · Fundament IT`;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

export function FMark() {
  return (
    <svg viewBox="0 0 512 672" role="img" aria-label="Fundament IT">
      <path d="M0,0 H512 V142 H144 V268 H430 V410 H144 V672 H0 Z" fill="currentColor" />
    </svg>
  );
}

const NAV = [
  { href: to("/leistungen"), label: "Leistungen" },
  { href: to("/industrie"), label: "Industrie" },
  { href: to("/check"), label: "Check" },
];

export function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const [away, setAway] = useState(false);

  // Kopfzeile weicht beim Herunterscrollen aus und kommt beim Hochscrollen zurück,
  // damit sie nicht über dem Inhalt liegt.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setAway(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="ew">
      <a href="#inhalt" className="ew-skip">
        Zum Inhalt springen
      </a>
      <header className="ew-nav" data-away={away && !open ? "" : undefined}>
        <div className="ew-wrap ew-nav-row">
          <Link to={to()} className="ew-brand">
            <FMark />
            <span className="ew-mono">Fundament IT</span>
          </Link>
          <nav className="ew-links ew-mono" aria-label="Hauptnavigation">
            {NAV.map((n) => (
              <Link key={n.href} to={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <a href="#kontakt">Kontakt</a>
          </nav>
          <button
            type="button"
            className="ew-menu-btn ew-mono"
            aria-expanded={open}
            aria-controls="ew-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Schließen" : "Menü"}
          </button>
        </div>
      </header>

      <div id="ew-menu" className="ew-menu" hidden={!open}>
        <nav className="ew-wrap" aria-label="Menü">
          <Link to={to()} onClick={() => setOpen(false)}>
            Start
          </Link>
          {NAV.map((n) => (
            <Link key={n.href} to={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <a href="#kontakt" onClick={() => setOpen(false)}>
            Kontakt
          </a>
        </nav>
      </div>

      <main id="inhalt">{children}</main>
    </div>
  );
}

/** Dunkler Seitenkopf für die Unterseiten: Kennzeile, große dünne Überschrift, optional Text und Knopf. */
export function PageHead({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <section className="ew-pagehead">
      <div className="ew-wrap ew-in">
        <p className="ew-mono ew-status" style={{ margin: 0 }}>
          <span className="ew-dot" />
          {label}
        </p>
        <h1 className="ew-h1 ew-h1-page">{title}</h1>
        {children && <div className="ew-hero-foot">{children}</div>}
      </div>
    </section>
  );
}

/** Kennzahlen und Logos der Referenzbetriebe (Startseite und Industrie). */
export function Referenzen({ intro }: { intro?: string }) {
  return (
    <section id="referenzen" className="ew-light">
      <div className="ew-wrap ew-section">
        <p className="ew-mono ew-label-light" style={{ margin: 0 }}>
          Referenzen
        </p>
        <h2 className="ew-h2">In Betrieb.</h2>
        {intro && <p className="ew-intro ew-intro-light">{intro}</p>}
        <div className="ew-facts">
          <div>
            <div className="ew-fact-n">10+</div>
            <div className="ew-fact-l">Jahre Erfahrung in der Industrieautomation</div>
          </div>
          <div>
            <div className="ew-fact-n">25+</div>
            <div className="ew-fact-l">installierte Systeme</div>
          </div>
          <div>
            <div className="ew-fact-n">{REFERENZEN.length}</div>
            <div className="ew-fact-l">Referenzbetriebe</div>
          </div>
        </div>
        <div className="ew-logos">
          {REFERENZEN.map((r) => (
            <div key={r.name} className="ew-logo">
              <img src={r.logo} alt={r.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Abschluss jeder Seite: Kontakt und Fußzeile. */
export function End({ title = "Welche Abläufe kosten euch am meisten Zeit?" }: { title?: string }) {
  return (
    <section id="kontakt" className="ew-rule-top">
      <div className="ew-wrap ew-end">
        <p className="ew-mono ew-label-dark" style={{ margin: 0 }}>
          Kontakt
        </p>
        <h2 className="ew-h2" style={{ maxWidth: "15ch" }}>
          {title}
        </h2>
        <a href="mailto:info@fundament-it.de" className="ew-mail">
          info@fundament-it.de
        </a>
        <dl className="ew-contact">
          <div>
            <dt className="ew-mono ew-label-dark">Ansprechpartner</dt>
            <dd>
              Eray Yesil
              <br />
              Gründer &amp; Geschäftsführer
            </dd>
          </div>
          <div>
            <dt className="ew-mono ew-label-dark">Telefon</dt>
            <dd>
              <a href="tel:+491704709952">0170 4709952</a>
            </dd>
          </div>
          <div>
            <dt className="ew-mono ew-label-dark">Standort</dt>
            <dd>
              Schwabstraße 3
              <br />
              89075 Ulm
            </dd>
          </div>
        </dl>
        <footer className="ew-foot ew-mono">
          <span>© 2026 Fundament IT UG (haftungsbeschränkt) i.G. · Ulm</span>
          <nav aria-label="Rechtliches">
            <Link to={to("/impressum")}>Impressum</Link>
            <Link to={to("/datenschutz")}>Datenschutz</Link>
          </nav>
        </footer>
      </div>
    </section>
  );
}
