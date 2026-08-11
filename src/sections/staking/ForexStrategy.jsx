import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import MarketPulse from '../../components/visuals/MarketPulse';
import { forexStrategy } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { layout } from '../../theme/tokens';

/**
 * Algorithmic Forex Strategy & Alpha Generation.
 * Framed as a terminal: a live trace across the top, the three published system
 * properties beneath it as instrument readouts.
 */
export default function ForexStrategy() {
  return (
    <Section id="forex" tone="contrast">
      <SectionHeading
        eyebrow="Quantitative Systems"
        accent="blue"
        title={forexStrategy.title}
        lede={forexStrategy.lede}
        maxWidth={920}
      />

      <Box
        sx={{
          mt: layout.stack.head,
          borderRadius: { xs: '22px', md: '28px' },
          overflow: 'hidden',
          border: (t) => `1px solid ${t.ef.borders.hairline}`,
          background: 'linear-gradient(160deg, rgba(16,21,28,0.9) 0%, rgba(6,9,13,0.94) 100%)',
          boxShadow: (t) => t.ef.shadows.card,
        }}
      >
        {/* Terminal chrome */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            px: { xs: 2.5, md: 3.5 },
            py: 1.75,
            borderBottom: (t) => `1px solid ${t.ef.borders.hairline}`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.045), transparent)',
          }}
        >
          <Stack direction="row" spacing={{ xs: 2, md: 3 }} alignItems="center" flexWrap="wrap" useFlexGap>
            {['EUR/USD', 'GBP/USD', 'USD/JPY'].map((pair, i) => (
              <Stack key={pair} direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: i === 1 ? '#4C8DFF' : '#1FB98A',
                    boxShadow: `0 0 8px ${i === 1 ? 'rgba(76,141,255,0.9)' : 'rgba(31,185,138,0.9)'}`,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: { xs: '0.5625rem', md: '0.625rem' },
                    letterSpacing: '0.14em',
                    color: (t) => t.ef.text.secondary,
                  }}
                >
                  {pair}
                </Typography>
              </Stack>
            ))}
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
            24/5 · ILLUSTRATIVE
          </Typography>
        </Stack>

        <Box sx={{ px: { xs: 0, md: 1 }, pt: 1 }}>
          <MarketPulse height={200} candleWidth={7} gap={4} />
        </Box>

        <Box sx={{ p: { xs: 2.5, md: 3.5 }, pt: { xs: 3, md: 4 } }}>
          <RevealGroup stagger={0.1}>
            <Grid container spacing={{ xs: 2.5, md: 3 }}>
              {forexStrategy.items.map((item, i) => (
                <Grid size={{ xs: 12, md: 4 }} key={item.label}>
                  <RevealItem sx={{ height: '100%' }}>
                    <GlassCard
                      accent={['blue', 'gold', 'emerald'][i]}
                      radius={18}
                      padding={{ xs: 2.75, md: 3 }}
                      sx={{ height: '100%', gap: 2 }}
                    >
                      <IconTile name={item.icon} accent={['blue', 'gold', 'emerald'][i]} size="sm" />
                      <Typography variant="body2" component="p" sx={{ lineHeight: 1.78 }}>
                        <Box
                          component="strong"
                          sx={{
                            display: 'block',
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: '1rem',
                            letterSpacing: '-0.01em',
                            mb: 1,
                          }}
                        >
                          {item.label}
                        </Box>
                        {item.body.trimStart()}
                      </Typography>
                    </GlassCard>
                  </RevealItem>
                </Grid>
              ))}
            </Grid>
          </RevealGroup>
        </Box>
      </Box>
    </Section>
  );
}
