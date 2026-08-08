import { memo, useCallback, useRef } from 'react';
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

  const handleMove = useCallback(
    (event) => {
      if (reduced || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [px, py, reduced],
  );

  const handleLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <Box
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
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
          initial={{ opacity: 0, scale: 0.7 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, 14, 0] }}
          transition={
            reduced
              ? { duration: 0.6 }
              : {
                  opacity: { delay: 1.1, duration: 0.9 },
                  scale: { delay: 1.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.1 },
                }
          }
          sx={{
            position: 'absolute',
            right: { xs: '-2%', md: '-4%' },
            top: { xs: '2%', md: '4%' },
            width: { xs: '26%', md: '25%' },
            filter: 'drop-shadow(0 22px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 32px rgba(212,175,55,0.3))',
            transform: 'translateZ(90px)',
          }}
        >
          <BrandArt asset="coin" priority />
        </MotionBox>
      </MotionBox>
    </Box>
  );
}

export default memo(ForgeStage);
