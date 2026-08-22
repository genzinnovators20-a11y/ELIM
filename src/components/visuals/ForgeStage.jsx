import { memo } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import BrandArt from '../brand/BrandArt';
import ForgeRings from './ForgeRings';
import MarketPulse from './MarketPulse';
import usePointerTilt from '../../hooks/usePointerTilt';
import { fontFamilies } from '../../theme/typography';
import '../../animations/ambient.css';

/**
 * How far each plane travels across the full width of the rig, in pixels.
 *
 * These are the ranges the `useTransform` graph mapped -0.5..0.5 onto, kept
 * exactly. The coin travels furthest because it is the nearest object: nearer
 * things displace more as the viewpoint shifts, and that difference is the whole
 * reason the coin reads as floating in front of the rig rather than as
 * decoration pinned to it.
 *
 * Each is applied as `calc(var(--tilt-x) * N)`, so all seven planes are driven
 * by the two variables `usePointerTilt` writes — no per-plane subscription, and
 * nothing to update when the pointer is still.
 */
const PLANE = {
  rigRotate: 18, // degrees across the full sweep, halved either side of centre
  glow: 72,
  emblem: 44,
  emblemY: 28,
  panel: -32,
  coin: 68,
  coinY: 40,
};

const travel = (axis, px) => `calc(var(--tilt-${axis}, 0) * ${px}px)`;

/**
 * The ELIM FORGE image, mounted in a laser assembly rig and featured at full
 * scale rather than tucked into a card.
 *
 * The whole rig tilts with the pointer, which is what sells the depth; it is
 * inert for reduced-motion and coarse pointers, where there is no hovering
 * pointer for it to answer.
 *
 * `showMarketPanel` adds the dark metallic trading-chart mock-up. The spec
 * assigns that mock-up to the ELIMCOIN section, so the masthead runs without
 * it — but the composition is kept here, one prop away.
 */
