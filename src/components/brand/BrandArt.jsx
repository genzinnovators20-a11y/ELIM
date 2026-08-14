import { memo } from 'react';
import Box from '@mui/material/Box';
import useAssetAvailability from '../../hooks/useAssetAvailability';
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
 * surface on the site resolves through these two entries, so each mark stays
 * identical everywhere it appears, and the `frame` boxes are measured off each
 * file's own alpha channel — which is what holds the disc centred and at the
 * weight the vector stand-in held.
 *
 * Served as WebP rendered from the supplied SVGs at more than twice the largest
 * size either mark is ever displayed at. The originals are auto-traced exports —
 * 13,481 and 6,057 separately-filled paths — which the browser re-rasterises
 * from scratch at every distinct display size, at 60-100ms of blocked main
 * thread each time. Same artwork, same framing, same alpha; only the decode
 * path changes. The SVGs remain in this directory as the masters.
 *
 * Presentation stops here. Callers own their own glow, blur, opacity, ghosted
 * duplicates and watermark layers; those live on wrappers outside this
 * component, so swapping the artwork underneath leaves them exactly as they
 * were. See `frameArt`.
 */
const BRAND_ASSETS = {
  emblem: {
    src: '/brand/elimcoin-blue.webp',
    alt: 'ELIM FORGE — forged with blockchain',
    Fallback: EmblemFallback,
    frame: frameArt([1516, 1038], [336, 67, 854, 869]),
  },
  coin: {
    src: '/brand/elimcoin-gold.webp',
    alt: 'ELIM Coin (ELM) — Binance Smart Chain BEP-20 token',
    Fallback: CoinFallback,
    frame: frameArt([1600, 1600], [61, 55, 1480, 1481]),
  },
  /**
   * The same gold coin, rendered small for the navigation lockup.
   *
   * A separate file rather than a reuse of `coin`, because the mark is drawn at
   * 40-48px and the full asset is 228KB, sized for a 330px stage. The footer
   * plate does load that larger file on every route, but it sits below the fold
   * and is lazy; the navigation bar is above it and eager. Pointing the mark at
   * the same file would therefore promote a quarter of a megabyte onto the
   * critical path of every page, to paint something the size of a fingernail.
   * At 192px this still carries 1.3x what a 50px mark needs on a 3x screen, and
   * costs 17KB.
   *
   * Rendered from the same 1600x1600 sheet at the same padding, so `frame` is
   * identical and the mark sits in its box exactly as the full coin does.
   */
  mark: {
    src: '/brand/elimcoin-gold-mark.webp',
    alt: 'ELIM FORGE',
    Fallback: CoinFallback,
    frame: frameArt([1600, 1600], [61, 55, 1480, 1481]),
  },
};

/**
 * Renders a supplied brand image with `object-fit: contain` (never stretched,
 * never distorted) and degrades to the hand-authored vector mark when the file
 * has not been added to /public/brand yet.
 *
 * Assets carrying a `frame` are presented through a square window onto their
 * own padded canvas instead — same square box, same centre, so they are drop-in
 * for the stand-in they replace. See `frameArt`.
 */
function BrandArt({ asset = 'coin', alt, priority = false, sx, imgSx, ...props }) {
  const config = BRAND_ASSETS[asset] ?? BRAND_ASSETS.coin;
  const src = config.src ?? config.png;
  const status = useAssetAvailability(src);
  const { Fallback, frame } = config;

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
      {status === 'ready' ? (
        <Box
          component="img"
          src={src}
          alt={alt ?? config.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          sx={{
            ...(frame
              ? { position: 'absolute', ...frame }
              : { width: '100%', height: '100%', objectFit: 'contain' }),
            userSelect: 'none',
            ...imgSx,
          }}
        />
      ) : (
        <Fallback />
      )}
    </Box>
  );
}

export default memo(BrandArt);
