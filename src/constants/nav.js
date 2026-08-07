/** Primary navigation — labels and order exactly as specified in the source document. */
export const primaryNav = [
  { label: 'HOME', to: '/' },
  { label: 'ELIMCOIN', to: '/elimcoin' },
  { label: 'ECOSYSTEM', to: '/ecosystem' },
  { label: 'NEWS', to: '/news' },
];

export const authNav = [
  { label: 'LOGIN', to: '/login', variant: 'ghost' },
  { label: 'SIGNUP', to: '/signup', variant: 'solid' },
];

export const allNav = [...primaryNav, ...authNav];

/**
 * In-page anchors for the section rail. Order must match DOM order — the rail
 * resolves the active entry by taking the first visible id in this list.
 */
export const homeSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'Market Challenge' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'features', label: 'Features' },
  { id: 'industries', label: 'Industries' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'staking', label: 'Staking' },
  { id: 'bridge', label: 'Staking Bridge' },
  { id: 'rewards', label: 'Reward Flow' },
];

export const coinSections = [
  { id: 'specifications', label: 'Specifications' },
  { id: 'contract', label: 'Smart Contract' },
  { id: 'allocation', label: 'Allocation Matrix' },
  { id: 'dynamics', label: 'Value Dynamics' },
];

export const ecosystemSections = [
  { id: 'matrix', label: 'Value Matrix' },
  { id: 'flow', label: 'Ecosystem Flow' },
  { id: 'mechanics', label: 'Core Mechanics' },
];

export const footerLinks = {
  platform: [
    { label: 'Home', to: '/' },
    { label: 'ElimCoin', to: '/elimcoin' },
    { label: 'Ecosystem', to: '/ecosystem' },
    { label: 'News', to: '/news' },
  ],
  resources: [
    { label: 'Token Specifications', to: '/elimcoin#specifications' },
    { label: 'Allocation Matrix', to: '/elimcoin#allocation' },
    { label: 'Roadmap', to: '/#roadmap' },
    { label: 'Smart Staking', to: '/#staking' },
  ],
  account: [
    { label: 'Login', to: '/login' },
    { label: 'Signup', to: '/signup' },
  ],
};

export const socials = [
  { label: 'X', href: '#', icon: 'x' },
  { label: 'Telegram', href: '#', icon: 'telegram' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'GitHub', href: '#', icon: 'github' },
  { label: 'Email', href: '#', icon: 'email' },
];
