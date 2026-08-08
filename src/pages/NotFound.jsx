import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Eyebrow from '../components/ui/Eyebrow';
import GradientText from '../components/ui/GradientText';
import CTAButton from '../components/ui/CTAButton';
import ForgeRings from '../components/visuals/ForgeRings';
import BrandArt from '../components/brand/BrandArt';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';
import { primaryNav } from '../constants/nav';

export default function NotFound() {
  useSeo(seo.notFound);

  return (
    <Section density="spacious">
      <Stack spacing={{ xs: 4, md: 5 }} alignItems="center" sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative', width: { xs: 160, md: 210 } }}>
          <Box sx={{ position: 'absolute', inset: '-24%' }}>
            <ForgeRings />
          </Box>
          <Box
            sx={{
              position: 'relative',
              opacity: 0.85,
              filter: 'drop-shadow(0 24px 44px rgba(0,0,0,0.7))',
            }}
          >
            <BrandArt asset="emblem" />
          </Box>
        </Box>

        <Reveal variant="fadeUpSm">
          <Eyebrow align="center">Error 404</Eyebrow>
        </Reveal>

        <Reveal variant="blur" delay={0.06}>
          <Typography
            variant="h2"
            component="h1"
          >
            <GradientText fill="ice" component="span">
              Page not found
            </GradientText>
          </Typography>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.12}>
          <Typography variant="subtitle1" component="p" sx={{ maxWidth: 520 }}>
            The page you are looking for does not exist or has moved.
          </Typography>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.18}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ pt: 1 }}>
            <CTAButton component={RouterLink} to="/">
              Back to Home
            </CTAButton>
            <CTAButton component={RouterLink} to="/#ecosystem" variant="outlined" magnetic={false} showArrow={false}>
              Ecosystem
            </CTAButton>
          </Stack>
        </Reveal>

        <Reveal variant="fade" delay={0.24}>
          <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center" useFlexGap sx={{ pt: 2 }}>
            {primaryNav.map((item) => (
              <Typography
                key={item.to}
                component={RouterLink}
                to={item.to}
                variant="overline"
                sx={{ '&:hover': { color: 'text.primary' } }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>
        </Reveal>
      </Stack>
    </Section>
  );
}
