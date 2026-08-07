import CoinHero from '../sections/elimcoin/CoinHero';
import TokenSpecs from '../sections/elimcoin/TokenSpecs';
import ContractPanel from '../sections/elimcoin/ContractPanel';
import AllocationMatrix from '../sections/elimcoin/AllocationMatrix';
import ValueDynamics from '../sections/elimcoin/ValueDynamics';
import RiskDisclosure from '../sections/shared/RiskDisclosure';
import SectionRail from '../components/ui/SectionRail';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';
import { coinSections } from '../constants/nav';

/** ELIMCOIN — the second navigation destination, exactly as the document directs. */
export default function ElimCoin() {
  useSeo(seo.elimcoin);

  return (
    <>
      <SectionRail sections={coinSections} />
      <CoinHero />
      <TokenSpecs />
      <ContractPanel />
      <AllocationMatrix />
      <ValueDynamics />
      <RiskDisclosure id="coin-risk-disclosure" />
    </>
  );
}
