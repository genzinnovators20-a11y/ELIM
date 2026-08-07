import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import GradientText from '../../components/ui/GradientText';
import CTAButton from '../../components/ui/CTAButton';
import GridField from '../../components/background/GridField';
import { ecosystem } from '../../constants/content';

/**
 * Closing statement. Full-bleed, centred, oversized — the document ends this
 * section with a declaration, so the page does too.
 */
export default function EcosystemOutro() {
  return (
    <Section tone="default" density="spacious" disableContainer sx={{ position: 'relative', overflow: 'hidden' }}>
      <GridField size={54} major={5} opacity={0.34} mask="radial-gradient(70% 100% at 50% 50%, #000 0%, transparent 76%)" />

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(46% 60% at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Stack
        spacing={{ xs: 3, md: 4 }}
        alignItems="center"
        sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 3 }}
      >
        <Reveal variant="blur">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              lineHeight: 0.98,
              fontWeight: 700,
              letterSpacing: '-0.045em',
            }}
          >
            <GradientText fill="gold" component="span">
              {ecosystem.outroTitle}
            </GradientText>
          </Typography>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.12}>
          <Typography
            variant="h3"
            component="p"
            sx={{
              fontWeight: 400,
              fontSize: 'clamp(1.15rem, 3.2vw, 2.5rem)',
              maxWidth: 1000,
              color: 'text.secondary',
              textWrap: 'balance',
            }}
          >
            {ecosystem.outroLine}
          </Typography>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ pt: 2 }}>
            <CTAButton component={RouterLink} to="/elimcoin">
              Explore ELIMCOIN
            </CTAButton>
            <CTAButton component={RouterLink} to="/" variant="outlined" magnetic={false} showArrow={false}>
              Back to Home
            </CTAButton>
          </Stack>
        </Reveal>
      </Stack>
    </Section>
  );
}
