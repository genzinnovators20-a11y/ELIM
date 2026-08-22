import { memo } from 'react';
import Box from '@mui/material/Box';

/**
 * Engineering grid. Two superimposed line sets (fine + major) faded through a
 * radial mask, so it reads as a drafting surface receding into the dark rather
 * than a graph-paper texture stamped on top.
 */
function GridField({
  size = 72,
  major = 4,
  opacity = 0.5,
  color = 'rgba(255,255,255,0.045)',
  majorColor = 'rgba(255,255,255,0.075)',
  mask = 'radial-gradient(120% 90% at 50% 0%, #000 20%, transparent 78%)',
  sx,
  ...props
}) {
  return (
    <Box
      aria-hidden
      {...props}
      sx={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${majorColor} 1px, transparent 1px),
          linear-gradient(90deg, ${majorColor} 1px, transparent 1px),
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size * major}px ${size * major}px, ${size * major}px ${size * major}px, ${size}px ${size}px, ${size}px ${size}px`,
        WebkitMaskImage: mask,
        maskImage: mask,
        ...sx,
      }}
    />
  );
}

export default memo(GridField);
