import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Scene3D from "./Scene3D";
import { REFERENZEN } from "../data/industrie";
import "./entwurf.css";

type HeroKind = "lamellen" | "schichten" | "pfaehle" | "module" | "produkte";

const HEROES: { id: HeroKind; label: string }[] = [
  { id: "lamellen", label: "Lamellen" },
  { id: "schichten", label: "Schichten" },
  { id: "pfaehle", label: "Pfähle" },
  { id: "module", label: "Module" },
  { id: "produkte", label: "Produkte" },
];

const SHOTS = [
  { src: "/projekte/scada-extruder.webp", cap: "Leitstand · Extruder-Linie" },
  { src: "/projekte/scada-3d.webp", cap: "3D-Ansicht · Pelletpresse" },
  { src: "/projekte/bericht.webp", cap: "Produktionsbericht" },
  { src: "/projekte/scada-presse.webp", cap: "Leitstand · Presse und Silos" },
  { src: "/projekte/scada-web.webp", cap: "Web-Leitstand" },
  { src: "/projekte/scada-verpackung.webp", cap: "Leitstand · Verpackung" },
];

const STATEMENT =
  "Wir automatisieren, was im Betrieb jeden Tag Zeit kostet. Im Büro sind das Telefon, E-Mail, Kundenverwaltung und Buchhaltung. In der Halle sind es Leitsysteme, Steuerung und Daten.";

const LEISTUNGEN = [
  {
    n: "01",
    title: "Büro-Automatisierung",
    text: "Wiederkehrende Verwaltungsarbeit läuft von selbst.",
    items: ["KI-Gesprächsassistent", "Voice Agent", "E-Mail-Automatisierung", "Buchhaltung"],
  },
  {
    n: "02",
    title: "Kunden & Überblick",
    text: "Alle Kunden, Projekte und Aufgaben an einem Ort.",
    items: ["CRM & Vertrieb", "Unternehmens-Cockpit", "Lead-Generierung", "Website & Auftritt"],
  },
  {
    n: "03",
    title: "Leitsysteme",
    text: "Die Anlage live im Blick, am Leitstand und unterwegs.",
    items: ["SCADA", "Web- und Mobil-Leitstand", "3D-Ansicht", "Berichte"],
  },
  {
    n: "04",
    title: "Steuerung & Daten",
    text: "Von der Schaltanlage bis zur Anbindung an euer ERP.",
    items: ["SPS-Programmierung", "Schaltschrankbau", "Inbetriebnahme", "ERP-Anbindung"],
  },
];

function FMark() {
  return (
    <svg viewBox="0 0 512 672" role="img" aria-label="Fundament IT">
      <path d="M0,0 H512 V142 H144 V268 H430 V410 H144 V672 H0 Z" fill="currentColor" />
    </svg>
  );
}

