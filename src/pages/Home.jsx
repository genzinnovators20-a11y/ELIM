import Hero from '../sections/home/Hero';
import Overview from '../sections/home/Overview';
import ChallengeSolution from '../sections/home/ChallengeSolution';
import VisionMission from '../sections/home/VisionMission';
import FeaturesGrid from '../sections/home/FeaturesGrid';
import Industries from '../sections/home/Industries';
import Gateway from '../sections/home/Gateway';
import Compliance from '../sections/home/Compliance';
import Roadmap from '../sections/home/Roadmap';
import StakingVisualizer from '../sections/staking/StakingVisualizer';
import EliteStakingBridge from '../sections/staking/EliteStakingBridge';
import HybridArchitecture from '../sections/staking/HybridArchitecture';
import ForexStrategy from '../sections/staking/ForexStrategy';
import RewardDistribution from '../sections/staking/RewardDistribution';
import RiskDisclosure from '../sections/shared/RiskDisclosure';
import SectionRail from '../components/ui/SectionRail';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';
import { homeSections } from '../constants/nav';

/**
 * Home. Follows the source document's running order end to end: masthead,
 * positioning, problem/answer, vision & mission, capability map, industries,
 * the two dedicated destinations, compliance, roadmap, the full staking
 * protocol, and the legal disclaimer that closes the document.
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
      <Gateway />
      <Compliance />
      <Roadmap />
      <StakingVisualizer />
      <EliteStakingBridge />
      <HybridArchitecture />
      <ForexStrategy />
      <RewardDistribution />
      <RiskDisclosure />
    </>
  );
}
