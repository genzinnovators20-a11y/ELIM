import { memo } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/brand/Logo';
import { scrollToTarget, jumpToTop } from '../hooks/useSmoothScroll';
import { primaryNav, authNav } from '../constants/nav';
import { fontFamilies } from '../theme/typography';
import { easings } from '../theme/tokens';

const MotionBox = motion.create(Box);

/**
 * Full-height navigation sheet for tablet and mobile.
 *
 * Anchors behave exactly as they do in the desktop bar: on the landing page the
 * click is intercepted and scrolled; anywhere else the router navigates and the
 * scroll manager lands the target once the page has mounted. The sheet closes
 * first either way, so the scroll happens against the real layout.
 */
function MobileNav({ open, onClose, activeSection, onHome }) {
  const handleActivate = (event, item) => {
    onClose();
    if (!onHome) return;
    event.preventDefault();
    window.history.replaceState(null, '', item.to);
    // Let the drawer's closing transition start before scrolling.
    window.requestAnimationFrame(() => {
      if (item.id === 'home') jumpToTop({ smooth: true });
      else scrollToTarget(`#${item.id}`);
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: false }}
      slotProps={{
        paper: {
          sx: { width: { xs: '100%', sm: 420 }, maxWidth: '100%' },
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(70% 40% at 100% 0%, rgba(212,175,55,0.1) 0%, transparent 64%), radial-gradient(60% 40% at 0% 100%, rgba(76,141,255,0.1) 0%, transparent 64%)',
            pointerEvents: 'none',
          }}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2.5, height: 'var(--ef-nav-h)', borderBottom: (t) => `1px solid ${t.ef.borders.hairline}` }}
        >
          <Logo size={34} showTag={false} />
          <IconButton onClick={onClose} aria-label="Close navigation menu">
            <CloseRounded />
          </IconButton>
        </Stack>

        <Box component="nav" aria-label="Mobile" sx={{ flex: 1, px: 2.5, pt: 4, overflowY: 'auto' }}>
          <Stack spacing={0.5}>
            {primaryNav.map((item, i) => {
              const active = activeSection === item.id;
              return (
                <MotionBox
                  key={item.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.6, ease: easings.luxe }}
                >
                  <Box
                    component={RouterLink}
                    to={item.to}
                    onClick={(event) => handleActivate(event, item)}
                    aria-current={active ? 'true' : undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 2,
                      borderBottom: (t) => `1px solid ${t.ef.borders.hairline}`,
                      color: active ? 'text.primary' : (t) => t.ef.text.tertiary,
                      transition: 'color 300ms ease',
                      '&:hover': { color: 'text.primary' },
                      '&:hover .go': { opacity: 1, transform: 'translate(2px, -2px)' },
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: fontFamilies.display,
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {item.label}
                    </Typography>
                    <ArrowOutwardRounded
                      className="go"
                      sx={{
                        fontSize: 18,
                        opacity: active ? 0.8 : 0.25,
                        transition: 'all 380ms ease',
                        color: active ? 'primary.main' : 'inherit',
                      }}
                    />
                  </Box>
                </MotionBox>
              );
            })}
          </Stack>
        </Box>

        <Stack spacing={1.25} sx={{ p: 2.5, borderTop: (t) => `1px solid ${t.ef.borders.hairline}` }}>
          <Button component={RouterLink} to={authNav[1].to} onClick={onClose} variant="contained" fullWidth size="large">
            {authNav[1].label}
          </Button>
          <Button component={RouterLink} to={authNav[0].to} onClick={onClose} variant="outlined" fullWidth size="large">
            {authNav[0].label}
          </Button>
          <Typography
            sx={{
              pt: 1,
              textAlign: 'center',
              fontFamily: fontFamilies.mono,
              fontSize: '0.5625rem',
              letterSpacing: '0.24em',
              color: (t) => t.ef.text.disabled,
            }}
          >
            FORGED WITH BLOCKCHAIN
          </Typography>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default memo(MobileNav);
