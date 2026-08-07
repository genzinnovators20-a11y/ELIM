import { useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import DonutChart from '../../components/charts/DonutChart';
import AnimatedNumber from '../../components/ui/AnimatedNumber';
import { hybridArchitecture } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

/**
 * The Hybrid Asset Architecture.
 *
 * The 50 / 20 / 30 split is the whole argument of this section, so it leads with
 * the geometry: one donut, three linked panels, one shared hover state across
 * both — pointing at a slice lights its panel and vice versa.
 */
export default function HybridArchitecture() {
  const [active, setActive] = useState(null);
  const items = hybridArchitecture.allocations;
  const current = active != null ? items[active] : null;

  return (
    <Section id="hybrid" tone="sunken">
      <SectionHeading
        eyebrow="Capital Routing"
        title={hybridArchitecture.title}
        lede={hybridArchitecture.lede}
        maxWidth={900}
      />

      <Grid container spacing={{ xs: 6, lg: 8 }} alignItems="center" sx={{ mt: { xs: 4, md: 6 } }}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Reveal variant="scale">
            <Box sx={{ position: 'relative' }}>
              <DonutChart
                data={items.map((a) => ({ value: a.value, color: a.color, label: a.label }))}
                size={380}
                thickness={38}
                activeIndex={active}
                onHover={setActive}
                ariaLabel="Hybrid asset architecture: 50% physical gold, 20% regulated forex fund management, 30% real-world business enterprise"
              >
                <Stack spacing={0.5} alignItems="center">
                  {current ? (
                    <>
                      <AnimatedNumber
                        key={current.percentage}
                        value={current.value}
                        suffix="%"
                        duration={600}
                        sx={{
                          fontSize: { xs: '2.25rem', md: '2.75rem' },
                          fontWeight: 700,
                          color: alphaOf(current.color, 1),
                          lineHeight: 1,
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: fontFamilies.mono,
                          fontSize: '0.5625rem',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: (t) => t.ef.text.tertiary,
                          maxWidth: 150,
                          lineHeight: 1.7,
                        }}
                      >
                        {current.label.replace(/^\d+% /, '').replace(/:$/, '')}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          fontFamily: fontFamilies.display,
                          fontSize: { xs: '1.5rem', md: '1.75rem' },
                          fontWeight: 600,
                          letterSpacing: '-0.03em',
                          color: 'text.primary',
                          lineHeight: 1.15,
                        }}
                      >
                        Staking
                        <br />
                        Pools
                      </Typography>
                      <Typography variant="overline" sx={{ fontSize: '0.5625rem', pt: 0.75 }}>
                        Dual-Diversification
                      </Typography>
                    </>
                  )}
                </Stack>
              </DonutChart>
            </Box>
          </Reveal>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <RevealGroup stagger={0.1}>
            <Stack spacing={{ xs: 2.5, md: 3 }}>
              {items.map((item, i) => (
                <RevealItem key={item.label}>
                  <GlassCard
                    accent={item.color}
                    radius={22}
                    padding={{ xs: 3, md: 3.5 }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    sx={{
                      gap: 2,
                      transform: active === i ? 'translateY(-6px)' : 'none',
                      borderColor: 'transparent',
                    }}
                  >
                    <Stack direction="row" spacing={2.5} alignItems="flex-start">
                      <Stack alignItems="center" spacing={1.5} sx={{ flexShrink: 0 }}>
                        <IconTile name={item.icon} accent={item.color} size="md" />
                        <Typography
                          sx={{
                            fontFamily: fontFamilies.display,
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            color: alphaOf(item.color, 1),
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {item.percentage}
                        </Typography>
                      </Stack>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            letterSpacing: '-0.012em',
                            color: 'text.primary',
                            mb: 1.25,
                            textWrap: 'balance',
                          }}
                        >
                          {item.label}
                        </Typography>
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
