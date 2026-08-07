import { memo } from 'react';
import Box from '@mui/material/Box';
import useCountUp from '../../hooks/useCountUp';
import { fontFamilies } from '../../theme/typography';

const groupDigits = (n) => n.toLocaleString('en-US');

/**
 * Tabular-figure counter that animates once on entry.
 * `tabular-nums` keeps the glyph width fixed so the layout never jitters mid-count.
 */
function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1900,
  delay = 0,
  format = groupDigits,
  component = 'span',
  sx,
  ...props
}) {
  const { ref, value: current } = useCountUp(value, { duration, decimals, delay });
  const display = decimals > 0 ? current.toFixed(decimals) : format(Math.round(current));

  return (
    <Box
      ref={ref}
      component={component}
      sx={{
        fontFamily: fontFamilies.display,
        fontVariantNumeric: 'tabular-nums',
        fontFeatureSettings: '"tnum" 1',
        letterSpacing: '-0.03em',
        ...sx,
      }}
      {...props}
    >
      {prefix}
      {display}
      {suffix}
    </Box>
  );
}

export default memo(AnimatedNumber);
