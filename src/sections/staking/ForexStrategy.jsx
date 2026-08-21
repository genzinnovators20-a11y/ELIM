import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import Icon from '../../components/ui/Icon';
import MarketPulse from '../../components/visuals/MarketPulse';
import { forexStrategy } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

/** One accent per published system property, in the order the document lists them. */
const ACCENTS = ['blue', 'gold', 'emerald'];

const hairline = (t) => `1px solid ${t.ef.borders.hairline}`;

/**
 * Algorithmic Forex Strategy & Alpha Generation.
 *
 * Framed as a single instrument: chrome across the top, the live trace beneath
 * it, and the three published system properties along the foot as readouts cut
 * from the same frame — channel strips on a trading terminal rather than three
 * cards floating inside a panel. The nested-card treatment was what made the
 * section read as generic: a bordered box holding three more bordered boxes
 * announces containers, not instrumentation.
 *
 * The trace is synthetic and labelled as such in the chrome; nothing here
 * publishes a figure the document does not.
 */
export default function ForexStrategy() {
  return (
    <Section id="forex" tone="contrast">
      <SectionHeading
        eyebrow="Quantitative Systems"
        accent="blue"
        title={forexStrategy.title}
        lede={forexStrategy.lede}
        maxWidth={920}
      />

      <Box
        sx={{
          mt: layout.stack.head,
          borderRadius: { xs: '22px', md: '28px' },
          overflow: 'hidden',
          border: (t) => hairline(t),
          background: 'linear-gradient(160deg, rgba(16,21,28,0.9) 0%, rgba(6,9,13,0.94) 100%)',
          boxShadow: (t) => t.ef.shadows.card,
        }}
      >
        {/* Instrument edge — the trace's own two colours, stated once at the top. */}
        <Box
          aria-hidden
          sx={{
            height: '1px',
            background:
              'linear-gradient(90deg, rgba(76,141,255,0.55) 0%, rgba(31,185,138,0.6) 58%, rgba(31,185,138,0) 100%)',
          }}
        />

        {/* Terminal chrome */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            px: { xs: 2.5, md: 3.5 },
            py: 1.75,
            borderBottom: (t) => hairline(t),
            background: 'linear-gradient(180deg, rgba(255,255,255,0.045), transparent)',
          }}
        >
          <Stack direction="row" spacing={{ xs: 2, md: 3 }} alignItems="center" flexWrap="wrap" useFlexGap>
            {['EUR/USD', 'GBP/USD', 'USD/JPY'].map((pair, i) => (
              <Stack key={pair} direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: i === 1 ? '#4C8DFF' : '#1FB98A',
                    boxShadow: `0 0 8px ${i === 1 ? 'rgba(76,141,255,0.9)' : 'rgba(31,185,138,0.9)'}`,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: { xs: '0.5625rem', md: '0.625rem' },
                    letterSpacing: '0.14em',
                    color: (t) => t.ef.text.secondary,
                  }}
                >
                  {pair}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Typography
            sx={{
              fontFamily: fontFamilies.mono,
              fontSize: '0.5625rem',
              letterSpacing: '0.2em',
              color: (t) => t.ef.text.disabled,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            24/5 · ILLUSTRATIVE
          </Typography>
        </Stack>

        {/* Trace window. The history fades into the frame instead of ending on a
            cut; the leading edge is left clear, since the live mark is the one
            thing on an instrument that must never be dimmed. */}
        <Box sx={{ position: 'relative' }}>
          <MarketPulse height={200} candleWidth={7} gap={4} meanReversion={1} />
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: { xs: 32, md: 64 },
              pointerEvents: 'none',
              background: 'linear-gradient(90deg, rgba(8,11,16,0.9), transparent)',
            }}
          />
        </Box>

        {/* Readout register — cut from the frame, not stacked on it. */}
        <RevealGroup
          stagger={0.1}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            borderTop: (t) => `1px solid ${t.ef.borders.soft}`,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.12) 100%)',
          }}
        >
          {forexStrategy.items.map((item, i) => {
            const accent = ACCENTS[i] ?? 'blue';
            return (
              <RevealItem
                key={item.label}
                sx={(t) => ({
                  position: 'relative',
                  px: { xs: 2.5, md: 3.25 },
                  py: { xs: 3, md: 3.5 },
                  borderLeft: { xs: 'none', md: i ? hairline(t) : 'none' },
                  borderTop: { xs: i ? hairline(t) : 'none', md: 'none' },
                  '@media (hover: hover)': {
                    '&:hover .fx-line': { transform: 'scaleX(1)' },
                    '&:hover .fx-icon': { transform: 'translateY(-3px)', color: alphaOf(accent, 1) },
                    '&:hover .fx-index': { color: alphaOf(accent, 0.9) },
                  },
                })}
              >
                {/* Channel strip: glyph, run, ordinal. */}
                <Stack direction="row" alignItems="center" spacing={1.75} sx={{ mb: { xs: 2.25, md: 2.75 } }}>
                  <Box
                    className="fx-icon"
                    sx={(t) => ({
                      lineHeight: 0,
                      color: alphaOf(accent, 0.92),
                      transition: `transform 620ms ${t.ef.easings.css.luxe}, color 420ms ease`,
                    })}
                  >
                    <Icon name={item.icon} sx={{ fontSize: 22 }} />
                  </Box>
                  <Box
                    aria-hidden
                    sx={{
                      flex: 1,
                      height: '1px',
                      background: `linear-gradient(90deg, ${alphaOf(accent, 0.42)}, rgba(255,255,255,0.02))`,
                    }}
                  />
                  <Typography
                    className="fx-index"
                    component="span"
                    aria-hidden
                    sx={{
                      fontFamily: fontFamilies.mono,
                      fontSize: '0.5625rem',
                      letterSpacing: '0.2em',
                      color: (t) => t.ef.text.disabled,
                      transition: 'color 520ms ease',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                </Stack>

                <Typography variant="body2" component="p" sx={{ lineHeight: 1.78, maxWidth: '42ch' }}>
                  <Box
                    component="strong"
                    sx={{
                      display: 'block',
                      fontFamily: fontFamilies.display,
                      fontWeight: 600,
                      color: 'text.primary',
                      fontSize: { xs: '0.9375rem', md: '1rem' },
                      lineHeight: 1.4,
                      letterSpacing: '-0.016em',
                      mb: 1.25,
                      textWrap: 'balance',
                    }}
                  >
                    {item.label}
                  </Box>
                  {item.body.trimStart()}
                </Typography>

                <Box
                  className="fx-line"
                  aria-hidden
                  sx={(t) => ({
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, ${alphaOf(accent, 0.8)}, transparent)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: `transform 620ms ${t.ef.easings.css.luxe}`,
                    pointerEvents: 'none',
                  })}
                />
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Box>
    </Section>
  );
}
