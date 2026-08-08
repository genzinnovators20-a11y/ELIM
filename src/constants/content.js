/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  CONTENT SOURCE OF TRUTH  —  website spec v2
 * ══════════════════════════════════════════════════════════════════════════════
 *  Every string below is transcribed verbatim from the official ELIM FORGE
 *  content document. Wording, punctuation (– vs —), capitalisation, British
 *  spellings ("collateralised", "channelled", "Decentralised") and numbers are
 *  reproduced exactly as supplied.
 *
 *  DO NOT rewrite, summarise, shorten, expand, correct or re-order this copy.
 *  Where the source document used colour to signal hierarchy, the emphasis is
 *  carried structurally (`label` / `body` pairs, `emphasis` flags) and expressed
 *  visually in the components — never by editing the words.
 *
 *  Blocks marked "retained from spec v1" are not present in v2 but are kept on
 *  the page by explicit client instruction; their copy is likewise untouched.
 * ══════════════════════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────  HERO  ───────────────────────────── */

export const hero = {
  title: 'ELIM FORGE',
  chain: 'BNB SMART CHAIN ECOSYSTEM',
  tagline: 'FORGED WITH BLOCKCHAIN – FORGED IN CODE. FUELLED BY BSC',
  statement: 'Institutional Power. Decentralised Freedom.',
  lede: 'A high-performance digital asset ecosystem engineered to provide secure access, scalable utility, and a connected Web3 economy.',
};

/* ────────────────────────  INTRODUCTION  ───────────────────────── */

export const intro = {
  heading: 'ELIM FORGE- FORGE THE FUTURE OF DIGITAL ASSET TRADING',
  headingLead: 'ELIM FORGE-',
  headingRest: ' FORGE THE FUTURE OF DIGITAL ASSET TRADING',
  subheading: 'Institutional power. Decentralized freedom.',
  lede: 'Ultra-fast execution, deep liquidity, and elite security — built for novice investors and global institutions alike.',
};

export const marketChallenge = {
  title: 'The Market Challenge',
  body: 'Traditional financial frameworks and modern decentralized economies currently exist in isolation. Institutional investors face barriers to entry in decentralized finance (DeFi) due to lax security, regulatory ambiguity, and fragmented liquidity. Conversely, retail users face overly complex user interfaces, high transaction friction, and a lack of real-world utility for their digital assets.',
};

export const solution = {
  title: 'The Elim Forge Solution',
  body: 'Elim Forge bridges this structural divide. It delivers a high-performance digital asset trading platform and a decentralized ecosystem engineered to offer a secure, scalable, and user-friendly landscape for both novice and institutional participants. By pairing sub-millisecond transaction matching infrastructure with a robust, multi-industry utility framework, Elim Forge turns digital currency into tangible global utility.',
};

/** Highlighted in the source document — rendered as a display pull quote. */
export const bridgeStatement = {
  lineOne: 'Traditional finance and decentralized economies have existed in isolation.',
  lineTwo: 'Elim Forge closes the gap.',
};

/* ──────────────────────  VISION & MISSION  ─────────────────────── */

export const visionMission = [
  {
    id: 'vision',
    label: 'Our Vision:',
    body: 'To establish the premier decentralized forge of the Web3 economy, where blockchain technology converts raw digital assets into secure, high-utility, and friction-free financial infrastructure accessible to everyone, everywhere. To build a premier global crypto; users have a secure gateway where financial freedom, robust security, and decentralized utility are universally accessible to everyone.',
  },
  {
    id: 'mission',
    label: 'Our Mission:',
    body: 'To engineer a high-performance, low-cost BEP-20 ecosystem on the BNB Smart Chain that strips away transaction complexity, and users have a secure gateway where financial freedom is accessible. We empower users with a secure, high-performance trading platform while driving long-term value to token holders through community staking rewards and deflationary token burning mechanisms.',
  },
];

/* ─────────────────────────  FEATURES GRID  ─────────────────────── */

