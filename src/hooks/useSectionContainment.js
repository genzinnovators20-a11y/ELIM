import { useEffect } from 'react';

/**
 * Lets the browser skip rendering work for sections that are off screen.
 *
 * The page is ~22,000px of fairly dense DOM, and Blink runs its rendering
 * lifecycle over the whole document on any frame that has something animating.
 * The cost tracks document size, not what is on screen: ablating filters, blend
 * modes, backdrop-filters and even every animation on the page moves it very
 * little, because the lifecycle still has to walk everything.
 *
 * `content-visibility: auto` is the direct answer: off-screen sections are
 * skipped by style, layout and paint until they approach the viewport. Nothing
 * about how any section looks changes — a section nobody can see is the only
 * thing that stops being drawn.
 *
 * The hazard is scroll height. A skipped section still has to occupy its real
 * height, or the page grows and shrinks as the reader moves through it, so each
 * section is pinned to its own measured height via `contain-intrinsic-size`.
 *
 * ── Measuring without paying for it ──────────────────────────────────────
 *
 * A section's height is only knowable while it is genuinely laid out, and once
 * it is skipped it reports back the size it was pinned to — so a `ResizeObserver`
 * maintaining the pin can never converge, and a first bad guess becomes
 * permanent.
 *
 * The obvious way out is to release containment across the whole set, read every
 * height, and re-apply — reads batched before writes, one layout for the lot.
 * That is what this did, and it is where it went wrong: one layout of the *whole
 * document* is not cheap. Measured on a throttled phone it was 841ms of
 * `LayoutDuration`, and it was spent during the load, to optimise scrolling that
 * had not started.
 *
 * The page now mounts in chunks (see `useStaggeredMount`), and that turns out to
 * be the answer. Each chunk is laid out anyway as it arrives, so its sections are
 * measured *then*, in the frame where the browser has just done the work, and
 * contained immediately. By the time the next chunk mounts, everything before it
 * is already skipped — so that layout covers the four new sections rather than
 * all twenty-six. The whole page is measured exactly, and no single layout is
 * ever larger than one chunk.
 *
 * ── Fonts ────────────────────────────────────────────────────────────────
 *
 * Web fonts reflow text, so a height measured before they land is the wrong
 * height. They are preloaded from the document head and resolve at ~350ms, well
 * before most chunks mount, but a chunk that arrives first would otherwise pin
 * fallback metrics forever. So a chunk measured before the fonts are ready waits
 * for them; in practice this defers the first chunk or two and nothing else.
 *
 * ── Resize ───────────────────────────────────────────────────────────────
 *
 * Section heights depend on viewport *width*, but `resize` fires on height
 * changes too — and on a phone the address bar collapsing during a scroll is a
 * height change. Recalibrating on those meant a full release-measure-reapply of
 * the entire document, mid-gesture, repeatedly. The width is compared first, and
 * a height-only resize now costs nothing.
 */

/** Sections registered but not yet measured. */
const pending = new Set();
/** Every live section, for the width-change recalibration. */
const all = new Set();

let frame = 0;
let resizeTimer = 0;
let lastWidth = 0;
let fontsReady = false;

if (typeof document !== 'undefined') {
  if (document.fonts?.status === 'loaded') fontsReady = true;
  else if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      fontsReady = true;
    }).catch(() => {
      fontsReady = true;
    });
  } else {
    fontsReady = true;
  }
}

/**
 * The content box, not the border box.
 *
 * `contain-intrinsic-size` states the size of a skipped element's *contents*;
 * its padding is then added on top as usual. Pinning the measured border box
 * therefore re-adds the section's vertical padding to every skipped section — a
 * constant ~96px each, which on 26 sections silently grew the document by about
 * 2,100px and put the scrollbar right back where it started.
 */
function contentHeight(el) {
  const cs = getComputedStyle(el);
  const pad = parseFloat(cs.paddingTop || 0) + parseFloat(cs.paddingBottom || 0);
  const border = parseFloat(cs.borderTopWidth || 0) + parseFloat(cs.borderBottomWidth || 0);
  return Math.round(el.getBoundingClientRect().height - pad - border);
}

/** Measures and contains everything registered since the last pass. */
function flush() {
  frame = 0;
  if (!pending.size) return;

  if (!fontsReady) {
    // Try again on the next chunk, or as soon as the fonts land.
    document.fonts.ready.finally(() => schedule());
    return;
  }

  const els = [...pending].filter((el) => el.isConnected);
  pending.clear();
  if (!els.length) return;

  lastWidth = window.innerWidth;

  // Read, then write. One layout for the chunk.
  const heights = els.map(contentHeight);
  els.forEach((el, i) => {
    if (heights[i] <= 0) return;
    el.style.containIntrinsicSize = `auto ${heights[i]}px`;
    el.style.contentVisibility = 'auto';
  });
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

/**
 * Width changed, so every pinned height is now wrong. This is the one case that
 * genuinely needs the release-measure-reapply pass over the whole set — and it
 * is a deliberate, occasional act by the reader rather than something that
 * happens during a scroll.
 */
function recalibrate() {
  const els = [...all].filter((el) => el.isConnected);
  if (!els.length) return;

  lastWidth = window.innerWidth;
  els.forEach((el) => {
    el.style.contentVisibility = '';
  });
  const heights = els.map(contentHeight);
  els.forEach((el, i) => {
    if (heights[i] <= 0) return;
    el.style.containIntrinsicSize = `auto ${heights[i]}px`;
    el.style.contentVisibility = 'auto';
  });
}

function onResize() {
  if (window.innerWidth === lastWidth) return;
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(recalibrate, 300);
}

/** Registers a section for containment. */
export default function useSectionContainment(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return undefined;
    if (!window.CSS?.supports?.('content-visibility', 'auto')) return undefined;

    if (all.size === 0) {
      lastWidth = window.innerWidth;
      window.addEventListener('resize', onResize, { passive: true });
    }
    all.add(el);
    pending.add(el);
    schedule();

    return () => {
      all.delete(el);
      pending.delete(el);
      el.style.contentVisibility = '';
      el.style.containIntrinsicSize = '';
      if (all.size === 0) window.removeEventListener('resize', onResize);
    };
  }, [ref]);
}
