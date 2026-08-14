import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const spin = keyframes`to { transform: rotate(360deg); }`;

/**
 * Suspense placeholder for lazily-loaded routes.
 *
 * Fills the viewport rather than 70% of it. `<main>` is the only thing between
 * the navigation bar and the footer, so a short placeholder leaves the footer
 * sitting on the first screen; when the route resolves and `<main>` grows to
 * its real height, the footer is shoved thousands of pixels down and that
 * counts as one large layout shift. Reserving the full viewport keeps the
 * footer below the fold for the whole of the loading state, so the swap happens
 * off-screen and shifts nothing the reader can see.
 */
export default function RouteFallback({ minHeight = 'calc(100dvh - var(--ef-nav-h))' }) {
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
