import { memo, useCallback } from 'react';
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
  /*
   * The affix spans are rendered by React; the figure between them is written by
   * the frame loop. Splitting it this way is what lets the count run without a
   * render per frame — see `useCountUp` — and it keeps the prefix and suffix
   * under React's control, where they belong.
   */
  const formatValue = useCallback(
    (n) => (decimals > 0 ? n.toFixed(decimals) : format(Math.round(n))),
    [decimals, format],
  );
  const { ref } = useCountUp(value, { duration, decimals, delay, format: formatValue });

  return (
    <Box
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
      {/*
        Deliberately childless: `useCountUp` writes this element's text, and it
        can only do that safely if React has no opinion about what belongs here.
        `tabular-nums` above keeps the glyph width fixed, so the figure changing
        every frame never reflows the line around it.
      */}
      <Box component="span" ref={ref} />
      {suffix}
    </Box>
  );
}

export default memo(AnimatedNumber);
