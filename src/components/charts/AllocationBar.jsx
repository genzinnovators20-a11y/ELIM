import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import { getAccent, alphaOf } from '../../utils/accents';
import useReveal from '../../hooks/useReveal';
import { fontFamilies } from '../../theme/typography';

/**
 * A single allocation row: category, percentage, token volume and a proportional
 * meter. Row and meter share one accent so the donut, the list and the bar all
 * name the same slice with the same colour.
 */
export default function AllocationBar({
  label,
  percentage,
  value,
  volume,
  color = 'gold',
  index = 0,
  active = false,
  scale = 100,
  onHover,
}) {
  const accent = getAccent(color);
  const revealRef = useReveal();

  return (
    <Box
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHover?.(null)}
      sx={{
        py: { xs: 1.75, md: 2 },
        px: { xs: 1.5, md: 2 },
        mx: { xs: -1.5, md: -2 },
        borderRadius: 2,
        cursor: 'default',
        transition: (t) => `background-color 380ms ${t.ef.easings.css.luxe}`,
        backgroundColor: active ? alphaOf(color, 0.06) : 'transparent',
        '& + &': { borderTop: (t) => `1px solid ${t.ef.borders.hairline}` },
      }}
    >
      <Stack direction="row" alignItems="baseline" justifyContent="space-between" spacing={2} sx={{ mb: 1.25 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            aria-hidden
            sx={{
              width: 8,
              height: 8,
              borderRadius: '2px',
              flexShrink: 0,
              background: `linear-gradient(135deg, ${accent.light}, ${accent.base})`,
              boxShadow: active ? `0 0 12px ${alphaOf(color, 0.8)}` : 'none',
              transition: 'box-shadow 380ms ease',
            }}
          />
          <Typography
            component="span"
            sx={{
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
              fontWeight: 500,
              color: active ? 'text.primary' : 'text.secondary',
              transition: 'color 380ms ease',
              textWrap: 'balance',
            }}
          >
            {label}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={{ xs: 1.5, md: 2.5 }} alignItems="baseline" sx={{ flexShrink: 0 }}>
          <Typography
            component="span"
            sx={{
              fontFamily: fontFamilies.display,
              fontWeight: 600,
              fontSize: { xs: '0.9375rem', md: '1.0625rem' },
              fontVariantNumeric: 'tabular-nums',
              color: active ? accent.light : 'text.primary',
              transition: 'color 380ms ease',
            }}
          >
            {percentage}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: fontFamilies.mono,
              fontSize: { xs: '0.6875rem', md: '0.75rem' },
              fontVariantNumeric: 'tabular-nums',
              color: (t) => t.ef.text.muted,
              display: { xs: 'none', sm: 'block' },
              minWidth: { sm: 132 },
              textAlign: 'right',
            }}
          >
            {volume}
          </Typography>
        </Stack>
      </Stack>

      {/* Meter */}
      <Box sx={{ position: 'relative', height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.045)', overflow: 'hidden' }}>
        <Box
          ref={revealRef}
          className="ef-meter"
          style={{
            '--meter-fill': value / scale,
            '--meter-delay': `${Math.round((0.1 + index * 0.07) * 1000)}ms`,
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${accent.deep}, ${accent.base} 60%, ${accent.light})`,
            boxShadow: active ? `0 0 14px ${alphaOf(color, 0.6)}` : 'none',
            transition: 'box-shadow 380ms ease',
          }}
        />
      </Box>

      <Typography
        sx={{
          display: { xs: 'block', sm: 'none' },
          mt: 1,
          fontFamily: fontFamilies.mono,
          fontSize: '0.6875rem',
          color: (t) => t.ef.text.muted,
        }}
      >
        {volume}
      </Typography>
    </Box>
  );
}
