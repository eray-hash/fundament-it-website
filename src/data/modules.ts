export type ModuleItem = {
  id: string;
  label: string;
  desc: string;
  spec: string;
};

export const MODULES: ModuleItem[] = [
  {
    id: "voice",
    label: "KI-Gesprächsassistent",
    desc: "Telefonate live mitschreiben und automatisch zu einem Protokoll zusammenfassen.",
    spec: "SPRACHE · 01",
  },
  {
    id: "voiceagent",
    label: "Voice Agent",
    desc: "Ein KI-Telefonassistent, der Anrufe annimmt und Termine direkt selbst vereinbart.",
    spec: "SPRACHE · 02",
  },
  {
    id: "mail",
    label: "E-Mail-Automatisierung",
    desc: "Mehrere Postfächer bündeln, Regeln statt manuellem Sortieren.",
    spec: "POSTEINGANG · 03",
  },
  {
    id: "crm",
    label: "CRM & Vertrieb",
    desc: "Kunden und Verkaufschancen zentral verwalten statt in Excel-Tabellen.",
    spec: "STRUKTUR · 04",
  },
  {
    id: "cockpit",
    label: "Digitales Unternehmens-Cockpit",
    desc: "Projekte und Aufgaben aller Abteilungen auf einen Blick, auch vom Handy aus.",
    spec: "STRUKTUR · 05",
  },
  {
    id: "radar",
    label: "Daten- & Marktradar",
    desc: "Automatisierte Recherche und Auswertung, statt Seiten von Hand zu durchsuchen.",
    spec: "RECHERCHE · 06",
  },
  {
    id: "buchhaltung",
    label: "Buchhaltungsautomatisierung",
    desc: "Belege und Kontoauszüge automatisch auswerten statt abzutippen.",
    spec: "ZAHLEN · 07",
  },
  {
    id: "leads",
    label: "Lead-Generierung",
    desc: "Neue Anfragen automatisiert finden und vorqualifizieren.",
    spec: "VERTRIEB · 08",
  },
  {
    id: "web",
    label: "Website & Auftritt",
    desc: "Ein digitaler Auftritt, der tatsächlich für euch arbeitet.",
    spec: "AUFTRITT · 09",
  },
];

export type PainPoint = {
  id: string;
  label: string;
  moduleId: string;
  hoursPerWeek: number;
};

// Eine Frage pro Modul, damit die Auswertung im Statik-Check direkt auf den
// tatsächlichen Modulen aufbaut statt auf einer losen eigenen Liste.
export const PAIN_POINTS: PainPoint[] = MODULES.map((m) => {
  const copy: Record<string, { label: string; hoursPerWeek: number }> = {
    voice: { label: "Viele Kundentelefonate, die dokumentiert werden müssen", hoursPerWeek: 4 },
    voiceagent: { label: "Anrufe/Terminvereinbarung fressen Zeit oder gehen unter", hoursPerWeek: 4 },
    mail: { label: "E-Mails verteilen sich über mehrere Postfächer", hoursPerWeek: 3 },
    crm: { label: "Kundenverwaltung läuft über Excel oder Zettel", hoursPerWeek: 5 },
    cockpit: { label: "Keine zentrale Übersicht über laufende Projekte/Aufgaben", hoursPerWeek: 3 },
    radar: { label: "Marktrecherche/Angebote werden von Hand zusammengesucht", hoursPerWeek: 4 },
    buchhaltung: { label: "Belege und Kontoauszüge werden manuell übertragen", hoursPerWeek: 3 },
    leads: { label: "Neue Anfragen/Leads werden mühsam von Hand gesucht", hoursPerWeek: 3 },
    web: { label: "Keine oder eine veraltete Website", hoursPerWeek: 2 },
  };
  return { id: m.id, moduleId: m.id, ...copy[m.id] };
});

export const BRANCHEN = [
  "Handwerk / Elektro / Bau",
  "Energieberatung",
  "Gastronomie / Hotel",
  "Gesundheitswesen",
  "Großküchen- / Ausstattungsvertrieb",
  "Immobilien / Verwaltung",
  "Versicherung / Finanzen",
  "Sonstige Branche",
];

export const HOURLY_RATE = 35;
