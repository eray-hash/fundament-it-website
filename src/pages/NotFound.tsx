import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="blueprint-grid relative flex min-h-[60vh] items-center border-b border-[var(--hairline)]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-faint)]">Fehler 404</p>
        <h1 className="font-display mt-4 text-5xl leading-tight tracking-tight sm:text-6xl">
          Diese Seite steht nicht im Bauplan.
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--ink-dim)]">
          Der Link ist veraltet oder falsch getippt. Von der Startseite aus findest du alles Weitere.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-sm bg-[var(--warm)] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[var(--warm-deep)]"
        >
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
