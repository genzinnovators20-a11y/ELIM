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

export const typography = {
  fontFamily: fontFamilies.body,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // Display / headings — Sora, tight tracking, generous optical weight contrast
  h1: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(40, 92),
    lineHeight: 1.03,
    fontWeight: 600,
    letterSpacing: '-0.035em',
    color: text.primary,
  },
  h2: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(30, 62),
    lineHeight: 1.08,
    fontWeight: 600,
    letterSpacing: '-0.03em',
    color: text.primary,
  },
  h3: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(24, 42),
    lineHeight: 1.16,
    fontWeight: 600,
    letterSpacing: '-0.024em',
    color: text.primary,
  },
  h4: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(20, 30),
    lineHeight: 1.24,
    fontWeight: 600,
    letterSpacing: '-0.018em',
    color: text.primary,
  },
  h5: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(17, 22),
    lineHeight: 1.34,
    fontWeight: 600,
    letterSpacing: '-0.012em',
    color: text.primary,
  },
  h6: {
    fontFamily: fontFamilies.display,
    fontSize: fluid(15, 18),
    lineHeight: 1.42,
    fontWeight: 600,
    letterSpacing: '-0.008em',
    color: text.primary,
  },

  subtitle1: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(17, 22),
    lineHeight: 1.55,
    fontWeight: 400,
    letterSpacing: '-0.011em',
    color: text.secondary,
  },
  subtitle2: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(15, 17),
    lineHeight: 1.6,
    fontWeight: 500,
    letterSpacing: '-0.006em',
    color: text.secondary,
  },

  body1: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(15.5, 17.5),
    lineHeight: 1.75,
    fontWeight: 400,
    letterSpacing: '-0.004em',
    color: text.secondary,
  },
  body2: {
    fontFamily: fontFamilies.body,
    fontSize: fluid(14, 15.5),
    lineHeight: 1.72,
    fontWeight: 400,
    letterSpacing: '-0.002em',
    color: text.secondary,
  },

  caption: {
    fontFamily: fontFamilies.body,
    fontSize: '0.8125rem',
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: '0',
    color: text.muted,
  },

  /** Technical kicker — mono, uppercase, wide tracking. The institutional signature. */
  overline: {
    fontFamily: fontFamilies.mono,
    fontSize: '0.6875rem',
    lineHeight: 1,
    fontWeight: 500,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: text.muted,
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

export { fluid };
