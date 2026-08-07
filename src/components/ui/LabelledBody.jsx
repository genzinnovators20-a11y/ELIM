import { memo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * Renders a `label — body` content pair.
 *
 * The source document colours the label; that hierarchy is carried here by
 * weight and tone. The separator character (— / – / : / none) comes straight
 * from the content file so punctuation is never normalised.
 */
function LabelledBody({
  label,
  separator = '—',
  body,
  labelColor = 'text.primary',
  variant = 'body2',
  component = 'p',
  labelBlock = false,
  sx,
  labelSx,
}) {
  if (labelBlock) {
    return (
      <Box sx={sx}>
        <Typography
          component="span"
          sx={{
            display: 'block',
            fontWeight: 600,
            color: labelColor,
            fontSize: { xs: '1rem', md: '1.0625rem' },
            letterSpacing: '-0.01em',
            mb: 0.75,
            ...labelSx,
          }}
        >
          {label}
        </Typography>
        <Typography variant={variant} component="p">
          {body}
        </Typography>
      </Box>
    );
  }

  return (
    <Typography variant={variant} component={component} sx={sx}>
      <Box component="strong" sx={{ fontWeight: 600, color: labelColor, ...labelSx }}>
        {label}
      </Box>
      {separator ? ` ${separator} ` : ''}
      {body}
    </Typography>
  );
}

export default memo(LabelledBody);