export const featuresGrid = {
  title: 'Features Grid: One Ecosystem. Infinite Possibilities.',
  groups: [
    {
      id: 'core-architecture',
      title: 'Core Architecture',
      items: [
        {
          label: 'Next-Gen Exchange',
          separator: '—',
          body: 'Secure, ultra-fast global gateway designed to simplify digital asset trading.',
          icon: 'exchange',
        },
        {
          label: 'Real-World Integration',
          separator: '—',
          body: 'Bridges blockchain tech with commodities, tourism, retail, textiles, and real estate.',
          icon: 'bridge',
        },
        {
          label: 'Unified Digital Economy',
          separator: '—',
          body: 'Interconnected ecosystem built on transparency, accessibility, and innovation.',
          icon: 'network',
        },
      ],
    },
    {
      id: 'token-utilities',
      title: 'Token Utilities',
      items: [
        {
          label: 'Utility-Driven ELM',
          separator: '—',
          body: 'Powers native staking, instant transactions, and multi-industry service rewards.',
          icon: 'token',
        },
        {
          label: 'Smart Staking Programs',
          separator: '—',
          body: 'Strategic yield pools allowing global users to earn while supporting network growth.',
          icon: 'staking',
        },
        {
          label: 'Sustainable Evolution',
          separator: '—',
          body: 'Future-ready platform focused on continuous innovation and decentralized opportunities.',
          icon: 'evolution',
        },
        {
          label: 'Multi-Industry Rewards',
          separator: '–',
          body: 'Operates as a cross-platform loyalty system, paying out consumer rewards usable across all partner sectors.',
          icon: 'rewards',
        },
      ],
    },
  ],
};

export const industries = {
  title: 'Real-World Utility Industries',
  items: [
    {
      label: 'Commodities & Gold',
      separator: '—',
      body: 'Asset-backed utility and stable wealth preservation.',
      icon: 'gold',
      accent: 'gold',
    },
    {
      label: 'Real Estate & Infrastructure',
      separator: '—',
      body: 'Seamless blockchain-based property market integration.',
      icon: 'realEstate',
      accent: 'blue',
    },
    {
      label: 'Textiles & Retail',
      separator: '—',
      body: 'Streamlined supply chain and business-to-consumer transactions.',
      icon: 'textiles',
      accent: 'emerald',
    },
    {
      label: 'Tourism & E-Commerce',
      separator: '—',
      body: 'Borderless digital payments for global travel and shopping.',
      icon: 'tourism',
      accent: 'iris',
    },
  ],
};

/* ───────────────────────────  ECOSYSTEM  ───────────────────────── */

export const ecosystem = {
  brandLine: 'ELIM FORGE',
  title: 'One Ecosystem. Multiple Industries. Infinite Possibilities.',
  headline: 'Redefining Decentralized Commerce: Real-World Utility, Unified.',
  /**
   * Source line, reproduced exactly, split only on its own " / " delimiters so
   * the five pairs can be laid out as a matrix. No wording is altered.
   */
  matrix: [
    { label: 'Primary Value Base', value: 'Tangible real-world industries (Gold, Real Estate)', emphasis: true, icon: 'gold' },
    { label: 'Transaction Focus', value: 'Cross-industry merchant payments & B2C transactions', emphasis: true, icon: 'payments' },
    { label: 'Supply Chain Role', value: 'Tracking textile, retail, and cargo logistics', emphasis: false, icon: 'supply' },
    { label: 'Staking Utility', value: 'Liquidity provision coupled with physical sector rewards', emphasis: false, icon: 'staking' },
    { label: 'Tourism Integration', value: 'Native borderless travel & e-commerce gateway.', emphasis: false, icon: 'tourism' },
  ],
  mechanicsTitle: 'Core Functional Mechanics',
  /** `label` + ' ' + `body` reproduces each source line exactly, colon included. */
  mechanics: [
    {
      index: '1)',
      label: 'Asset Tokenization:',
      body: 'Converts physical assets like fractional gold or property into liquid digital tokens.',
      icon: 'tokenize',
    },
    {
      index: '2)',
      label: 'Unified Payments:',
      body: 'Eliminates standard 3% merchant processing fees and multi-day clearing delays across borders.',
      icon: 'payments',
    },
    {
      index: '3)',
      label: 'Decentralized Escrow:',
      body: 'Eliminates expensive legal and brokerage middlemen in real estate and supply transactions.',
      icon: 'escrow',
    },
  ],
};

