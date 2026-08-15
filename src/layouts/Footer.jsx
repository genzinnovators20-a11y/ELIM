import { memo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@/components/ui/layout';
import Reveal from '../components/ui/Reveal';
import GradientText from '../components/ui/GradientText';
import NotchedRule from '../components/ui/NotchedRule';
import BrandPlate from './footer/BrandPlate';
import ContactRail from './footer/ContactRail';
import LinkColumn from './footer/LinkColumn';
import SocialRail from './footer/SocialRail';
import { footerLinks } from '../constants/nav';
import { footer as footerContent, hero } from '../constants/content';
import { fontFamilies } from '../theme/typography';
import { layout } from '../theme/tokens';

/** Split around the brand token so it can carry the metallic fill, words intact. */
const COPYRIGHT_BRAND = 'ELIMCOIN Network';
const [copyrightBefore, copyrightAfter = ''] = footerContent.copyright.split(COPYRIGHT_BRAND);

/** Column spans are tuned to the labels — Resources carries the longest ones. */
const COLUMNS = [
  { id: 'explore', title: 'Explore', links: footerLinks.explore, span: 3.4 },
  { id: 'resources', title: 'Resources', links: footerLinks.resources, span: 4.8 },
  { id: 'account', title: 'Account', links: footerLinks.account, span: 3.8 },
];

/**
 * The closing band of the site.
 *
 * Three zones read left to right — the identity and how to reach the company,
 * the navigation, and the coin plate as the branded anchor on the right — then
 * one legal line beneath a gold rule.
 *
 * The corporate card that used to open this footer at full size is gone. What
 * carried its identity is kept and reused at working size: the gold medallions
 * on the contact rows, the notched rules, the navy lattice panel and the
 * palm-above-coin lockup. That is what took the footer from half again taller
 * than the viewport down to a band.
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        /*
         * `mt` is the footer's half of the seam with the last section and is
         * left alone. The internal `pt` is the footer's own opening distance,
         * so it steps down to the compact rhythm rather than the full section
         * one — the band no longer needs a section's worth of air above it.
         */
        mt: layout.sectionY,
        pt: layout.sectionYCompact,
        pb: { xs: '28px', md: '34px' },
        borderTop: (t) => `1px solid ${t.ef.borders.hairline}`,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.016) 0%, rgba(4,14,12,0.5) 34%, rgba(0,0,0,0.62) 100%)',
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
          <Grid container spacing={{ xs: 3, md: 5, lg: 6 }} alignItems="flex-start">
            {/* Identity, reach, community */}
            <Grid size={{ xs: 12, md: 7, lg: 4.2 }} order={{ xs: 1 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Box>
                  <Typography
                    component="p"
                    aria-label="ELIM FORGE"
                    sx={{
                      fontFamily: fontFamilies.display,
                      fontWeight: 700,
                      fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                      lineHeight: 1.1,
                      letterSpacing: '0.06em',
                    }}
                  >
                    <GradientText fill="gold" component="span">
                      ELIM FORGE
                    </GradientText>
                  </Typography>

                  <Typography
                    component="p"
                    sx={{
                      mt: 1,
                      fontFamily: fontFamilies.mono,
                      fontSize: '0.5625rem',
                      letterSpacing: '0.22em',
                      lineHeight: 1.8,
                      /* Keeps the second line from breaking to a "BY BSC" orphan. */
                      textWrap: 'balance',
                      color: (t) => t.ef.text.muted,
                    }}
                  >
                    {hero.tagline}
                  </Typography>

                  <Typography
                    component="p"
                    sx={{
                      mt: 1.5,
                      fontFamily: fontFamilies.serif,
                      fontSize: { xs: '1rem', md: '1.0625rem' },
                      lineHeight: 1.45,
                      letterSpacing: '-0.01em',
                      textWrap: 'balance',
                    }}
                  >
                    <GradientText fill="gold" component="span">
                      {footerContent.strapline}
                    </GradientText>
                  </Typography>
                </Box>

                <ContactRail />

                <SocialRail />
              </Stack>
            </Grid>

            {/* Navigation */}
            <Grid size={{ xs: 12, md: 12, lg: 4.8 }} order={{ xs: 3, lg: 2 }}>
              <Grid container spacing={{ xs: 2.5, sm: 3, lg: 2 }}>
                {COLUMNS.map((column) => (
                  <Grid key={column.id} size={{ xs: 6, sm: 4, lg: column.span }}>
                    <LinkColumn {...column} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Branded anchor */}
            <Grid
              size={{ xs: 12, sm: 7, md: 5, lg: 3 }}
              order={{ xs: 2, lg: 3 }}
              sx={{ mx: { xs: 'auto', md: 0 } }}
            >
              <BrandPlate />
            </Grid>
          </Grid>
        </Reveal>

        <NotchedRule opacity={0.45} sx={{ mt: { xs: 3, md: 4.5 }, mb: { xs: 2, md: 2.75 } }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1.5, md: 3 }}
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
            spacing={{ xs: 1.75, sm: 3 }}
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
