import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import GradientText from '../../components/ui/GradientText';
import IconTile from '../../components/ui/IconTile';
import { marketChallenge, solution, bridgeStatement } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

const Panel = ({ eyebrowIcon, accent, index, title, body, muted }) => (
  <GlassCard
    accent={accent}
    padding={{ xs: 3.5, md: 5 }}
    radius={24}
    intensity={muted ? 'default' : 'strong'}
    sx={{ height: '100%', gap: 3 }}
  >
    <Stack direction="row" spacing={2.5} alignItems="center">
      <IconTile name={eyebrowIcon} accent={accent} size="lg" />
      <Box>
        <Typography
          sx={{
            fontFamily: fontFamilies.mono,
            fontSize: '0.625rem',
            letterSpacing: '0.24em',
            color: alphaOf(accent, 0.9),
          }}
        >
          {index}
        </Typography>
        <Typography variant="h4" component="h3" sx={{ mt: 0.75 }}>
          {title}
        </Typography>
      </Box>
    </Stack>

    <Typography
      variant="body1"
      component="p"
      sx={{
        fontSize: { xs: '1rem', md: '1.0625rem' },
        lineHeight: 1.82,
        color: muted ? (t) => t.ef.text.muted : 'text.secondary',
      }}
    >
      {body}
    </Typography>
  </GlassCard>
);

/**
 * The problem / answer pairing. The two panels are deliberately lit differently
 * — the challenge cold and receding, the solution warm and raised — so the
 * argument reads before the text is.
 */
export default function ChallengeSolution() {
  return (
    <Section id="challenge" tone="contrast">
      <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
        <Grid size={{ xs: 12, md: 6 }}>
          <Reveal variant="left">
            <Panel
              eyebrowIcon="risk"
              accent="steel"
              index="01 — THE PROBLEM"
              title={marketChallenge.title}
              body={marketChallenge.body}
              muted
            />
          </Reveal>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Reveal variant="right" delay={0.1}>
            <Panel
              eyebrowIcon="bridge"
              accent="gold"
              index="02 — THE ANSWER"
              title={solution.title}
              body={solution.body}
            />
          </Reveal>
        </Grid>
      </Grid>

      {/* The gap, closing */}
      <Box sx={{ mt: { xs: 8, md: 13 }, position: 'relative' }}>
        <Reveal variant="fade">
          <Box
            aria-hidden
            sx={{
              position: 'relative',
              height: 1,
              mb: { xs: 5, md: 7 },
              background: (t) => t.ef.gradients.goldLine,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -3,
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: 7,
                height: 7,
                background: (t) => t.ef.colors.gold,
                boxShadow: '0 0 18px rgba(212,175,55,0.8)',
              },
            }}
          />
        </Reveal>

        <Stack spacing={{ xs: 1, md: 1.5 }} sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Reveal variant="blur">
            <Typography
              variant="quote"
              component="p"
              sx={{ color: (t) => t.ef.text.secondary, maxWidth: 1000 }}
            >
              {bridgeStatement.lineOne}
            </Typography>
          </Reveal>

          <Reveal variant="blur" delay={0.14}>
            <Typography
              variant="quoteLg"
              component="p"
            >
              <GradientText fill="gold" component="span">
                {bridgeStatement.lineTwo}
              </GradientText>
            </Typography>
          </Reveal>
        </Stack>
      </Box>
    </Section>
  );
}
