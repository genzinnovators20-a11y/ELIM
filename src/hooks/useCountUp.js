import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { easings } from '../theme/tokens';

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts a numeric value up once the element enters the viewport.
 * Uses a single rAF loop rather than a dependency; honours reduced motion by
 * jumping straight to the final value.
 */
export function useCountUp(target, { duration = 1900, decimals = 0, delay = 0 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion resolves during render (see the return below), so the
    // effect only drives the animation frame loop.
    if (!inView || reduced) return undefined;

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
      const eased = easeOutExpo(progress);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(run);
      else setValue(target);
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, decimals, delay, reduced]);

  return { ref, value: reduced && inView ? target : value, inView };
}

export { easeOutExpo, easings };
export default useCountUp;
