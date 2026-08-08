export const SITE_URL = 'https://www.elimforge.com';
export const SITE_NAME = 'ELIM FORGE';
export const OG_IMAGE = `${SITE_URL}/brand/og-image.png`;

/** Per-route document metadata, applied by `useSeo`. */
export const seo = {
  home: {
    title: 'ELIM FORGE — BNB Smart Chain Ecosystem | ELIM Coin (ELM)',
    description:
      'Institutional Power. Decentralised Freedom. A high-performance digital asset ecosystem engineered to provide secure access, scalable utility, and a connected Web3 economy.',
    path: '/',
  },
  news: {
    title: 'Newsroom | ELIM FORGE',
    description: 'Announcements, protocol updates and ecosystem milestones from ELIM FORGE.',
    path: '/news',
    noindex: true,
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
