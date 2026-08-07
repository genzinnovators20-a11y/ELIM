import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import CoinStage from '../../components/three/CoinStage';
import GradientText from '../../components/ui/GradientText';
import Eyebrow from '../../components/ui/Eyebrow';
import CTAButton from '../../components/ui/CTAButton';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { easings } from '../../theme/tokens';

const MotionBox = motion.create(Box);

const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(9px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: easings.luxe, delay: 0.1 + i * 0.1 },
  }),
};

/** Split the lede so the token designation carries the metallic emphasis. */
const [ledeBefore, ledeAfter = ''] = elimcoin.lede.split(elimcoin.ledeEmphasis);

/**
 * ELIMCOIN masthead. The WebGL coin mounts here once the browser is idle; until
 * then (and on touch, low-power or reduced-motion clients) the vector coin holds
 * the same frame.
 */
export default function CoinHero() {
  return (
    <Box
      component="section"
      aria-labelledby="elimcoin-title"
      sx={{
        position: 'relative',
        pt: { xs: 6, md: 9 },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-24%',
          right: '-6%',
          width: 'min(900px, 90vw)',
          height: 'min(900px, 90vw)',
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(212,175,55,0.16) 0%, transparent 68%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ maxWidth: (t) => t.ef.layout.maxWidthWide, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 5, lg: 6 }} alignItems="center">
          <Grid size={{ xs: 12, lg: 6.4 }}>
            <Stack spacing={{ xs: 3, md: 3.5 }}>
              <MotionBox custom={0} variants={rise} initial="hidden" animate="visible">
                <Eyebrow>{elimcoin.header}</Eyebrow>
              </MotionBox>

              <MotionBox custom={1} variants={rise} initial="hidden" animate="visible">
                <Typography
                  id="elimcoin-title"
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    lineHeight: 0.96,
                    fontWeight: 700,
                    letterSpacing: '-0.045em',
                  }}
                >
                  <GradientText fill="gold" component="span">
                    {elimcoin.title}
                  </GradientText>
                </Typography>
              </MotionBox>

              <MotionBox custom={2} variants={rise} initial="hidden" animate="visible">
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{ fontSize: { xs: '1.0625rem', md: '1.3125rem' }, lineHeight: 1.66, maxWidth: 620 }}
                >
                  {ledeBefore}
                  <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {elimcoin.ledeEmphasis}
                  </Box>
                  {ledeAfter}
                </Typography>
              </MotionBox>

              <MotionBox custom={3} variants={rise} initial="hidden" animate="visible">
                <Typography
                  component="p"
                  sx={{
                    fontFamily: fontFamilies.serif,
                    fontSize: 'clamp(1.5rem, 3.4vw, 2.75rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                    color: 'text.primary',
                  }}
                >
                  {elimcoin.tagline}
                </Typography>
              </MotionBox>

              <MotionBox custom={4} variants={rise} initial="hidden" animate="visible" sx={{ pt: 1 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75}>
                  <CTAButton onClick={() => scrollToTarget('#allocation')}>View Allocation Matrix</CTAButton>
                  <CTAButton
                    onClick={() => scrollToTarget('#specifications')}
                    variant="outlined"
                    magnetic={false}
                    showArrow={false}
                  >
                    Token Specifications
                  </CTAButton>
                </Stack>
              </MotionBox>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 5.6 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: easings.luxe, delay: 0.25 }}
              sx={{ px: { xs: 4, sm: 10, md: 14, lg: 0 } }}
            >
              <CoinStage height={520} />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
