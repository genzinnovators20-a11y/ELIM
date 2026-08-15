import { forwardRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import { alphaOf } from '../../utils/accents';
import usePointerSpotlight, { useLightingEnabled } from '../../hooks/usePointerLight';

/**
 * The signature surface: a graphite glass panel with a gradient hairline border,
 * an inner top highlight and an accent bloom that lifts on hover.
 * Border gradients are painted with a masked pseudo-element so the radius stays
 * perfectly round at every corner.
 *
 * Interactive cards also carry a **cursor spotlight**: a soft accent wash that
 * follows the pointer across the surface, plus a matching bloom on the border
 * itself so the edge catches the light where the cursor is. Both are driven by
 * CSS custom properties written outside React (see `usePointerLight`), so
 * tracking the pointer costs no re-renders — and both are inert on touch
 * devices and under `prefers-reduced-motion`.
 */
const GlassCard = forwardRef(function GlassCard(
  {
    children,
    accent = 'gold',
    interactive = true,
    spotlight,
    padding = { xs: 3, md: 4 },
    radius = 20,
    intensity = 'default',
    glow = true,
    component = 'div',
    sx,
    ...props
  },
  ref,
) {
  const strong = intensity === 'strong';
  // Gated here as well as in the hook, so touch and reduced-motion clients do
  // not carry a spotlight layer per card that can never light up.
  const allowed = useLightingEnabled();
  const lit = (spotlight ?? interactive) && allowed;
  const spotRef = usePointerSpotlight({ enabled: lit });

  /** The spotlight needs the node, and so may the caller. */
  const setRefs = useCallback(
    (node) => {
      spotRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref, spotRef],
  );

  return (
    <Box
      ref={setRefs}
      component={component}
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        p: padding,
        borderRadius: `${radius}px`,
        overflow: 'hidden',
        isolation: 'isolate',
        background: strong
          ? 'linear-gradient(158deg, rgba(255,255,255,0.062) 0%, rgba(255,255,255,0.016) 48%, rgba(255,255,255,0.038) 100%)'
          : theme.ef.gradients.panel,
        backgroundColor: 'rgba(10, 13, 18, 0.5)',
        boxShadow: theme.ef.shadows.card,
        transition: `transform ${theme.ef.motion.settle}, box-shadow ${theme.ef.motion.settle}, background 480ms ease`,

        /* Promoted only while the pointer is on it. `will-change: transform`
           left on permanently gave every interactive card its own compositor
           layer for a 2px hover nudge — ~80 of them across the page, which the
           compositor then had to carry on every frame. Hoisting it into the
           hover state keeps the same movement and lets the layer exist for the
           fraction of a second it is needed. */
        ...(interactive && { '&:hover': { willChange: 'transform' } }),

        // Gradient hairline border. The accent stop brightens under the cursor
        // via `--ef-spot-o`, so the edge picks up the light with the face.
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: `linear-gradient(150deg, ${alphaOf(accent, 0.34)} 0%, rgba(255,255,255,0.09) 26%, rgba(255,255,255,0.03) 56%, ${alphaOf(accent, 0.16)} 100%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          transition: `opacity 520ms ${theme.ef.easings.css.luxe}`,
          zIndex: 2,
        },

        // Accent bloom
        '&::after': glow
          ? {
              content: '""',
              position: 'absolute',
              top: -1,
              left: '12%',
              right: '12%',
              height: 130,
              background: `radial-gradient(60% 100% at 50% 0%, ${alphaOf(accent, 0.2)} 0%, transparent 72%)`,
              opacity: 0,
              transition: `opacity 620ms ${theme.ef.easings.css.luxe}`,
              pointerEvents: 'none',
              zIndex: 0,
            }
          : undefined,

        ...(lit && {
          '& > .ef-spot': {
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: 'var(--ef-spot-o, 0)',
            transition: 'opacity 480ms ease',
            background: `radial-gradient(240px circle at var(--ef-spot-x, 50%) var(--ef-spot-y, 50%), ${alphaOf(accent, 0.14)} 0%, ${alphaOf(accent, 0.05)} 32%, transparent 62%)`,
          },
        }),

        ...(interactive && {
          '@media (hover: hover)': {
            '&:hover': {
              transform: 'translateY(-6px)',
              background: theme.ef.gradients.panelHover,
              boxShadow: `${theme.ef.shadows.lifted}, 0 30px 70px -40px ${alphaOf(accent, 0.5)}`,
            },
            '&:hover::after': { opacity: 1 },
            // The bezelled icon rises with the card and catches more light,
            // so the two read as one object rather than a badge on a panel.
            '&:hover .ef-tile': {
              transform: 'translateY(-2px)',
              borderColor: alphaOf(accent, 0.44),
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -8px 18px -12px ${alphaOf(accent, 0.75)}, 0 10px 24px -16px ${alphaOf(accent, 0.6)}`,
            },
          },
        }),

        '& > *': { position: 'relative', zIndex: 1 },
        ...sx,
      })}
      {...props}
    >
      {lit && <Box className="ef-spot" aria-hidden />}
      {children}
    </Box>
  );
});

export default GlassCard;
