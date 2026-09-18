import LegalPage, { LegalSection } from "../components/LegalPage";

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p>
          Fundament IT UG (haftungsbeschränkt) i.G.
          <br />
          Schwabstraße 3
          <br />
          89075 Ulm
        </p>
        <p className="font-mono text-[13px] text-[var(--ink-faint)]">
          Hinweis: Die Gesellschaft ist zum aktuellen Zeitpunkt noch nicht im Handelsregister
          eingetragen, daher der Zusatz „i.G." (in Gründung). Registergericht und
          Handelsregisternummer werden hier ergänzt, sobald die Eintragung erfolgt ist.
        </p>
      </LegalSection>

      <LegalSection heading="Vertreten durch">
        <p>Eray Yesil, Geschäftsführer</p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: 0170 4709952
          <br />
          E-Mail:{" "}
          <a href="mailto:info@fundament-it.de" className="text-[var(--turquoise-text)] hover:underline">
            info@fundament-it.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Registereintrag">
        <p>Amtsgericht Ulm — Handelsregisternummer wird nach Eintragung ergänzt.</p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-ID">
        <p>Umsatzsteuer-Identifikationsnummer gemäß §27a UStG: wird nach Erteilung ergänzt.</p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Eray Yesil
          <br />
          Schwabstraße 3, 89075 Ulm
        </p>
      </LegalSection>

      <LegalSection heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--turquoise-text)] hover:underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
