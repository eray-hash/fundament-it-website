import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        to="/"
        className="font-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)] transition hover:text-[var(--ink)]"
      >
        ← Zurück zur Startseite
      </Link>
      <h1 className="font-display mt-8 text-4xl tracking-tight">{title}</h1>
      <div className="prose-legal mt-10 space-y-8 text-[14.5px] leading-relaxed text-[var(--ink-dim)]">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-[var(--ink)]">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
