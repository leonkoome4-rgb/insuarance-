import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import VisionMission from "@/components/sections/VisionMission";
import GuidingPrinciples from "@/components/sections/GuidingPrinciples";
import OperationalExcellence from "@/components/sections/OperationalExcellence";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Super Metro Insurance Agency is a licensed Kenyan insurance intermediary founded in 2023, regulated by the Insurance Regulatory Authority (IRA).",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <VisionMission />
      <GuidingPrinciples />
      <OperationalExcellence />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
