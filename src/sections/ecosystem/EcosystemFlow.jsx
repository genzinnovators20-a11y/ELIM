import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Eyebrow from '../../components/ui/Eyebrow';
import Icon from '../../components/ui/Icon';
import BrandArt from '../../components/brand/BrandArt';
import { industries } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { easings, layout } from '../../theme/tokens';

const MotionPath = motion.path;

/** Node angles on a 100×100 field, for viewports wide enough to hold the ring. */
const ANGLES = [202, 338, 118, 62];

const toXY = (angle) => ({
  x: 50 + Math.cos((angle * Math.PI) / 180) * 36,
  y: 50 + Math.sin((angle * Math.PI) / 180) * 40,
});

/**
 * Narrow viewports get their own geometry rather than a squeezed copy of the
 * ring.
 *
 * The ring's lower pair sits at 118° and 62°, whose cosines are 0.47 against
 * the upper pair's 0.93 — so those two nodes are only half as far apart
 * horizontally as the ones above them. On a desktop that reads as a diamond; on
 * a phone the two cards are wider than the gap the angles leave and they simply
 * overlap, which is what the collision at the bottom of the figure was. Pulling
 * the radius in made it worse, because the cards do not shrink with it.
 *
 * The phone layout therefore states positions directly: four nodes at the
 * corners of a tall field with the coin holding the middle. Same concept, same
 * conduits, same reading order — a composition for the viewport it is in rather
 * than a compression of another one.
 */
const NARROW_NODES = [
  { x: 25, y: 17 },
  { x: 75, y: 17 },
  { x: 25, y: 83 },
  { x: 75, y: 83 },
];

/**
 * The ecosystem, drawn.
 *
 * ELM sits at the centre; the four real-world utility industries orbit it and
 * settlement pulses travel the conduits between them. Labels are the published
 * industry names only — the diagram shows structure, the copy elsewhere carries
 * the detail.
 */
export default function EcosystemFlow() {
  const [active, setActive] = useState(null);
  const reduced = useReducedMotion();
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const nodes = isNarrow ? NARROW_NODES : ANGLES.map(toXY);

  return (
    <Section id="flow" tone="contrast" density="compact">
      <Reveal variant="fadeUpSm">
        <Eyebrow accent="iris">Settlement Topology</Eyebrow>
      </Reveal>

      <Reveal variant="scale" delay={0.08}>
        <Box
          sx={{
            position: 'relative',
            mt: layout.stack.tight,
            /*
              The clearances in this figure are pixel quantities — card heights,
              the coin, its caption — while the field was sized purely by ratio,
              so whether they fitted at all depended on the viewport: below about
              1200px the ratio left the ring shorter than its own contents and
              the lower nodes rose into the coin's caption.
              
              Stated heights up to `lg`, ratio above it, where the ratio is
              already taller than the contents need. A `min-height` on the
              ratio box is the trap here rather than the fix: `aspect-ratio`
              resolves the other axis from whichever one is definite, so the
              floor inflates the *width* to keep 2.45:1 and the right-hand node
              is pushed straight out of the viewport.
            */
            height: { xs: 470, sm: 400, md: 440, lg: 'auto' },
            aspectRatio: { lg: '2.45 / 1' },
            maxWidth: 1120,
            mx: 'auto',
          }}
        >
          {/* Conduits */}
          <Box
            component="svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              {industries.items.map((item) => (
                <linearGradient key={item.label} id={`eco-${item.accent}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={alphaOf(item.accent, 0.06)} />
                  <stop offset="100%" stopColor={alphaOf(item.accent, 0.7)} />
                </linearGradient>
              ))}
            </defs>

            {industries.items.map((item, i) => {
              const { x, y } = nodes[i];
              const d = `M 50 50 Q ${(50 + x) / 2 + (y - 50) * 0.18} ${(50 + y) / 2 - (x - 50) * 0.18}, ${x} ${y}`;
              const isActive = active === i;
              return (
                <g key={item.label}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#eco-${item.accent})`}
                    strokeWidth={isActive ? 2 : 1}
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: 'stroke-width 380ms cubic-bezier(0.16,1,0.3,1)' }}
                  />
                  {!reduced && (
                    <MotionPath
                      d={d}
                      fill="none"
                      stroke={alphaOf(item.accent, 1)}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      pathLength={1}
                      strokeDasharray="0.06 0.94"
                      initial={{ strokeDashoffset: 1 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'linear', delay: i * 0.7 }}
                      style={{ filter: `drop-shadow(0 0 5px ${alphaOf(item.accent, 0.9)})` }}
                    />
                  )}
                </g>
              );
            })}
          </Box>

          {/* Core */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: 108, sm: 132, md: 156 },
              zIndex: 2,
            }}
          >
            <Box
              component={motion.div}
              animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              sx={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75)) drop-shadow(0 0 40px rgba(212,175,55,0.34))' }}
            >
              <BrandArt asset="coin" />
            </Box>
            <Typography
              sx={{
                mt: 1.5,
                textAlign: 'center',
                fontFamily: fontFamilies.mono,
                fontSize: '0.5625rem',
                letterSpacing: '0.22em',
                color: 'primary.light',
                whiteSpace: 'nowrap',
              }}
            >
              ELIM COIN · ELM
            </Typography>
          </Box>

          {/* Industry nodes */}
          {industries.items.map((item, i) => {
            const { x, y } = nodes[i];
            const isActive = active === i;
            return (
              /* The centring translate lives on this wrapper: framer-motion owns
                 the transform of the element it animates and would overwrite it. */
              <Box
                key={item.label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                sx={{
                  position: 'absolute',
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: `translate(-50%, -50%) translateY(${isActive ? -4 : 0}px)`,
                  transition: (t) => `transform 520ms ${t.ef.easings.css.luxe}`,
                  zIndex: isActive ? 4 : 3,
                  /* 44% leaves a real gutter between the two columns at every
                     phone width, and the cap stops them ballooning at 599px. */
                  width: { xs: '44%', sm: 168, md: 200 },
                  maxWidth: { xs: 200, sm: '46%' },
                }}
              >
                <Stack
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: easings.luxe, delay: 0.25 + i * 0.11 }}
                  spacing={1.25}
                  alignItems="center"
                  sx={{
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 1.75, md: 2.25 },
                    borderRadius: '16px',
                    textAlign: 'center',
                    cursor: 'default',
                    border: `1px solid ${isActive ? alphaOf(item.accent, 0.55) : 'rgba(255,255,255,0.09)'}`,
                    background: isActive
                      ? `linear-gradient(160deg, ${alphaOf(item.accent, 0.14)}, rgba(8,11,16,0.9))`
                      : 'rgba(10,13,18,0.82)',
                    boxShadow: isActive
                      ? `0 20px 50px -24px ${alphaOf(item.accent, 0.8)}`
                      : '0 18px 40px -26px rgba(0,0,0,0.9)',
                    transition: (t) =>
                      `border-color 520ms ${t.ef.easings.css.luxe}, background 520ms ${t.ef.easings.css.luxe}, box-shadow 520ms ${t.ef.easings.css.luxe}`,
                  }}
                >
                  <Box sx={{ color: alphaOf(item.accent, isActive ? 1 : 0.8), transition: 'color 420ms ease' }}>
                    <Icon name={item.icon} sx={{ fontSize: { xs: 22, md: 26 } }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.8125rem' },
                      fontWeight: 600,
                      letterSpacing: '-0.005em',
                      color: isActive ? 'text.primary' : 'text.secondary',
                      lineHeight: 1.35,
                      textWrap: 'balance',
                      transition: 'color 420ms ease',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Reveal>
    </Section>
  );
}
