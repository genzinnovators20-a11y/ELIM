import { memo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLightingEnabled } from '../../hooks/usePointerLight';

/**
 * Page-level cursor light — a soft warm bloom that trails the pointer across
 * the whole document, the way a raking light moves over a metal surface.
 *
 * Two details do the work:
 *
 *  1. **Lag.** The light eases toward the cursor at ~14% per frame instead of
 *     locking to it. Perfect tracking reads as a UI element glued to the mouse;
 *     a slight trail reads as light in a room.
 *  2. **Parking.** Once the light has caught up and the pointer is still, the
 *     animation frame is released. Idle cost is zero, not "one cheap frame".
 *
 * Position is published as CSS variables on the root element, so this component
 * never re-renders while tracking and any surface can respond to the pointer by
 * reading a variable rather than subscribing to events.
 */
function CursorLight() {
  const active = useLightingEnabled();

  useEffect(() => {
    if (!active) return undefined;

    const root = document.documentElement;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;
    let visible = false;

    const step = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      current.x += dx * 0.14;
      current.y += dy * 0.14;

      root.style.setProperty('--ef-cursor-x', `${current.x.toFixed(1)}px`);
      root.style.setProperty('--ef-cursor-y', `${current.y.toFixed(1)}px`);

      // Settled: stop burning frames until the pointer moves again.
      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        root.style.setProperty('--ef-cursor-opacity', '1');
      }
      wake();
    };

    const onLeave = () => {
      visible = false;
      root.style.setProperty('--ef-cursor-opacity', '0');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      if (frame) cancelAnimationFrame(frame);
      root.style.setProperty('--ef-cursor-opacity', '0');
    };
  }, [active]);

  if (!active) return null;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 'var(--ef-cursor-opacity)',
        transition: 'opacity 900ms ease',
        background:
          'radial-gradient(520px circle at var(--ef-cursor-x) var(--ef-cursor-y), rgba(212,175,55,0.055) 0%, rgba(31,185,138,0.028) 34%, transparent 68%)',
        // Composited on its own layer so the moving gradient never repaints
        // the content above it.
        willChange: 'opacity',
        contain: 'layout paint',
      }}
    />
  );
}

export default memo(CursorLight);
