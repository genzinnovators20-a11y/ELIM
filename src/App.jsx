import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';

// Route-level code splitting — the home page ships alone; every other route,
// and the WebGL bundle it may pull in, arrives on demand.
const Home = lazy(() => import('./pages/Home'));
const ElimCoin = lazy(() => import('./pages/ElimCoin'));
const Ecosystem = lazy(() => import('./pages/Ecosystem'));
const News = lazy(() => import('./pages/News'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="elimcoin" element={<ElimCoin />} />
        <Route path="ecosystem" element={<Ecosystem />} />
        <Route path="news" element={<News />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
