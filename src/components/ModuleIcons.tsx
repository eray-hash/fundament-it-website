type IconProps = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function VoiceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 4h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-4 3v-3H4a1 1 0 0 1-1-1V8" />
      <path d="M11 8v4M14 7v6M17 9v2" />
    </svg>
  );
}

export function VoiceAgentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M4 12v4a2 2 0 0 0 2 2h1v-6H4Z" />
      <path d="M20 12v4a2 2 0 0 1-2 2h-1v-6h3Z" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4.5 7 12 13l7.5-6" />
    </svg>
  );
}

export function CrmIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 5.5c1.4.3 2.5 1.6 2.5 3.2S17.4 11.6 16 12" />
      <path d="M15 14.3c2 .5 4 2.2 4 4.7" />
    </svg>
  );
}

export function CockpitIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1" />
      <rect x="13" y="3.5" width="7.5" height="4.5" rx="1" />
      <rect x="13" y="10" width="7.5" height="10.5" rx="1" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1" />
    </svg>
  );
}

export function RadarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12 18 7" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BooksIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 3.5h9l3 3v14H6z" />
      <path d="M15 3.5v3h3" />
      <path d="M8.5 10h7M8.5 13h7M8.5 16h4.5" />
    </svg>
  );
}

export function FunnelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 5h16l-6 7.5v6L10 21v-8.5z" />
    </svg>
  );
}

export function WebIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.4 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.4-3.4-8.5S9.8 5.8 12 3.5Z" />
    </svg>
  );
}

export const MODULE_ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  voice: VoiceIcon,
  voiceagent: VoiceAgentIcon,
  mail: MailIcon,
  crm: CrmIcon,
  cockpit: CockpitIcon,
  radar: RadarIcon,
  buchhaltung: BooksIcon,
  leads: FunnelIcon,
  web: WebIcon,
};
