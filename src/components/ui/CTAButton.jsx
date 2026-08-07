import { memo, useCallback, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useReducedMotion } from 'framer-motion';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';

/**
 * Primary call to action with a subtle magnetic pull and a specular sweep that
 * crosses the surface on hover. Falls back to a plain button under
 * `prefers-reduced-motion`.
 */
function CTAButton({
  children,
  variant = 'contained',
  color = 'primary',
  showArrow = true,
  magnetic = true,
  size = 'large',
  sx,
  ...props
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (event) => {
      if (!magnetic || reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      setOffset({ x: x * 0.16, y: y * 0.22 });
    },
    [magnetic, reduced],
  );

  const reset = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return (
    <Button
      ref={ref}
      variant={variant}
      color={color}
      size={size}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      endIcon={
        showArrow ? (
          <ArrowForwardRounded
            sx={{
              fontSize: 18,
              transition: (t) => `transform 520ms ${t.ef.easings.css.luxe}`,
            }}
          />
        ) : null
      }
      sx={(theme) => ({
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        '& .MuiButton-endIcon': { transition: `transform 520ms ${theme.ef.easings.css.luxe}` },
        '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-140%',
          width: '60%',
          height: '100%',
          background:
            'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.42) 50%, transparent 100%)',
          transform: 'skewX(-18deg)',
          transition: `left 900ms ${theme.ef.easings.css.luxe}`,
          pointerEvents: 'none',
        },
        '@media (hover: hover)': { '&:hover::after': { left: '160%' } },
        '@media (prefers-reduced-motion: reduce)': { '&::after': { display: 'none' } },
        ...sx,
      })}
      {...props}
    >
      <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Button>
  );
}

export default memo(CTAButton);
