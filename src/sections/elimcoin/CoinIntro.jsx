import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import CoinStage from '../../components/three/CoinStage';
import MarketPulse from '../../components/visuals/MarketPulse';
import GradientText from '../../components/ui/GradientText';
import CTAButton from '../../components/ui/CTAButton';
import Section from '../../components/ui/Section';
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
    transition: { duration: 1, ease: easings.luxe, delay: 0.05 + i * 0.09 },
  }),
};

/** Split the lede so the token designation carries the metallic emphasis. */
const [ledeBefore, ledeAfter = ''] = elimcoin.lede.split(elimcoin.ledeEmphasis);

/**
 * ELIMCOIN chapter.
 *
 * Builds the spec's visual recommendation literally: a dark, metallic-textured
 * UI mock-up carrying a live neon-green and blue trading chart, with the glowing
 * digital coin floating above it inside its laser assembly rig. The coin is
 * WebGL on capable clients and the vector mark everywhere else.
 */
export default function CoinIntro() {
  return (
    /* Chapter opener — see EcosystemIntro for how the handoff is composed. */
    <Section
      id="elimcoin"
      aria-labelledby="elimcoin-title"
      disableContainer
      sx={{ overflow: 'hidden' }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-16%',
          right: '-6%',
          width: 'min(900px, 90vw)',
          height: 'min(900px, 90vw)',
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(212,175,55,0.16) 0%, transparent 68%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ maxWidth: (t) => t.ef.layout.maxWidthWide, position: 'relative', zIndex: 1 }}>
        <MotionBox custom={0} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Typography
            id="elimcoin-title"
            variant="display2"
            component="h2"
            sx={{ mb: { xs: 4, md: 5 } }}
          >
            <GradientText fill="gold" component="span">
              {elimcoin.title}
            </GradientText>
          </Typography>
        </MotionBox>

        <Grid container spacing={{ xs: 6, lg: 6 }} alignItems="center">
          <Grid size={{ xs: 12, lg: 6.2 }}>
            <Stack spacing={{ xs: 3, md: 3.5 }}>
              <MotionBox custom={1} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: fontFamilies.display,
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', md: '1.6rem' },
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: 'text.primary',
                    textWrap: 'balance',
                  }}
                >
                  {elimcoin.kicker}
                </Typography>
              </MotionBox>

              <MotionBox custom={2} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Typography variant="quote" component="p">
                  <GradientText fill="gold" component="span">
                    {elimcoin.tagline}
                  </GradientText>
                </Typography>
              </MotionBox>

              <MotionBox custom={3} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{ fontSize: { xs: '1.0625rem', md: '1.1875rem' }, lineHeight: 1.72, maxWidth: 620 }}
                >
                  {ledeBefore}
                  <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {elimcoin.ledeEmphasis}
                  </Box>
                  {ledeAfter}
                </Typography>
              </MotionBox>

              <MotionBox custom={4} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }} sx={{ pt: 1 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75}>
                  <CTAButton onClick={() => scrollToTarget('#tokenomics')}>{elimcoin.ctaPrimary}</CTAButton>
                  <CTAButton variant="outlined" magnetic={false} showArrow={false} href="#">
                    {elimcoin.ctaSecondary}
                  </CTAButton>
                </Stack>
              </MotionBox>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 5.8 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, ease: easings.luxe, delay: 0.2 }}
              sx={{ position: 'relative', px: { xs: 0, sm: 4, md: 8, lg: 0 } }}
            >
              {/* Dark, metallic-textured UI mock-up */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: { xs: '20px', md: '26px' },
                  overflow: 'hidden',
                  background:
                    'linear-gradient(158deg, rgba(24,31,41,0.94) 0%, rgba(9,12,18,0.96) 52%, rgba(18,24,33,0.94) 100%)',
                  border: (t) => `1px solid ${t.ef.borders.soft}`,
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.09) inset, 0 48px 100px -40px rgba(0,0,0,0.95), 0 0 0 1px rgba(0,0,0,0.4)',
                  pt: { xs: 0, md: 0 },
                }}
              >
                {/* Terminal chrome */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderBottom: (t) => `1px solid ${t.ef.borders.hairline}`,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)',
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                      aria-hidden
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
                        fontSize: '0.6875rem',
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
                    }}
                  >
                    ILLUSTRATIVE
                  </Typography>
                </Stack>

                <MarketPulse height={230} />

                {/* Floor glow beneath the coin */}
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(52% 46% at 50% 34%, rgba(212,175,55,0.14) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
              </Box>

              {/* Forged coin, floating over the lower third of the panel */}
              <Box
                sx={{
                  position: 'relative',
                  mt: { xs: -9, sm: -11, md: -12 },
                  mx: 'auto',
                  width: { xs: '74%', sm: '62%', md: '58%' },
                  filter: 'drop-shadow(0 34px 60px rgba(0,0,0,0.72))',
                }}
              >
                <CoinStage height={330} />
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
