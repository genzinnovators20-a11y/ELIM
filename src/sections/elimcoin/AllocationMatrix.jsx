import { useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack } from '@/components/ui/layout';
import Typography from '@mui/material/Typography';
import Section from '../../components/ui/Section';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/ui/Reveal';
import GlassCard from '../../components/ui/GlassCard';
import DonutChart from '../../components/charts/DonutChart';
import AllocationBar from '../../components/charts/AllocationBar';
import AnimatedNumber from '../../components/ui/AnimatedNumber';
import { allocation, elimcoin } from '../../constants/content';
import { fontFamilies } from '../../theme/typography';
import { alphaOf } from '../../utils/accents';

/**
 * Distribution Strategy & Allocation Matrix.
 *
 * The source table is preserved down to the last digit but rendered as a linked
 * donut + register: hovering either side lights the same allocation, and the
 * centre readout switches to that row. Column headings from the document run
 * above the register so nothing from the table is lost.
 */
export default function AllocationMatrix() {
  const [active, setActive] = useState(null);
  const rows = allocation.rows;
  const current = active != null ? rows[active] : null;

  return (
    <Section id="tokenomics" tone="gold">
      <SectionHeading
        eyebrow={allocation.title}
        title={allocation.heading}
        lede={allocation.subheading}
        maxWidth={900}
        ledeSx={{
          fontFamily: fontFamilies.serif,
          fontSize: 'clamp(1.35rem, 2.6vw, 2.1rem)',
          lineHeight: 1.22,
          color: 'primary.light',
        }}
      />

      <Grid container spacing={{ xs: 5, lg: 7 }} alignItems="center" sx={{ mt: { xs: 3, md: 5 } }}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Reveal variant="scale">
            <DonutChart
              data={rows.map((r) => ({ value: r.value, color: r.color, label: r.category }))}
              size={400}
              thickness={40}
              activeIndex={active}
              onHover={setActive}
              ariaLabel={`Allocation matrix. ${rows.map((r) => `${r.category}: ${r.percentage}, ${r.volume}`).join('. ')}`}
            >
              <Stack spacing={0.75} alignItems="center">
                {current ? (
                  <>
                    <AnimatedNumber
                      key={current.category}
                      value={current.value}
                      suffix="%"
                      duration={500}
                      sx={{
                        fontSize: { xs: '2.25rem', md: '2.75rem' },
                        fontWeight: 700,
                        color: alphaOf(current.color, 1),
                        lineHeight: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'text.primary',
                        maxWidth: 160,
                        lineHeight: 1.45,
                      }}
                    >
                      {current.category}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fontFamilies.mono,
                        fontSize: '0.625rem',
                        color: (t) => t.ef.text.muted,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {current.volume}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
                      Total Supply
                    </Typography>
                    <AnimatedNumber
                      value={1000000000}
                      sx={{
                        fontSize: { xs: '1.5rem', md: '1.875rem' },
                        fontWeight: 700,
                        color: 'text.primary',
                        lineHeight: 1.1,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: fontFamilies.mono,
                        fontSize: '0.6875rem',
                        letterSpacing: '0.16em',
                        color: 'primary.light',
                      }}
                    >
                      ELM
                    </Typography>
                  </>
                )}
              </Stack>
            </DonutChart>
          </Reveal>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Reveal variant="fadeUp" delay={0.08}>
            <GlassCard accent="gold" radius={24} padding={{ xs: 2.5, md: 4 }} interactive={false} glow={false}>
              {/* Column headings, straight from the source table */}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ pb: 2, mb: 1, borderBottom: (t) => `1px solid ${t.ef.borders.soft}` }}
              >
                <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
                  {allocation.columns[0]}
                </Typography>
                <Stack direction="row" spacing={{ xs: 1.5, md: 2.5 }}>
                  <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
                    {allocation.columns[1]}
                  </Typography>
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: '0.5625rem',
                      display: { xs: 'none', sm: 'block' },
                      minWidth: { sm: 132 },
                      textAlign: 'right',
                    }}
                  >
                    {allocation.columns[2]}
                  </Typography>
                </Stack>
              </Stack>

              <Box role="list">
                {rows.map((row, i) => (
                  <Box role="listitem" key={row.category}>
                    <AllocationBar
                      label={row.category}
                      percentage={row.percentage}
                      value={row.value}
                      volume={row.volume}
                      color={row.color}
                      index={i}
                      scale={50}
                      active={active === i}
                      onHover={setActive}
                    />
                  </Box>
                ))}
              </Box>

              <Stack
                direction="row"
                alignItems="baseline"
                justifyContent="space-between"
                sx={{ pt: 2.5, mt: 1, borderTop: (t) => `1px solid ${t.ef.borders.soft}` }}
              >
                <Typography variant="overline" sx={{ fontSize: '0.5625rem' }}>
                  {elimcoin.specs[3].label} {elimcoin.specs[3].value}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fontFamilies.mono,
                    fontSize: '0.75rem',
                    fontVariantNumeric: 'tabular-nums',
                    color: 'primary.light',
                  }}
                >
                  100%
                </Typography>
              </Stack>
            </GlassCard>
          </Reveal>
        </Grid>
      </Grid>
    </Section>
  );
}
