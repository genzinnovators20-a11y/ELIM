import { memo, useCallback, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { useLightingEnabled } from '../../hooks/usePointerLight';

/**
 * Primary call to action with a subtle magnetic pull and a specular sweep that
 * crosses the surface on hover.
 *
 * The magnetism is written straight to the node's transform inside a single
 * animation frame rather than through React state — a pointer moving across a
 * button fires dozens of events per second, and re-rendering on each one made
 * the cheapest element on the page the most expensive. Nothing here re-renders
 * while the pointer moves.
 *
 * Falls back to a plain button on touch devices and under
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
  const frame = useRef(0);
  const pending = useRef(null);
  const enabled = useLightingEnabled();

  const apply = useCallback(() => {
    frame.current = 0;
    const node = ref.current;
    if (!node || !pending.current) return;
    const { x, y } = pending.current;
    node.style.transform = x === 0 && y === 0 ? '' : `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const schedule = useCallback(
    (offset) => {
      pending.current = offset;
      if (!frame.current) frame.current = requestAnimationFrame(apply);
    },
    [apply],
  );

  const handleMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!magnetic || !node || !enabled) return;
      const rect = node.getBoundingClientRect();
      schedule({
        x: (event.clientX - rect.left - rect.width / 2) * 0.16,
        // The constant lift replaces the theme's `:hover` translate, which an
        // inline transform would otherwise win against.
        y: (event.clientY - rect.top - rect.height / 2) * 0.22 - 2,
      });
    },
    [magnetic, schedule, enabled],
  );

  const reset = useCallback(() => schedule({ x: 0, y: 0 }), [schedule]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <Button
      ref={ref}
      variant={variant}
      color={color}
      size={size}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      endIcon={showArrow ? <ArrowForwardRounded sx={{ fontSize: 18 }} /> : null}
      sx={(theme) => ({
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
          transition: `left ${theme.ef.motion.sweep}`,
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
