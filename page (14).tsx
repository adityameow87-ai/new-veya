import { HomeExperience } from "@/components/home/HomeExperience";
import {
  AutomationsScene,
  ConnectedScene,
  FaqScene,
  FinalScene,
  HeroScene,
  PortfolioScene,
  ProcessScene,
  WebsitesScene,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <HomeExperience>
      <HeroScene />
      <WebsitesScene />
      <AutomationsScene />
      <ConnectedScene />
      <PortfolioScene />
      <ProcessScene />
      <FaqScene />
      <FinalScene />
    </HomeExperience>
  );
}
