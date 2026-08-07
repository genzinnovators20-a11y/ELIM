import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import { compliance } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

const groupAccent = { security: 'emerald', regulatory: 'blue' };

/**
 * Compliance and safety. Presented as two audited registers rather than a
 * feature grid — numbered rows on a ruled panel, the way a control framework
 * is actually published.
 */
export default function Compliance() {
  return (
    <Section id="compliance" tone="emerald">
      <SectionHeading
        eyebrow="Trust Architecture"
        accent="emerald"
        title={compliance.title}
        maxWidth={860}
      />

      <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: { xs: 5, md: 8 } }}>
        {compliance.groups.map((group, gi) => {
          const accent = groupAccent[group.id] ?? 'emerald';
          return (
            <Grid size={{ xs: 12, md: 6 }} key={group.id}>
              <Reveal variant={gi === 0 ? 'left' : 'right'} delay={gi * 0.08}>
                <GlassCard accent={accent} radius={24} padding={{ xs: 3, md: 4 }} sx={{ height: '100%', gap: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: alphaOf(accent, 1),
                        boxShadow: `0 0 14px ${alphaOf(accent, 0.9)}`,
                      }}
                    />
                    <Typography variant="h4" component="h3">
                      {group.title}
                    </Typography>
                  </Stack>

                  <RevealGroup stagger={0.07}>
                    <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {group.items.map((item, i) => (
                        <RevealItem
                          as="li"
                          key={item.label}
                          sx={{
                            listStyle: 'none',
                            py: 2.5,
                            '&:first-of-type': { pt: 0 },
                            '&:last-of-type': { pb: 0 },
                            '& + li': { borderTop: (t) => `1px solid ${t.ef.borders.hairline}` },
                          }}
                        >
                          <Stack direction="row" spacing={2.5} alignItems="flex-start">
                            <IconTile name={item.icon} accent={accent} size="sm" sx={{ mt: 0.25 }} />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Stack direction="row" alignItems="baseline" spacing={1.25} sx={{ mb: 0.75 }}>
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
                                <Typography
                                  component="h4"
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1rem', md: '1.0625rem' },
                                    letterSpacing: '-0.01em',
                                    color: 'text.primary',
                                  }}
                                >
                                  {item.label}
                                </Typography>
                              </Stack>
                              <Typography variant="body2" component="p">
                                <Box component="span" sx={{ color: (t) => t.ef.text.disabled, mr: 0.5 }}>
                                  {item.separator}
                                </Box>
                                {item.body}
                              </Typography>
                            </Box>
                          </Stack>
                        </RevealItem>
                      ))}
                    </Stack>
                  </RevealGroup>
                </GlassCard>
              </Reveal>
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
}
