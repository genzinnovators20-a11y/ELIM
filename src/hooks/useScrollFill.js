import { useEffect, useRef } from 'react';

/**
 * Publishes how far the reader has descended through an element as a CSS
 * custom property on that element, in the range 0..1.
 *
 * Returns two refs: attach `trackRef` to the element being traversed and
 * `fillRef` to whatever should respond. The property is written on the fill
 * element, so any number of things inside it can scale, fade or brighten from
 * one number without any of them being a React component.
 *
 * Replaces `useScroll({ target, offset })` piped through a `useSpring`, which
 * meant framer-motion's scroll subsystem and its spring solver both had to be
 * resident — and ticking — to move one gold rule down one section.
 *
 * Two things keep it cheap:
 *
 *  - **It is gated on visibility.** An IntersectionObserver attaches the scroll
 *    listener when the track approaches the viewport and detaches it when it
 *    leaves. On a 22,000px page that is a listener doing arithmetic for a small
 *    fraction of the reader's journey, rather than for all of it.
 *  - **It reads geometry once per frame.** Scroll events fire far more often
 *    than frames, so the handler only schedules; the rect is read inside the
 *    animation frame, where the layout it forces is one the browser was about
 *    to do anyway.
 *
 * The easing toward the target reproduces the spring's settle: the rule keeps
 * moving for a beat after the scroll stops, which is what stopped it reading as
 * a progress bar welded to the scrollbar.
 */
export default function useScrollFill({ startAt = 0.82, endAt = 0.55, property = '--fill' } = {}) {
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof window === 'undefined') return undefined;

    let current = 0;
    let frame = 0;
    let listening = false;

    const write = () => {
      frame = 0;
      const fill = fillRef.current;
      if (!fill) return;

      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      /* `startAt` — the fill begins when the top of the track reaches that
         fraction down the viewport; `endAt` — it completes when the bottom
         reaches this one. */
      const from = vh * startAt;
      const to = vh * endAt;
      const span = rect.height + (from - to);
      const target = span > 0 ? Math.min(1, Math.max(0, (from - rect.top) / span)) : 0;

      const delta = target - current;
      current += delta * 0.18;
      fill.style.setProperty(property, current.toFixed(4));

      // Still settling: keep the frame alive until it has caught up.
      if (Math.abs(delta) > 0.001) frame = requestAnimationFrame(write);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      schedule();
    };

    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };

    const stop = () => {
      detach();
      if (frame) cancelAnimationFrame(frame);
    };

    if (typeof IntersectionObserver === 'undefined') {
      attach();
      return stop;
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? attach() : detach()),
      // A generous margin so the fill is already correct by the time the track
      // is on screen, rather than snapping into place as it arrives.
      { rootMargin: '50% 0px 50% 0px' },
    );
    observer.observe(track);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [startAt, endAt, property]);

  return { trackRef, fillRef };
}
