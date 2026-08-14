import { memo, useCallback, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import BrandArt from '../brand/BrandArt';
import ForgeRings from './ForgeRings';
import MarketPulse from './MarketPulse';
import { fontFamilies } from '../../theme/typography';

const MotionBox = motion.create(Box);

/**
 * The ELIM FORGE image, mounted in a laser assembly rig and featured at full
 * scale rather than tucked into a card.
 *
 * The whole rig tilts with the pointer on a spring, which is what sells the
 * depth; it is disabled entirely for reduced-motion and coarse pointers.
 *
 * `showMarketPanel` adds the dark metallic trading-chart mock-up. The spec
 * assigns that mock-up to the ELIMCOIN section, so the masthead runs without
 * it — but the composition is kept here, one prop away.
 */
function ForgeStage({ showMarketPanel = false }) {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 22, mass: 0.7 };
  const sx1 = useSpring(px, spring);
  const sy1 = useSpring(py, spring);

  const rotateY = useTransform(sx1, [-0.5, 0.5], [9, -9]);
  const rotateX = useTransform(sy1, [-0.5, 0.5], [-7, 7]);
  const emblemX = useTransform(sx1, [-0.5, 0.5], [-22, 22]);
  const emblemY = useTransform(sy1, [-0.5, 0.5], [-14, 14]);
  const panelX = useTransform(sx1, [-0.5, 0.5], [16, -16]);
  const glowX = useTransform(sx1, [-0.5, 0.5], [-36, 36]);
  /**
   * The coin travels further than the emblem it was struck from. Nearer objects
   * displace more as the viewpoint shifts, so the wider range is what separates
   * the two planes — the coin stops reading as decoration pinned to the rig and
   * starts reading as an object floating in front of it.
   */
  const coinX = useTransform(sx1, [-0.5, 0.5], [-34, 34]);
  const coinY = useTransform(sy1, [-0.5, 0.5], [-20, 20]);

  /**
   * The rect is measured on enter and on viewport change, not on every pointer
   * event. `getBoundingClientRect()` inside a move handler forces a layout on
   * each of the dozens of events a second a moving pointer produces.
   */
  const rectRef = useRef(null);

  /**
   * Whether the pointer is over the rig. The scroll/resize refresh below is
   * gated on it: `getBoundingClientRect()` forces a synchronous layout, and
   * running it on every scroll event — which momentum scrolling fires
   * continuously — spends a layout per event on a rect nothing is reading.
   * Off the rig the rect is left stale; `pointerenter` re-measures before the
   * first move can use it.
   */
  const insideRef = useRef(false);

  const measure = useCallback(() => {
    if (wrapRef.current) rectRef.current = wrapRef.current.getBoundingClientRect();
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const onViewportChange = () => {
      if (insideRef.current) measure();
    };
    window.addEventListener('resize', onViewportChange, { passive: true });
    window.addEventListener('scroll', onViewportChange, { passive: true });
    return () => {
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('scroll', onViewportChange);
    };
  }, [measure, reduced]);

  const handleEnter = useCallback(() => {
    if (reduced) return;
    insideRef.current = true;
    measure();
  }, [measure, reduced]);

  const handleMove = useCallback(
    (event) => {
      if (reduced) return;
      const rect = rectRef.current;
      if (!rect) return;
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [px, py, reduced],
  );

  const handleLeave = useCallback(() => {
    insideRef.current = false;
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <Box
      ref={wrapRef}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: { xs: '1 / 1', md: '1 / 1.02' },
        perspective: '1400px',
        '@media (pointer: coarse)': { pointerEvents: 'none' },
      }}
    >
      {/* Ambient forge light */}
      <MotionBox
        aria-hidden
        style={{ x: reduced ? 0 : glowX }}
        sx={{
          position: 'absolute',
          inset: '-14%',
          background:
            'radial-gradient(46% 42% at 52% 44%, rgba(76,141,255,0.24) 0%, rgba(31,185,138,0.12) 42%, transparent 72%)',
          filter: 'blur(36px)',
          pointerEvents: 'none',
        }}
      />

      <MotionBox
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        sx={{ position: 'absolute', inset: 0 }}
      >
        {/* Assembly rig */}
        <Box sx={{ position: 'absolute', inset: { xs: '4%', md: '2%' } }}>
          <ForgeRings />
        </Box>

        {/* Primary branding asset — featured at full scale */}
        <MotionBox
          style={reduced ? undefined : { x: emblemX, y: emblemY }}
          animate={reduced ? undefined : { y: [0, -12, 0] }}
          transition={reduced ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            inset: '16%',
            display: 'grid',
            placeItems: 'center',
            filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.65)) drop-shadow(0 0 60px rgba(99,201,236,0.2))',
          }}
        >
          <BrandArt asset="emblem" priority sx={{ width: '100%' }} />
        </MotionBox>

        {/* Metallic market panel */}
        {showMarketPanel && (
        <MotionBox
          style={reduced ? undefined : { x: panelX }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
            transform: 'translateZ(60px)',
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
        </MotionBox>
        )}

        {/* Gold coin — the forged output, drifting free of the rig */}
        <MotionBox
          style={reduced ? undefined : { x: coinX, y: coinY }}
          sx={{
            position: 'absolute',
            right: { xs: '-2%', md: '-4%' },
            top: { xs: '2%', md: '4%' },
            width: { xs: '26%', md: '25%' },
            transform: 'translateZ(90px)',
          }}
        >
          <MotionBox
            initial={{ opacity: 0, scale: 0.78 }}
            animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, 14, 0] }}
            transition={
              reduced
                ? { duration: 0.5 }
                : {
                    opacity: { delay: 0.72, duration: 0.8 },
                    scale: { delay: 0.72, duration: 1, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.7 },
                  }
            }
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
            <BrandArt asset="coin" priority />

            {/*
              Specular sweep — a raking highlight crossing the struck face.
              The disc mask lives on this wrapper, which shares the coin's box,
              so the sheen is confined to the metal instead of streaking across
              the background behind it.
            */}
            {!reduced && (
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
                <MotionBox
                  animate={{ x: ['-160%', '340%'], opacity: [0, 0.55, 0.55, 0] }}
                  transition={{
                    duration: 2.6,
                    times: [0, 0.18, 0.72, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 6.2,
                    delay: 2.1,
                  }}
                  sx={{
                    position: 'absolute',
                    top: '-14%',
                    left: 0,
                    width: '38%',
                    height: '128%',
                    background:
                      'linear-gradient(100deg, transparent 0%, rgba(255,250,235,0.4) 46%, rgba(255,255,255,0.6) 52%, transparent 100%)',
                    transform: 'skewX(-16deg)',
                    filter: 'blur(5px)',
                    mixBlendMode: 'screen',
                  }}
                />
              </Box>
            )}
          </MotionBox>
        </MotionBox>
      </MotionBox>
    </Box>
  );
}

export default memo(ForgeStage);
