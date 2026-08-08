import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';
import {
  radii,
  shadows,
  easings,
  durations,
  motion,
  gradients,
  borders,
  surfaces,
  colors,
  text,
  blur,
  layout,
  zIndex,
  alpha,
  elevation,
} from './tokens';
import { tracking, leading } from './typography';

/**
 * `responsiveFontSizes` is deliberately not applied: the type scale is already
 * fluid via clamp(), and the helper cannot parse clamp() values.
 */
export const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: radii.md },
  spacing: 8,
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, xxl: 1920 },
  },
  components,

  /** Custom namespace — every bespoke token reachable from any `sx` callback. */
  ef: {
    colors,
    text,
    borders,
    surfaces,
    gradients,
    radii,
    blur,
    shadows,
    easings,
    durations,
    motion,
    layout,
    zIndex,
    alpha,
    elevation,
    tracking,
    leading,
  },
});

export default theme;
