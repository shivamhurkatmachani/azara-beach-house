/* Minimal 24×24 stroke icons for room features */

interface Props { featureKey: string }

export default function FeatureIcon({ featureKey }: Props) {
  const base = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-gold/55 flex-shrink-0",
  };

  switch (featureKey) {
    case "bed-king":
    case "bed-queen":
      return (
        <svg {...base}>
          <path d="M2 11V8a2 2 0 012-2h16a2 2 0 012 2v3" />
          <rect x="2" y="11" width="20" height="6" rx="1" />
          <path d="M7 11V9M17 11V9" />
        </svg>
      );
    case "bath":
      return (
        <svg {...base}>
          <path d="M4 10h16v3a6 6 0 01-6 6H10a6 6 0 01-6-6v-3z" />
          <path d="M6 10V5a2 2 0 014 0" />
          <path d="M8 19v1M16 19v1" />
        </svg>
      );
    case "ac":
      return (
        <svg {...base}>
          <rect x="2" y="6" width="20" height="8" rx="2" />
          <path d="M7 14v3M12 14v3M17 14v3" />
          <path d="M6 17h2M11 17h2M16 17h2" />
        </svg>
      );
    case "tv":
      return (
        <svg {...base}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "wardrobe":
      return (
        <svg {...base}>
          <rect x="3" y="2" width="18" height="20" rx="1" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <path d="M8 12a1 1 0 110-2 1 1 0 010 2z" fill="currentColor" />
          <path d="M16 12a1 1 0 110-2 1 1 0 010 2z" fill="currentColor" />
        </svg>
      );
    case "seating":
      return (
        <svg {...base}>
          <path d="M4 15V9a2 2 0 014 0v4h8V9a2 2 0 014 0v6" />
          <path d="M2 15h20v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
          <path d="M6 18v2M18 18v2" />
        </svg>
      );
    case "pool-view":
      return (
        <svg {...base}>
          <path d="M3 9c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2" />
          <path d="M3 14c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2" />
          <rect x="3" y="3" width="18" height="5" rx="1" opacity=".35" />
        </svg>
      );
    default:
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
  }
}
