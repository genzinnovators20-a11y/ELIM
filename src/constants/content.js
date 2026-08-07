/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  CONTENT SOURCE OF TRUTH
 * ══════════════════════════════════════════════════════════════════════════════
 *  Every string below is transcribed verbatim from the official ELIM FORGE
 *  content document. Wording, punctuation (– vs —), capitalisation, British
 *  spellings ("collateralised", "channelled") and numbers are reproduced exactly
 *  as supplied.
 *
 *  DO NOT rewrite, summarise, shorten, expand, correct or re-order this copy.
 *  Where the source document used colour to signal hierarchy, the emphasis is
 *  carried structurally (`label` / `body` pairs, `emphasis` flags) and expressed
 *  visually in the components — never by editing the words.
 * ══════════════════════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────  HERO  ───────────────────────────── */

export const hero = {
  title: 'ELIM FORGE',
  tagline: 'FORGED WITH BLOCKCHAIN – FORGED IN CODE. FUELLED BY BSC',
  subtitle: 'ELIM COIN - The Next Era of Web3',
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
  title: 'ElimForge Ecosystem',
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
  outroTitle: 'ELIM FORGE',
  outroLine: 'One Ecosystem. Multiple Industries. Infinite Possibilities.',
};

/* ────────────────────────────  ELIMCOIN  ───────────────────────── */

export const elimcoin = {
  header: 'HEADER',
  title: 'ELIMCOIN',
  lede: 'The native utility asset powering the entire infrastructure is the ELIM Coin (ELM).',
  ledeEmphasis: 'ELIM Coin (ELM)',
  tagline: 'One Token. Endless Possibilities.',
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

export const valueDynamics = {
  title: 'Value Dynamics & Milestones',
  items: [
    {
      label: 'Deflationary Burning',
      separator: '—',
      body: '40% of total supply systematically burned to drive long-term scarcity.',
      icon: 'burn',
      metric: '40%',
    },
    {
      label: 'Smart Staking Framework:',
      separator: '',
      body: ' Generous rewards pools allow holders to lock assets, secure network validations, and receive compounding yield distributions.',
      icon: 'staking',
      metric: null,
    },
    {
      label: '2027 Listing Target',
      separator: '—',
      body: 'Launching on major exchanges at a target price of $0.10.',
      icon: 'listing',
      metric: '$0.10',
    },
    {
      label: '2030 Growth Vision',
      separator: '—',
      body: 'Long-term ecosystem growth target of $100.00.',
      icon: 'growth',
      metric: '$100.00',
    },
  ],
};

/* ──────────────────────  COMPLIANCE & SAFETY  ──────────────────── */

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

/* ────────────────────────────  ROADMAP  ────────────────────────── */

export const roadmap = {
  title: 'Roadmap Timeline: The Path to $100',
  phases: [
    {
      id: 'phase-1',
      phase: 'Phase 1:',
      name: 'Infrastructure & Ecosystem Buildout (Current)',
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
      name: 'Integration & Partner Expansion',
      current: false,
      items: [
        { label: 'Industry Pilots', separator: '—', body: 'Launching textile, retail, and tourism payment gateways.' },
        { label: 'Smart Staking Pools', separator: '—', body: 'Opening the 500 million ELM staking pool to early adopters.' },
        { label: 'Premium Alliances', separator: '—', body: 'Onboarding corporate partners to anchor real-world asset utility.' },
      ],
    },
    {
      id: 'phase-3',
      phase: 'Phase 3:',
      name: 'Global Gateway & Listing (2027 Target)',
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
        { label: '40% Token Burn', separator: '—', body: 'Executing periodic token burning mechanisms to reduce supply permanently.' },
        { label: 'Commodities & Real Estate', separator: '—', body: 'Activating full-scale fractional real estate and gold integrations.' },
        { label: 'Ecosystem Maturity', separator: '—', body: 'Scaling network transaction volume toward the long-term target of $100.00.' },
      ],
    },
  ],
};

/* ────────────────────────────  STAKING  ────────────────────────── */

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

/* ────────────────────  RISK DISCLOSURE & LEGAL  ────────────────── */

export const riskDisclosure = {
  title: 'Risk Disclosure & Legal Disclaimer',
  body: 'Cryptocurrency trading and digital asset participation involve high financial risk and volatility. The targets specified within this document—including the $0.10 listing goal (2027) and the $100.00 vision target (2030)—are structural objectives driven by project milestones and strategic projections; they do not constitute explicit guarantees of future return or performance. Participants must perform their own comprehensive due diligence before engaging with the ELIM ecosystem.',
};
