import { useId, useRef } from 'react';
import Box from '@mui/material/Box';
import useInView from '../../hooks/useInView';
import { getAccent } from '../../utils/accents';

/**
 * Single-value arc gauge with a tick bezel — used where one proportion needs to
 * dominate (pool share, gold allocation) rather than be compared in a series.
 */
export default function RadialGauge({
  value = 50,
  max = 100,
  size = 260,
  thickness = 12,
  color = 'gold',
  sweep = 260,
  ticks = 48,
  children,
  ariaLabel,
}) {
  const uid = useId().replace(/:/g, '');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const accent = getAccent(color);

  const r = (size - thickness) / 2 - 14;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * (sweep / 360);
  const filled = arcLength * Math.min(value / max, 1);
  const rotation = 90 + (360 - sweep) / 2;

  return (
    <Box ref={ref} sx={{ position: 'relative', width: '100%', maxWidth: size, mx: 'auto', aspectRatio: '1 / 1' }}>
      <Box
        component="svg"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={ariaLabel ?? `${value} of ${max}`}
        sx={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`${uid}-arc`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={accent.deep} />
            <stop offset="52%" stopColor={accent.base} />
            <stop offset="100%" stopColor={accent.light} />
          </linearGradient>
        </defs>

        {/* Tick bezel */}
        <g>
          {Array.from({ length: ticks }, (_, i) => {
            const angle = rotation + (i / (ticks - 1)) * sweep;
            const rad = (angle * Math.PI) / 180;
            const lit = i / (ticks - 1) <= value / max;
            const inner = r + thickness / 2 + 6;
            const outer = inner + (lit ? 7 : 4);
            return (
              <line
                key={i}
                x1={c + Math.cos(rad) * inner}
                y1={c + Math.sin(rad) * inner}
                x2={c + Math.cos(rad) * outer}
                y2={c + Math.sin(rad) * outer}
                stroke={lit ? accent.base : 'rgba(255,255,255,0.14)'}
                strokeWidth={1}
                strokeLinecap="round"
                opacity={lit ? 0.85 : 1}
              />
            );
          })}
        </g>

        <g transform={`rotate(${rotation} ${c} ${c})`}>
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.055)"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
          />
          <circle
            className="ef-arc"
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={`url(#${uid}-arc)`}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            strokeDashoffset={inView ? 0 : filled}
            style={{
              '--arc-duration': '1600ms',
              '--arc-delay': '150ms',
              filter: `drop-shadow(0 0 14px ${accent.base}66)`,
            }}
          />
        </g>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: '22%',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
