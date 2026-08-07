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
  fast: 0.24,
  base: 0.5,
  slow: 0.9,
  cinematic: 1.4,
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
};

export const zIndex = {
  background: 0,
  content: 1,
  overlay: 20,
  nav: 1100,
  drawer: 1200,
  modal: 1300,
};
