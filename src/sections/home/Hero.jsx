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

/**
 * Entrance choreography, in seconds.
 *
 * Grouped rather than evenly stepped: the masthead should resolve as three
 * ideas — identity, message, action — not as nine items queueing up. An even
 * `i * 0.1` stagger across nine elements left the specification strip still
 * arriving at ~2.0s and the coin at ~2.2s, which spends the entire first
 * impression on watching the page assemble itself.
 *
 * Everything is now settled by ~1.5s, leaving the rest of the opening seconds
 * for the reader rather than for the animation.
 */
const CUE = {
  headline: 0.05,
  headlineStep: 0.075,
  badge: 0.3,
  tagline: 0.37,
  rule: 0.44,
  statement: 0.52,
  lede: 0.6,
  actions: 0.7,
  specs: 0.78,
  stage: 0.18,
  coin: 0.72,
  cue: 1.5,
};

/**
 * Supporting elements: displacement only, no blur. Animating `filter` forces a
 * repaint per frame, and on eight small elements it bought nothing the opacity
 * ramp was not already doing.
 */
const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easings.luxe, delay },
  }),
};

/** The headline keeps its lens-resolving blur — one place, where it reads. */
const riseHead = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: easings.luxe, delay },
  }),
};

/**
 * Reduced motion: presence only. The site-wide CSS reset silences *CSS*
 * transitions, but Framer drives these from JavaScript and would otherwise keep
 * translating and blurring for a reader who has asked it not to.
 */
const still = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({ opacity: 1, transition: { duration: 0.3, delay: Math.min(delay, 0.3) } }),
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
  const enter = reduced ? still : rise;
  const enterHead = reduced ? still : riseHead;

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
            {/*
              Three groups, not nine evenly spaced items. Proximity is doing the
              structural work: identity reads as one block, the message as
              another, the call to action as a third. A uniform gap between all
              nine gave the eye no grouping to hold on to.
            */}
            <Stack spacing={{ xs: 4.5, md: 5.5 }}>
              {/* ── Identity ───────────────────────────────────────── */}
              <Stack spacing={{ xs: 2.25, md: 2.75 }}>
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
                      custom={CUE.headline + i * CUE.headlineStep}
                      variants={enterHead}
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
              <MotionBox custom={CUE.badge} variants={enter} initial="hidden" animate="visible">
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
                    background:
                      'linear-gradient(180deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 100%)',
                    backdropFilter: 'blur(10px)',
                    /* Inner top highlight — the glass catches light on its
                       upper edge, which is what gives a pill any thickness. */
                    boxShadow:
                      'inset 0 1px 0 rgba(255,246,216,0.18), 0 8px 22px -14px rgba(212,175,55,0.55)',
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
                custom={CUE.tagline}
                variants={enter}
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

              <MotionBox custom={CUE.rule} variants={enter} initial="hidden" animate="visible">
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
              </Stack>

              {/* ── Message ────────────────────────────────────────── */}
              <Stack spacing={{ xs: 2.5, md: 3 }}>
              {/* Institutional Power. Decentralised Freedom. */}
              <MotionTypography
                custom={CUE.statement}
                variants={enter}
                initial="hidden"
                animate="visible"
                variant="quote"
                component="p"
              >
                {hero.statement}
              </MotionTypography>

              {/* Positioning paragraph */}
              <MotionTypography
                custom={CUE.lede}
                variants={enter}
                initial="hidden"
                animate="visible"
                variant="subtitle1"
                component="p"
                sx={{ maxWidth: 640 }}
              >
                {hero.lede}
              </MotionTypography>
              </Stack>

              {/* ── Action ─────────────────────────────────────────── */}
              <Stack spacing={{ xs: 3, md: 3.5 }}>
              {/* Actions */}
              <MotionBox custom={CUE.actions} variants={enter} initial="hidden" animate="visible">
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ pt: 1 }}>
                  <CTAButton onClick={() => scrollToTarget('#elimcoin')}>{elimcoin.ctaPrimary}</CTAButton>
                  <CTAButton variant="outlined" magnetic={false} showArrow={false} href="#">
                    {elimcoin.ctaSecondary}
                  </CTAButton>
                </Stack>
              </MotionBox>

              {/* Specification strip */}
              <MotionBox custom={CUE.specs} variants={enter} initial="hidden" animate="visible">
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
                          /* Figures on a spec strip should align optically. */
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {spec.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </MotionBox>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 5.4 }}>
            <MotionBox
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: reduced ? 0.4 : 1.25, ease: easings.luxe, delay: reduced ? 0 : CUE.stage }}
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
          transition={{ delay: CUE.cue, duration: 0.9 }}
          sx={{
            position: 'absolute',
            bottom: 18,
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
              justifyContent: 'center',
              gap: 0.75,
              /* 44×44 minimum hit area, without growing the visible mark. */
              minWidth: 44,
              minHeight: 44,
              px: 1.5,
              borderRadius: 2,
              /*
               * Was `text.disabled` at 9px — measured 2.80:1 against the
               * obsidian ground, below the 4.5:1 floor. `text.tertiary` at 11px
               * measures 5.47:1 and still reads as a quiet affordance.
               */
              color: (t) => t.ef.text.tertiary,
              transition: (t) => `color ${t.ef.motion.hover}`,
              '&:hover': { color: 'text.primary' },
            }}
          >
            <Typography variant="overline" sx={{ fontSize: '0.6875rem', color: 'inherit' }}>
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
