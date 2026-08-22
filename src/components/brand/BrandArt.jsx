import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import EmblemFallback from './EmblemFallback';
import CoinFallback from './CoinFallback';

/**
 * Share of the square frame the artwork's own diameter occupies — matched to
 * the 95% bezel of the vector stand-ins, so a framed asset drops into a slot
 * at exactly the weight the stand-in held. The remaining 5% is also the frame's
 * clip margin, which is why the crop never touches the metal.
 */
const ART_FILL = 0.95;

/**
 * Computes the window onto a supplied artwork whose canvas carries padding of
 * its own.
 *
 * The official coins are delivered on sheets sized to the export, not to the
 * coin: the blue one is a 1516×1038 landscape with the disc floating in the
 * middle. Dropped into a square slot under `object-fit: contain` it would
 * letterbox to ~57% of the width and drift off the rings it is meant to sit
 * inside. So each asset records its artwork's measured box within that canvas,
 * and this returns the offsets that centre the disc in a square frame at
 * `ART_FILL` of the frame's width.
 *
 * Both arguments stay in the sheet's own units, whatever resolution the file is
 * actually served at: every value derived here is a ratio of one to the other,
 * so re-rendering the sheet larger or smaller leaves the framing untouched.
 *
 * The file itself is untouched — this only moves the window over it.
 *
 * @param canvas [width, height] of the supplied file, in its own units.
 * @param box    [x, y, width, height] of the artwork inside that canvas.
 */
function frameArt(canvas, box) {
  const [cw] = canvas;
  const [bx, by, bw, bh] = box;
  /* The disc's own diameter. Traced exports are rarely square to the pixel;
     the larger axis is what must not overflow the frame. */
  const diameter = Math.max(bw, bh);
  const pct = (n) => `${Number((n * 100).toFixed(4))}%`;

  return {
    width: pct((ART_FILL * cw) / diameter),
    height: 'auto',
    /* The frame is deliberately narrower than the canvas it looks at, so the
       global `img { max-width: 100% }` reset would clamp the zoom away and hand
       back a letterboxed disc. Opted out here rather than in the reset, which
       every other image on the site still wants. */
    maxWidth: 'none',
    left: pct(0.5 - (ART_FILL * (bx + bw / 2)) / diameter),
    top: pct(0.5 - (ART_FILL * (by + bh / 2)) / diameter),
  };
}

/*
 * Official ELIMCOIN artwork, and the source of truth for both marks. Every coin
 * surface on the site resolves through these entries, so each mark stays
 * identical everywhere it appears, and the `frame` boxes are measured off each
 * file's own alpha channel — which is what holds the disc centred and at the
 * weight the vector stand-in held.
 *
 * Served as WebP rendered from the supplied SVGs. The originals are auto-traced
 * exports — 13,481 and 6,057 separately-filled paths, 5MB and 2MB of path data —
 * which the browser re-rasterises from scratch at every distinct display size,
 * at 60-100ms of blocked main thread each time. Same artwork, same framing, same
 * alpha; only the decode path changes. The SVG masters live in `brand-src/`.
 *
 * **Each entry is rendered at the size it is actually displayed at.** They were
 * previously encoded near-losslessly at whatever resolution the export happened
 * to produce, which put 313KB of emblem and 228KB of coin on the masthead's
 * critical path to paint them at roughly 700px and 160px. Re-encoded against a
 * measured PSNR floor of ~36dB — the point at which the difference stops being
 * visible on this artwork — that is 112KB and 59KB for the same two surfaces.
 *
 * Presentation stops here. Callers own their own glow, blur, opacity, ghosted
 * duplicates and watermark layers; those live on wrappers outside this
 * component, so swapping the artwork underneath leaves them exactly as they
 * were. See `frameArt`.
 */
