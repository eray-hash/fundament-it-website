import { LEISTUNGEN, REFERENZEN, SHOWCASES } from "../data/industrie";
import Reveal from "../components/Reveal";

function DimTick({ label }: { label: string }) {
  return (
    <div className="font-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[var(--ink-faint)]">
      <span className="h-px w-4 bg-[var(--ink-faint)]" />
      {label}
    </div>
  );
}

export default function Industrie() {
  return (
    <>
      <Hero />
      <Leistungen />
      <Showcase />
      <Referenzen />
      <Ablauf />
      <Cta />
    </>
  );
}

function Hero() {
  return (
    <section className="blueprint-grid grain relative overflow-hidden border-b border-[var(--hairline)]">
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--turquoise-soft),transparent_70%)]" />
      <div className="rise relative mx-auto max-w-6xl px-6 py-24 md:py-28">
        <DimTick label="Fundament IT — Industrie & Produktion" />
        <h1 className="font-display mt-6 max-w-3xl text-[2.15rem] leading-[1.05] tracking-tight sm:text-6xl sm:leading-[1.02]">
          Automatisierung, die bis in die{" "}
          <span className="bg-gradient-to-r from-[var(--violet)] to-[var(--turquoise)] bg-clip-text text-transparent">
            Produktionshalle
          </span>{" "}
          reicht.
        </h1>
        <p className="mt-8 max-w-2xl text-[15.5px] leading-relaxed text-[var(--ink-dim)]">
          Gemeinsam mit unserem Partner für Industrieautomation verbinden wir Steuerungstechnik,
          Leitsysteme und Software für produzierende Betriebe: von der Schaltanlage über die
          Visualisierung bis zur Anbindung an euer ERP. Alles aus einer Hand, zugeschnitten auf euren
          Prozess.
        </p>

        <div className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--hairline)]">
          {[
            { n: "10+", l: "Jahre Erfahrung" },
            { n: "25+", l: "installierte Systeme" },
            { n: String(REFERENZEN.length), l: "Referenzen" },
          ].map((s) => (
            <div key={s.l} className="bg-[var(--blueprint)] p-4 sm:p-5">
              <p className="font-display text-3xl font-semibold text-[var(--turquoise-text)]">{s.n}</p>
              <p className="mt-1 break-words text-[11.5px] leading-snug text-[var(--ink-dim)] sm:text-[12px]">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/#kontakt"
            className="rounded-sm bg-[var(--warm)] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[var(--warm-deep)]"
          >
            Projekt besprechen
          </a>
          <a
            href="#referenzen"
            className="font-mono inline-block py-2 text-[12px] uppercase tracking-[0.12em] text-[var(--ink-dim)] underline decoration-[var(--hairline-strong)] underline-offset-4 transition hover:text-[var(--ink)]"
          >
            Referenzen ansehen
          </a>
        </div>
      </div>
    </section>
  );
}

function Leistungen() {
  return (
    <section id="leistungen" className="border-b border-[var(--hairline)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <DimTick label="Was wir für Produktionsbetriebe bauen" />
        <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl">
          Von der Steuerung bis zum Dashboard.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Ob neue Anlage oder Modernisierung einer bestehenden: Ihr müsst nicht mehrere Dienstleister
          koordinieren. Wir liefern Hardware, Software und Inbetriebnahme gemeinsam.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEISTUNGEN.map((l, i) => (
            <Reveal key={l.title} delay={(i % 4) * 90}>
            <article
              className="group h-full overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--blueprint)] transition hover:border-[var(--hairline-strong)]"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[var(--blueprint-deep)]">
                <img
                  src={l.image}
                  alt={l.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--ink-faint)]">{l.tag}</span>
                <h3 className="font-display mt-2 text-[16px] font-semibold leading-snug">{l.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-dim)]">{l.text}</p>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="border-b border-[var(--hairline)] bg-[var(--blueprint-deep)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <DimTick label="Echte Projekte" />
        <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl">
          So sieht ein Leitsystem im Einsatz aus.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Das sind keine Mockups, sondern Oberflächen aus laufenden Anlagen. Die Beschriftungen sind
          auf Türkisch, weil die Projekte in der Türkei umgesetzt wurden. Für deutsche Betriebe bauen wir
          die Oberfläche selbstverständlich auf Deutsch.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {SHOWCASES.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
            <figure>
              <div className="overflow-hidden rounded-sm border border-[var(--hairline-strong)] bg-black">
                <img src={s.image} alt={s.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              </div>
              <figcaption className="mt-4">
                <p className="font-display text-[16px] font-semibold">{s.title}</p>
                <p className="font-mono mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                  {s.sub}
                </p>
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Referenzen() {
  return (
    <section id="referenzen" className="border-b border-[var(--hairline)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <DimTick label="Referenzen" />
        <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl">
          Betriebe, die auf unsere Systeme setzen.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Projekte, die wir gemeinsam mit unserem Partner umgesetzt haben, vor allem in der
          Futtermittel- und Lebensmittelindustrie.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-3 md:grid-cols-6">
          {REFERENZEN.map((r) => (
            <div key={r.name} className="flex flex-col items-center justify-between gap-3 bg-white p-5">
              <div className="flex h-20 w-full items-center justify-center">
                <img src={r.logo} alt={r.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
              <span className="font-mono text-center text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
                {r.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ablauf() {
  const steps = [
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
      text: "Auch danach bleibt ihr nicht allein: schnelle technische Hilfe, damit die Produktion läuft.",
    },
  ];
  return (
    <section className="blueprint-grid-fine border-b border-[var(--hairline)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <DimTick label="Ablauf" />
        <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl">
          Ein Ansprechpartner von Anfang bis Betrieb.
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-[var(--blueprint)] p-7">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--turquoise-text)]">{s.n}</span>
              <h3 className="font-display mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--ink-dim)]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Welche Anlage läuft bei euch noch von Hand?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Schildert uns kurz euren Betrieb. Wir melden uns mit einer ersten Einschätzung, ohne
          Verkaufsdruck.
        </p>
        <a
          href="/#kontakt"
          className="mt-8 inline-block rounded-sm bg-[var(--warm)] px-7 py-3.5 text-[13px] font-semibold text-white transition hover:bg-[var(--warm-deep)]"
        >
          Anfrage senden
        </a>
      </div>
    </section>
  );
}
