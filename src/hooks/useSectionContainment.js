import { useEffect } from 'react';

/**
 * Lets the browser skip rendering work for sections that are off screen.
 *
 * The page is ~22,000px of fairly dense DOM, and Blink runs its rendering
 * lifecycle over the whole document on any frame that has something animating —
 * which, on a page with a permanently drifting background, is every frame. Under
 * a 6x CPU throttle that measured at 16ms in `PaintArtifactCompositor::Update`
 * and 9ms in `Document::recalcStyle` per frame, before a single pixel of the
 * section the reader is actually looking at had been painted. The cost tracked
 * document size, not what was on screen: ablating filters, blend modes,
 * backdrop-filters, will-change and even every animation on the page moved it
 * very little, because the lifecycle still had to walk everything.
 *
 * `content-visibility: auto` is the direct answer: off-screen sections are
 * skipped by style, layout and paint until they approach the viewport. Nothing
 * about how any section looks changes — a section nobody can see is the only
 * thing that stops being drawn.
 *
 * The one hazard is scroll height. A skipped section still has to occupy its
 * real height or the page grows and shrinks as the reader moves through it. A
 * blanket `contain-intrinsic-size` guess did exactly that: measured against this
 * page it drifted the document by 19-21%, which is a jumping scrollbar.
 *
 * So each section is pinned to its own measured height. Getting that measurement
 * right took two wrong turns worth recording, because both fail quietly:
 *
 *  - Measuring at `fonts.ready` / `load` measures nothing. The page mounts
 *    behind a lazily loaded route, so both fire before a single section exists.
 *  - Letting a `ResizeObserver` maintain the pin cannot converge. Once a section
 *    is skipped it reports the size it was pinned to, so the observer only ever
 *    sees its own last answer and a first bad guess becomes permanent — it left
 *    the document 26% too tall.
 *
 * Truth is only available while a section is genuinely laid out, so calibration
 * releases containment across the whole set, reads every height, then re-applies
 * it. Reads and writes are batched in that order so the pass costs one layout
 * rather than one per section, and it is re-run when the fonts land and when the
 * viewport width changes, since both move real heights.
 */

const sections = new Set();
let frame = 0;
let resizeTimer = 0;
let settled = false;

/**
 * Releases containment, reads every height, then re-applies it — all reads
 * before all writes, so the set costs a single layout pass.
 */
function calibrate() {
  const els = [...sections].filter((el) => el.isConnected);
  if (!els.length) return;

  els.forEach((el) => {
    el.style.contentVisibility = '';
  });
  /**
   * The content box, not the border box.
   *
   * `contain-intrinsic-size` states the size of a skipped element's *contents*;
   * its padding is then added on top as usual. Pinning the measured border box
   * therefore re-adds the section's vertical padding to every skipped section —
   * a constant ~96px each, which on 26 sections silently grew the document by
   * about 2,100px and put the scrollbar right back where it started.
   */
  const heights = els.map((el) => {
    const cs = getComputedStyle(el);
    const pad = parseFloat(cs.paddingTop || 0) + parseFloat(cs.paddingBottom || 0);
    const border = parseFloat(cs.borderTopWidth || 0) + parseFloat(cs.borderBottomWidth || 0);
    return Math.round(el.getBoundingClientRect().height - pad - border);
  });

  els.forEach((el, i) => {
    if (heights[i] <= 0) return;
    el.style.containIntrinsicSize = `auto ${heights[i]}px`;
    el.style.contentVisibility = 'auto';
  });
}

/** Coalesces a page's worth of mounting sections into one calibration. */
function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    calibrate();
    if (!settled) {
      settled = true;
      // Web fonts reflow text after first paint. Chained off the first real
      // calibration rather than off `fonts.ready` alone, which resolves long
      // before this page's sections exist.
      const again = () => window.setTimeout(calibrate, 250);
      if (document.fonts?.ready) document.fonts.ready.then(again).catch(again);
      else again();
    }
  });
}

function onResize() {
  window.clearTimeout(resizeTimer);
  // Heights are width-dependent, so the pins only hold for the width they were
  // taken at. Debounced hard: calibrating briefly renders every section at once.
  resizeTimer = window.setTimeout(calibrate, 250);
}

/** Registers a section for containment. */
export default function useSectionContainment(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return undefined;
    if (!window.CSS?.supports?.('content-visibility', 'auto')) return undefined;

    const first = sections.size === 0;
    sections.add(el);
    if (first) window.addEventListener('resize', onResize, { passive: true });
    schedule();

    return () => {
      sections.delete(el);
      el.style.contentVisibility = '';
      el.style.containIntrinsicSize = '';
      if (sections.size === 0) window.removeEventListener('resize', onResize);
    };
  }, [ref]);
}
