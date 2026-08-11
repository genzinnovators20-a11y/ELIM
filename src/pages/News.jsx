import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Eyebrow from '../components/ui/Eyebrow';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import CTAButton from '../components/ui/CTAButton';
import IconTile from '../components/ui/IconTile';
import ForgeRings from '../components/visuals/ForgeRings';
import BrandArt from '../components/brand/BrandArt';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';
import { roadmap } from '../constants/content';
import { fontFamilies } from '../theme/typography';
import { layout } from '../theme/tokens';

const currentPhase = roadmap.phases.find((phase) => phase.current);

/**
 * Newsroom.
 *
 * Deliberately an empty state: the source document publishes no articles, and
 * inventing them would put fabricated announcements on a financial site. The
 * page is built and styled so a feed can be dropped straight in — replace this
 * panel with the article list once a CMS or API endpoint exists.
 */
export default function News() {
  useSeo(seo.news);

  return (
    <>
      <Section density="compact" sx={{ pt: layout.sectionY }}>
        <Stack spacing={{ xs: 3, md: 4 }} sx={{ maxWidth: 860 }}>
          <Reveal variant="fadeUpSm">
            <Eyebrow>Newsroom</Eyebrow>
          </Reveal>

          <Reveal variant="blur" delay={0.06}>
            <Typography
              variant="display2"
              component="h1"
            >
              <GradientText fill="ice" component="span">
                Latest from
              </GradientText>{' '}
              <GradientText fill="gold" component="span">
                ELIM FORGE
              </GradientText>
            </Typography>
          </Reveal>
        </Stack>
      </Section>

      <Section tone="contrast" flush="top">
        <Reveal variant="fadeUp">
          <GlassCard accent="gold" radius={28} padding={0} interactive={false}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems="center"
              spacing={{ xs: 4, md: 6 }}
              sx={{ p: { xs: 4, sm: 5, md: 7 } }}
            >
              <Box sx={{ position: 'relative', width: { xs: 150, md: 210 }, flexShrink: 0 }}>
                <Box sx={{ position: 'absolute', inset: '-24%' }}>
                  <ForgeRings />
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    filter: 'drop-shadow(0 22px 44px rgba(0,0,0,0.7)) drop-shadow(0 0 34px rgba(212,175,55,0.28))',
                  }}
                >
                  <BrandArt asset="emblem" />
                </Box>
              </Box>

              <Stack spacing={2.5} sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.625rem',
                    letterSpacing: '0.24em',
                    color: 'primary.light',
                  }}
                >
                  AWAITING FIRST PUBLICATION
                </Typography>

                <Typography variant="h3" component="h2" sx={{ textWrap: 'balance' }}>
                  Announcements, protocol updates and ecosystem milestones will be published here.
                </Typography>

                <Typography variant="body1" component="p" sx={{ maxWidth: 620 }}>
                  In the meantime, the published roadmap sets out exactly what is being built and when.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ pt: 1 }}>
                  <CTAButton component={RouterLink} to="/#roadmap">
                    View the Roadmap
                  </CTAButton>
                  <CTAButton
                    component={RouterLink}
                    to="/#elimcoin"
                    variant="outlined"
                    magnetic={false}
                    showArrow={false}
                  >
                    ELIMCOIN
                  </CTAButton>
                </Stack>
              </Stack>
            </Stack>
          </GlassCard>
        </Reveal>
      </Section>

      {currentPhase && (
        <Section density="compact" flush="top">
          <Reveal variant="fadeUp">
            <GlassCard accent="blue" radius={24} padding={{ xs: 3, md: 4 }} interactive={false}>
              <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3 }}>
                <IconTile name="engine" accent="blue" size="md" />
                <Box>
                  <Typography
                    sx={{
                      fontFamily: fontFamilies.mono,
                      fontSize: '0.625rem',
                      letterSpacing: '0.22em',
                      color: 'info.light',
                      mb: 0.75,
                    }}
                  >
                    {currentPhase.phase}
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {currentPhase.name}
                  </Typography>
                </Box>
              </Stack>

              <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {currentPhase.items.map((item) => (
                  <Box
                    component="li"
                    key={item.label}
                    sx={{
                      py: 1.75,
                      '&:first-of-type': { pt: 0 },
                      '&:last-of-type': { pb: 0 },
                      '& + li': { borderTop: (t) => `1px solid ${t.ef.borders.hairline}` },
                    }}
                  >
                    <Typography variant="body2" component="p">
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
          </Reveal>
        </Section>
      )}
    </>
  );
}
