import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BoltOutlined from '@mui/icons-material/BoltOutlined';
import { motion } from 'framer-motion';
import GradientText from '../../components/ui/GradientText';
import Eyebrow from '../../components/ui/Eyebrow';
import BrandArt from '../../components/brand/BrandArt';
import ForgeRings from '../../components/visuals/ForgeRings';
import { ecosystem } from '../../constants/content';
import { easings } from '../../theme/tokens';

const MotionBox = motion.create(Box);

const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(9px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: easings.luxe, delay: 0.1 + i * 0.11 },
  }),
};

/**
 * Ecosystem masthead — centred and symmetrical, in contrast to the asymmetric
 * home and coin mastheads, so arriving here reads as entering a different room.
 */
export default function EcosystemHero() {
  return (
    <Box
      component="section"
      aria-labelledby="ecosystem-title"
      sx={{ position: 'relative', pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 10 }, overflow: 'hidden' }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1200px, 120vw)',
          height: 'min(800px, 90vh)',
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(99,201,236,0.16) 0%, rgba(142,123,240,0.08) 46%, transparent 72%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 4, md: 5 }} alignItems="center" sx={{ textAlign: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: easings.luxe }}
            sx={{ position: 'relative', width: { xs: 190, sm: 240, md: 290 } }}
          >
            <Box sx={{ position: 'absolute', inset: '-22%' }}>
              <ForgeRings />
            </Box>
            <MotionBox
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              sx={{
                position: 'relative',
                filter: 'drop-shadow(0 30px 56px rgba(0,0,0,0.7)) drop-shadow(0 0 46px rgba(99,201,236,0.28))',
              }}
            >
              <BrandArt asset="emblem" priority />
            </MotionBox>
          </MotionBox>

          <MotionBox custom={0} variants={rise} initial="hidden" animate="visible">
            <Eyebrow accent="cyan" align="center">
              Third Tab · Ecosystem
            </Eyebrow>
          </MotionBox>

          <MotionBox custom={1} variants={rise} initial="hidden" animate="visible">
            <Typography
              id="ecosystem-title"
              variant="h1"
              component="h1"
              sx={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.04em',
              }}
            >
              <GradientText fill="ice" component="span">
                {ecosystem.title}
              </GradientText>
            </Typography>
          </MotionBox>

          <MotionBox custom={2} variants={rise} initial="hidden" animate="visible">
            <Typography
              variant="h3"
              component="p"
              sx={{
                fontWeight: 500,
                fontSize: 'clamp(1.25rem, 3vw, 2.35rem)',
                maxWidth: 900,
                mx: 'auto',
                textWrap: 'balance',
              }}
            >
              {/* Inline so the bolt stays welded to the first word rather than
                  drifting to the edge of a centred two-line statement. */}
              <BoltOutlined
                sx={{
                  fontSize: '0.86em',
                  verticalAlign: '-0.14em',
                  mr: 1,
                  color: 'primary.light',
                }}
              />
              {ecosystem.headline}
            </Typography>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
