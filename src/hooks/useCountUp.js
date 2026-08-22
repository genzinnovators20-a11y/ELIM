import { useLayoutEffect, useRef } from 'react';
import useInView from './useInView';
import useReducedMotion from './useReducedMotion';
import { easings } from '../theme/tokens';

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts a numeric value up once the element enters the viewport.
 *
 * The frame loop writes the element's text directly rather than driving React
 * state. A counter runs for 1.9s, which is about 114 frames; through `useState`
 * that is 114 renders and 114 commits *per counter*, and this page has six of
 * them, several of which sit inside cards that re-render their whole subtree.
 * Nothing about the output differs — the same easing produces the same digits —
 * but the work per frame goes from a React render pass to one string
 * assignment.
 *
 * The element's text belongs entirely to this hook — the caller renders it with
 * no children. Handing React a child string and then overwriting it works only
 * for as long as that string never changes, because React rewrites a text node
 * exactly when its value differs from the last render; the moment a caller made
 * the initial string depend on anything, a re-render would silently reset the
 * figure to zero. Owning it outright removes the trap. The first value is
 * written in a layout effect, before paint, so there is no empty frame.
 *
 * `format` is called on each frame, so the caller keeps control of grouping and
 * decimals without the hook having to know about either. It is a dependency of
 * the frame loop, so callers must keep its identity stable — a formatter rebuilt
 * on every render would restart the count, and the digits would visibly drop
 * back to zero mid-way.
 *
 * Reduced motion skips the count and writes the final value once: the number is
 * the information, and animating it is decoration the reader has opted out of.
 */
export function useCountUp(target, { duration = 1900, decimals = 0, delay = 0, format = String } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const write = (n) => {
      el.textContent = format(n);
    };

    if (reduced) {
      write(target);
      return undefined;
    }
    if (!inView) {
      write(0);
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const run = (now) => {
      if (!start) start = now + delay;
      const elapsed = now - start;
      if (elapsed < 0) {
        frame = requestAnimationFrame(run);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      write(Number((target * easeOutExpo(progress)).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(run);
      else write(target);
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, decimals, delay, reduced, format]);

  return { ref, inView };
}

export { easeOutExpo, easings };
export default useCountUp;
