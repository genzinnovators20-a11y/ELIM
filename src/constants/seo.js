export const SITE_URL = 'https://www.elimforge.com';
export const SITE_NAME = 'ELIM FORGE';
export const OG_IMAGE = `${SITE_URL}/brand/og-image.png`;

/** Per-route document metadata, applied by `useSeo`. */
export const seo = {
  home: {
    title: 'ELIM FORGE — Forge the Future of Digital Asset Trading',
    description:
      'Institutional power. Decentralized freedom. Ultra-fast execution, deep liquidity, and elite security — built for novice investors and global institutions alike.',
    path: '/',
  },
  elimcoin: {
    title: 'ELIMCOIN (ELM) — Token Specifications & Allocation | ELIM FORGE',
    description:
      'The native utility asset powering the entire infrastructure is the ELIM Coin (ELM). BEP-20 on Binance Smart Chain, 1 billion total supply, 18 decimals.',
    path: '/elimcoin',
  },
  ecosystem: {
    title: 'ElimForge Ecosystem — Real-World Utility, Unified | ELIM FORGE',
    description:
      'Redefining Decentralized Commerce: Real-World Utility, Unified. Asset tokenization, unified payments and decentralized escrow across gold, real estate, textiles, retail and tourism.',
    path: '/ecosystem',
  },
  news: {
    title: 'Newsroom | ELIM FORGE',
    description: 'Announcements, protocol updates and ecosystem milestones from ELIM FORGE.',
    path: '/news',
  },
  login: {
    title: 'Login | ELIM FORGE',
    description: 'Access your ELIM FORGE account.',
    path: '/login',
    noindex: true,
  },
  signup: {
    title: 'Signup | ELIM FORGE',
    description: 'Create your ELIM FORGE account.',
    path: '/signup',
    noindex: true,
  },
  notFound: {
    title: 'Page not found | ELIM FORGE',
    description: 'The page you are looking for does not exist.',
    path: '/404',
    noindex: true,
  },
};
