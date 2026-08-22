import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded';
import { Link as RouterLink } from 'react-router-dom';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import GradientText from '../../components/ui/GradientText';
import BrandArt from '../../components/brand/BrandArt';
import ForgeRings from '../../components/visuals/ForgeRings';
import { ecosystem, elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

const GatewayCard = ({ to, kicker, title, line, accent, children }) => (
  <GlassCard
    component={RouterLink}
    to={to}
    accent={accent}
    radius={26}
    padding={0}
    sx={{
      height: '100%',
      minHeight: { xs: 400, md: 480 },
      textDecoration: 'none',
      overflow: 'hidden',
      '&:hover .gw-art': { transform: 'scale(1.06) translateY(-8px)' },
      '&:hover .gw-arrow': { transform: 'translate(3px, -3px)', borderColor: alphaOf(accent, 0.6) },
    }}
  >
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(70% 55% at 50% 8%, ${alphaOf(accent, 0.14)} 0%, transparent 68%)`,
        pointerEvents: 'none',
      }}
    />

    <Box
      className="gw-art"
      aria-hidden
      sx={{
        position: 'relative',
        height: { xs: 200, md: 250 },
        display: 'grid',
        placeItems: 'center',
        transition: (t) => `transform 900ms ${t.ef.easings.css.luxe}`,
      }}
    >
      {children}
    </Box>

    <Stack spacing={2} sx={{ p: { xs: 3.5, md: 4.5 }, pt: 0, position: 'relative', zIndex: 1 }}>
      <Typography
        sx={{
          fontFamily: fontFamilies.mono,
          fontSize: '0.625rem',
          letterSpacing: '0.24em',
          color: alphaOf(accent, 0.9),
        }}
      >
        {kicker}
      </Typography>

      <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
        <GradientText fill={accent === 'gold' ? 'gold' : 'ice'} component="span">
          {title}
        </GradientText>
      </Typography>

      <Typography variant="body1" component="p" sx={{ maxWidth: 460 }}>
        {line}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ pt: 1 }}>
        <Box
          className="gw-arrow"
          sx={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: (t) => `1px solid ${t.ef.borders.soft}`,
            display: 'grid',
            placeItems: 'center',
            color: 'text.primary',
            transition: (t) => `all 520ms ${t.ef.easings.css.luxe}`,
          }}
        >
          <ArrowOutwardRounded sx={{ fontSize: 18 }} />
        </Box>
        <Typography variant="overline" sx={{ color: (t) => t.ef.text.tertiary }}>
          Open
        </Typography>
      </Stack>
    </Stack>
  </GlassCard>
);

/**
 * The two dedicated destinations. The document routes Ecosystem and ELIMCOIN to
 * their own pages from the home page — this is that junction, given the weight
 * of a chapter opening rather than a nav link.
 */
export default function Gateway() {
  return (
    <Section id="gateway" tone="contrast">
      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Reveal variant="left">
            <GatewayCard
              to="/elimcoin"
              kicker="02 — SECOND TAB"
              title={elimcoin.title}
              line={elimcoin.tagline}
              accent="gold"
            >
              <Box sx={{ position: 'absolute', inset: '-8%' }}>
                <ForgeRings laserColor="rgba(212, 175, 55, 0.9)" />
              </Box>
              <Box
                sx={{
                  width: { xs: 150, md: 186 },
                  filter: 'drop-shadow(0 24px 44px rgba(0,0,0,0.65)) drop-shadow(0 0 32px rgba(212,175,55,0.32))',
                }}
              >
                <BrandArt asset="coinSm" />
              </Box>
            </GatewayCard>
          </Reveal>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Reveal variant="right" delay={0.1}>
            <GatewayCard
              to="/ecosystem"
              kicker="03 — THIRD TAB"
              title={ecosystem.title}
              line={ecosystem.outroLine}
              accent="cyan"
            >
              <Box sx={{ position: 'absolute', inset: '-8%' }}>
                <ForgeRings />
              </Box>
              <Box
                sx={{
                  width: { xs: 170, md: 210 },
                  filter: 'drop-shadow(0 24px 44px rgba(0,0,0,0.65)) drop-shadow(0 0 34px rgba(99,201,236,0.28))',
                }}
              >
                <BrandArt asset="emblem" />
              </Box>
            </GatewayCard>
          </Reveal>
        </Grid>
      </Grid>
    </Section>
  );
}
