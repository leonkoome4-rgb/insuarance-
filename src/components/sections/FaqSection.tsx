import { FAQS } from "@/data/faq";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Accordion from "../ui/Accordion";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-white py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Answers to the questions our clients ask us most often."
        />
        <div className="mt-12">
          <Accordion items={FAQS} />
        </div>
      </Container>
    </section>
  );
}
