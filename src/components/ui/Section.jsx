import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { layout } from '../../theme/tokens';

/**
 * Semantic section wrapper with the site's vertical rhythm.
 *
 * `tone` selects one of the layered ground treatments so no two adjacent
 * sections read as the same flat surface.
 *
 * `density` picks a step on the rhythm ladder. The values it reads are
 * half-gaps (see `layout` in the tokens): this section contributes half the
 * distance to each of its neighbours and they contribute the other half, so a
 * boundary lands on one gap rather than two stacked ones.
 *
 * `flush` drops the padding on one edge entirely, for the case the ladder
 * cannot express: a chapter opener that must read as the same block as the
 * section it introduces rather than as a sibling separated from it. Passing
 * `flush="bottom"` is a composition decision — it says "these two are one
 * unit" — and is the only sanctioned way to reach zero.
 */
const DENSITIES = {
  compact: layout.sectionYCompact,
  default: layout.sectionY,
  spacious: layout.sectionYSpacious,
};

const Section = forwardRef(function Section(
  {
    children,
    id,
    tone = 'default',
    density = 'default',
    flush,
    maxWidth,
    disableContainer = false,
    sx,
    containerSx,
    ...props
  },
  ref,
) {
  const py = DENSITIES[density] ?? DENSITIES.default;
  const flushTop = flush === 'top' || flush === 'both';
  const flushBottom = flush === 'bottom' || flush === 'both';

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
        pt: flushTop ? 0 : py,
        pb: flushBottom ? 0 : py,
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
