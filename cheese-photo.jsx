// cheese-photo.jsx — SVG illustrations for La Tragonería product imagery.
// Goal: warm, textural, "premium artisan" placeholders that read intentional
// (not amateur ClipArt). Each component is sized via CSS — they fill 100%.

// ── Reusable noise/grain filter ───────────────────────────────────────
// Adds film-grain over surfaces so the parchment background doesn't read flat.
const GrainFilter = ({ id = "grain", baseFreq = 0.9, opacity = 0.35 }) => (
  <filter id={id}>
    <feTurbulence type="fractalNoise" baseFrequency={baseFreq} numOctaves="2" seed="3" />
    <feColorMatrix values={`0 0 0 0 0.24
                            0 0 0 0 0.12
                            0 0 0 0 0
                            0 0 0 ${opacity} 0`} />
    <feComposite in2="SourceGraphic" operator="in" />
  </filter>
);

// ── Hero cheese wheel — main product photo ────────────────────────────
// A cured goat cheese wheel on a linen / parchment ground.
// Pleita rind is suggested by diagonal woven impressions around the side.
function CheeseHero({ angle = "front" }) {
  return (
    <svg viewBox="0 0 800 800" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
         style={{ display: "block" }}>
      <defs>
        {/* parchment / linen surface gradient */}
        <radialGradient id="surface" cx="48%" cy="42%" r="78%">
          <stop offset="0%" stopColor="#F4E9CF" />
          <stop offset="55%" stopColor="#E8DBBA" />
          <stop offset="100%" stopColor="#C9B788" />
        </radialGradient>
        {/* warm side-light wash */}
        <radialGradient id="sidelight" cx="22%" cy="32%" r="55%">
          <stop offset="0%" stopColor="#FFF6DA" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFF6DA" stopOpacity="0" />
        </radialGradient>
        {/* cheese body — pale ivory cured goat */}
        <radialGradient id="cheeseTop" cx="42%" cy="34%" r="68%">
          <stop offset="0%" stopColor="#F2E6BD" />
          <stop offset="55%" stopColor="#DEC994" />
          <stop offset="100%" stopColor="#A88847" />
        </radialGradient>
        <linearGradient id="cheeseSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A88847" />
          <stop offset="50%" stopColor="#8A6B33" />
          <stop offset="100%" stopColor="#5C4316" />
        </linearGradient>
        {/* pleita rind pattern — diagonal weave on the side */}
        <pattern id="pleita" x="0" y="0" width="22" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
          <rect width="22" height="14" fill="#7A5A20" />
          <path d="M0 7 Q5.5 0 11 7 T22 7" stroke="#3E2A06" strokeWidth="1.6" fill="none" opacity="0.55" />
          <path d="M0 7 Q5.5 14 11 7 T22 7" stroke="#C5A062" strokeWidth="1.2" fill="none" opacity="0.6" />
        </pattern>
        {/* shadow under wheel */}
        <radialGradient id="dropShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3E1F00" stopOpacity="0.45" />
          <stop offset="80%" stopColor="#3E1F00" stopOpacity="0" />
        </radialGradient>
        <GrainFilter id="heroGrain" baseFreq="1.1" opacity={0.18} />
      </defs>

      {/* surface */}
      <rect width="800" height="800" fill="url(#surface)" />
      <rect width="800" height="800" fill="url(#sidelight)" />

      {/* linen weave texture, faint */}
      <g opacity="0.07">
        {Array.from({ length: 28 }).map((_, i) => (
          <line key={"h" + i} x1="0" y1={i * 30} x2="800" y2={i * 30}
                stroke="#3E1F00" strokeWidth="0.6" />
        ))}
        {Array.from({ length: 28 }).map((_, i) => (
          <line key={"v" + i} x1={i * 30} y1="0" x2={i * 30} y2="800"
                stroke="#3E1F00" strokeWidth="0.6" />
        ))}
      </g>

      {/* secondary cheese piece — a wedge cut, sitting beside */}
      {angle === "front" && (
        <g transform="translate(580 540) rotate(-18)">
          <path d="M0 0 L 150 -40 L 175 30 L 30 60 Z" fill="url(#cheeseTop)" stroke="#5C4316" strokeWidth="1.2" />
          <path d="M0 0 L 30 60 L 35 80 L 5 22 Z" fill="url(#cheeseSide)" />
          <path d="M30 60 L 175 30 L 180 50 L 35 80 Z" fill="url(#cheeseSide)" />
          <g opacity="0.35">
            <line x1="20" y1="10" x2="160" y2="-30" stroke="#A88847" strokeWidth="0.5" />
            <line x1="25" y1="22" x2="167" y2="-18" stroke="#A88847" strokeWidth="0.5" />
            <line x1="28" y1="35" x2="172" y2="-5" stroke="#A88847" strokeWidth="0.5" />
          </g>
        </g>
      )}

      {/* drop shadow */}
      <ellipse cx="380" cy="620" rx="280" ry="40" fill="url(#dropShadow)" />

      {/* the wheel itself */}
      {angle === "front" && <WheelFront />}
      {angle === "top" && <WheelTop />}
      {angle === "wedge" && <WedgeAngle />}

      {/* sprinkled crumbs */}
      {angle === "front" && (
        <g fill="#8A6B33" opacity="0.7">
          <circle cx="180" cy="690" r="3" />
          <circle cx="220" cy="695" r="2" />
          <circle cx="160" cy="710" r="2.5" />
          <circle cx="240" cy="680" r="1.8" />
          <circle cx="540" cy="700" r="2.2" />
          <circle cx="580" cy="710" r="2" />
        </g>
      )}

      {/* film grain overlay */}
      <rect width="800" height="800" filter="url(#heroGrain)" opacity="0.5" />
    </svg>
  );
}

