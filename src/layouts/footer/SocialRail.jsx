import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@/components/ui/layout';
import Icon from '../../components/ui/Icon';
import { socials } from '../../constants/nav';
import { fontFamilies } from '../../theme/typography';

/**
 * Social rail — gold medallions matching the contact glyphs on the brand plate,
 * so the two halves of the footer read as one identity system.
 */
function SocialRail() {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      useFlexGap
      spacing={{ xs: 1.25, sm: 2 }}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        px: { xs: 2, md: 2.25 },
        py: { xs: 1.75, md: 1.75 },
        borderRadius: '14px',
        border: (t) => `1px solid ${t.ef.borders.hairline}`,
        background: 'linear-gradient(150deg, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.008) 100%)',
      }}
    >
      <Typography
        component="p"
        sx={{
          fontFamily: fontFamilies.mono,
          fontSize: '0.625rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: (t) => t.ef.text.muted,
        }}
      >
        Follow ELIM FORGE
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {socials.map((social) => (
          <Box
            key={social.label}
            component="a"
            href={social.href}
            aria-label={social.label}
            sx={(t) => ({
              width: 36,
              height: 36,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              color: t.ef.text.secondary,
              border: `1px solid ${t.ef.borders.soft}`,
              background: 'radial-gradient(130% 130% at 30% 20%, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
              transition: `color 340ms ease, border-color 340ms ease, transform 560ms ${t.ef.easings.css.luxe}, box-shadow 480ms ${t.ef.easings.css.luxe}`,
              '&:hover, &:focus-visible': {
                color: '#F1DFA4',
                borderColor: 'rgba(212,175,55,0.6)',
                transform: 'translateY(-3px)',
                boxShadow: 'inset 0 1px 0 rgba(255,246,216,0.26), 0 14px 30px -16px rgba(212,175,55,0.9)',
              },
            })}
          >
            <Icon name={social.icon} sx={{ fontSize: 16 }} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(SocialRail);
