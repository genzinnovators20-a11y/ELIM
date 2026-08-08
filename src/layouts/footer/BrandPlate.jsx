import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@/components/ui/layout';
import Icon from '../../components/ui/Icon';
import NotchedRule from '../../components/ui/NotchedRule';
import GradientText from '../../components/ui/GradientText';
import PalmMark from '../../components/brand/PalmMark';
import BrandArt from '../../components/brand/BrandArt';
import { contact, hero } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * The closing brand statement: the ELIM FORGE corporate plate, rebuilt in the
 * site's own material language.
 *
 * Everything here is markup — the beveled double frame is two concentric
 * gradient hairlines, the emerald ground and navy chevron are CSS gradients, the
 * geometric lattice is three repeating gradients, the palm is a drawn vector and
 * the coin is the site's existing ELIM COIN asset. No image of the card is used.
 */

/** Left-pointing arrow edge on the emblem panel — the card's signature cut. */
const CHEVRON = 'polygon(0% 50%, 13% 0%, 100% 0%, 100% 100%, 13% 100%)';

/** Clears the clipped diagonal so nothing inside the panel is ever cut. */
const CHEVRON_CLEARANCE = 'calc(13% + 22px)';

const labelSx = {
  fontFamily: fontFamilies.mono,
  fontSize: { xs: '0.625rem', md: '0.6875rem' },
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#DCC069',
  mb: 0.75,
};

const valueSx = {
  fontFamily: fontFamilies.body,
  fontSize: { xs: '0.9375rem', md: '1rem' },
  lineHeight: 1.65,
  color: 'text.primary',
  letterSpacing: '-0.002em',
};

/** Gold medallion carrying a contact glyph — the card's circular icon frames. */
const Medallion = ({ name }) => (
  <Box
    className="ef-medallion"
    sx={(t) => ({
      width: { xs: 40, md: 46 },
      height: { xs: 40, md: 46 },
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      borderRadius: '50%',
      color: '#E7CE78',
      border: '1px solid rgba(212,175,55,0.42)',
      background:
        'radial-gradient(130% 130% at 28% 18%, rgba(212,175,55,0.20) 0%, rgba(212,175,55,0.05) 46%, rgba(0,0,0,0.34) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,246,216,0.24), 0 10px 24px -16px rgba(212,175,55,0.85)',
      transition: `border-color 420ms ${t.ef.easings.css.luxe}, box-shadow 420ms ${t.ef.easings.css.luxe}, color 420ms ease`,
    })}
  >
    <Icon name={name} sx={{ fontSize: { xs: 18, md: 20 } }} />
  </Box>
);

const ContactRow = ({ row }) => {
  const values = row.lines.map((line) => (
    <Typography key={line} component="span" sx={{ ...valueSx, display: 'block' }}>
      {line}
    </Typography>
  ));

  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, md: 2.5 }}
      alignItems="flex-start"
      sx={{
        '&:hover .ef-medallion': {
          borderColor: 'rgba(212,175,55,0.78)',
          color: '#F8EFCF',
          boxShadow: 'inset 0 1px 0 rgba(255,246,216,0.4), 0 12px 28px -14px rgba(212,175,55,0.95)',
        },
      }}
    >
      <Medallion name={row.icon} />
      <Box sx={{ minWidth: 0, pt: 0.25 }}>
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
              '&:hover': { color: '#F1DFA4', borderBottomColor: 'rgba(212,175,55,0.5)' },
              '&:hover span': { color: 'inherit' },
              '&:focus-visible': { color: '#F1DFA4' },
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

