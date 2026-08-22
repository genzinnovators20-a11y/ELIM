import { Suspense, lazy } from 'react';
import Hero from '../sections/home/Hero';
import SectionRail from '../components/ui/SectionRail';
import useSeo from '../hooks/useSeo';
import useAfterPaint from '../hooks/useAfterPaint';
import { seo } from '../constants/seo';
import { homeSections } from '../constants/nav';

/*
 * The rest of the page, as its own chunk.
 *
 * The import is started here at module scope rather than inside `lazy`'s
 * callback, so the request is on the wire as soon as this module is evaluated —
 * not when React first renders the boundary. Combined with the
 * `<link rel="modulepreload">` the build injects for it, the bytes arrive
 * alongside React and MUI; only the parsing and the rendering wait, which is the
 * part that was standing between the reader and the masthead.
 */
const belowPromise = import('./HomeBelow');
const HomeBelow = lazy(() => belowPromise);

/**
 * The single landing page.
 *
 * ELIMCOIN, Ecosystem and Roadmap are sections of `/`, reached by anchor rather
 * than by route.
 *
 * Only the masthead is rendered directly. It is the first viewport, and it is
 * the whole of what "the page has loaded" means to someone who has just
 * arrived — so it is the whole of what the first paint has to wait for.
 * Everything after it is in `HomeBelow`, held back until a frame has actually
 * been drawn.
 */
export default function Home() {
  useSeo(seo.home);
  const painted = useAfterPaint();

  return (
    <>
      <SectionRail sections={homeSections} />

      <Hero />

      {/*
        No fallback. There is nothing to stand in for — the boundary sits below
        the fold, so a placeholder would reserve space nobody can see and then
        give it back. `null` lets the document be exactly as tall as the content
        that exists, which is also what keeps the footer from being pushed
        through a visible position when the rest arrives.
      */}
      {painted && (
        <Suspense fallback={null}>
          <HomeBelow />
        </Suspense>
      )}
    </>
  );
}
