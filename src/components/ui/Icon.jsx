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
import SvgIcon from '@mui/material/SvgIcon';
import QuestionAnswerOutlined from '@mui/icons-material/QuestionAnswerOutlined';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import PhoneInTalkOutlined from '@mui/icons-material/PhoneInTalkOutlined';

/** Material has no Discord glyph, so the brand mark is drawn inline. */
function DiscordIcon(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M19.27 5.33A16.5 16.5 0 0 0 15.2 4.1a.06.06 0 0 0-.07.03c-.18.32-.38.73-.52 1.05a15.3 15.3 0 0 0-4.6 0c-.14-.33-.35-.73-.53-1.05a.06.06 0 0 0-.07-.03A16.4 16.4 0 0 0 5.34 5.33a.06.06 0 0 0-.03.02C2.72 9.2 2.01 12.96 2.36 16.67a.07.07 0 0 0 .03.05 16.6 16.6 0 0 0 4.99 2.51.06.06 0 0 0 .07-.02c.39-.53.73-1.08 1.02-1.67a.06.06 0 0 0-.03-.09 11 11 0 0 1-1.56-.74.06.06 0 0 1 0-.11l.31-.24a.06.06 0 0 1 .06 0 11.83 11.83 0 0 0 10.03 0 .06.06 0 0 1 .07 0l.3.24a.06.06 0 0 1 0 .11c-.5.29-1.02.53-1.56.74a.06.06 0 0 0-.03.09c.3.58.64 1.14 1.02 1.67a.06.06 0 0 0 .07.02 16.55 16.55 0 0 0 5-2.51.06.06 0 0 0 .02-.05c.42-4.29-.7-8.02-2.96-11.32a.05.05 0 0 0-.02-.02ZM8.89 14.41c-.98 0-1.79-.9-1.79-2.01 0-1.1.79-2 1.8-2 1 0 1.81.91 1.79 2.01 0 1.1-.79 2-1.8 2Zm6.24 0c-.98 0-1.79-.9-1.79-2.01 0-1.1.79-2 1.79-2 1.01 0 1.81.91 1.8 2.01 0 1.1-.79 2-1.8 2Z" />
    </SvgIcon>
  );
}

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
  faq: QuestionAnswerOutlined,
  community: GroupsOutlined,
  whitepaper: DescriptionRounded,
  location: PlaceOutlined,
  phone: PhoneInTalkOutlined,

  // Social
  x: X,
  telegram: Telegram,
  discord: DiscordIcon,
  linkedin: LinkedIn,
  github: GitHub,
  email: MailOutlineRounded,
};

function Icon({ name, fallback = 'network', ...props }) {
  const Component = registry[name] ?? registry[fallback];
  return <Component aria-hidden focusable="false" {...props} />;
}

export default memo(Icon);