function BrandPlate() {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: { xs: '20px', sm: '26px', md: '32px' },
        p: { xs: '5px', sm: '7px', md: '10px' },
        filter: 'drop-shadow(0 44px 90px rgba(0,0,0,0.72))',

        /* Outer bevel rule */
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background:
            'linear-gradient(148deg, rgba(248,239,207,0.72) 0%, rgba(212,175,55,0.38) 24%, rgba(212,175,55,0.12) 52%, rgba(212,175,55,0.42) 78%, rgba(248,239,207,0.6) 100%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Inner plate */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
          border: '1px solid rgba(212,175,55,0.34)',
          background:
            'linear-gradient(152deg, rgba(12,58,47,0.62) 0%, rgba(6,38,31,0.78) 42%, rgba(7,20,20,0.9) 100%), linear-gradient(0deg, rgba(5,7,10,0.92), rgba(5,7,10,0.92))',
          boxShadow: 'inset 0 1px 0 rgba(255,246,216,0.14), inset 0 -40px 90px -50px rgba(0,0,0,0.9)',
        }}
      >
        <Stack direction={{ xs: 'column', lg: 'row' }}>
          {/* ── Identity + contact ─────────────────────────────── */}
          <Box
            sx={{
              flex: { lg: '1 1 auto' },
              minWidth: 0,
              px: { xs: 3, sm: 4.5, md: 6 },
              py: { xs: 4.5, sm: 5.5, md: 6.5 },
            }}
          >
            <Typography
              component="p"
              aria-label="ELIM FORGE"
              sx={{
                fontFamily: fontFamilies.display,
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 6.4vw, 3.4rem)',
                lineHeight: 1.04,
                letterSpacing: { xs: '0.03em', sm: '0.06em' },
                filter: 'drop-shadow(0 12px 30px rgba(212,175,55,0.2))',
              }}
            >
              <GradientText fill="gold" component="span">
                ELIM FORGE
              </GradientText>
            </Typography>

            <Typography
              component="p"
              sx={{
                mt: 1.5,
                fontFamily: fontFamilies.mono,
                fontSize: { xs: '0.5625rem', md: '0.625rem' },
                letterSpacing: '0.24em',
                lineHeight: 1.9,
                color: (t) => t.ef.text.muted,
              }}
            >
              {hero.tagline}
            </Typography>

            <NotchedRule sx={{ my: { xs: 3, md: 3.75 } }} />

            <Stack spacing={{ xs: 3, md: 3.5 }} divider={<NotchedRule opacity={0.4} />}>
              {contact.rows.map((row) => (
                <ContactRow key={row.id} row={row} />
              ))}
            </Stack>
          </Box>

          {/* ── Emblem panel ───────────────────────────────────── */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flex: { lg: '0 0 42%' },
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                clipPath: { xs: 'none', lg: CHEVRON },
                borderTop: { xs: '1px solid rgba(212,175,55,0.24)', lg: 0 },
                background:
                  'linear-gradient(162deg, rgba(12,30,52,0.94) 0%, rgba(7,18,33,0.97) 55%, rgba(5,12,24,0.98) 100%)',
                px: { xs: 3, sm: 4.5, lg: 3 },
                pl: { lg: CHEVRON_CLEARANCE },
                py: { xs: 5, md: 6 },
              }}
            >
              {/* Geometric lattice — three repeating rules, no image */}
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  opacity: 0.7,
                  backgroundImage:
                    'repeating-linear-gradient(60deg, rgba(212,175,55,0.055) 0 1px, transparent 1px 30px), repeating-linear-gradient(-60deg, rgba(212,175,55,0.055) 0 1px, transparent 1px 30px), repeating-linear-gradient(0deg, rgba(212,175,55,0.035) 0 1px, transparent 1px 26px)',
                  maskImage: 'radial-gradient(78% 78% at 62% 45%, #000 0%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(78% 78% at 62% 45%, #000 0%, transparent 100%)',
                }}
              />

              <Stack
                spacing={{ xs: 2.5, md: 3 }}
                alignItems="center"
                sx={{ position: 'relative', textAlign: 'center' }}
              >
                <PalmMark size={96} />

                <Box sx={{ position: 'relative', width: '100%', display: 'grid', placeItems: 'center' }}>
                  <Box
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      width: 'min(280px, 130%)',
                      aspectRatio: '1 / 1',
                      background:
                        'radial-gradient(50% 50% at 50% 50%, rgba(212,175,55,0.22) 0%, transparent 68%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <BrandArt
                    asset="coin"
                    sx={{
                      position: 'relative',
                      width: { xs: 148, sm: 168, md: 178 },
                      filter: 'drop-shadow(0 22px 34px rgba(0,0,0,0.7))',
                    }}
                  />
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ maxWidth: '100%' }}>
                  <Box
                    aria-hidden
                    sx={{ width: { xs: 18, md: 26 }, height: '1px', background: 'rgba(212,175,55,0.7)' }}
                  />
                  <Typography
                    component="p"
                    sx={{
                      fontFamily: fontFamilies.display,
                      fontWeight: 600,
                      fontSize: { xs: '1.0625rem', md: '1.1875rem' },
                      letterSpacing: '0.14em',
                    }}
                  >
                    <GradientText fill="gold" component="span">
                      {contact.coinCaption}
                    </GradientText>
                  </Typography>
                  <Box
                    aria-hidden
                    sx={{ width: { xs: 18, md: 26 }, height: '1px', background: 'rgba(212,175,55,0.7)' }}
                  />
                </Stack>

                <Box>
                  <Typography
                    component="p"
                    sx={{ fontSize: '0.875rem', color: (t) => t.ef.text.tertiary, lineHeight: 1.6 }}
                  >
                    {contact.poweredLead}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontFamily: fontFamilies.display,
                      fontWeight: 600,
                      fontSize: { xs: '0.9375rem', md: '1rem' },
                      letterSpacing: '0.01em',
                      color: '#E3C765',
                      lineHeight: 1.6,
                    }}
                  >
                    {contact.poweredBy}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Chevron edge — stroked over the clip so the cut keeps its gold rule */}
            <Box
              aria-hidden
              component="svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              sx={{
                display: { xs: 'none', lg: 'block' },
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <polygon
                points="0,50 13,0 100,0 100,100 13,100"
                fill="none"
                stroke="rgba(212,175,55,0.62)"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
              {/* Outboard companion rule — the card's double-arrow detail */}
              <polyline
                points="8,3 -5,50 8,97"
                fill="none"
                stroke="rgba(212,175,55,0.32)"
                strokeWidth="1.2"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default memo(BrandPlate);
