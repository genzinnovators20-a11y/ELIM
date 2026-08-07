import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { layout } from '../../theme/tokens';

/**
 * Semantic section wrapper with the site's vertical rhythm.
 * `tone` selects one of the layered ground treatments so no two adjacent
 * sections read as the same flat surface.
 */
const Section = forwardRef(function Section(
  { children, id, tone = 'default', density = 'default', maxWidth, disableContainer = false, sx, containerSx, ...props },
  ref,
) {
  const py =
    density === 'compact'
      ? layout.sectionYCompact
      : density === 'spacious'
        ? layout.sectionYSpacious
        : layout.sectionY;

  const tones = {
    default: {},
    sunken: {
      background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.014) 42%, rgba(255,255,255,0) 100%)',
    },
    contrast: {
      background: 'linear-gradient(180deg, rgba(6,8,12,0) 0%, rgba(3,4,6,0.85) 30%, rgba(3,4,6,0.85) 70%, rgba(6,8,12,0) 100%)',
    },
    emerald: {
      background: 'radial-gradient(78% 62% at 50% 50%, rgba(31,185,138,0.055) 0%, rgba(31,185,138,0) 72%)',
    },
    gold: {
      background: 'radial-gradient(78% 62% at 50% 42%, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0) 70%)',
    },
  };

  return (
    <Box
      ref={ref}
      component="section"
      id={id}
      sx={{
        position: 'relative',
        pt: py,
        pb: py,
        scrollMarginTop: 'calc(var(--ef-nav-h) + 20px)',
        ...tones[tone],
        ...sx,
      }}
      {...props}
    >
      {disableContainer ? (
        children
      ) : (
        <Container sx={{ position: 'relative', zIndex: 1, ...(maxWidth ? { maxWidth } : null), ...containerSx }}>
          {children}
        </Container>
      )}
    </Box>
  );
});

export default Section;
