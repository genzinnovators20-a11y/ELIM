import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import Icon from '../../components/ui/Icon';
import { industries } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

/**
 * Real-world utility industries — four tall pillars, each with its own accent
 * temperature and an oversized ghost glyph that only resolves on hover.
 */
export default function Industries() {
  return (
    <Section id="industries" tone="sunken">
      <SectionHeading eyebrow="Where ELM Lands" title={industries.title} maxWidth={880} />

      <RevealGroup stagger={0.1} sx={{ mt: layout.stack.head }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {industries.items.map((item, i) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.label}>
              <RevealItem sx={{ height: '100%' }}>
                <GlassCard
                  accent={item.accent}
                  radius={22}
                  padding={0}
                  sx={{
                    height: '100%',
                    minHeight: { xs: 240, lg: 340 },
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    '&:hover .ind-ghost': { opacity: 0.14, transform: 'translate(6px, -8px) scale(1.06)' },
                    '&:hover .ind-index': { color: alphaOf(item.accent, 0.9) },
                    '&:hover .ind-icon': { transform: 'translateY(-4px)' },
                  }}
                >
                  {/* Ghost glyph */}
                  <Box
                    className="ind-ghost"
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

                  {/* Accent floor */}
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
                      className="ind-icon"
                      sx={{
                        color: alphaOf(item.accent, 0.96),
                        transition: (t) => `transform 620ms ${t.ef.easings.css.luxe}`,
                      }}
                    >
                      <Icon name={item.icon} sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography
                      className="ind-index"
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
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 1.5, fontSize: { xs: '1.0625rem', md: '1.1875rem' }, textWrap: 'balance' }}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ lineHeight: 1.72 }}>
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