/* ────────────────────────────  ELIMCOIN  ───────────────────────── */

export const elimcoin = {
  title: 'ELIMCOIN',
  kicker: 'Empowering the Future of Decentralized Infrastructure',
  tagline: 'One Token. Endless Possibilities.',
  lede: 'ELIM Coin (ELM) is the native utility asset architected to power our entire ecosystem, driving seamless transactions, robust security, and scalable utility across a unified decentralized network.',
  ledeEmphasis: 'ELIM Coin (ELM)',
  ctaPrimary: 'Get ELM Now',
  ctaSecondary: 'Read Whitepaper',
  specsTitle: 'Token Specifications',
  specs: [
    { label: 'Token Name:', value: 'ELIM Coin' },
    { label: 'Ticker:', value: 'ELM' },
    { label: 'Network:', value: 'Binance Smart Chain (BEP-20)' },
    { label: 'Total Supply:', value: '1 billion ELM' },
    { label: 'Decimals:', value: '18' },
  ],
  contract: {
    verified: 'ELIMCOIN – SMART CONTRACT VERIFIED',
    provision: 'CONTRACT ADDRESS PROVISION',
  },
};

export const allocation = {
  title: 'Distribution Strategy & Allocation Matrix',
  heading: 'ELM Tokenomics & Strategic Allocation',
  subheading: 'Transparent Distribution Built for Long-Term Value',
  columns: ['Allocation Category', 'Percentage', 'Token Volume'],
  rows: [
    { category: 'Staking Pool', percentage: '50%', value: 50, volume: '500,000,000 ELM', color: 'gold' },
    { category: 'Ecosystem Yield', percentage: '10%', value: 10, volume: '100,000,000 ELM', color: 'emerald' },
    { category: 'Market Liquidity', percentage: '10%', value: 10, volume: '100,000,000 ELM', color: 'blue' },
    { category: 'Marketing & Growth', percentage: '10%', value: 10, volume: '100,000,000 ELM', color: 'cyan' },
    { category: 'Research & Development (R&D)', percentage: '10%', value: 10, volume: '100,000,000 ELM', color: 'iris' },
    { category: 'Premium Partners', percentage: '5%', value: 5, volume: '50,000,000 ELM', color: 'goldLight' },
    { category: 'Founding Team', percentage: '5%', value: 5, volume: '50,000,000 ELM', color: 'steel' },
  ],
};

export const keyPillars = {
  title: 'Key Ecosystem Pillars',
  items: [
    {
      label: 'Unified Utility',
      separator: '–',
      body: 'One single asset fuelling every network protocol and service.',
      icon: 'token',
      accent: 'gold',
    },
    {
      label: 'Infinite Scale',
      separator: '–',
      body: 'Engineered to support limitless decentralized applications and micro-transactions.',
      icon: 'evolution',
      accent: 'blue',
    },
    {
      label: 'Native Governance',
      separator: '–',
      body: 'Empowering holders to shape the future of the infrastructure actively.',
      icon: 'governance',
      accent: 'emerald',
    },
  ],
};

/* ────────────────────────────  ROADMAP  ────────────────────────── */

