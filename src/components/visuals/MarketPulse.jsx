import { memo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useReducedMotion } from 'framer-motion';

const UP = { r: 31, g: 185, b: 138 }; // emerald
const DOWN = { r: 76, g: 141, b: 255 }; // electric blue

const rgba = (c, a) => `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;

/**
 * Live market visualisation for the hero stage — a scrolling candle series with
 * a glowing mark-price trace, rendered on canvas.
 *
 * Deliberately synthetic: it is a visual instrument, not market data. Runs on a
 * single rAF loop, pauses when scrolled out of view or when the tab is hidden,
 * and renders one static frame under `prefers-reduced-motion`.
 */
function MarketPulse({ height = 240, candleWidth = 9, gap = 5, sx, ...props }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let h = 0;
    let candles = [];
    let phase = 0;
    let raf = 0;
    let visible = true;
    let last = 0;

    // Deterministic pseudo-random walk so the trace has character but no jitter spikes.
    let seed = 20260807;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    let price = 62;
    const nextCandle = () => {
      const drift = 0.16;
      const volatility = 3.1;
      const open = price;
      const move = (rand() - 0.5) * volatility + drift;
      const close = Math.max(12, Math.min(92, open + move));
      const wick = rand() * 2.2 + 0.5;
      price = close;
      return {
        open,
        close,
        high: Math.max(open, close) + wick,
        low: Math.min(open, close) - wick,
      };
    };

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(320, rect.width);
      h = height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.ceil(width / (candleWidth + gap)) + 3;
      if (candles.length < count) {
        while (candles.length < count) candles.push(nextCandle());
      } else {
        candles = candles.slice(candles.length - count);
      }
    };

    const yFor = (v) => h - 26 - (v / 100) * (h - 56);

    const draw = () => {
      ctx.clearRect(0, 0, width, h);

      // Reference grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i += 1) {
        const y = Math.round(14 + (i * (h - 40)) / 4) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      const step = candleWidth + gap;
      const offset = -phase;

      // Candles
      candles.forEach((c, i) => {
        const x = Math.round(offset + i * step) + 0.5;
        if (x < -step || x > width + step) return;
        const rising = c.close >= c.open;
        const color = rising ? UP : DOWN;
        const bodyTop = yFor(Math.max(c.open, c.close));
        const bodyBottom = yFor(Math.min(c.open, c.close));
        const bodyH = Math.max(1.5, bodyBottom - bodyTop);

        ctx.strokeStyle = rgba(color, 0.42);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, yFor(c.high));
        ctx.lineTo(x + candleWidth / 2, yFor(c.low));
        ctx.stroke();

        const grad = ctx.createLinearGradient(0, bodyTop, 0, bodyTop + bodyH);
        grad.addColorStop(0, rgba(color, 0.9));
        grad.addColorStop(1, rgba(color, 0.35));
        ctx.fillStyle = grad;
        ctx.fillRect(x, bodyTop, candleWidth, bodyH);
      });

      // Mark-price trace + area
      ctx.save();
      ctx.beginPath();
      candles.forEach((c, i) => {
        const x = offset + i * step + candleWidth / 2;
        const y = yFor(c.close);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      const traceGrad = ctx.createLinearGradient(0, 0, width, 0);
      traceGrad.addColorStop(0, rgba(DOWN, 0.16));
      traceGrad.addColorStop(0.45, rgba(UP, 0.85));
      traceGrad.addColorStop(1, rgba(UP, 1));
      ctx.strokeStyle = traceGrad;
      ctx.lineWidth = 1.8;
      ctx.lineJoin = 'round';
      ctx.shadowColor = rgba(UP, 0.55);
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.lineTo(offset + (candles.length - 1) * step + candleWidth / 2, h);
      ctx.lineTo(offset + candleWidth / 2, h);
      ctx.closePath();
      const fill = ctx.createLinearGradient(0, 0, 0, h);
      fill.addColorStop(0, rgba(UP, 0.16));
      fill.addColorStop(1, rgba(UP, 0));
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();

      // Leading marker
      const lastCandle = candles[candles.length - 1];
      if (lastCandle) {
        const lx = offset + (candles.length - 1) * step + candleWidth / 2;
        const ly = yFor(lastCandle.close);
        ctx.save();
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = rgba(UP, 0.28);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, ly);
        ctx.lineTo(width, ly);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = rgba(UP, 1);
        ctx.shadowColor = rgba(UP, 0.9);
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(Math.min(lx, width - 6), ly, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const delta = last ? Math.min(now - last, 48) : 16;
      last = now;

      phase += delta * 0.022;
      const step = candleWidth + gap;
      while (phase >= step) {
        phase -= step;
        candles.shift();
        candles.push(nextCandle());
      }
      draw();
    };

    measure();
    for (let i = 0; i < 140; i += 1) nextCandle(); // warm up the walk
    candles = candles.map(() => nextCandle());

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) last = 0;
    });
    io.observe(wrap);

    const onVisibility = () => {
      visible = !document.hidden;
      last = 0;
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [height, candleWidth, gap, reduced]);

  return (
    <Box ref={wrapRef} aria-hidden sx={{ width: '100%', lineHeight: 0, ...sx }} {...props}>
      <Box component="canvas" ref={canvasRef} sx={{ display: 'block', width: '100%' }} />
    </Box>
  );
}

export default memo(MarketPulse);
