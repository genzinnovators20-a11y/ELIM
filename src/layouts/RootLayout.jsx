import { Suspense, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundStage from '../components/background/BackgroundStage';
import ScrollProgress from '../components/ui/ScrollProgress';
import RouteFallback from '../components/ui/RouteFallback';
import useSmoothScroll, { scrollToTarget, jumpToTop } from '../hooks/useSmoothScroll';

/**
 * Resets scroll on navigation, and honours in-page hash targets.
 *
 * Cross-route hash links (footer → `/#roadmap`) arrive before the lazily loaded
 * destination route has mounted, so the anchor is polled for a bounded window
 * rather than resolved once and given up on.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      jumpToTop();
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    const selector = `#${CSS.escape(id)}`;
    let frame = 0;
    let cancelled = false;
    let lastTop = null;
    let stableFrames = 0;
    const deadline = performance.now() + 4000;

    /**
     * Wait for the anchor to exist *and* for its position to stop moving. A
     * freshly mounted route keeps growing for a few frames while web fonts and
     * aspect-ratio media resolve; scrolling on the first sighting lands short.
     */
    const attempt = () => {
      if (cancelled) return;
      const el = document.getElementById(id);

      if (el) {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
        stableFrames = top === lastTop ? stableFrames + 1 : 0;
        lastTop = top;
        if (stableFrames >= 3) {
          scrollToTarget(selector, { duration: 0.9 });
          return;
        }
      }

      if (performance.now() < deadline) frame = requestAnimationFrame(attempt);
      else if (el) scrollToTarget(selector, { duration: 0.9 });
    };

    jumpToTop();
    frame = requestAnimationFrame(attempt);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  return null;
}

export default function RootLayout() {
  useSmoothScroll();

  return (
    <Box sx={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <BackgroundStage />
      <ScrollManager />
      <Navbar />
      <ScrollProgress />

      <Box
        component="main"
        id="main"
        sx={{ position: 'relative', zIndex: 1, flex: 1, pt: 'var(--ef-nav-h)' }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </Box>
    </Box>
  );
}