export const roadmap = {
  title: 'Roadmap Timeline: Value Dynamics & Milestones - The Path to $100',
  titleLead: 'Roadmap Timeline:',
  titleMiddle: ' Value Dynamics & Milestones - ',
  titleTarget: 'The Path to $100',
  phases: [
    {
      id: 'phase-1',
      phase: 'Phase 1:',
      name: 'Infrastructure & Ecosystem Buildout (Q1 to Q3 – 2026)',
      current: true,
      items: [
        { label: 'Core Architecture', separator: '—', body: 'Finalizing the ultra-fast transaction matching engine.' },
        { label: 'Smart Contracts', separator: '—', body: 'Deploying the BEP-20 ELM Coin token contract on Binance Smart Chain.' },
        { label: 'Security Audits', separator: '—', body: 'Conducting external penetration testing and code verification.' },
      ],
    },
    {
      id: 'phase-2',
      phase: 'Phase 2:',
      name: 'Integration & Partner Expansion (Q4 – 2026, Q1 to Q3 2027)',
      current: false,
      items: [
        { label: 'Industry Pilots', separator: '—', body: 'Launching textile, retail, and tourism payment gateways.' },
        {
          label: 'Smart Staking Framework:',
          separator: '',
          body: 'Opening a 500-million ELM staking pool for early adopters. Generous reward pools allow holders to lock assets, secure network validation, and receive compounding yield distributions.',
        },
        { label: 'Premium Alliances', separator: '—', body: 'Onboarding corporate partners to anchor real-world asset utility.' },
      ],
    },
    {
      id: 'phase-3',
      phase: 'Phase 3:',
      name: 'Global Gateway & Listing (Q4 – 2027 Target)',
      current: false,
      items: [
        { label: 'Public Launch', separator: '—', body: 'Debuting the ELIM Exchange platform worldwide.' },
        { label: 'Exchange Listings', separator: '—', body: 'Listing the ELM Coin on premier global centralized exchanges.' },
        { label: 'Launch Price', separator: '—', body: 'Target listing market price set at $0.10.' },
      ],
    },
    {
      id: 'phase-4',
      phase: 'Phase 4:',
      name: 'Full Deflation & Scale (2028 - 2030)',
      current: false,
      items: [
        {
          label: '40% Deflationary Token Burn:',
          separator: '',
          body: 'Executing periodic burn mechanisms to reduce supply permanently. Systematically burning 40% of the total supply drives long-term scarcity.',
        },
        { label: 'Commodities & Real Estate', separator: '—', body: 'Activating full-scale fractional real estate and gold integrations.' },
        {
          label: 'Ecosystem Maturity',
          separator: '—',
          body: 'Formulating a long-term vision for ecosystem growth and scaling network transaction volume toward a target of $100.00.',
        },
      ],
    },
  ],
};

/* ─────────────────────────  CLOSING CALL  ──────────────────────── */

export const futureCta = {
  title: 'The Future of Infrastructure is ELIM',
  subtitle: 'The Foundation is Built. The Path to $100 is Set.',
  body: 'ELIM Coin (ELM) is more than just a token—it is the engine of a borderless, decentralized economy. With a massive 40% deflationary burn driving scarcity, a 500M staking pool rewarding early adopters, and an ecosystem engineered for hyper-scale, the window to secure your position at the absolute baseline is closing.',
  ctaPrimary: 'Acquire ELM Tokens',
  ctaSecondary: 'Join the Community',
};

/* ──────────────────────────────  FAQ  ──────────────────────────── */

export const faq = {
  title: 'Frequently Asked Questions',
  items: [
    {
      id: 'what-is-elm',
      question: 'What is ELM?',
      answer: 'The native utility asset powering the entire ELIM decentralized infrastructure.',
    },
    {
      id: 'how-burn-works',
      question: 'How does the burn work?',
      answer: 'Exactly 40% of the total supply is systematically destroyed over time to maximize long-term scarcity.',
    },
    {
      id: 'stake-immediately',
      question: 'Can I stake immediately?',
      answer: 'Yes, early adopters can access the 500M ELM pool right now for compounding yields.',
    },
  ],
};

/* ───────────────────────────  COMMUNITY  ───────────────────────── */

export const community = {
  title: 'Connect with Our Global Network',
  body: 'Stay updated on upcoming exchange listings, validation milestones, and governance votes. Join a rapidly growing community of innovators, developers, and long-term holders.',
  links: [
    { label: 'Telegram', icon: 'telegram', href: '#', accent: 'blue' },
    { label: 'X / Twitter', icon: 'x', href: '#', accent: 'steel' },
    { label: 'Discord', icon: 'discord', href: '#', accent: 'iris' },
    { label: 'LinkedIn', icon: 'linkedin', href: '#', accent: 'cyan' },
  ],
};

/* ────────────────────  RISK DISCLOSURE & LEGAL  ────────────────── */

export const riskDisclosure = {
  title: 'Risk Disclosure & Legal Disclaimer',
  body: 'Cryptocurrency trading and digital asset participation involve high financial risk and volatility. The targets specified within this document—including the $0.10 listing goal (2027) and the $100.00 vision target (2030)—are structural objectives driven by project milestones and strategic projections; they do not constitute explicit guarantees of future return or performance. Participants must perform their own comprehensive due diligence before engaging with the ELIM ecosystem.',
};

