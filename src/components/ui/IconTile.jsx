import { memo } from 'react';
import Box from '@mui/material/Box';
import Icon from './Icon';
import { alphaOf } from '../../utils/accents';

const sizes = {
  sm: { box: 40, icon: 19, radius: 11 },
  md: { box: 52, icon: 24, radius: 14 },
  lg: { box: 64, icon: 29, radius: 17 },
};

/**
 * Icon in a machined bezel — beveled edge, inner shadow and a faint accent wash.
 * Gives every icon the same physical weight regardless of glyph.
 */
function IconTile({ name, accent = 'gold', size = 'md', sx, ...props }) {
  const s = sizes[size] ?? sizes.md;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        width: s.box,
        height: s.box,
        flexShrink: 0,
        borderRadius: `${s.radius}px`,
        display: 'grid',
        placeItems: 'center',
        background: `linear-gradient(150deg, ${alphaOf(accent, 0.14)} 0%, rgba(255,255,255,0.028) 52%, rgba(0,0,0,0.2) 100%)`,
        border: `1px solid ${alphaOf(accent, 0.24)}`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -8px 18px -12px ${alphaOf(accent, 0.5)}`,
        color: alphaOf(accent, 0.95),
        transition: (t) => `transform 620ms ${t.ef.easings.css.luxe}, box-shadow 520ms ease, border-color 420ms ease`,
        ...sx,
      }}
      {...props}
    >
      <Icon name={name} sx={{ fontSize: s.icon }} />
    </Box>
  );
}

export default memo(IconTile);
