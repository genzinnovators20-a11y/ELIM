import { memo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import GridField from './GridField';
import NoiseOverlay from './NoiseOverlay';

const drift = keyframes`
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  33%  { transform: translate3d(3%, -4%, 0) scale(1.06); }
  66%  { transform: translate3d(-3%, 3%, 0) scale(0.97); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

/** A single slow-moving light source. Transform-only, so it stays on the GPU. */
const Bloom = ({ color, size, top, left, right, bottom, delay = 0, duration = 34, opacity = 1 }) => (
  <Box
    aria-hidden
    sx={{
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 68%)`,
      filter: 'blur(28px)',
      opacity,
      willChange: 'transform',
      animation: `${drift} ${duration}s ease-in-out ${delay}s infinite`,
      '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
    }}
  />
);

/**
 * The site's permanent ground: obsidian base, a navy/emerald/gold light rig,
 * an engineering grid, film grain and a vignette. Fixed behind all content so
 * scrolling reveals it as a continuous space rather than repeating per section.
 */
function BackgroundStage() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: `
          radial-gradient(120% 80% at 50% -12%, #0C1524 0%, #070A11 46%, #05070A 100%),
          #05070A
        `,
      }}
    >
      <Bloom color="rgba(30, 79, 176, 0.34)" size="min(56vw, 820px)" top="-14%" left="-10%" duration={38} />
      <Bloom color="rgba(31, 185, 138, 0.2)" size="min(46vw, 680px)" top="26%" right="-12%" delay={-8} duration={44} />
      <Bloom color="rgba(212, 175, 55, 0.16)" size="min(42vw, 600px)" bottom="-8%" left="18%" delay={-16} duration={50} />
      <Bloom color="rgba(142, 123, 240, 0.14)" size="min(36vw, 520px)" bottom="18%" right="22%" delay={-24} duration={46} />

      <GridField size={68} major={4} opacity={0.42} mask="radial-gradient(130% 100% at 50% 12%, #000 8%, transparent 72%)" />

      {/* Vignette */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(112% 82% at 50% 44%, transparent 42%, rgba(0,0,0,0.5) 82%, rgba(0,0,0,0.82) 100%)',
        }}
      />

      <NoiseOverlay opacity={0.042} />
    </Box>
  );
}

export default memo(BackgroundStage);
