import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const list = window.matchMedia(QUERY);
  list.addEventListener('change', onChange);
  return () => list.removeEventListener('change', onChange);
}

function read() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Whether the reader has asked for reduced motion.
 *
 * Replaces `framer-motion`'s hook of the same name. Identical contract — `true`
 * when the preference is set, re-rendering if it changes mid-session — without
 * the 144KB animation runtime being on the critical path for the handful of
 * components that only ever needed to ask this question.
 */
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, read, () => false);
}

export { useReducedMotion };
