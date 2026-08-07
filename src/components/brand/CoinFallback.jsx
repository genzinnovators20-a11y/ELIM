import { memo, useId } from 'react';

/**
 * Vector stand-in for the gold ELIM COIN.
 * Rendered only until `/brand/elimcoin-gold.png` is present.
 */
function CoinFallback({ size = 420, ...props }) {
  const id = useId().replace(/[:]/g, '');
  const g = (n) => `${id}-${n}`;

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      role="img"
      aria-label="ELIM Coin (ELM)"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      {...props}
    >
      <defs>
        <linearGradient id={g('rim')} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#F8EFCF" />
          <stop offset="26%" stopColor="#D9B84A" />
          <stop offset="52%" stopColor="#8C6716" />
          <stop offset="76%" stopColor="#EBD48A" />
          <stop offset="100%" stopColor="#A67C1C" />
        </linearGradient>
        <radialGradient id={g('face')} cx="0.36" cy="0.28" r="0.86">
          <stop offset="0%" stopColor="#F7E6AE" />
          <stop offset="35%" stopColor="#D9B24A" />
          <stop offset="72%" stopColor="#B08526" />
          <stop offset="100%" stopColor="#7C5A12" />
        </radialGradient>
        {/* userSpaceOnUse — the glyph's horizontal bars have a zero-height
            bounding box and would not render under objectBoundingBox units. */}
        <linearGradient id={g('glyph')} gradientUnits="userSpaceOnUse" x1="130" y1="130" x2="270" y2="270">
          <stop offset="0%" stopColor="#FFF6D8" />
          <stop offset="40%" stopColor="#E9CB6C" />
          <stop offset="100%" stopColor="#9A7420" />
        </linearGradient>
        <radialGradient id={g('halo')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="62%" stopColor="#D4AF37" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <path id={g('arcTop')} d="M 36,200 A 164,164 0 0 1 364,200" fill="none" />
        <path id={g('arcBottom')} d="M 22,200 A 178,178 0 0 0 378,200" fill="none" />
      </defs>

      <circle cx="200" cy="200" r="200" fill={`url(#${g('halo')})`} />

      <circle cx="200" cy="200" r="192" fill={`url(#${g('rim')})`} />
      <circle cx="200" cy="200" r="181" fill={`url(#${g('face')})`} />
      <circle cx="200" cy="200" r="181" fill="none" stroke="rgba(255,246,216,0.35)" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="145" fill="none" stroke="rgba(88,60,8,0.5)" strokeWidth="2.4" />
      <circle cx="200" cy="200" r="139" fill="none" stroke="rgba(255,246,216,0.28)" strokeWidth="1" />

      {/* Milled edge */}
      <g stroke="rgba(72,49,6,0.45)" strokeWidth="2.4" strokeLinecap="round">
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i / 72) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * 184}
              y1={200 + Math.sin(a) * 184}
              x2={200 + Math.cos(a) * 191}
              y2={200 + Math.sin(a) * 191}
            />
          );
        })}
      </g>

      <text
        fill="rgba(74,50,6,0.86)"
        fontFamily="'Sora Variable', 'Sora', system-ui, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="4"
      >
        <textPath href={`#${g('arcTop')}`} startOffset="50%" textAnchor="middle">
          ELIM COIN · BINANCE NETWORK
        </textPath>
      </text>
      <text
        fill="rgba(74,50,6,0.78)"
        fontFamily="'Sora Variable', 'Sora', system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
        letterSpacing="3.4"
      >
        <textPath href={`#${g('arcBottom')}`} startOffset="50%" textAnchor="middle">
          DECENTRALISED · PEER-TO-PEER
        </textPath>
      </text>

      {/* Circuit engraving */}
      <g stroke="rgba(74,50,6,0.36)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M104 152h24l14-14h30" />
        <path d="M104 248h24l14 14h30" />
        <path d="M296 152h-24l-14-14h-30" />
        <path d="M296 248h-24l-14 14h-30" />
        <path d="M118 200H86" />
        <path d="M282 200h32" />
      </g>
      <g fill="rgba(74,50,6,0.42)">
        {[
          [86, 200],
          [314, 200],
          [172, 138],
          [228, 138],
          [172, 262],
          [228, 262],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
        ))}
      </g>

      {/* Currency glyph — engraved shadow first, then the raised gold face */}
      <g
        stroke="rgba(64,42,4,0.4)"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
        transform="translate(4,5)"
      >
        <path d="M247 146.5A68 68 0 1 0 247 253.5" />
        <path d="M128 183h104" />
        <path d="M128 217h104" />
      </g>
      <g stroke={`url(#${g('glyph')})`} strokeWidth="21" strokeLinecap="round" fill="none">
        <path d="M247 146.5A68 68 0 1 0 247 253.5" />
        <path d="M128 183h104" />
        <path d="M128 217h104" />
      </g>

      {/* Specular sweep */}
      <ellipse cx="146" cy="128" rx="82" ry="44" fill="#FFFFFF" opacity="0.14" transform="rotate(-32 146 128)" />
    </svg>
  );
}

export default memo(CoinFallback);
