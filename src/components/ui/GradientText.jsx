import { memo } from 'react';
import Box from '@mui/material/Box';
import { gradients } from '../../theme/tokens';

const fills = {
  gold: gradients.goldText,
  chrome: gradients.chrome,
  emerald: 'linear-gradient(103deg, #B8F5DF 0%, #3FDCAB 40%, #1FB98A 72%, #9BEFD3 100%)',
  blue: 'linear-gradient(103deg, #D6E6FF 0%, #8FB8FF 38%, #4C8DFF 74%, #C3DBFF 100%)',
  ice: 'linear-gradient(103deg, #FFFFFF 0%, #D8E3F0 44%, #9DB0C6 100%)',
};

/**
 * Metallic text fill. Falls back to a solid colour where background-clip:text
 * is unsupported, so the words are never invisible.
 */
function GradientText({ children, fill = 'gold', component = 'span', sx, ...props }) {
  return (
    <Box
      component={component}
      sx={{
        color: fill === 'gold' ? 'primary.light' : 'text.primary',
        '@supports (-webkit-background-clip: text) or (background-clip: text)': {
          backgroundImage: fills[fill] ?? fills.gold,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default memo(GradientText);
