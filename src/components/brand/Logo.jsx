import { memo } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import BrandArt from './BrandArt';
import { fontFamilies } from '../../theme/typography';

/**
 * Navigation / footer lockup: mark + wordmark + descriptor.
 * `onClick` lets the navbar intercept the click on the landing page and scroll
 * to the top instead of re-navigating to a route that is already active.
 *
 * The mark is the official ELIM COIN artwork, the same disc the footer plate and
 * the ELIMCOIN stage carry, rather than a drawn monogram — so the identity is
 * the supplied one everywhere it appears. `size` accepts a number or a
 * responsive object and drives the mark's width; the square box it sits in is
 * reserved before the image decodes, so the lockup never reflows around it.
 */
function Logo({ size = 40, showTag = true, to = '/', onClick, sx }) {
  const handleClick = (event) => {
    if (!onClick) return;
    event.preventDefault();
    onClick(event);
  };

  return (
    <Stack
      component={RouterLink}
      to={to}
      onClick={handleClick}
      direction="row"
      spacing={1.5}
      alignItems="center"
      aria-label="ELIM FORGE — home"
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        '&:hover .ef-mark': { transform: 'rotate(-8deg) scale(1.04)' },
        '&:hover .ef-word': { letterSpacing: '0.2em' },
        ...sx,
      }}
    >
      <Box
        className="ef-mark"
        sx={{
          width: size,
          flexShrink: 0,
          transition: (t) => `transform 620ms ${t.ef.easings.css.luxe}`,
          willChange: 'transform',
        }}
      >
        <BrandArt asset="mark" priority />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          className="ef-word"
          component="span"
          sx={{
            display: 'block',
            fontFamily: fontFamilies.display,
            fontWeight: 700,
            fontSize: { xs: '0.98rem', md: '1.06rem' },
            lineHeight: 1.05,
            letterSpacing: '0.16em',
            color: 'text.primary',
            transition: (t) => `letter-spacing 620ms ${t.ef.easings.css.luxe}`,
            whiteSpace: 'nowrap',
          }}
        >
          ELIM FORGE
        </Typography>
        {showTag && (
          <Typography
            component="span"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontFamily: fontFamilies.mono,
              fontSize: '0.5625rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: (t) => t.ef.text.muted,
              mt: 0.4,
              whiteSpace: 'nowrap',
            }}
          >
            Fuelled by BSC
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export default memo(Logo);