function WheelFront() {
  return (
    <g transform="translate(400 380)">
      {/* side / rind band */}
      <ellipse cx="0" cy="40" rx="240" ry="60" fill="url(#pleita)" />
      <ellipse cx="0" cy="40" rx="240" ry="60" fill="none" stroke="#3E1F00" strokeWidth="2" opacity="0.5" />
      {/* shadow under top edge */}
      <ellipse cx="0" cy="22" rx="240" ry="58" fill="#3E2A06" opacity="0.25" />
      {/* top circle */}
      <ellipse cx="0" cy="-10" rx="240" ry="60" fill="url(#cheeseTop)" />
      <ellipse cx="0" cy="-10" rx="240" ry="60" fill="none" stroke="#5C4316" strokeWidth="2.5" />
      {/* pleita pressed pattern on top edge */}
      <g opacity="0.3" clipPath="circle(238px at 0 -10)">
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const x1 = Math.cos(a) * 230;
          const y1 = -10 + Math.sin(a) * 58;
          const x2 = Math.cos(a) * 245;
          const y2 = -10 + Math.sin(a) * 62;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5C4316" strokeWidth="2" />;
        })}
      </g>
      {/* surface granularity — speckles */}
      {Array.from({ length: 90 }).map((_, i) => {
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 220;
        const x = Math.cos(a) * r;
        const y = -10 + Math.sin(a) * (r * 60 / 240);
        const s = 0.8 + Math.random() * 1.4;
        return <circle key={i} cx={x} cy={y} r={s} fill="#8A6B33" opacity={0.18 + Math.random() * 0.25} />;
      })}
      {/* highlight on top */}
      <ellipse cx="-80" cy="-40" rx="120" ry="22" fill="#FFF6DA" opacity="0.35" />
      <ellipse cx="-100" cy="-44" rx="60" ry="9" fill="#FFFFFF" opacity="0.35" />
      {/* cave-aged spots (subtle mold) */}
      <g opacity="0.4">
        <ellipse cx="60" cy="20" rx="14" ry="6" fill="#6D7A55" />
        <ellipse cx="-120" cy="-5" rx="10" ry="4" fill="#6D7A55" />
        <ellipse cx="140" cy="-30" rx="8" ry="3" fill="#6D7A55" />
      </g>
    </g>
  );
}

function WheelTop() {
  return (
    <g transform="translate(400 400)">
      <circle cx="0" cy="0" r="280" fill="url(#cheeseTop)" stroke="#5C4316" strokeWidth="2.5" />
      {/* pleita rim impressions */}
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const x1 = Math.cos(a) * 256;
        const y1 = Math.sin(a) * 256;
        const x2 = Math.cos(a) * 282;
        const y2 = Math.sin(a) * 282;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5C4316" strokeWidth="2.2" opacity="0.5" />;
      })}
      <circle cx="0" cy="0" r="252" fill="none" stroke="#5C4316" strokeWidth="1" opacity="0.6" />
      {/* granular speckles */}
      {Array.from({ length: 240 }).map((_, i) => {
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 240;
        return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r}
                       r={0.5 + Math.random() * 1.5} fill="#8A6B33" opacity={0.15 + Math.random() * 0.3} />;
      })}
      {/* mold spots */}
      <ellipse cx="-90" cy="-40" rx="20" ry="8" fill="#6D7A55" opacity="0.35" />
      <ellipse cx="100" cy="80" rx="14" ry="6" fill="#6D7A55" opacity="0.35" />
      {/* highlight */}
      <ellipse cx="-100" cy="-110" rx="160" ry="40" fill="#FFF6DA" opacity="0.35" />
    </g>
  );
}

