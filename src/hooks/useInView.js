import { useEffect, useState } from 'react';

/**
 * Whether an element has entered the viewport.
 *
 * Replaces `framer-motion`'s `useInView` for the few components that drive a
 * value rather than a transition — the counters and the two charts, which need
 * to know when to *start* rather than what to animate.
 *
 * `once` is the default because every caller on this site uses it: these are
 * entrances, and an entrance that replays as the reader scrolls back up reads
 * as a glitch rather than as a flourish.
 */
export default function useInView(ref, { amount = 0.3, once = true, rootMargin = '0px' } = {}) {
  /* Without an observer there is nothing to wait for, so the answer is "yes"
     from the first render rather than after an effect has flipped it. */
  const supported = typeof IntersectionObserver !== 'undefined';
  const [inView, setInView] = useState(!supported);

  useEffect(() => {
    const el = ref.current;
    if (!el || !supported) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, amount, once, rootMargin, supported]);

  return inView;
}

export { useInView };
