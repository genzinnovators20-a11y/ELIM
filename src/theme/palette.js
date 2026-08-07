import { colors, text, borders } from './tokens';

export const palette = {
  mode: 'dark',
  common: { black: colors.obsidian, white: '#FFFFFF' },

  primary: {
    main: colors.gold,
    light: colors.goldLight,
    dark: colors.goldDeep,
    contrastText: text.onGold,
  },
  secondary: {
    main: colors.emerald,
    light: colors.emeraldSoft,
    dark: colors.emeraldShade,
    contrastText: '#04140F',
  },
  info: {
    main: colors.blue,
    light: colors.blueSoft,
    dark: colors.blueDeep,
    contrastText: '#03080F',
  },
  success: {
    main: colors.emerald,
    light: colors.emeraldSoft,
    dark: colors.emeraldShade,
    contrastText: '#04140F',
  },
  warning: { main: colors.warning, contrastText: '#120C02' },
  error: { main: colors.danger, contrastText: '#FFFFFF' },

  background: {
    default: colors.obsidian,
    paper: colors.graphite,
  },
  text: {
    primary: text.primary,
    secondary: text.secondary,
    disabled: text.disabled,
  },
  divider: borders.hairline,

  action: {
    active: text.secondary,
    hover: 'rgba(255, 255, 255, 0.05)',
    hoverOpacity: 0.05,
    selected: 'rgba(255, 255, 255, 0.08)',
    disabled: text.disabled,
    disabledBackground: 'rgba(255, 255, 255, 0.06)',
    focus: 'rgba(212, 175, 55, 0.24)',
  },
};
