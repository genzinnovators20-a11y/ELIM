/**
 * Design tokens — the single source of truth for the ELIM FORGE visual language.
 * Everything downstream (MUI theme, CSS custom properties, canvas + WebGL layers)
 * reads from here so the identity stays consistent across rendering technologies.
 */

export const colors = {
  // Foundations — luxury black through gunmetal
  obsidian: '#05070A',
  ink: '#080B10',
  graphite: '#0D1117',
  gunmetal: '#141A22',
  steel: '#1C2430',
  slate: '#28323F',

  // Deep navy
  navy: '#0A1626',
  navyDeep: '#06101D',
  navyLift: '#122238',

  // Dark emerald
  emeraldDeep: '#052A21',
  emeraldShade: '#0A3D30',
  emerald: '#1FB98A',
  emeraldSoft: '#3FDCAB',

  // Premium gold
  goldDeep: '#8C6716',
  goldCore: '#C9A227',
  gold: '#D4AF37',
  goldLight: '#EFD98F',
  goldPale: '#F8EFCF',

  // Accents
  blue: '#4C8DFF',
  blueDeep: '#1E4FB0',
  blueSoft: '#8FB8FF',
  cyan: '#63C9EC',
  iris: '#8E7BF0',

  // Signal
  danger: '#E5484D',
  warning: '#E8A33D',

};

/** Text ramp — kept separate so it can be tuned independently for contrast audits. */
export const text = {
  primary: '#EDF1F7',
  secondary: '#A3AEBE',
  tertiary: '#7A8698',
  muted: '#6E7A8C',
  disabled: '#4E5866',
  onGold: '#0A0A0A',
};

export const surfaces = {
  base: colors.obsidian,
  raised: 'rgba(255, 255, 255, 0.022)',
  raisedStrong: 'rgba(255, 255, 255, 0.038)',
  sunken: 'rgba(0, 0, 0, 0.32)',
  glass: 'rgba(13, 17, 23, 0.55)',
  glassStrong: 'rgba(10, 13, 18, 0.78)',
};

export const borders = {
  hairline: 'rgba(255, 255, 255, 0.07)',
  soft: 'rgba(255, 255, 255, 0.11)',
  strong: 'rgba(255, 255, 255, 0.17)',
  gold: 'rgba(212, 175, 55, 0.34)',
  goldSoft: 'rgba(212, 175, 55, 0.16)',
  emerald: 'rgba(31, 185, 138, 0.28)',
  blue: 'rgba(76, 141, 255, 0.26)',
};

export const gradients = {
  goldText: 'linear-gradient(103deg, #F8EFCF 0%, #E3C765 26%, #D4AF37 52%, #A67C1C 82%, #EFD98F 100%)',
  goldLine: 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.85) 50%, rgba(212,175,55,0) 100%)',
  goldFill: 'linear-gradient(135deg, #EFD98F 0%, #D4AF37 45%, #9A7420 100%)',
  chrome: 'linear-gradient(140deg, #FFFFFF 0%, #C7D0DC 22%, #7E8B9C 48%, #E7EDF5 68%, #98A5B6 100%)',
  emeraldFill: 'linear-gradient(135deg, #3FDCAB 0%, #1FB98A 50%, #0A3D30 100%)',
  blueFill: 'linear-gradient(135deg, #8FB8FF 0%, #4C8DFF 48%, #1E4FB0 100%)',
  panel: 'linear-gradient(160deg, rgba(255,255,255,0.048) 0%, rgba(255,255,255,0.012) 46%, rgba(255,255,255,0.028) 100%)',
  panelHover: 'linear-gradient(160deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.02) 46%, rgba(255,255,255,0.045) 100%)',
  hairlineTop: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)',
};

/**
 * Overlay opacity ramp. Every translucent white in the UI comes from here, so
 * "one step brighter" is a decision the system makes once rather than a number
 * invented per component.
 */
export const alpha = {
  faint: 0.02,
  subtle: 0.035,
  soft: 0.055,
  medium: 0.08,
  strong: 0.12,
  bold: 0.18,
};

const white = (a) => `rgba(255, 255, 255, ${a})`;

