import { memo } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import useActiveSection from '../../hooks/useActiveSection';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { fontFamilies } from '../../theme/typography';

/** Stable identity, so the hook's effect does not re-run on every render. */
const EMPTY = [];

/**
 * Fixed left rail listing the anchors of the current page.
 * Desktop only — on smaller viewports the reading order already carries the map.
 */
function SectionRail({ sections = [] }) {
  /*
   * The rail is an extra-large-viewport affordance — below `xl` the reading
   * order already carries the map, and the CSS hid it. Hiding it in CSS still
   * mounted it, which meant every phone paid for an IntersectionObserver over
   * twenty-two anchors and a subscription that could never change anything
   * anyone could see. Asking first costs one media query.
   */
  const shown = useMediaQuery((t) => t.breakpoints.up('xl'), { noSsr: true });
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(shown ? ids : EMPTY);

  if (!shown || !sections.length) return null;

  return (
    <Box
      component="nav"
      aria-label="Section navigation"
      sx={{
        display: 'flex',
        position: 'fixed',
        left: 26,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 900,
        flexDirection: 'column',
        pointerEvents: 'auto',
      }}
    >
      <Stack spacing={1.75}>
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <Box
              key={id}
              component="button"
              type="button"
              onClick={() => scrollToTarget(`#${id}`)}
              aria-current={isActive ? 'true' : undefined}
              sx={{
                appearance: 'none',
                background: 'none',
                border: 0,
                p: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                color: isActive ? 'text.primary' : (t) => t.ef.text.disabled,
                transition: (t) => `color 420ms ${t.ef.easings.css.luxe}`,
                '&:hover': { color: 'text.secondary' },
                '&:hover .rail-label': { opacity: 1, transform: 'translateX(0)' },
                '&:focus-visible .rail-label': { opacity: 1, transform: 'translateX(0)' },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  width: isActive ? 22 : 12,
                  height: 2,
                  borderRadius: 999,
                  flexShrink: 0,
                  background: isActive
                    ? (t) => t.ef.gradients.goldFill
                    : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? '0 0 12px rgba(212,175,55,0.6)' : 'none',
                  transition: (t) => `all 520ms ${t.ef.easings.css.luxe}`,
                }}
              />
              <Typography
                className="rail-label"
                component="span"
                sx={{
                  fontFamily: fontFamilies.mono,
                  fontSize: '0.625rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  opacity: isActive ? 0.9 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                  transition: (t) => `all 420ms ${t.ef.easings.css.luxe}`,
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

export default memo(SectionRail);
