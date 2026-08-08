import { useEffect, useRef, useSyncExternalStore } from 'react';

/**
 * Shared plumbing for the cursor lighting system.
 *
 * Both the page-level light and per-surface spotlights follow the same rule:
 * pointer events never touch React state. Coordinates land in a ref, a single
 * `requestAnimationFrame` loop writes them to CSS custom properties, and the
 * loop parks itself the moment the pointer stops moving. A page with a hundred
 * lit cards therefore costs the same as a page with one.
 */

const QUERIES = ['(hover: hover) and (pointer: fine)', '(prefers-reduced-motion: reduce)'];

/** Fine pointer + motion allowed. Touch and reduced-motion opt out entirely. */
export function lightingEnabled() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERIES[0]).matches && !window.matchMedia(QUERIES[1]).matches;
}

/** Module-scope so the subscription identity is stable across renders. */
function subscribe(onChange) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((list) => list.addEventListener('change', onChange));
  return () => lists.forEach((list) => list.removeEventListener('change', onChange));
}

/**
 * Whether cursor lighting should run. Re-evaluates when the user plugs in a
 * mouse or changes their motion preference — no reload, and no state written
 * from an effect.
 */
export function useLightingEnabled() {
  return useSyncExternalStore(subscribe, lightingEnabled, () => false);
}

/**
 * Per-surface spotlight. Returns a ref to spread onto the element that should
 * light up; the element receives `--ef-spot-x` / `--ef-spot-y` in local pixels
 * and `--ef-spot-o` as the fade.
 *
 * The bounding rect is measured on enter and refreshed on scroll or resize
 * while the pointer is inside, so the highlight cannot drift away from the
 * cursor — and is never measured on a frame where nothing is hovered.
 */
export default function usePointerSpotlight({ enabled = true } = {}) {
  const elementRef = useRef(null);
  const allowed = useLightingEnabled();
  const active = enabled && allowed;

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !active) return undefined;

    let rect = null;
    let frame = 0;
    let pending = null;
    let inside = false;

    const measure = () => {
      rect = el.getBoundingClientRect();
    };

    const flush = () => {
      frame = 0;
      if (!pending || !rect) return;
      el.style.setProperty('--ef-spot-x', `${pending.x - rect.left}px`);
      el.style.setProperty('--ef-spot-y', `${pending.y - rect.top}px`);
      pending = null;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onEnter = (event) => {
      inside = true;
      measure();
      pending = { x: event.clientX, y: event.clientY };
      el.style.setProperty('--ef-spot-o', '1');
      schedule();
    };

    const onMove = (event) => {
      if (!inside) return;
      pending = { x: event.clientX, y: event.clientY };
      schedule();
    };

    const onLeave = () => {
      inside = false;
      el.style.setProperty('--ef-spot-o', '0');
    };

    // Only while the pointer is actually over the surface — no global cost.
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
      el.style.removeProperty('--ef-spot-o');
    };
  }, [active]);

  return elementRef;
}
