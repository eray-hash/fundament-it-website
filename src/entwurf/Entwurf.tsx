import { Route, Routes } from "react-router-dom";
import Check from "./Check";
import Industrie from "./Industrie";
import Leistungen from "./Leistungen";
import { Datenschutz, Impressum, NichtGefunden } from "./Recht";
import { BASE } from "./Shell";
import Start from "./Start";

/** Alle Seiten des neuen Entwurfs. Jede Seite bringt Kopf- und Fußzeile über <Shell> selbst mit. */
export default function Entwurf() {
  return (
    <Routes>
      <Route path={BASE} element={<Start />} />
      <Route path={`${BASE}/leistungen`} element={<Leistungen />} />
      <Route path={`${BASE}/industrie`} element={<Industrie />} />
      <Route path={`${BASE}/check`} element={<Check />} />
      <Route path={`${BASE}/impressum`} element={<Impressum />} />
      <Route path={`${BASE}/datenschutz`} element={<Datenschutz />} />
      <Route path="*" element={<NichtGefunden />} />
    </Routes>
  );
}
