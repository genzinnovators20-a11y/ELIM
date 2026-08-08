import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { motion, useReducedMotion } from 'framer-motion';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import ForgeStage from '../../components/visuals/ForgeStage';
import GradientText from '../../components/ui/GradientText';
import CTAButton from '../../components/ui/CTAButton';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { hero, elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { easings } from '../../theme/tokens';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const rise = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.05, ease: easings.luxe, delay: 0.12 + i * 0.1 },
  }),
};

/** Fact strip — drawn straight from the published token specifications. */
const specStrip = [elimcoin.specs[2], elimcoin.specs[3], elimcoin.specs[4]];

/**
 * Masthead. The left column carries the document's hero copy in its published
 * order; the right column is the ELIM FORGE image the spec calls for, mounted
 * in the laser assembly rig.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const words = hero.title.split(' ');

  return (
    <Box
      component="section"
      id="home"
      aria-labelledby="hero-title"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', lg: 'calc(100dvh - var(--ef-nav-h))' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 6, md: 8, lg: 4 },
        pb: { xs: 10, md: 12, lg: 8 },
        overflow: 'hidden',
        scrollMarginTop: 'calc(var(--ef-nav-h) + 20px)',
      }}
    >
      {/* Horizon light behind the masthead */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1500px, 130vw)',
          height: 'min(900px, 92vh)',
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(76,141,255,0.16) 0%, rgba(31,185,138,0.08) 44%, transparent 72%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ maxWidth: (t) => t.ef.layout.maxWidthWide, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, lg: 4 }} alignItems="center">
          <Grid size={{ xs: 12, lg: 6.6 }}>
            <Stack spacing={{ xs: 3, md: 3.5 }}>
              {/* ELIM FORGE */}
              <Box>
                <Typography
                  id="hero-title"
                  variant="display1"
                  component="h1"
                  /* The words are separate flex children so each can animate
                     independently; the label restores the space for assistive tech. */
                  aria-label={hero.title}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '0.28em',
                  }}
                >
                  {words.map((word, i) => (
                    <MotionBox
                      key={word}
                      component="span"
                      custom={i}
                      variants={rise}
                      initial="hidden"
                      animate="visible"
                      sx={{ display: 'inline-block' }}
                    >
                      <GradientText fill={i === 0 ? 'ice' : 'gold'} component="span">
                        {word}
                      </GradientText>
                    </MotionBox>
                  ))}
                </Typography>
              </Box>

              {/* BNB SMART CHAIN ECOSYSTEM */}
              <MotionBox custom={2} variants={rise} initial="hidden" animate="visible">
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    display: 'inline-flex',
                    px: 2,
                    py: 0.9,
                    borderRadius: 999,
                    border: (t) => `1px solid ${t.ef.borders.goldSoft}`,
                    background: 'rgba(212,175,55,0.055)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'primary.main',
                      boxShadow: '0 0 10px rgba(212,175,55,0.9)',
                    }}
                  />
                  <Typography
                    component="p"
                    sx={{
                      fontFamily: fontFamilies.mono,
                      fontSize: { xs: '0.625rem', md: '0.6875rem' },
                      letterSpacing: '0.2em',
                      color: 'primary.light',
                    }}
                  >
                    {hero.chain}
                  </Typography>
                </Stack>
              </MotionBox>

              {/* Tagline */}
              <MotionTypography
                custom={3}
                variants={rise}
                initial="hidden"
                animate="visible"
                component="p"
                sx={{
                  fontFamily: fontFamilies.mono,
                  fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.8125rem' },
                  fontWeight: 500,
                  letterSpacing: { xs: '0.14em', md: '0.2em' },
                  lineHeight: 1.9,
                  color: (t) => t.ef.text.secondary,
                  maxWidth: 640,
                }}
              >
                {hero.tagline}
              </MotionTypography>

              <MotionBox custom={4} variants={rise} initial="hidden" animate="visible">
                <Box
                  aria-hidden
                  sx={{
                    width: 96,
                    height: '2px',
                    borderRadius: 999,
                    background: (t) => t.ef.gradients.goldFill,
                    boxShadow: '0 0 16px rgba(212,175,55,0.5)',
                  }}
                />
              </MotionBox>

              {/* Institutional Power. Decentralised Freedom. */}
              <MotionTypography
                custom={5}
                variants={rise}
                initial="hidden"
                animate="visible"
                variant="quote"
                component="p"
              >
                {hero.statement}
              </MotionTypography>

              {/* Positioning paragraph */}
              <MotionTypography
                custom={6}
                variants={rise}
                initial="hidden"
                animate="visible"
                component="p"
                sx={{
                  fontSize: { xs: '1.0625rem', md: '1.25rem' },
                  fontWeight: 500,
                  lineHeight: 1.7,
                  color: 'text.secondary',
                  maxWidth: 640,
                }}
              >
                {hero.lede}
              </MotionTypography>

              {/* Actions */}
              <MotionBox custom={7} variants={rise} initial="hidden" animate="visible">
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ pt: 1 }}>
                  <CTAButton onClick={() => scrollToTarget('#elimcoin')}>{elimcoin.ctaPrimary}</CTAButton>
                  <CTAButton variant="outlined" magnetic={false} showArrow={false} href="#">
                    {elimcoin.ctaSecondary}
                  </CTAButton>
                </Stack>
              </MotionBox>

              {/* Specification strip */}
              <MotionBox custom={8} variants={rise} initial="hidden" animate="visible" sx={{ pt: { xs: 1, md: 2 } }}>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem sx={{ opacity: 0.5 }} />}
                  spacing={{ xs: 2.5, sm: 4 }}
                  flexWrap="wrap"
                  useFlexGap
                >
                  {specStrip.map((spec) => (
                    <Box key={spec.label}>
                      <Typography variant="overline" sx={{ display: 'block', mb: 0.75 }}>
                        {spec.label.replace(':', '')}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: fontFamilies.display,
                          fontWeight: 600,
                          fontSize: { xs: '0.9rem', md: '1rem' },
                          color: 'text.primary',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {spec.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </MotionBox>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 5.4 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: easings.luxe, delay: 0.28 }}
              sx={{ px: { xs: 2, sm: 6, md: 10, lg: 0 } }}
            >
              <ForgeStage />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll cue */}
      {!reduced && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          sx={{
            position: 'absolute',
            bottom: 26,
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', lg: 'block' },
            zIndex: 2,
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => scrollToTarget('#overview')}
            aria-label="Scroll to overview"
            sx={{
              appearance: 'none',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              color: (t) => t.ef.text.disabled,
              transition: 'color 300ms ease',
              '&:hover': { color: 'text.secondary' },
            }}
          >
            <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
              Scroll
            </Typography>
            <MotionBox
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              sx={{ display: 'grid', placeItems: 'center' }}
            >
              <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
            </MotionBox>
          </Box>
        </MotionBox>
      )}
    </Box>
  );
}
