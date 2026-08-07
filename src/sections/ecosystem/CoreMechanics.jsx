import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import { ecosystem } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

const accents = ['gold', 'emerald', 'blue'];

/** Core Functional Mechanics — the three published mechanisms, numbered as in the source. */
export default function CoreMechanics() {
  return (
    <Section id="mechanics" tone="sunken">
      <SectionHeading eyebrow="How It Works" accent="emerald" title={ecosystem.mechanicsTitle} maxWidth={820} />

      <RevealGroup stagger={0.11} sx={{ mt: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {ecosystem.mechanics.map((item, i) => {
            const accent = accents[i] ?? 'gold';
            return (
              <Grid size={{ xs: 12, md: 4 }} key={item.label}>
                <RevealItem sx={{ height: '100%' }}>
                  <GlassCard
                    accent={accent}
                    radius={22}
                    padding={{ xs: 3, md: 4 }}
                    sx={{ height: '100%', gap: 3, overflow: 'hidden' }}
                  >
                    <Box
                      aria-hidden
                      sx={{
                        position: 'absolute',
                        top: -18,
                        right: 10,
                        fontFamily: fontFamilies.serif,
                        fontSize: '7rem',
                        lineHeight: 1,
                        color: alphaOf(accent, 0.09),
                        pointerEvents: 'none',
                      }}
                    >
                      {item.index.replace(')', '')}
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                      <IconTile name={item.icon} accent={accent} size="md" />
                      <Typography
                        sx={{
                          fontFamily: fontFamilies.mono,
                          fontSize: '0.6875rem',
                          letterSpacing: '0.2em',
                          color: alphaOf(accent, 0.92),
                        }}
                      >
                        {item.index}
                      </Typography>
                    </Stack>

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" component="p" sx={{ lineHeight: 1.78 }}>
                        {item.body}
                      </Typography>
                    </Box>
                  </GlassCard>
                </RevealItem>
              </Grid>
            );
          })}
        </Grid>
      </RevealGroup>
    </Section>
  );
}
