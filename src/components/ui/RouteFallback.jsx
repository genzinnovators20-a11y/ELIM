import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const spin = keyframes`to { transform: rotate(360deg); }`;

/** Suspense placeholder for lazily-loaded routes. Height-stable, so no layout jump. */
export default function RouteFallback({ minHeight = '70vh' }) {
  return (
    <Box role="status" aria-label="Loading" sx={{ minHeight, display: 'grid', placeItems: 'center' }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.16)',
          borderTopColor: 'rgba(212,175,55,0.85)',
          animation: `${spin} 900ms linear infinite`,
          '@media (prefers-reduced-motion: reduce)': { animationDuration: '2400ms' },
        }}
      />
    </Box>
  );
}
