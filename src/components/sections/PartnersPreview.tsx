import Link from "next/link";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import PartnersMarquee from "../partners/PartnersMarquee";
import Button from "../ui/Button";

export default function PartnersPreview() {
  return (
    <section className="bg-metro-grey-50 py-20">
      <Container>
        <SectionHeading
          eyebrow="Strategic Alliances"
          title="Leading the Way Through Our Partners"
          subtitle="We work with Kenya's leading underwriters to give you the widest choice of cover, the best rates, and dependable claims support."
        />
      </Container>

      <div className="mt-12">
        <PartnersMarquee />
      </div>

      <Container>
        <div className="mt-10 text-center">
          <Link href="/partners">
            <Button variant="secondary">View All Our Partners</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
