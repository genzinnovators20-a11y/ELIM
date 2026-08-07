import { memo } from 'react';
import CandlestickChartOutlined from '@mui/icons-material/CandlestickChartOutlined';
import SyncAltRounded from '@mui/icons-material/SyncAltRounded';
import HubOutlined from '@mui/icons-material/HubOutlined';
import TokenOutlined from '@mui/icons-material/TokenOutlined';
import LayersOutlined from '@mui/icons-material/LayersOutlined';
import AutoGraphOutlined from '@mui/icons-material/AutoGraphOutlined';
import LoyaltyOutlined from '@mui/icons-material/LoyaltyOutlined';
import DiamondOutlined from '@mui/icons-material/DiamondOutlined';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined';
import FlightTakeoffOutlined from '@mui/icons-material/FlightTakeoffOutlined';
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import WidgetsOutlined from '@mui/icons-material/WidgetsOutlined';
import GavelOutlined from '@mui/icons-material/GavelOutlined';
import LocalFireDepartmentOutlined from '@mui/icons-material/LocalFireDepartmentOutlined';
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import EnhancedEncryptionOutlined from '@mui/icons-material/EnhancedEncryptionOutlined';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined';
import PublicOutlined from '@mui/icons-material/PublicOutlined';
import VerifiedUserOutlined from '@mui/icons-material/VerifiedUserOutlined';
import BalanceOutlined from '@mui/icons-material/BalanceOutlined';
import DonutLargeOutlined from '@mui/icons-material/DonutLargeOutlined';
import PercentRounded from '@mui/icons-material/PercentRounded';
import MemoryOutlined from '@mui/icons-material/MemoryOutlined';
import CurrencyExchangeOutlined from '@mui/icons-material/CurrencyExchangeOutlined';
import BusinessCenterOutlined from '@mui/icons-material/BusinessCenterOutlined';
import BoltOutlined from '@mui/icons-material/BoltOutlined';
import SecurityOutlined from '@mui/icons-material/SecurityOutlined';
import AutorenewRounded from '@mui/icons-material/AutorenewRounded';
import ElectricBoltOutlined from '@mui/icons-material/ElectricBoltOutlined';
import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import ShieldOutlined from '@mui/icons-material/ShieldOutlined';
import Telegram from '@mui/icons-material/Telegram';
import LinkedIn from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import X from '@mui/icons-material/X';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';

/**
 * Single icon registry. Content files reference icons by semantic key, keeping
 * copy free of component imports and guaranteeing one consistent icon style
 * (Material outlined / rounded — precise, never illustrative).
 */
const registry = {
  // Core architecture
  exchange: CandlestickChartOutlined,
  bridge: SyncAltRounded,
  network: HubOutlined,

  // Token utilities
  token: TokenOutlined,
  staking: LayersOutlined,
  evolution: AutoGraphOutlined,
  rewards: LoyaltyOutlined,

  // Industries
  gold: DiamondOutlined,
  realEstate: ApartmentOutlined,
  textiles: StorefrontOutlined,
  tourism: FlightTakeoffOutlined,

  // Ecosystem
  payments: PaymentsOutlined,
  supply: LocalShippingOutlined,
  tokenize: WidgetsOutlined,
  escrow: GavelOutlined,

  // Value dynamics
  burn: LocalFireDepartmentOutlined,
  listing: RocketLaunchOutlined,
  growth: TrendingUpRounded,

  // Compliance
  encryption: EnhancedEncryptionOutlined,
  vault: AccountBalanceWalletOutlined,
  audit: FactCheckOutlined,
  globe: PublicOutlined,
  shieldCheck: VerifiedUserOutlined,
  governance: BalanceOutlined,

  // Staking
  pool: DonutLargeOutlined,
  yield: PercentRounded,
  engine: MemoryOutlined,
  forex: CurrencyExchangeOutlined,
  enterprise: BusinessCenterOutlined,
  hft: BoltOutlined,
  risk: SecurityOutlined,
  automation: AutorenewRounded,
  yieldBoost: ElectricBoltOutlined,
  collateral: AccountBalanceOutlined,

  // Utility
  verified: VerifiedRounded,
  contract: DescriptionOutlined,
  shield: ShieldOutlined,

  // Social
  x: X,
  telegram: Telegram,
  linkedin: LinkedIn,
  github: GitHub,
  email: MailOutlineRounded,
};

function Icon({ name, fallback = 'network', ...props }) {
  const Component = registry[name] ?? registry[fallback];
  return <Component aria-hidden focusable="false" {...props} />;
}

export default memo(Icon);
