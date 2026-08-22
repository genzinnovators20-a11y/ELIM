import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import { legacyRedirects } from './constants/nav';

/*
 * Route-level code splitting, with one deliberate exception.
 *
 * Home is imported statically. It was previously lazy like every other route,
 * which read as the tidier choice but cost the landing page a whole extra round
 * of the loading sequence: the browser cannot know the Home chunk exists until
 * the entry bundle has downloaded, parsed and executed far enough to evaluate
 * the `import()`. Measured on a throttled phone that put the request for Home on
 * the wire at 829ms — 330ms after the last vendor chunk had already finished
 * downloading — and nothing the reader could see was painted until 2.1s.
 *
 * Since effectively every visitor arrives here, splitting it bought nothing and
 * charged a serial round trip for it. Statically imported, Home is part of the
 * entry graph: it is discovered by the preload scanner in the first HTML parse
 * and downloads in parallel with React and MUI.
 *
 * The account routes, the archived newsroom and the 404 stay lazy — those are
 * genuinely optional and a Home visitor never pays for them.
 */
const News = lazy(() => import('./pages/News'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Single landing page.
 *
 * ELIMCOIN, Ecosystem and Roadmap are sections of `/`, reached by anchor rather
 * than by route. The former standalone URLs are kept as redirects so existing
 * links and indexed results land on the right part of the page.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />

        {legacyRedirects.map(({ from, to }) => (
          <Route key={from} path={from.replace(/^\//, '')} element={<Navigate to={to} replace />} />
        ))}

        {/* Retained, but no longer part of the primary journey. */}
        <Route path="news" element={<News />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
