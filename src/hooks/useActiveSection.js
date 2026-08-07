import { useEffect, useState } from 'react';

/**
 * Tracks which anchored section currently owns the viewport, for the section rail.
 * Uses a band across the upper-middle of the screen so the highlight changes at a
 * natural reading position rather than at the very top edge.
 */
export function useActiveSection(ids = [], { rootMargin = '-18% 0px -62% 0px' } = {}) {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        if (visible.size) {
          const top = ids.find((id) => visible.has(id));
          if (top) setActive(top);
        }
      },
      { rootMargin, threshold: [0, 0.15, 0.4, 0.75] },
    );

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}

export default useActiveSection;
