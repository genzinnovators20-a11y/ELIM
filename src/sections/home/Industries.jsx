import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import Icon from '../../components/ui/Icon';
import { industries } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';
import { layout } from '../../theme/tokens';

const COUNT = industries.items.length;

/** The bay division. One field cut into four — not four objects placed side by side. */
const rule = (t) => `1px solid ${t.ef.borders.hairline}`;

/**
 * Real-world utility industries.
 *
 * Presented as a single field partitioned into four bays rather than as four
 * detached cards: the sectors are parts of one ecosystem, so they share one
 * ground, one edge and one shadow. The four accents meet along the top edge as
 * a continuous spectrum — the only place on the page where all four appear as
 * one line — which is what makes the set read as a spanning system.
 *
 * Hover lights a bay's segment of that spectrum and washes its column from the
 * top. Nothing translates: moving a bay would break the field it belongs to.
 */
export default function Industries() {
  return (
    <Section id="industries" tone="sunken">
      <SectionHeading eyebrow="Where ELM Lands" title={industries.title} maxWidth={880} />

      <RevealGroup stagger={0.1} sx={{ mt: layout.stack.head }}>
        <Box
          sx={(t) => ({
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: `repeat(${COUNT}, 1fr)` },
            borderRadius: '26px',
            overflow: 'hidden',
            border: rule(t),
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.006) 44%, rgba(0,0,0,0.24) 100%)',
            boxShadow: t.ef.shadows.card,
          })}
        >
          {industries.items.map((item, i) => (
            <RevealItem
              key={item.label}
              sx={(t) => ({
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                /* Titles align on one line across the field rather than
                   bottom-anchoring: four ragged tops is what made the old row
                   read as four separate objects. */
                gap: { xs: 3.5, md: 5, lg: 6.5 },
                px: { xs: 2.75, md: 3.5 },
                pt: { xs: 3.25, md: 3.75 },
                pb: { xs: 3.5, md: 4.5 },
                /* Vertical hairlines divide the bays; the accent segments do the
                   dividing horizontally, so stacked layouts need no extra rule. */
                borderLeft: { xs: 'none', sm: i % 2 ? rule(t) : 'none', lg: i ? rule(t) : 'none' },
                '@media (hover: hover)': {
                  '&:hover .ind-seg': { opacity: 1, boxShadow: `0 0 16px ${alphaOf(item.accent, 0.5)}` },
                  '&:hover .ind-wash': { opacity: 1 },
                  '&:hover .ind-icon': { transform: 'translateY(-4px)', color: alphaOf(item.accent, 1) },
                  '&:hover .ind-index': { color: alphaOf(item.accent, 0.9) },
                },
              })}
            >
              {/* This bay's segment of the shared spectrum. */}
              <Box
                className="ind-seg"
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: alphaOf(item.accent, 1),
                  opacity: 0.42,
                  transition: 'opacity 420ms ease, box-shadow 420ms ease',
                  pointerEvents: 'none',
                }}
              />

              <Box
                className="ind-wash"
                aria-hidden
                sx={(t) => ({
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: `opacity 620ms ${t.ef.easings.css.luxe}`,
                  background: `linear-gradient(180deg, ${alphaOf(item.accent, 0.12)} 0%, ${alphaOf(item.accent, 0.02)} 40%, transparent 70%)`,
                })}
              />

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  className="ind-icon"
                  sx={(t) => ({
                    lineHeight: 0,
                    color: alphaOf(item.accent, 0.92),
                    transition: `transform 620ms ${t.ef.easings.css.luxe}, color 420ms ease`,
                  })}
                >
                  <Icon name={item.icon} sx={{ fontSize: { xs: 28, md: 32 } }} />
                </Box>
                <Typography
                  className="ind-index"
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.625rem',
                    letterSpacing: '0.2em',
                    color: (t) => t.ef.text.disabled,
                    transition: 'color 520ms ease',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
              </Box>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 1.5, fontSize: { xs: '1.0625rem', md: '1.1875rem', lg: '1.25rem' }, textWrap: 'balance' }}
                >
                  {item.label}
                </Typography>
                <Typography variant="body2" component="p" sx={{ lineHeight: 1.72, maxWidth: '36ch' }}>
                  <Box component="span" sx={{ color: (t) => t.ef.text.disabled, mr: 0.5 }}>
                    {item.separator}
                  </Box>
                  {item.body}
                </Typography>
              </Box>
            </RevealItem>
          ))}
        </Box>
      </RevealGroup>
    </Section>
  );
}
