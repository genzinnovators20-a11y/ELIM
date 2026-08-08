import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BoltOutlined from '@mui/icons-material/BoltOutlined';
import { motion } from 'framer-motion';
import GradientText from '../../components/ui/GradientText';
import BrandArt from '../../components/brand/BrandArt';
import ForgeRings from '../../components/visuals/ForgeRings';
import { ecosystem } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { easings } from '../../theme/tokens';

const MotionBox = motion.create(Box);

const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(9px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: easings.luxe, delay: 0.05 + i * 0.1 },
  }),
};

/**
 * Ecosystem chapter opening — centred and symmetrical, in contrast to the
 * asymmetric masthead, so arriving here reads as entering a different room.
 * Copy runs in the document's order: brand line, promise, then the headline.
 */
export default function EcosystemIntro() {
  return (
    <Box
      component="section"
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      sx={{
        position: 'relative',
        pt: { xs: '76px', sm: '100px', md: '132px', lg: '160px' },
        pb: { xs: 5, md: 7 },
        overflow: 'hidden',
        scrollMarginTop: 'calc(var(--ef-nav-h) + 20px)',
      }}
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
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(99,201,236,0.16) 0%, rgba(142,123,240,0.08) 46%, transparent 72%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 3.5, md: 4.5 }} alignItems="center" sx={{ textAlign: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: easings.luxe }}
            sx={{ position: 'relative', width: { xs: 170, sm: 210, md: 250 } }}
          >
            <Box sx={{ position: 'absolute', inset: '-22%' }}>
              <ForgeRings />
            </Box>
            <MotionBox
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              sx={{
                position: 'relative',
                filter: 'drop-shadow(0 30px 56px rgba(0,0,0,0.7)) drop-shadow(0 0 46px rgba(99,201,236,0.28))',
              }}
            >
              <BrandArt asset="emblem" />
            </MotionBox>
          </MotionBox>

          <MotionBox custom={0} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
          </MotionBox>

          <MotionBox custom={1} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
          </MotionBox>

          <MotionBox custom={2} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
