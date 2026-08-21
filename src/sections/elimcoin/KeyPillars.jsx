import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import Icon from '../../components/ui/Icon';
import { keyPillars } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

/**
 * Key Ecosystem Pillars — built as pillars.
 *
 * Three columns stand on one continuous plinth that runs the width of the
 * section: the shaft of each descends from its text block to that shared line,
 * so what the reader sees is three supports carrying one structure rather than
 * three copies of a card. Height is the argument — the numerals sit at the
 * capital, the copy hangs at a common baseline, and the shafts do the rest.
 *
 * Hovering a pillar lights its shaft and lifts a bloom off the plinth beneath
 * it — one opacity change and one 4px nudge, nothing that costs a layout.
 *
 * On narrow viewports the composition rotates: the shafts become a left rail
 * running down the stack, which keeps the "standing on one base" reading in a
 * form that is actually legible on a phone.
 */
export default function KeyPillars() {
  return (
    <Section id="pillars" tone="sunken">
      <SectionHeading eyebrow="What ELM Stands On" title={keyPillars.title} maxWidth={820} />

      <RevealGroup stagger={0.11} sx={{ mt: layout.stack.head }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              columnGap: { md: 5, lg: 8 },
            }}
          >
            {keyPillars.items.map((item, i) => (
              <RevealItem
                key={item.label}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  pl: { xs: 3, md: 0 },
                  pt: { xs: i ? 4 : 0, md: 0 },
                  /* No bottom padding at md: the shaft has to land on the
                     plinth, not stop short of it. */
                  pb: 0,
                  borderLeft: { xs: `2px solid ${alphaOf(item.accent, 0.42)}`, md: 'none' },
                  '@media (hover: hover)': {
                    '&:hover .pillar-shaft': { opacity: 1 },
                    '&:hover .pillar-base': { opacity: 1 },
                    '&:hover .pillar-icon': { transform: 'translateY(-4px)', color: alphaOf(item.accent, 1) },
                    '&:hover .pillar-index': { color: alphaOf(item.accent, 0.92) },
                  },
                }}
              >
                {/* Capital — index numeral and its rule. */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2.5, md: 3.5 } }}>
                  <Typography
                    className="pillar-index"
                    component="span"
                    sx={{
                      fontFamily: fontFamilies.display,
                      fontSize: { xs: '1.5rem', md: '1.875rem' },
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      fontVariantNumeric: 'tabular-nums',
                      color: alphaOf(item.accent, 0.5),
                      transition: 'color 520ms ease',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Box
                    aria-hidden
                    sx={{
                      flex: 1,
                      height: '1px',
                      background: `linear-gradient(90deg, ${alphaOf(item.accent, 0.42)}, rgba(255,255,255,0.02))`,
                    }}
                  />
                </Box>

                <Box
                  className="pillar-icon"
                  sx={(t) => ({
                    lineHeight: 0,
                    mb: { xs: 2.5, md: 3.5 },
                    color: alphaOf(item.accent, 0.92),
                    transition: `transform 620ms ${t.ef.easings.css.luxe}, color 420ms ease`,
                  })}
                >
                  <Icon name={item.icon} sx={{ fontSize: { xs: 32, md: 38 } }} />
                </Box>

                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ mb: { xs: 1.5, md: 2 }, fontSize: { xs: '1.25rem', md: '1.5rem' }, textWrap: 'balance' }}
                >
                  {item.label}
                </Typography>

                <Typography variant="body1" component="p" sx={{ lineHeight: 1.75, maxWidth: '34ch', mb: { md: 5 } }}>
                  <Box component="span" sx={{ color: (t) => t.ef.text.disabled, mr: 0.5 }}>
                    {item.separator}
                  </Box>
                  {item.body}
                </Typography>

                {/* The shaft. Sits below the copy, reaching the shared plinth. */}
                <Box
                  className="pillar-shaft"
                  aria-hidden
                  sx={(t) => ({
                    display: { xs: 'none', md: 'block' },
                    mt: 'auto',
                    ml: '1px',
                    width: '2px',
                    height: { md: 88, lg: 124 },
                    opacity: 0.7,
                    background: `linear-gradient(180deg, ${alphaOf(item.accent, 0)} 0%, ${alphaOf(item.accent, 0.28)} 38%, ${alphaOf(item.accent, 0.85)} 100%)`,
                    transition: `opacity 620ms ${t.ef.easings.css.luxe}`,
                  })}
                />

                {/* Bloom cast on the plinth. */}
                <Box
                  className="pillar-base"
                  aria-hidden
                  sx={(t) => ({
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    /* Centred on the shaft, and wide enough that the falloff
                       finishes inside its own box — clipped at the edge, the
                       same gradient reads as a grey rectangle. */
                    left: -100,
                    width: 200,
                    bottom: -40,
                    height: 88,
                    opacity: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(50% 55% at 50% 4%, ${alphaOf(item.accent, 0.24)} 0%, ${alphaOf(item.accent, 0.07)} 40%, transparent 72%)`,
                    transition: `opacity 620ms ${t.ef.easings.css.luxe}`,
                  })}
                />
              </RevealItem>
            ))}
          </Box>

          {/* The plinth — one line, three pillars. */}
          <Box
            aria-hidden
            sx={{
              display: { xs: 'none', md: 'block' },
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.2) 18%, rgba(255,255,255,0.2) 82%, rgba(255,255,255,0.03) 100%)',
            }}
          />
        </Box>
      </RevealGroup>
    </Section>
  );
}
