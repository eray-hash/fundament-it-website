import { useMemo, useState } from "react";
import iconColor from "../assets/logo/fundament-it-icon-color.svg";
import { MODULES, PAIN_POINTS, BRANCHEN, HOURLY_RATE, type ModuleItem } from "../data/modules";
import { MODULE_ICONS } from "../components/ModuleIcons";

function DimTick({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`font-mono flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[var(--ink-faint)] ${className}`}>
      <span className="h-px w-4 bg-[var(--ink-faint)]" />
      {label}
    </div>
  );
}

export default function Home() {
  const [branche, setBranche] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const result = useMemo(() => {
    const chosen = PAIN_POINTS.filter((p) => selected.includes(p.id));
    const moduleIds = Array.from(new Set(chosen.map((p) => p.moduleId)));
    const scaleFactor = Math.max(1, Math.min(mitarbeiter / 5, 4));
    const hoursPerWeek = chosen.reduce((sum, p) => sum + p.hoursPerWeek * scaleFactor, 0);
    const monthly = Math.round(hoursPerWeek * 4.33 * HOURLY_RATE);
    return {
      modules: MODULES.filter((m) => moduleIds.includes(m.id)),
      hoursPerWeek: Math.round(hoursPerWeek),
      monthly,
    };
  }, [selected, mitarbeiter]);

  return (
    <>
      <Hero />
      <FoundationLine />
      <Modules />
      <SelfCheck
        branche={branche}
        setBranche={setBranche}
        mitarbeiter={mitarbeiter}
        setMitarbeiter={setMitarbeiter}
        selected={selected}
        toggle={toggle}
        submitted={submitted}
        setSubmitted={setSubmitted}
        result={result}
      />
      <About />
      <Kontakt />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="blueprint-grid grain relative overflow-hidden border-b border-[var(--hairline)]">
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--violet-soft),transparent_70%)]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--turquoise-soft),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
        <div>
          <DimTick label="Fundament IT — Automatisierung für den Mittelstand" />
          <h1 className="font-display mt-6 text-[13vw] leading-[0.98] tracking-tight sm:text-6xl md:text-[4.2rem]">
            Bevor man
            <br />
            aufstockt,
            <br />
            <span className="bg-gradient-to-r from-[var(--violet)] to-[var(--turquoise)] bg-clip-text text-transparent">
              braucht es ein Fundament.
            </span>
          </h1>
          <p className="mt-8 max-w-lg text-[15.5px] leading-relaxed text-[var(--ink-dim)]">
            Egal ob Elektrobetrieb, Praxis, Hotel oder Energieberatung: die immer gleiche
            Verwaltungsarbeit — Telefonate protokollieren, E-Mails sortieren, Kunden verwalten,
            Belege abtippen — lässt sich automatisieren. Wir bauen die Module dafür,
            zugeschnitten auf euren Betrieb.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#check"
              className="rounded-sm bg-[var(--warm)] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[var(--warm-deep)]"
            >
              Automatisierungs-Check starten
            </a>
            <a
              href="#module"
              className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--ink-dim)] underline decoration-[var(--hairline-strong)] underline-offset-4 transition hover:text-[var(--ink)]"
            >
              Module ansehen
            </a>
          </div>
        </div>

        <div className="relative hidden items-center justify-center md:flex">
          <div className="relative">
            <img src={iconColor} alt="Fundament IT F-Monogramm" className="h-64 w-auto drop-shadow-[0_0_60px_rgba(124,58,237,0.25)]" />
            <span className="font-mono absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.2em] text-[var(--ink-faint)]">
              512 × 672
            </span>
            <span className="font-mono absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] text-[var(--ink-faint)]">
              BAUPLAN F-01
            </span>
            <div className="absolute -inset-10 -z-10 rounded-full border border-dashed border-[var(--hairline)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FoundationLine() {
  return (
    <div className="relative border-b border-[var(--hairline)] bg-[var(--blueprint-deep)] py-2">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--ink-faint)]">GRUND­RISS · MODULE 01–09</span>
        <span className="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-[var(--hairline-strong)] to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--ink-faint)]">ULM · FUNDAMENT-IT.DE</span>
      </div>
    </div>
  );
}