/* ───────────────────────  CORPORATE CONTACT  ────────────────────
 * Transcribed verbatim from the official ELIM FORGE branding card.
 * Same rule as everything above: do not reword, reformat or "tidy".
 * ──────────────────────────────────────────────────────────────── */

export const contact = {
  rows: [
    {
      id: 'office',
      icon: 'location',
      label: 'REGISTERED OFFICE',
      lines: ['Branch Road, Camp Ithier,', 'Central Flacq, Mauritius: 1406-06'],
    },
    {
      id: 'mobile',
      icon: 'phone',
      label: 'MOBILE NO',
      lines: ['+230 59188088'],
      href: 'tel:+23059188088',
    },
    {
      id: 'website',
      icon: 'globe',
      label: 'WEBSITE',
      lines: ['www.elimforge.com'],
      href: 'https://www.elimforge.com',
    },
  ],
  coinCaption: 'ELIM COIN',
  poweredLead: 'Powered by',
  poweredBy: 'Big Block Technologies',
};

/* ────────────────────────────  FOOTER  ─────────────────────────── */

export const footer = {
  copyright: '© 2026 ELIMCOIN Network. All rights reserved.',
  strapline: 'Built for decentralized scale. Powered by ELM.',
  links: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Technical Whitepaper', href: '#' },
    { label: 'Contact Support', href: '#' },
  ],
};

/* ══════════════════════════════════════════════════════════════════
 *  RETAINED FROM SPEC v1
 *  Not present in spec v2; kept on the page by explicit client
 *  instruction. Copy is reproduced verbatim from the v1 document.
 * ══════════════════════════════════════════════════════════════════ */

export const compliance = {
  title: 'Compliance & Safety Section',
  groups: [
    {
      id: 'security',
      title: 'Bank-Grade Security',
      items: [
        {
          label: 'Robust Encryption',
          separator: '—',
          body: 'Advanced cryptographic protocols protecting user data and ecosystem transactions.',
          icon: 'encryption',
        },
        {
          label: 'Fund Protection',
          separator: '—',
          body: 'Secure asset storage architecture ensuring maximum safety against external threats.',
          icon: 'vault',
        },
        {
          label: 'Transparent Auditing',
          separator: '—',
          body: 'Real-time blockchain tracking powered by the trust of the Binance Smart Chain.',
          icon: 'audit',
        },
      ],
    },
    {
      id: 'regulatory',
      title: 'Regulatory Framework',
      items: [
        {
          label: 'Global Compliance',
          separator: '—',
          body: 'Designed to align with strict international financial regulatory standards.',
          icon: 'globe',
        },
        {
          label: 'Anti-Fraud Ecosystem',
          separator: '—',
          body: 'Continuous monitoring tools to ensure a fair, transparent trading environment.',
          icon: 'shieldCheck',
        },
        {
          label: 'Sustainable Governance',
          separator: '—',
          body: 'Built for institutional safety while preserving decentralized user freedom.',
          icon: 'governance',
        },
      ],
    },
  ],
};

export const staking = {
  title: 'Smart Staking Rewards Visualizer',
  subtitle: 'Put Your Tokens to Work',
  lede: 'Lock your ELM Coin to secure the network, fuel real-world business transactions, and earn automated yield.',
  items: [
    {
      label: 'Pool Size',
      separator: '—',
      body: '500,000,000 ELM allocated for global participants.',
      metric: '500,000,000',
      unit: 'ELM',
      icon: 'pool',
    },
    {
      label: 'Yield Source',
      separator: '—',
      body: '100,000,000 ELM dedicated exclusively to compounding staking bonuses.',
      metric: '100,000,000',
      unit: 'ELM',
      icon: 'yield',
    },
    {
      label: 'Asset-Backed Engine',
      separator: '—',
      body: 'Returns generated from Forex & Gold Fund Management directly supplement the Ecosystem Yield and the Staking Pool, transforming static rewards into a dynamic, asset-backed compounding engine.',
      metric: null,
      unit: null,
      icon: 'engine',
    },
  ],
};

