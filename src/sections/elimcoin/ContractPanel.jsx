import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import GradientText from '../../components/ui/GradientText';
import { elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

const Rule = () => (
  <Box
    aria-hidden
    sx={{
      height: 1,
      background:
        'repeating-linear-gradient(90deg, rgba(212,175,55,0.42) 0 8px, transparent 8px 16px)',
      opacity: 0.75,
    }}
  />
);

/**
 * Smart contract status band. The address slot is presented as an awaiting
 * provision field rather than filled with a placeholder value — a fabricated
 * contract address is the one thing this page must never show.
 */
export default function ContractPanel() {
  return (
    <Section id="contract" density="compact">
      <Reveal variant="fadeUp">
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Rule />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3, md: 5 }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            sx={{
              py: { xs: 3, md: 4 },
              px: { xs: 3, md: 5 },
              borderRadius: '22px',
              border: (t) => `1px solid ${t.ef.borders.goldSoft}`,
              background:
                'linear-gradient(140deg, rgba(212,175,55,0.075) 0%, rgba(255,255,255,0.014) 46%, rgba(212,175,55,0.045) 100%)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  flexShrink: 0,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'linear-gradient(150deg, rgba(212,175,55,0.22), rgba(0,0,0,0.3))',
                  border: (t) => `1px solid ${t.ef.borders.gold}`,
                  color: 'primary.light',
                  boxShadow: '0 0 32px -10px rgba(212,175,55,0.7)',
                }}
              >
                <VerifiedRounded sx={{ fontSize: 26 }} />
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontSize: { xs: '1.125rem', md: '1.5rem' }, letterSpacing: '-0.015em' }}
                >
                  <GradientText fill="gold" component="span">
                    {elimcoin.contract.verified}
                  </GradientText>
                </Typography>
                <Typography
                  sx={{
                    mt: 0.75,
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.5625rem',
                    letterSpacing: '0.2em',
                    color: (t) => t.ef.text.disabled,
                  }}
                >
                  BINANCE SMART CHAIN · BEP-20
                </Typography>
              </Box>
            </Stack>

            <Box
              sx={{
                width: { xs: '100%', md: 'auto' },
                minWidth: { md: 340 },
                px: 2.5,
                py: 2,
                borderRadius: '14px',
                border: (t) => `1px dashed ${t.ef.borders.soft}`,
                background: 'rgba(0,0,0,0.28)',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  aria-hidden
                  sx={{
                    width: 6,
                    height: 6,
                    flexShrink: 0,
                    borderRadius: '50%',
                    background: 'primary.main',
                    boxShadow: '0 0 10px rgba(212,175,55,0.9)',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                    letterSpacing: '0.14em',
                    color: 'text.secondary',
                  }}
                >
                  {elimcoin.contract.provision}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Rule />
        </Stack>
      </Reveal>
    </Section>
  );
}