function Modules() {
  return (
    <section id="module" className="relative border-b border-[var(--hairline)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <DimTick label="Was wir bauen" />
        <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl">
          Neun Module. Ein Fundament.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Jedes Modul löst ein konkretes Verwaltungsproblem. Ihr braucht nie alle — der Check
          unten zeigt, welche für euren Betrieb tatsächlich etwas bringen.
        </p>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => {
            const Icon = MODULE_ICONS[m.id];
            return (
              <div key={m.id} className="group relative bg-[var(--blueprint)] p-7 transition hover:bg-[var(--surface-hover)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--ink-faint)]">{m.spec}</span>
                  {Icon && (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--violet-soft)] to-[var(--turquoise-soft)]">
                      <Icon className="h-[18px] w-[18px] text-[var(--ink)]" />
                    </span>
                  )}
                </div>
                <h3 className="font-display mt-3 text-lg font-semibold">{m.label}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--ink-dim)]">{m.desc}</p>
                <span className="pointer-events-none absolute left-0 top-0 h-0 w-px bg-gradient-to-b from-[var(--violet)] to-[var(--turquoise)] transition-all duration-300 group-hover:h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SelfCheck(props: {
  branche: string;
  setBranche: (v: string) => void;
  mitarbeiter: number;
  setMitarbeiter: (v: number) => void;
  selected: string[];
  toggle: (id: string) => void;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  result: { modules: ModuleItem[]; hoursPerWeek: number; monthly: number };
}) {
  const { branche, setBranche, mitarbeiter, setMitarbeiter, selected, toggle, submitted, setSubmitted, result } = props;

  return (
    <section id="check" className="blueprint-grid-fine relative border-b border-[var(--hairline)] py-28">
      <div className="mx-auto max-w-4xl px-6">
        <DimTick label="Statik-Check" />
        <h2 className="font-display mt-4 text-4xl leading-tight tracking-tight sm:text-5xl">
          Was würde sich bei euch automatisieren lassen?
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Eine Frage pro Modul, drei kurze Angaben, sofortige Einschätzung — grobe Richtwerte,
          kein Angebot.
        </p>

        <div className="mt-12 grid gap-10 rounded-sm border border-[var(--hairline)] bg-[var(--blueprint-deep)] p-8 sm:p-10 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <label className="font-mono block text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                Branche
              </label>
              <input
                type="text"
                list="branchen-vorschlaege"
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
                placeholder="z. B. Elektrobetrieb, Zementfirma, Klinik …"
                className="mt-2 w-full rounded-sm border border-[var(--hairline)] bg-transparent px-3 py-2.5 text-[14px] text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-faint)] focus:border-[var(--turquoise)]"
              />
              <datalist id="branchen-vorschlaege">
                {BRANCHEN.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="font-mono flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                <span>Mitarbeiterzahl</span>
                <span className="text-[var(--turquoise-text)]">{mitarbeiter}</span>
              </label>
              <input
                type="range"
                min={1}
                max={50}
                value={mitarbeiter}
                onChange={(e) => setMitarbeiter(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--turquoise)]"
              />
            </div>

            <div>
              <span className="font-mono block text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                Wo geht gerade Zeit verloren? (1 Frage je Modul)
              </span>
              <div className="mt-3 space-y-2.5">
                {PAIN_POINTS.map((p) => (
                  <label
                    key={p.id}
                    className="flex cursor-pointer items-start gap-3 rounded-sm border border-[var(--hairline)] px-3 py-2.5 text-[13.5px] leading-snug transition hover:border-[var(--hairline-strong)]"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() => toggle(p.id)}
                      className="mt-0.5 accent-[var(--violet)]"
                    />
                    <span className="text-[var(--ink-dim)]">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              disabled={selected.length === 0}
              className="w-full rounded-sm bg-[var(--warm)] py-3 text-[13px] font-semibold text-white transition hover:bg-[var(--warm-deep)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Einschätzung anzeigen
            </button>
          </div>

          <div className="relative rounded-sm border border-[var(--hairline)] bg-[var(--blueprint)] p-7">
            {!submitted || selected.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-faint)]">
                  Ergebnis
                </span>
                <p className="mt-3 max-w-[26ch] text-[13.5px] text-[var(--ink-faint)]">
                  Wählt links mindestens einen Punkt aus — die Auswertung erscheint hier.
                </p>
              </div>
            ) : (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--turquoise-text)]">
                  Für {branche.trim() || "euren Betrieb"} · {mitarbeiter} MA
                </span>
                <p className="font-display mt-3 text-3xl font-semibold leading-tight">
                  ~{result.hoursPerWeek} Std./Woche
                </p>
                <p className="text-[13px] text-[var(--ink-dim)]">manuelle Verwaltungsarbeit, grob geschätzt</p>

                <div className="mt-5 rounded-sm border border-[var(--violet)]/30 bg-[var(--violet)]/[0.07] p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-faint)]">
                    Mögliches Sparpotenzial
                  </span>
                  <p className="font-display mt-1 text-2xl font-semibold text-[var(--turquoise-text)]">
                    ≈ {result.monthly.toLocaleString("de-DE")} € / Monat
                  </p>
                  <p className="mt-1 text-[11.5px] text-[var(--ink-faint)]">
                    Basis: {HOURLY_RATE} €/Std. Verwaltungskosten — grober Richtwert, kein Angebot.
                  </p>
                </div>

                <span className="font-mono mt-6 block text-[10px] uppercase tracking-[0.15em] text-[var(--ink-faint)]">
                  Passende Module
                </span>
                <ul className="mt-3 space-y-2">
                  {result.modules.map((m) => (
                    <li key={m.id} className="flex items-center gap-2 text-[13.5px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--turquoise)]" />
                      {m.label}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kontakt"
                  className="mt-7 block rounded-sm bg-[var(--warm)] py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-[var(--warm-deep)]"
                >
                  Ergebnis besprechen
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="ueber" className="relative border-b border-[var(--hairline)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <DimTick label="Wer das hier baut" />
            <h2 className="font-display mt-4 text-4xl leading-tight tracking-tight sm:text-5xl">
              Über Fundament IT
            </h2>
          </div>
          <div className="space-y-6 text-[15px] leading-relaxed text-[var(--ink-dim)]">
            <p>
              Fundament IT ist ein Ein-Personen-Software-Studio aus Ulm, gegründet von{" "}
              <span className="text-[var(--ink)]">Eray Yesil</span>. Der Antrieb dahinter: zu viele
              kleine und mittlere Betriebe verlieren jede Woche Stunden an Verwaltungsarbeit, die
              eigentlich niemand mehr von Hand machen müsste — Telefonnotizen, E-Mail-Chaos,
              Excel-Listen, abgetippte Belege.
            </p>
            <p>
              Statt fertiger Standardsoftware entstehen bei Fundament IT einzelne, passgenaue
              Module — jedes für ein konkretes Problem, kombinierbar je nach Betrieb.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--turquoise)] font-display text-xl font-bold text-[var(--blueprint)]">
                EY
              </div>
              <div>
                <p className="font-display text-[15px] font-semibold text-[var(--ink)]">Eray Yesil</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                  Gründer & Geschäftsführer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kontakt() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nachricht, setNachricht] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage über die Website von ${name || "..."}`);
    const body = encodeURIComponent(`${nachricht}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:info@fundament-it.de?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <DimTick label="Direkt Kontakt aufnehmen" />
        <h2 className="font-display mt-4 text-4xl leading-tight tracking-tight sm:text-5xl">
          Schreib mir direkt.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Kein Callcenter, keine Weiterleitung — deine Nachricht geht direkt an Eray.
        </p>

        <form onSubmit={send} className="mt-10 space-y-5 rounded-sm border border-[var(--hairline)] bg-[var(--blueprint-deep)] p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="font-mono block text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-sm border border-[var(--hairline)] bg-transparent px-3 py-2.5 text-[14px] outline-none transition focus:border-[var(--turquoise)]"
              />
            </div>
            <div>
              <label className="font-mono block text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">E-Mail</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-sm border border-[var(--hairline)] bg-transparent px-3 py-2.5 text-[14px] outline-none transition focus:border-[var(--turquoise)]"
              />
            </div>
          </div>
          <div>
            <label className="font-mono block text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">Nachricht</label>
            <textarea
              required
              rows={5}
              value={nachricht}
              onChange={(e) => setNachricht(e.target.value)}
              className="mt-2 w-full rounded-sm border border-[var(--hairline)] bg-transparent px-3 py-2.5 text-[14px] outline-none transition focus:border-[var(--turquoise)]"
            />
          </div>
          <button
            type="submit"
            className="rounded-sm bg-[var(--warm)] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[var(--warm-deep)]"
          >
            Nachricht senden
          </button>
          <p className="font-mono text-[10.5px] text-[var(--ink-faint)]">
            Öffnet dein E-Mail-Programm mit vorausgefüllter Nachricht an info@fundament-it.de.
          </p>
        </form>
      </div>
    </section>
  );
}
