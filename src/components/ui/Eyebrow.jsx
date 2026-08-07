import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alphaOf } from '../../utils/accents';

/**
 * Technical kicker — mono uppercase label preceded by a short drawn rule.
 * The recurring signal that this is instrumentation, not marketing chrome.
 */
function Eyebrow({ children, accent = 'gold', align = 'left', sx, ...props }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        // Long kickers wrap rather than run off the viewport on narrow screens;
        // the rule stays pinned to the first line.
        alignItems: 'flex-start',
        gap: 1.5,
        maxWidth: '100%',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        ...sx,
      }}
      {...props}
    >
      <Box
        aria-hidden
        sx={{
          width: 28,
          height: 1,
          mt: '5px',
          flexShrink: 0,
          background: `linear-gradient(90deg, transparent, ${alphaOf(accent, 0.9)})`,
        }}
      />
      <Typography
        variant="overline"
        component="span"
        sx={{
          color: alphaOf(accent, 0.92),
          lineHeight: 1.7,
          letterSpacing: { xs: '0.16em', sm: '0.24em' },
          minWidth: 0,
        }}
      >
        {children}
      </Typography>
      {align === 'center' && (
        <Box
          aria-hidden
          sx={{
            width: 28,
            height: 1,
            mt: '5px',
            flexShrink: 0,
            background: `linear-gradient(270deg, transparent, ${alphaOf(accent, 0.9)})`,
          }}
        />
      )}
    </Box>
  );
}

export default memo(Eyebrow);
