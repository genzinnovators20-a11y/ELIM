import { useEffect, useState } from 'react';

/**
 * Tracks which anchored section currently owns the viewport.
 *
 * Uses a band across the upper-middle of the screen so the highlight changes at
 * a natural reading position rather than at the very top edge.
 *
 * Two details matter on this site:
 *  - The navigation bar renders *outside* the lazily loaded page whose sections
 *    it observes, so on first paint none of the anchors exist yet. Binding is
 *    therefore retried on animation frames until they appear.
 *  - When two sections straddle the band, the later one in document order wins:
 *    that is the section being entered, and it is what a reader considers
 *    "current".
 */
export function useActiveSection(ids = [], { rootMargin = '-18% 0px -62% 0px' } = {}) {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;

    let observer = null;
    let frame = 0;
    let cancelled = false;
    const deadline = performance.now() + 8000;
    const visible = new Set();

    const bind = () => {
      if (cancelled) return;

      const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
      if (nodes.length < ids.length && performance.now() < deadline) {
        frame = requestAnimationFrame(bind);
        return;
      }
      if (!nodes.length) return;

      const order = new Map(nodes.map((node, index) => [node.id, index]));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          });
          if (!visible.size) return;
          let current = null;
          visible.forEach((id) => {
            if (current === null || order.get(id) > order.get(current)) current = id;
          });
          if (current) setActive(current);
        },
        { rootMargin, threshold: [0, 0.15, 0.4, 0.75] },
      );

      nodes.forEach((node) => observer.observe(node));
    };

    bind();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [ids, rootMargin]);

  return active;
}

export default useActiveSection;
