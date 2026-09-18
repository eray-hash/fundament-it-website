import { Link } from "react-router-dom";
import lockupColor from "../assets/logo/fundament-it-lockup-color.svg";

export default function Footer() {
  return (
    <footer id="kontakt" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 border-t border-[var(--hairline)] pt-14 md:flex-row md:items-end">
          <div>
            <img src={lockupColor} alt="Fundament IT" className="h-6 w-auto opacity-90" />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[var(--ink-dim)]">
              Wir bauen Automatisierung, die auf den Betrieb passt — nicht umgekehrt.
              Sprecht uns an, wir schauen uns euer Fundament gemeinsam an.
            </p>
          </div>
          <div className="font-mono space-y-1.5 text-[13px] text-[var(--ink-dim)]">
            <p>Eray Yesil, Geschäftsführer</p>
            <p>Schwabstraße 3, 89075 Ulm</p>
            <p>
              <a href="mailto:info@fundament-it.de" className="transition hover:text-[var(--turquoise-text)]">
                info@fundament-it.de
              </a>
            </p>
            <p>Tel. 0170 4709952</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10.5px] tracking-[0.1em] text-[var(--ink-faint)]">
            © {new Date().getFullYear()} Fundament IT UG (haftungsbeschränkt) i.G.
          </p>
          <div className="font-mono flex gap-5 text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
            <Link to="/impressum" className="transition hover:text-[var(--ink)]">
              Impressum
            </Link>
            <Link to="/datenschutz" className="transition hover:text-[var(--ink)]">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
