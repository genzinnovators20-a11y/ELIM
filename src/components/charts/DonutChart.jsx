import { useMemo, useState, useId } from 'react';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import useInView from '../../hooks/useInView';
import { getAccent, alphaOf } from '../../utils/accents';

const polar = (cx, cy, r, angle) => ({
  x: cx + r * Math.cos((angle - 90) * (Math.PI / 180)),
  y: cy + r * Math.sin((angle - 90) * (Math.PI / 180)),
});

/**
 * Allocation donut.
 *
 * Segments are drawn as stroked arcs on a shared circle so they can be animated
 * with a single dash-offset per slice — cheap, smooth, and it keeps the gaps
 * between slices geometrically exact at any size.
 */
export default function DonutChart({
  data = [],
  size = 340,
  thickness = 34,
  gap = 1.6,
  activeIndex,
  onHover,
  children,
  ariaLabel = 'Allocation breakdown',
}) {
  const uid = useId().replace(/:/g, '');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [internalActive, setInternalActive] = useState(null);

  const active = activeIndex ?? internalActive;
  const setActive = (i) => {
    setInternalActive(i);
    onHover?.(i);
  };

  const radius = (size - thickness) / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0) || 1, [data]);

  const gapFraction = gap / 360;
  const segments = data.reduce((acc, d, i) => {
    const fraction = d.value / total;
    const start = acc.length ? acc[acc.length - 1].end : 0;
    acc.push({
      ...d,
      index: i,
      end: start + fraction,
      length: Math.max(circumference * (fraction - gapFraction), 2),
      offset: -circumference * start,
      startAngle: start * 360,
      endAngle: (start + fraction) * 360,
    });
    return acc;
  }, []);

  return (
    <Box
      ref={ref}
      sx={{ position: 'relative', width: '100%', maxWidth: size, mx: 'auto', aspectRatio: '1 / 1' }}
    >
      <Box
        component="svg"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={ariaLabel}
        sx={{ width: '100%', height: '100%', overflow: 'visible', transform: 'rotate(-90deg)' }}
      >
        <defs>
          {segments.map((seg) => {
            const accent = getAccent(seg.color);
            // The gradient axis spans the segment's own chord, so short slices
            // read as solidly as long ones instead of collapsing to one end colour.
            const p1 = polar(size / 2, size / 2, radius, seg.startAngle);
            const p2 = polar(size / 2, size / 2, radius, seg.endAngle);
            return (
              <linearGradient
                key={seg.index}
                id={`${uid}-g${seg.index}`}
                gradientUnits="userSpaceOnUse"
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
              >
                <stop offset="0%" stopColor={accent.light} />
                <stop offset="52%" stopColor={accent.base} />
                <stop offset="100%" stopColor={accent.mid ?? accent.base} />
              </linearGradient>
            );
          })}
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={thickness}
        />

        {segments.map((seg) => {
          const isActive = active === seg.index;
          const dimmed = active != null && !isActive;
          return (
            <circle
              key={seg.index}
              className="ef-arc"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`url(#${uid}-g${seg.index})`}
              strokeWidth={isActive ? thickness + 8 : thickness}
              strokeLinecap="butt"
              strokeDasharray={`${seg.length} ${circumference}`}
              /* Each slice sweeps out from its own start point as the chart
                 comes into view, then holds. React writes these two attributes
                 once, when `inView` flips; the draw itself is the transition
                 declared on `.ef-arc`. */
              strokeDashoffset={inView ? seg.offset : seg.offset + seg.length}
              opacity={inView ? (dimmed ? 0.28 : 1) : 0}
              style={{
                cursor: 'pointer',
                '--arc-delay': `${Math.round((0.12 + seg.index * 0.09) * 1000)}ms`,
                filter: isActive ? `drop-shadow(0 0 16px ${alphaOf(seg.color, 0.65)})` : 'none',
              }}
              onMouseEnter={() => setActive(seg.index)}
              onMouseLeave={() => setActive(null)}
            />
          );
        })}
      </Box>

      {/* Centre readout */}
      <Box
        sx={{
          position: 'absolute',
          inset: '19%',
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
