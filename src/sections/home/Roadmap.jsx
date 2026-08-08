import { useRef } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import GradientText from '../../components/ui/GradientText';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { roadmap } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

const MotionBox = motion.create(Box);

const phaseMeta = [
  { icon: 'engine', accent: 'blue' },
  { icon: 'network', accent: 'cyan' },
  { icon: 'listing', accent: 'gold' },
  { icon: 'burn', accent: 'emerald' },
];

/**
 * The document's title is pre-split in the content file so the closing target
 * can carry the metallic fill without the component parsing prose.
 */
const { titleLead, titleMiddle, titleTarget } = roadmap;

/**
 * Roadmap. A single gold conductor runs the height of the section and fills as
 * the reader descends; each phase node ignites when it is reached. The current
 * phase is flagged exactly as the document flags it.
 */
export default function Roadmap() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.82', 'end 0.55'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <Section id="roadmap" tone="contrast">
      <SectionHeading
        eyebrow="Execution Timeline"
        title={
          <>
            {titleLead}
            {titleMiddle}
            <GradientText fill="gold" component="span">
              {titleTarget}
            </GradientText>
          </>
        }
        maxWidth={980}
      />

      <Box ref={trackRef} sx={{ position: 'relative', mt: { xs: 6, md: 10 } }}>
        {/* Conductor */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: 8,
            bottom: 8,
            left: { xs: 19, md: 27 },
            width: 2,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.07)',
            overflow: 'hidden',
          }}
        >
          <MotionBox
            style={reduced ? { scaleY: 1 } : { scaleY }}
            sx={{
              width: '100%',
              height: '100%',
              transformOrigin: 'top',
              background: (t) => t.ef.gradients.goldFill,
              boxShadow: '0 0 22px rgba(212,175,55,0.6)',
            }}
          />
        </Box>

        <Stack spacing={{ xs: 4, md: 6 }}>
          {roadmap.phases.map((phase, i) => {
            const meta = phaseMeta[i] ?? phaseMeta[0];
            return (
              <Reveal key={phase.id} variant="fadeUp" delay={0.04}>
                <Stack direction="row" spacing={{ xs: 2.5, md: 4 }} alignItems="flex-start">
                  {/* Node */}
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      flexShrink: 0,
                      width: { xs: 40, md: 56 },
                      height: { xs: 40, md: 56 },
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'linear-gradient(150deg, #141A22 0%, #080B10 100%)',
                      border: `1px solid ${phase.current ? alphaOf('gold', 0.65) : 'rgba(255,255,255,0.12)'}`,
                      boxShadow: phase.current
                        ? '0 0 0 6px rgba(212,175,55,0.08), 0 0 30px -6px rgba(212,175,55,0.6)'
                        : '0 12px 30px -18px rgba(0,0,0,0.9)',
                      color: phase.current ? 'primary.light' : (t) => t.ef.text.tertiary,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: fontFamilies.mono,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        fontWeight: 500,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                  </Box>

                  <GlassCard
                    accent={meta.accent}
                    radius={22}
                    padding={{ xs: 3, md: 4 }}
                    sx={{ flex: 1, minWidth: 0, gap: 3 }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 2, sm: 2.5 }}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={2.5} alignItems="center" sx={{ minWidth: 0 }}>
                        <IconTile name={meta.icon} accent={meta.accent} size="md" />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontFamily: fontFamilies.mono,
                              fontSize: '0.625rem',
                              letterSpacing: '0.22em',
                              color: alphaOf(meta.accent, 0.92),
                              mb: 0.75,
                            }}
                          >
                            {phase.phase}
                          </Typography>
                          <Typography
                            variant="h4"
                            component="h3"
                            sx={{ fontSize: { xs: '1.125rem', md: '1.5rem' }, textWrap: 'balance' }}
                          >
                            {phase.name}
                          </Typography>
                        </Box>
                      </Stack>

                      {phase.current && (
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{
                            flexShrink: 0,
                            px: 1.5,
                            py: 0.75,
                            borderRadius: 999,
                            border: (t) => `1px solid ${t.ef.borders.gold}`,
                            background: 'rgba(212,175,55,0.08)',
                          }}
                        >
                          <MotionBox
                            animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: 'primary.main',
                              boxShadow: '0 0 10px rgba(212,175,55,0.9)',
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: fontFamilies.mono,
                              fontSize: '0.5625rem',
                              letterSpacing: '0.2em',
                              color: 'primary.light',
                            }}
                          >
                            IN PROGRESS
                          </Typography>
                        </Stack>
                      )}
                    </Stack>

                    <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {phase.items.map((item) => (
                        <Box
                          component="li"
                          key={item.label}
                          sx={{
                            display: 'flex',
                            gap: 2,
                            py: 1.75,
                            '&:first-of-type': { pt: 0 },
                            '&:last-of-type': { pb: 0 },
                            '& + li': { borderTop: (t) => `1px solid ${t.ef.borders.hairline}` },
                          }}
                        >
                          <Box
                            aria-hidden
                            sx={{
                              mt: '9px',
                              width: 5,
                              height: 5,
                              flexShrink: 0,
                              borderRadius: '50%',
                              background: alphaOf(meta.accent, 0.8),
                            }}
                          />
                          <Typography variant="body2" component="p" sx={{ lineHeight: 1.72 }}>
                            <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                              {item.label}
                            </Box>
                            {` ${item.separator} `}
                            {item.body}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </GlassCard>
                </Stack>
              </Reveal>
            );
          })}
        </Stack>
      </Box>
    </Section>
  );
}
