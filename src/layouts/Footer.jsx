import { memo } from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import Icon from '../components/ui/Icon';
import GradientText from '../components/ui/GradientText';
import { footerLinks, socials } from '../constants/nav';
import { hero, elimcoin } from '../constants/content';
import { fontFamilies } from '../theme/typography';

const year = new Date().getFullYear();

const LinkColumn = ({ title, links }) => (
  <Stack spacing={1.75}>
    <Typography variant="overline" sx={{ color: (t) => t.ef.text.disabled }}>
      {title}
    </Typography>
    <Stack spacing={1.25} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {links.map((link) => (
        <Box component="li" key={link.label}>
          <Box
            component={RouterLink}
            to={link.to}
            sx={{
              display: 'inline-block',
              fontSize: '0.9rem',
              color: (t) => t.ef.text.tertiary,
              transition: (t) => `color 300ms ease, transform 420ms ${t.ef.easings.css.luxe}`,
              '&:hover': { color: 'text.primary', transform: 'translateX(3px)' },
            }}
          >
            {link.label}
          </Box>
        </Box>
      ))}
    </Stack>
  </Stack>
);

/** Enterprise footer: brand block, sitemap, policies, contact and social rail. */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        mt: { xs: 6, md: 10 },
        pt: { xs: 7, md: 10 },
        pb: 4,
        borderTop: (t) => `1px solid ${t.ef.borders.hairline}`,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.018) 0%, rgba(0,0,0,0.45) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Gold hairline */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -1,
          left: 0,
          right: 0,
          height: 1,
          background: (t) => t.ef.gradients.goldLine,
          opacity: 0.6,
        }}
      />

      <Container>
        <Grid container spacing={{ xs: 5, md: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2.5} sx={{ maxWidth: 340 }}>
              <Logo size={44} showTag={false} />
              <Typography
                sx={{
                  fontFamily: fontFamilies.mono,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  lineHeight: 1.9,
                  color: (t) => t.ef.text.muted,
                }}
              >
                {hero.tagline}
              </Typography>
              <Typography variant="body2" sx={{ color: (t) => t.ef.text.muted }}>
                {elimcoin.tagline}
              </Typography>

              <Stack direction="row" spacing={0.5} sx={{ pt: 0.5 }}>
                {socials.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    size="small"
                    sx={{
                      width: 38,
                      height: 38,
                      border: (t) => `1px solid ${t.ef.borders.hairline}`,
                      borderRadius: 2,
                      transition: (t) => `all 380ms ${t.ef.easings.css.luxe}`,
                      '&:hover': {
                        borderColor: (t) => t.ef.borders.gold,
                        color: 'primary.light',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Icon name={social.icon} sx={{ fontSize: 16 }} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <LinkColumn title="Platform" links={footerLinks.platform} />
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <LinkColumn title="Resources" links={footerLinks.resources} />
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <LinkColumn title="Account" links={footerLinks.account} />
          </Grid>
        </Grid>

        <Divider sx={{ mt: { xs: 5, md: 7 }, mb: 3 }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Typography variant="caption" sx={{ color: (t) => t.ef.text.disabled }}>
            © {year} <GradientText component="span" sx={{ fontWeight: 600 }}>ELIM FORGE</GradientText>. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={{ xs: 2, sm: 3 }} flexWrap="wrap" useFlexGap>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact'].map((item) => (
              <Typography
                key={item}
                component="a"
                href="#"
                variant="caption"
                sx={{
                  color: (t) => t.ef.text.disabled,
                  transition: 'color 280ms ease',
                  '&:hover': { color: 'text.secondary' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default memo(Footer);