function WedgeAngle() {
  return (
    <g transform="translate(400 420) rotate(8)">
      {/* the wedge — sliced face showing interior */}
      <path d="M -260 -60 L 240 -100 L 280 60 L -230 110 Z" fill="url(#cheeseTop)" stroke="#5C4316" strokeWidth="2.5" />
      {/* side / rind */}
      <path d="M -260 -60 L -230 110 L -245 150 L -275 -40 Z" fill="url(#cheeseSide)" />
      <path d="M -230 110 L 280 60 L 290 100 L -245 150 Z" fill="url(#pleita)" />
      {/* granular interior */}
      {Array.from({ length: 200 }).map((_, i) => (
        <circle key={i}
                cx={-260 + Math.random() * 540}
                cy={-100 + Math.random() * 210}
                r={0.6 + Math.random() * 1.5}
                fill="#8A6B33"
                opacity={0.15 + Math.random() * 0.3} />
      ))}
      <ellipse cx="-50" cy="-50" rx="200" ry="30" fill="#FFF6DA" opacity="0.3" />
    </g>
  );
}

// ── Pairing card photos — small thumbnails for pairings strip ──────
function PairingPhoto({ kind }) {
  const photos = {
    torta: (
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ display: "block" }}>
        <defs>
          <radialGradient id="t-bg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#EBDEBA" /><stop offset="100%" stopColor="#C9B788" />
          </radialGradient>
          <radialGradient id="t-bread" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#DEB670" /><stop offset="60%" stopColor="#A57736" /><stop offset="100%" stopColor="#5E3E14" />
          </radialGradient>
        </defs>
        <rect width="200" height="250" fill="url(#t-bg)" />
        <ellipse cx="100" cy="190" rx="80" ry="12" fill="#3E1F00" opacity="0.25" />
        <ellipse cx="100" cy="160" rx="78" ry="36" fill="url(#t-bread)" stroke="#5E3E14" strokeWidth="1" />
        <ellipse cx="100" cy="155" rx="78" ry="34" fill="none" stroke="#5E3E14" strokeWidth="0.6" opacity="0.5" />
        {/* rosemary sprigs */}
        <g stroke="#2C5F2E" strokeWidth="1.2" opacity="0.85" fill="none">
          <path d="M 60 150 q 5 -25 15 -35" />
          <path d="M 65 145 l 3 -3" /><path d="M 68 138 l 3 -3" /><path d="M 71 130 l 3 -3" />
          <path d="M 130 142 q -3 -20 -10 -30" />
          <path d="M 128 135 l -3 -2" /><path d="M 125 128 l -3 -2" />
        </g>
        {/* crumbs */}
        <circle cx="40" cy="200" r="2" fill="#5E3E14" />
        <circle cx="170" cy="195" r="1.5" fill="#5E3E14" />
        <circle cx="50" cy="210" r="1.3" fill="#5E3E14" />
      </svg>
    ),
    crackers: (
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ display: "block" }}>
        <defs>
          <radialGradient id="c-bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#E8DBBA" /><stop offset="100%" stopColor="#C9B788" />
          </radialGradient>
          <linearGradient id="c-crk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2C58A" /><stop offset="100%" stopColor="#9C7A3F" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill="url(#c-bg)" />
        {/* stack of crackers */}
        <g transform="translate(100 140)">
          {[0, -8, -16, -24, -32].map((y, i) => (
            <g key={i} transform={`translate(${i * 2 - 4} ${y})`}>
              <rect x="-50" y="-3" width="100" height="6" rx="1" fill="url(#c-crk)" stroke="#5E3E14" strokeWidth="0.5" />
              {/* dimples */}
              {[0, 1, 2, 3, 4].map((d) => (
                <circle key={d} cx={-40 + d * 20} cy="0" r="1" fill="#5E3E14" opacity="0.5" />
              ))}
            </g>
          ))}
        </g>
        {/* seeds scattered */}
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse key={i} cx={20 + Math.random() * 160} cy={180 + Math.random() * 50}
                   rx={1.5} ry={0.8} fill="#5E3E14" opacity="0.7" transform={`rotate(${Math.random() * 90} ${20 + Math.random() * 160} ${180 + Math.random() * 50})`} />
        ))}
      </svg>
    ),
    wine: (
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ display: "block" }}>
        <defs>
          <linearGradient id="w-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EBDEBA" /><stop offset="100%" stopColor="#A89366" />
          </linearGradient>
          <linearGradient id="w-bot" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1E2B1A" /><stop offset="50%" stopColor="#3A4F2A" /><stop offset="100%" stopColor="#1E2B1A" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill="url(#w-bg)" />
        <ellipse cx="100" cy="225" rx="40" ry="6" fill="#3E1F00" opacity="0.3" />
        {/* bottle */}
        <g>
          <rect x="92" y="32" width="16" height="34" fill="#1E2B1A" />
          <path d="M 92 60 Q 80 80 80 110 L 80 222 Q 80 232 100 232 Q 120 232 120 222 L 120 110 Q 120 80 108 60 Z" fill="url(#w-bot)" />
          {/* label */}
          <rect x="84" y="130" width="32" height="56" fill="#F4E9CF" stroke="#5E3E14" strokeWidth="0.4" />
          <line x1="88" y1="142" x2="112" y2="142" stroke="#3E1F00" strokeWidth="0.6" />
          <line x1="90" y1="160" x2="110" y2="160" stroke="#3E1F00" strokeWidth="0.3" />
          <line x1="90" y1="166" x2="110" y2="166" stroke="#3E1F00" strokeWidth="0.3" />
          <line x1="92" y1="175" x2="108" y2="175" stroke="#2C5F2E" strokeWidth="0.5" />
          {/* highlight */}
          <path d="M 86 110 L 86 215 Q 86 218 90 218" stroke="#6B8055" strokeWidth="2" fill="none" opacity="0.5" />
        </g>
      </svg>
    ),
    jam: (
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ display: "block" }}>
        <defs>
          <radialGradient id="j-bg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#EBDEBA" /><stop offset="100%" stopColor="#A89366" />
          </radialGradient>
          <linearGradient id="j-jar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5C2A2A" /><stop offset="100%" stopColor="#3B1414" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill="url(#j-bg)" />
        <ellipse cx="100" cy="220" rx="56" ry="8" fill="#3E1F00" opacity="0.3" />
        {/* jar */}
        <g>
          <rect x="62" y="82" width="76" height="20" fill="#5E3E14" rx="2" />
          {/* string tie */}
          <line x1="62" y1="95" x2="138" y2="95" stroke="#C9A968" strokeWidth="1" />
          <rect x="60" y="100" width="80" height="120" rx="6" fill="url(#j-jar)" stroke="#3B1414" strokeWidth="1" />
          {/* highlight */}
          <rect x="66" y="108" width="6" height="100" fill="#9B5050" opacity="0.4" rx="3" />
          {/* label */}
          <rect x="70" y="140" width="60" height="50" fill="#F4E9CF" stroke="#5E3E14" strokeWidth="0.4" />
          <text x="100" y="160" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#3E1F00" fontStyle="italic">Higos</text>
          <line x1="78" y1="170" x2="122" y2="170" stroke="#3E1F00" strokeWidth="0.3" />
          <line x1="82" y1="178" x2="118" y2="178" stroke="#3E1F00" strokeWidth="0.3" />
        </g>
      </svg>
    ),
  };
  return photos[kind] || photos.torta;
}

