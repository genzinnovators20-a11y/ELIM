import { memo } from 'react';
import Box from '@mui/material/Box';

/**
 * Gold hairline with a chevron notch at its centre — the separator from the
 * ELIM FORGE corporate card, rebuilt as a layout primitive.
 *
 * The rules are flexible boxes and the notch is a fixed-size SVG, so the chevron
 * never distorts however wide the rule is asked to be.
 */
function NotchedRule({ inset = 0, opacity = 0.55, sx }) {
  const line = (dir) => ({
    flex: 1,
    height: '1px',
    minWidth: 0,
    background: `linear-gradient(${dir}, rgba(212,175,55,0) 0%, rgba(212,175,55,0.28) 18%, rgba(212,175,55,0.8) 100%)`,
  });

  return (
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        mx: inset,
        opacity,
        ...sx,
      }}
    >
      <Box sx={line('90deg')} />
      <Box
        component="svg"
        width="20"
        height="11"
        viewBox="0 0 20 11"
        fill="none"
        sx={{ display: 'block', flexShrink: 0, mt: '-1px' }}
      >
        <path
          d="M0.5 0.5 L10 9 L19.5 0.5"
          stroke="rgba(212,175,55,0.9)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>
      <Box sx={line('270deg')} />
    </Box>
  );
}

export default memo(NotchedRule);
