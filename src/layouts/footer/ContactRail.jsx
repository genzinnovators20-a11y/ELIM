import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@/components/ui/layout';
import Icon from '../../components/ui/Icon';
import { contact } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * Registered office, mobile and website — the three facts from the ELIM FORGE
 * corporate card, carried over intact.
 *
 * The gold medallion around each glyph is the card's signature icon frame and
 * is what keeps this reading as the same identity now that the card itself is
 * gone. Everything is markup; no artwork is used.
 */

/** Gold medallion carrying a contact glyph. */
const Medallion = ({ name }) => (
  <Box
    className="ef-medallion"
    sx={(t) => ({
      width: 34,
      height: 34,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      borderRadius: '50%',
      color: '#E7CE78',
      border: '1px solid rgba(212,175,55,0.4)',
      background:
        'radial-gradient(130% 130% at 28% 18%, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 46%, rgba(0,0,0,0.34) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,246,216,0.22), 0 8px 20px -14px rgba(212,175,55,0.85)',
      transition: `border-color 420ms ${t.ef.easings.css.luxe}, box-shadow 420ms ${t.ef.easings.css.luxe}, color 420ms ease`,
    })}
  >
    <Icon name={name} sx={{ fontSize: 16 }} />
  </Box>
);

const labelSx = {
  fontFamily: fontFamilies.mono,
  fontSize: '0.5625rem',
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#C9A94E',
  lineHeight: 1.6,
};

const valueSx = {
  fontSize: '0.8125rem',
  lineHeight: 1.55,
  color: (t) => t.ef.text.secondary,
  letterSpacing: '-0.002em',
};

const ContactRow = ({ row }) => {
  const values = row.lines.map((line) => (
    <Typography key={line} component="span" sx={{ ...valueSx, display: 'block' }}>
      {line}
    </Typography>
  ));

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
      sx={{
        '&:hover .ef-medallion': {
          borderColor: 'rgba(212,175,55,0.78)',
          color: '#F8EFCF',
          boxShadow: 'inset 0 1px 0 rgba(255,246,216,0.4), 0 10px 24px -14px rgba(212,175,55,0.95)',
        },
      }}
    >
      <Medallion name={row.icon} />
      <Box sx={{ minWidth: 0 }}>
        <Typography component="p" sx={labelSx}>
          {row.label}
        </Typography>
        {row.href ? (
          <Box
            component="a"
            href={row.href}
            sx={(t) => ({
              display: 'inline-block',
              textDecoration: 'none',
              color: 'inherit',
              borderBottom: '1px solid transparent',
              transition: `color 320ms ease, border-color 320ms ${t.ef.easings.css.luxe}`,
              '&:hover span, &:focus-visible span': { color: '#F1DFA4' },
              '&:hover': { borderBottomColor: 'rgba(212,175,55,0.45)' },
            })}
          >
            {values}
          </Box>
        ) : (
          values
        )}
      </Box>
    </Stack>
  );
};

function ContactRail() {
  return (
    <Stack component="address" spacing={1.75} sx={{ fontStyle: 'normal' }}>
      {contact.rows.map((row) => (
        <ContactRow key={row.id} row={row} />
      ))}
    </Stack>
  );
}

export default memo(ContactRail);
