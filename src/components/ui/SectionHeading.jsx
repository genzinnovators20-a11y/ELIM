import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

/**
 * Standard section header: kicker, display title, optional lede.
 * `title` accepts nodes so emphasis can be applied without altering the words.
 */
function SectionHeading({
  eyebrow,
  title,
  lede,
  accent = 'gold',
  align = 'left',
  variant = 'h2',
  maxWidth = 780,
  id,
  sx,
  titleSx,
  ledeSx,
}) {
  const centered = align === 'center';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left',
        ...sx,
      }}
    >
      {eyebrow && (
        <Reveal variant="fadeUpSm">
          <Eyebrow accent={accent} align={align} sx={{ mb: { xs: 2, md: 2.5 } }}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}

      <Reveal variant="blur" delay={0.05}>
        <Typography id={id} variant={variant} component={variant === 'h1' ? 'h1' : 'h2'} sx={{ maxWidth, ...titleSx }}>
          {title}
        </Typography>
      </Reveal>

      {lede && (
        <Reveal variant="fadeUp" delay={0.12}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              mt: { xs: 2.25, md: 2.75 },
              /**
               * Capped by reading measure rather than by the title's width: a
               * lede that runs as wide as a 62px headline is 110 characters per
               * line, and the eye loses the return sweep.
               */
              maxWidth: (t) => `min(${t.ef.layout.measure}, 100%)`,
              ...ledeSx,
            }}
          >
            {lede}
          </Typography>
        </Reveal>
      )}
    </Box>
  );
}

export default memo(SectionHeading);
