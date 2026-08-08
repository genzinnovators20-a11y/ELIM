import { memo, useId } from 'react';
import Box from '@mui/material/Box';

/**
 * Twin-palm brand symbol from the ELIM FORGE corporate identity — the Mauritius
 * mark that sits beside the coin on the company card.
 *
 * Drawn, not traced: two tapered trunks converging at a single base, each
 * carrying a fan of drooping fronds built from one reusable leaf path mirrored
 * about the crown. Vector-only, so it stays crisp at any size and costs nothing
 * to render.
 *
 * Gradients use `userSpaceOnUse` — several of these paths are near-flat and
 * would not paint at all under the default objectBoundingBox units.
 */

/** One frond, tip toward +x, drooping. Mirrored for the opposite side. */
const FROND = 'M0 0 C 12 -11 28 -11 40 8 C 34 -2 16 0 0 0 Z';

/** Rotation / scale of each frond on the right half of a crown. */
const FRONDS = [
  { r: -78, s: 0.82 },
  { r: -38, s: 1 },
  { r: 4, s: 0.96 },
  { r: 40, s: 0.8 },
];

const Crown = ({ x, y, scale = 1, fill }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {FRONDS.map(({ r, s }) => (
      <path key={`r${r}`} d={FROND} fill={fill} transform={`rotate(${r}) scale(${s})`} />
    ))}
    {FRONDS.map(({ r, s }) => (
      <path key={`l${r}`} d={FROND} fill={fill} transform={`scale(-1,1) rotate(${r}) scale(${s})`} />
    ))}
    {/* Coconut cluster at the heart of the crown */}
    <circle cx="-3.4" cy="4.6" r="2.5" fill={fill} />
    <circle cx="3.2" cy="5.4" r="2.1" fill={fill} />
    <circle cx="0" cy="9.4" r="1.9" fill={fill} />
  </g>
);

function PalmMark({ size = 96, sx, ...props }) {
  const raw = useId().replace(/:/g, '');
  const g = (n) => `${raw}-${n}`;
  const fill = `url(#${g('gold')})`;

  return (
    <Box
      component="svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      role="img"
      aria-label="ELIM FORGE palm emblem"
      sx={{ display: 'block', flexShrink: 0, ...sx }}
      {...props}
    >
      <defs>
        <linearGradient id={g('gold')} gradientUnits="userSpaceOnUse" x1="16" y1="12" x2="112" y2="120">
          <stop offset="0%" stopColor="#F8EFCF" />
          <stop offset="30%" stopColor="#E3C765" />
          <stop offset="62%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#A67C1C" />
        </linearGradient>
      </defs>

      {/* Trunks — converging at a common base, splaying to opposite crowns */}
      <path d="M56 116 C 50 96 38 72 32 48 L 38.5 46.5 C 44 72 55.5 94 62 116 Z" fill={fill} />
      <path d="M72 116 C 78 96 87.5 70 92.5 44 L 86 42.8 C 82 70 72.5 94 66 116 Z" fill={fill} />

      <Crown x="35" y="46" scale={0.86} fill={fill} />
      <Crown x="89.5" y="42" scale={0.94} fill={fill} />
    </Box>
  );
}

export default memo(PalmMark);
