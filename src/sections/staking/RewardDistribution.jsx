import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import BrandArt from '../../components/brand/BrandArt';
import ForgeRings from '../../components/visuals/ForgeRings';
import { rewardDistribution } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { easings } from '../../theme/tokens';

const MotionPath = motion.path;

const CHANNELS = [
  { x: 16.66, color: 'gold' },
  { x: 50, color: 'blue' },
  { x: 83.33, color: 'emerald' },
];

/** Distribution conduits from the ELM node down to each mechanism column. */
function FlowConnectors() {
  const reduced = useReducedMotion();

  return (
    <Box
      aria-hidden
      sx={{
        display: { xs: 'none', md: 'block' },
        height: 110,
        mt: -1,
        position: 'relative',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {CHANNELS.map((ch) => (
            <linearGradient key={ch.x} id={`flow-${ch.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={alphaOf(ch.color, 0.05)} />
              <stop offset="100%" stopColor={alphaOf(ch.color, 0.85)} />
            </linearGradient>
          ))}
        </defs>

        {CHANNELS.map((ch, i) => {
          const d = `M 50 0 C 50 46, ${ch.x} 54, ${ch.x} 100`;
          return (
            <g key={ch.x}>
              <path d={d} fill="none" stroke={`url(#flow-${ch.color})`} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              {!reduced && (
                <MotionPath
                  d={d}
                  fill="none"
                  stroke={alphaOf(ch.color, 1)}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="0.08 0.92"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: i * 0.55 }}
                  style={{ filter: `drop-shadow(0 0 6px ${alphaOf(ch.color, 0.9)})` }}
                />
              )}
            </g>
          );
        })}
      </Box>
    </Box>
  );
}

/**
 * Staking Synergies, Burning Strategies, & Reward Distribution.
 * Profits converge on the ELM node, then split into the three published
 * mechanisms — the diagram carries the structure, the copy carries the detail.
 */
export default function RewardDistribution() {
  const reduced = useReducedMotion();

  return (
    <Section id="rewards" tone="gold">
      <SectionHeading
        eyebrow="Value Return Loop"
        title={rewardDistribution.title}
        maxWidth={980}
      />

      <Reveal variant="fadeUp" delay={0.1}>
        <Typography
          component="p"
          sx={{
            mt: { xs: 3, md: 4 },
            maxWidth: 940,
            fontSize: { xs: '1.0625rem', md: '1.1875rem' },
            lineHeight: 1.8,
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'text.primary',
          }}
        >
          {rewardDistribution.lede}
        </Typography>
      </Reveal>

      {/* Convergence node */}
      <Reveal variant="scale" delay={0.14}>
        <Box sx={{ mt: { xs: 6, md: 9 }, display: 'grid', placeItems: 'center' }}>
          <Box sx={{ position: 'relative', width: { xs: 168, md: 196 } }}>
            <Box sx={{ position: 'absolute', inset: '-34%' }}>
              <ForgeRings laserColor="rgba(212,175,55,0.85)" />
            </Box>
            <Box
              component={motion.div}
              animate={reduced ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              sx={{
                position: 'relative',
                filter: 'drop-shadow(0 24px 44px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(212,175,55,0.32))',
              }}
            >
              <BrandArt asset="coin" />
            </Box>
          </Box>
        </Box>
      </Reveal>

      <Reveal variant="fade" delay={0.2}>
        <Typography
          sx={{
            mt: 2.5,
            textAlign: 'center',
            fontFamily: fontFamilies.mono,
            fontSize: '0.625rem',
            letterSpacing: '0.24em',
            color: (t) => t.ef.text.tertiary,
          }}
        >
          ELM STAKING ECOSYSTEM
        </Typography>
      </Reveal>

      <FlowConnectors />

      <RevealGroup stagger={0.12} sx={{ mt: { xs: 5, md: 0 } }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
          {rewardDistribution.items.map((item, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
              <RevealItem sx={{ height: '100%' }}>
                <GlassCard
                  accent={item.accent}
                  radius={22}
                  padding={{ xs: 3, md: 3.5 }}
                  sx={{ height: '100%', gap: 2.5 }}
                >
                  {/* Channel cap */}
                  <Box
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 64,
                      height: 2,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, transparent, ${alphaOf(item.accent, 1)}, transparent)`,
                      boxShadow: `0 0 16px ${alphaOf(item.accent, 0.8)}`,
                    }}
                  />

                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 0.5 }}>
                    <IconTile name={item.icon} accent={item.accent} size="md" />
                    <Typography
                      component={motion.span}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: easings.luxe, delay: 0.1 + i * 0.08 }}
                      sx={{
                        fontFamily: fontFamilies.serif,
                        fontSize: '2.75rem',
                        lineHeight: 1,
                        color: alphaOf(item.accent, 0.28),
                      }}
                    >
                      {item.index}
                    </Typography>
                  </Stack>

                  <Box>
                    <Typography variant="h5" component="h3" sx={{ mb: 1.5, textWrap: 'balance' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ lineHeight: 1.8 }}>
                      {item.body}
                    </Typography>
                  </Box>
                </GlassCard>
              </RevealItem>
            </Grid>
          ))}
        </Grid>
      </RevealGroup>
    </Section>
  );
}
