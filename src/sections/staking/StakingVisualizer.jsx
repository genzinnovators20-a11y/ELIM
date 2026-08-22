import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import Eyebrow from '../../components/ui/Eyebrow';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import GradientText from '../../components/ui/GradientText';
import AnimatedNumber from '../../components/ui/AnimatedNumber';
import RadialGauge from '../../components/charts/RadialGauge';
import BrandArt from '../../components/brand/BrandArt';
import { staking } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * Smart Staking Rewards Visualizer.
 *
 * The 500,000,000 ELM pool is 50% of the 1,000,000,000 total supply, so the
 * gauge is a literal reading of the published figures — no invented metrics.
 */
export default function StakingVisualizer() {
  return (
    <Section id="staking" tone="gold">
      <Grid container spacing={{ xs: 6, md: 6, lg: 8 }} alignItems="center">
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Reveal variant="fadeUpSm">
              <Eyebrow>{staking.title}</Eyebrow>
            </Reveal>

            <Reveal variant="blur" delay={0.05}>
              <Typography variant="h2" component="h2" sx={{ textWrap: 'balance' }}>
                <GradientText fill="gold" component="span">
                  {staking.subtitle}
                </GradientText>
              </Typography>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.1}>
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: '1.0625rem', md: '1.25rem' },
                  lineHeight: 1.7,
                  fontWeight: 500,
                  color: 'text.primary',
                  maxWidth: 560,
                }}
              >
                {staking.lede}
              </Typography>
            </Reveal>

            {/* Pool gauge */}
            <Reveal variant="scale" delay={0.16}>
              <Box sx={{ pt: { xs: 2, md: 3 }, maxWidth: 380 }}>
                <RadialGauge
                  value={50}
                  size={340}
                  thickness={14}
                  color="gold"
                  ariaLabel="Staking pool: 500,000,000 ELM of the 1 billion ELM total supply"
                >
                  <Stack spacing={0.75} alignItems="center">
                    <Box sx={{ width: 62, opacity: 0.95, mb: 0.5 }}>
                      <BrandArt asset="coinSm" />
                    </Box>
                    <AnimatedNumber
                      value={500000000}
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        fontWeight: 700,
                        color: 'primary.light',
                        lineHeight: 1,
                      }}
                    />
                    <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
                      ELM Staking Pool
                    </Typography>
                  </Stack>
                </RadialGauge>
              </Box>
            </Reveal>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <RevealGroup stagger={0.12}>
            <Stack spacing={{ xs: 2.5, md: 3 }}>
              {staking.items.map((item, i) => (
                <RevealItem key={item.label}>
                  <GlassCard
                    accent={i === 2 ? 'emerald' : 'gold'}
                    radius={22}
                    padding={{ xs: 3, md: 4 }}
                    sx={{ gap: 2.5 }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 2.5, sm: 3.5 }}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                    >
                      <IconTile name={item.icon} accent={i === 2 ? 'emerald' : 'gold'} size="lg" />

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          component="h3"
                          sx={{
                            fontFamily: fontFamilies.mono,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: (t) => t.ef.text.tertiary,
                            mb: 1.25,
                          }}
                        >
                          {item.label}
                        </Typography>

                        {item.metric ? (
                          <Stack direction="row" alignItems="baseline" spacing={1.25} sx={{ mb: 1.25 }}>
                            <AnimatedNumber
                              value={Number(item.metric.replace(/,/g, ''))}
                              delay={i * 120}
                              sx={{
                                fontSize: { xs: '1.75rem', md: '2.5rem' },
                                fontWeight: 700,
                                color: 'text.primary',
                                lineHeight: 1,
                              }}
                            />
                            <Typography
                              component="span"
                              sx={{
                                fontFamily: fontFamilies.mono,
                                fontSize: '0.875rem',
                                color: i === 2 ? 'secondary.light' : 'primary.light',
                              }}
                            >
                              {item.unit}
                            </Typography>
                          </Stack>
                        ) : null}

                        <Typography variant="body2" component="p" sx={{ lineHeight: 1.78 }}>
                          {item.body}
                        </Typography>
                      </Box>
                    </Stack>
                  </GlassCard>
                </RevealItem>
              ))}
            </Stack>
          </RevealGroup>
        </Grid>
      </Grid>
    </Section>
  );
}
