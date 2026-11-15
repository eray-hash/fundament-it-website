import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Scene3D, { type Motif } from "./Scene3D";
import { End, Referenzen, Shell, to, useTitle } from "./Shell";

type HeroKind = Motif | "produkte";

// Engere Auswahl für den ersten Bildschirm. Die übrigen Motive bleiben bis zur
// endgültigen Entscheidung über ?hero=<name> erreichbar.
const HEROES: { id: HeroKind; label: string }[] = [
  { id: "schichten", label: "Schichten" },
  { id: "pfaehle", label: "Pfähle" },
  { id: "fliessband", label: "Fließband" },
];
const WEITERE: HeroKind[] = ["lamellen", "module", "linien", "ringe", "halle", "leiterbahnen", "produkte"];

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

const BEREICHE = [
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

export default function Start() {
  useTitle("Entwurf");
  const [params] = useSearchParams();
  const raw = params.get("hero");
  const known = HEROES.some((h) => h.id === raw) || WEITERE.includes(raw as HeroKind);
  const hero: HeroKind = known ? (raw as HeroKind) : "schichten";

  return (
    <Shell>
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
            {BEREICHE.map((l) => (
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
          <div className="ew-more">
            <Link to={to("/leistungen")} className="ew-arrow">
              Alle 13 Module
            </Link>
            <Link to={to("/industrie")} className="ew-arrow">
              Industrie im Detail
            </Link>
            <Link to={to("/check")} className="ew-arrow">
              Automatisierungs-Check
            </Link>
          </div>
        </div>
      </section>

      <Referenzen />

      <section id="ueber">
        <div className="ew-wrap ew-section ew-split">
          <div>
            <p className="ew-mono ew-label-dark" style={{ margin: 0 }}>
              Über Fundament IT
            </p>
            <h2 className="ew-h2 ew-h2-s">Ein Ansprechpartner. Vom Büro bis an die Anlage.</h2>
          </div>
          <div className="ew-prose">
            <p>
              Fundament IT ist ein Software-Studio aus Ulm, gegründet von Eray Yesil. Der Antrieb dahinter: Zu
              viele Betriebe verlieren jede Woche Stunden an Arbeit, die niemand mehr von Hand machen müsste.
              Telefonnotizen, E-Mail-Chaos, Excel-Listen, abgetippte Belege.
            </p>
            <p>
              Statt fertiger Standardsoftware entstehen einzelne, passgenaue Module. Jedes löst ein konkretes
              Problem, und ihr kombiniert sie so, wie es zu eurem Betrieb passt.
            </p>
            <p>
              Für Produktionsbetriebe arbeiten wir mit einem Spezialisten für Industrieautomation zusammen, der
              über zehn Jahre Erfahrung mitbringt. Ansprechpartner bleibt immer Eray.
            </p>
          </div>
        </div>
      </section>

      <End />

      <nav className="ew-switch ew-mono" aria-label="Varianten für den ersten Bildschirm">
        {HEROES.map((h) => (
          <a key={h.id} href={`${to()}?hero=${h.id}`} aria-current={h.id === hero}>
            {h.label}
          </a>
        ))}
      </nav>
    </Shell>
  );
}
