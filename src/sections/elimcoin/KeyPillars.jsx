import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import Icon from '../../components/ui/Icon';
import { keyPillars } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

/**
 * Key Ecosystem Pillars — three tall columns carrying an oversized ghost glyph
 * that resolves on hover, matching the treatment used for the industries so the
 * two "pillar" grids read as one family.
 */
export default function KeyPillars() {
  return (
    <Section id="pillars" tone="sunken">
      <SectionHeading eyebrow="What ELM Stands On" title={keyPillars.title} maxWidth={820} />

      <RevealGroup stagger={0.11} sx={{ mt: layout.stack.head }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {keyPillars.items.map((item, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.label}>
              <RevealItem sx={{ height: '100%' }}>
                <GlassCard
                  accent={item.accent}
                  radius={22}
                  padding={0}
                  sx={{
                    height: '100%',
                    minHeight: { xs: 220, md: 300 },
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    '&:hover .pillar-ghost': { opacity: 0.14, transform: 'translate(6px, -8px) scale(1.06)' },
                    '&:hover .pillar-icon': { transform: 'translateY(-4px)' },
                    '&:hover .pillar-index': { color: alphaOf(item.accent, 0.9) },
                  }}
                >
                  <Box
                    className="pillar-ghost"
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      right: -22,
                      bottom: -26,
                      opacity: 0.055,
                      color: alphaOf(item.accent, 1),
                      transition: (t) => `all 780ms ${t.ef.easings.css.luxe}`,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  >
                    <Icon name={item.icon} sx={{ fontSize: 190 }} />
                  </Box>

                  <Box
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 130,
                      background: `linear-gradient(180deg, transparent, ${alphaOf(item.accent, 0.09)})`,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ p: { xs: 3, md: 3.5 }, pb: 0, position: 'relative', zIndex: 1 }}
                  >
                    <Box
                      className="pillar-icon"
                      sx={{
                        color: alphaOf(item.accent, 0.96),
                        transition: (t) => `transform 620ms ${t.ef.easings.css.luxe}`,
                      }}
                    >
                      <Icon name={item.icon} sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography
                      className="pillar-index"
                      sx={{
                        fontFamily: fontFamilies.mono,
                        fontSize: '0.625rem',
                        letterSpacing: '0.2em',
                        color: (t) => t.ef.text.disabled,
                        transition: 'color 520ms ease',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                  </Stack>

                  <Box sx={{ p: { xs: 3, md: 3.5 }, pt: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
                    <Typography variant="h5" component="h3" sx={{ mb: 1.5, fontSize: { xs: '1.0625rem', md: '1.25rem' } }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ lineHeight: 1.75 }}>
                      <Box component="span" sx={{ color: (t) => t.ef.text.disabled, mr: 0.5 }}>
                        {item.separator}
                      </Box>
                      {item.body}
                    </Typography>
                  </Box>
                </GlassCard>
              </RevealItem>
            </Grid>
          ))}
        </Grid>
      </RevealGroup>
    </Section>
  );
}
