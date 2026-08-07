import { memo } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import ElimMark from './ElimMark';
import { fontFamilies } from '../../theme/typography';

/** Navigation / footer lockup: mark + wordmark + descriptor. */
function Logo({ size = 40, showTag = true, to = '/', sx }) {
  return (
    <Stack
      component={RouterLink}
      to={to}
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
        sx={{ transition: (t) => `transform 620ms ${t.ef.easings.css.luxe}`, willChange: 'transform' }}
      >
        <ElimMark size={size} />
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
