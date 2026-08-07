import { forwardRef } from 'react';
import MuiStack from '@mui/material/Stack';
import MuiGrid from '@mui/material/Grid';

/**
 * Layout primitives.
 *
 * Material UI v9 removed system props from `Stack` and `Grid` — `justifyContent`,
 * `alignItems`, `flexWrap` and friends are no longer read from props and are
 * silently dropped. These wrappers hoist those props into `sx` so the familiar,
 * readable call sites keep working and every layout stays in one idiom.
 *
 * Anything not in the hoist list is forwarded untouched, so real component props
 * (`direction`, `spacing`, `divider`, `container`, `size`, `offset`, `wrap`, …)
 * behave exactly as documented.
 */
const HOISTED = new Set([
  'justifyContent',
  'alignItems',
  'alignContent',
  'alignSelf',
  'justifySelf',
  'flexWrap',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'flex',
  'order',
  'textAlign',
]);

const split = (props) => {
  const layout = {};
  const rest = {};
  Object.entries(props).forEach(([key, value]) => {
    if (HOISTED.has(key) && value !== undefined) layout[key] = value;
    else rest[key] = value;
  });
  return [layout, rest];
};

const mergeSx = (layout, sx) => {
  if (!Object.keys(layout).length) return sx;
  return Array.isArray(sx) ? [layout, ...sx] : [layout, sx];
};

export const Stack = forwardRef(function Stack({ sx, ...props }, ref) {
  const [layout, rest] = split(props);
  return <MuiStack ref={ref} sx={mergeSx(layout, sx)} {...rest} />;
});

export const Grid = forwardRef(function Grid({ sx, ...props }, ref) {
  const [layout, rest] = split(props);
  return <MuiGrid ref={ref} sx={mergeSx(layout, sx)} {...rest} />;
});

export default { Stack, Grid };