function ForgeStage({ showMarketPanel = false }) {
  const wrapRef = usePointerTilt();

  return (
    <Box
      ref={wrapRef}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: { xs: '1 / 1', md: '1 / 1.02' },
        perspective: '1400px',
        /* Nothing in the rig is interactive; the tilt is the only reason it
           listens at all, and that is a fine-pointer affordance. */
        '@media (pointer: coarse)': { pointerEvents: 'none' },
      }}
    >
      {/* Ambient forge light */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: '-14%',
          transform: `translate3d(${travel('x', PLANE.glow)}, 0, 0)`,
          /* Painted, not filtered — see the masthead's horizon light. This one
             also sits inside the tilt rig, so a filtered layer would be
             re-rasterised as the rig turns under the pointer. */
          background:
            'radial-gradient(46% 42% at 52% 44%, rgba(76,141,255,0.24) 0%, rgba(31,185,138,0.11) 44%, transparent 74%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateY(calc(var(--tilt-x, 0) * ${-PLANE.rigRotate}deg)) rotateX(calc(var(--tilt-y, 0) * ${PLANE.rigRotate}deg))`,
        }}
      >
        {/* Assembly rig */}
        <Box sx={{ position: 'absolute', inset: { xs: '4%', md: '2%' } }}>
          <ForgeRings />
        </Box>

        {/* Primary branding asset — featured at full scale */}
        {/*
          The emblem sits on two nested elements rather than one: the outer box
          carries the pointer parallax, the inner box carries the endless float.
          A single element cannot hold both, because they are two independent
          transforms on the same axis and the second would overwrite the first.
        */}
        <Box
          sx={{
            position: 'absolute',
            inset: '16%',
            transform: `translate3d(${travel('x', PLANE.emblem)}, ${travel('y', PLANE.emblemY)}, 0)`,
          }}
        >
          <Box
            className="ef-float"
            style={{ '--float-to': '-12px', '--float-duration': '7.5s' }}
            sx={{
              display: 'grid',
              placeItems: 'center',
              filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.65)) drop-shadow(0 0 60px rgba(99,201,236,0.2))',
            }}
          >
            <BrandArt asset="emblem" priority sx={{ width: '100%' }} />
          </Box>
        </Box>

        {/* Metallic market panel */}
        {showMarketPanel && (
        <Box
          className="ef-enter-rise"
          style={{ '--enter-delay': '850ms', '--enter-duration': '1100ms' }}
          sx={{
            position: 'absolute',
            left: { xs: '-4%', md: '-14%' },
            bottom: { xs: '-2%', md: '-1%' },
            width: { xs: '72%', sm: '64%', md: '60%' },
            borderRadius: '18px',
            overflow: 'hidden',
            background: 'linear-gradient(158deg, rgba(20,26,34,0.92) 0%, rgba(8,11,16,0.94) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow:
              '0 1px 0 rgba(255,255,255,0.09) inset, 0 40px 90px -34px rgba(0,0,0,0.95), 0 0 0 1px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(14px)',
            /* No `translateZ`, for the same reason as the coin below. */
            transform: `translate3d(${travel('x', PLANE.panel)}, 0, 0)`,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: 2,
              py: 1.25,
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#1FB98A',
                  boxShadow: '0 0 10px rgba(31,185,138,0.9)',
                }}
              />
              <Typography
                sx={{
                  fontFamily: fontFamilies.mono,
                  fontSize: '0.625rem',
                  letterSpacing: '0.18em',
                  color: 'text.primary',
                }}
              >
                ELM / USDT
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: fontFamilies.mono,
                fontSize: '0.5625rem',
                letterSpacing: '0.2em',
                color: (t) => t.ef.text.disabled,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              ILLUSTRATIVE
            </Typography>
          </Stack>

          <MarketPulse height={148} />
        </Box>
        )}

        {/* Gold coin — the forged output, drifting free of the rig */}
        <Box
          sx={{
            position: 'absolute',
            right: { xs: '-2%', md: '-4%' },
            top: { xs: '2%', md: '4%' },
            width: { xs: '26%', md: '25%' },
            /*
             * No `translateZ`. The source carried `translateZ(90px)` here, but
             * framer-motion owned this element's `transform` and overwrote it,
             * so the shipped site has never rendered it — and under the rig's
             * `perspective: 1400px` reinstating it enlarges the coin by 6.9%,
             * which is a visible change to a mark the brand is built on. The
             * depth read comes from the parallax range anyway: the coin travels
             * further than the emblem behind it, which is what separates the
             * planes. See `PLANE`.
             */
            transform: `translate3d(${travel('x', PLANE.coin)}, ${travel('y', PLANE.coinY)}, 0)`,
          }}
        >
          {/*
            Entrance and drift on two nested elements, not one.
            Both animate `transform`, and an element resolves a single
            `animation-name` — stacking the classes silently dropped whichever
            rule lost the cascade, which killed the coin's drift outright.
          */}
          <Box className="ef-enter-stage" style={{ '--enter-delay': '720ms', '--enter-duration': '1000ms' }}>
          <Box
            className="ef-float"
            style={{
              '--float-to': '14px',
              '--float-duration': '9s',
              '--float-delay': '1.7s',
            }}
            sx={{
              position: 'relative',
              /**
               * Three shadow layers rather than two: a tight contact shadow for
               * near-field definition, the cast shadow for elevation, and the
               * gold bloom for the metal's own light. Two layers read as a
               * sticker with a glow; three read as an object above a surface.
               */
              filter:
                'drop-shadow(0 5px 9px rgba(0,0,0,0.55)) drop-shadow(0 24px 42px rgba(0,0,0,0.7)) drop-shadow(0 0 34px rgba(212,175,55,0.32))',
            }}
          >
            <BrandArt asset="coinSm" priority />

            {/*
              Specular sweep — a raking highlight crossing the struck face.
              The disc mask lives on this wrapper, which shares the coin's box,
              so the sheen is confined to the metal instead of streaking across
              the background behind it.
            */}
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: 0,
                clipPath: 'circle(47% at 50% 50%)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <Box
                className="ef-sheen"
                sx={{
                  position: 'absolute',
                  top: '-14%',
                  left: 0,
                  width: '38%',
                  height: '128%',
                  background:
                    'linear-gradient(100deg, transparent 0%, rgba(255,250,235,0.4) 46%, rgba(255,255,255,0.6) 52%, transparent 100%)',
                  filter: 'blur(5px)',
                  mixBlendMode: 'screen',
                }}
              />
            </Box>
          </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(ForgeStage);
