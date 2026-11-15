import { LEISTUNGEN, SHOWCASES } from "../data/industrie";
import { End, PageHead, Referenzen, Shell, useTitle } from "./Shell";

// Für die ersten vier Leistungen gibt es große Aufnahmen aus laufenden Anlagen,
// die übrigen vier (Hardware und Vor-Ort-Arbeit) stehen als Textspalten.
const MIT_BILD = LEISTUNGEN.slice(0, 4);
const OHNE_BILD = LEISTUNGEN.slice(4);

const ABLAUF = [
  {
    n: "01",
    title: "Planung",
    text: "Wir schauen uns euren Prozess an, klären Ziele und Anforderungen und legen den Umfang fest.",
  },
  {
    n: "02",
    title: "Umsetzung",
    text: "Schaltschränke, Steuerungssoftware, Leitsystem und Schnittstellen entstehen aufeinander abgestimmt.",
  },
  {
    n: "03",
    title: "Inbetriebnahme",
    text: "Wir nehmen die Anlage vor Ort in Betrieb und prüfen alles im Zusammenspiel.",
  },
  {
    n: "04",
    title: "Betrieb & Support",
    text: "Auch danach bleibt ihr nicht allein. Ihr bekommt schnelle technische Hilfe, damit die Produktion läuft.",
  },
];

export default function Industrie() {
  useTitle("Industrie");
  return (
    <Shell>
      <PageHead label="Industrie & Produktion" title="Automatisierung, die bis in die Produktionshalle reicht.">
        <p className="ew-lede">
          Gemeinsam mit unserem Partner für Industrieautomation verbinden wir Steuerungstechnik, Leitsysteme und
          Software für produzierende Betriebe.
        </p>
        <a href="#kontakt" className="ew-pill">
          Projekt besprechen
        </a>
      </PageHead>

      <section className="ew-light">
        <div className="ew-wrap ew-section">
          <p className="ew-mono ew-label-light" style={{ margin: 0 }}>
            Leistungen
          </p>
          <h2 className="ew-h2">Von der Steuerung bis zum Dashboard.</h2>
          <p className="ew-intro ew-intro-light">
            Ob neue Anlage oder Modernisierung: Ihr müsst nicht mehrere Dienstleister koordinieren. Hardware,
            Software und Inbetriebnahme kommen gemeinsam.
          </p>

          <div className="ew-cards">
            {MIT_BILD.map((l) => (
              <article key={l.title}>
                <img src={l.image} alt="" loading="lazy" />
                <span className="ew-mono ew-label-light">{l.tag}</span>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </article>
            ))}
          </div>

          <div className="ew-cols ew-cols-light">
            {OHNE_BILD.map((l) => (
              <article key={l.title} className="ew-col">
                <span className="ew-mono ew-label-light">{l.tag}</span>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="ew-wrap ew-section">
          <p className="ew-mono ew-label-dark" style={{ margin: 0 }}>
            Aus laufenden Anlagen
          </p>
          <h2 className="ew-h2">So sieht ein Leitsystem im Einsatz aus.</h2>
          <p className="ew-intro">
            Das sind keine Entwürfe, sondern Oberflächen aus laufenden Anlagen. Die Beschriftungen sind auf
            Türkisch, weil die Projekte in der Türkei umgesetzt wurden. Für deutsche Betriebe bauen wir die
            Oberfläche auf Deutsch.
          </p>
          <div className="ew-shows">
            {SHOWCASES.map((s) => (
              <figure key={s.title}>
                <img src={s.image} alt={s.title} loading="lazy" />
                <figcaption>
                  <span>{s.title}</span>
                  <span className="ew-mono ew-label-dark">{s.sub}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Referenzen intro="Projekte, die wir gemeinsam mit unserem Partner umgesetzt haben, vor allem in der Futtermittel- und Lebensmittelindustrie." />

      <section>
        <div className="ew-wrap ew-section">
          <p className="ew-mono ew-label-dark" style={{ margin: 0 }}>
            Ablauf
          </p>
          <h2 className="ew-h2" style={{ maxWidth: "16ch" }}>
            Ein Ansprechpartner von Anfang bis Betrieb.
          </h2>
          <div className="ew-cols">
            {ABLAUF.map((s) => (
              <article key={s.n} className="ew-col">
                <span className="ew-mono ew-label-dark">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <End title="Welche Anlage läuft bei euch noch von Hand?" />
    </Shell>
  );
}
