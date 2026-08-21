import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import { elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { layout } from '../../theme/tokens';

/** Register marks — the corner ticks of a drawing sheet, not a border. */
const TICKS = [
  { top: -1, left: -1, borderTop: 1, borderLeft: 1 },
  { top: -1, right: -1, borderTop: 1, borderRight: 1 },
  { bottom: -1, left: -1, borderBottom: 1, borderLeft: 1 },
  { bottom: -1, right: -1, borderBottom: 1, borderRight: 1 },
];

function CornerTicks() {
  return TICKS.map((tick, i) => (
    <Box
      key={i}
      aria-hidden
      sx={{
        position: 'absolute',
        width: 12,
        height: 12,
        pointerEvents: 'none',
        borderStyle: 'solid',
        borderColor: 'rgba(212,175,55,0.55)',
        borderTopWidth: tick.borderTop ?? 0,
        borderRightWidth: tick.borderRight ?? 0,
        borderBottomWidth: tick.borderBottom ?? 0,
        borderLeftWidth: tick.borderLeft ?? 0,
        top: tick.top,
        right: tick.right,
        bottom: tick.bottom,
        left: tick.left,
      }}
    />
  ));
}

/**
 * Token Specifications — a datasheet, not a feature list.
 *
 * The heading moves out of the content column and stands beside the data, so
 * the page's one block of hard, factual values gets the composition it deserves:
 * an asymmetric split with the specification bracketed between two gold rules
 * and set as ruled rows. Labels stay in mono at register scale; values are set
 * large and flush right in tabular figures, which is what lets a reader scan the
 * column of answers without reading the questions again.
 *
 * Every row is a `dt`/`dd` pair, so the values are published as data rather than
 * as five headings competing with the section title.
 */
export default function TokenSpecs() {
  return (
    <Section id="specifications" tone="sunken">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '5fr 7fr' },
          columnGap: { lg: 8, xl: 10 },
          rowGap: layout.stack.head,
          /* The heading stands beside the data rather than above it, so it is
             balanced against the block it names instead of hanging off its top. */
          alignItems: { xs: 'start', lg: 'center' },
        }}
      >
        <SectionHeading eyebrow="Datasheet" title={elimcoin.specsTitle} maxWidth={520} />

        <Reveal variant="fadeUp" delay={0.06}>
          <Box sx={{ position: 'relative' }}>
            <CornerTicks />

            <RevealGroup
              stagger={0.07}
              as="dl"
              sx={{
                m: 0,
                borderTop: '1px solid rgba(212,175,55,0.42)',
                borderBottom: '1px solid rgba(212,175,55,0.42)',
              }}
            >
              {elimcoin.specs.map((spec, i) => (
                <RevealItem
                  key={spec.label}
                  variant="fadeUpSm"
                  sx={(t) => ({
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: { xs: '30px 1fr', sm: '44px auto 1fr auto' },
                    alignItems: { xs: 'start', sm: 'baseline' },
                    columnGap: { xs: 1.5, sm: 2.5 },
                    py: { xs: 2.5, md: 3 },
                    borderTop: i ? `1px solid ${t.ef.borders.hairline}` : 'none',
                    transition: 'background 420ms ease',
                    '@media (hover: hover)': {
                      '&:hover': { background: 'linear-gradient(90deg, rgba(212,175,55,0.05), transparent 72%)' },
                      '&:hover .spec-index': { color: 'rgba(212,175,55,0.92)' },
                      '&:hover .spec-line': { transform: 'scaleX(1)' },
                    },
                  })}
                >
                  <Typography
                    className="spec-index"
                    component="span"
                    aria-hidden
                    sx={{
                      fontFamily: fontFamilies.mono,
                      fontSize: '0.5625rem',
                      letterSpacing: '0.18em',
                      lineHeight: 1.9,
                      color: 'rgba(212,175,55,0.42)',
                      transition: 'color 420ms ease',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>

                  <Typography
                    component="dt"
                    sx={{
                      fontFamily: fontFamilies.mono,
                      fontSize: { xs: '0.625rem', md: '0.6875rem' },
                      letterSpacing: '0.2em',
                      lineHeight: 1.7,
                      textTransform: 'uppercase',
                      color: (t) => t.ef.text.tertiary,
                    }}
                  >
                    {spec.label}
                  </Typography>

                  {/* Leader. Carries the eye from a small mono label across to a
                      value set at four times its size — the one device a wide
                      spec row genuinely needs. */}
                  <Box
                    aria-hidden
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      alignSelf: 'center',
                      height: 0,
                      mx: 2.5,
                      borderBottom: '1px dotted rgba(255,255,255,0.13)',
                    }}
                  />

                  <Typography
                    component="dd"
                    sx={{
                      m: 0,
                      gridColumn: { xs: '2 / -1', sm: 'auto' },
                      mt: { xs: 1, sm: 0 },
                      fontFamily: fontFamilies.display,
                      fontWeight: 600,
                      fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.625rem' },
                      lineHeight: 1.24,
                      letterSpacing: '-0.026em',
                      color: 'text.primary',
                      fontVariantNumeric: 'tabular-nums',
                      textAlign: { xs: 'left', sm: 'right' },
                      textWrap: 'balance',
                    }}
                  >
                    {spec.value}
                  </Typography>

                  <Box
                    className="spec-line"
                    aria-hidden
                    sx={(t) => ({
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -1,
                      height: '1px',
                      background: 'linear-gradient(90deg, rgba(212,175,55,0.75), rgba(212,175,55,0))',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: `transform 620ms ${t.ef.easings.css.luxe}`,
                      pointerEvents: 'none',
                    })}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
