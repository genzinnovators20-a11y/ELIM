import Hero from '../sections/home/Hero';
import Overview from '../sections/home/Overview';
import ChallengeSolution from '../sections/home/ChallengeSolution';
import VisionMission from '../sections/home/VisionMission';
import FeaturesGrid from '../sections/home/FeaturesGrid';
import Industries from '../sections/home/Industries';

import EcosystemIntro from '../sections/ecosystem/EcosystemIntro';
import ValueMatrix from '../sections/ecosystem/ValueMatrix';
import EcosystemFlow from '../sections/ecosystem/EcosystemFlow';
import CoreMechanics from '../sections/ecosystem/CoreMechanics';

import CoinIntro from '../sections/elimcoin/CoinIntro';
import ContractPanel from '../sections/elimcoin/ContractPanel';
import TokenSpecs from '../sections/elimcoin/TokenSpecs';
import AllocationMatrix from '../sections/elimcoin/AllocationMatrix';
import KeyPillars from '../sections/elimcoin/KeyPillars';

import Compliance from '../sections/home/Compliance';
import Roadmap from '../sections/home/Roadmap';

import StakingVisualizer from '../sections/staking/StakingVisualizer';
import EliteStakingBridge from '../sections/staking/EliteStakingBridge';
import HybridArchitecture from '../sections/staking/HybridArchitecture';
import ForexStrategy from '../sections/staking/ForexStrategy';
import RewardDistribution from '../sections/staking/RewardDistribution';

import FutureCta from '../sections/home/FutureCta';
import Faq from '../sections/home/Faq';
import Community from '../sections/home/Community';
import RiskDisclosure from '../sections/shared/RiskDisclosure';

import SectionRail from '../components/ui/SectionRail';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';
import { homeSections } from '../constants/nav';

/**
 * The single landing page.
 *
 * Runs in the order of the source document: masthead, positioning, problem and
 * answer, vision & mission, capability map, industries, the Ecosystem chapter,
 * the ELIMCOIN chapter with its tokenomics and pillars, the roadmap, the closing
 * call, FAQ, community and the legal disclaimer.
 *
 * The staking-protocol chapter and the compliance register carry copy from spec
 * v1. They are not part of spec v2 but are retained on the page by explicit
 * client instruction, placed either side of the roadmap where they read in
 * sequence rather than interrupting the v2 narrative.
 */
export default function Home() {
  useSeo(seo.home);

  return (
    <>
      <SectionRail sections={homeSections} />

      <Hero />
      <Overview />
      <ChallengeSolution />
      <VisionMission />
      <FeaturesGrid />
      <Industries />

      <EcosystemIntro />
      <ValueMatrix />
      <EcosystemFlow />
      <CoreMechanics />

      <CoinIntro />
      <ContractPanel />
      <TokenSpecs />
      <AllocationMatrix />
      <KeyPillars />

      <Compliance />
      <Roadmap />

      <StakingVisualizer />
      <EliteStakingBridge />
      <HybridArchitecture />
      <ForexStrategy />
      <RewardDistribution />

      <FutureCta />
      <Faq />
      <Community />
      <RiskDisclosure />
    </>
  );
}
