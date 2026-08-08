import { text } from './tokens';

export const fontFamilies = {
  display: '"Sora Variable", "Sora", "Segoe UI", system-ui, -apple-system, sans-serif',
  body: '"Manrope Variable", "Manrope", "Segoe UI", system-ui, -apple-system, sans-serif',
  serif: '"Instrument Serif", "Times New Roman", Georgia, serif',
  mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace',
};

/** Fluid type scale — clamp() keeps hierarchy intact from 360px to ultra-wide. */
const fluid = (min, max, minVw = 360, maxVw = 1600) => {
  const slope = (max - min) / (maxVw - minVw);
  const intercept = min - slope * minVw;
  return `clamp(${min / 16}rem, ${(intercept / 16).toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${max / 16}rem)`;
};

/**
 * Optical tracking. Letterforms need progressively less space between them as
 * they grow — type set at 96px with the tracking of 16px type reads loose and
 * cheap. These are the values the display scale steps through, tightest at the
 * top, opening back out to positive tracking for small uppercase labels.
 */
export const tracking = {
  display: '-0.042em',
  hero: '-0.038em',
  tight: '-0.032em',
  snug: '-0.026em',
  normal: '-0.018em',
  relaxed: '-0.008em',
  flat: '0em',
  label: '0.14em',
  kicker: '0.24em',
};

/**
 * Leading. Display type is set solid or near-solid so large headings hold
 * together as a shape; body copy opens up to 1.72–1.75 for sustained reading.
 */
export const leading = {
  solid: 0.98,
  display: 1.06,
  heading: 1.16,
  snug: 1.34,
  body: 1.72,
  prose: 1.78,
};

const display = (min, max, extra = {}) => ({
  fontFamily: fontFamilies.display,
  fontSize: fluid(min, max),
  fontWeight: 600,
  color: text.primary,
  textWrap: 'balance',
  ...extra,
});

export const typography = {
  fontFamily: fontFamilies.body,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  /**
   * Display — reserved for the hero and chapter openers. The upper bounds match
   * the sizes the design already lands on; what the variants add is one optical
   * tracking curve and one leading rule instead of four hand-tuned copies.
   */
  display1: display(52, 136, {
    fontWeight: 700,
    lineHeight: 0.94,
    letterSpacing: tracking.display,
  }),
  display2: display(44, 104, {
    fontWeight: 700,
    lineHeight: leading.solid,
    letterSpacing: tracking.hero,
  }),

  /* ── Headings ───────────────────────────────────────────────────── */
  h1: display(40, 92, { lineHeight: 1.03, letterSpacing: tracking.hero }),
  h2: display(30, 62, { lineHeight: leading.display, letterSpacing: tracking.tight }),
  h3: display(24, 42, { lineHeight: leading.heading, letterSpacing: tracking.snug }),
  h4: display(20, 30, { lineHeight: 1.24, letterSpacing: tracking.normal }),
  h5: display(17, 22, { lineHeight: leading.snug, letterSpacing: '-0.012em' }),
  h6: display(15, 18, { lineHeight: 1.42, letterSpacing: tracking.relaxed }),

  /* ── Supporting copy ────────────────────────────────────────────── */
  subtitle1: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(17, 22),
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: '-0.012em',
    color: text.secondary,
    textWrap: 'pretty',
  },
  subtitle2: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(15, 17),
    lineHeight: 1.6,
    fontWeight: 500,
    letterSpacing: '-0.006em',
    color: text.secondary,
    textWrap: 'pretty',
  },

  body1: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(15.5, 17.5),
    lineHeight: leading.body,
    fontWeight: 400,
    letterSpacing: '-0.004em',
    color: text.secondary,
    textWrap: 'pretty',
  },
  body2: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(14, 15.5),
    lineHeight: 1.7,
    fontWeight: 400,
    letterSpacing: '-0.002em',
    color: text.secondary,
    textWrap: 'pretty',
  },

  caption: {
    fontFamily: fontFamilies.body,
    fontSize: '0.8125rem',
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: tracking.flat,
    color: text.muted,
  },

  /** Technical kicker — mono, uppercase, wide tracking. The institutional signature. */
  overline: {
    fontFamily: fontFamilies.mono,
    fontSize: '0.6875rem',
    lineHeight: 1,
    fontWeight: 500,
    letterSpacing: tracking.kicker,
    textTransform: 'uppercase',
    color: text.muted,
  },

  /**
   * Figures. `tabular-nums` locks every digit to the same advance width, so
   * counting animations and stat rows stop shivering as the numbers change.
   */
  stat: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(30, 58),
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: tracking.tight,
    fontVariantNumeric: 'tabular-nums',
    color: text.primary,
  },
  statSm: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(22, 32),
    lineHeight: 1.05,
    fontWeight: 600,
    letterSpacing: tracking.normal,
    fontVariantNumeric: 'tabular-nums',
    color: text.primary,
  },

  /**
   * Editorial voice — the serif is used sparingly, for statements only.
   *
   * Three steps because the design genuinely has three roles for it: the single
   * emphatic line that closes an argument, the standard statement, and the
   * supporting line that sits under a heading without competing with it. Naming
   * them here is what stops the same sentence being set at 2.4rem in one
   * section and 3.5rem two sections later.
   */
  quoteLg: {
    fontFamily: fontFamilies.serif,
    fontSize: fluid(30, 67),
    lineHeight: 1.08,
    fontWeight: 400,
    letterSpacing: '-0.02em',
    color: text.primary,
    textWrap: 'balance',
  },
  quote: {
    fontFamily: fontFamilies.serif,
    fontSize: fluid(26, 50),
    lineHeight: 1.16,
    fontWeight: 400,
    letterSpacing: '-0.015em',
    color: text.primary,
    textWrap: 'balance',
  },
  quoteSm: {
    fontFamily: fontFamilies.serif,
    fontSize: fluid(22, 38),
    lineHeight: 1.22,
    fontWeight: 400,
    letterSpacing: '-0.012em',
    color: text.primary,
    textWrap: 'balance',
  },

  /** Data and addresses — mono, tabular, never wrapped mid-token. */
  mono: {
    fontFamily: fontFamilies.mono,
    fontSize: '0.8125rem',
    lineHeight: 1.6,
    fontWeight: 500,
    letterSpacing: '0.02em',
    fontVariantNumeric: 'tabular-nums',
    color: text.secondary,
  },

  button: {
    fontFamily: fontFamilies.body,
    fontSize: '0.9375rem',
    fontWeight: 600,
    letterSpacing: '-0.004em',
    textTransform: 'none',
    lineHeight: 1,
  },
};

/** Semantic element for each custom variant, so styling never dictates markup. */
export const variantMapping = {
  display1: 'h1',
  display2: 'h2',
  stat: 'p',
  statSm: 'p',
  quoteLg: 'p',
  quote: 'p',
  quoteSm: 'p',
  mono: 'p',
};

export { fluid };
