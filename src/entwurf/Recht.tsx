import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { End, Shell, to, useTitle } from "./Shell";

function Seite({ title, children }: { title: string; children: ReactNode }) {
  useTitle(title);
  return (
    <Shell>
      <section className="ew-light ew-legal">
        <div className="ew-wrap">
          <Link to={to()} className="ew-mono ew-back">
            ← Startseite
          </Link>
          <h1>{title}</h1>
          <div className="ew-legal-body">{children}</div>
        </div>
      </section>
      <End />
    </Shell>
  );
}

function Abschnitt({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

const MAIL = <a href="mailto:info@fundament-it.de">info@fundament-it.de</a>;

export function Impressum() {
  return (
    <Seite title="Impressum">
      <Abschnitt heading="Angaben gemäß § 5 DDG">
        <p>
          Fundament IT UG (haftungsbeschränkt) i.G.
          <br />
          Schwabstraße 3
          <br />
          89075 Ulm
        </p>
        <p className="ew-note">
          Hinweis: Die Gesellschaft ist zum aktuellen Zeitpunkt noch nicht im Handelsregister eingetragen, daher
          der Zusatz „i.G.“ (in Gründung). Registergericht und Handelsregisternummer werden hier ergänzt, sobald
          die Eintragung erfolgt ist.
        </p>
      </Abschnitt>

      <Abschnitt heading="Vertreten durch">
        <p>Eray Yesil, Geschäftsführer</p>
      </Abschnitt>

      <Abschnitt heading="Kontakt">
        <p>
          Telefon: <a href="tel:+491704709952">0170 4709952</a>
          <br />
          E-Mail: {MAIL}
        </p>
      </Abschnitt>

      <Abschnitt heading="Registereintrag">
        <p>Amtsgericht Ulm. Die Handelsregisternummer wird nach der Eintragung ergänzt.</p>
      </Abschnitt>

      <Abschnitt heading="Umsatzsteuer-ID">
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: wird nach Erteilung ergänzt.</p>
      </Abschnitt>

      <Abschnitt heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Eray Yesil
          <br />
          Schwabstraße 3, 89075 Ulm
        </p>
      </Abschnitt>

      <Abschnitt heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Abschnitt>
    </Seite>
  );
}

export function Datenschutz() {
  return (
    <Seite title="Datenschutzerklärung">
      <Abschnitt heading="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          Fundament IT UG (haftungsbeschränkt) i.G.
          <br />
          Eray Yesil, Schwabstraße 3, 89075 Ulm
          <br />
          E-Mail: {MAIL}
        </p>
      </Abschnitt>

      <Abschnitt heading="2. Keine Cookies, kein Tracking">
        <p>
          Diese Website setzt bewusst <strong>keine Cookies</strong> und keine Analyse- oder Marketing-Tools ein,
          weder eigene noch von Drittanbietern. Es findet kein Tracking, kein Fingerprinting und keine Erstellung
          von Nutzungsprofilen statt. Schriften, Bilder und Skripte werden ausschließlich von unserem eigenen
          Webspace geladen. Da keine nicht technisch notwendigen Cookies gesetzt werden, ist kein Cookie-Banner
          erforderlich.
        </p>
      </Abschnitt>

      <Abschnitt heading="3. Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Beim Aufruf
          der Seite verarbeitet Vercel als unser Auftragsverarbeiter automatisch technische Zugriffsdaten (u. a.
          IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser), wie es bei jedem
          Webhosting technisch notwendig ist. Diese Daten dienen ausschließlich der Auslieferung und Absicherung
          der Website und werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website). Da Vercel Inc. in den USA
          ansässig ist, kann es dabei zu einer Datenübermittlung in ein Drittland kommen; Vercel verweist hierzu
          auf Standardvertragsklauseln als geeignete Garantie.
        </p>
      </Abschnitt>

      <Abschnitt heading="4. Kontaktaufnahme und Automatisierungs-Check">
        <p>
          Auf dieser Website gibt es kein Formular, das Daten an unsere Server sendet. Ein Klick auf unsere
          E-Mail-Adresse oder auf „Ergebnis besprechen“ öffnet lediglich das E-Mail-Programm deines Geräts. Die
          Übermittlung erfolgt erst, wenn du diese E-Mail selbst abschickst, direkt von deinem eigenen
          E-Mail-Konto an {MAIL}. Es gelten dann die Datenschutzbestimmungen deines E-Mail-Anbieters.
        </p>
        <p>
          Der Automatisierungs-Check rechnet ausschließlich in deinem Browser. Deine Angaben werden dabei weder
          übertragen noch gespeichert.
        </p>
        <p>
          Die von dir per E-Mail oder Telefon übermittelten Daten (zum Beispiel Name, E-Mail-Adresse, Nachricht)
          verarbeiten wir ausschließlich zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          DSGVO.
        </p>
      </Abschnitt>

      <Abschnitt heading="5. Deine Rechte">
        <p>
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung
          deiner personenbezogenen Daten sowie ein Recht auf Datenübertragbarkeit und Widerspruch gegen die
          Verarbeitung (Art. 15–21 DSGVO). Wende dich dazu an {MAIL}. Außerdem steht dir ein Beschwerderecht bei
          einer Datenschutzaufsichtsbehörde zu.
        </p>
      </Abschnitt>

      <p className="ew-note">Stand: November 2026</p>
    </Seite>
  );
}

export function NichtGefunden() {
  useTitle("Seite nicht gefunden");
  return (
    <Shell>
      <section className="ew-pagehead ew-404">
        <div className="ew-wrap">
          <p className="ew-mono ew-status" style={{ margin: 0 }}>
            <span className="ew-dot" />
            Fehler 404
          </p>
          <h1 className="ew-h1 ew-h1-page">Diese Seite gibt es nicht.</h1>
          <div className="ew-hero-foot">
            <p className="ew-lede">Der Link ist veraltet oder falsch getippt.</p>
            <Link to={to()} className="ew-pill">
              Zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
