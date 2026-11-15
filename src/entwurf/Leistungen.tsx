import { Link } from "react-router-dom";
import { MODULES, type ModuleItem } from "../data/modules";
import { End, PageHead, Shell, to, useTitle } from "./Shell";

function Gruppe({ title, note, items }: { title: string; note?: string; items: ModuleItem[] }) {
  return (
    <div className="ew-index">
      <header className="ew-index-head">
        <h2>{title}</h2>
        <span className="ew-mono ew-label-light">
          {note ? `${note} · ` : ""}
          {items.length} Module
        </span>
      </header>
      <ol>
        {items.map((m) => (
          <li key={m.id}>
            <span className="ew-mono ew-label-light">{String(MODULES.indexOf(m) + 1).padStart(2, "0")}</span>
            <h3>{m.label}</h3>
            <p>{m.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Leistungen() {
  useTitle("Leistungen");
  return (
    <Shell>
      <PageHead label="Leistungen" title={`${MODULES.length} Module. Ein Fundament.`}>
        <p className="ew-lede">
          Jedes Modul löst ein konkretes Problem. Ihr braucht nie alle. Der Check zeigt, welche bei euch etwas
          bringen.
        </p>
        <Link to={to("/check")} className="ew-pill">
          Automatisierungs-Check
        </Link>
      </PageHead>

      <section className="ew-light">
        <div className="ew-wrap ew-section">
          <Gruppe title="Büro & Verwaltung" items={MODULES.filter((m) => m.group === "verwaltung")} />
          <Gruppe
            title="Produktion & Anlagen"
            note="mit Industriepartner"
            items={MODULES.filter((m) => m.group === "industrie")}
          />
          <div className="ew-more">
            <Link to={to("/industrie")} className="ew-arrow">
              Industrie im Detail
            </Link>
          </div>
        </div>
      </section>

      <End title="Welche Module passen zu eurem Betrieb?" />
    </Shell>
  );
}
