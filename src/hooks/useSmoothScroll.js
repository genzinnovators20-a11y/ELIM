import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

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
 * Momentum smooth scrolling, driven by rAF and disabled outright when the user
 * has asked for reduced motion (Lenis hijacks native scroll, so it must go).
 */
export function useSmoothScroll() {
  const reduced = useReducedMotion();
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduced) return undefined;
    if (typeof window === 'undefined') return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
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
