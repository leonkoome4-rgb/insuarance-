import { OPERATIONAL_EXCELLENCE } from "@/data/stats";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProgressBar from "../ui/ProgressBar";

export default function OperationalExcellence() {
  return (
    <section className="bg-metro-grey-50 py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Operational Excellence"
          title="Where Protection Meets Performance"
          subtitle="We hold ourselves accountable to the same standards we promise our clients."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm">
            {OPERATIONAL_EXCELLENCE.map((item) => (
              <ProgressBar key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