/**
 * Elevation ladder — surface, border and shadow always move together.
 * A card that steps up in light also steps up in edge definition and cast
 * shadow, which is what makes layering read as physical rather than painted.
 */
export const elevation = {
  0: {
    background: 'transparent',
    border: 'transparent',
    shadow: 'none',
  },
  1: {
    background: `linear-gradient(158deg, ${white(alpha.subtle)} 0%, ${white(alpha.faint)} 52%, ${white(alpha.soft)} 100%)`,
    border: white(0.07),
    shadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 18px 44px -28px rgba(0,0,0,0.85)',
  },
  2: {
    background: `linear-gradient(158deg, ${white(alpha.soft)} 0%, ${white(alpha.subtle)} 48%, ${white(alpha.medium)} 100%)`,
    border: white(0.11),
    shadow: '0 1px 0 rgba(255,255,255,0.08) inset, 0 30px 70px -34px rgba(0,0,0,0.92)',
  },
  3: {
    background: `linear-gradient(158deg, ${white(alpha.medium)} 0%, ${white(alpha.soft)} 46%, ${white(alpha.strong)} 100%)`,
    border: white(0.17),
    shadow:
      '0 1px 0 rgba(255,255,255,0.1) inset, 0 44px 100px -40px rgba(0,0,0,0.96), 0 0 0 1px rgba(255,255,255,0.04)',
  },
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
  pill: 999,
};

export const blur = {
  sm: 'blur(8px)',
  md: 'blur(18px)',
  lg: 'blur(32px)',
  xl: 'blur(64px)',
};

export const shadows = {
  soft: '0 1px 2px rgba(0,0,0,0.36), 0 8px 24px -12px rgba(0,0,0,0.6)',
  card: '0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 60px -32px rgba(0,0,0,0.9)',
  lifted:
    '0 1px 0 rgba(255,255,255,0.08) inset, 0 32px 80px -28px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.05)',
  gold: '0 18px 60px -24px rgba(212,175,55,0.45)',
  emerald: '0 18px 60px -24px rgba(31,185,138,0.4)',
  nav: '0 12px 40px -20px rgba(0,0,0,0.9)',
};

export const easings = {
  /** Signature ease — long, confident deceleration. */
  luxe: [0.16, 1, 0.3, 1],
  soft: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  entrance: [0.33, 1, 0.68, 1],
  css: {
    luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
    soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
};

export const durations = {
  /** Pointer feedback — must land inside the ~100ms perception window. */
  press: 0.12,
  hover: 0.24,
  fast: 0.24,
  base: 0.5,
  slow: 0.9,
  cinematic: 1.4,
};

/**
 * Interaction timings as CSS strings. Hover states resolve fast and settle
 * slowly: the eye reads the response immediately, the surface keeps moving.
 */
export const motion = {
  hover: `${durations.hover * 1000}ms ${easings.css.soft}`,
  press: `${durations.press * 1000}ms ${easings.css.soft}`,
  settle: `620ms ${easings.css.luxe}`,
  sweep: `900ms ${easings.css.luxe}`,
};

export const layout = {
  navHeight: { xs: 64, md: 78 },
  maxWidth: 1320,
  maxWidthWide: 1560,
  /**
   * Section rhythm, expressed in px strings on purpose: these feed MUI's
   * spacing-aware `pt`/`pb` props, where a bare number would be multiplied by
   * the 8px spacing unit.
   */
  sectionY: { xs: '76px', sm: '100px', md: '132px', lg: '160px' },
  sectionYCompact: { xs: '52px', sm: '68px', md: '88px' },
  sectionYSpacious: { xs: '96px', sm: '128px', md: '168px', lg: '200px' },
  gutter: { xs: 20, sm: 28, md: 40, lg: 56 },

  /**
   * Reading measure. Long-form prose is capped in `ch` rather than `px` so the
   * line length tracks the font size instead of drifting with the viewport —
   * 66–72 characters is the band where continuous text stays comfortable.
   */
  measure: '68ch',
  measureTight: '54ch',
  measureWide: '76ch',
};

export const zIndex = {
  background: 0,
  content: 1,
  overlay: 20,
  nav: 1100,
  drawer: 1200,
  modal: 1300,
};
