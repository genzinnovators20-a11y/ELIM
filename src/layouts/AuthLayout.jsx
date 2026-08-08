import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientText from '../components/ui/GradientText';
import Eyebrow from '../components/ui/Eyebrow';
import BrandArt from '../components/brand/BrandArt';
import ForgeRings from '../components/visuals/ForgeRings';
import GridField from '../components/background/GridField';
import { hero, elimcoin } from '../constants/content';
import { fontFamilies } from '../theme/typography';
import { easings } from '../theme/tokens';

const MotionBox = motion.create(Box);

/**
 * Shared chrome for the account routes: a lit brand panel opposite the form.
 * Keeps LOGIN and SIGNUP visually identical apart from their fields.
 */
export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <Box sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
      <Container sx={{ maxWidth: (t) => t.ef.layout.maxWidthWide }}>
        <Grid container spacing={{ xs: 5, lg: 8 }} alignItems="center">
          {/* Brand panel */}
          <Grid size={{ xs: 12, lg: 6 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                minHeight: 620,
                display: 'grid',
                placeItems: 'center',
                border: (t) => `1px solid ${t.ef.borders.hairline}`,
                background:
                  'linear-gradient(160deg, rgba(18,34,56,0.7) 0%, rgba(8,11,16,0.92) 52%, rgba(10,22,38,0.78) 100%)',
                boxShadow: (t) => t.ef.shadows.lifted,
              }}
            >
              <GridField size={48} major={4} opacity={0.4} mask="radial-gradient(80% 80% at 50% 40%, #000 0%, transparent 78%)" />
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(46% 42% at 50% 34%, rgba(99,201,236,0.2) 0%, transparent 68%), radial-gradient(40% 40% at 78% 92%, rgba(212,175,55,0.16) 0%, transparent 66%)',
                }}
              />

              <Stack spacing={5} alignItems="center" sx={{ position: 'relative', zIndex: 1, px: 6, textAlign: 'center' }}>
                <Box sx={{ position: 'relative', width: 260 }}>
                  <Box sx={{ position: 'absolute', inset: '-22%' }}>
                    <ForgeRings />
                  </Box>
                  <MotionBox
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
                    sx={{
                      position: 'relative',
                      filter: 'drop-shadow(0 30px 56px rgba(0,0,0,0.72)) drop-shadow(0 0 44px rgba(99,201,236,0.26))',
                    }}
                  >
                    <BrandArt asset="emblem" />
                  </MotionBox>
                </Box>

                <Stack spacing={2} alignItems="center">
                  <Typography variant="h3" component="p" sx={{ fontSize: '2rem' }}>
                    <GradientText fill="gold" component="span">
                      {elimcoin.tagline}
                    </GradientText>
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fontFamilies.mono,
                      fontSize: '0.625rem',
                      letterSpacing: '0.2em',
                      lineHeight: 2,
                      color: (t) => t.ef.text.muted,
                      maxWidth: 400,
                    }}
                  >
                    {hero.tagline}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* Form panel */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <MotionBox
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easings.luxe }}
              sx={{ maxWidth: 520, mx: { xs: 'auto', lg: 0 } }}
            >
              <Stack spacing={{ xs: 3, md: 4 }}>
                <Stack spacing={2}>
                  <Eyebrow>{eyebrow}</Eyebrow>
                  <Typography
                    variant="h3"
                    component="h1"
                  >
                    {title}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {subtitle}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: '24px',
                    border: (t) => `1px solid ${t.ef.borders.hairline}`,
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.32) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: (t) => t.ef.shadows.card,
                  }}
                >
                  {children}
                </Box>

                {footer && (
                  <Typography variant="body2" component="p" sx={{ textAlign: 'center' }}>
                    {footer}
                  </Typography>
                )}

                <Typography
                  variant="caption"
                  component="p"
                  sx={{ textAlign: 'center', color: (t) => t.ef.text.disabled }}
                >
                  Return to{' '}
                  <Box component={RouterLink} to="/" sx={{ color: 'primary.light', '&:hover': { textDecoration: 'underline' } }}>
                    ELIM FORGE
                  </Box>
                </Typography>
              </Stack>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
