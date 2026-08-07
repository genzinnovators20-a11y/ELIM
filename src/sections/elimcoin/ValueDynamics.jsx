import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import GradientText from '../../components/ui/GradientText';
import { valueDynamics } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

const accents = ['emerald', 'gold', 'blue', 'goldLight'];

/**
 * Value Dynamics & Milestones. Each item leads with its published figure set at
 * display scale — burn ratio, listing target, growth target — so the numbers
 * carry the section and the prose supports them.
 */
export default function ValueDynamics() {
  return (
    <Section id="dynamics" tone="contrast">
      <SectionHeading eyebrow="Scarcity & Targets" title={valueDynamics.title} maxWidth={880} />

      <RevealGroup stagger={0.1} sx={{ mt: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {valueDynamics.items.map((item, i) => {
            const accent = accents[i] ?? 'gold';
            return (
              <Grid size={{ xs: 12, sm: 6, lg: item.metric ? 3 : 3 }} key={item.label}>
                <RevealItem sx={{ height: '100%' }}>
                  <GlassCard
                    accent={accent}
                    radius={22}
                    padding={{ xs: 3, md: 3.5 }}
                    sx={{ height: '100%', gap: 2.5, justifyContent: 'space-between' }}
                  >
                    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                      <IconTile name={item.icon} accent={accent} size="md" />
                      {item.metric && (
                        <Typography
                          sx={{
                            fontFamily: fontFamilies.display,
                            fontSize: { xs: '1.5rem', md: '1.75rem' },
                            fontWeight: 700,
                            letterSpacing: '-0.035em',
                            lineHeight: 1,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          <GradientText fill={accent === 'blue' ? 'blue' : accent === 'emerald' ? 'emerald' : 'gold'} component="span">
                            {item.metric}
                          </GradientText>
                        </Typography>
                      )}
                    </Stack>

                    <Box>
                      <Typography
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '1rem', md: '1.0625rem' },
                          letterSpacing: '-0.012em',
                          color: 'text.primary',
                          mb: 1.25,
                          textWrap: 'balance',
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="body2" component="p" sx={{ lineHeight: 1.76 }}>
                        {item.separator && (
                          <Box component="span" sx={{ color: (t) => t.ef.text.disabled, mr: 0.5 }}>
                            {item.separator}
                          </Box>
                        )}
                        {item.body.trimStart()}
                      </Typography>
                    </Box>

                    <Box
                      aria-hidden
                      sx={{
                        height: 2,
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${alphaOf(accent, 0.85)}, transparent)`,
                      }}
                    />
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
