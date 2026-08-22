import { useEffect, useState } from 'react';

/**
 * `false` until the browser has actually put a frame on the screen, then `true`.
 *
 * `requestAnimationFrame` alone is not enough and is the usual mistake: its
 * callback runs *before* the frame is painted, so work scheduled there still
 * lands in front of the pixels. Chaining a task behind it — `setTimeout(0)` from
 * inside the frame callback — puts the work after the paint has been handed to
 * the compositor.
 *
 * This exists because of a specific measurement. The rest of the landing page is
 * a separate chunk that is preloaded, so by the time React first renders, the
 * chunk has usually already arrived and its `lazy` boundary resolves
 * immediately — which means React renders the masthead and then, in the same
 * uninterrupted stretch of work, carries straight on into the rest of the page
 * before the browser has been given a chance to draw anything. The split bought
 * the download but not the paint: the masthead sat finished-but-unpainted for
 * ~760ms.
 *
 * Gating on a real frame is what makes the split do what it was for.
 */
export default function useAfterPaint() {
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    let timer = 0;
    const frame = requestAnimationFrame(() => {
      timer = setTimeout(() => setPainted(true), 0);
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return painted;
}
