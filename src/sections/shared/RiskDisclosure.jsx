import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Icon from '../../components/ui/Icon';
import { riskDisclosure } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * Risk Disclosure & Legal Disclaimer.
 * Deliberately quiet and unmistakably legible — a regulated-notice treatment
 * rather than a marketing panel. The text is reproduced in full, unaltered.
 */
export default function RiskDisclosure({ id = 'risk-disclosure' }) {
  return (
    <Section id={id} density="compact">
      <Reveal variant="fadeUp">
        <Box
          component="aside"
          aria-label={riskDisclosure.title}
          sx={{
            position: 'relative',
            borderRadius: { xs: '20px', md: '24px' },
            border: (t) => `1px solid ${t.ef.borders.hairline}`,
            background: 'linear-gradient(160deg, rgba(255,255,255,0.028) 0%, rgba(0,0,0,0.28) 100%)',
            p: { xs: 3, sm: 4, md: 5 },
            overflow: 'hidden',
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, rgba(232,163,61,0.8), rgba(232,163,61,0.06))',
            }}
          />

          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.75} alignItems="center">
              <Box sx={{ color: 'warning.main', display: 'grid', placeItems: 'center' }}>
                <Icon name="shield" sx={{ fontSize: 20 }} />
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontFamily: fontFamilies.mono,
                  fontSize: { xs: '0.6875rem', md: '0.75rem' },
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'warning.main',
                }}
              >
                {riskDisclosure.title}
              </Typography>
            </Stack>

            <Typography
              component="p"
              sx={{
                fontSize: { xs: '0.875rem', md: '0.9375rem' },
                lineHeight: 1.9,
                color: (t) => t.ef.text.muted,
                maxWidth: 1080,
              }}
            >
              {riskDisclosure.body}
            </Typography>
          </Stack>
        </Box>
      </Reveal>
    </Section>
  );
}
