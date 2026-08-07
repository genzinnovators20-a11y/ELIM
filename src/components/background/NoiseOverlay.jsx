import { memo } from 'react';
import Box from '@mui/material/Box';

/**
 * Fine film grain. Kills gradient banding on large dark surfaces and gives the
 * whole page a photographed, physical quality rather than a rendered one.
 * Generated inline — no network request, no image asset.
 */
export const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E\")";

function NoiseOverlay({ opacity = 0.038, blend = 'overlay', fixed = true, sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        backgroundImage: NOISE_URL,
        backgroundRepeat: 'repeat',
        opacity,
        mixBlendMode: blend,
        pointerEvents: 'none',
        zIndex: 3,
        ...sx,
      }}
    />
  );
}

export default memo(NoiseOverlay);
