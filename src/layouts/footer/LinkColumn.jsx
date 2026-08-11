import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@/components/ui/layout';
import { Link as RouterLink } from 'react-router-dom';
import { fontFamilies } from '../../theme/typography';

/**
 * A titled column of footer links. The title labels the list for assistive
 * technology via `aria-labelledby` rather than introducing a heading level, so
 * the document outline stays intact at the bottom of the page.
 */
function LinkColumn({ id, title, links }) {
  const headingId = `footer-col-${id}`;

  return (
    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
      <Box>
        <Typography
          id={headingId}
          component="p"
          sx={{
            fontFamily: fontFamilies.mono,
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9A94E',
          }}
        >
          {title}
        </Typography>
        <Box
          aria-hidden
          sx={{
            mt: 1,
            width: 26,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(212,175,55,0.85), rgba(212,175,55,0))',
          }}
        />
      </Box>

      <Stack
        component="ul"
        aria-labelledby={headingId}
        spacing={{ xs: 1.25, md: 1.5 }}
        sx={{ listStyle: 'none', p: 0, m: 0 }}
      >
        {links.map((link) => (
          <Box component="li" key={link.label}>
            <Box
              component={RouterLink}
              to={link.to}
              sx={(t) => ({
                position: 'relative',
                display: 'inline-block',
                fontSize: '0.9375rem',
                lineHeight: 1.5,
                color: t.ef.text.tertiary,
                textDecoration: 'none',
                transition: `color 320ms ease, transform 520ms ${t.ef.easings.css.luxe}`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: -14,
                  top: '50%',
                  width: 7,
                  height: '1px',
                  background: 'rgba(212,175,55,0.9)',
                  opacity: 0,
                  transform: 'translateX(-4px)',
                  transition: `opacity 380ms ease, transform 520ms ${t.ef.easings.css.luxe}`,
                },
                '&:hover, &:focus-visible': {
                  color: 'text.primary',
                  transform: 'translateX(6px)',
                },
                '&:hover::before, &:focus-visible::before': { opacity: 1, transform: 'translateX(0)' },
              })}
            >
              {link.label}
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(LinkColumn);
