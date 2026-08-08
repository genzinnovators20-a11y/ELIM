import { easings, durations } from '../theme/tokens';

/**
 * Shared motion vocabulary. Every reveal on the site is composed from these
 * primitives so the whole experience moves with one hand — long, weighted
 * deceleration rather than bouncy web-app easing.
 */

export const transition = {
  luxe: { duration: durations.slow, ease: easings.luxe },
  soft: { duration: durations.base, ease: easings.soft },
  quick: { duration: durations.fast, ease: easings.soft },
  cinematic: { duration: durations.cinematic, ease: easings.luxe },
};

/**
 * Reveal displacement is deliberately short. A long travel makes the page feel
 * like it is assembling itself in front of the reader; 18px reads as the
 * content settling into place, which is the difference between an animated site
 * and a composed one. Opacity does most of the work — distance only supplies
 * direction.
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: transition.luxe },
};

export const fadeUpSm = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: transition.soft },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.luxe },
};

/**
 * Headline entrance. The blur is kept light — anything heavier reads as a focus
 * pull, and animating large blur radii is the most expensive thing on the page.
 */
export const blurIn = {
  hidden: { opacity: 0, y: 16, filter: 'blur(7px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: transition.luxe },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: transition.luxe },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transition.luxe },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transition.luxe },
};

export const drawLine = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: easings.luxe } },
};

/** Container that cascades its children. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/**
 * Default viewport config — fires slightly before the element is fully on
 * screen, so content is already resolved by the time the reader's eye arrives
 * rather than animating under it.
 */
export const viewport = { once: true, amount: 0.18, margin: '0px 0px -12% 0px' };
export const viewportEarly = { once: true, amount: 0.05, margin: '0px 0px -4% 0px' };

/** Page-level route transition. */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easings.luxe } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.28, ease: easings.inOut } },
};

/** Reduced-motion fallback: presence only, no displacement. */
export const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};
