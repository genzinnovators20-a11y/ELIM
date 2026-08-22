import { memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import useReveal from '../../hooks/useReveal';

const VARIANTS = new Set(['fadeUp', 'fadeUpSm', 'fade', 'blur', 'scale', 'left', 'right']);

/**
 * Scroll reveal primitive. One component drives every entrance on the site,
 * which keeps the choreography consistent and makes reduced-motion a
 * single-line concern rather than a per-section afterthought.
 *
 * The transition itself lives in `animations/reveal.css`; this only decides
 * which variant an element wears and when its class lands. Reduced motion is
 * handled entirely in that stylesheet, so there is no preference to read here
 * and no re-render when it changes.
 *
 * `once` is accepted for call-site compatibility but is always true: every
 * caller on this site relies on it, and an entrance that replays reads as a
 * glitch. `amount` is likewise accepted and ignored — a single shared observer
 * cannot carry per-element thresholds, and no call site sets a value that the
 * shared 0.18 does not already cover.
 */
function revealVars({ delay, duration, y, x, scale, blur }) {
  const vars = {};
  if (delay) vars['--rv-delay'] = `${Math.round(delay * 1000)}ms`;
  if (duration) vars['--rv-duration'] = `${Math.round(duration * 1000)}ms`;
  if (y != null) vars['--rv-y'] = `${y}px`;
  if (x != null) vars['--rv-x'] = `${x}px`;
  if (scale != null) vars['--rv-scale'] = scale;
  if (blur != null) vars['--rv-blur'] = `${blur}px`;
  return vars;
}

function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  y,
  x,
  scale,
  blur,
  as = 'div',
  /* Accepted for call-site compatibility and deliberately unused: a single
     shared observer cannot carry per-element thresholds, every caller relies on
     `once`, and no call site sets an `amount` the shared 0.18 does not cover. */
  amount: _amount,
  once: _once,
  sx,
  style,
  ...props
}) {
  const ref = useReveal();

  return (
    <Box
      ref={ref}
      component={as}
      data-reveal={VARIANTS.has(variant) ? variant : 'fadeUp'}
      style={{ ...revealVars({ delay, duration, y, x, scale, blur }), ...style }}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
}

/**
 * Cascading container — pair with `RevealItem` children.
 *
 * The group is the only thing observed. Its children carry their index as a CSS
 * custom property and derive their own delay from it, so a twelve-card grid
 * costs one observer entry rather than twelve, and the cascade is arithmetic the
 * compositor already knows how to do.
 */
export const RevealGroup = memo(function RevealGroup({
  children,
  stagger = 0.09,
  delayChildren = 0.04,
  as = 'div',
  sx,
  style,
  ...props
}) {
  const reveal = useReveal();

  /*
   * The cascade position is assigned in the DOM rather than by cloning children.
   *
   * Cloning only ever reaches direct children, and a group's direct child is
   * usually a `Grid container` — so every item in the grid would have inherited
   * the same index and the cascade would have collapsed into a single step.
   * Walking the subtree once, as the group mounts, numbers the items wherever
   * the layout happens to have put them. React attaches refs bottom-up, so the
   * items exist by the time this runs.
   */
  const ref = useCallback(
    (node) => {
      if (node) {
        node.querySelectorAll('[data-reveal]').forEach((el, i) => {
          el.style.setProperty('--rv-i', i);
        });
      }
      return reveal(node);
    },
    [reveal],
  );

  return (
    <Box
      ref={ref}
      component={as}
      data-reveal-group=""
      style={{
        '--rv-stagger': `${Math.round(stagger * 1000)}ms`,
        '--rv-delay': `${Math.round(delayChildren * 1000)}ms`,
        ...style,
      }}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
});

/**
 * A step in a cascade. Carries no observer of its own — the enclosing
 * `RevealGroup` reveals the whole set, and this element's `--rv-i` decides where
 * in the sequence it lands.
 */
export const RevealItem = memo(function RevealItem({
  children,
  variant = 'fadeUp',
  delay,
  duration,
  y,
  x,
  scale,
  blur,
  as = 'div',
  sx,
  style,
  ...props
}) {
  return (
    <Box
      component={as}
      data-reveal={VARIANTS.has(variant) ? variant : 'fadeUp'}
      style={{ ...revealVars({ delay, duration, y, x, scale, blur }), ...style }}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
});

export default memo(Reveal);
