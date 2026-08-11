import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import PublicRounded from '@mui/icons-material/PublicRounded';
import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded';
import Section from '../../components/ui/Section';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import Icon from '../../components/ui/Icon';
import GradientText from '../../components/ui/GradientText';
import { community } from '../../constants/content';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

/**
 * Connect with Our Global Network. Each channel is a full-surface card rather
 * than an icon button, so the row carries the same weight as the rest of the
 * page and stays comfortably tappable on mobile.
 */
export default function Community() {
  return (
    <Section id="community" tone="emerald">
      <Stack spacing={{ xs: 3, md: 4 }} alignItems="center" sx={{ textAlign: 'center' }}>
        <Reveal variant="scale">
          <Box
            aria-hidden
            sx={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(150deg, rgba(99,201,236,0.2), rgba(0,0,0,0.3))',
              border: (t) => `1px solid ${t.ef.borders.blue}`,
              color: 'info.light',
              boxShadow: '0 0 40px -12px rgba(76,141,255,0.8)',
            }}
          >
            <PublicRounded sx={{ fontSize: 28 }} />
          </Box>
        </Reveal>

        <Reveal variant="blur" delay={0.06}>
          <Typography
            variant="h2"
            component="h2"
          >
            <GradientText fill="ice" component="span">
              {community.title}
            </GradientText>
          </Typography>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.12}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontSize: { xs: '1.0625rem', md: '1.25rem' }, lineHeight: 1.68, maxWidth: 820 }}
          >
            {community.body}
          </Typography>
        </Reveal>
      </Stack>

      <RevealGroup stagger={0.09} sx={{ mt: layout.stack.head }}>
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {community.links.map((link) => (
            <Grid size={{ xs: 6, md: 3 }} key={link.label}>
              <RevealItem sx={{ height: '100%' }}>
                <GlassCard
                  component="a"
                  href={link.href}
                  accent={link.accent}
                  radius={18}
                  padding={{ xs: 2.5, md: 3 }}
                  sx={{
                    height: '100%',
                    gap: 2,
                    textDecoration: 'none',
                    '&:hover .ch-icon': { transform: 'translateY(-3px)' },
                    '&:hover .ch-go': { opacity: 1, transform: 'translate(2px, -2px)' },
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box
                      className="ch-icon"
                      sx={{
                        color: alphaOf(link.accent, 0.96),
                        transition: (t) => `transform 560ms ${t.ef.easings.css.luxe}`,
                      }}
                    >
                      <Icon name={link.icon} sx={{ fontSize: 26 }} />
                    </Box>
                    <ArrowOutwardRounded
                      className="ch-go"
                      sx={{
                        fontSize: 16,
                        opacity: 0.3,
                        transition: (t) => `all 420ms ${t.ef.easings.css.luxe}`,
                      }}
                    />
                  </Stack>

                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.9375rem', md: '1.0625rem' },
                      letterSpacing: '-0.01em',
                      color: 'text.primary',
                    }}
                  >
                    {link.label}
                  </Typography>
                </GlassCard>
              </RevealItem>
            </Grid>
          ))}
        </Grid>
      </RevealGroup>
    </Section>
  );
}
