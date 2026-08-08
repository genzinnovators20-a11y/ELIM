import { memo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@/components/ui/layout';
import Reveal from '../components/ui/Reveal';
import GradientText from '../components/ui/GradientText';
import NotchedRule from '../components/ui/NotchedRule';
import BrandPlate from './footer/BrandPlate';
import LinkColumn from './footer/LinkColumn';
import SocialRail from './footer/SocialRail';
import { footerLinks } from '../constants/nav';
import { footer as footerContent } from '../constants/content';
import { fontFamilies } from '../theme/typography';

/** Split around the brand token so it can carry the metallic fill, words intact. */
const COPYRIGHT_BRAND = 'ELIMCOIN Network';
const [copyrightBefore, copyrightAfter = ''] = footerContent.copyright.split(COPYRIGHT_BRAND);

const COLUMNS = [
  { id: 'explore', title: 'Explore', links: footerLinks.explore },
  { id: 'resources', title: 'Resources', links: footerLinks.resources },
  { id: 'account', title: 'Account', links: footerLinks.account },
];

/**
 * The closing section of the site rather than a conventional footer: the ELIM
 * FORGE corporate plate, then navigation, resources, the social rail and the
 * legal line — each separated by the identity's gold rules.
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        mt: { xs: 8, md: 14 },
        pt: { xs: '64px', md: '104px' },
        pb: { xs: '40px', md: '52px' },
        borderTop: (t) => `1px solid ${t.ef.borders.hairline}`,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.016) 0%, rgba(4,14,12,0.5) 34%, rgba(0,0,0,0.62) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Gold hairline seam */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -1,
          left: 0,
          right: 0,
          height: '1px',
          background: (t) => t.ef.gradients.goldLine,
          opacity: 0.6,
        }}
      />
      {/* Emerald ground bloom, matching the plate */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background:
            'radial-gradient(62% 46% at 22% 6%, rgba(31,185,138,0.09) 0%, transparent 70%), radial-gradient(48% 40% at 88% 14%, rgba(212,175,55,0.08) 0%, transparent 72%)',
        }}
      />

      <Container>
        <Reveal variant="fadeUp" amount={0.12}>
          <BrandPlate />
        </Reveal>

        <Grid container spacing={{ xs: 5, sm: 4, md: 5 }} sx={{ mt: { xs: 7, md: 10 } }}>
          {COLUMNS.map((column) => (
            <Grid key={column.id} size={{ xs: 6, sm: 4 }}>
              <LinkColumn {...column} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <SocialRail />
        </Box>

        <Typography
          component="p"
          sx={{
            mt: { xs: 6, md: 8 },
            textAlign: 'center',
            fontFamily: fontFamilies.serif,
            fontSize: 'clamp(1.125rem, 2.6vw, 1.6rem)',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            textWrap: 'balance',
          }}
        >
          <GradientText fill="gold" component="span">
            {footerContent.strapline}
          </GradientText>
        </Typography>

        <NotchedRule opacity={0.45} sx={{ mt: { xs: 4, md: 5 }, mb: { xs: 3, md: 3.5 } }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 3 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Typography variant="caption" sx={{ color: (t) => t.ef.text.disabled }}>
            {copyrightBefore}
            <GradientText component="span" sx={{ fontWeight: 600 }}>
              {COPYRIGHT_BRAND}
            </GradientText>
            {copyrightAfter}
          </Typography>

          <Stack
            component="ul"
            aria-label="Legal"
            direction="row"
            spacing={{ xs: 2, sm: 3 }}
            flexWrap="wrap"
            useFlexGap
            sx={{ listStyle: 'none', p: 0, m: 0 }}
          >
            {footerContent.links.map((item) => (
              <Box component="li" key={item.label}>
                <Typography
                  component="a"
                  href={item.href}
                  variant="caption"
                  sx={{
                    color: (t) => t.ef.text.disabled,
                    textDecoration: 'none',
                    transition: 'color 280ms ease',
                    '&:hover, &:focus-visible': { color: '#D9C173' },
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default memo(Footer);
