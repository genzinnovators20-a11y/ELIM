import { memo } from 'react';
import Box from '@mui/material/Box';
import { motion, useReducedMotion } from 'framer-motion';
import * as M from '../../animations/motion';

const MotionBox = motion.create(Box);

const presets = {
  fadeUp: M.fadeUp,
  fadeUpSm: M.fadeUpSm,
  fade: M.fade,
  blur: M.blurIn,
  scale: M.scaleIn,
  left: M.slideInLeft,
  right: M.slideInRight,
};

/**
 * Scroll reveal primitive. One component drives every entrance on the site,
 * which keeps the choreography consistent and makes reduced-motion a
 * single-line concern rather than a per-section afterthought.
 */
function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  as = 'div',
  amount,
  once = true,
  sx,
  ...props
}) {
  const reduced = useReducedMotion();
  const chosen = reduced ? M.reducedVariants : (presets[variant] ?? M.fadeUp);

  const visible = duration
    ? { ...chosen.visible, transition: { ...chosen.visible.transition, duration } }
    : chosen.visible;

  return (
    <MotionBox
      component={as}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...M.viewport, once, ...(amount != null ? { amount } : null) }}
      variants={{ hidden: chosen.hidden, visible: { ...visible, transition: { ...visible.transition, delay } } }}
      sx={sx}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

/** Cascading container — pair with `RevealItem` children. */
export const RevealGroup = memo(function RevealGroup({
  children,
  stagger = 0.09,
  delayChildren = 0.04,
  as = 'div',
  sx,
  ...props
}) {
  return (
    <MotionBox
      component={as}
      initial="hidden"
      whileInView="visible"
      viewport={M.viewport}
      variants={M.stagger(stagger, delayChildren)}
      sx={sx}
      {...props}
    >
      {children}
    </MotionBox>
  );
});

export const RevealItem = memo(function RevealItem({ children, variant = 'fadeUp', as = 'div', sx, ...props }) {
  const reduced = useReducedMotion();
  const chosen = reduced ? M.reducedVariants : (presets[variant] ?? M.fadeUp);
  return (
    <MotionBox component={as} variants={chosen} sx={sx} {...props}>
      {children}
    </MotionBox>
  );
});

export { MotionBox };
export default memo(Reveal);
