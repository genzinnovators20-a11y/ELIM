import { lazy, Suspense, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import BrandArt from '../brand/BrandArt';
import ForgeRings from '../visuals/ForgeRings';

const CoinScene = lazy(() => import('./CoinScene'));

const supportsWebGL = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
};

/**
 * Progressive 3D: the brand artwork renders instantly, then the WebGL coin
 * fades in once the browser is idle — but only on capable, non-touch, non
 * reduced-motion devices. Everywhere else the vector coin simply stays.
 */
export default function CoinStage({ height = 520, sx }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isDesktop || prefersReduced || !supportsWebGL()) return undefined;

    // Bound explicitly — calling window.requestIdleCallback detached from its
    // receiver throws "Illegal invocation".
    const hasIdle = typeof window.requestIdleCallback === 'function';
    const handle = hasIdle
      ? window.requestIdleCallback(() => setEnabled(true), { timeout: 2400 })
      : window.setTimeout(() => setEnabled(true), 900);

    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [isDesktop, prefersReduced]);

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: height, ...sx }}>
      <Box sx={{ position: 'absolute', inset: '-6%' }}>
        <ForgeRings />
      </Box>

      {enabled ? (
        <Suspense fallback={null}>
          <Box
            sx={{
              position: 'relative',
              animation: 'ef-fade-in 900ms cubic-bezier(0.16,1,0.3,1) both',
              '@keyframes ef-fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
            }}
          >
            <CoinScene height={height} />
          </Box>
        </Suspense>
      ) : (
        <Box
          sx={{
            position: 'relative',
            height,
            display: 'grid',
            placeItems: 'center',
            px: '14%',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 46px rgba(212,175,55,0.28))',
          }}
        >
          <BrandArt asset="coin" priority />
        </Box>
      )}
    </Box>
  );
}
