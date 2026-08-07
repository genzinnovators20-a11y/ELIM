import { memo, useId } from 'react';
import Box from '@mui/material/Box';

/**
 * Compact ELIM FORGE monogram — forged hexagon around the ELIM currency glyph.
 * Vector-only so it stays razor sharp in the navigation bar and footer.
 *
 * Gradients use `userSpaceOnUse`: the glyph's crossbars are horizontal strokes
 * with a zero-height bounding box, which are not rendered at all under the
 * default objectBoundingBox gradient units.
 */
function ElimMark({ size = 40, tone = 'gold', sx, ...props }) {
  const raw = useId().replace(/[:]/g, '');
  const g = (n) => `${raw}-${n}`;

  return (
    <Box
      component="svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="ELIM FORGE"
      sx={{ display: 'block', flexShrink: 0, ...sx }}
      {...props}
    >
      <defs>
        <linearGradient id={g('metal')} gradientUnits="userSpaceOnUse" x1="8" y1="4" x2="56" y2="60">
          {tone === 'gold' ? (
            <>
              <stop offset="0%" stopColor="#F8EFCF" />
              <stop offset="38%" stopColor="#D4AF37" />
              <stop offset="72%" stopColor="#A67C1C" />
              <stop offset="100%" stopColor="#EFD98F" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="34%" stopColor="#C7D0DC" />
              <stop offset="66%" stopColor="#7E8B9C" />
              <stop offset="100%" stopColor="#E7EDF5" />
            </>
          )}
        </linearGradient>
        <linearGradient id={g('ring')} gradientUnits="userSpaceOnUse" x1="6" y1="58" x2="58" y2="6">
          <stop offset="0%" stopColor="#63C9EC" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#C9CFDA" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8E7BF0" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="29.2" fill="none" stroke={`url(#${g('ring')})`} strokeWidth="1.1" opacity="0.7" />
      <circle cx="32" cy="32" r="25.6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

      <path
        d="M32 8.6 52.7 20.3v23.4L32 55.4 11.3 43.7V20.3Z"
        fill="none"
        stroke={`url(#${g('metal')})`}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />

      {/* Currency glyph */}
      <g stroke={`url(#${g('metal')})`} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M38.4 24.3a10 10 0 1 0 0 15.4" />
        <path d="M19.8 29.6h15.4" />
        <path d="M19.8 34.4h15.4" />
      </g>

      {/* Forge nodes */}
      <circle cx="32" cy="6.6" r="1.5" fill={`url(#${g('metal')})`} />
      <circle cx="32" cy="57.4" r="1.5" fill={`url(#${g('metal')})`} opacity="0.6" />
    </Box>
  );
}

export default memo(ElimMark);
