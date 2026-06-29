import Hero from "@/components/sections/Hero";
import AboutTeaser from "@/components/sections/AboutTeaser";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CoversPreview from "@/components/sections/CoversPreview";
import PartnersPreview from "@/components/sections/PartnersPreview";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <WhyChooseUs />
      <CoversPreview />
      <PartnersPreview />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
