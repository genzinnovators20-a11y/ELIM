import { useEffect, useState } from 'react';

/**
 * Yields to the browser between chunks of work, and steps aside for input.
 *
 * `scheduler.postTask` at user-visible priority is the right primitive: it runs
 * as a task, so pending input is handled before the next chunk rather than
 * after it. `setTimeout` is the fallback and behaves the same way here — a
 * handful of macrotasks either way.
 *
 * `requestAnimationFrame` would be the obvious choice and is the wrong one: a
 * rAF callback runs *before* paint, so a chunk that takes 150ms delays the frame
 * it is part of. Mounting between frames instead of inside them is what keeps
 * the page answering taps while the rest of it arrives.
 *
 * `isInputPending` closes the remaining gap. Splitting the page into short tasks
 * bounds how long a tap can wait — measured worst case fell from 969ms to 363ms
 * on a throttled phone — but a tap that arrives just as a chunk starts still
 * waits for that chunk. Asking the browser whether anything is queued, and
 * standing down for a turn if so, means the answer to a tap is the tap rather
 * than three more sections.
 */
const hasPostTask = typeof scheduler !== 'undefined' && typeof scheduler.postTask === 'function';
const inputPending = () => navigator.scheduling?.isInputPending?.() ?? false;

function defer(fn) {
  /* Re-checks on each turn: if the reader is mid-gesture the page keeps
     answering them and picks the work back up when they stop. */
  const attempt = () => (inputPending() ? schedule(attempt) : fn());

  let cancelled = false;
  let cancelCurrent = () => {};
  function schedule(task) {
    if (cancelled) return;
    if (hasPostTask) {
      const controller = new AbortController();
      cancelCurrent = () => controller.abort();
      scheduler.postTask(task, { priority: 'user-visible', signal: controller.signal }).catch(() => {});
    } else {
      const id = setTimeout(task, 0);
      cancelCurrent = () => clearTimeout(id);
    }
  }

  schedule(attempt);
  return () => {
    cancelled = true;
    cancelCurrent();
  };
}

/**
 * Mounts a long list of sections in chunks instead of all at once.
 *
 * The landing page is 28 sections and roughly 22,000px of dense DOM. Rendering
 * it in one commit is one task, and on a throttled phone that task measured
 * 1,755ms — during which nothing could paint, no tap could be answered, and the
 * reader sat looking at the brand ground wondering whether the site was broken.
 * The work itself is not wasted; it is simply all charged to the moment the
 * reader is least willing to pay it.
 *
 * The masthead and the section beneath it go up in the first commit — that is
 * the first viewport, and it is the whole of what "the page has loaded" means to
 * someone who has just arrived. Everything below it arrives in chunks, each on
 * its own task, none of them long enough to hold up a tap.
 *
 * The reader cannot see this happen. The sections being mounted are below the
 * fold, so nothing visible moves and no layout shift is recorded; the document
 * simply grows downward behind them. It is finished well before anyone has
 * scrolled far enough to look.
 */
export default function useStaggeredMount(total, { initial = 2, chunk = 3 } = {}) {
  const [mounted, setMounted] = useState(() => Math.min(initial, total));

  useEffect(() => {
    if (mounted >= total) return undefined;
    return defer(() => setMounted((n) => Math.min(total, n + chunk)));
  }, [mounted, total, chunk]);

  return mounted;
}
