import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { alphaOf } from '../../utils/accents';

/**
 * The signature surface: a graphite glass panel with a gradient hairline border,
 * an inner top highlight and an accent bloom that lifts on hover.
 * Border gradients are painted with a masked pseudo-element so the radius stays
 * perfectly round at every corner.
 */
const GlassCard = forwardRef(function GlassCard(
  {
    children,
    accent = 'gold',
    interactive = true,
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

  return (
    <Box
      ref={ref}
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
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: theme.ef.shadows.card,
        transition: `transform 620ms ${theme.ef.easings.css.luxe}, box-shadow 620ms ${theme.ef.easings.css.luxe}, background 480ms ease`,
        willChange: interactive ? 'transform' : 'auto',

        // Gradient hairline border
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

        ...(interactive && {
          '@media (hover: hover)': {
            '&:hover': {
              transform: 'translateY(-6px)',
              background: theme.ef.gradients.panelHover,
              boxShadow: `${theme.ef.shadows.lifted}, 0 30px 70px -40px ${alphaOf(accent, 0.5)}`,
            },
            '&:hover::after': { opacity: 1 },
          },
        }),

        '& > *': { position: 'relative', zIndex: 1 },
        ...sx,
      })}
      {...props}
    >
      {children}
    </Box>
  );
});

export default GlassCard;
