import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Eyebrow from '../../components/ui/Eyebrow';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import { ecosystem } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

const accents = ['gold', 'blue', 'cyan', 'emerald', 'iris'];

/**
 * The ecosystem value matrix. The source line is one sentence delimited by " / ";
 * it is laid out as the five pairs it already contains — no wording changed, no
 * pair merged or dropped. Emphasised values match the source emphasis.
 */
export default function ValueMatrix() {
  return (
    /* First section of the Ecosystem chapter — flush to its opener. */
    <Section id="matrix" tone="sunken" flush="top">
      <Reveal variant="fadeUpSm">
        <Eyebrow accent="cyan">Operating Model</Eyebrow>
      </Reveal>

      <RevealGroup stagger={0.08} sx={{ mt: layout.stack.head }}>
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {ecosystem.matrix.map((entry, i) => {
            const accent = accents[i % accents.length];
            return (
              <Grid size={{ xs: 12, sm: 6, lg: i < 2 ? 6 : 4 }} key={entry.label}>
                <RevealItem sx={{ height: '100%' }}>
                  <GlassCard
                    accent={accent}
                    radius={20}
                    padding={{ xs: 2.75, md: 3.25 }}
                    sx={{ height: '100%', gap: 2.25 }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <IconTile name={entry.icon} accent={accent} size="sm" />
                      <Typography
                        sx={{
                          fontFamily: fontFamilies.mono,
                          fontSize: '0.5625rem',
                          letterSpacing: '0.2em',
                          color: (t) => t.ef.text.disabled,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </Typography>
                    </Stack>

                    {/* A label/value pair, not a section title — a description
                        list keeps the page's heading outline honest. */}
                    <Box component="dl" sx={{ m: 0 }}>
                      <Typography
                        component="dt"
                        sx={{
                          fontFamily: fontFamilies.mono,
                          fontSize: '0.625rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: alphaOf(accent, 0.92),
                          mb: 1.5,
                        }}
                      >
                        {entry.label}
                      </Typography>

                      <Typography
                        component="dd"
                        sx={{
                          m: 0,
                          fontSize: { xs: '1rem', md: '1.0625rem' },
                          lineHeight: 1.62,
                          fontWeight: entry.emphasis ? 600 : 400,
                          color: entry.emphasis ? 'text.primary' : 'text.secondary',
                          letterSpacing: '-0.008em',
                          textWrap: 'balance',
                        }}
                      >
                        {entry.value}
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
