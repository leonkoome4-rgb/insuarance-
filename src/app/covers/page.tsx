import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoversSearchGrid from "@/components/covers/CoversSearchGrid";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Our Covers",
  description:
    "Explore all classes of insurance we offer — Motor, Home & Property, Business, Travel, Agriculture, Life, Health, Marine, and Aviation.",
};

export default function CoversPage() {
  return (
    <>
      <section className="bg-metro-grey-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="All Classes, One Agency"
            title="Our Covers"
            subtitle="We are committed to helping you choose the right cover that fits your needs and aligns with your budget."
          />
          <div className="mt-12">
            <CoversSearchGrid />
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
