import { colors, text, borders, radii, shadows, easings, gradients, surfaces, layout } from './tokens';
import { fontFamilies } from './typography';

const focusRing = {
  outline: 'none',
  boxShadow: `0 0 0 2px ${colors.obsidian}, 0 0 0 4px rgba(212, 175, 55, 0.62)`,
};

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      ':root': {
        '--ef-nav-h': `${layout.navHeight.xs}px`,
        '--ef-gold': colors.gold,
        '--ef-emerald': colors.emerald,
        '--ef-blue': colors.blue,
        '--ef-obsidian': colors.obsidian,
        colorScheme: 'dark',
      },
      '@media (min-width: 900px)': {
        ':root': { '--ef-nav-h': `${layout.navHeight.md}px` },
      },
      html: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        scrollBehavior: 'auto',
        // Anchor targets clear the fixed navigation bar.
        scrollPaddingTop: 'calc(var(--ef-nav-h) + 24px)',
        /**
         * Several decorative layers (forge rings, orbit nodes, glow fields) are
         * designed to bleed past their container, and rotating them grows their
         * bounding box. `clip` stops that from ever producing a sideways scroll
         * without turning the root into a scroll container the way `hidden` would.
         */
        overflowX: 'clip',
      },
      body: {
        backgroundColor: colors.obsidian,
        color: text.primary,
        overflowX: 'clip',
        fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
      },
      '#root': { isolation: 'isolate' },
      '::selection': {
        background: 'rgba(212, 175, 55, 0.26)',
        color: '#FFFFFF',
      },
      '*, *::before, *::after': { boxSizing: 'border-box' },
      'img, picture, video, canvas, svg': { display: 'block', maxWidth: '100%' },
      a: { color: 'inherit', textDecoration: 'none' },
      ':focus-visible': focusRing,

      // Refined scrollbar — Chromium + Firefox
      '*::-webkit-scrollbar': { width: 10, height: 10 },
      '*::-webkit-scrollbar-track': { background: colors.ink },
      '*::-webkit-scrollbar-thumb': {
        background: colors.steel,
        borderRadius: 999,
        border: `2px solid ${colors.ink}`,
      },
      '*::-webkit-scrollbar-thumb:hover': { background: colors.slate },
      '@supports (scrollbar-width: thin)': {
        html: { scrollbarWidth: 'thin', scrollbarColor: `${colors.steel} ${colors.ink}` },
      },

      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': {
          animationDuration: '0.001ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.001ms !important',
          scrollBehavior: 'auto !important',
        },
      },
    },
  },

  MuiContainer: {
    defaultProps: { maxWidth: false },
    styleOverrides: {
      root: ({ theme }) => ({
        width: '100%',
        maxWidth: layout.maxWidth,
        marginInline: 'auto',
        paddingInline: layout.gutter.xs,
        [theme.breakpoints.up('sm')]: { paddingInline: layout.gutter.sm },
        [theme.breakpoints.up('md')]: { paddingInline: layout.gutter.md },
        [theme.breakpoints.up('lg')]: { paddingInline: layout.gutter.lg },
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true, disableRipple: false },
    styleOverrides: {
      root: {
        borderRadius: radii.pill,
        paddingInline: 26,
        minHeight: 48,
        fontWeight: 600,
        position: 'relative',
        overflow: 'hidden',
        transition: `transform 320ms ${easings.css.luxe}, box-shadow 320ms ${easings.css.luxe}, background-color 260ms ease, border-color 260ms ease, color 260ms ease`,
        willChange: 'transform',
        '&:hover': { transform: 'translateY(-2px)' },
        '&:active': { transform: 'translateY(0)' },
        '&.Mui-focusVisible': focusRing,
      },
      sizeSmall: { minHeight: 40, paddingInline: 18, fontSize: '0.875rem' },
      sizeLarge: { minHeight: 56, paddingInline: 34, fontSize: '1rem' },
      containedPrimary: {
        background: gradients.goldFill,
        color: text.onGold,
        boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 12px 34px -16px rgba(212,175,55,0.7)',
        '&:hover': {
          background: 'linear-gradient(135deg, #F8EFCF 0%, #E0BF4C 45%, #A9832A 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.55) inset, 0 20px 46px -18px rgba(212,175,55,0.85)',
          transform: 'translateY(-2px)',
        },
      },
      containedSecondary: {
        background: gradients.emeraldFill,
        color: '#04140F',
        '&:hover': { filter: 'brightness(1.06)' },
      },
      outlined: {
        borderColor: borders.soft,
        background: surfaces.raised,
        backdropFilter: 'blur(10px)',
        color: text.primary,
        '&:hover': {
          borderColor: borders.gold,
          background: 'rgba(212, 175, 55, 0.07)',
          color: '#FFFFFF',
        },
      },
      text: {
        color: text.secondary,
        paddingInline: 12,
        '&:hover': { color: text.primary, background: 'transparent' },
      },
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: {
        color: text.secondary,
        transition: `color 240ms ease, background-color 240ms ease, transform 320ms ${easings.css.luxe}`,
        '&:hover': { color: text.primary, background: 'rgba(255,255,255,0.06)' },
        '&.Mui-focusVisible': focusRing,
      },
    },
  },

  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
      },
      outlined: {
        border: `1px solid ${borders.hairline}`,
        background: surfaces.glass,
        backdropFilter: 'blur(20px)',
      },
    },
  },

  MuiLink: {
    defaultProps: { underline: 'none' },
    styleOverrides: {
      root: {
        color: text.secondary,
        transition: 'color 220ms ease',
        '&:hover': { color: text.primary },
        '&.Mui-focusVisible': { ...focusRing, borderRadius: 4 },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilies.mono,
        fontSize: '0.6875rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        height: 28,
        borderRadius: radii.pill,
        border: `1px solid ${borders.hairline}`,
        background: surfaces.raised,
        color: text.secondary,
      },
      label: { paddingInline: 12 },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { borderColor: borders.hairline },
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: {
        background: 'rgba(10, 13, 18, 0.94)',
        border: `1px solid ${borders.soft}`,
        backdropFilter: 'blur(14px)',
        color: text.primary,
        fontSize: '0.8125rem',
        fontFamily: fontFamilies.body,
        padding: '8px 12px',
        borderRadius: radii.sm,
        boxShadow: shadows.soft,
      },
      arrow: { color: 'rgba(10, 13, 18, 0.94)' },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: radii.md,
        background: 'rgba(255,255,255,0.025)',
        transition: 'border-color 220ms ease, background-color 220ms ease',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: borders.hairline },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: borders.soft },
        '&.Mui-focused': { background: 'rgba(255,255,255,0.04)' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(212,175,55,0.55)',
          borderWidth: 1,
        },
      },
      input: {
        fontSize: '0.9375rem',
        padding: '15px 16px',
        '&::placeholder': { color: text.disabled, opacity: 1 },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem',
        color: text.muted,
        '&.Mui-focused': { color: colors.goldLight },
      },
    },
  },

  MuiFormControlLabel: {
    styleOverrides: {
      label: { fontSize: '0.875rem', color: text.secondary },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: borders.strong,
        '&.Mui-checked': { color: colors.gold },
      },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: { height: 3, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.06)' },
      bar: { borderRadius: 999, backgroundImage: gradients.goldFill },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        background: 'rgba(5, 7, 10, 0.94)',
        backdropFilter: 'blur(26px)',
        borderLeft: `1px solid ${borders.hairline}`,
        backgroundImage: 'none',
      },
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: { borderColor: borders.hairline },
    },
  },
};
