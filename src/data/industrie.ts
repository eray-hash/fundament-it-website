// Inhalte des Industrie-Bereichs. Texte und Bilder stammen aus der Zusammenarbeit
// mit unserem Partner für Industrieautomation und dürfen ausdrücklich verwendet werden.

export type Referenz = { name: string; logo: string };

export const REFERENZEN: Referenz[] = [
  { name: "Unifeed", logo: "/projekte/ref/unifeed.png" },
  { name: "CP Yem", logo: "/projekte/ref/cp-yem.png" },
  { name: "Kılıç Yem", logo: "/projekte/ref/kilic-yem.png" },
  { name: "Oruçoğlu Yem", logo: "/projekte/ref/orucoglu-yem.png" },
  { name: "Boyyem", logo: "/projekte/ref/boyyem.jpg" },
  { name: "Feedtech", logo: "/projekte/ref/feedtech.jpg" },
  { name: "ErişYem", logo: "/projekte/ref/eris-yem.png" },
  { name: "Weber", logo: "/projekte/ref/weber.jpg" },
  { name: "Nektar Yem", logo: "/projekte/ref/nektar-yem.jpg" },
  { name: "Turgutlu Yem & Flake", logo: "/projekte/ref/turgutlu-yem.jpg" },
  { name: "Emek Yem", logo: "/projekte/ref/emek-yem.png" },
  { name: "Abalıoğlu", logo: "/projekte/ref/abalioglu.png" },
  { name: "Sütaş", logo: "/projekte/ref/sutas.png" },
  { name: "Skretting", logo: "/projekte/ref/skretting.png" },
  { name: "Agromey", logo: "/projekte/ref/agromey.png" },
  { name: "Euro Yem", logo: "/projekte/ref/euro-yem.jpg" },
  { name: "Aynes", logo: "/projekte/ref/aynes.png" },
  { name: "Gümüşdoğa", logo: "/projekte/ref/gumusdoga.png" },
];

export type Leistung = {
  title: string;
  text: string;
  image: string;
  tag: string;
};

export const LEISTUNGEN: Leistung[] = [
  {
    title: "SCADA-Leitsysteme",
    tag: "LEITSYSTEM",
    text: "Die gesamte Anlage live im Blick: Zustände, Alarme, Sollwerte und Kennzahlen auf einer Oberfläche, passend zu eurem Prozess gebaut.",
    image: "/projekte/scada-extruder.webp",
  },
  {
    title: "Web- & Mobil-SCADA",
    tag: "FERNZUGRIFF",
    text: "Dieselbe Anlagenübersicht im Browser und auf dem Smartphone. Ihr seht und steuert die Produktion von überall, wo ihr gerade seid.",
    image: "/projekte/scada-web.webp",
  },
  {
    title: "3D-SCADA",
    tag: "3D-ANSICHT",
    text: "Die Anlage als drehbares 3D-Modell mit Live-Werten direkt an Motor, Presse und Förderstrecke. Verständlich für jeden, auch ohne Technikstudium.",
    image: "/projekte/scada-3d.webp",
  },
  {
    title: "Berichte & Rückverfolgbarkeit",
    tag: "DATEN",
    text: "Produktionsberichte nach Zeitraum, Produkt und Charge: Soll gegen Ist, Abweichungen, Export. Alles aus einer zentralen Datenbank statt aus Excel.",
    image: "/projekte/bericht.webp",
  },
  {
    title: "SPS-/PLC-Programmierung",
    tag: "STEUERUNG",
    text: "Steuerungssoftware, die Prozesse kontinuierlich und mit möglichst wenig manuellen Eingriffen fahren lässt. Das senkt die Fehlerquote.",
    image: "/projekte/plc.webp",
  },
  {
    title: "Schaltschrankbau (MCC)",
    tag: "HARDWARE",
    text: "Motor-Control-Center und Steuerschränke: gefertigt, verdrahtet und geprüft für den sicheren Betrieb eurer Motoren und Antriebe.",
    image: "/projekte/schaltschrank.webp",
  },
  {
    title: "Elektro, Montage & Inbetriebnahme",
    tag: "VOR ORT",
    text: "Elektro-Installation und Montage auf der Baustelle, danach Inbetriebnahme der Gesamtanlage, bis alles sauber läuft.",
    image: "/projekte/montage.webp",
  },
  {
    title: "ERP-Anbindung",
    tag: "SCHNITTSTELLE",
    text: "Produktion und ERP sprechen miteinander: Aufträge, Rezepturen und Mengen fließen automatisch, ohne doppelte Erfassung.",
    image: "/projekte/erp.webp",
  },
];

export type Showcase = { title: string; sub: string; image: string };

export const SHOWCASES: Showcase[] = [
  {
    title: "Extruder-Linie",
    sub: "Leitstand-Ansicht · Projekt Unifeed",
    image: "/projekte/scada-extruder.webp",
  },
  {
    title: "Pelletpresse & Silos",
    sub: "Leitstand-Ansicht · Projekt Emek Yem",
    image: "/projekte/scada-presse.webp",
  },
  {
    title: "Verpackung & Abfüllung",
    sub: "Leitstand-Ansicht · Projekt Boyyem",
    image: "/projekte/scada-verpackung.webp",
  },
];
