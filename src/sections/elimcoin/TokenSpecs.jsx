import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import { elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * Token Specifications — a spec sheet, not a feature list. Mono labels,
 * tabular values, hairline rules: the register of a datasheet.
 */
export default function TokenSpecs() {
  return (
    <Section id="specifications" tone="sunken">
      <SectionHeading eyebrow="Datasheet" title={elimcoin.specsTitle} maxWidth={780} />

      <RevealGroup stagger={0.08} sx={{ mt: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {elimcoin.specs.map((spec, i) => (
            <Grid size={{ xs: 12, sm: 6, lg: i < 3 ? 4 : 6 }} key={spec.label}>
              <RevealItem sx={{ height: '100%' }}>
                <GlassCard
                  accent="gold"
                  radius={18}
                  padding={{ xs: 2.75, md: 3.25 }}
                  sx={{ height: '100%', gap: 1.75, justifyContent: 'space-between' }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: fontFamilies.mono,
                        fontSize: '0.625rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: (t) => t.ef.text.tertiary,
                      }}
                    >
                      {spec.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fontFamilies.mono,
                        fontSize: '0.5625rem',
                        letterSpacing: '0.18em',
                        color: (t) => t.ef.text.disabled,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                  </Stack>

                  <Typography
                    component="p"
                    sx={{
                      m: 0,
                      fontFamily: fontFamilies.display,
                      fontWeight: 600,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      letterSpacing: '-0.025em',
                      color: 'text.primary',
                      fontVariantNumeric: 'tabular-nums',
                      textWrap: 'balance',
                    }}
                  >
                    {spec.value}
                  </Typography>

                  <Box
                    aria-hidden
                    sx={{
                      height: 1,
                      background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)',
                    }}
                  />
                </GlassCard>
              </RevealItem>
            </Grid>
          ))}
        </Grid>
      </RevealGroup>
    </Section>
  );
}