const BRAND_ASSETS = {
  emblem: {
    src: '/brand/elimcoin-blue.webp',
    width: 1400,
    height: 959,
    alt: 'ELIM FORGE — forged with blockchain',
    Fallback: EmblemFallback,
    frame: frameArt([1516, 1038], [336, 67, 854, 869]),
  },

  /**
   * The full gold coin, for the one surface that shows it large: the turning
   * disc on the ELIMCOIN stage, at 330px on a 3x screen. Nothing above the fold
   * uses it — see `coinSm`.
   */
  coin: {
    src: '/brand/elimcoin-gold.webp',
    width: 1024,
    height: 1024,
    alt: 'ELIM Coin (ELM) — Binance Smart Chain BEP-20 token',
    Fallback: CoinFallback,
    frame: frameArt([1600, 1600], [61, 55, 1480, 1481]),
  },

  /**
   * The same coin at 512px, for every surface that shows it small — the coin
   * drifting free of the masthead rig (~160px), the inline coin glyphs in the
   * ecosystem, staking and CTA sections (52-90px), and the footer plate.
   *
   * The masthead one is the reason this exists. It is `priority`, so it competes
   * with the emblem and the JavaScript for the first connection, and it was
   * fetching a 1024px sheet to paint a 160px disc — a quarter of a megabyte of
   * critical-path bandwidth for six times the pixels the slot can show. At 512
   * it still carries 3.2x what that slot needs on a 3x screen.
   *
   * Rendered from the same 1600x1600 master at the same padding, so `frame` is
   * identical and it drops into a slot exactly as the full coin does.
   */
  coinSm: {
    src: '/brand/elimcoin-gold-sm.webp',
    width: 512,
    height: 512,
    alt: 'ELIM Coin (ELM) — Binance Smart Chain BEP-20 token',
    Fallback: CoinFallback,
    frame: frameArt([1600, 1600], [61, 55, 1480, 1481]),
  },

  /**
   * The same gold coin again, rendered for the navigation lockup where the mark
   * is drawn at 40-48px. At 192px this carries 1.3x what a 50px mark needs on a
   * 3x screen, and costs 14KB.
   */
  mark: {
    src: '/brand/elimcoin-gold-mark.webp',
    width: 192,
    height: 192,
    alt: 'ELIM FORGE',
    Fallback: CoinFallback,
    frame: frameArt([1600, 1600], [61, 55, 1480, 1481]),
  },
};

/**
 * Renders a supplied brand image with `object-fit: contain` (never stretched,
 * never distorted) and degrades to the hand-authored vector mark if the file is
 * ever missing.
 *
 * Assets carrying a `frame` are presented through a square window onto their
 * own padded canvas instead — same square box, same centre, so they are drop-in
 * for the stand-in they replace. See `frameArt`.
 *
 * **The `<img>` is in the first render.** It used to be gated behind a
 * `new Image()` probe that resolved whether the file had been dropped into
 * /public/brand yet; the element only entered the DOM once that probe came back.
 * On the masthead that made the emblem — the Largest Contentful Paint element —
 * wait for JavaScript to download, parse, execute, mount, run an effect, load an
 * image and then re-render, and it measured a 2.6s LCP on a desktop with a fast
 * connection and nothing else to do. The `<link rel="preload">` in the document
 * head was paying for the bytes early and then having them sit unused for a
 * second.
 *
 * The probe was solving a problem that no longer exists: both files are in the
 * repository. `onError` covers the case it was insuring against, at no cost to
 * the path where the file is present, and the vector mark still renders if a
 * deployment ever ships without the artwork.
 */
function BrandArt({ asset = 'coin', alt, priority = false, sizes, sx, imgSx, ...props }) {
  const config = BRAND_ASSETS[asset] ?? BRAND_ASSETS.coin;
  const { Fallback, frame, src, width, height } = config;
  const [failed, setFailed] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        display: 'block',
        lineHeight: 0,
        /* The frame is the disc's box: square, and clipping the canvas padding
           that surrounds it. Nothing visible is cropped — the padding is
           transparent — but it keeps the element's box honest, so the slot's
           drop-shadows and the sheen's disc mask still read off the metal. */
        ...(frame && { aspectRatio: '1 / 1', overflow: 'hidden' }),
        ...sx,
      }}
      {...props}
    >
      {failed ? (
        <Fallback />
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt ?? config.alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          draggable={false}
          onError={() => setFailed(true)}
          sx={{
            ...(frame
              ? { position: 'absolute', ...frame }
              : { width: '100%', height: '100%', objectFit: 'contain' }),
            userSelect: 'none',
            ...imgSx,
          }}
        />
      )}
    </Box>
  );
}

export default memo(BrandArt);
