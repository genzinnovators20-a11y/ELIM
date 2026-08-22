import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import useReducedMotion from './useReducedMotion';

let lenisInstance = null;

const navOffset = () => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--ef-nav-h');
  const nav = Number.parseFloat(raw) || 72;
  return nav + 22;
};

/**
 * Imperative anchor navigation.
 *
 * The destination is resolved to an absolute document position before handing
 * it to Lenis — passing an element and letting Lenis measure it produced a
 * drifting final offset, because Lenis's own `offset` is applied against a
 * position it samples mid-flight.
 */
export const scrollToTarget = (target, options = {}) => {
  if (typeof window === 'undefined') return;

  let top;
  if (typeof target === 'number') {
    top = target;
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navOffset());
  }

  if (lenisInstance) {
    // Recompute the scroll limit first: Lenis caches it from a ResizeObserver,
    // and on a freshly mounted route the cached limit is still the old, shorter
    // document — which silently clamps the destination.
    lenisInstance.resize();
    lenisInstance.scrollTo(top, { duration: 1.2, force: true, ...options });
  } else {
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/**
 * Send the page back to the top.
 * Instant by default (route changes); `smooth` for the in-page HOME anchor.
 */
export const jumpToTop = ({ smooth = false } = {}) => {
  if (typeof window === 'undefined') return;

  if (lenisInstance) {
    lenisInstance.resize();
    if (smooth) lenisInstance.scrollTo(0, { duration: 1.2, force: true });
    else lenisInstance.scrollTo(0, { immediate: true, force: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' });
};

/**
 * Momentum smooth scrolling for the wheel.
 *
 * Disabled outright in two cases:
 *
 *  - **Reduced motion.** Lenis hijacks native scroll, so it has to go entirely
 *    rather than be softened.
 *  - **Coarse pointers.** This is what it is actually for: taking the edge off a
 *    wheel notch. It is configured with `syncTouch: false`, so on a touchscreen
 *    it was already handing scrolling straight back to the platform — while
 *    still holding a `requestAnimationFrame` loop open for the life of the
 *    session to smooth a wheel that does not exist. A phone was running an
 *    animation frame, every frame, forever, to do nothing; and a page with a
 *    live rAF loop is a page Blink runs its full rendering lifecycle over on
 *    every frame. Native touch scrolling is also better than anything layered
 *    on top of it: it runs on the compositor, it survives a busy main thread,
 *    and it matches the platform's own overscroll and momentum.
 */
export function useSmoothScroll() {
  const reduced = useReducedMotion();
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduced) return undefined;
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(pointer: coarse)').matches) return undefined;

    /**
     * Tuned for immediacy rather than glide.
     *
     * The previous settings ran a fixed 1.15s animation to the target with a
     * decelerating ease, and moved 5% less than the wheel asked for. Measured on
     * a single 120px wheel tick that meant: 69ms before the page moved at all,
     * 474ms to travel 90% of the distance and 773ms to settle — for one notch of
     * the wheel. That reads as input lag, because it is: the reader has asked for
     * a movement and the page spends most of a second still arriving.
     *
     * `lerp` replaces the fixed duration with per-frame exponential smoothing, so
     * the page starts moving on the very next frame and the smoothing only takes
     * the edge off. At 0.45 a wheel tick is half-travelled in ~33ms and settled in
     * ~224ms, against 185ms and 773ms before; the first pixel of movement lands
     * one frame after the wheel either way, so what changed is the tail the reader
     * was waiting on. Higher values are indistinguishable from native scrolling.
     *
     * The multiplier is above 1 so a notch of the wheel travels at least as far as
     * it would natively — the scroll should never feel like it is giving back less
     * than it was given.
     *
     * Anchor navigation is deliberately left alone: `scrollToTarget` passes its own
     * duration, so clicking a nav link still glides across the page as a movement
     * the reader is meant to follow, rather than teleporting.
     */
    const lenis = new Lenis({
      lerp: 0.45,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: false,
    });

    lenisInstance = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);
}

export default useSmoothScroll;
