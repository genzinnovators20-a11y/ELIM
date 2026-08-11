import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import IconTile from '../../components/ui/IconTile';
import GradientText from '../../components/ui/GradientText';
import { featuresGrid } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { layout } from '../../theme/tokens';

const groupAccent = { 'core-architecture': 'blue', 'token-utilities': 'gold' };

/** Split the document's compound title so the promise carries a metallic fill. */
const [titleLead, ...titleRest] = featuresGrid.title.split(': ');

function FeatureCard({ item, accent }) {
  return (
    <GlassCard accent={accent} radius={20} padding={{ xs: 3, md: 3.5 }} sx={{ height: '100%', gap: 2.5 }}>
      <IconTile name={item.icon} accent={accent} size="md" />
      <Box>
        <Typography variant="h5" component="h4" sx={{ mb: 1.25, fontSize: { xs: '1.0625rem', md: '1.1875rem' } }}>
          {item.label}
        </Typography>
        <Typography variant="body2" component="p" sx={{ lineHeight: 1.75 }}>
          <Box component="span" sx={{ color: (t) => t.ef.text.disabled, mr: 0.5 }}>
            {item.separator}
          </Box>
          {item.body}
        </Typography>
      </Box>
    </GlassCard>
  );
}

/**
 * Features grid. Two named groups from the document, each with its own accent
 * so "what it is" and "what the token does" stay visually distinct.
 */
export default function FeaturesGrid() {
  return (
    <Section id="features" tone="gold">
      <SectionHeading
        eyebrow="Capability Map"
        title={
          <>
            {titleLead}:{' '}
            <GradientText fill="gold" component="span">
              {titleRest.join(': ')}
            </GradientText>
          </>
        }
        maxWidth={920}
      />

      <Stack spacing={layout.stack.head} sx={{ mt: layout.stack.head }}>
        {featuresGrid.groups.map((group) => {
          const accent = groupAccent[group.id] ?? 'gold';
          return (
            <Box key={group.id}>
              <Stack direction="row" alignItems="center" spacing={2.5} sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ fontFamily: fontFamilies.display, whiteSpace: 'nowrap' }}
                >
                  {group.title}
                </Typography>
                <Box
                  aria-hidden
                  sx={{
                    flex: 1,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.14), transparent)',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.625rem',
                    letterSpacing: '0.2em',
                    color: (t) => t.ef.text.disabled,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {String(group.items.length).padStart(2, '0')}
                </Typography>
              </Stack>

              <RevealGroup>
                <Grid container spacing={{ xs: 2.5, md: 3 }}>
                  {group.items.map((item) => (
                    <Grid
                      size={{ xs: 12, sm: 6, md: group.items.length === 4 ? 6 : 4, lg: group.items.length === 4 ? 3 : 4 }}
                      key={item.label}
                    >
                      <RevealItem sx={{ height: '100%' }}>
                        <FeatureCard item={item} accent={accent} />
                      </RevealItem>
                    </Grid>
                  ))}
                </Grid>
              </RevealGroup>
            </Box>
          );
        })}
      </Stack>
    </Section>
  );
}
