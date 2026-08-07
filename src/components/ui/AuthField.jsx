import { memo } from 'react';
import { Stack } from '@/components/ui/layout';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { fontFamilies } from '../../theme/typography';

/**
 * Labelled input for the account routes. Uses an explicit, always-visible label
 * bound with `htmlFor` rather than a floating placeholder — clearer for screen
 * readers and for anyone filling a form under pressure.
 */
function AuthField({ id, label, error, helperText, ...props }) {
  return (
    <Stack spacing={1}>
      <InputLabel
        htmlFor={id}
        sx={{
          fontFamily: fontFamilies.mono,
          fontSize: '0.625rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: (t) => t.ef.text.tertiary,
        }}
      >
        {label}
      </InputLabel>
      <TextField
        id={id}
        fullWidth
        error={Boolean(error)}
        helperText={error || helperText}
        slotProps={{ formHelperText: { sx: { mx: 0, mt: 1, fontSize: '0.75rem' } } }}
        {...props}
      />
    </Stack>
  );
}

export default memo(AuthField);
