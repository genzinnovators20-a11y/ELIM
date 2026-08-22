import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import ForgeStage from '../../components/visuals/ForgeStage';
import GradientText from '../../components/ui/GradientText';
import CTAButton from '../../components/ui/CTAButton';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { hero, elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import '../../animations/ambient.css';

/**
 * Entrance choreography, in seconds.
 *
 * Grouped rather than evenly stepped: the masthead should resolve as three
 * ideas — identity, message, action — not as nine items queueing up. An even
 * `i * 0.1` stagger across nine elements left the specification strip still
 * arriving at ~2.0s and the coin at ~2.2s, which spends the entire first
 * impression on watching the page assemble itself.
 *
 * The whole timeline was then compressed by about 40%. The grouping is what
 * carries the read, and it survives the compression intact — but the previous
 * schedule settled at ~1.5s, and the largest block of copy in the first viewport
 * did not begin to appear until 600ms in. On a phone that made the site's own
 * entrance the thing setting Largest Contentful Paint: the page was ready and
 * was choosing to withhold itself. Everything now lands by ~0.9s. Watch the two
 * side by side and the difference reads as confidence rather than as speed.
 *
 * These used to be framer-motion variants driven from JavaScript. They are the
 * same shape on the same curve, declared as CSS animation delays — see
 * `animations/ambient.css`. The masthead is the first thing React commits, so
 * this is the one piece of motion that competes directly with first paint;
 * handing it to the compositor means the entrance no longer has to wait its turn
 * behind an animation runtime mounting itself.
 */
const CUE = {
  headline: 0.03,
  headlineStep: 0.045,
  badge: 0.18,
  tagline: 0.22,
  rule: 0.26,
  statement: 0.31,
  lede: 0.36,
  actions: 0.42,
  specs: 0.47,
  stage: 0.1,
  cue: 0.9,
};

/** `--enter-delay`, in the form the stylesheet expects. */
const cue = (seconds) => ({ '--enter-delay': `${Math.round(seconds * 1000)}ms` });

/** Fact strip — drawn straight from the published token specifications. */
const specStrip = [elimcoin.specs[2], elimcoin.specs[3], elimcoin.specs[4]];

/**
 * Masthead. The left column carries the document's hero copy in its published
 * order; the right column is the ELIM FORGE image the spec calls for, mounted
 * in the laser assembly rig.
 */
export default function Hero() {
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
          /* A diffuse glow, painted rather than filtered. `blur(20px)` over a
             1500x900 box is one of the largest single rasterisations on the
             page and it lands squarely in the first paint; the gradient's own
             falloff is what the eye was reading anyway. */
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(76,141,255,0.16) 0%, rgba(31,185,138,0.075) 46%, transparent 74%)',
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
                    <Box
                      key={word}
                      component="span"
                      className="ef-enter-head"
                      style={cue(CUE.headline + i * CUE.headlineStep)}
                      sx={{ display: 'inline-block' }}
                    >
                      <GradientText fill={i === 0 ? 'ice' : 'gold'} component="span">
                        {word}
                      </GradientText>
                    </Box>
                  ))}
                </Typography>
              </Box>

              {/* BNB SMART CHAIN ECOSYSTEM */}
              <Box className="ef-enter-rise" style={cue(CUE.badge)}>
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
              </Box>

              {/* Tagline */}
              <Typography
                className="ef-enter-rise"
                style={cue(CUE.tagline)}
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
              </Typography>

              <Box className="ef-enter-rise" style={cue(CUE.rule)}>
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
              </Box>
              </Stack>

              {/* ── Message ────────────────────────────────────────── */}
              <Stack spacing={{ xs: 2.5, md: 3 }}>
              {/* Institutional Power. Decentralised Freedom. */}
              <Typography
                className="ef-enter-rise"
                style={cue(CUE.statement)}
                variant="quote"
                component="p"
              >
                {hero.statement}
              </Typography>

              {/* Positioning paragraph */}
              <Typography
                className="ef-enter-rise"
                style={cue(CUE.lede)}
                variant="subtitle1"
                component="p"
                sx={{ maxWidth: 640 }}
              >
                {hero.lede}
              </Typography>
              </Stack>

              {/* ── Action ─────────────────────────────────────────── */}
              <Stack spacing={{ xs: 3, md: 3.5 }}>
              {/* Actions */}
              <Box className="ef-enter-rise" style={cue(CUE.actions)}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ pt: 1 }}>
                  <CTAButton onClick={() => scrollToTarget('#elimcoin')}>{elimcoin.ctaPrimary}</CTAButton>
                  <CTAButton variant="outlined" magnetic={false} showArrow={false} href="#">
                    {elimcoin.ctaSecondary}
                  </CTAButton>
                </Stack>
              </Box>

              {/* Specification strip */}
              <Box className="ef-enter-rise" style={cue(CUE.specs)}>
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
              </Box>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 5.4 }}>
            <Box
              className="ef-enter-stage"
              style={cue(CUE.stage)}
              sx={{ px: { xs: 2, sm: 6, md: 10, lg: 0 } }}
            >
              <ForgeStage />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/*
        Scroll cue.

        Rendered unconditionally now. It used to be gated on a JavaScript read of
        the motion preference, which meant readers who had asked for reduced
        motion lost the affordance entirely rather than losing its animation —
        the stylesheet stills the nudge and shortens the fade, and the cue itself
        stays where it is and stays clickable.
      */}
      <Box
        className="ef-enter-fade"
        style={cue(CUE.cue)}
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
            <Box className="ef-nudge" sx={{ display: 'grid', placeItems: 'center' }}>
              <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
            </Box>
          </Box>
      </Box>
    </Box>
  );
}
