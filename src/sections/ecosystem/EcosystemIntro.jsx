import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BoltOutlined from '@mui/icons-material/BoltOutlined';
import GradientText from '../../components/ui/GradientText';
import BrandArt from '../../components/brand/BrandArt';
import ForgeRings from '../../components/visuals/ForgeRings';
import Section from '../../components/ui/Section';
import { ecosystem } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import Reveal from '../../components/ui/Reveal';
import '../../animations/ambient.css';

/**
 * Ecosystem chapter opening — centred and symmetrical, in contrast to the
 * asymmetric masthead, so arriving here reads as entering a different room.
 * Copy runs in the document's order: brand line, promise, then the headline.
 */
export default function EcosystemIntro() {
  return (
    /*
      Chapter opener. It keeps its normal half-gap and the first section of the
      chapter goes `flush="top"` instead, so the handoff resolves to exactly one
      half-gap — half the distance between two unrelated sections. The title card
      and its chapter therefore read as one unit, and the figure does not drift
      with the density of whichever section happens to come next. Its own
      container is kept so the wide glow layer can bleed past the gutter.
    */
    <Section
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      disableContainer
      sx={{ overflow: 'hidden' }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1200px, 120vw)',
          height: 'min(800px, 90vh)',
          /* Painted rather than filtered — a 1200x800 blurred layer for a
             diffuse chapter glow, in a section the reader scrolls into. */
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(99,201,236,0.16) 0%, rgba(142,123,240,0.075) 48%, transparent 74%)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 3.5, md: 4.5 }} alignItems="center" sx={{ textAlign: 'center' }}>
          <Reveal
            variant="scale"
            scale={0.86}
            duration={1.4}
            sx={{ position: 'relative', width: { xs: 170, sm: 210, md: 250 } }}
          >
            <Box sx={{ position: 'absolute', inset: '-22%' }}>
              <ForgeRings />
            </Box>
            <Box
              className="ef-float"
              style={{ '--float-to': '-10px', '--float-duration': '7s' }}
              sx={{
                position: 'relative',
                filter: 'drop-shadow(0 30px 56px rgba(0,0,0,0.7)) drop-shadow(0 0 46px rgba(99,201,236,0.28))',
              }}
            >
              <BrandArt asset="emblem" />
            </Box>
          </Reveal>

          <Reveal variant="blur" y={26} blur={9} duration={1} delay={0.05}>
            <Typography
              component="p"
              sx={{
                fontFamily: fontFamilies.mono,
                fontSize: { xs: '0.6875rem', md: '0.8125rem' },
                letterSpacing: '0.32em',
                color: 'primary.light',
              }}
            >
              {ecosystem.brandLine}
            </Typography>
          </Reveal>

          <Reveal variant="blur" y={26} blur={9} duration={1} delay={0.15}>
            <Typography
              id="ecosystem-title"
              variant="h2"
              component="h2"
              sx={{ maxWidth: 1180 }}
            >
              <GradientText fill="ice" component="span">
                {ecosystem.title}
              </GradientText>
            </Typography>
          </Reveal>

          <Reveal variant="blur" y={26} blur={9} duration={1} delay={0.25}>
            <Typography
              variant="h3"
              component="p"
              sx={{ fontWeight: 500, maxWidth: 900, mx: 'auto', color: 'text.secondary' }}
            >
              {/* Inline so the bolt stays welded to the first word rather than
                  drifting to the edge of a centred two-line statement. */}
              <BoltOutlined
                sx={{ fontSize: '0.86em', verticalAlign: '-0.14em', mr: 1, color: 'primary.light' }}
              />
              {ecosystem.headline}
            </Typography>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
