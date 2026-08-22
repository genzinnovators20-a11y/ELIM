import { memo, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuRounded from '@mui/icons-material/MenuRounded';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import MobileNav from './MobileNav';
import useActiveSection from '../hooks/useActiveSection';
import { scrollToTarget, jumpToTop } from '../hooks/useSmoothScroll';
import { primaryNav, authNav, navSectionIds } from '../constants/nav';
import { fontFamilies } from '../theme/typography';

function NavItem({ item, active, onActivate }) {
  return (
    <Box
      component={RouterLink}
      to={item.to}
      onClick={(event) => onActivate(event, item)}
      aria-current={active ? 'true' : undefined}
      sx={{
        position: 'relative',
        px: 1.75,
        py: 1,
        fontFamily: fontFamilies.mono,
        fontSize: '0.6875rem',
        letterSpacing: '0.18em',
        color: active ? 'text.primary' : (t) => t.ef.text.tertiary,
        transition: (t) => `color 380ms ${t.ef.easings.css.luxe}`,
        whiteSpace: 'nowrap',
        borderRadius: 1,
        '&:hover': { color: 'text.primary' },
        '&:hover .nav-dot': { opacity: 0.5, transform: 'scale(1)' },
      }}
    >
      {item.label}

      {/*
        Indicator rail.

        Centring is done by layout, never by a transform on the indicator
        itself: a flex row plus a fixed-size slot centres the bar at any
        viewport width with no measured pixels.

        The gold bar used to be a single element that framer-motion's
        shared-layout projection flew between entries. That is a lovely effect
        and it cost the whole animation runtime to be resident for it. Every
        entry now owns its own bar and fades and scales it in place; the eye
        reads a marker moving along the rail either way, because the entries are
        adjacent and the crossfade is faster than the saccade between them.

        `scaleX` grows the bar out of its own centre, so the two ends arrive
        together rather than the bar unrolling from the left.
      */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 2,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ position: 'relative', width: 18, height: '2px' }}>
          <Box
            className="nav-dot"
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.4)',
              opacity: 0,
              transform: 'scale(0.4)',
              transition: (t) => `opacity 380ms ${t.ef.easings.css.luxe}, transform 380ms ${t.ef.easings.css.luxe}`,
            }}
          />
          <Box
            sx={(t) => ({
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              background: t.ef.gradients.goldFill,
              boxShadow: '0 0 12px rgba(212,175,55,0.7)',
              opacity: active ? 1 : 0,
              transform: active ? 'scaleX(1)' : 'scaleX(0.3)',
              transition: `opacity 260ms ${t.ef.easings.css.soft}, transform 380ms ${t.ef.easings.css.luxe}`,
            })}
          />
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Fixed navigation for a single landing page.
 *
 * Every primary entry is an in-page anchor. Links stay real `<a href>` elements
 * via RouterLink — so middle-click, copy-link and the browser's history all
 * behave — while the click handler drives the smooth scroll directly, which also
 * covers re-clicking the entry you are already on (no location change, so no
 * router event would fire).
 */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(null);
  const { pathname } = useLocation();

  const onHome = pathname === '/';
  const activeSection = useActiveSection(navSectionIds);

  /*
   * The bar gains its glass once the page has moved off the top.
   *
   * One passive listener with a hysteresis band, rather than framer-motion's
   * `useScroll` + `useMotionValueEvent`. The band matters more than the
   * listener: without it, a reader parked at exactly 24px — which momentum
   * scrolling makes easy to land on — toggles `backdrop-filter: blur(22px)`
   * across the full width of the viewport on alternate frames, and each toggle
   * is a fresh backdrop rasterisation. React state is only written when the
   * answer actually changes.
   */
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 12 : y > 32));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close the sheet whenever the route changes — including browser back/forward,
  // which never passes through a link's onClick. Adjusting state during render
  // is the supported pattern for deriving state from a prop change.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  const handleActivate = useCallback(
    (event, item) => {
      if (!onHome) return; // let the router navigate, then ScrollManager lands it
      event.preventDefault();
      if (item.id === 'home') jumpToTop({ smooth: true });
      else scrollToTarget(`#${item.id}`);
      window.history.replaceState(null, '', item.to);
    },
    [onHome],
  );

  return (
    <>
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 2000,
          px: 2,
          py: 1,
          borderRadius: 2,
          background: '#0D1117',
          border: '1px solid rgba(212,175,55,0.5)',
          color: 'text.primary',
          fontSize: '0.875rem',
          transform: 'translateY(-160%)',
          transition: 'transform 240ms ease',
          '&:focus-visible': { transform: 'translateY(0)' },
        }}
      >
        Skip to content
      </Box>

      <Box
        component="header"
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.ef.zIndex.nav,
          height: 'var(--ef-nav-h)',
          display: 'flex',
          alignItems: 'center',
          transition: `background-color 520ms ${theme.ef.easings.css.luxe}, border-color 520ms ease, backdrop-filter 520ms ease`,
          backgroundColor: scrolled ? 'rgba(6, 8, 12, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${scrolled ? theme.ef.borders.hairline : 'transparent'}`,
          boxShadow: scrolled ? theme.ef.shadows.nav : 'none',
        })}
      >
        <Container sx={{ maxWidth: (t) => t.ef.layout.maxWidthWide }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Logo size={{ xs: 40, md: 48 }} onClick={onHome ? () => jumpToTop({ smooth: true }) : undefined} />

            <Box
              component="nav"
              aria-label="Primary"
              sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 999,
                  border: (t) => `1px solid ${scrolled ? 'transparent' : t.ef.borders.hairline}`,
                  background: scrolled ? 'transparent' : 'rgba(255,255,255,0.022)',
                  backdropFilter: scrolled ? 'none' : 'blur(12px)',
                  transition: (t) => `all 520ms ${t.ef.easings.css.luxe}`,
                }}
              >
                {primaryNav.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    active={onHome && activeSection === item.id}
                    onActivate={handleActivate}
                  />
                ))}
              </Stack>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Button
                component={RouterLink}
                to={authNav[0].to}
                variant="text"
                size="small"
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  fontFamily: fontFamilies.mono,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.18em',
                }}
              >
                {authNav[0].label}
              </Button>

              <Button
                component={RouterLink}
                to={authNav[1].to}
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  fontFamily: fontFamilies.mono,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  px: 2.5,
                }}
              >
                {authNav[1].label}
              </Button>

              <IconButton
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                sx={{
                  display: { xs: 'inline-flex', lg: 'none' },
                  border: (t) => `1px solid ${t.ef.borders.hairline}`,
                  borderRadius: 2,
                  width: 40,
                  height: 40,
                }}
              >
                <MenuRounded sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={onHome ? activeSection : null}
        onHome={onHome}
      />
    </>
  );
}

export default memo(Navbar);
