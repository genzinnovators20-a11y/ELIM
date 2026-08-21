import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Eyebrow from '../../components/ui/Eyebrow';
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import IconTile from '../../components/ui/IconTile';
import { ecosystem } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

const accents = ['gold', 'blue', 'cyan', 'emerald', 'iris'];

/**
 * The source line is one sentence delimited by " / "; it is laid out as the five
 * pairs it already contains — no wording changed, no pair merged or dropped.
 * The document's own emphasis decides the tier each pair sits in.
 */
const entries = ecosystem.matrix.map((entry, i) => ({
  ...entry,
  index: String(i + 1).padStart(2, '0'),
  accent: accents[i % accents.length],
}));

const base = entries.filter((entry) => entry.emphasis);
const operating = entries.filter((entry) => !entry.emphasis);

const hairline = (t) => `1px solid ${t.ef.borders.hairline}`;

/**
 * The ecosystem's operating model, drawn as a framework board rather than as a
 * set of cards.
 *
 * Two rules bracket the whole model, one rule divides it, and the bays are cut
 * out of that frame with hairlines — the register of a schematic sheet. The
 * split is the source's own emphasis: the two emphasised pairs form the base
 * tier and carry the larger type and the heavier bezel, the remaining three run
 * beneath them at working scale. Reading the board top to bottom therefore
 * reads the hierarchy, which five identical panels could never show.
 */
function Bay({ entry, tier, position, count }) {
  const lead = tier === 'base';
  const first = position === 0;
  const last = position === count - 1;

  return (
    <RevealItem
      sx={(t) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 3.25, md: lead ? 4.5 : 4 },
        pb: { xs: 3.25, md: lead ? 5 : 4.5 },
        pl: { xs: 0, md: first ? 0 : 4 },
        pr: { xs: 0, md: last ? 0 : 4 },
        borderLeft: { xs: 'none', md: first ? 'none' : hairline(t) },
        borderTop: { xs: first ? 'none' : hairline(t), md: 'none' },
        '@media (hover: hover)': {
          '&:hover .vm-line': { transform: 'scaleX(1)' },
          '&:hover .vm-label': { color: alphaOf(entry.accent, 1) },
        },
      })}
    >
      {/* Node marker: the bezel and its ordinal read as one mark, so the number
          stays with the thing it numbers instead of drifting to the bay edge. */}
      <Stack direction="row" alignItems="center" spacing={1.75} sx={{ mb: { xs: 2.5, md: 3 } }}>
        <IconTile name={entry.icon} accent={entry.accent} size={lead ? 'md' : 'sm'} />
        <Typography
          sx={{
            fontFamily: fontFamilies.mono,
            fontSize: '0.5625rem',
            letterSpacing: '0.2em',
            color: (t) => t.ef.text.disabled,
          }}
        >
          {entry.index}
        </Typography>
        <Box
          aria-hidden
          sx={{
            flex: 1,
            maxWidth: lead ? 88 : 64,
            height: '1px',
            background: `linear-gradient(90deg, ${alphaOf(entry.accent, 0.34)}, rgba(255,255,255,0.02))`,
          }}
        />
      </Stack>

      {/* A label/value pair, not a section title — a description list keeps the
          page's heading outline honest. */}
      <Box component="dl" sx={{ m: 0 }}>
        <Typography
          className="vm-label"
          component="dt"
          sx={{
            fontFamily: fontFamilies.mono,
            fontSize: { xs: '0.5625rem', md: '0.625rem' },
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: alphaOf(entry.accent, 0.88),
            transition: 'color 420ms ease',
            mb: { xs: 1.25, md: 1.75 },
          }}
        >
          {entry.label}
        </Typography>

        <Typography
          component="dd"
          sx={{
            m: 0,
            fontFamily: lead ? fontFamilies.display : fontFamilies.body,
            fontSize: lead ? { xs: '1.125rem', md: '1.3125rem' } : { xs: '1rem', md: '1.0625rem' },
            fontWeight: lead ? 600 : 400,
            lineHeight: lead ? 1.42 : 1.62,
            letterSpacing: lead ? '-0.018em' : '-0.008em',
            color: lead ? 'text.primary' : 'text.secondary',
            textWrap: 'balance',
            maxWidth: '38ch',
          }}
        >
          {entry.value}
        </Typography>
      </Box>

      {/* Line activation: the bay signs its own edge on hover. */}
      <Box
        className="vm-line"
        aria-hidden
        sx={(t) => ({
          position: 'absolute',
          left: { xs: 0, md: first ? 0 : '32px' },
          right: { xs: 0, md: last ? 0 : '32px' },
          bottom: 0,
          height: '1px',
          background: `linear-gradient(90deg, ${alphaOf(entry.accent, 0.85)}, transparent)`,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform 620ms ${t.ef.easings.css.luxe}`,
          pointerEvents: 'none',
        })}
      />
    </RevealItem>
  );
}

export default function ValueMatrix() {
  return (
    /* First section of the Ecosystem chapter — flush to its opener. */
    <Section id="matrix" tone="sunken" flush="top">
      <Reveal variant="fadeUpSm">
        <Eyebrow accent="cyan">Operating Model</Eyebrow>
      </Reveal>

      <RevealGroup stagger={0.08} sx={{ mt: layout.stack.head }}>
        <Box
          sx={(t) => ({
            position: 'relative',
            borderTop: `1px solid ${t.ef.borders.soft}`,
            borderBottom: `1px solid ${t.ef.borders.soft}`,
          })}
        >
          {/* Base tier — the two pairs the document emphasises. */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              background: 'linear-gradient(180deg, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0) 100%)',
            }}
          >
            {base.map((entry, i) => (
              <Bay key={entry.label} entry={entry} tier="base" position={i} count={base.length} />
            ))}
          </Box>

          {/* The division between the two tiers. */}
          <Box
            aria-hidden
            sx={{
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.16) 26%, rgba(255,255,255,0.16) 74%, rgba(255,255,255,0.04) 100%)',
            }}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
            {operating.map((entry, i) => (
              <Bay key={entry.label} entry={entry} tier="operating" position={i} count={operating.length} />
            ))}
          </Box>
        </Box>
      </RevealGroup>
    </Section>
  );
}
