import EcosystemHero from '../sections/ecosystem/EcosystemHero';
import ValueMatrix from '../sections/ecosystem/ValueMatrix';
import EcosystemFlow from '../sections/ecosystem/EcosystemFlow';
import CoreMechanics from '../sections/ecosystem/CoreMechanics';
import EcosystemOutro from '../sections/ecosystem/EcosystemOutro';
import SectionRail from '../components/ui/SectionRail';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';
import { ecosystemSections } from '../constants/nav';

/** Ecosystem — the third navigation destination, reached from the home page. */
export default function Ecosystem() {
  useSeo(seo.ecosystem);

  return (
    <>
      <SectionRail sections={ecosystemSections} />
      <EcosystemHero />
      <ValueMatrix />
      <EcosystemFlow />
      <CoreMechanics />
      <EcosystemOutro />
    </>
  );
}