export const stakingBridge = {
  title: 'The Elite Staking Bridge',
  subtitle: 'Institutional Forex, Gold, & Real-World Asset Management Protocol',
  body: 'To supplement the deflationary dynamics of the token ecosystem, Elim Forge introduces a premier hybrid financial bridge: The ELIM Forex, Gold, & Real-World Asset Management Protocol. This institutional-grade system allows users to leverage the enduring stability of physical gold, the high-yield velocity of the foreign exchange (Forex) market, and the steady growth of tangible business enterprises. By securely managing this diversified liquidity network through ELM token staking, Elim Forge bridges the gap between decentralized finance (DeFi) and traditional economic powerhouses to deliver resilient, real-world value to our ecosystem.',
};

export const hybridArchitecture = {
  title: 'The Hybrid Asset Architecture',
  lede: 'When users lock their assets into the Staking Pools, the underlying liquidity is routed through a dual-diversification framework to generate stable, real-world returns that back the value of the ecosystem:',
  allocations: [
    {
      label: '50% Physical Gold Allocation:',
      value: 50,
      percentage: '50%',
      body: 'Capital is immediately collateralised into vaulted, audited physical gold assets. This provides a hard floor of wealth preservation, shielding the staking pool from traditional crypto market volatility.',
      color: 'gold',
      icon: 'gold',
    },
    {
      label: '20% Regulated Forex Fund Management:',
      value: 20,
      percentage: '20%',
      body: 'Capital is deployed into global foreign exchange markets through regulated, Tier-1 institutional brokerage accounts.',
      color: 'blue',
      icon: 'forex',
    },
    {
      label: '30% Real-World Business Enterprise:',
      value: 30,
      percentage: '30%',
      body: 'Capital is invested into high-yield, tangible industries for long-term growth and capital appreciation. This portfolio includes commercial real estate and infrastructure development, sustainable tourism ventures, and high-volume import/export commodities trade.',
      color: 'emerald',
      icon: 'enterprise',
    },
  ],
};

export const forexStrategy = {
  title: 'Algorithmic Forex Strategy & Alpha Generation',
  lede: 'The Forex fund allocation does not rely on speculative manual trading. Instead, it is managed by Elim Forge’s proprietary quantitative systems:',
  items: [
    {
      label: 'High-Frequency Trading (HFT):',
      body: ' Advanced AI algorithms exploit micro-inefficiencies across major currency pairs (EUR/USD, GBP/USD, USD/JPY).',
      icon: 'hft',
    },
    {
      label: 'Strict Risk Management:',
      body: ' Hardcoded stop-losses and a maximum drawdown cap of 3% per trade ensure institutional capital preservation.',
      icon: 'risk',
    },
    {
      label: '24/5 Automated Execution:',
      body: ' Continual, non-stop market monitoring to harvest stable yield during global banking hours.',
      icon: 'automation',
    },
  ],
};

export const rewardDistribution = {
  title: 'Staking Synergies, Burning Strategies, & Reward Distribution',
  lede: 'Profits generated from Forex fund management, the appreciation of gold reserves, and the growth of real-world business enterprises are directly channelled back into the ELM Staking Ecosystem to drive sustainable value through three primary mechanisms:',
  items: [
    {
      index: '1.',
      title: 'Yield Boosting',
      body: 'A significant portion of Forex trading profits is systematically used to market-buy ELM tokens. These tokens are then distributed back to active stakers as enhanced yield bonuses, boosting overall staking returns.',
      icon: 'yieldBoost',
      accent: 'gold',
    },
    {
      index: '2.',
      title: 'Collateralized Security & Lending',
      body: 'Users can maximize the utility of their assets by utilizing staked ELM tokens as collateral to trade directly on the Elim Exchange or to mint ecosystem-stable credits backed by physical gold reserves. Additionally, Premium Tier users unlock access to exclusive capital loans that can be borrowed against their staked token balances.',
      icon: 'collateral',
      accent: 'blue',
    },
    {
      index: '3.',
      title: 'Accelerated Deflation',
      body: 'To aggressively compress token supply, up to 10% of all generated Forex fund profits and 5% of liquidity pool donations from community yields are routed straight to the Ecosystem Burning Protocol. This continuous burn mechanism accelerates the timeline to achieve our total supply reduction target of 40%.',
      icon: 'burn',
      accent: 'emerald',
    },
  ],
};
