import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { legacyRedirects } from './constants/nav';

// Route-level code splitting. The landing page ships alone; the account routes,
// the archived newsroom, and the WebGL bundle all arrive on demand.
const Home = lazy(() => import('./pages/Home'));
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
