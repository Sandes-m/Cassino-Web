import type { FC } from "react";

interface SlotSymbolProps {
  name: string;
  size?: number;
}

export const SlotSymbol: FC<SlotSymbolProps> = ({ name, size = 100 }) => {
  const renderSvg = () => {
    switch (name) {
      case "🍒":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Stems */}
            <path d="M50 15 C55 30 65 40 70 50" stroke="#52c41a" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M50 15 C45 30 35 40 30 50" stroke="#52c41a" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Leaf */}
            <path d="M50 15 C58 8 62 12 55 22 Z" fill="#52c41a" />
            {/* Cherries */}
            <circle cx="30" cy="65" r="16" fill="url(#gradCherry)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))" />
            <circle cx="70" cy="65" r="16" fill="url(#gradCherry)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))" />
            {/* Glossy highlights */}
            <circle cx="24" cy="59" r="4" fill="#ffffff" opacity="0.6" />
            <circle cx="64" cy="59" r="4" fill="#ffffff" opacity="0.6" />
          </svg>
        );
      case "🍋":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Lemon Body */}
            <path d="M22 50 C22 32 38 22 55 22 C72 22 78 35 78 50 C78 68 62 78 45 78 C28 78 22 68 22 50 Z" fill="url(#gradLemon)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.3))" />
            {/* Tips */}
            <circle cx="18" cy="50" r="4" fill="#ad8b00" />
            <circle cx="82" cy="50" r="4" fill="#ad8b00" />
            {/* Green Leaf */}
            <path d="M62 20 C68 10 60 5 50 12 C45 18 52 24 62 20 Z" fill="#52c41a" />
            {/* Glossy highlight */}
            <path d="M32 40 C32 32 45 28 50 28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
          </svg>
        );
      case "🔔":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Top Loop */}
            <path d="M42 15 C42 8 58 8 58 15 Z" stroke="#d4b106" strokeWidth="4" fill="none" />
            {/* Bell body */}
            <path d="M50 15 C34 15 28 25 28 45 L24 68 H76 L72 45 C72 25 66 15 50 15 Z" fill="url(#gradBell)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))" />
            {/* Rim */}
            <rect x="20" y="66" width="60" height="6" rx="3" fill="#ad8b00" />
            {/* Clapper */}
            <circle cx="50" cy="78" r="8" fill="#595959" />
            <circle cx="50" cy="78" r="5" fill="#262626" />
            {/* Highlight */}
            <path d="M38 30 C38 25 45 22 50 22" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
          </svg>
        );
      case "⭐":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Star shape */}
            <path
              d="M50 8 L63 35 L93 35 L70 54 L78 84 L50 67 L22 84 L30 54 L7 35 L37 35 Z"
              fill="url(#gradStar)"
              filter="url(#glowStar)"
            />
            {/* Inner shading for standard 3D look */}
            <path d="M50 8 L50 67 L22 84 L30 54 L7 35 L37 35 Z" fill="#ffffff" opacity="0.15" />
          </svg>
        );
      case "🍀":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Stem */}
            <path d="M50 50 Q48 76 34 86" stroke="#237804" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* 4 Leaves */}
            {/* Top */}
            <path d="M50 50 C40 25 60 25 50 50" fill="url(#gradClover)" stroke="#135200" strokeWidth="1" />
            <path d="M50 50 C40 20 30 35 50 50" fill="url(#gradClover)" />
            <path d="M50 50 C60 20 70 35 50 50" fill="url(#gradClover)" />
            {/* Bottom */}
            <path d="M50 50 C40 80 30 65 50 50" fill="url(#gradClover)" />
            <path d="M50 50 C60 80 70 65 50 50" fill="url(#gradClover)" />
            {/* Left */}
            <path d="M50 50 C20 40 35 30 50 50" fill="url(#gradClover)" />
            <path d="M50 50 C20 60 35 70 50 50" fill="url(#gradClover)" />
            {/* Right */}
            <path d="M50 50 C80 40 65 30 50 50" fill="url(#gradClover)" />
            <path d="M50 50 C80 60 65 70 50 50" fill="url(#gradClover)" />
            {/* Center glow */}
            <circle cx="50" cy="50" r="4" fill="#a0d911" />
          </svg>
        );
      case "💎":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Outer Diamond Path */}
            <path d="M30 20 L70 20 L88 42 L50 86 L12 42 Z" fill="url(#gradDiamond)" filter="drop-shadow(0px 4px 8px rgba(24,144,255,0.4))" />
            {/* Facets */}
            <path d="M30 20 L50 42 L70 20 M12 42 L50 42 L88 42 M50 42 L50 86" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M30 20 L12 42 M70 20 L88 42" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
            {/* Light reflections */}
            <polygon points="30,20 50,42 12,42" fill="#ffffff" opacity="0.25" />
            <polygon points="70,20 50,42 88,42" fill="#0050b3" opacity="0.15" />
            <polygon points="50,42 88,42 50,86" fill="#ffffff" opacity="0.15" />
          </svg>
        );
      case "7️⃣":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Outer golden/red glowing border */}
            <path
              d="M25 22 H75 L45 82 H30 L54 35 H25 Z"
              fill="url(#grad7)"
              filter="url(#glow7)"
              stroke="#cf1322"
              strokeWidth="2"
            />
            {/* Internal bright core */}
            <path
              d="M28 25 H70 L46 76 H36 L56 38 H28 Z"
              fill="#ffffff"
              opacity="0.3"
            />
            {/* Sparkle */}
            <circle cx="70" cy="25" r="3" fill="#ffffff" />
            <line x1="70" y1="18" x2="70" y2="32" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="63" y1="25" x2="77" y2="25" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        );
      default:
        // Fallback to text emoji if mapping fails
        return (
          <div style={{ fontSize: size * 0.6, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            {name}
          </div>
        );
    }
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="slot-symbol-container"
    >
      {renderSvg()}
    </div>
  );
};
