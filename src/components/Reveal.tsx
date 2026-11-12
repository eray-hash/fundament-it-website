import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Blendet Inhalt sanft ein, sobald er in den Sichtbereich scrollt.
 * Bewusst über Scroll-Position statt IntersectionObserver gelöst: das funktioniert
 * überall gleich und lässt nie Inhalt versteckt zurück. Bei "reduzierter Bewegung"
 * ist alles sofort sichtbar.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce) {
      setShown(true);
      return;
    }

    let done = false;
    const check = () => {
      if (done) return;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.92) {
        done = true;
        setShown(true);
        cleanup();
      }
    };
    // Sicherheitsnetz: Layout kann sich nach dem Laden von Schriften/Bildern verschieben,
    // und manche Umgebungen liefern Scroll-Ereignisse nur verzögert. Ein leichter Takt
    // stellt sicher, dass nie etwas unsichtbar bleibt.
    const poll = window.setInterval(check, 250);
    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearInterval(poll);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
