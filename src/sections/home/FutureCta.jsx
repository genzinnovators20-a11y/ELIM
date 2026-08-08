import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Eyebrow from '../../components/ui/Eyebrow';
import GradientText from '../../components/ui/GradientText';
import CTAButton from '../../components/ui/CTAButton';
import RadialGauge from '../../components/charts/RadialGauge';
import AnimatedNumber from '../../components/ui/AnimatedNumber';
import BrandArt from '../../components/brand/BrandArt';
import ForgeRings from '../../components/visuals/ForgeRings';
import GridField from '../../components/background/GridField';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { futureCta } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

const MotionBox = motion.create(Box);

/**
 * Closing call.
 *
 * The two figures the statement leans on — a 40% deflationary burn and the 500M
 * staking pool — are read straight out of the copy and given the gauge
 * treatment, so the claim and its visualisation cannot drift apart.
 */
export default function FutureCta() {
  const reduced = useReducedMotion();

  return (
    <Section id="future" tone="contrast" density="spacious" sx={{ overflow: 'hidden' }}>
      <GridField
        size={54}
        major={5}
        opacity={0.3}
        mask="radial-gradient(72% 100% at 50% 50%, #000 0%, transparent 76%)"
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(46% 60% at 50% 46%, rgba(212,175,55,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Grid container spacing={{ xs: 6, lg: 8 }} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid size={{ xs: 12, lg: 6.6 }}>
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Reveal variant="fadeUpSm">
              <Eyebrow>{futureCta.title}</Eyebrow>
            </Reveal>

            <Reveal variant="blur" delay={0.06}>
              <Typography
                variant="quoteLg"
                component="h2"
              >
                <GradientText fill="gold" component="span">
                  {futureCta.subtitle}
                </GradientText>
              </Typography>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12}>
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: '1.0625rem', md: '1.1875rem' },
                  lineHeight: 1.82,
                  color: 'text.secondary',
                  maxWidth: 720,
                }}
              >
                {futureCta.body}
              </Typography>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.18}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ pt: 1 }}>
                <CTAButton onClick={() => scrollToTarget('#tokenomics')}>{futureCta.ctaPrimary}</CTAButton>
                <CTAButton
                  variant="outlined"
                  magnetic={false}
                  showArrow={false}
                  onClick={() => scrollToTarget('#community')}
                >
                  {futureCta.ctaSecondary}
                </CTAButton>
              </Stack>
            </Reveal>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 5.4 }}>
          <Reveal variant="scale" delay={0.1}>
            <Stack
              direction={{ xs: 'column', sm: 'row', lg: 'column' }}
              spacing={{ xs: 4, md: 3 }}
              alignItems="center"
              justifyContent="center"
            >
              {/* 40% deflationary burn */}
              <Box sx={{ width: '100%', maxWidth: 260 }}>
                <RadialGauge
                  value={40}
                  size={240}
                  thickness={12}
                  color="emerald"
                  ariaLabel="A 40% deflationary burn of the total supply"
                >
                  <Stack spacing={0.5} alignItems="center">
                    <AnimatedNumber
                      value={40}
                      suffix="%"
                      sx={{ fontSize: '2.25rem', fontWeight: 700, color: 'secondary.light', lineHeight: 1 }}
                    />
                    <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
                      Deflationary Burn
                    </Typography>
                  </Stack>
                </RadialGauge>
              </Box>

              {/* 500M staking pool */}
              <Box sx={{ position: 'relative', width: '100%', maxWidth: 260 }}>
                <RadialGauge
                  value={50}
                  size={240}
                  thickness={12}
                  color="gold"
                  ariaLabel="A 500M ELM staking pool, half of the 1 billion ELM total supply"
                >
                  <Stack spacing={0.5} alignItems="center">
                    <MotionBox
                      animate={reduced ? undefined : { y: [0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      sx={{ width: 52, mb: 0.5 }}
                    >
                      <BrandArt asset="coin" />
                    </MotionBox>
                    <Typography
                      sx={{
                        fontFamily: fontFamilies.display,
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        color: 'primary.light',
                        lineHeight: 1,
                      }}
                    >
                      500M
                    </Typography>
                    <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
                      Staking Pool
                    </Typography>
                  </Stack>
                </RadialGauge>
                <Box sx={{ position: 'absolute', inset: '-10%', zIndex: -1 }}>
                  <ForgeRings laserColor="rgba(212,175,55,0.85)" />
                </Box>
              </Box>
            </Stack>
          </Reveal>
        </Grid>
      </Grid>
    </Section>
  );
}
