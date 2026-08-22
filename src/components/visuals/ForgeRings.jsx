import { memo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const spinBack = keyframes`from { transform: rotate(360deg); } to { transform: rotate(0deg); }`;
const dash = keyframes`to { stroke-dashoffset: -1000; }`;
const pulse = keyframes`
  0%, 100% { opacity: 0.32; transform: scale(1); }
  50%      { opacity: 0.7;  transform: scale(1.035); }
`;

const Ring = ({ inset, duration, reverse, dashArray, stroke, width = 1 }) => (
  <Box
    aria-hidden
    sx={{
      position: 'absolute',
      inset,
      animation: `${reverse ? spinBack : spin} ${duration}s linear infinite`,
      willChange: 'transform',
      '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
    }}
  >
    <Box
      component="svg"
      viewBox="0 0 200 200"
      sx={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <circle
        cx="100"
        cy="100"
        r="99"
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
    </Box>
  </Box>
);

/**
 * The forge: concentric assembly rings, converging laser guides and orbiting
 * nodes that frame whatever sits at the centre of the stage.
 * Pure SVG + CSS transforms — no WebGL cost, no layout thrash.
 */
function ForgeRings({ laserColor = 'rgba(99, 201, 236, 0.9)', sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        ...sx,
      }}
    >
      {/* Core bloom */}
      <Box
        sx={{
          position: 'absolute',
          inset: '14%',
          borderRadius: '50%',
          /* The pulse animates `scale`, so a filter here would be re-rasterised
             on every frame of a 7s loop — and this component is instantiated
             four times across the page. The gradient carries the softness. */
          background:
            'radial-gradient(circle at 50% 46%, rgba(99,201,236,0.2) 0%, rgba(76,141,255,0.095) 40%, transparent 70%)',
          animation: `${pulse} 7s ease-in-out infinite`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0.5 },
        }}
      />

      <Ring inset="0%" duration={62} dashArray="2 10" stroke="rgba(255,255,255,0.2)" />
      <Ring inset="5%" duration={44} reverse dashArray="46 14 6 14" stroke="rgba(212,175,55,0.42)" width={1.4} />
      <Ring inset="12.5%" duration={30} dashArray="1 7" stroke="rgba(99,201,236,0.5)" />
      <Ring inset="21%" duration={78} reverse dashArray="120 40" stroke="rgba(31,185,138,0.34)" width={1.2} />

      {/* Converging laser guides */}
      <Box
        component="svg"
        viewBox="0 0 200 200"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id="forge-laser" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={laserColor} stopOpacity="0" />
            <stop offset="55%" stopColor={laserColor} stopOpacity="0.75" />
            <stop offset="100%" stopColor={laserColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <Box
          component="g"
          stroke="url(#forge-laser)"
          strokeWidth="0.9"
          strokeDasharray="6 14"
          sx={{
            animation: `${dash} 9s linear infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={100 + Math.cos(rad) * 100}
                y1={100 + Math.sin(rad) * 100}
                x2={100 + Math.cos(rad) * 34}
                y2={100 + Math.sin(rad) * 34}
              />
            );
          })}
        </Box>
      </Box>

      {/* Orbiting assembly nodes */}
      {[
        { size: 7, duration: 22, radius: '48%', color: 'rgba(212,175,55,0.95)', delay: 0 },
        { size: 5, duration: 34, radius: '44%', color: 'rgba(99,201,236,0.95)', delay: -8 },
        { size: 4, duration: 28, radius: '52%', color: 'rgba(31,185,138,0.95)', delay: -16 },
      ].map((node, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            inset: 0,
            animation: `${i % 2 ? spinBack : spin} ${node.duration}s linear infinite`,
            animationDelay: `${node.delay}s`,
            willChange: 'transform',
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: `calc(50% - ${node.radius})`,
              left: '50%',
              width: node.size,
              height: node.size,
              ml: `${-node.size / 2}px`,
              borderRadius: '50%',
              background: node.color,
              boxShadow: `0 0 14px ${node.color}`,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default memo(ForgeRings);
