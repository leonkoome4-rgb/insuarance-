import Link from "next/link";
import { Eye, Target } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function AboutTeaser() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="Who We Are"
          title="Welcome to Super Metro Insurance Agency"
          subtitle="Founded in 2023, we are a licensed intermediary by the Insurance Regulatory Authority (IRA), connecting individuals, businesses, and institutions with trusted insurance partners for all classes of insurance."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <Card className="group h-full" tilt spotlight>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-metro-orange-500/10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-metro-orange-500/20">
                <Eye size={24} className="text-metro-orange-500" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-metro-navy-800">
                Our Vision
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-metro-grey-500">
                To be the most trusted insurance agency in Kenya, simplifying
                access to reliable insurance coverage.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="group h-full" tilt spotlight>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-metro-orange-500/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-metro-orange-500/20">
                <Target size={24} className="text-metro-orange-500" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-metro-navy-800">
                Our Mission
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-metro-grey-500">
                We exist to bridge the gap between Kenyans and quality
                insurance through informed guidance, transparent service, fast
                access, and reliable support.
              </p>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link href="/about">
              <Button variant="secondary">Learn More About Us</Button>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
