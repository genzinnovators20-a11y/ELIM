import { colors } from '../theme/tokens';

/**
 * Named accent ramps.
 *
 * `light` / `base` / `deep` drive borders, glows and gauges; `mid` is the
 * darkest tone that still reads as its own hue on a black ground, and is what
 * chart segments terminate on so no slice collapses into the background.
 */
export const accents = {
  gold: { base: colors.gold, light: colors.goldLight, mid: '#B08526', deep: colors.goldDeep, rgb: '212, 175, 55' },
  goldLight: { base: colors.goldLight, light: colors.goldPale, mid: colors.gold, deep: colors.goldCore, rgb: '239, 217, 143' },
  emerald: { base: colors.emerald, light: colors.emeraldSoft, mid: '#128764', deep: colors.emeraldShade, rgb: '31, 185, 138' },
  blue: { base: colors.blue, light: colors.blueSoft, mid: '#3468CE', deep: colors.blueDeep, rgb: '76, 141, 255' },
  cyan: { base: colors.cyan, light: '#A6E4F6', mid: '#3E9DBE', deep: '#2A7F9E', rgb: '99, 201, 236' },
  iris: { base: colors.iris, light: '#B7ABF7', mid: '#6C5BD4', deep: '#5B4CB8', rgb: '142, 123, 240' },
  steel: { base: '#7C8AA0', light: '#AEBACB', mid: '#5C687A', deep: '#4A5566', rgb: '124, 138, 160' },
};

export const getAccent = (key = 'gold') => accents[key] ?? accents.gold;

export const alphaOf = (key, a) => `rgba(${getAccent(key).rgb}, ${a})`;