// ── Related cheese photos — three other cheese cards ─────────────
function CheesePhoto({ kind }) {
  // each cheese has its own palette + form
  if (kind === "payoyo") {
    return (
      <svg viewBox="0 0 400 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ display: "block" }}>
        <defs>
          <radialGradient id="p-bg" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#EBDEBA" /><stop offset="100%" stopColor="#A89366" />
          </radialGradient>
          <radialGradient id="p-top" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#F4E2A8" /><stop offset="100%" stopColor="#B59138" />
          </radialGradient>
        </defs>
        <rect width="400" height="320" fill="url(#p-bg)" />
        <ellipse cx="210" cy="260" rx="130" ry="14" fill="#3E1F00" opacity="0.3" />
        <g transform="translate(200 170)">
          <ellipse cx="0" cy="40" rx="140" ry="28" fill="#6B4520" />
          <ellipse cx="0" cy="0" rx="140" ry="36" fill="url(#p-top)" stroke="#5E3E14" strokeWidth="1.5" />
          {/* esparto cross-pattern impressions */}
          {Array.from({ length: 30 }).map((_, i) => {
            const a = (i / 30) * Math.PI * 2;
            return <line key={i} x1={Math.cos(a) * 130} y1={Math.sin(a) * 32}
                         x2={Math.cos(a) * 142} y2={Math.sin(a) * 36}
                         stroke="#3E1F00" strokeWidth="1.2" opacity="0.5" />;
          })}
          <ellipse cx="-40" cy="-15" rx="60" ry="12" fill="#FFF6DA" opacity="0.4" />
        </g>
      </svg>
    );
  }
  if (kind === "andazul") {
    return (
      <svg viewBox="0 0 400 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ display: "block" }}>
        <defs>
          <radialGradient id="a-bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#EBDEBA" /><stop offset="100%" stopColor="#A89366" />
          </radialGradient>
          <radialGradient id="a-body" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#F4ECD2" /><stop offset="100%" stopColor="#C7B98E" />
          </radialGradient>
        </defs>
        <rect width="400" height="320" fill="url(#a-bg)" />
        <ellipse cx="210" cy="265" rx="120" ry="12" fill="#3E1F00" opacity="0.3" />
        {/* a wedge of blue cheese */}
        <g transform="translate(200 180)">
          <path d="M -130 -30 L 130 -50 L 140 30 L -135 60 Z" fill="url(#a-body)" stroke="#5E3E14" strokeWidth="1.5" />
          <path d="M -130 -30 L -135 60 L -148 75 L -145 -20 Z" fill="#6B4520" />
          <path d="M -135 60 L 140 30 L 150 50 L -148 75 Z" fill="#553215" />
          {/* blue veins */}
          {Array.from({ length: 24 }).map((_, i) => (
            <path key={i}
                  d={`M ${-120 + Math.random() * 240} ${-25 + Math.random() * 80} q ${5 + Math.random() * 12} ${(Math.random() - 0.5) * 18} ${10 + Math.random() * 20} ${(Math.random() - 0.5) * 8}`}
                  stroke="#4C5A6B"
                  strokeWidth={1 + Math.random() * 1.5}
                  fill="none"
                  opacity={0.6 + Math.random() * 0.3} />
          ))}
          {/* small pockets */}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={i}
                     cx={-110 + Math.random() * 220}
                     cy={-20 + Math.random() * 70}
                     rx={3 + Math.random() * 4}
                     ry={2 + Math.random() * 3}
                     fill="#3D4A5A"
                     opacity={0.45} />
          ))}
        </g>
      </svg>
    );
  }
  // manchego
  return (
    <svg viewBox="0 0 400 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
         style={{ display: "block" }}>
      <defs>
        <radialGradient id="m-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#EBDEBA" /><stop offset="100%" stopColor="#A89366" />
        </radialGradient>
        <radialGradient id="m-body" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F0DC9C" /><stop offset="100%" stopColor="#A88030" />
        </radialGradient>
      </defs>
      <rect width="400" height="320" fill="url(#m-bg)" />
      <ellipse cx="210" cy="265" rx="130" ry="14" fill="#3E1F00" opacity="0.3" />
      <g transform="translate(200 170)">
        <ellipse cx="0" cy="42" rx="142" ry="30" fill="#5C3812" />
        {/* zigzag flor pattern around side */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const x = Math.cos(a) * 138;
          const y = 30 + Math.sin(a) * 26;
          return (
            <g key={i}>
              <path d={`M ${x - 3} ${y - 4} L ${x} ${y - 9} L ${x + 3} ${y - 4} L ${x} ${y + 1} Z`}
                    fill="#2B1605" opacity="0.75" />
            </g>
          );
        })}
        <ellipse cx="0" cy="0" rx="142" ry="36" fill="url(#m-body)" stroke="#5E3E14" strokeWidth="1.5" />
        {/* small wheat-style stamp */}
        <g opacity="0.4">
          <line x1="-20" y1="-10" x2="20" y2="-10" stroke="#5E3E14" strokeWidth="1.2" />
          {[-15, -8, -1, 6, 13].map((x, i) => (
            <line key={i} x1={x} y1="-13" x2={x + 2} y2="-7" stroke="#5E3E14" strokeWidth="1" />
          ))}
        </g>
        <ellipse cx="-50" cy="-18" rx="70" ry="12" fill="#FFF6DA" opacity="0.35" />
      </g>
    </svg>
  );
}

Object.assign(window, { CheeseHero, PairingPhoto, CheesePhoto });
