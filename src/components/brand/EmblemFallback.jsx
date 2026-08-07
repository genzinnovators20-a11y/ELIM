import { memo, useId } from 'react';

/**
 * Vector stand-in for the chrome ELIM FORGE badge.
 * Rendered only until `/brand/elimforge-emblem.png` is present, so the hero is
 * never empty and never shows a broken image.
 */
function EmblemFallback({ size = 520, ...props }) {
  const id = useId().replace(/[:]/g, '');
  const g = (n) => `${id}-${n}`;

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      role="img"
      aria-label="ELIM FORGE — Forged with blockchain"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      {...props}
    >
      <defs>
        {/*
          userSpaceOnUse is required, not cosmetic: these gradients are applied to
          horizontal and vertical strokes whose object bounding box has zero
          height/width, and such elements are not rendered at all under the
          default objectBoundingBox units.
        */}
        <linearGradient id={g('chrome')} gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="360" y2="400">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="18%" stopColor="#9FD9F0" />
          <stop offset="38%" stopColor="#D7DEE9" />
          <stop offset="55%" stopColor="#6F7C90" />
          <stop offset="72%" stopColor="#EDF2F8" />
          <stop offset="88%" stopColor="#9A8FE6" />
          <stop offset="100%" stopColor="#C9D2DE" />
        </linearGradient>
        <linearGradient id={g('chromeSoft')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E9F1F8" />
          <stop offset="45%" stopColor="#8F9DB0" />
          <stop offset="100%" stopColor="#DCE4EE" />
        </linearGradient>
        <linearGradient id={g('iris')} gradientUnits="userSpaceOnUse" x1="60" y1="60" x2="340" y2="340">
          <stop offset="0%" stopColor="#7FD8F5" />
          <stop offset="46%" stopColor="#5B7BE0" />
          <stop offset="100%" stopColor="#8E7BF0" />
        </linearGradient>
        <radialGradient id={g('core')} cx="0.4" cy="0.32" r="0.8">
          <stop offset="0%" stopColor="#2B4C8A" />
          <stop offset="55%" stopColor="#16234A" />
          <stop offset="100%" stopColor="#0A1024" />
        </radialGradient>
        <radialGradient id={g('glow')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#7FD8F5" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#5B7BE0" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#5B7BE0" stopOpacity="0" />
        </radialGradient>

        <path id={g('arcTop')} d="M 32,200 A 168,168 0 0 1 368,200" fill="none" />
        <path id={g('arcBottom')} d="M 18,200 A 182,182 0 0 0 382,200" fill="none" />
      </defs>

      <circle cx="200" cy="200" r="200" fill={`url(#${g('glow')})`} />

      {/* Outer bezel */}
      <circle cx="200" cy="200" r="190" fill={`url(#${g('chromeSoft')})`} opacity="0.22" />
      <circle cx="200" cy="200" r="190" fill="none" stroke={`url(#${g('chrome')})`} strokeWidth="7" />
      <circle cx="200" cy="200" r="181" fill="#0B1220" opacity="0.72" />
      <circle cx="200" cy="200" r="181" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.9" />
      <circle cx="200" cy="200" r="146" fill="none" stroke={`url(#${g('chrome')})`} strokeWidth="3" opacity="0.9" />

      {/* Ring legend */}
      <text
        fill={`url(#${g('chrome')})`}
        fontFamily="'Sora Variable', 'Sora', system-ui, sans-serif"
        fontSize="30"
        fontWeight="700"
        letterSpacing="7"
      >
        <textPath href={`#${g('arcTop')}`} startOffset="50%" textAnchor="middle">
          ELIM FORGE
        </textPath>
      </text>
      <text
        fill={`url(#${g('chrome')})`}
        fontFamily="'Sora Variable', 'Sora', system-ui, sans-serif"
        fontSize="21"
        fontWeight="600"
        letterSpacing="4.4"
      >
        <textPath href={`#${g('arcBottom')}`} startOffset="50%" textAnchor="middle">
          FORGED WITH BLOCKCHAIN
        </textPath>
      </text>

      {/* Circuit traces */}
      <g stroke={`url(#${g('iris')})`} strokeWidth="1.5" fill="none" opacity="0.75" strokeLinecap="round">
        <path d="M96 168h-22v-26h20" />
        <path d="M304 168h22v-26h-20" />
        <path d="M96 236h-24v24h22" />
        <path d="M304 236h24v24h-22" />
        <path d="M200 322v18" />
      </g>
      <g fill={`url(#${g('iris')})`}>
        {[
          [74, 142],
          [326, 142],
          [72, 260],
          [328, 260],
          [200, 342],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.6" />
        ))}
      </g>

      {/* Forged hexagon core */}
      <path d="M200 84 296 140v112l-96 56-96-56V140Z" fill={`url(#${g('core')})`} />
      <path
        d="M200 84 296 140v112l-96 56-96-56V140Z"
        fill="none"
        stroke={`url(#${g('chrome')})`}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M200 100 282 148v96l-82 48-82-48v-96Z" fill="none" stroke={`url(#${g('iris')})`} strokeWidth="1.2" opacity="0.6" />

      {/* Currency glyph */}
      <g stroke={`url(#${g('chrome')})`} strokeWidth="13" strokeLinecap="round" fill="none">
        <path d="M234 163.5A43 43 0 1 0 234 242.5" />
        <path d="M152 189h84" />
        <path d="M152 213h84" />
      </g>

      {/* Nameplate */}
      <rect x="146" y="256" width="108" height="30" rx="6" fill="#0B1220" stroke={`url(#${g('chrome')})`} strokeWidth="2" />
      <text
        x="200"
        y="277"
        textAnchor="middle"
        fill={`url(#${g('chrome')})`}
        fontFamily="'Sora Variable', 'Sora', system-ui, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="2.6"
      >
        ELIMCOIN
      </text>
    </svg>
  );
}

export default memo(EmblemFallback);
