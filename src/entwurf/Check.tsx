import { useMemo, useState } from "react";
import { BRANCHEN, HOURLY_RATE, MODULES, PAIN_POINTS } from "../data/modules";
import { End, PageHead, Shell, useTitle } from "./Shell";

/** Automatisierungs-Check. Gerechnet wird nur im Browser, es wird nichts übertragen. */
export default function Check() {
  useTitle("Automatisierungs-Check");
  const [branche, setBranche] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const result = useMemo(() => {
    const chosen = PAIN_POINTS.filter((p) => selected.includes(p.id));
    const scale = Math.max(1, Math.min(mitarbeiter / 5, 4));
    const hours = chosen.reduce((sum, p) => sum + p.hoursPerWeek * scale, 0);
    return {
      modules: MODULES.filter((m) => chosen.some((p) => p.moduleId === m.id)),
      hoursPerWeek: Math.round(hours),
      monthly: Math.round(hours * 4.33 * HOURLY_RATE),
    };
  }, [selected, mitarbeiter]);

  const wer = branche.trim() || "euren Betrieb";
  const mail = useMemo(() => {
    const subject = `Automatisierungs-Check: ${branche.trim() || "Anfrage"}`;
    const body = [
      "Hallo Eray,",
      "",
      "ich habe den Automatisierungs-Check ausgefüllt und möchte das Ergebnis besprechen.",
      "",
      `Branche: ${branche.trim() || "(nicht angegeben)"}`,
      `Mitarbeiterzahl: ${mitarbeiter}`,
      `Geschätzter Aufwand: rund ${result.hoursPerWeek} Stunden pro Woche`,
      `Passende Module: ${result.modules.map((m) => m.label).join(", ")}`,
      "",
    ].join("\n");
    return `mailto:info@fundament-it.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [branche, mitarbeiter, result]);

  return (
    <Shell>
      <PageHead label="Automatisierungs-Check" title="Was ließe sich bei euch automatisieren?">
        <p className="ew-lede">Drei kurze Angaben, sofort eine Einschätzung. Grobe Richtwerte, kein Angebot.</p>
      </PageHead>

      <section className="ew-light">
        <div className="ew-wrap ew-section ew-check">
          <form className="ew-check-form" onSubmit={(e) => e.preventDefault()}>
            <div className="ew-field">
              <label htmlFor="ew-branche" className="ew-mono ew-label-light">
                01 · Branche
              </label>
              <input
                id="ew-branche"
                type="text"
                list="ew-branchen"
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
                placeholder="z. B. Elektrobetrieb"
                autoComplete="off"
              />
              <datalist id="ew-branchen">
                {BRANCHEN.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>

            <div className="ew-field">
              <label htmlFor="ew-ma" className="ew-mono ew-label-light">
                02 · Mitarbeiterzahl
              </label>
              <div className="ew-range">
                <input
                  id="ew-ma"
                  type="range"
                  min={1}
                  max={50}
                  value={mitarbeiter}
                  onChange={(e) => setMitarbeiter(Number(e.target.value))}
                />
                <output htmlFor="ew-ma">
                  {mitarbeiter}
                  {mitarbeiter === 50 ? "+" : ""}
                </output>
              </div>
            </div>

            <fieldset className="ew-field">
              <legend className="ew-mono ew-label-light">03 · Wo geht gerade Zeit verloren?</legend>
              <div className="ew-opts">
                {PAIN_POINTS.map((p) => (
                  <label key={p.id} className="ew-opt">
                    <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggle(p.id)} />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          <aside className="ew-result" aria-live="polite">
            {selected.length === 0 ? (
              <>
                <p className="ew-mono ew-label-dark">Ergebnis</p>
                <p className="ew-result-empty">
                  Wählt mindestens einen Punkt aus. Die Einschätzung erscheint dann hier.
                </p>
              </>
            ) : (
              <>
                <p className="ew-mono ew-label-dark">
                  Für {wer} · {mitarbeiter} Mitarbeitende
                </p>
                <p className="ew-result-n">~{result.hoursPerWeek} Std.</p>
                <p className="ew-result-l">manuelle Arbeit pro Woche, grob geschätzt</p>

                <div className="ew-result-row">
                  <p className="ew-mono ew-label-dark">Mögliches Sparpotenzial</p>
                  <p className="ew-result-n ew-result-n-s">≈ {result.monthly.toLocaleString("de-DE")} €</p>
                  <p className="ew-result-l">
                    pro Monat. Basis: {HOURLY_RATE} € je Stunde. Grober Richtwert, kein Angebot.
                  </p>
                </div>

                <div className="ew-result-row">
                  <p className="ew-mono ew-label-dark">Passende Module</p>
                  <ul>
                    {result.modules.map((m) => (
                      <li key={m.id}>{m.label}</li>
                    ))}
                  </ul>
                </div>

                <a href={mail} className="ew-pill">
                  Ergebnis besprechen
                </a>
              </>
            )}
          </aside>
        </div>
      </section>

      <End title="Lieber gleich persönlich sprechen?" />
    </Shell>
  );
}
