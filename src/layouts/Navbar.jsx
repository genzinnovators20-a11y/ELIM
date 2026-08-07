import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuRounded from '@mui/icons-material/MenuRounded';
import { NavLink, Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Logo from '../components/brand/Logo';
import MobileNav from './MobileNav';
import { primaryNav, authNav } from '../constants/nav';
import { fontFamilies } from '../theme/typography';

const MotionBox = motion.create(Box);

function NavItem({ item, active }) {
  return (
    <Box
      component={NavLink}
      to={item.to}
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
        '&:hover .nav-dot': { opacity: 0.5, transform: 'translateX(-50%) scale(1)' },
      }}
    >
      {item.label}
      {active && (
        <MotionBox
          layoutId="nav-active"
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          sx={{
            position: 'absolute',
            bottom: 2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 18,
            height: 2,
            borderRadius: 999,
            background: (t) => t.ef.gradients.goldFill,
            boxShadow: '0 0 12px rgba(212,175,55,0.7)',
          }}
        />
      )}
      <Box
        className="nav-dot"
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 2,
          left: '50%',
          transform: 'translateX(-50%) scale(0.4)',
          width: 18,
          height: 2,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.4)',
          opacity: 0,
          transition: (t) => `all 380ms ${t.ef.easings.css.luxe}`,
        }}
      />
    </Box>
  );
}

/**
 * Fixed navigation. Starts transparent over the hero and condenses into a
 * blurred graphite bar once the page moves — the standard institutional cue
 * that you have left the masthead.
 */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(null);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Close the sheet whenever the route changes — including browser back/forward,
  // which never passes through a link's onClick. Adjusting state during render
  // is the supported pattern for deriving state from a prop change.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

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
            <Logo size={38} />

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
                    key={item.to}
                    item={item}
                    active={item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)}
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

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default memo(Navbar);