/** Text, dessen Wörter sich beim Scrollen nacheinander "einschalten". */
function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = (start - r.top) / (start - end + r.height * 0.6);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const poll = window.setInterval(update, 300);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(poll);
    };
  }, []);

  return (
    <p ref={ref} className="ew-statement">
      {words.map((w, i) => (
        <span key={i} style={{ opacity: progress * words.length > i ? 1 : 0.22 }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

function HeroVisual({ kind }: { kind: HeroKind }) {
  if (kind !== "produkte") return <Scene3D motif={kind} />;
  const colA = [SHOTS[0], SHOTS[2], SHOTS[4]];
  const colB = [SHOTS[1], SHOTS[3], SHOTS[5]];
  return (
    <div className="ew-wall" aria-hidden="true">
      <div className="ew-wall-plane">
        {[colA, colB].map((col, c) => (
          <div key={c} className="ew-wall-col">
            {[...col, ...col].map((s, i) => (
              <img key={i} src={s.src} alt="" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Entwurf() {
  const [params] = useSearchParams();
  const raw = params.get("hero");
  const hero: HeroKind = HEROES.some((h) => h.id === raw) ? (raw as HeroKind) : "lamellen";

  useEffect(() => {
    const prev = document.title;
    document.title = "Entwurf · Fundament IT";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="ew">
      <header className="ew-nav">
        <div className="ew-wrap ew-nav-row">
          <a href="/entwurf" className="ew-brand">
            <FMark />
            <span className="ew-mono">Fundament IT</span>
          </a>
          <nav className="ew-links ew-mono" aria-label="Hauptnavigation">
            <a href="#leistungen">Leistungen</a>
            <a href="#projekte">Projekte</a>
            <a href="#referenzen">Referenzen</a>
            <a href="#kontakt" className="ew-keep">
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="ew-hero">
          <HeroVisual kind={hero} />
          <div className="ew-hero-shade" />
          <div className="ew-hero-body">
            <div className="ew-wrap ew-in" key={hero}>
              <p className="ew-mono ew-status" style={{ margin: 0 }}>
                <span className="ew-dot" />
                Software &amp; Automatisierung · Ulm
              </p>
              <h1 className="ew-h1">Bevor man aufstockt, braucht es ein Fundament.</h1>
              <div className="ew-hero-foot">
                <p className="ew-lede">
                  Automatisierung für Büro und Produktion. Gebaut für euren Betrieb, nicht von der Stange.
                </p>
                <a href="#kontakt" className="ew-pill">
                  Projekt besprechen
                </a>
              </div>
            </div>
          </div>
          <span className="ew-mono ew-scroll">Scrollen</span>
        </section>

        <section className="ew-light">
          <div className="ew-wrap ew-section">
            <p className="ew-mono ew-label-light" style={{ margin: 0 }}>
              Was wir tun
            </p>
            <Statement text={STATEMENT} />
            <div className="ew-sign">
              <span className="ew-sign-name">Eray Yesil</span>
              <span className="ew-mono ew-label-light">Gründer &amp; Geschäftsführer</span>
            </div>
          </div>

          <div id="projekte" className="ew-reel">
            <div className="ew-reel-track">
              {[...SHOTS, ...SHOTS].map((s, i) => (
                <figure key={i} aria-hidden={i >= SHOTS.length}>
                  <img src={s.src} alt={i < SHOTS.length ? s.cap : ""} loading="lazy" />
                  <figcaption className="ew-mono">{s.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="leistungen">
          <div className="ew-wrap ew-section">
            <p className="ew-mono ew-label-dark" style={{ margin: 0 }}>
              Leistungen
            </p>
            <h2 className="ew-h2">Vier Bereiche.</h2>
            <div className="ew-cols">
              {LEISTUNGEN.map((l) => (
                <article key={l.n} className="ew-col">
                  <span className="ew-mono ew-label-dark">{l.n}</span>
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                  <ul>
                    {l.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="referenzen" className="ew-light">
          <div className="ew-wrap ew-section">
            <p className="ew-mono ew-label-light" style={{ margin: 0 }}>
              Referenzen
            </p>
            <h2 className="ew-h2">In Betrieb.</h2>
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

        <section id="kontakt">
          <div className="ew-wrap ew-end">
            <p className="ew-mono ew-label-dark" style={{ margin: 0 }}>
              Kontakt
            </p>
            <h2 className="ew-h2" style={{ maxWidth: "14ch" }}>
              Welche Abläufe kosten euch am meisten Zeit?
            </h2>
            <a href="mailto:info@fundament-it.de" className="ew-mail">
              info@fundament-it.de
            </a>
            <footer className="ew-foot ew-mono">
              <span>© 2026 Fundament IT UG (haftungsbeschränkt) i.G. · Ulm</span>
              <nav aria-label="Rechtliches">
                <a href="/impressum">Impressum</a>
                <a href="/datenschutz">Datenschutz</a>
              </nav>
            </footer>
          </div>
        </section>
      </main>

      <nav className="ew-switch ew-mono" aria-label="Varianten für den ersten Bildschirm">
        {HEROES.map((h) => (
          <a key={h.id} href={`/entwurf?hero=${h.id}`} aria-current={h.id === hero}>
            {h.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
