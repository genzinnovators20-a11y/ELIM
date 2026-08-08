import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import AddRounded from '@mui/icons-material/AddRounded';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import { faq } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * Frequently Asked Questions.
 *
 * Hand-built rather than MUI's Accordion so the disclosure inherits the site's
 * glass surface, gold hairline and easing curve instead of Material's defaults.
 * Each row is a real button with `aria-expanded` / `aria-controls` wiring.
 */
export default function Faq() {
  const [openId, setOpenId] = useState(faq.items[0]?.id ?? null);

  return (
    <Section id="faq" tone="sunken">
      <SectionHeading eyebrow="Answers" title={faq.title} maxWidth={820} />

      <RevealGroup stagger={0.09} sx={{ mt: { xs: 5, md: 7 }, maxWidth: 940 }}>
        <Stack spacing={2}>
          {faq.items.map((item) => {
            const open = openId === item.id;
            return (
              <RevealItem key={item.id}>
                <GlassCard
                  accent="gold"
                  radius={18}
                  padding={0}
                  interactive={false}
                  sx={{ overflow: 'hidden' }}
                >
                  <Box
                    component="button"
                    type="button"
                    id={`faq-trigger-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    sx={{
                      appearance: 'none',
                      background: 'none',
                      border: 0,
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      px: { xs: 2.5, md: 3.5 },
                      py: { xs: 2.5, md: 3 },
                      color: 'inherit',
                      '&:hover .faq-q': { color: 'primary.light' },
                      '&:hover .faq-plus': { borderColor: (t) => t.ef.borders.gold, color: 'primary.light' },
                    }}
                  >
                    <Typography
                      className="faq-q"
                      component="h3"
                      sx={{
                        fontFamily: fontFamilies.display,
                        fontWeight: 600,
                        fontSize: { xs: '1.0625rem', md: '1.25rem' },
                        letterSpacing: '-0.015em',
                        color: open ? 'primary.light' : 'text.primary',
                        transition: 'color 320ms ease',
                      }}
                    >
                      {item.question}
                    </Typography>

                    <Box
                      className="faq-plus"
                      aria-hidden
                      sx={{
                        flexShrink: 0,
                        width: 34,
                        height: 34,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '50%',
                        border: (t) => `1px solid ${open ? t.ef.borders.gold : t.ef.borders.soft}`,
                        color: open ? 'primary.light' : 'text.secondary',
                        transform: open ? 'rotate(135deg)' : 'rotate(0deg)',
                        transition: (t) =>
                          `transform 520ms ${t.ef.easings.css.luxe}, border-color 320ms ease, color 320ms ease`,
                      }}
                    >
                      <AddRounded sx={{ fontSize: 18 }} />
                    </Box>
                  </Box>

                  <Collapse in={open} timeout={420}>
                    <Box
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      sx={{ px: { xs: 2.5, md: 3.5 }, pb: { xs: 3, md: 3.5 } }}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          height: 1,
                          mb: 2.5,
                          background:
                            'linear-gradient(90deg, rgba(212,175,55,0.65) 0%, rgba(212,175,55,0.18) 46%, transparent 100%)',
                        }}
                      />
                      <Typography variant="body1" component="p" sx={{ lineHeight: 1.8, maxWidth: 760 }}>
                        {item.answer}
                      </Typography>
                    </Box>
                  </Collapse>
                </GlassCard>
              </RevealItem>
            );
          })}
        </Stack>
      </RevealGroup>
    </Section>
  );
}
