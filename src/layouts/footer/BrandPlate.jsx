import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@/components/ui/layout';
import GradientText from '../../components/ui/GradientText';
import BrandArt from '../../components/brand/BrandArt';
import { contact } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';

/**
 * The coin plate — the ELIM FORGE corporate card's emblem panel, kept as the
 * footer's branded anchor and nothing more.
 *
 * This used to be the whole card at full size, which is what made the footer
 * taller than the viewport. The card's identity survives in the parts that
 * carry it: the navy ground, the gold hairline, the geometric lattice and the
 * palm-above-coin lockup. Everything here is markup and existing vector assets
 * — the twin-palm mark and the official ELIM COIN artwork — so no image of the
 * card is used and the logo is never redrawn.
 */
function BrandPlate() {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        border: '1px solid rgba(212,175,55,0.3)',
        background:
          'linear-gradient(162deg, rgba(12,30,52,0.94) 0%, rgba(7,18,33,0.97) 55%, rgba(5,12,24,0.98) 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,246,216,0.13), 0 28px 62px -44px rgba(0,0,0,0.92)',
        px: { xs: 2.25, md: 3 },
        py: { xs: 2.5, md: 3.25 },
        /*
         * Capped until the plate has a column of its own. Left uncapped it
         * stretches to whatever the stacked layout gives it — a 440px panel
         * around a 130px coin — so it is held to a plate-like width and centred
         * until the large layout hands it a 3-column rail to fill.
         */
        maxWidth: { xs: 268, sm: 336, lg: 'none' },
        mx: { xs: 'auto', lg: 0 },
      }}
    >
      {/* Geometric lattice — three repeating rules, no image */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.6,
          backgroundImage:
            'repeating-linear-gradient(60deg, rgba(212,175,55,0.055) 0 1px, transparent 1px 26px), repeating-linear-gradient(-60deg, rgba(212,175,55,0.055) 0 1px, transparent 1px 26px), repeating-linear-gradient(0deg, rgba(212,175,55,0.035) 0 1px, transparent 1px 22px)',
          maskImage: 'radial-gradient(76% 76% at 58% 42%, #000 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(76% 76% at 58% 42%, #000 0%, transparent 100%)',
        }}
      />

      <Stack
        spacing={{ xs: 1.25, md: 2 }}
        alignItems="center"
        sx={{ position: 'relative', textAlign: 'center' }}
      >
        {/*
          The official twin-palm mark, lifted straight out of the corporate
          card: `elimforge-palm.svg` holds footer.svg's own palm paths, in their
          original order and colours, clipped to their own silhouette. Sized by
          width alone so the supplied proportions are never stretched.
        */}
        <Box
          component="img"
          src="/brand/elimforge-palm.svg"
          alt="ELIM FORGE palm emblem"
          width="201"
          height="178"
          loading="lazy"
          decoding="async"
          draggable={false}
          sx={{ width: 38, height: 'auto', flexShrink: 0, userSelect: 'none' }}
        />

        <Box sx={{ position: 'relative', width: '100%', display: 'grid', placeItems: 'center' }}>
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              width: 'min(210px, 124%)',
              aspectRatio: '1 / 1',
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(212,175,55,0.2) 0%, transparent 68%)',
              pointerEvents: 'none',
            }}
          />
          <BrandArt
            asset="coin"
            sx={{
              position: 'relative',
              width: { xs: 104, sm: 132, md: 124 },
              filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.7))',
            }}
          />
        </Box>

        {/* Rule-flanked coin caption — the card's centred lockup */}
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ maxWidth: '100%' }}>
          <Box aria-hidden sx={{ width: 18, height: '1px', background: 'rgba(212,175,55,0.7)' }} />
          <Typography
            component="p"
            sx={{
              fontFamily: fontFamilies.display,
              fontWeight: 600,
              fontSize: '0.9375rem',
              letterSpacing: '0.14em',
            }}
          >
            <GradientText fill="gold" component="span">
              {contact.coinCaption}
            </GradientText>
          </Typography>
          <Box aria-hidden sx={{ width: 18, height: '1px', background: 'rgba(212,175,55,0.7)' }} />
        </Stack>

        <Box>
          <Typography
            component="p"
            sx={{ fontSize: '0.6875rem', color: (t) => t.ef.text.tertiary, lineHeight: 1.5 }}
          >
            {contact.poweredLead}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontFamily: fontFamilies.display,
              fontWeight: 600,
              fontSize: '0.8125rem',
              letterSpacing: '0.01em',
              color: '#E3C765',
              lineHeight: 1.5,
            }}
          >
            {contact.poweredBy}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default memo(BrandPlate);
