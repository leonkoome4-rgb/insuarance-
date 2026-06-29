import { Eye, Target } from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import Card from "../ui/Card";

export default function VisionMission() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <Card className="h-full" tilt>
              <Eye size={26} className="text-metro-orange-500" />
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
            <Card className="h-full" tilt>
              <Target size={26} className="text-metro-orange-500" />
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
      </Container>
    </section>
  );
}
