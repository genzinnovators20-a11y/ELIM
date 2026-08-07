import { useEffect, useState } from 'react';

const cache = new Map();

/**
 * Resolves whether a brand image has been dropped into /public/brand yet.
 * Lets every brand surface render the supplied artwork when present and fall
 * back to the hand-authored vector mark when it is not — no broken images,
 * no layout shift, no build step.
 *
 * A resolved result is memoised across the session, so the probe runs once per
 * asset no matter how many surfaces render it.
 */
export function useAssetAvailability(src) {
  const [probed, setProbed] = useState(null);

  // Cached and missing-source cases resolve during render; the effect only
  // exists to drive the asynchronous probe.
  const resolved = !src ? 'missing' : (cache.get(src) ?? probed ?? 'pending');

  useEffect(() => {
    if (!src || cache.has(src)) return undefined;

    let cancelled = false;
    const img = new Image();
    img.decoding = 'async';
    const settle = (status) => {
      cache.set(src, status);
      if (!cancelled) setProbed(status);
    };
    img.onload = () => settle('ready');
    img.onerror = () => settle('missing');
    img.src = src;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return resolved;
}

export default useAssetAvailability;
