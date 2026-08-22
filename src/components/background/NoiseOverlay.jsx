import { memo } from 'react';
import Box from '@mui/material/Box';

/**
 * Fine film grain. Kills gradient banding on large dark surfaces and gives the
 * whole page a photographed, physical quality rather than a rendered one.
 * Generated inline — no network request, no image asset.
 */
export const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Fine film grain over the site's ground.
 *
 * ── Why this is not a blend mode any more ────────────────────────────────
 *
 * It was `mix-blend-mode: overlay`, and on this page that one declaration was
 * the most expensive thing in a scroll. A blended layer cannot be composited on
 * its own: the compositor has to have the pixels underneath it in order to
 * produce the result, so a full-viewport blend sitting over a background whose
 * light sources are permanently drifting has to be recomputed, across the whole
 * viewport, on every frame. Ablated on a throttled phone at 3x device pixel
 * ratio, removing it alone took the 95th-percentile frame from 43.6ms to 32.3ms
 * and halved the number of dropped frames — more than the rest of the
 * background, the forge rings and every animation on the page put together.
 *
 * What it was worth visually is much smaller than that. `overlay` against a
 * near-black ground resolves to a slight contrast modulation, and the same grain
 * composited normally at a touch more opacity is not distinguishable from it on
 * this palette — the grain is here to break up banding across large dark
 * gradients and to give the ground a photographed quality, and it still does
 * both. Generated inline: no network request, no image asset.
 */
function NoiseOverlay({ opacity = 0.05, fixed = true, sx }) {
  return (
    <Box
      aria-hidden
      data-ef-layer="grain"
      sx={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        backgroundImage: NOISE_URL,
        backgroundRepeat: 'repeat',
        opacity,
        pointerEvents: 'none',
        zIndex: 3,
        ...sx,
      }}
    />
  );
}

export default memo(NoiseOverlay);
