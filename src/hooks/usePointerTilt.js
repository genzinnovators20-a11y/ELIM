import { useEffect, useRef } from 'react';

/**
 * Pointer-driven parallax for a composed stage.
 *
 * Publishes the pointer's position over the element as two normalised CSS
 * custom properties, `--tilt-x` and `--tilt-y`, each in the range -0.5..0.5.
 * Every layer inside the stage derives its own displacement from those two
 * numbers in CSS, so a rig with six parallax planes costs the same as one with
 * a single plane: two style writes per frame, and nothing at all when the
 * pointer is still.
 *
 * This replaces a `useSpring`/`useTransform` graph — seven springs and seven
 * derived motion values, each ticking its own subscriber list every frame the
 * pointer moved.
 *
 * Three properties of the original are kept deliberately:
 *
 *  - **The lag.** The value eases toward the pointer rather than locking to it.
 *    Perfect tracking reads as a UI element glued to the mouse; a trailing
 *    settle reads as an object with mass. The exponential lerp below is tuned to
 *    land within a frame or two of where the spring did.
 *  - **The parking.** Once the rig has caught up and the pointer has stopped,
 *    the animation frame is released. Idle cost is zero, not "one cheap frame".
 *  - **The rect discipline.** `getBoundingClientRect()` forces a synchronous
 *    layout, so it is read on enter and on viewport changes *while the pointer
 *    is inside* — never on every pointer event, and never on the scroll events
 *    that momentum scrolling fires continuously past a rig nobody is touching.
 *
 * Inert for coarse pointers and reduced motion: there is no hover on a
 * touchscreen for this to respond to, and the listeners are never attached.
 */
export default function usePointerTilt({ enabled = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || typeof window === 'undefined' || !window.matchMedia) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let rect = null;
    let frame = 0;
    let inside = false;

    const step = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      current.x += dx * 0.12;
      current.y += dy * 0.12;

      el.style.setProperty('--tilt-x', current.x.toFixed(4));
      el.style.setProperty('--tilt-y', current.y.toFixed(4));

      if (Math.abs(dx) < 0.0015 && Math.abs(dy) < 0.0015) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const measure = () => {
      rect = el.getBoundingClientRect();
    };

    const onEnter = () => {
      inside = true;
      measure();
    };

    const onMove = (event) => {
      if (!rect) return;
      target.x = (event.clientX - rect.left) / rect.width - 0.5;
      target.y = (event.clientY - rect.top) / rect.height - 0.5;
      wake();
    };

    const onLeave = () => {
      inside = false;
      target.x = 0;
      target.y = 0;
      wake();
    };

    const onViewportChange = () => {
      if (inside) measure();
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onViewportChange, { passive: true });
    window.addEventListener('resize', onViewportChange, { passive: true });

    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onViewportChange);
      window.removeEventListener('resize', onViewportChange);
      if (frame) cancelAnimationFrame(frame);
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    };
  }, [enabled]);

  return ref;
}
