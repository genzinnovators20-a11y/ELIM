import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import BrandArt from '../../components/brand/BrandArt';
import { visionMission } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

const accents = { vision: 'blue', mission: 'emerald' };
const numerals = { vision: 'I', mission: 'II' };

/**
 * Vision and mission, set as two tall statement panels with an oversized
 * numeral watermark. The emblem sits behind the pair as a faint ghost so the
 * brand mark is present without competing with the copy.
 */
export default function VisionMission() {
  return (
    <Section id="vision" tone="sunken">
      <Box sx={{ position: 'relative' }}>
        {/* Ghosted brand mark */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', md: '52%' },
            opacity: 0.05,
            filter: 'grayscale(0.35) blur(0.4px)',
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <BrandArt asset="emblem" />
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ position: 'relative' }}>
          {visionMission.map((item, i) => {
            const accent = accents[item.id];
            return (
              <Grid size={{ xs: 12, md: 6 }} key={item.id}>
                <Reveal variant={i === 0 ? 'left' : 'right'} delay={i * 0.1}>
                  <GlassCard
                    accent={accent}
                    padding={{ xs: 3.5, md: 5.5 }}
                    radius={26}
                    sx={{ height: '100%', gap: 3, overflow: 'hidden' }}
                  >
                    {/* Numeral watermark */}
                    <Box
                      aria-hidden
                      sx={{
                        position: 'absolute',
                        top: -26,
                        right: 4,
                        fontFamily: fontFamilies.serif,
                        fontSize: 'clamp(7rem, 12vw, 12rem)',
                        lineHeight: 1,
                        color: alphaOf(accent, 0.075),
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                    >
                      {numerals[item.id]}
                    </Box>

                    <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            width: 34,
                            height: 1,
                            background: `linear-gradient(90deg, ${alphaOf(accent, 0.95)}, transparent)`,
                          }}
                        />
                        <Typography
                          component="h3"
                          sx={{
                            fontFamily: fontFamilies.mono,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.24em',
                            textTransform: 'uppercase',
                            color: alphaOf(accent, 0.95),
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>

                      <Typography
                        component="p"
                        sx={{
                          fontSize: { xs: '1.0625rem', md: '1.1875rem' },
                          lineHeight: 1.78,
                          color: 'text.secondary',
                          '& strong': { color: 'text.primary', fontWeight: 500 },
                        }}
                      >
                        {item.body}
                      </Typography>
                    </Stack>
                  </GlassCard>
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Section>
  );
}
