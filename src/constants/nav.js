/**
 * Primary navigation — labels and order exactly as specified in the source
 * document. The site is a single landing page: these entries are in-page
 * anchors, not routes.
 */
export const primaryNav = [
  { label: 'HOME', id: 'home', to: '/' },
  { label: 'ELIMCOIN', id: 'elimcoin', to: '/#elimcoin' },
  { label: 'ECOSYSTEM', id: 'ecosystem', to: '/#ecosystem' },
  { label: 'ROADMAP', id: 'roadmap', to: '/#roadmap' },
];

export const authNav = [
  { label: 'LOGIN', to: '/login', variant: 'ghost' },
  { label: 'SIGNUP', to: '/signup', variant: 'solid' },
];

/** Section ids the navbar watches to highlight the active entry. */
export const navSectionIds = primaryNav.map((item) => item.id);

/**
 * In-page anchors for the section rail. Order must match DOM order — the rail
 * resolves the active entry by taking the first visible id in this list.
 */
export const homeSections = [
  { id: 'home', label: 'Home' },
  { id: 'challenge', label: 'Market Challenge' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'features', label: 'Features' },
  { id: 'industries', label: 'Industries' },
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'elimcoin', label: 'ELIMCOIN' },
  { id: 'tokenomics', label: 'Tokenomics' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'staking', label: 'Staking' },
  { id: 'bridge', label: 'Staking Bridge' },
  { id: 'rewards', label: 'Reward Flow' },
  { id: 'faq', label: 'FAQ' },
];

/**
 * Legacy multi-page URLs, kept working as redirects into the single page so
 * existing links and search results do not break.
 */
export const legacyRedirects = [
  { from: '/elimcoin', to: '/#elimcoin' },
  { from: '/ecosystem', to: '/#ecosystem' },
  { from: '/roadmap', to: '/#roadmap' },
];

export const footerLinks = {
  explore: [
    { label: 'Home', to: '/' },
    { label: 'ElimCoin', to: '/#elimcoin' },
    { label: 'Ecosystem', to: '/#ecosystem' },
    { label: 'Roadmap', to: '/#roadmap' },
  ],
  resources: [
    { label: 'Token Specifications', to: '/#specifications' },
    { label: 'Allocation Matrix', to: '/#tokenomics' },
    { label: 'Key Ecosystem Pillars', to: '/#pillars' },
    { label: 'Frequently Asked Questions', to: '/#faq' },
  ],
  account: [
    { label: 'Login', to: '/login' },
    { label: 'Signup', to: '/signup' },
  ],
};

export const socials = [
  { label: 'Telegram', href: '#', icon: 'telegram' },
  { label: 'X / Twitter', href: '#', icon: 'x' },
  { label: 'Discord', href: '#', icon: 'discord' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
];
