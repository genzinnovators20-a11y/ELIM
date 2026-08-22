import { memo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import BrandArt from '../brand/BrandArt';
import ForgeRings from './ForgeRings';
import OrbitRings from './OrbitRings';

/** One revolution about the coin's vertical axis — the WebGL coin's own rate. */
const strike = keyframes`from { transform: rotateY(0deg); } to { transform: rotateY(360deg); }`;

const SPIN_SECONDS = 15;

/**
 * The ELIMCOIN stage: the official coin artwork, struck on both faces of a
 * turning disc inside the laser assembly rig.
 *
 * This was a WebGL scene. The 3D coin was dropped because mapping the supplied
 * file onto a lit cylinder lit it twice: the artwork is already a finished
 * render carrying its own lighting and the deep shadow in every engraved
 * channel, so relighting it raised the darkest tenth of the face from 31/255 to
 * 77 and dropped its saturation from 0.90 to 0.57 — pale and silvery beside the
 * same artwork shown flat elsewhere on the page. It also cost ~900KB of three.js
 * and close to a second of blocked main thread compiling shaders.
 *
 * The motion is kept without any of that. The disc turns on `rotateY`, and both
 * faces carry the artwork at its own tone — the back one counter-rotated so it
 * reads the right way round rather than mirrored, which the single mapped sheet
 * on the old cylinder could not do. `OrbitRings` restores the tori that circled
 * it. Everything here is transform and opacity, so it runs on the compositor and
 * never touches the main thread.
 */
function CoinStage({ height = 520, sx }) {
  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: height, ...sx }}>
      <Box sx={{ position: 'absolute', inset: '-6%' }}>
        <ForgeRings />
      </Box>

      <Box
        sx={{
          position: 'relative',
          height,
          display: 'grid',
          placeItems: 'center',
          px: '14%',
          perspective: '1400px',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
          <OrbitRings layer="back" />

          {/* The coin's own light: a static bloom rather than a filter, which
              would flatten the 3D context the two faces depend on. */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: '-12%',
              borderRadius: '50%',
              background:
                'radial-gradient(50% 50% at 50% 52%, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.1) 45%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              transformStyle: 'preserve-3d',
              animation: `${strike} ${SPIN_SECONDS}s linear infinite`,
              willChange: 'transform',
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            {/* The milled edge, seen only as the disc passes side-on. Sitting at
                z=0 between the two faces, it is hidden behind them head-on and
                becomes the sliver of metal that stops the coin vanishing as it
                turns through the perpendicular. */}
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: '2.5%',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #F4E2A8 0%, #D9B24A 38%, #8A6210 72%, #5C3F07 100%)',
                boxShadow: '0 0 12px rgba(212,175,55,0.45)',
              }}
            />

            <Box sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}>
              <BrandArt asset="coin" />
            </Box>

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg) translateZ(1px)',
              }}
            >
              <BrandArt asset="coin" />
            </Box>
          </Box>

          <OrbitRings layer="front" />
        </Box>
      </Box>
    </Box>
  );
}

export default memo(CoinStage);
