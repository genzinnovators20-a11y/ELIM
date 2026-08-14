import { memo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const spinBack = keyframes`from { transform: rotate(360deg); } to { transform: rotate(0deg); }`;

/**
 * The orbits that used to be three tori circling the WebGL coin.
 *
 * Each is a single flattened ellipse: a ring seen almost edge-on reads as one,
 * and turning it in its own plane gives the same precessing sweep the 3D rings
 * had. Colours, relative radii and periods are carried over from the meshes they
 * replace — cyan innermost and brightest, then emerald, then a wide slow gold.
 *
 * `layer` splits them either side of the coin. The 3D originals passed in front
 * of the disc and behind it as they turned; keeping one orbit underneath and two
 * over the top preserves that read of depth, which is the whole reason the motif
 * works. Purely transform and opacity, so the whole thing lives on the
 * compositor and costs no main-thread time.
 */
const ORBITS = [
  { scale: 1.42, ry: 30, tilt: -16, color: '#63C9EC', opacity: 0.75, width: 0.9, duration: 26, layer: 'back' },
  { scale: 1.62, ry: 21, tilt: 22, color: '#1FB98A', opacity: 0.55, width: 0.8, duration: 39, reverse: true, layer: 'front' },
  { scale: 1.86, ry: 13, tilt: -7, color: '#D4AF37', opacity: 0.4, width: 0.7, duration: 32, layer: 'front' },
];

function OrbitRings({ layer = 'front' }) {
  return (
    <>
      {ORBITS.filter((o) => o.layer === layer).map((o) => {
        const inset = `${((1 - o.scale) / 2) * 100}%`;
        return (
          <Box
            key={o.color}
            aria-hidden
            sx={{
              position: 'absolute',
              inset,
              pointerEvents: 'none',
              animation: `${o.reverse ? spinBack : spin} ${o.duration}s linear infinite`,
              willChange: 'transform',
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 200 200"
              sx={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
            >
              <ellipse
                cx="100"
                cy="100"
                rx="99"
                ry={o.ry}
                fill="none"
                stroke={o.color}
                strokeWidth={o.width}
                strokeOpacity={o.opacity}
                transform={`rotate(${o.tilt} 100 100)`}
              />
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default memo(OrbitRings);
