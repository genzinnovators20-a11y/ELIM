import { useEffect, useState } from 'react';

/**
 * Tracks which anchored section currently owns the viewport.
 *
 * Uses a band across the upper-middle of the screen so the highlight changes at
 * a natural reading position rather than at the very top edge. When two sections
 * straddle the band, the later one in document order wins: that is the section
 * being entered, and it is what a reader considers "current".
 *
 * ── Binding to sections that do not exist yet ────────────────────────────
 *
 * The navigation bar renders outside the page whose sections it observes, and
 * the page now mounts in chunks, so on first paint almost none of the anchors
 * exist. The previous version handled that by re-running the whole bind on every
 * animation frame until the full set appeared — twenty-two `getElementById`
 * calls per frame for the second or two the page takes to assemble itself,
 * during exactly the window where the main thread is most contended.
 *
 * It now binds what exists immediately and picks up the rest as they arrive,
 * using a `MutationObserver` on the container. Sections appear in a handful of
 * bursts, so that is a handful of callbacks in total rather than a poll running
 * against every frame — and it keeps working however long the page takes,
 * instead of giving up on a deadline.
 */
export function useActiveSection(ids = [], { rootMargin = '-18% 0px -62% 0px' } = {}) {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;

    const order = new Map(ids.map((id, index) => [id, index]));
    const visible = new Set();
    const bound = new Set();

    const observer = new IntersectionObserver(
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

    /** Observes any anchor that has appeared since the last call. */
    const bind = () => {
      for (const id of ids) {
        if (bound.has(id)) continue;
        const node = document.getElementById(id);
        if (!node) continue;
        bound.add(id);
        observer.observe(node);
      }
      return bound.size === ids.length;
    };

    if (bind()) return () => observer.disconnect();

    // Sections arrive in bursts as the page commits; watch for them rather than
    // asking once a frame whether they have shown up yet.
    const root = document.getElementById('main') ?? document.body;
    const mutations = new MutationObserver(() => {
      if (bind()) mutations.disconnect();
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [ids, rootMargin]);

  return active;
}

export default useActiveSection;
