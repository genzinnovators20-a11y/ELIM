import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import Reveal from '../../components/ui/Reveal';
import Eyebrow from '../../components/ui/Eyebrow';
import GradientText from '../../components/ui/GradientText';
import { intro } from '../../constants/content';

/**
 * Positioning statement. The document's own section heading is preserved
 * character for character; only the leading brand token carries a metallic fill
 * so the hierarchy the source used colour for survives.
 */
export default function Overview() {
  return (
    /*
      Default density, not spacious: this is the first section under the
      masthead, and it should read as the Hero's continuation rather than as a
      block floating away from it. `spacious` is reserved for the two deliberate
      moments on the page — the staking pivot and the closing call.
    */
    <Section id="overview" tone="sunken">
      <Stack spacing={{ xs: 4, md: 5 }} sx={{ maxWidth: 1080 }}>
        <Reveal variant="fadeUpSm">
          <Eyebrow>Institutional Infrastructure</Eyebrow>
        </Reveal>

        <Reveal variant="blur" delay={0.06}>
          <Typography
            variant="h2"
            component="h2"
          >
            <GradientText fill="gold" component="span">
              {intro.headingLead}
            </GradientText>
            {intro.headingRest}
          </Typography>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.12}>
          <Box>
            <Typography
              variant="quoteSm"
              component="p"
              sx={{ mb: { xs: 2.5, md: 3 } }}
            >
              {intro.subheading}
            </Typography>

            <Typography
              variant="subtitle1"
              component="p"
              sx={{ maxWidth: 760, fontSize: { xs: '1.0625rem', md: '1.3125rem' }, lineHeight: 1.62 }}
            >
              {intro.lede}
            </Typography>
          </Box>
        </Reveal>
      </Stack>
    </Section>
  );
}
