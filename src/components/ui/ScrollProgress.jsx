import { memo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

/**
 * Hairline reading-progress indicator pinned beneath the navigation bar.
 *
 * Where the browser supports a scroll-driven animation timeline, this costs the
 * main thread nothing at all: the compositor scales the bar directly from the
 * scroll offset, on the same thread that is already moving the page. That is the
 * whole of the work on Chrome, Edge and Opera.
 *
 * Everywhere else it falls back to a scroll listener that writes the transform
 * from inside a single animation frame. Either way the bar is driven by the
 * element's own style, never by React — the previous implementation subscribed a
 * `useSpring` to `useScroll`, which meant framer-motion's animation runtime had
 * to be on the critical path of every page to move a two-pixel rule.
 */
function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return undefined;

    // The compositor already owns this one.
    if (CSS.supports?.('animation-timeline', 'scroll()')) return undefined;

    let frame = 0;
    const write = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${progress.toFixed(4)})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Box
      ref={ref}
      aria-hidden
      sx={(theme) => ({
        position: 'fixed',
        top: 'var(--ef-nav-h)',
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: '0% 50%',
        transform: 'scaleX(0)',
        background: theme.ef.gradients.goldFill,
        boxShadow: '0 0 18px rgba(212,175,55,0.55)',
        zIndex: theme.ef.zIndex.nav - 1,
        pointerEvents: 'none',
        '@supports (animation-timeline: scroll())': {
          animation: 'ef-scroll-progress linear',
          animationTimeline: 'scroll(root block)',
        },
        '@keyframes ef-scroll-progress': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      })}
    />
  );
}

export default memo(ScrollProgress);
