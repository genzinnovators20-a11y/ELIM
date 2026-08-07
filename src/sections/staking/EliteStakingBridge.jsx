import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Eyebrow from '../../components/ui/Eyebrow';
import GradientText from '../../components/ui/GradientText';
import ForgeRings from '../../components/visuals/ForgeRings';
import BrandArt from '../../components/brand/BrandArt';
import { stakingBridge } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * The Elite Staking Bridge — the chapter opening for the hybrid asset protocol.
 * The document sets this passage apart with colour; here it becomes a full-bleed
 * lit panel so the shift in register is unmistakable.
 */
export default function EliteStakingBridge() {
  return (
    <Section id="bridge" tone="contrast" density="spacious">
      <Box
        sx={{
          position: 'relative',
          borderRadius: { xs: '28px', md: '36px' },
          overflow: 'hidden',
          border: (t) => `1px solid ${t.ef.borders.soft}`,
          background:
            'linear-gradient(160deg, rgba(18,34,56,0.72) 0%, rgba(8,11,16,0.9) 46%, rgba(10,22,38,0.8) 100%)',
          boxShadow: (t) => t.ef.shadows.lifted,
        }}
      >
        {/* Lighting */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(60% 60% at 88% 8%, rgba(76,141,255,0.22) 0%, transparent 62%), radial-gradient(50% 50% at 4% 96%, rgba(212,175,55,0.16) 0%, transparent 62%)',
            pointerEvents: 'none',
          }}
        />

        {/* Emblem watermark */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            right: { md: '-6%' },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { md: 420, lg: 500 },
            display: { xs: 'none', md: 'block' },
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ position: 'absolute', inset: '-14%' }}>
            <ForgeRings />
          </Box>
          <Box sx={{ opacity: 0.42, filter: 'blur(0.4px)' }}>
            <BrandArt asset="emblem" />
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            px: { xs: 3, sm: 5, md: 7, lg: 9 },
            py: { xs: 6, sm: 8, md: 10, lg: 12 },
            maxWidth: { md: '68%', lg: '64%' },
          }}
        >
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Reveal variant="fadeUpSm">
              <Eyebrow accent="blue">{stakingBridge.title}</Eyebrow>
            </Reveal>

            <Reveal variant="blur" delay={0.06}>
              <Typography
                variant="h2"
                component="h2"
                sx={{ fontSize: 'clamp(1.65rem, 3.4vw, 3rem)', lineHeight: 1.12, textWrap: 'balance' }}
              >
                <GradientText fill="ice" component="span">
                  {stakingBridge.subtitle}
                </GradientText>
              </Typography>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12}>
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: '1.0625rem', md: '1.1875rem' },
                  lineHeight: 1.82,
                  color: 'text.secondary',
                  maxWidth: 780,
                }}
              >
                {stakingBridge.body}
              </Typography>
            </Reveal>

            <Reveal variant="fade" delay={0.2}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ pt: 1 }}>
                <Box
                  aria-hidden
                  sx={{ width: 54, height: 1, background: (t) => t.ef.gradients.goldFill, opacity: 0.9 }}
                />
                <Typography
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.625rem',
                    letterSpacing: '0.22em',
                    color: (t) => t.ef.text.muted,
                  }}
                >
                  GOLD · FOREX · REAL-WORLD ENTERPRISE
                </Typography>
              </Stack>
            </Reveal>
          </Stack>
        </Box>
      </Box>
    </Section>
  );
}
