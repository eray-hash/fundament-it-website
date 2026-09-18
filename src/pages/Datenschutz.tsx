import LegalPage, { LegalSection } from "../components/LegalPage";

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <LegalSection heading="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          Fundament IT UG (haftungsbeschränkt) i.G.
          <br />
          Eray Yesil, Schwabstraße 3, 89075 Ulm
          <br />
          E-Mail:{" "}
          <a href="mailto:info@fundament-it.de" className="text-[var(--turquoise-text)] hover:underline">
            info@fundament-it.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="2. Keine Cookies, kein Tracking">
        <p>
          Diese Website setzt bewusst <strong className="text-[var(--ink)]">keine Cookies</strong> und
          keine Analyse- oder Marketing-Tools ein — weder eigene noch von Drittanbietern. Es
          findet kein Tracking, kein Fingerprinting und keine Erstellung von Nutzungsprofilen
          statt. Da keine nicht-technisch-notwendigen Cookies gesetzt werden, ist kein
          Cookie-Banner erforderlich.
        </p>
      </LegalSection>

      <LegalSection heading="3. Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
          gehostet. Beim Aufruf der Seite verarbeitet Vercel als unser Auftragsverarbeiter
          automatisch technische Zugriffsdaten (u. a. IP-Adresse, Datum und Uhrzeit des
          Zugriffs, aufgerufene Seite, verwendeter Browser), wie es bei jedem Webhosting
          technisch notwendig ist. Diese Daten dienen ausschließlich der Auslieferung und
          Absicherung der Website und werden nicht mit anderen Datenquellen zusammengeführt.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren
          Betrieb der Website). Da Vercel Inc. in den USA ansässig ist, kann es dabei zu einer
          Datenübermittlung in ein Drittland kommen; Vercel verweist hierzu auf
          Standardvertragsklauseln als geeignete Garantie.
        </p>
      </LegalSection>

      <LegalSection heading="4. Kontaktformular">
        <p>
          Das Kontaktformular auf dieser Seite versendet keine Daten an unsere Server. Beim
          Absenden wird lediglich das E-Mail-Programm deines Geräts mit einer vorausgefüllten
          Nachricht geöffnet — die Übermittlung erfolgt erst, wenn du diese E-Mail selbst
          abschickst, direkt von deinem eigenen E-Mail-Konto an{" "}
          <a href="mailto:info@fundament-it.de" className="text-[var(--turquoise-text)] hover:underline">
            info@fundament-it.de
          </a>
          . Es gelten dann die Datenschutzbestimmungen deines E-Mail-Anbieters. Die von dir per
          E-Mail übermittelten Daten (Name, E-Mail-Adresse, Nachricht) verarbeiten wir
          ausschließlich zur Bearbeitung deiner Anfrage, Rechtsgrundlage Art. 6 Abs. 1 lit. b
          DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="5. Deine Rechte">
        <p>
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung
          der Verarbeitung deiner personenbezogenen Daten sowie ein Recht auf
          Datenübertragbarkeit und Widerspruch gegen die Verarbeitung (Art. 15–21 DSGVO). Wende
          dich dazu an{" "}
          <a href="mailto:info@fundament-it.de" className="text-[var(--turquoise-text)] hover:underline">
            info@fundament-it.de
          </a>
          . Außerdem steht dir ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.
        </p>
      </LegalSection>

      <p className="font-mono text-[12px] text-[var(--ink-faint)]">Stand: September 2026</p>
    </LegalPage>
  );
}
