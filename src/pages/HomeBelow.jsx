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

import useStaggeredMount from '../hooks/useStaggeredMount';

/**
 * Everything on the landing page below the masthead.
 *
 * Split out so it is a separate chunk. The masthead does not need any of this
 * code to paint, and while it was all in the entry bundle the browser had to
 * download, parse and compile the whole page — twenty-six sections, their
 * charts, their diagrams and thirty icons — before it could show the first one.
 * At 174KB of application code on a throttled phone that is most of a second
 * spent on script the reader cannot see the result of.
 *
 * It is *not* a lazy route in the usual sense. The import is started the moment
 * the Home module is evaluated, and the build injects a `<link rel="modulepreload">`
 * for it, so the bytes come down in parallel with React and MUI rather than
 * behind them. Nothing is deferred except the parsing and the execution — which
 * is exactly the part that was in the way.
 *
 * Section order runs on from the masthead: positioning, problem and answer,
 * vision & mission, the capability map, industries, the Ecosystem chapter, the
 * ELIMCOIN chapter with its tokenomics and pillars, compliance, the roadmap, the
 * staking protocol, then the closing call, FAQ, community and the disclaimer.
 *
 * The staking-protocol chapter and the compliance register carry copy from spec
 * v1. They are not part of spec v2 but are retained on the page by explicit
 * client instruction, placed either side of the roadmap where they read in
 * sequence rather than interrupting the v2 narrative.
 */
const SECTIONS = [
  Overview,
  ChallengeSolution,
  VisionMission,
  FeaturesGrid,
  Industries,

  EcosystemIntro,
  ValueMatrix,
  EcosystemFlow,
  CoreMechanics,

  CoinIntro,
  ContractPanel,
  TokenSpecs,
  AllocationMatrix,
  KeyPillars,

  Compliance,
  Roadmap,

  StakingVisualizer,
  EliteStakingBridge,
  HybridArchitecture,
  ForexStrategy,
  RewardDistribution,

  FutureCta,
  Faq,
  Community,
  RiskDisclosure,
];

export default function HomeBelow() {
  /*
   * Committed three at a time, each chunk on its own task.
   *
   * Rendering all twenty-four in one go is a single task long enough to hold up
   * a tap; three keeps every task short enough that the page stays answerable
   * while the rest of it arrives. The reader cannot see any of this happen —
   * it is all below the fold, so nothing visible moves and no layout shift is
   * recorded.
   */
  const mounted = useStaggeredMount(SECTIONS.length, { initial: 3, chunk: 3 });

  /* The list is static and never reorders or filters, so the index is the
     section's identity — and unlike a component's `.name`, it survives
     minification. */
  return SECTIONS.slice(0, mounted).map((SectionComponent, i) => <SectionComponent key={i} />);
}
