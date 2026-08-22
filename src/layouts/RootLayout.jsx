import { Suspense, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import useAfterPaint from '../hooks/useAfterPaint';
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
  const lastPathRef = useRef(null);

  useEffect(() => {
    const changedRoute = lastPathRef.current !== pathname;
    lastPathRef.current = pathname;

    if (!hash) {
      // A hash being cleared without leaving the page (e.g. the back button
      // stepping out of an anchor) should not yank the reader to the top.
      if (changedRoute) jumpToTop();
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

    // Only reset when arriving from another route: on the landing page the
    // anchor is already below us, and jumping to the top first would read as a
    // flicker before the smooth scroll.
    if (changedRoute) jumpToTop();
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

  /*
   * The footer waits for a frame.
   *
   * It sits at the bottom of a 22,000px document — nobody has ever seen it
   * during a page load — but it is a substantial piece of DOM in its own right:
   * a brand plate with artwork, four link columns, a contact rail and a social
   * rail. Rendering it into the first commit charges the reader for all of it
   * before the masthead can be drawn. One frame later costs nothing anyone can
   * observe, and it is not lazily *loaded* — the code is already in the entry
   * bundle, so it is there the moment the frame turns over.
   */
  const painted = useAfterPaint();

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
        {painted && <Footer />}
      </Box>
    </Box>
  );
}
